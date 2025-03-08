import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Company from '@/models/Company';

// Función para validar el token JWT
const validateToken = (req: Request) => {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return { error: 'Authorization header is missing', status: 401 };
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return { error: 'Token is missing', status: 401 };
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return null;
  } catch {
    return { error: 'Invalid or expired token', status: 401 };
  }
};

// Crear un usuario
export async function POST(req: Request) {
  await connectToDatabase();

  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  try {
    const body = await req.json();
    const { username, role, password, name, contactNumber, active, company } = body;

    if (!username || !role|| !password || !active|| !name || !contactNumber || company === undefined ) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Verificar si la empresa existe
    const empresa = await Company.findById(company);
    if (!empresa) {
      return NextResponse.json({ error: 'Invalid company' }, { status: 400 });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el usuario
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      contactNumber,
      active,
      company: empresa._id,
      role
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Obtener todos los usuarios
export async function GET(req: Request) {
  await connectToDatabase();

  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  try {
    const users = await User.find().populate({
      path: 'company',
      select: 'companyName', // Solo traemos companyName
      strictPopulate: false  // Evita fallos si company es null
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Actualizar un usuario
export async function PUT(req: Request) {
  await connectToDatabase();

  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  try {
    const body = await req.json();
    const { _id, role, username, name, contactNumber, active, company } = body;
    
    if (!_id || !role|| !username || !name || !contactNumber || company === undefined) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
      // Verificar si el usuario existe
      const existingUser = await User.findById(_id);
      if (!existingUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

    // Verificar si la empresa existe
    const empresa = await Company.findById(company);
    if (!empresa) {
      return NextResponse.json({ error: 'Invalid company' }, { status: 400 });
    }
    // console.log(body);
    // console.log(company._id)
    // Actualizar el usuario
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, contactNumber, active, 
        company: company._id,
        role },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

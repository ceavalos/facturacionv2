// /app/api/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import cors from '@/lib/cors';

// /pages/api/companies/index.js
import { connectToDatabase as dbConnect} from '@/lib/db';
import Company from    '../../../../models/Company';

// /pages/api/companies/index.ts


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
    return null; // No hay error
  } catch {
    return { error: 'Invalid or expired token', status: 401 };
  }
};

export async function POST(req: Request) {
  await connectToDatabase(); // Conectar a la base de datos

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  try {
    const body = await req.json();
    const { active, companyName, nit, legalRepresentative, address, phone } = body;
    
    // Validación de campos obligatorios
    if (  !companyName || !nit || !legalRepresentative || !address || !phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Verificar si la compañía ya existe
    const existingCompany = await Company.findOne({ companyName });
    if (existingCompany) {
      return NextResponse.json({ error: 'Company with this name already exists' }, { status: 409 });
    }

    // Crear y guardar la nueva compañía
    const newCompany = new Company({
      active,
      address,
      companyName,
      legalRepresentative,
      nit,
      phone,
    });

    await newCompany.save();

    return NextResponse.json(
      { message: 'Company created successfully', company: newCompany },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {

  await dbConnect(); // Conectar a la base de datos

  const { method } = req;

  // Validar token JWT
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader ) {
    // return res.status(401).json({ error: 'Authorization header is missing' });
    return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    jwt.verify(token, JWT_SECRET!);
  } catch (error) {
    // return res.status(401).json({ error: 'Invalid or expired token' });
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
  
  const companias = await Company.find({});

  //return NextResponse.json({ mensaje: 'Hola Mundo' }, { status: 200 });
  return NextResponse.json(companias, { status: 200 });
  
}


export async function PUT(req: Request) {
  await dbConnect(); // Conectar a la base de datos

  // Validar token JWT
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return NextResponse.json({ error: 'Token is missing' }, { status: 401 });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    jwt.verify(token, JWT_SECRET!);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { _id, companyName, nit, legalRepresentative, address, phone, active } = body;

    // Validación de campos obligatorios
    if (!_id || !companyName || !nit || !legalRepresentative || !address || !phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Buscar y actualizar la compañía en la base de datos
    const updatedCompany = await Company.findByIdAndUpdate(
      _id,
      { companyName, nit, legalRepresentative, address, phone, active },
      { new: true } // Retorna la compañía actualizada
    );

    if (!updatedCompany) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Company updated successfully', company: updatedCompany }, { status: 200 });

  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
  

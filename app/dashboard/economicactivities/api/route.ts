// /app/dashboard/economicactivities/api/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import EconomicActivity from '@/models/EconomicActivity';

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
  await connectToDatabase();

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  try {
    const body = await req.json();
    const { code, description, active } = body;
    
    // Validación de campos obligatorios
    if (!code || !description) {
      return NextResponse.json({ error: 'Code and description are required' }, { status: 400 });
    }

    // Verificar si la actividad económica ya existe
    const existingActivity = await EconomicActivity.findOne({ code });
    if (existingActivity) {
      return NextResponse.json({ error: 'Economic activity with this code already exists' }, { status: 409 });
    }

    // Crear y guardar la nueva actividad económica
    const newActivity = new EconomicActivity({
      code,
      description,
      active: active ?? true,
    });

    await newActivity.save();

    return NextResponse.json(
      { message: 'Economic activity created successfully', activity: newActivity },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating economic activity:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  await connectToDatabase();

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }
  
  try {
    const activities = await EconomicActivity.find({});
    return NextResponse.json(activities, { status: 200 });
  } catch (error) {
    console.error('Error fetching economic activities:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  await connectToDatabase();

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  try {
    const body = await req.json();
    const { _id, code, description, active } = body;
  //console.log(body)
    // Validación de campos obligatorios
    if (!_id || !code || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Buscar y actualizar la actividad economica
    const updatedActivity = await EconomicActivity.findByIdAndUpdate(
      _id,
      { code, description, active },
      { new: true }
    );

    if (!updatedActivity) {
      return NextResponse.json({ error: 'Economic activity not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Economic activity updated successfully', activity: updatedActivity },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating economic activity:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

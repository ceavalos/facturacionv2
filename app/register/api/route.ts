// /app/api/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/db'; 
import cors from '@/lib/cors';

export async function POST(request: Request) {
  const { username, password, nombre, numeroDeContacto, empresa } = await request.json();

  await connectToDatabase();

  // Verificar que se hayan proporcionado todos los campos necesarios
  if (!username || !password || !nombre || !numeroDeContacto || !empresa) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    password: hashedPassword,
    nombre,
    numeroDeContacto,
    empresa,
    activo: false, // Por defecto no está activo
  });

  try {
    await user.save();
    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

// Aplicamos el middleware de CORS
export default cors(POST);

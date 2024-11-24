// /app/api/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/db';
import cors from '@/lib/cors';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  await connectToDatabase();

  const user = await User.findOne({ username });

  if (!user || !user.activo) { // Verificar si el usuario existe y está activo
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  return NextResponse.json({ token });
}

// Aplicamos el middleware de CORS
export default cors(POST);

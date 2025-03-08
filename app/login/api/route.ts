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

  const user = await User.findOne({ username }).select('+password');
  // console.log(user)
  if (!user || !user.active) {
    return NextResponse.json({ message: 'Usuario o contraseña inválidos' }, { status: 401 });
  }
  
  const passwordMatch = await bcrypt.compare(password, user.password);
  
  if (!passwordMatch) {
    return NextResponse.json({ message: 'Usuario o contraseña inválidos' }, { status: 401 });
  }

  // Incluir el rol en el token JWT
  const token = jwt.sign(
    { 
      userId: user._id,
      role: user.role,
      username: user.username
    }, 
    JWT_SECRET, 
    { expiresIn: '24h' }
  );

  // Devolver el token y el rol
  return NextResponse.json({ 
    token,
    role: user.role,
    username: user.username
  });
}

// Aplicamos el middleware de CORS
export default cors(POST);

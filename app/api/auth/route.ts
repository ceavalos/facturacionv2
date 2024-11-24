// app/api/auth/route.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/db';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  await connectToDatabase();

  const user = await User.findOne({ username });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'mysecret', { expiresIn: '1h' });

  return NextResponse.json({ token }, { status: 200 });
}

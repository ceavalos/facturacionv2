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


export async function POST(req: Request) {


  await dbConnect(); // Conectar a la base de datos

  const { method } = req;

 // Validar token JWT
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader ) {
    // return res.status(401).json({ error: 'Authorization header is missing' });
    return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    // return res.status(401).json({ error: 'Token is missing' });
    return NextResponse.json({ error: 'Token is missing' }, { status: 401 });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    jwt.verify(token, JWT_SECRET!);
  } catch (error) {
    // return res.status(401).json({ error: 'Invalid or expired token' });
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
  
      try {
        const body = await req.json();
        const { companyCode, companyName, nit, legalRepresentative, address, phone } = body;

        // Validación de campos obligatorios
        if (!companyCode || !companyName || !nit || !legalRepresentative || !address || !phone) {
          //return res.status(400).json({ error: 'All fields are required' });
          return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Crear la nueva compañía
        const company = new Company({
          companyCode,
          companyName,
          nit,
          legalRepresentative,
          address,
          phone,
        });

        // Guardar la compañía en la base de datos
        await company.save();
        //res.status(201).json({ message: 'Company created successfully', company });
        return NextResponse.json({ error: 'Company created successfully' }, { status: 200 });
      } catch (error) {
        // res.status(500).json({ error: 'Server error' });
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

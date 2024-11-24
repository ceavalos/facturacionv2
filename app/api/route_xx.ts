// /app/api/login/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import cors from '@/lib/cors';

// /pages/api/companies/index.js
import { connectToDatabase as dbConnect} from '@/lib/db';
import Company from   '../../models/Company';

// /pages/api/companies/index.ts


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Conectar a la base de datos

  const { method } = req;

  console.log("metodo")
  // Validar token JWT
  const authHeader = req.headers['authorization'];


  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    jwt.verify(token, JWT_SECRET!);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  switch (method) {
    case 'POST':
      try {
        const { companyCode, companyName, nit, legalRepresentative, address, phone } = req.body;

        // Validación de campos obligatorios
        if (!companyCode || !companyName || !nit || !legalRepresentative || !address || !phone) {
          return res.status(400).json({ error: 'All fields are required' });
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
        res.status(201).json({ message: 'Company created successfully', company });
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

import EconomicActivity from '@/models/EconomicActivity';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { connectToDatabase } from '@/lib/db';

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

export async function POST(req: Request) {

  await connectToDatabase();

  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }


  try {
   
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Leer el contenido del archivo
    const fileContent = await file.text();
    
    // Parsear el CSV
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
   console.log(records);
   
    let importedCount = 0;
    let errors: string[] = [];

    // Procesar cada registro
    for (const record of records) {
      console.log('record', record);
      try {
        const { codigo, descripcion } = record;
        console.log('codigo', codigo);
        console.log('description', descripcion);
        if (!codigo || !descripcion) {
          errors.push(`Registro inválido: código y descripción son requeridos`);
          continue;
        }

        // Verificar si ya existe
        const existing = await EconomicActivity.findOne({ code: codigo });
        console.log('existing', existing);
        console.log('codigo', codigo);
        if (existing) {
          // Actualizar si existe
          await EconomicActivity.findOneAndUpdate(
            { code: codigo },
            { 
              description: descripcion,
              active: true
            }
          );
        } else {
          // Crear nuevo si no existe
          const newActivity = new EconomicActivity({
            code: codigo,
            description: descripcion,
            active: true
          });
          await newActivity.save();
        }
        
        importedCount++;
      } catch (error) {
        errors.push(`Error en registro ${record.codigo}: ${error}`);
      }
    }

    return NextResponse.json({
      message: 'Import completed',
      count: importedCount,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Error importing economic activities:', error);
    return NextResponse.json(
      { error: 'Error importing economic activities' },
      { status: 500 }
    );
  }
}

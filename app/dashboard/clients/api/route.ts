import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase as dbConnect } from '@/lib/db';
import Client from '@/models/Client';

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

// Función para validar el company header
const validateCompanyHeader = (req: Request) => {
  const companyId = req.headers.get('company');
  if (!companyId) {
    return { error: 'Company header is missing', status: 400 };
  }
  return null;
};

export async function POST(req: Request) {
  await dbConnect();

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  // Validar company header
  const companyError = validateCompanyHeader(req);
  if (companyError) {
    return NextResponse.json({ error: companyError.error }, { status: companyError.status });
  }

  try {
    const body = await req.json();
    const { 
      tipoCliente, 
      tipoFacturacion, 
      nit, 
      dui, 
      nombre, 
      correoElectronico, 
      actividadEconomica, 
      numeroRegistro,
      companyId 
    } = body;

    // Validación de campos obligatorios
    if (!tipoCliente || !tipoFacturacion || !nombre || !correoElectronico || !companyId) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    // Validaciones específicas según el tipo de cliente y facturación
    if (tipoCliente === 'NATURAL' && !dui) {
      return NextResponse.json({ error: 'DUI is required for natural persons' }, { status: 400 });
    }

    if (tipoFacturacion === 'CREDITO_FISCAL' && !nit) {
      return NextResponse.json({ error: 'NIT is required for credit fiscal' }, { status: 400 });
    }

    // Crear y guardar el nuevo cliente
    const newClient = new Client(body);
    await newClient.save();

    return NextResponse.json(
      { message: 'Client created successfully', client: newClient },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  await dbConnect();

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  // Validar company header
  const companyError = validateCompanyHeader(req);
  if (companyError) {
    return NextResponse.json({ error: companyError.error }, { status: companyError.status });
  }

  try {
    const companyId = req.headers.get('company');
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      // Si hay ID, buscar un cliente específico
      const client = await Client.findOne({ _id: id, companyId });
      if (!client) {
        return NextResponse.json({ error: 'Client not found' }, { status: 404 });
      }
      return NextResponse.json(client, { status: 200 });
    } else {
      // Si no hay ID, devolver todos los clientes de la compañía
      const clients = await Client.find({ companyId });
      return NextResponse.json(clients, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  await dbConnect();

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  // Validar company header
  const companyError = validateCompanyHeader(req);
  if (companyError) {
    return NextResponse.json({ error: companyError.error }, { status: companyError.status });
  }

  try {
    const body = await req.json();
    const { 
      _id,
      tipoCliente, 
      tipoFacturacion, 
      nit, 
      dui, 
      nombre, 
      correoElectronico, 
      actividadEconomica, 
      numeroRegistro,
      companyId 
    } = body;

    // Validación de campos obligatorios
    if (!_id || !tipoCliente || !tipoFacturacion || !nombre || !correoElectronico || !companyId) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    // Validaciones específicas según el tipo de cliente y facturación
    if (tipoCliente === 'NATURAL' && !dui) {
      return NextResponse.json({ error: 'DUI is required for natural persons' }, { status: 400 });
    }

    if (tipoFacturacion === 'CREDITO_FISCAL' && !nit) {
      return NextResponse.json({ error: 'NIT is required for credit fiscal' }, { status: 400 });
    }

    // Buscar y actualizar el cliente
    const updatedClient = await Client.findOneAndUpdate(
      { _id, companyId },
      body,
      { new: true }
    );

    if (!updatedClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Client updated successfully', client: updatedClient },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

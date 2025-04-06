// /app/dashboard/facturas/api/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase as dbConnect } from '@/lib/db';
import FacturaEnc, { IFacturaEnc } from '@/models/FacturaEnc';
import FacturaDet from '@/models/FacturaDet';

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
    const body: IFacturaEnc = await req.json();
    const { companyId, clientId, tipoCliente, tipoFacturacion, nombre, correoElectronico, numeroRegistro, dui, total_gravado, total_excento, total_iva, total_facturacion, detalles } = body;

    // Validación de campos obligatorios
    if (!companyId || !clientId || !tipoCliente || !tipoFacturacion || !nombre || !correoElectronico) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    // Crear y guardar el encabezado de la factura
    const newFacturaEnc = new FacturaEnc({
      companyId,
      clientId,
      tipoCliente,
      tipoFacturacion,
      nombre,
      correoElectronico,
      numeroRegistro,
      dui,
      total_gravado,
      total_excento,
      total_iva,
      total_facturacion
    });
    await newFacturaEnc.save();

    // Crear y guardar los detalles de la factura
    const facturaDetPromises = detalles.map((detalle: any) => {
      const newFacturaDet = new FacturaDet({
        ...detalle,
        FacturaEnc: newFacturaEnc._id,
        companyId
      });
      return newFacturaDet.save();
    });
    await Promise.all(facturaDetPromises);

    return NextResponse.json(
      { message: 'Factura created successfully', facturaEnc: newFacturaEnc },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating factura:', error);
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
      // Si hay ID, buscar una factura específica
      const facturaEnc = await FacturaEnc.findOne({ _id: id, companyId });
      if (!facturaEnc) {
        return NextResponse.json({ error: 'Factura not found' }, { status: 404 });
      }
      const facturaDet = await FacturaDet.find({ FacturaEnc: id });
      return NextResponse.json({ facturaEnc, facturaDet }, { status: 200 });
    } else {
      // Si no hay ID, devolver todas las facturas de la compañía
      const facturasEnc = await FacturaEnc.find({ companyId });
      return NextResponse.json(facturasEnc, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching factura:', error);
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
    const { _id, companyId, clientId, tipoCliente, tipoFacturacion, nombre, correoElectronico, numeroRegistro, dui, total_gravado, total_excento, total_iva, total_facturacion, detalles } = body;

    // Validación de campos obligatorios
    if (!_id || !companyId || !clientId || !tipoCliente || !tipoFacturacion || !nombre || !correoElectronico) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    // Actualizar el encabezado de la factura
    const updatedFacturaEnc = await FacturaEnc.findOneAndUpdate(
      { _id, companyId },
      { clientId, tipoCliente, tipoFacturacion, nombre, correoElectronico, numeroRegistro, dui, total_gravado, total_excento, total_iva, total_facturacion },
      { new: true }
    );

    if (!updatedFacturaEnc) {
      return NextResponse.json({ error: 'Factura not found' }, { status: 404 });
    }

    // Actualizar los detalles de la factura
    await FacturaDet.deleteMany({ FacturaEnc: _id }); // Eliminar detalles antiguos
    const facturaDetPromises = detalles.map((detalle: any) => {
      const newFacturaDet = new FacturaDet({
        ...detalle,
        FacturaEnc: _id,
        companyId
      });
      return newFacturaDet.save();
    });
    await Promise.all(facturaDetPromises);

    return NextResponse.json(
      { message: 'Factura updated successfully', facturaEnc: updatedFacturaEnc },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating factura:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

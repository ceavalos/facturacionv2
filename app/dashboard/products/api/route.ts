import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase as dbConnect } from '@/lib/db';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';

// Función para validar el token JWT
const validateToken = (req: NextRequest) => {
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


export async function GET(req: NextRequest) {
  await dbConnect();

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  try {
    // Obtener el company ID del header
    const company = req.headers.get('company');
    
    if (!company) {
      return NextResponse.json({ error: 'Company ID is required' }, { status: 400 });
    }

    // Buscar productos por compañía
    const products = await Product.find({ company })
      .populate('category', 'description')
      .populate('company', 'companyName')
      .sort({ createdAt: -1 });
      
    return NextResponse.json(products);

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  try {
    const body = await req.json();

    // Verificar si ya existe un producto con el mismo nombre en la misma compañía
    const existingProduct = await Product.findOne({
      name: body.name,
      company: req.headers.get('company')  // Usar el company del header
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Ya existe un producto con este nombre para esta compañía' },
        { status: 400 }
      );
    }

    // Asegurarse de usar el company del header
    const product = await Product.create({
      ...body,
      company: req.headers.get('company')
    });
    const populatedProduct = await Product.findById(product._id)
      .populate('category', 'description')
      .populate('company', 'name businessName');

    return NextResponse.json({ product: populatedProduct }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  try {
    const body = await req.json();
    const { _id, ...updateData } = body;

    // Verificar si ya existe otro producto con el mismo nombre en la misma compañía
    const existingProduct = await Product.findOne({
      name: updateData.name,
      company: updateData.company,
      _id: { $ne: _id }
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Ya existe un producto con este nombre para esta compañía' },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
    .populate('category', 'description')
    .populate('company', 'name businessName');

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase as dbConnect } from '@/lib/db';
import Category from '@/models/Category';

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

export async function POST(req: NextRequest) {
  await dbConnect();

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  try {
    const body = await req.json();
    const { code, description, company } = body;
    
    // Validación de campos obligatorios
    if (!code || !description || !company) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Verificar si la categoría ya existe para esta compañía
    const existingCategory = await Category.findOne({ code, company });
    if (existingCategory) {
      return NextResponse.json({ error: 'Category with this code already exists for this company' }, { status: 409 });
    }

    // Crear y guardar la nueva categoría
    const newCategory = new Category({
      code,
      description,
      company
    });

    await newCategory.save();

    return NextResponse.json(
      { message: 'Category created successfully', category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

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

    // Buscar categorías por compañía
    const categories = await Category.find({ company });
    return NextResponse.json(categories, { status: 200 });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
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
    const { _id, code, description, company } = body;

    // Validación de campos obligatorios
    if (!_id || !code || !description || !company) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Verificar si existe otra categoría con el mismo código para esta compañía
    const existingCategory = await Category.findOne({
      code,
      company,
      _id: { $ne: _id } // Excluir la categoría actual de la búsqueda
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this code already exists for this company' },
        { status: 409 }
      );
    }

    // Buscar y actualizar la categoría
    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      { code, description },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Category updated successfully', category: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  // Validar token JWT
  const tokenError = validateToken(req);
  if (tokenError) {
    return NextResponse.json({ error: tokenError.error }, { status: tokenError.status });
  }

  try {
    // Obtener el ID de la categoría de la URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Category deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

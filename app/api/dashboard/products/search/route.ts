
import { NextResponse } from 'next/server';
import { connectToDatabase as dbConnect } from '@/lib/db';
import '@/models/Category';
import Product from '@/models/Product';
import { headers } from 'next/headers';

export async function GET(request: Request) {
    try {
        // Obtener headers
        const headersList = headers();
        const token = headersList.get('authorization');
        const company = headersList.get('company');

        // Validar headers
        if (!token || !company) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Obtener query parameter
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');
        console.log('Query:', query);
        // Validar query
        if (!query?.trim()) {
            return NextResponse.json(
                { error: 'Query parameter is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        const regex = new RegExp(query.trim(), 'i');
        console.log('Regex:', regex); 
        const products = await Product.find({
            name: regex,
            active: true,
            company: company // Filtrar por compañía
        })            
            //.populate('name') // Aquí especificamos que queremos name y description de category
            .populate('category', 'name description _id') // Aquí obtenemos name y description de la categoría
            .select('name category') // Seleccionamos name y la referencia a category del producto
            //.select('name')  // Seleccionamos los campos del producto
            //.select('name category')
            .limit(10);
    console.log('Products:', products);
      
        return NextResponse.json(products);

    } catch (error) {
        console.error('Error en la búsqueda de productos:', error);
        return NextResponse.json(
            { error: 'Error al buscar productos' },
            { status: 500 }
        );
    }
}

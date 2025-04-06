// /api/dashboard/products/search/route.ts
/*import { NextResponse } from 'next/server';
import { connectToDatabase as dbConnect } from '@/lib/db';
import Product from '@/models/Product';
import { headers } from 'next/headers';

// /api/dashboard/products/search/route.ts
export async function GET(request: Request) {
    try {
        const headersList = headers();
        const token = headersList.get('authorization');
        const company = headersList.get('company');

        if (!token || !company) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get query parameter from URL
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');

        if (!query) {
            return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
        }

        await dbConnect();

        const products = await Product.find({ 
            name: { $regex: query, $options: 'i' },
            active: true,
            company: company
        })
        .populate('category', 'name _id')
        .select('name price category')
        .lean();

        console.log('Query:', query);
        console.log('Found products:', products);

        return NextResponse.json(products);

    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message }, 
            { status: 500 }
        );
    }
}
*/

import { NextResponse } from 'next/server';
import { connectToDatabase as dbConnect } from '@/lib/db';
import Product from '@/models/Product';
import { headers } from 'next/headers';
import Category from '@/models/Category';

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
            /*.populate('category', 'name') */
            .populate('name') 
            .select('name category')
            .limit(10);
    console.log('Products:', products);
       /* const products = await Product.find({ 
              name: { $regex: query, $options: 'i' },
              active: true, 
              company: company
            })
            .populate('Category', 'name _id')  // This will populate both category name and id
            .lean();
*/
        return NextResponse.json(products);

    } catch (error) {
        console.error('Error en la búsqueda de productos:', error);
        return NextResponse.json(
            { error: 'Error al buscar productos' },
            { status: 500 }
        );
    }
}

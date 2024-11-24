    
// /app/api/login/route.ts
import { NextResponse } from 'next/server';
 
export async function GET() {
    console.log("desde handler....!!")
    return Response.json("orders")
} 

export async function POST(request: Request) {
  console.log("desde handler....!!")

  return NextResponse.json({ message: 'Compañía creada exitosamente' }, { status: 200 });

}
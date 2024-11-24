import { NextRequest, NextResponse } from 'next/server';

const cors = (handler: any) => async (req: NextRequest, res: any) => {
  // Permitir todas las peticiones (o puedes limitar a dominios específicos)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Cambia '*' por tu dominio si es necesario
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Manejo de la petición de preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return await handler(req, res);
};

export default cors;

import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: string | JwtPayload;  // O puedes definir un tipo más específico para 'user'
  }
}

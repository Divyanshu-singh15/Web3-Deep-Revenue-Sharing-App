// src/lib/auth.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

interface JwtPayload {
  userId: number;
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}
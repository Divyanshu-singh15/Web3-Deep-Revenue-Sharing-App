import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const JWT_SECRET = 'your-secret-key'; 

const prisma = new PrismaClient();

export async function POST({ request }: RequestEvent) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      return json({ token});
      // return json({ message: 'Login successful' }, { status: 200 });
    } else {
      // Invalid credentials
      return json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return json({ error: 'An error occurred during login' }, { status: 500 });
  }
}
// src/routes/api/register/+server.ts
import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST({ request }: RequestEvent) {
  try {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return json({ error: 'All fields are required' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword
      }
    });

    return json({ user }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return json({ error: 'Failed to register user' }, { status: 500 });
  }
}
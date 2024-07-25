// src/routes/api/registerBusiness/+server.ts
import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST({ request }: RequestEvent) {
    console.log("well")
  try {
    const { businessName, businessType, phoneNumber, contactAddress, userId } = await request.json();
    if (!businessName || !businessType || !phoneNumber || !contactAddress || !userId) {
      return json({ error: 'All fields are required' }, { status: 400 });
    }

    const business = await prisma.business.create({
      data: {
        name: businessName,
        address: '', // Assuming address is not required, or you can add address in the request
        phone: '',   // Assuming phone is not required, or you can add phone in the request
        type: '',    // Assuming type is not required, or you can add type in the request
        userId: userId,
      }
    });

    return json({ business }, { status: 201 });
  } catch (error) {
    console.error('Business registration error:', error);
    return json({ error: 'Failed to register business' }, { status: 500 });
  }
}

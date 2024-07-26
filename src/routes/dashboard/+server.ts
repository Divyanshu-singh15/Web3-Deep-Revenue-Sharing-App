import type { RequestHandler } from './$types';
import { fetchAllBusinessData, fetchBusinessData } from '$lib/api';
// src/routes/dashboard/+server.ts
import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ locals }) => {
  try {
    const userId = locals.user?.userId;
    const allBusinessData = await fetchAllBusinessData();
    const businessData = userId ? await fetchBusinessData(userId) : null;

    const responseData = {
      allBusinessData,
      businessData
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching business data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};



export async function POST({ request }: RequestEvent) {
  try {
    const { businessName, businessType, phoneNumber, contactAddress, userId } = await request.json();
    if (!businessName || !businessType || !phoneNumber || !contactAddress || !userId) {
      return json({ error: 'All fields are required' }, { status: 400 });
    }

    const business = await prisma.business.create({
      data: {
        name: businessName,
        address: contactAddress, 
        phone: phoneNumber.toString(),   
        type: businessType,    
        userId: userId,
      }
    });

    return json({ business }, { status: 201 });
  } catch (error) {
    console.error('Business registration error:', error);
    return json({ error: 'Failed to register business' }, { status: 500 });
  }
}

import type { RequestHandler } from './$types';
import { fetchAllBusinessData, fetchBusinessData } from '$lib/api';
// src/routes/dashboard/+server.ts
import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';


const prisma = new PrismaClient();


async function generateUniqueInviteCode() {
  let inviteCode: string = '';
  let isUnique = false;

  while (!isUnique) {
    inviteCode = uuidv4(); // Generate a new invite code
    try {
      // Check if the invite code already exists in the database
      const existingCode = await prisma.invitingCode.findUnique({
        where: { inviteCode: inviteCode },
      });

      if (!existingCode) {
        isUnique = true; // Invite code is unique
      }
    } catch (error) {
      throw error; // Rethrow if there's an unexpected error
    }
  }

  return inviteCode;
}

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

    // Validate input
    if (!businessName || !businessType || !phoneNumber || !contactAddress || !userId) {
      return json({ error: 'All fields are required' }, { status: 400 });
    }

    // Generate a unique invite code
    const inviteCode = await generateUniqueInviteCode();

    // Use a transaction to ensure atomicity
    const business = await prisma.business.create({
      data: {
        name: businessName,
        address: contactAddress,
        phone: phoneNumber.toString(),
        type: businessType,
        userId: userId,
      },
    });

    // Create the inviting code with the actual businessId
    const invitingCode = await prisma.invitingCode.create({
      data: {
        userId: userId,
        businessId: business.id, // Use the actual business ID
        inviteCode: inviteCode,
        isCompany: true,
      },
    });

    return json({ business, invitingCode }, { status: 201 });
  } catch (error) {
    console.error('Business registration error:', error);
    return json({ error: 'Failed to register business' }, { status: 500 });
  }
}



export const PATCH: RequestHandler = async ({ request, locals }) => {
  try {
    const { name, email, paymailAddress } = await request.json();

    if (!name || !email || !paymailAddress || !locals.user) {
      return new Response(JSON.stringify({ success: false, message: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update the user in the database
    const updateresponse = await prisma.user.update({
      where: { id: locals.user.userId },
      data: { 
        name, 
        email,
        paymailAddress 
      },
    });

    const response = {
      success: true,
      message: 'Profile updated successfully',
      updateresponse,
    };

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to update profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};



// src/routes/api/register/+server.ts
import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { referarAndCompany } from '$lib/api';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function generateUniqueInviteCode(): Promise<string> {
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

export async function POST({ request }: RequestEvent) {
  try {
    const { inviteCode, userId } = await request.json();
    if (!inviteCode || !userId) {
      return json({ error: 'Invite code and user ID are required' }, { status: 400 });
    }

    const response = await referarAndCompany(inviteCode);

    if (response === null) {
      return json({ error: 'Invalid invite code' }, { status: 400 });
    }

    const existingAssociationasOwner = await prisma.business.findFirst({
      where: {
        userId: userId,
        id: response.business.id,
      },
    });

    if (existingAssociationasOwner) {
      return json({ error: 'User is already associated with this company' }, { status: 400 });
    }

    // Check if the user is already associated with the company
    const existingAssociation = await prisma.salespersonCompany.findFirst({
      where: {
        userId: userId,
        businessId: response.business.id,
      },
    });

    if (existingAssociation) {
      return json({ error: 'User is already associated with this company' }, { status: 400 });
    }

    const latestUserInviteCode = await generateUniqueInviteCode();

    // Create new InvitingCode
    const newInvitingCode = await prisma.invitingCode.create({
      data: {
        userId: userId,
        businessId: response.business.id,
        inviteCode: latestUserInviteCode,
        isCompany: false,
      },
    });

    // Get the ID of the newly created InvitingCode
    const getTheId = newInvitingCode.id;

    // Create new SalespersonCompany
    const salespersonCompany = await prisma.salespersonCompany.create({
      data: {
        userId: userId,
        businessId: response.business.id,
        inviterId: response.user.id,
        invitingCodeId: getTheId,
      },
    });

    // Return successful response
    return json({ salespersonCompany }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return json({ error: 'Failed to register user' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

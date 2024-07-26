// src/lib/api.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchUserData(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      // Add other fields you want to return, but exclude sensitive information like passwords
    }
  });

  return user;
}


export async function fetchBusinessData(userId: number) {
  
  const business = await prisma.business.findMany({
    where: { userId: userId},
    select: {
      id: true,
      name: true,
      address: true,
      phone: true,
      type: true
      // Add other fields you want to return, but exclude sensitive information like passwords
    }
  });

  return business;
}






// src/lib/api.ts
import { PrismaClient, type Product } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchUserData(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      paymailAddress: true
      // Add other fields you want to return, but exclude sensitive information like passwords
    }
  });

  return user;
}

export async function fetchUniqueBusinessData(userId: number, businessId: number) {
  
  const business = await prisma.business.findMany({
    where: { userId: userId, id: businessId},
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

export async function fetchAllBusinessData() {
  
  const business = await prisma.business.findMany({
    where: {},
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


export async function fetchProductsData(userId: number, businessId: number) {
  
  const business = await prisma.product.findMany({
    where: { userId: userId, businessId: businessId},
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      // Add other fields you want to return, but exclude sensitive information like passwords
    }
  });

  return business;
}




export async function fetchAllProductsData() {

  const business = await prisma.product.findMany({
    where: {},
    select: {
      id: true,
      name: true,
      price: true,
      businessId: true,
      // Add other fields you want to return, but exclude sensitive information like passwords
    }
  });

  return business;
}


export async function fetchUniqueProductData(id: number) {
  const product = await prisma.product.findUnique({
    where: { id: id },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      userId: true,
      referalAmount: true
      // Add other fields you want to return, but exclude sensitive information like passwords
    }
  });

  return product;
}

export async function getPurchasesByUserId(userId: number) {
  const purchases = await prisma.purchase.findMany({
    where: {
      product: {
        userId: userId,
      },
    },
    include: {
      product: true,  // Include all product attributes
    },
  });

  return purchases;
}

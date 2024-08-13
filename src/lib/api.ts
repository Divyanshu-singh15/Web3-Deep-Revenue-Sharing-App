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
    where: { userId: userId },
    select: {
      id: true,
      name: true,
      address: true,
      phone: true,
      type: true,
      invitingCode: { // Fetch the inviting codes associated with each business
        select: {
          inviteCode: true,
          isCompany: true
        }
      }
    }
  });

  // Transform the data if needed
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
      referalPercent: true,
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
      referalPercent: true,
      businessId: true,
      // Add other fields you want to return, but exclude sensitive information like passwords
    }
  });

  return product;
}



export async function getPurchasesByUserId(userId: number) {
  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        product: {
          userId: userId,
        },
      },
      include: {
        product: true,
      },
    });
    return purchases;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


export async function getReferalPurchasesByUserId(userId: number) {
  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        referrerId: userId,
      },
      include: {
        product: true,
      },
    });
    return purchases;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function referarAndCompany(invitingCode: string) {
  try {
    const referal = await prisma.invitingCode.findUnique({
      where: { inviteCode: invitingCode },
      include: {
        user: true,
        business: true,
      },
    });
    return referal;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


export async function fetchAllSalespersonBusinessData(userId: number) {
  try {
    const salespersoncompanies = await prisma.salespersonCompany.findMany({
      where: {
        userId: userId
      },
      include: {
        business: true,
        invitingCode: true
      }
    });
    return salespersoncompanies;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


// interface InviterChainResult {
//   id: number;
//   userId: number;
//   businessId: number;
//   inviterId: number | null;
// }

export async function getInviterChain(userId: number, businessId: number) {
  const chain = await prisma.$queryRaw`
    WITH RECURSIVE InviterChain AS (
        SELECT
            id,
            "userId",
            "businessId",
            "inviterId"
        FROM
            "SalespersonCompany"
        WHERE
            "userId" = ${userId} AND "businessId" = ${businessId}
        UNION ALL
        SELECT
            sc.id,
            sc."userId",
            sc."businessId",
            sc."inviterId"
        FROM
            "SalespersonCompany" sc
        INNER JOIN
            InviterChain ic ON sc."userId" = ic."inviterId"
        WHERE
            sc."businessId" = ic."businessId"
    )
    SELECT * FROM InviterChain;
  `;
  return chain;
}


export async function productCompany(productId: number) {
  try {
    const referal = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        user: true,
        business: true,
      },
    });
    return referal;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


export async function fetchPaymails(users: number[]) {
  const paymails = await prisma.user.findMany({
    where: {
      OR: users.map((userId) => ({
        id: userId,
      })),
    },
    select: {
      id: true,
      paymailAddress: true,
    },
  });
  return paymails;
}

export async function fetchUserEarning(referrerId: number) {
  // Fetch all earnings records where userId matches the given referrerId
  const earningsWithPurchase = await prisma.earnings.findMany({
    where: {
      userId: referrerId,
    },
    include: {
      purchase: true, // Include purchase data
    },
  });

  // Filter out earnings records where the purchase referrerId does not match
  const filteredEarnings = earningsWithPurchase.map((earning) => {
    if (earning.purchase?.referrerId !== referrerId) {
      return {
        ...earning,
        purchase: null, // Set purchase to null if referrerId doesn't match
      };
    }
    return earning;
  });

  return filteredEarnings;
}



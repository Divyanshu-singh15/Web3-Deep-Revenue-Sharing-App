import { PrismaClient } from '@prisma/client';
import { json, type RequestEvent } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function POST({ request, locals }: RequestEvent) {
  try {
    const { name, description, price, companyId, referalAmount} = await request.json();
    
    if (!name || !description || !price || !companyId || !locals.user?.userId || !referalAmount || referalAmount <= 0) {
      return json({ error: 'All fields are required' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        businessId: companyId,
        userId: locals.user.userId,
        referalAmount: referalAmount ? parseInt(referalAmount) : 0,
      },
    });

    return json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return json({ error: 'Failed to create product' }, { status: 500 });
  }
}

import type { RequestHandler } from './$types';
import { fetchAllBusinessData, fetchBusinessData, fetchProductsData } from '$lib/api';
// src/routes/dashboard/+server.ts
import { error, json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ locals, params }) => {
  try {
    const userId = locals.user?.userId;
    // const allBusinessData = await fetchAllBusinessData();
    // const businessData = userId ? await fetchBusinessData(userId) : null;
    if (!userId){
        throw error
    }

    const productsData = await fetchProductsData(userId, parseInt(params.companyId))
    const responseData = {
        productsData
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
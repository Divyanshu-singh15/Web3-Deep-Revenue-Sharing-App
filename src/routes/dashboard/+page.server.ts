// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { fetchUserData, fetchBusinessData, fetchAllBusinessData, fetchAllProductsData, getPurchasesByUserId } from '$lib/api'; // Implement this function to fetch user data


export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, '/login');
  }

  
  // Fetch user-specific data
  const userData = await fetchUserData(locals.user.userId);

  const businessData = await fetchBusinessData(locals.user.userId)

  const allBusinessData = await fetchAllBusinessData()

  const allProductsData = await fetchAllProductsData()

  const purchaseData = await getPurchasesByUserId(locals.user.userId)

  return {
    userData,
    businessData,
    allBusinessData,
    allProductsData,
    purchaseData
  };
};

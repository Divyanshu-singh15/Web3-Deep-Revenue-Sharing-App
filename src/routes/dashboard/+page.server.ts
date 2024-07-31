// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import { fetchUserData, fetchBusinessData, fetchAllBusinessData, fetchAllProductsData, getPurchasesByUserId, getReferalPurchasesByUserId } from '$lib/api'; // Implement this function to fetch user data



export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, '/login');
  }

  
  // Fetch user-specific data
  const userData = await fetchUserData(locals.user.userId);

  const businessData = await fetchBusinessData(locals.user.userId)

  const allBusinessData = await fetchAllBusinessData()

  const allProductsData = await fetchAllProductsData()


  //this is being used to fetch all the sells of businesses of a user
  const purchasesData = await getPurchasesByUserId(locals.user.userId)

  //this is being used to fetch all the referl sells made by the user
  const referalPurchaseData = await getReferalPurchasesByUserId(locals.user.userId)

  return {
    userData,
    businessData,
    allBusinessData,
    allProductsData,

    purchasesData,
    referalPurchaseData
  };
};

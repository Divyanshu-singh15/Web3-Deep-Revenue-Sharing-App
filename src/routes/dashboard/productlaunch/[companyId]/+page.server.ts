// src/routes/dashboard/productlaunch/[companyId]/+page.server.ts
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { fetchUniqueBusinessData, fetchBusinessData, fetchAllBusinessData, fetchProductsData } from '$lib/api'; // Implement these functions to fetch data

export const load: PageServerLoad = async ({ locals, params }) => {
  if (!locals.user) {
    throw redirect(303, '/login');
  }

  const companyId = parseInt(params.companyId); // Correctly access the route parameter

  const businessData = await fetchUniqueBusinessData(locals.user.userId, companyId)

  if (!businessData || businessData.length === 0) {
    throw error(404, `No such business exist`);
  }
  const productsData = await fetchProductsData(locals.user.userId, companyId);
  
  return {
    companyId,
    productsData
  };
};

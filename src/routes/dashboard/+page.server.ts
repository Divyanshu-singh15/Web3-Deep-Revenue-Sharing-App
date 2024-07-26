// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { fetchUserData, fetchBusinessData } from '$lib/api'; // Implement this function to fetch user data


export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, '/login');
  }

  
  // Fetch user-specific data
  const userData = await fetchUserData(locals.user.userId);
  console.log("hehehehehehehe");
  const businessData = await fetchBusinessData(locals.user.userId)

  return {
    userData,
    businessData
  };
};
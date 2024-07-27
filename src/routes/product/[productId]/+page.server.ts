import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async ({ locals, params }) => {
      throw redirect(303, `/product/${params.productId}/item`);
    return {};
  };
  
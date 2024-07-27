import type { PageServerLoad } from '../$types';
import {fetchUniqueProductData} from  '$lib/api'


export const load: PageServerLoad = async ({ params }) => {
    const id = parseInt(params.productId, 10);
    if (isNaN(id)) {
        // Handle invalid ID case
        return { status: 404, error: new Error('Product not found') };
      }
      
      const productData = await fetchUniqueProductData(id);

      if (!productData) {
        return { status: 404, error: new Error('Product not found') };
      }

    return {
        productData,
        referrer: parseInt(params.referrer)
    };
}

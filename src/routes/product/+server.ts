import { error, type RequestHandler } from '@sveltejs/kit';
import makePayment from '../../../neucron_sdk';
import { fetchUniqueProductData, fetchUserData } from '$lib/api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PaymentRequestBody {
  name: string;
  phone: string;
  wallet: string;
  address: string;
  password: string;
  productId: number;
  referrerId: number;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body: PaymentRequestBody = await request.json();
    const { name, phone, wallet, address, password, productId, referrerId } = body;

    const productData = await fetchUniqueProductData(productId);
    if (!productData?.userId) {
      throw error(404, 'Product not found');
    }

    const userData = await fetchUserData(productData.userId);
    const referData = await fetchUserData(referrerId);

    const referPaymail = referData?.paymailAddress || '';
    const companyAmount = productData.referalAmount 
      ? productData.price - productData.referalAmount 
      : productData.price;

    const result = await makePayment(
      wallet,
      password,
      userData?.paymailAddress || '',
      companyAmount,
      "Product purchase",
      "Someone bought your referred product",
      referPaymail,
      productData.referalAmount || 0
    );

    if (result.success) {
      console.log('Payment successful:', result.response);
      console.log('Wallet keys:', result.walletKeys);
      console.log('Current balance:', result.balance);

      await prisma.purchase.create({
        data: {
          name,
          phone,
          address,
          productId,
          referrerId,
        }
      });

      return new Response(JSON.stringify({
        message: 'Payment successful',
        response: result.response,
        walletKeys: result.walletKeys,
        balance: result.balance
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      console.error('Payment failed:', result.error);
      return new Response(JSON.stringify({
        message: 'Payment failed',
        error: result.error
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (err) {
    console.error('Error during payment processing:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({
      message: 'Internal server error',
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
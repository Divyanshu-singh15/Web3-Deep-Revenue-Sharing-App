import { error, type RequestHandler } from '@sveltejs/kit';
import makePayment from '../../../neucron_sdk';
import { fetchUniqueProductData, fetchUserData, getInviterChain, fetchPaymails } from '$lib/api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PaymentRequestBody {
  name: string;
  phone: string;
  wallet: string;
  address: string;
  password: string;
  productId: number;
  referrerId: number | null;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body: PaymentRequestBody = await request.json();
    const { name, phone, wallet, address, password, productId, referrerId } = body;
    console.log("body", body);

    const productData = await fetchUniqueProductData(productId);

    // Check if the product exists
    if (!productData || productData === null) {
      throw error(404, 'Product not found');
    }

    // Check if the company exists
    const userData = await fetchUserData(productData.userId);
    if (!userData || userData === null) {
      throw error(404, 'Company not found');
    }

    let paymentObject = [];
    let earningsRecords = [];
    let referalAmount = Math.floor(productData.referalPercent * productData.price / 100.0);
    let companyAmount = productData.price;

    if (referrerId !== null) {
      // Check if the referrer exists
      let referData = null;
      try {
        referData = await fetchUserData(referrerId);
      } catch (e) {
        console.log("No referer found");
      }

      if (referData) {
        console.log("productData", referrerId, productData.businessId);
        let inviterchain = await getInviterChain(referrerId, productData.businessId) as { inviterId: number }[];
        console.log("inviterchain", inviterchain);

        let inviters: number[] = [];
        for (let i = 0; i < inviterchain.length; i++) {
          inviterchain[i].inviterId && inviters.push(inviterchain[i].inviterId);
        }
        console.log("inviters", inviters);

        let paymails = await fetchPaymails(inviters);

        const referPaymail = referData?.paymailAddress;
        let factor = productData.referalPercent / 100.0;
        let nextReferalAmount = Math.floor(factor * referalAmount);
        companyAmount -= referalAmount;

        paymentObject.push({
          address: referPaymail,
          note: "Referral Payment",
          amount: referalAmount - (paymails.length !== 0 ? nextReferalAmount : 0)
        });

        earningsRecords.push({
          purchaseId: -1,
          userId: referData.id,
          amountEarned: referalAmount - (paymails.length !== 0 ? nextReferalAmount : 0),
        });

        for (let i = 0; i < paymails.length; i++) {
          referalAmount = nextReferalAmount;
          if (i !== paymails.length - 1) {
            nextReferalAmount = Math.floor(factor * referalAmount);
            referalAmount -= nextReferalAmount;
          }

          if (referalAmount < 1) {
            break;
          }

          earningsRecords.push({
            purchaseId: -1,
            userId: inviters[i],
            amountEarned: referalAmount,
          });

          paymentObject.push({
            address: paymails[i].paymailAddress,
            note: "Invitee Referral Payment",
            amount: referalAmount
          });
        }
      }
    }

    paymentObject.push({
      address: userData.paymailAddress,
      note: "Company Payment",
      amount: companyAmount
    });

    earningsRecords.push({
      purchaseId: -1,
      userId: userData.id,
      amountEarned: companyAmount,
    });

    console.log("paymentObject", paymentObject);
    console.log("earningsRecords", earningsRecords);

    // Make the payment to the company
    const result = await makePayment(wallet, password, paymentObject);

    if (result.success) {
      console.log('Payment successful:', result.response);
      console.log('Wallet keys:', result.walletKeys);
      console.log('Current balance:', result.balance);

      const purchaserow = await prisma.purchase.create({
        data: {
          name,
          phone,
          address,
          productId,
          referrerId,
        }
      });

      for (let i = 0; i < earningsRecords.length; i++) {
        earningsRecords[i].purchaseId = purchaserow.id;
      }

      await prisma.earnings.createMany({
        data: earningsRecords
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

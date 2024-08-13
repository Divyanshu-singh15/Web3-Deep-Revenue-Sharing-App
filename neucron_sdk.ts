// @ts-nocheck
import NeucronSDK from "neucron-sdk";

async function makePayment(email, password, paymentOptions) {
  try {
    const neucron = new NeucronSDK();
    const authModule = neucron.authentication;
    const walletModule = neucron.wallet;

    // Login with provided credentials
    console.log("loginwell", email, password);
    await authModule.login({ email, password });
    console.log("loginwellloggedin");

    // Get wallet keys and balance (optional, for verification)
    const walletKeys = await walletModule.getWalletKeys({});
    const defaultWalletBalance = await walletModule.getWalletBalance({});
  
    // let options = {};
    // const options = {outputs: [
    //   {
    //     address: companyUserAddress,
    //     note: companyNote,
    //     amount: compnayAmount
    //   }]};
    // Prepare payment options

    let options = {outputs: paymentOptions};
    
    console.log("bing", email, password, options);
    // Make the payment
    const payResponse = await neucron.pay.txSpend(options);
    
    return {
      success: true,
      response: payResponse,
      walletKeys: walletKeys,
      balance: defaultWalletBalance
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

export default makePayment;
// @ts-nocheck
import NeucronSDK from "neucron-sdk";

async function makePayment(email, password, companyUserAddress, compnayAmount, companyNote, referalnote, referalAddress, referalamount ) {
  try {
    const neucron = new NeucronSDK();
    const authModule = neucron.authentication;
    const walletModule = neucron.wallet;

    // Login with provided credentials
    await authModule.login({ email, password });

    // Get wallet keys and balance (optional, for verification)
    const walletKeys = await walletModule.getWalletKeys({});
    const defaultWalletBalance = await walletModule.getWalletBalance({});
    let options = {};
    // const options = {outputs: [
    //   {
    //     address: companyUserAddress,
    //     note: companyNote,
    //     amount: compnayAmount
    //   }]};
    // Prepare payment options

    if (referalAddress===''){
      options = {
        outputs: [
          {
            address: companyUserAddress,
            note: companyNote,
            amount: compnayAmount
          }]
    }}
    else {
     options = {
        outputs: [
          {
            address: companyUserAddress,
            note: companyNote,
            amount: compnayAmount
          },{
            address: referalAddress,
            note: referalnote,
            amount: referalamount
          }
        ]
      };
    }
    

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
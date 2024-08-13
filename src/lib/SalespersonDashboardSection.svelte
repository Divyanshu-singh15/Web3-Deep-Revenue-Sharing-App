<script lang="ts">
  export let data: any;

  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let baseUrl = '';
  let inviteCode: string = '';

  onMount(() => {
    baseUrl = window.location.origin;
  });

  

  let allBusinessData: any[] = [];
  
  for (let i = 0; i < data.salespersoncompanies.length; i++) {
    let updateddata = {...data.salespersoncompanies[i].business, inviteCode: data.salespersoncompanies[i].invitingCode.inviteCode}

    allBusinessData.push(updateddata);
  }

  console.log("mou1", allBusinessData)
  console.log("mouall", allBusinessData)

  // State to track the expanded business
  let expandedBusinessId: number | null = null;

  // Method to toggle the expansion
  function toggleExpansion(businessId: number) {
    expandedBusinessId = expandedBusinessId === businessId ? null : businessId;
  }
  
  // Method to get products for a specific business
  function getProductsForBusiness(businessId: number) {
    return data.allProductsData.filter((product: { businessId: number; }) => product.businessId === businessId);
  }

  const copyLink = (productId: number, userId: number ) => {
    const link = `${baseUrl}/product/${productId}/${userId}`;
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const copyLink2 = (inviteCode: string) => {
    const link = `${inviteCode}`;
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // State to track the current tab
  let currentTab = 'dashboard';

  function processReferralData(referralData: any[]) {
    let businessStats: { [key: number]: { totalEarned: number, products: { [key: number]: { name: string, quantity: number, totalEarned: number } } } } = {};

    referralData.forEach(purchase => {
      const businessId = purchase.product.businessId;
      const productId = purchase.product.id;
      const referralAmount = purchase.product.referalPercent;

      if (!businessStats[businessId]) {
        businessStats[businessId] = { totalEarned: 0, products: {} };
      }

      businessStats[businessId].totalEarned += referralAmount;

      if (!businessStats[businessId].products[productId]) {
        businessStats[businessId].products[productId] = {
          name: purchase.product.name,
          quantity: 0,
          totalEarned: 0
        };
      }

      businessStats[businessId].products[productId].quantity += 1;
      businessStats[businessId].products[productId].totalEarned += referralAmount;
    });

    return Object.entries(businessStats).map(([businessId, data]) => ({
      businessId: Number(businessId),
      ...data
    }));
  }

  $: processedReferralData = processReferralData(data.referalPurchaseData);

  // State to track the expanded business in statistics
  let expandedStatBusinessId: number | null = null;

  // Function to toggle expansion in statistics
  function toggleStatExpansion(businessId: number) {
    expandedStatBusinessId = expandedStatBusinessId === businessId ? null : businessId;
  }

  function getBusinessNameById(businessId: number) {
    const business = allBusinessData.find((b: { id: number; }) => b.id === businessId);
    return business ? business.name : 'Business not found';
  }

  async function joinCompany()  {
    if (!inviteCode) {
      alert('Please enter the invite code');
      return;
    }
    const response = await fetch('/companyjoinserver', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inviteCode: inviteCode,
        userId: data.userData?.id,
      }),
    });

    if (response.ok) {
      alert('Successfully joined the company!');
    } else {
      alert('Failed to join the company.');
    }
  }

  let tot = 0;
  console.log("moun", data.userEarnings.length) 
  for (let i=0; i < data.userEarnings.length; i++) {
    if (data.userEarnings[i].purchase === null) {
      tot = tot + data.userEarnings[i].amountEarned;
    }
  }

</script>

<style>
  .tab-buttons {
    display: flex;
    cursor: pointer;
  }
  .tab-button {
    padding: 10px 20px;
    margin-right: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .tab-button.active {
    background-color: #fff;
    border-bottom: none;
    font-weight: bold;
  }
  .tab-content {
    display: none;
  }
  .tab-content.active {
    display: block;
  }
</style>

<div class="container mx-auto">
  <!-- Tab Navigation -->
  <div class="tab-buttons">
    <button class="tab-button {currentTab === 'dashboard' ? 'active' : ''}" on:click={() => currentTab = 'dashboard'} role="tab">
      Salesperson Dashboard
    </button>
    <button class="tab-button {currentTab === 'statistics' ? 'active' : ''}" on:click={() => currentTab = 'statistics'} role="tab">
      Your Statistics
    </button>
  </div>

  <!-- Salesperson Dashboard Section -->
  <div class="tab-content {currentTab === 'dashboard' ? 'active' : ''}">
    <h2 class="text-xl font-bold mb-4">Salesperson Dashboard</h2>
    <form class="flex items-center space-x-4" on:submit|preventDefault={joinCompany}>
      <label for="inviteCode" class="text-gray-700 text-sm font-semibold">Invite Code</label>
      <input
        type="text"
        id="inviteCode"
        class="border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
        placeholder="Enter code"
        bind:value={inviteCode}
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Join
      </button>
    </form>
    
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        {#if data.userData?.paymailAddress === null}
          <p class="p-4 text-red-500">Kindly set your paymail Id in your profile first so that you receive the reward</p>
        {/if}
        <table class="w-full">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 text-left font-semibold">Name</th>
              <th class="py-2 px-4 text-left font-semibold">Type</th>
              <th class="py-2 px-4 text-left font-semibold">Phone</th>
              <th class="py-2 px-4 text-left font-semibold">Address</th>
              <th class="py-2 px-4 text-left font-semibold">Invite</th>
              <th class="py-2 px-4"></th> <!-- Empty header for the "View" button -->
            </tr>
          </thead>
          <tbody>
            {#each allBusinessData as business, index}
              <tr class={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td class="py-2 px-4 cursor-pointer" on:click={() => toggleExpansion(business.id)}>{business.name}</td>
                <td class="py-2 px-4">{business.type}</td>
                <td class="py-2 px-4">{business.phone}</td>
                <td class="py-2 px-4">{business.address}</td>
                <th class="py-2 px-4 text-left font-semibold">
                  <button on:click={() => copyLink2(business.inviteCode)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Copy Invite Code
                  </button>
                </th>
                <td class="py-2 px-4">
                  <button class="text-blue-500 hover:text-blue-700" on:click={() => toggleExpansion(business.id)}>
                    {expandedBusinessId === business.id ? 'Hide' : 'View'}
                  </button>
                </td>
              </tr>
              {#if expandedBusinessId === business.id}
                {#each getProductsForBusiness(business.id) as product}
                  <tr class="bg-gray-200">
                    <td class="py-2 px-4 pl-8" colspan="5">
                      <div class="flex justify-between">
                        <span>{product.name}</span>
                        <span>price: ${product.price}</span>
                        <span>referal percentage: {product.referalPercent} %</span>
                        <button on:click={() => copyLink(product.id, data.userData.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          Copy Referral Link
                        </button>
                      </div>
                    </td>
                  </tr>
                {/each}
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Your Statistics Section -->
  <div class="tab-content {currentTab === 'statistics' ? 'active' : ''}">
    <h2 class="text-xl font-bold mb-4">Your Statistics</h2>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <!-- <p class="text-gray-700 text-sm font-bold mb-2">Total Products: {data.allProductsData.length}</p> -->
      <p class="text-gray-700 text-sm font-bold mb-2">Total Businesses: {allBusinessData.length}</p>
        <p>Earnings due to invitees: $ {tot}</p> 
      <h3 class="text-lg font-bold mt-4 mb-2">Referral Earnings</h3>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-2 px-4 text-left font-semibold border-b">Business ID</th>
            <th class="py-2 px-4 text-left font-semibold border-b">Total Earned</th>
          </tr>
        </thead>
        <tbody>
          {#each processedReferralData as { businessId, totalEarned, products }}
            <tr class={businessId % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td class="py-2 px-4 border-b cursor-pointer" on:click={() => toggleStatExpansion(businessId)}>
                {getBusinessNameById(businessId)}
              </td>
              <td class="py-2 px-4 border-b">${totalEarned.toFixed(2)}</td>
            </tr>
            {#if expandedStatBusinessId === businessId}
              {#each Object.entries(products) as [productId, product]}
                <tr class="bg-gray-200">
                  <td class="py-2 px-4 pl-8 border-b" colspan="2">
                    <div class="flex justify-between">
                      <span>{product.name}</span>
                      <span>Quantity: {product.quantity}</span>
                      <span>Earned: ${product.totalEarned.toFixed(2)}</span>
                    </div>
                  </td>
                </tr>
              {/each}
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>



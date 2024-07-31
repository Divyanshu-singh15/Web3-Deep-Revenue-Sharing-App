<script lang="ts">
  export let data: any;
  export let businessName: string;
  export let contactAddress: string;
  export let phoneNumber: string;
  export let businessType: string;
  export let registerBusiness: () => void;

  let currentTab = 'businesses';

  let statistics = {
    totalBusinesses: data ? data.businessData.length : 0,
  };

  function switchTab(tabName: string) {
    currentTab = tabName;
  }

  let expandedBusinessId: number | null = null;

  // Aggregate data by business
  let businessData: { [key: number]: { totalPurchases: number; totalAmountEarned: number; products: { [key: number]: { name: string; quantity: number; totalEarned: number } } } } = {};

  // Process data to aggregate purchases and amount earned by business and product
  data.purchasesData.forEach((entry: any) => {
    const businessId = entry.product.businessId;
    const productId = entry.product.id;
    const price = entry.product.price;

    if (!businessData[businessId]) {
      businessData[businessId] = {
        totalPurchases: 0,
        totalAmountEarned: 0,
        products: {}
      };
    }

    businessData[businessId].totalPurchases += 1;
    if (entry.referrerId){
      businessData[businessId].totalAmountEarned += price - entry.product.referalAmount;
    }
    else{
      businessData[businessId].totalAmountEarned += price;
    } 

    if (!businessData[businessId].products[productId]) {
      businessData[businessId].products[productId] = {
        name: entry.product.name,
        quantity: 0,
        totalEarned: 0
      };
    }

    businessData[businessId].products[productId].quantity += 1;
    if (entry.referrerId){
      businessData[businessId].products[productId].totalEarned += price - entry.product.referalAmount;
    }else{
      businessData[businessId].products[productId].totalEarned += price;
    }
    
  });

  // Convert businessData object to array for easier rendering
  let tableData = Object.entries(businessData).map(([businessId, data]) => ({
    businessId: Number(businessId),
    ...data
  }));

  function toggleRow(businessId: number) {
    expandedBusinessId = expandedBusinessId === businessId ? null : businessId;
  }

  function getBusinessNameById(businessId: number) {
  const business = data.businessData.find((b: { id: number; }) => b.id === businessId);
  return business ? business.name : 'Business not found';
  }
</script>

<style>
  .collapsible-content {
    display: none;
    margin-left: 20px;
  }
  .collapsible-content.show {
    display: table-row;
  }
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
    <button class="tab-button {currentTab === 'businesses' ? 'active' : ''}" on:click={() => switchTab('businesses')} role="tab">
      Your Businesses
    </button>
    <button class="tab-button {currentTab === 'registration' ? 'active' : ''}" on:click={() => switchTab('registration')} role="tab">
      Business Registration
    </button>
    <button class="tab-button {currentTab === 'statistics' ? 'active' : ''}" on:click={() => switchTab('statistics')} role="tab">
      Business Statistics
    </button>
  </div>

  <!-- Your Businesses Section -->
  <div class="tab-content {currentTab === 'businesses' ? 'active' : ''}">
    <h2 class="text-xl font-bold mb-4">Your Businesses</h2>
    {#each data.businessData as business, index}
      <div class="flex justify-between items-center p-4 border-b border-gray-300">
        <div>
          <span class="font-bold">{business.name}</span>
          <span class="text-gray-500 ml-2">{business.type}</span>
        </div>
        <div>
          <a href="/dashboard/productlaunch/{business.id}" class="text-blue-500 hover:text-blue-700">
            View
          </a>            
        </div>
      </div>
    {/each}
  </div>

  <!-- Business Registration Section -->
  <div class="tab-content {currentTab === 'registration' ? 'active' : ''}">
    <h2 class="text-xl font-bold mb-4">Business Registration</h2>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={registerBusiness}>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="businessName">Business Name</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="businessName" type="text" placeholder="Enter business name" bind:value={businessName} />
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="contactAddress">Address</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactAddress" type="text" placeholder="Enter contact address" bind:value={contactAddress} />
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="contactNumber">Phone</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactNumber" type="number" placeholder="Enter contact number" bind:value={phoneNumber} />
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="businessType">Business type</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="businessType" type="text" placeholder="Enter business type" bind:value={businessType} />
      </div>
      
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
      </div>
    </form>
  </div>

  <!-- Business Statistics Section -->
  <div class="tab-content {currentTab === 'statistics' ? 'active' : ''}">
    <h2 class="text-xl font-bold mb-4">Business Statistics</h2>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <p class="text-gray-700 text-sm font-bold mb-2">Total Businesses: {statistics.totalBusinesses}</p>
      <div class="container mx-auto mt-4">
        <h2 class="text-xl font-bold mb-4">Business Summary</h2>
        
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="py-2 px-4 text-left font-semibold border-b">Business Name</th>
                <th class="py-2 px-4 text-left font-semibold border-b">Total Sold</th>
                <th class="py-2 px-4 text-left font-semibold border-b">Total Amount Earned</th>
              </tr>
            </thead>
            <tbody>
              {#each tableData as { businessId, totalPurchases, totalAmountEarned, products }}
                <tr class={businessId % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td class="py-2 px-4 border-b cursor-pointer" on:click={() => toggleRow(businessId)}>
                    {getBusinessNameById(businessId)}
                  </td>
                  <td class="py-2 px-4 border-b text-center">{totalPurchases}</td>
                  <td class="py-2 px-4 border-b text-center">${totalAmountEarned.toFixed(2)}</td>
                </tr>
                {#if expandedBusinessId === businessId}
                  {#each Object.entries(products) as [productId, product]}
                    <tr class="collapsible-content show">
                      <td class="py-2 px-4 pl-8 border-b" colspan="3">
                        <div class="flex justify-between">
                          <span>{product.name}</span>
                          <span>Quantity: {product.quantity}</span>
                          <span>Total Earned: ${product.totalEarned.toFixed(2)}</span>
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
  </div>
</div>
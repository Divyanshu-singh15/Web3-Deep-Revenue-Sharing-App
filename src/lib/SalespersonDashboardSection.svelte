<script lang="ts">
  export let data: any;

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
</script>

<div>
  <h2 class="text-xl font-bold mb-4">Salesperson Dashboard</h2>
  
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-2 px-4 text-left font-semibold">Name</th>
            <th class="py-2 px-4 text-left font-semibold">Type</th>
            <th class="py-2 px-4 text-left font-semibold">Phone</th>
            <th class="py-2 px-4 text-left font-semibold">Address</th>
            <th class="py-2 px-4"></th> <!-- Empty header for the "View" button -->
          </tr>
        </thead>
        <tbody>
          {#each data.allBusinessData as business, index}
            <tr class={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td class="py-2 px-4 cursor-pointer" on:click={() => toggleExpansion(business.id)}>{business.name}</td>
              <td class="py-2 px-4">{business.type}</td>
              <td class="py-2 px-4">{business.phone}</td>
              <td class="py-2 px-4">{business.address}</td>
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
                      <span>${product.price}</span>
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

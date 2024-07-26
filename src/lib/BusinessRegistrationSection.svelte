<script lang="ts">
    export let data;
    export let businessName: string;
    export let contactAddress: string;
    export let phoneNumber: string;
    export let businessType: string;
    export let registerBusiness: () => void;
  </script>
  
  <div>
    <div class="container mx-auto">
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
  
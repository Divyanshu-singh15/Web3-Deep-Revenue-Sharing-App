<script lang="ts">
  // import { auth } from '$lib/stores/auth';
  import { onMount } from 'svelte';

  export let data;

  let activeSection = 'businessRegistration';
  let businessName = '';
  let contactAddress = '';
  let phoneNumber = '';
  let businessType = ''

  const switchSection = (section: string) => {
    activeSection = section;
  };

  const updateBusinessData = async () => {
    try {
      const response = await fetch('/api/getBusinessData');
      if (response.ok) {
        const newData = await response.json();
        data.businessData = newData; // Update the business data
      } else {
        console.error('Failed to fetch business data.');
      }
    } catch (error) {
      console.error('Error fetching business data:', error);
    }
  };

  const registerBusiness = async () => {
  const response = await fetch('/api/registerBusiness', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      businessName,
      businessType,
      phoneNumber,
      contactAddress,
      userId: data.userData?.id, // Assuming the authenticated user data includes an id field
    }),
  });

  if (response.ok) {
    alert('Business registered successfully!');
    // Optionally, you can reset the form fields or switch sections
    businessName = '';
    businessType = '';
    contactAddress = '';
    phoneNumber = '';
    updateBusinessData();
    switchSection('salespersonDashboard'); // Switch to another section if desired
  } else {
    alert('Failed to register business.');
  }
};

</script>

<!-- {#if $auth.isAuthenticated} -->
<div class="min-h-screen bg-gray-100 p-4">
  <div class="max-w-7xl mx-auto">
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="bg-gray-800 text-white p-4 flex justify-between">
        <h1 class="text-2xl">Dashboard</h1>
      </div>
      
      <div class="p-4 flex">
        <button
          class="{activeSection === 'businessRegistration' ? 'section-active' : 'section-inactive'} px-4 py-2 rounded-md mr-2"
          on:click={() => switchSection('businessRegistration')}>
          Business Registration
        </button>
        <button
          class="{activeSection === 'salespersonDashboard' ? 'section-active' : 'section-inactive'} px-4 py-2 rounded-md"
          on:click={() => switchSection('salespersonDashboard')}>
          Salesperson Dashboard
        </button>
      </div>
      <div class="p-4">
        {#if activeSection === 'businessRegistration'}
        <div>
          <div class="container mx-auto">
            {#each data.businessData as business, index}
              <div class="flex justify-between items-center p-4 border-b border-gray-300">
                <div>
                  <span class="font-bold">{business.name}</span>
                  <span class="text-gray-500 ml-2">{business.type}</span>
                </div>
                <div>
                  <button class="text-blue-500 hover:text-blue-700">View</button>
                </div>
              </div>
            {/each}
          </div>
          <h2 class="text-xl font-bold mb-4">Business Registration</h2>
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={registerBusiness}>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="businessName">
                Business Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="businessName"
                type="text"
                placeholder="Enter business name"
                bind:value={businessName} />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="contactEmail">
                Address
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contactAddress"
                type="text"
                placeholder="Enter contact address"
                bind:value={contactAddress} />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="contactEmail">
                Phone
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contactNumber"
                type="number"
                placeholder="Enter contact number"
                bind:value={phoneNumber} />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="contactEmail">
                Business type
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="businessType"
                type="text"
                placeholder="Enter business type"
                bind:value={businessType} />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
        {/if}
        {#if activeSection === 'salespersonDashboard'}
        <div>
          <h2 class="text-xl font-bold mb-4">Salesperson Dashboard</h2>
          <!-- Salesperson Dashboard Content -->
          <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p>Sales statistics and data will be displayed here.</p>
          </div>
        </div>
        {/if}
      </div>
    </div>
  </div>
</div>
<p>User data: {JSON.stringify(data.userData)}</p>
<!-- {:else}
<p>Please log in to view this page.</p>
{/if} -->

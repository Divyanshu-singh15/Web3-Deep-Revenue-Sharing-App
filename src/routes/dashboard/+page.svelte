<script lang="ts">
  import { onMount } from 'svelte';
  import BusinessRegistrationSection from '$lib/BusinessRegistrationSection.svelte';
  import SalespersonDashboardSection from '$lib/SalespersonDashboardSection.svelte';
	import { goto } from '$app/navigation';

  export let data;

  let activeSection = 'businessRegistration';
  let businessName = '';
  let contactAddress = '';
  let phoneNumber = '';
  let businessType = '';

  const switchSection = (section: string) => {
    activeSection = section;
  };

  async function getBusinessData() {
    const response = await fetch('/dashboard');
    const newdata = await response.json();
    data = {...data, ...newdata}
}

  const registerBusiness = async () => {
    const response = await fetch('/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        businessName,
        businessType,
        phoneNumber,
        contactAddress,
        userId: data.userData?.id,
      }),
    });

    if (response.ok) {
      alert('Business registered successfully!');
      businessName = '';
      businessType = '';
      contactAddress = '';
      phoneNumber = '';
      getBusinessData()
      switchSection('salespersonDashboard');
    } else {
      alert('Failed to register business.');
    }
  };
</script>

<div class="min-h-screen bg-gray-100 p-4">
  <div class="max-w-7xl mx-auto">
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-gray-800 text-white p-4 flex justify-between">
        <h1 class="text-2xl">Dashboard</h1>
      </div>
      
      <!-- Section Buttons -->
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
      
      <!-- Section Content -->
      <div class="p-4">
        {#if activeSection === 'businessRegistration'}
          <!-- Business Registration Section -->
          <BusinessRegistrationSection 
            {data} 
            bind:businessName 
            bind:contactAddress 
            bind:phoneNumber 
            bind:businessType 
            {registerBusiness} 
          />
        {/if}
        
        {#if activeSection === 'salespersonDashboard'}
          <!-- Salesperson Dashboard Section -->
          <SalespersonDashboardSection {data} />
        {/if}
      </div>
    </div>
  </div>
</div>

<p>User data: {JSON.stringify(data.userData)}</p>

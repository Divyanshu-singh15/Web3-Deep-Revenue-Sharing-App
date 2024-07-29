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
  let profileName = data?.userData?.name || '';
  let profileEmail = data?.userData?.email || '';
  let profilePaymail = data?.userData?.paymailAddress || '';

  const switchSection = (section: string) => {
    activeSection = section;
  };

  async function logout() {
    try {
      const response = await fetch('/logout', {
        method: 'POST'
      });

      if (response.ok) {
        document.cookie = 'auth_token=; path=/; max-age=0; secure; samesite=strict';
        await goto('/login');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async function getBusinessData() {
    const response = await fetch('/dashboard');
    const newdata = await response.json();
    data = { ...data, ...newdata };
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
      getBusinessData();
    } else {
      alert('Failed to register business.');
    }
  };

  const updateProfile = async () => {
    try {
      const response = await fetch('/dashboard', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profileName,
          email: profileEmail,
          paymailAddress: profilePaymail,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert(result.message || 'Profile updated successfully!');
      } else {
        alert(result.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };
</script>

<div class="min-h-screen bg-gray-100 p-4">
  <div class="max-w-7xl mx-auto">
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-gray-800 text-white p-4 flex justify-between">
        <h1 class="text-2xl">Dashboard</h1>
        <button class="text-gray-300 hover:text-white transition duration-300" on:click={logout}>
          Logout
        </button>
      </div>
      
      <!-- Section Buttons -->
      <div class="p-4 flex">
        <button
          class="{activeSection === 'businessRegistration' ? 'section-active' : 'section-inactive'} px-4 py-2 rounded-md mr-2"
          on:click={() => switchSection('businessRegistration')}>
          Business Registration
        </button>
        <button
          class="{activeSection === 'salespersonDashboard' ? 'section-active' : 'section-inactive'} px-4 py-2 rounded-md mr-2"
          on:click={() => switchSection('salespersonDashboard')}>
          Salesperson Dashboard
        </button>
        <button
          class="{activeSection === 'editProfile' ? 'section-active' : 'section-inactive'} px-4 py-2 rounded-md"
          on:click={() => switchSection('editProfile')}>
          Edit Profile
        </button>
      </div>
      
      <!-- Section Content -->
      <div class="p-4">
        {#if activeSection === 'businessRegistration'}
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
          <SalespersonDashboardSection {data} />
        {/if}

        {#if activeSection === 'editProfile'}
          <div>
            <h2 class="text-xl mb-4">Edit Profile</h2>
            <div class="mb-4">
              <label for="profileName" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                id="profileName"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                bind:value={profileName}
              />
            </div>
            <div class="mb-4">
              <label for="profileEmail" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="profileEmail"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                bind:value={profileEmail}
              />
            </div>
            <div class="mb-4">
              <label for="profilePaymail" class="block text-gray-700 text-sm font-bold mb-2">Paymail</label>
              <input
                type="text"
                id="profilePaymail"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                bind:value={profilePaymail}
              />
            </div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              on:click={updateProfile}>
              Update Profile
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<p>User data: {JSON.stringify(data.userData)}</p>

<style>
  .section-active {
    background-color: #1d4ed8; /* Tailwind blue-700 */
    color: white;
  }
  .section-inactive {
    background-color: #e5e7eb; /* Tailwind gray-200 */
    color: black;
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart } from 'chart.js';

  export let data;
  export let businessName: string;
  export let contactAddress: string;
  export let phoneNumber: string;
  export let businessType: string;
  export let registerBusiness: () => void;

  let showPurchases = false; // State variable to toggle purchase data visibility

  function togglePurchases() {
    showPurchases = !showPurchases;
  }

  let totalSelling = 0;
  let totalPurchases = 0;
  let averagePurchasePrice = 0;
  let productSales = {};

  // Calculate total selling amount and sales per product
  data.purchaseData.forEach((purchase: any) => {
    totalSelling += purchase.product.price;
    totalPurchases += 1;
    if (productSales[purchase.product.name]) {
      productSales[purchase.product.name] += purchase.product.price;
    } else {
      productSales[purchase.product.name] = purchase.product.price;
    }
  });

  // Calculate average purchase price
  if (totalPurchases > 0) {
    averagePurchasePrice = totalSelling / totalPurchases;
  }

  let chartData = {
    labels: Object.keys(productSales),
    datasets: [
      {
        label: 'Total Sales',
        data: Object.values(productSales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  let chart: any;

  onMount(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });

  $: {
    // Update the chart if data changes
    if (chart) {
      chart.data = chartData;
      chart.update();
    }
  }

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
  
  <div class="container mx-auto mt-8">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={togglePurchases}>
      {showPurchases ? 'Hide Purchases' : 'Show Purchases'}
    </button>

    {#if showPurchases}
      <div class="mt-4">
        <div class="chart-container">
          <h2>Total Selling: ${totalSelling}</h2>
          <h3>Total Purchases: ${totalPurchases}</h3>
          <h3>Average Purchase Price: ${averagePurchasePrice.toFixed(2)}</h3>
          <canvas id="myChart"></canvas>
        </div>
        
        {#each data.purchaseData as purchase, index}
          <div class="p-4 mb-4 bg-white shadow rounded-md">
            <h2 class="text-lg font-semibold">{purchase.name}</h2>
            <p class="text-gray-600">{purchase.product.description}</p>
            <p class="text-gray-900 font-bold">${purchase.product.price.toFixed(2)}</p>
            <a href="/product/{purchase.product.id}" class="text-blue-500 hover:text-blue-700">View</a>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  
  <h2 class="text-xl font-bold mb-4 mt-8">Business Registration</h2>
  
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
      <label class="block text-gray-700 text-sm font-bold mb-2" for="businessType">Business Type</label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="businessType" type="text" placeholder="Enter business type" bind:value={businessType} />
    </div>
    
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
    </div>
  </form>
</div>

<style>
  .chart-container {
    width: 80%;
    margin: 0 auto;
  }

  canvas {
    width: 100%;
    height: 400px;
  }
</style>

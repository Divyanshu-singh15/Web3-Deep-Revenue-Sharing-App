<script lang="ts">
	import { goto } from '$app/navigation';

  let name: string = '';
  let description: string = '';
  let price: number = 0;
  let referalAmount = 0;

  export let data;

  async function getProductsData() {
    const response = await fetch(`/dashboard/productlaunch/${data.companyId}`);
    const newdata = await response.json();
    data = {...data, ...newdata}
}


  const handleSubmit = async () => {
    try {
      const product = {
        name,
        description,
        price,
        companyId: data.companyId,
        referalAmount: referalAmount
      };

      const response = await fetch('/dashboard/productlaunch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Product created successfully: ' + data.product.name);
        getProductsData();
        // Reset form
        name = '';
        description = '';
        price = 0;
        referalAmount = 0;
      } else {
        const errorData = await response.json();
        alert(`Failed to create product: ${errorData.error}`);

      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
  };

</script>

<main class="p-6 max-w-2xl mx-auto">
  <h1 class="text-2xl font-bold mb-6">Add New Product</h1>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
      <input
        type="text"
        id="name"
        bind:value={name}
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description:</label>
      <input
        type="text"
        id="description"
        bind:value={description}
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label for="price" class="block text-sm font-medium text-gray-700">Price:</label>
      <input
        type="number"
        id="price"
        bind:value={price}
        step="0.01"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <div>
      <label for="referalamount" class="block text-sm font-medium text-gray-700">Referal Amount:</label>
      <input
        type="number"
        id="referalAmount"
        bind:value={referalAmount}
        step="0.01"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <button
      type="submit"
      class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Submit
    </button>
  </form>

  <div class="mt-8">
    {#each data.productsData as product, index}
      <div class="p-4 mb-4 bg-white shadow rounded-md">
        <h2 class="text-lg font-semibold">{product.name}</h2>
        <p class="text-gray-600">{product.description}</p>
        <p class="text-gray-900 font-bold">${product.price.toFixed(2)}</p>
        <a href="/product/{product.id}">view</a>
      </div>
    {/each}
  </div>
</main>

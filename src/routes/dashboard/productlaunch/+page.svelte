<script>
    let productName = '';
    let productPrice = '';
    let productDescription = '';
    let productImageUrl = '';
  
    function handleSubmit() {
      console.log({
        productName,
        productPrice,
        productDescription,
        productImageUrl
      });
    }
  </script>
  
  <div class="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
    <div class="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-white border-opacity-30">
      <h1 class="text-3xl font-extrabold text-center text-white mb-8 tracking-tight">Launch Your Product</h1>
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div class="group">
          <label for="productName" class="block text-sm font-medium text-white mb-1 transition-all duration-300 group-focus-within:text-yellow-300">Product Name</label>
          <input type="text" id="productName" bind:value={productName} class="mt-1 block w-full bg-white bg-opacity-10 border-0 border-b-2 border-white border-opacity-30 rounded-t-md focus:ring-0 focus:border-yellow-300 text-white placeholder-white placeholder-opacity-50 transition-all duration-300" required placeholder="Enter product name" />
        </div>
        <div class="group">
          <label for="productPrice" class="block text-sm font-medium text-white mb-1 transition-all duration-300 group-focus-within:text-yellow-300">Price</label>
          <input type="number" id="productPrice" bind:value={productPrice} class="mt-1 block w-full bg-white bg-opacity-10 border-0 border-b-2 border-white border-opacity-30 rounded-t-md focus:ring-0 focus:border-yellow-300 text-white placeholder-white placeholder-opacity-50 transition-all duration-300" required placeholder="Enter price" />
        </div>
        <div class="group">
          <label for="productDescription" class="block text-sm font-medium text-white mb-1 transition-all duration-300 group-focus-within:text-yellow-300">Description</label>
          <textarea id="productDescription" bind:value={productDescription} rows="4" class="mt-1 block w-full bg-white bg-opacity-10 border-0 border-b-2 border-white border-opacity-30 rounded-t-md focus:ring-0 focus:border-yellow-300 text-white placeholder-white placeholder-opacity-50 transition-all duration-300" required placeholder="Describe your product"></textarea>
        </div>
        <div class="group">
          <label for="productImageUrl" class="block text-sm font-medium text-white mb-1 transition-all duration-300 group-focus-within:text-yellow-300">Image URL</label>
          <input type="url" id="productImageUrl" bind:value={productImageUrl} class="mt-1 block w-full bg-white bg-opacity-10 border-0 border-b-2 border-white border-opacity-30 rounded-t-md focus:ring-0 focus:border-yellow-300 text-white placeholder-white placeholder-opacity-50 transition-all duration-300" placeholder="Enter image URL" />
        </div>
        <button type="submit" class="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-4 rounded-md shadow-lg hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg">
          Launch Product
        </button>
      </form>
    </div>
  </div>
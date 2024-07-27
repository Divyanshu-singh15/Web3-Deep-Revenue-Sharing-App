<script lang="ts">

    export let data: any;
    let name: string = '';
    let phone: string = '';
    let password: string = '';
    let wallet: string = '';
    let address: string = '';

    

    // Placeholder for form submission handler
    async function handleSubmit(): Promise<void> {
      try {
        const response = await fetch('/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, phone: phone.toString(), wallet, address, password,  productId: data.productData.id, referrerId: data.referrer  })
        });
  
        if (response.ok) {
          const responseData = await response.json();
          alert("Purchase Successful");
        } else {
          const errorData = await response.json();
          const errorMessage = errorData.error || 'An error occurred during purchase';
          alert(errorMessage);
        }
      } catch (error) {
        console.error('Error during purchase:', error);
        alert('An error occurred during the purchase');
      }
    }

</script>

<!-- Main Container -->
<div class="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
    <div class="flex flex-col lg:flex-row gap-8">
        <!-- Product Information -->
        <div class="flex-1 bg-white shadow-lg rounded-lg p-6">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">{data.productData.name}</h1>
            <p class="text-2xl text-green-600 mb-4">${data.productData.price.toFixed(2)}</p>
            <p class="text-gray-700 leading-relaxed">{data.productData.description}</p>
        </div>

        <!-- Form Container -->
        <div class="flex-1 bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">Fill to Purchase the Product</h2>
            <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
                <div>
                    <label for="name" class="block text-gray-600 mb-2">Name</label>
                    <input 
                        id="name"
                        type="text" 
                        placeholder="Enter your name" 
                        bind:value={name} 
                        class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
                        required
                    />
                </div>
                <div>
                    <label for="phone" class="block text-gray-600 mb-2">Phone</label>
                    <input 
                        id="phone"
                        type="number" 
                        placeholder="Enter your phone number" 
                        bind:value={phone} 
                        class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
                        required
                    />
                </div>
                <div>
                    <label for="address" class="block text-gray-600 mb-2">Shipping Address</label>
                    <input 
                        id="address"
                        type="text" 
                        placeholder="Enter your shipping address" 
                        bind:value={address} 
                        class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
                        required
                    />
                </div>
                <div>
                    <label for="paymail" class="block text-gray-600 mb-2">Wallet</label>
                    <input 
                        id="wallet"
                        type="text" 
                        placeholder="Enter your wallet (mywallet@dev.neucron.io)" 
                        bind:value={wallet} 
                        class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
                        required
                    />
                </div>
                <div>
                    <label for="password" class="block text-gray-600 mb-2">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        placeholder="Enter your password" 
                        bind:value={password} 
                        class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
                        required
                    />
                </div>
                
                <button 
                    type="submit" 
                    class="bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-600 transition duration-300 w-full"
                >
                    Purchase
                </button>
            </form>
        </div>
    </div>
</div>

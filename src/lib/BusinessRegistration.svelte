<script>
    export let registerBusiness;
    /**
	 * @type {any}
	 */
     export let businessName;
    /**
	 * @type {any}
	 */
     export let ownerName;

     /**
	 * @type {any}
	 */
      export let contactEmail;

</script>


<div>
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
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="ownerName">
          Owner Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="ownerName"
          type="text"
          placeholder="Enter owner name"
          bind:value={ownerName} />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="contactEmail">
          Contact Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="contactEmail"
          type="email"
          placeholder="Enter contact email"
          bind:value={contactEmail} />
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
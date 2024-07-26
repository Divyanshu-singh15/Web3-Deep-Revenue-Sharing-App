<script lang="ts">
    export let data;
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
            <tr class="{index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
              <td class="py-2 px-4">{business.name}</td>
              <td class="py-2 px-4">{business.type}</td>
              <td class="py-2 px-4">{business.phone}</td>
              <td class="py-2 px-4">{business.address}</td>
              <td class="py-2 px-4">
                <button class="text-blue-500 hover:text-blue-700">View</button>
              </td>
            </tr>
          {/each}
          </tbody>
        </table>
      </div>
      
    </div>
  </div>
  
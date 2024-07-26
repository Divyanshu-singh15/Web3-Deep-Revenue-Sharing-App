<script lang="ts">
    export let logout: () => void;
</script>


<div class="h-16 bg-gray-900 shadow-lg flex items-center justify-between px-4">
    <span class="text-green-400 text-2xl font-bold">MVP</span>
    <button
      class="text-gray-300 hover:text-white transition duration-300"
      on:click={logout}
    >
      Logout
    </button>
  </div>
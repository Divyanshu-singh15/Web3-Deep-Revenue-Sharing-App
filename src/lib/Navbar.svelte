<script>
  import { onMount } from 'svelte';

  let isDarkMode = false;
  let isAuthenticated = false; // Placeholder for authentication status

  onMount(() => {
    isDarkMode = localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark', isDarkMode);
  });

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }
</script>

<nav class="bg-white dark:bg-gray-900 border-gray-200">
  <div class="max-w-screen-xl flex items-center justify-end mx-auto p-4">
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
        <li>
          <a href="/" class="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:md:hover:text-blue-500 md:p-0">Home</a>
        </li>
        {#if !isAuthenticated}
          <li>
            <a href="/login" class="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:md:hover:text-blue-500 md:p-0">Login</a>
          </li>
          <li>
            <a href="/register" class="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:md:hover:text-blue-500 md:p-0">Sign up</a>
          </li>
        {/if}
        {#if isAuthenticated}
          <li>
            <a href="/dashboard" class="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:md:hover:text-blue-500 md:p-0">Dashboard</a>
          </li>
        {/if}
        <li>
          <a href="/contact" class="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:md:hover:text-blue-500 md:p-0">Contact us</a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
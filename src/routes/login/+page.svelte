<script lang="ts">
    import { goto } from '$app/navigation';
    // import { auth } from '$lib/stores/auth';

  
    let email = '';
    let password = '';
    let errorMessage = '';
  
    async function handleSubmit() {
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        if (response.ok) {
          const data = await response.json();
          document.cookie = `auth_token=${data.token}; path=/; max-age=3600; secure; samesite=strict`;
          goto('/dashboard');
        } else {
          const errorData = await response.json();
          errorMessage = errorData.error || 'Login failed';
        }
      } catch (error) {
        console.error('Error during login:', error);
        errorMessage = 'An error occurred during login';
      }
    }
  </script>
  
  <div class="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
    <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email" 
        bind:value={email} 
        class="border rounded-lg px-3 py-2 w-full" 
        required
      />
      <input 
        type="password" 
        placeholder="Password" 
        bind:value={password} 
        class="border rounded-lg px-3 py-2 w-full" 
        required
      />
      <button 
        type="submit" 
        class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300 w-full"
      >
        Login
      </button>
      <p>Don't have an account? <a href="/register" class="text-blue-400 hover:text-blue-500 hover:underline">Sign up here</a></p>
    </form>
    
    {#if errorMessage}
      <p class="text-red-500 mt-2">{errorMessage}</p>
    {/if}
  </div>
<script lang="ts">
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
  
    let username = '';
    let email = '';
    let password = '';
  
    async function handleSubmit() {
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
        });
  
        if (response.ok) {
          const data = await response.json();
          alert('Registration successful');
          goto("/login")
          // Handle successful registration (e.g., redirect to login or show a success message)
        } else {
          const errorData = await response.json();
          alert("This email is alredy registered!")
          console.error('Registration failed:', errorData.error);
          // Handle registration failure (e.g., show an error message)
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  </script>
  
  <div class="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
    <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
      <input type="text" placeholder="Name" bind:value={username} class="border rounded-lg px-3 py-2 w-full" />
      <input type="email" placeholder="Email" bind:value={email} class="border rounded-lg px-3 py-2 w-full" />
      <input type="password" placeholder="Password" bind:value={password} class="border rounded-lg px-3 py-2 w-full" />
      <button type="submit" class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300">Register</button>
      <p>Already have an account? <a href="/login" class="text-blue-400 hover:text-blue-600 hover:underline">Login here</a></p>
    </form>
  </div>
  
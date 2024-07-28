<script lang="ts">
  import { goto } from '$app/navigation';
  import Navbar from "$lib/Navbar.svelte";
  import Fotter from "$lib/Fotter.svelte";

  let username = '';
  let email = '';
  let password = '';
  let errorMessage = '';

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
        alert('Registration successful');
        goto("/login");
      } else {
        const errorData = await response.json();
        errorMessage = errorData.error || 'Registration failed';
      }
    } catch (error) {
      errorMessage = 'Error during registration. Please try again.';
      console.error('Error during registration:', error);
    }
  }
</script>

<div class="message-bar">SignUp</div>
<Navbar />

<section>
  <div class="content">
    <h1 class="heading">Create an Account</h1>
    <p class="sub-heading">Please fill in the details to register</p>
    {#if errorMessage}
      <div class="alert">
        <span>Error</span>
        <span>{errorMessage}</span>
      </div>
    {/if}
    <form on:submit|preventDefault={handleSubmit}>
      <input type="text" placeholder="Name" bind:value={username} required />
      <input type="email" placeholder="Email" bind:value={email} required />
      <input type="password" placeholder="Password" bind:value={password} required />
      <button type="submit">Register</button>
    </form>
  </div>
</section>

<Fotter />

<style>
  body {
    background-color: #ADD8E6;
    margin: 0;
    font-family: Arial, sans-serif;
  }
  .message-bar {
    width: 100%;
    background-color: #1D4ED8;
    color: white;
    padding: 0.5rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 7rem); /* Adjust for navbar and footer height */
    padding: 1rem;
    box-sizing: border-box;
    margin-top: 3.5rem; /* Adjust for navbar and message bar height */
  }
  .content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .heading {
    margin-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: bold;
    color: #111827;
  }
  .sub-heading {
    font-size: 1.25rem;
    color: #6B7280;
    margin-bottom: 2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
  }
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: #1D4ED8;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  button:hover {
    background-color: #1A3EB1;
  }
  .alert {
    color: red;
    margin-top: 1rem;
  }
</style>

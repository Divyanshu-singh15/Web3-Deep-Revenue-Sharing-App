<script lang="ts">
    import Navbar from "$lib/Navbar.svelte";
    import Fotter from "$lib/Fotter.svelte";
  
    let name = '';
    let email = '';
    let message = '';
    let successMessage = '';
    let errorMessage = '';
  
    async function handleSubmit() {
      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });
  
        if (response.ok) {
          successMessage = 'Thank you for your message. We will get back to you soon!';
          name = '';
          email = '';
          message = '';
          errorMessage = '';
        } else {
          const errorData = await response.json();
          errorMessage = errorData.error || 'Failed to send message';
          successMessage = '';
        }
      } catch (error) {
        console.error('Error during contact submission:', error);
        errorMessage = 'An error occurred during message submission';
        successMessage = '';
      }
    }
  </script>
  
  <Navbar />
  <div class="message-bar">Contact Us</div>
  
  <section>
    <div class="content">
      <h1 class="heading">Get in Touch</h1>
      <p class="sub-heading">We would love to hear from you</p>
      {#if successMessage}
        <p class="success-alert">{successMessage}</p>
      {/if}
      {#if errorMessage}
        <p class="alert">{errorMessage}</p>
      {/if}
    </div>
    <div class="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          bind:value={name} 
          class="border rounded-lg px-3 py-2 w-full" 
          required
        />
        <input 
          type="email" 
          placeholder="Email" 
          bind:value={email} 
          class="border rounded-lg px-3 py-2 w-full" 
          required
        />
        <textarea 
          placeholder="Message" 
          bind:value={message} 
          class="border rounded-lg px-3 py-2 w-full" 
          rows="5"
          required
        ></textarea>
        <button 
          type="submit" 
          class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300 w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  </section>
  
  <Fotter />
  
  <style>
    body {
      background-color: #ADD8E6; /* Lightish blue background color */
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
    .top-bar {
      width: 100%;
      background-color: #1D4ED8;
      color: white;
      padding: 1rem;
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      position: fixed;
      top: 2rem; /* Adjust for message bar height */
      left: 0;
      z-index: 1000;
    }
    section {
      width: 100vw;
      height: calc(100vh - 6rem); /* Adjust for message bar and top bar */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      box-sizing: border-box;
      margin-top: 6rem; /* Adjust for message bar and top bar */
    }
    .content {
      text-align: center;
      margin-bottom: 2rem;
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
    }
    .bg-white {
      background-color: white;
    }
    .rounded-lg {
      border-radius: 8px;
    }
    .shadow-md {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .p-6 {
      padding: 1.5rem;
    }
    .max-w-md {
      max-width: 28rem;
    }
    .mx-auto {
      margin-left: auto;
      margin-right: auto;
    }
    .space-y-4 > * + * {
      margin-top: 1rem;
    }
    .border {
      border: 1px solid #ccc;
    }
    .rounded-lg {
      border-radius: 0.5rem;
    }
    .px-3 {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
    .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    .w-full {
      width: 100%;
    }
    .bg-blue-500 {
      background-color: #1D4ED8;
    }
    .text-white {
      color: white;
    }
    .hover\:bg-blue-600:hover {
      background-color: #1A3EB1;
    }
    .transition {
      transition-property: all;
      transition-duration: 300ms;
    }
    .duration-300 {
      transition-duration: 300ms;
    }
    .success-alert {
      color: green;
      margin-top: 1rem;
    }
    .alert {
      color: red;
      margin-top: 1rem;
    }
  </style>
  
<script lang="ts">
    import { goto } from '$app/navigation';
  
    let name = '';
    let email = '';
    let subject = '';
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
          body: JSON.stringify({ name, email, subject, message })
        });
  
        if (response.ok) {
          successMessage = 'Your message has been sent successfully!';
          // Clear the form fields
          name = '';
          email = '';
          subject = '';
          message = '';
          errorMessage = '';  // Clear any previous error messages
        } else {
          const errorData = await response.json();
          errorMessage = errorData.error || 'Failed to send message';
          successMessage = '';  // Clear any previous success messages
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        errorMessage = 'An error occurred during form submission';
        successMessage = '';  // Clear any previous success messages
      }
    }
  </script>
  
  <style>
    body {
      background-color: #ADD8E6; /* Lightish blue background color */
      margin: 0;
      font-family: Arial, sans-serif;
    }
    .top-bar {
      width: 100%;
      background-color: #1D4ED8;
      color: white;
      padding: 1rem;
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
    }
    section {
      width: 100vw;
      height: calc(100vh - 3.5rem); /* Adjust for top bar height */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #ADD8E6; /* Lightish blue background color */
      padding: 1rem;
      box-sizing: border-box;
    }
    .content {
      text-align: center;
      margin-bottom: 2rem;
    }
    .alert {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 1rem;
      margin-bottom: 1.5rem;
      font-size: 1rem;
      color: #374151;
      background-color: #F3F4F6;
      border-radius: 9999px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .alert:hover {
      background-color: #E5E7EB;
    }
    .alert span:first-child {
      background-color: #1D4ED8;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      margin-right: 0.5rem;
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
    .form-container {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      width: 100%;
      max-width: 500px;
      text-align: center;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    input, textarea {
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
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
    .success-message {
      color: green;
      margin-top: 1rem;
    }
    .error-message {
      color: red;
      margin-top: 1rem;
    }
  </style>
  
  <div class="top-bar">
    *#* Contact Us *#*
  </div>
  
  <section>
    <div class="content">
      <h1 class="heading">Get in Touch</h1>
      <p class="sub-heading">We would love to hear from you!</p>
    </div>
    <div class="form-container">
      <form on:submit|preventDefault={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          bind:value={name} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          bind:value={email} 
          required 
        />
        <input 
          type="text" 
          placeholder="Subject" 
          bind:value={subject} 
          required 
        />
        <textarea 
          placeholder="Message" 
          bind:value={message} 
          rows="5" 
          required 
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      {#if successMessage}
        <p class="success-message">{successMessage}</p>
      {/if}
      {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
      {/if}
    </div>
  </section>
  
<script>
    import "../app.css";
    import Fotter from "$lib/Fotter.svelte";
    import Navbar from "$lib/Navbar.svelte";
    import "../app.css"
	import { goto } from "$app/navigation";

  async function logout() {
  try {
    console.log('Sending POST request to /logout');
    const response = await fetch('/logout', {
      method: 'POST'
    });

    if (response.ok) {
      console.log('POST request successful, clearing cookie and redirecting');
      // Clear the auth_token cookie on the client side
      document.cookie = 'auth_token=; path=/; max-age=0; secure; samesite=strict';

      // Redirect to login page after logout
      await goto('/login');
    } else {
      console.error('Logout failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
  </script>
  
  
  <Navbar />
  <slot />
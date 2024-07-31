<script>
    import "../app.css";
    import Header from "$lib/Header.svelte"
	import { goto } from "$app/navigation";

  async function logout() {
  try {
    const response = await fetch('/logout', {
      method: 'POST'
    });

    if (response.ok) {
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
  
  
  <Header />
  <slot />
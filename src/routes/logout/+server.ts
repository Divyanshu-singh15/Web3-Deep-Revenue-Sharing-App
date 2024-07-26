import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
  // Delete the auth token cookie by specifying the path
  cookies.delete('auth_token', { path: '/' });

  // Return a 200 OK response
  return new Response(JSON.stringify({ message: 'Logout successful' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
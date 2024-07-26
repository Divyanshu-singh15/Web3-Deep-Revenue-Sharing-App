// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { verifyToken } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('auth_token');
  
  if (token) {
    const payload = verifyToken(token);
    if (payload && payload.userId) {
      event.locals.user = { userId: payload.userId };
    }
  }

  if (event.url.pathname.startsWith('/dashboard') && !event.locals.user) {
    return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
  }
  
  return await resolve(event);
};
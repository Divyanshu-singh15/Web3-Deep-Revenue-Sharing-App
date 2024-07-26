// // src/lib/stores/auth.ts
// import { writable } from 'svelte/store';

// function createAuthStore() {
//   const { subscribe, set, update } = writable({
//     isAuthenticated: false,
//     user: null
//   });




//   return {
//     subscribe,
//     login: (user: any) => {
//       console.log(user)
//       set({ isAuthenticated: true, user })},
//     logout: () => set({ isAuthenticated: false, user: null })
//   };
// }

// export const auth = createAuthStore();
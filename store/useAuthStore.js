import { create } from 'zustand';

export const useAuthStore = create((set) => ({
 
    user: null, // { id, name, role: 'TEACHER' | 'PRINCIPAL' }
  isAuthenticated: false,
  
  login: (userData) => set({ 
    user: userData, 
    isAuthenticated: true 
  }),
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('auth_token');
  }

}))
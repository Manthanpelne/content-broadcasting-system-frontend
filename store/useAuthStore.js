import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist (
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: (userData) => set({
                user: userData,
                isAuthenticated:true
            }),

            logout: () => {
                localStorage.removeItem('auth_token');
                set({ user: null, isAuthenticated: false });
            }
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
)
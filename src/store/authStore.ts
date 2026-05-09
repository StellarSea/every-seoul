import { create } from 'zustand';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  picture?: string;
  provider: 'password' | 'google';
}

interface AuthState {
  user: AuthUser | null;
  login: (id: string) => void;
  loginWithGoogle: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (id: string) =>
    set({
      user: {
        id,
        name: id,
        provider: 'password'
      }
    }),
  loginWithGoogle: (user: AuthUser) => set({ user }),
  logout: () => set({ user: null })
}));

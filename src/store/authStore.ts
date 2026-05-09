import { create } from 'zustand';
import type { PersistedUserPreferences } from '../types/app';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  picture?: string;
  provider: 'password' | 'google';
  preferences?: PersistedUserPreferences;
}

interface AuthState {
  user: AuthUser | null;
  login: (id: string) => void;
  loginWithGoogle: (user: AuthUser) => void;
  updatePreferences: (preferences: PersistedUserPreferences) => void;
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
  updatePreferences: (preferences: PersistedUserPreferences) =>
    set((state) => ({
      user: state.user ? { ...state.user, preferences } : null
    })),
  logout: () => set({ user: null })
}));

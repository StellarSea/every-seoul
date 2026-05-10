import { create } from 'zustand';
import {
  clearStoredUser,
  loadStoredUser,
  saveStoredUser
} from '../auth/sessionStorage';
import type { PersistedUserPreferences } from '../types/app';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  picture?: string;
  provider: 'google';
  sessionExpiresAt: string;
  preferences?: PersistedUserPreferences;
}

interface AuthState {
  user: AuthUser | null;
  loginWithGoogle: (user: AuthUser) => void;
  updatePreferences: (preferences: PersistedUserPreferences) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: loadStoredUser(),
  loginWithGoogle: (user: AuthUser) => {
    saveStoredUser(user);
    set({ user });
  },
  updatePreferences: (preferences: PersistedUserPreferences) =>
    set((state) => {
      const user = state.user ? { ...state.user, preferences } : null;
      if (user) saveStoredUser(user);
      return { user };
    }),
  logout: () => {
    clearStoredUser();
    set({ user: null });
  }
}));

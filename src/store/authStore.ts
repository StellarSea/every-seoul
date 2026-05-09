import { create } from 'zustand';

interface AuthState {
  user: string | null;
  login: (id: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (id: string) => set({ user: id }),
  logout: () => set({ user: null })
}));

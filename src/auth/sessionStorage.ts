import type { AuthUser } from '../store/authStore';

const AUTH_STORAGE_KEY = 'every-seoul-auth';

export function loadStoredUser(): AuthUser | null {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const user = JSON.parse(raw) as AuthUser;
    if (
      !user.sessionExpiresAt ||
      new Date(user.sessionExpiresAt).getTime() <= Date.now()
    ) {
      clearStoredUser();
      return null;
    }

    return user;
  } catch {
    clearStoredUser();
    return null;
  }
}

export function saveStoredUser(user: AuthUser) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getStoredSessionToken() {
  return undefined;
}

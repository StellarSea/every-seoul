const DEFAULT_API_BASE_URL = '/api';

export interface RuntimeConfig {
  apiBaseUrl?: string;
  googleClientId?: string;
  vapidPublicKey?: string;
}

declare global {
  interface Window {
    __EVERY_SEOUL_RUNTIME_CONFIG__?: RuntimeConfig;
  }
}

function getRuntimeConfig(): RuntimeConfig {
  return window.__EVERY_SEOUL_RUNTIME_CONFIG__ ?? {};
}

export function getApiBaseUrl() {
  return (
    getRuntimeConfig().apiBaseUrl ||
    import.meta.env.VITE_API_BASE_URL ||
    DEFAULT_API_BASE_URL
  ).replace(/\/$/, '');
}

export function getGoogleClientId() {
  return (
    getRuntimeConfig().googleClientId ||
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    undefined
  );
}

export function getConfiguredVapidPublicKey() {
  return (
    getRuntimeConfig().vapidPublicKey ||
    import.meta.env.VITE_VAPID_PUBLIC_KEY ||
    undefined
  );
}

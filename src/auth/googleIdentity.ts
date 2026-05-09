import type { AuthUser } from '../store/authStore';

const GOOGLE_SCRIPT_ID = 'google-identity-services';
const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';

interface GoogleCredentialResponse {
  credential?: string;
}

interface GoogleIdConfiguration {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface GoogleButtonConfiguration {
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  type?: 'standard' | 'icon';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  width?: number;
}

interface GoogleIdentityApi {
  accounts: {
    id: {
      initialize: (config: GoogleIdConfiguration) => void;
      renderButton: (
        parent: HTMLElement,
        options: GoogleButtonConfiguration
      ) => void;
      cancel: () => void;
    };
  };
}

interface GoogleJwtPayload {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
}

declare global {
  interface Window {
    google?: GoogleIdentityApi;
  }
}

export function getGoogleClientId() {
  return import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
}

export function loadGoogleIdentityScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_SCRIPT_ID;
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google login script failed'));
    document.head.appendChild(script);
  });
}

export function parseGoogleCredential(credential: string): AuthUser {
  const payload = decodeJwtPayload<GoogleJwtPayload>(credential);

  return {
    id: payload.sub,
    name: payload.name || payload.email || 'Google 사용자',
    email: payload.email,
    picture: payload.picture,
    provider: 'google'
  };
}

function decodeJwtPayload<T>(token: string): T {
  const payload = token.split('.')[1];

  if (!payload) {
    throw new Error('Invalid Google credential');
  }

  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const decoded = window.atob(base64);
  const json = decodeURIComponent(
    Array.from(decoded)
      .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
      .join('')
  );

  return JSON.parse(json) as T;
}

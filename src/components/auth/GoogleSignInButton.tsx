import { useEffect, useRef, useState } from 'react';
import type { AuthUser } from '../../store/authStore';
import {
  getGoogleClientId,
  loadGoogleIdentityScript
} from '../../auth/googleIdentity';
import { loginWithGoogleCredential } from '../../auth/authApi';

interface GoogleSignInButtonProps {
  onSuccess: (user: AuthUser) => void;
}

export function GoogleSignInButton({ onSuccess }: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const clientId = getGoogleClientId();

  useEffect(() => {
    if (!clientId) {
      return;
    }

    let cancelled = false;

    loadGoogleIdentityScript()
      .then(() => {
        if (cancelled || !buttonRef.current || !window.google?.accounts?.id) {
          return;
        }

        buttonRef.current.innerHTML = '';
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (!response.credential) {
              setErrorMessage('Google 인증 응답을 받지 못했습니다.');
              return;
            }

            loginWithGoogleCredential(response.credential)
              .then(onSuccess)
              .catch((error: unknown) => {
                setErrorMessage(
                  error instanceof Error
                    ? error.message
                    : 'Google 로그인에 실패했습니다.'
                );
              });
          }
        });
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'continue_with',
          width: 320
        });
      })
      .catch(() => {
        setErrorMessage('Google 로그인 스크립트를 불러오지 못했습니다.');
      });

    return () => {
      cancelled = true;
      window.google?.accounts?.id.cancel();
    };
  }, [clientId, onSuccess]);

  if (!clientId) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-center text-xs text-gray-500">
        배포 환경 설정에 Google 클라이언트 ID를 설정하면 Google 로그인을 사용할
        수 있습니다.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div ref={buttonRef} className="flex justify-center" />
      {errorMessage && (
        <p className="text-center text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}

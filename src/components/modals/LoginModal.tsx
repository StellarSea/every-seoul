import { X } from 'lucide-react';
import { GoogleSignInButton } from '../auth/GoogleSignInButton';
import type { AuthUser } from '../../store/authStore';

function LoginModal({
  onClose,
  onGoogleLogin
}: {
  onClose: () => void;
  onGoogleLogin: (user: AuthUser) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-2">에브리서울</h2>
            <p className="text-sm text-gray-500">
              로그인하고 맞춤 정보를 받아보세요
            </p>
          </div>

          <div className="mt-6">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 mb-4">간편 로그인</p>
              <GoogleSignInButton onSuccess={onGoogleLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;

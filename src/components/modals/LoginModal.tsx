import { X } from 'lucide-react';
import { useState } from 'react';
import { GoogleSignInButton } from '../auth/GoogleSignInButton';
import type { AuthUser } from '../../store/authStore';

function LoginModal({
  onClose,
  onGoogleLogin,
  onLogin
}: {
  onClose: () => void;
  onGoogleLogin: (user: AuthUser) => void;
  onLogin: (id: string, pw: string) => void;
}) {
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(loginId, loginPassword);
  };

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

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                이메일 또는 아이디
              </label>
              <input
                type="text"
                autoComplete="username"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="이메일 또는 아이디를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-600">로그인 상태 유지</span>
              </label>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                비밀번호 찾기
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 mb-4">간편 로그인</p>
              <GoogleSignInButton onSuccess={onGoogleLogin} />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              아직 회원이 아니신가요?{' '}
              <button className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                회원가입
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;

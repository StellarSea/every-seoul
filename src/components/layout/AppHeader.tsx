import { Settings, Star } from 'lucide-react';
import type { AppTab } from '../../types/types';

interface AppHeaderProps {
  activeTab: AppTab;
  bookmarkCount: number;
  user: string | null;
  onTabChange: (tab: AppTab) => void;
  onOpenBookmarks: () => void;
  onOpenLogin: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

const tabs: AppTab[] = ['뉴스레터', '생활정보', '맞춤정책'];

export function AppHeader({
  activeTab,
  bookmarkCount,
  user,
  onTabChange,
  onOpenBookmarks,
  onOpenLogin,
  onOpenSettings,
  onLogout
}: AppHeaderProps) {
  return (
    <header className="bg-[#4267B2] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl">에브리서울</h1>
            <nav className="flex gap-6 text-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === tab ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBookmarks}
              className="hover:bg-white/10 p-2 rounded transition-colors relative"
              title="북마크"
            >
              <Star className="w-5 h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>
            <button
              onClick={onOpenSettings}
              className="hover:bg-white/10 p-2 rounded transition-colors"
              title="설정"
            >
              <Settings className="w-5 h-5" />
            </button>
            {user ? (
              <>
                <span className="text-sm">{user}님</span>
                <button
                  onClick={onLogout}
                  className="hover:bg-white/10 px-4 py-1.5 rounded text-sm transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={onOpenLogin}
                className="hover:bg-white/10 px-4 py-1.5 rounded text-sm transition-colors"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import { Bell, Settings, Star } from 'lucide-react';
import type { AppTab } from '../../types/app';
import type { AuthUser } from '../../store/authStore';

interface AppHeaderProps {
  activeTab: AppTab;
  bookmarkCount: number;
  notificationCount: number;
  user: AuthUser | null;
  onTabChange: (tab: AppTab) => void;
  onOpenBookmarks: () => void;
  onOpenLogin: () => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

const tabs: AppTab[] = ['뉴스레터', '생활정보', '맞춤정책'];

export function AppHeader({
  activeTab,
  bookmarkCount,
  notificationCount,
  user,
  onTabChange,
  onOpenBookmarks,
  onOpenLogin,
  onOpenNotifications,
  onOpenSettings,
  onLogout
}: AppHeaderProps) {
  return (
    <header className="bg-[#4267B2] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <h1 className="text-xl">에브리서울</h1>
            <nav className="flex flex-wrap gap-2 text-sm sm:gap-4 lg:gap-6">
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
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <button
              onClick={onOpenNotifications}
              className="hover:bg-white/10 p-2 rounded transition-colors relative"
              title="알림센터"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
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
                {user.picture && (
                  <img
                    src={user.picture}
                    alt=""
                    className="w-7 h-7 rounded-full border border-white/30"
                  />
                )}
                <span className="text-sm">{user.name}님</span>
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

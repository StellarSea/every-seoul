import { Bell, BellOff, ChevronRight } from 'lucide-react';
import type { AppNotification } from '../../types/app';
import { ModalShell } from './ModalShell';

interface NotificationsModalProps {
  browserNotificationsEnabled: boolean;
  browserNotificationMessage: string;
  browserNotificationsSupported: boolean;
  canManagePushNotifications: boolean;
  notifications: AppNotification[];
  onClose: () => void;
  onDisableBrowserNotifications: () => void;
  onEnableBrowserNotifications: () => void;
  onSendTestPush: () => void;
}

const toneClass = {
  blue: 'border-blue-200 bg-blue-50 text-blue-700',
  green: 'border-green-200 bg-green-50 text-green-700',
  orange: 'border-orange-200 bg-orange-50 text-orange-700',
  red: 'border-red-200 bg-red-50 text-red-700'
};

export function NotificationsModal({
  browserNotificationsEnabled,
  browserNotificationMessage,
  browserNotificationsSupported,
  canManagePushNotifications,
  notifications,
  onClose,
  onDisableBrowserNotifications,
  onEnableBrowserNotifications,
  onSendTestPush
}: NotificationsModalProps) {
  return (
    <ModalShell maxWidth="max-w-2xl" onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl">알림센터</h2>
          </div>
          <p className="text-sm text-gray-500">
            마감 임박 정책과 새 맞춤 정보를 한곳에서 확인하세요.
          </p>
        </div>

        {browserNotificationsSupported && (
          <div className="mb-4 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-800">브라우저 알림</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  새 맞춤 정보가 생기면 데스크톱 알림으로 알려드립니다.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  onClick={
                    browserNotificationsEnabled
                      ? onDisableBrowserNotifications
                      : onEnableBrowserNotifications
                  }
                  disabled={!canManagePushNotifications}
                  className={`inline-flex shrink-0 items-center gap-1 rounded px-3 py-2 text-sm transition-colors ${
                    browserNotificationsEnabled
                      ? 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100'
                      : 'bg-[#4267B2] text-white hover:bg-[#365899]'
                  } disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500`}
                >
                  {browserNotificationsEnabled ? (
                    <BellOff className="h-4 w-4" />
                  ) : (
                    <Bell className="h-4 w-4" />
                  )}
                  {browserNotificationsEnabled ? '끄기' : '켜기'}
                </button>
                {browserNotificationsEnabled && (
                  <button
                    onClick={onSendTestPush}
                    className="inline-flex items-center gap-1 rounded bg-white px-3 py-2 text-sm text-gray-700 ring-1 ring-gray-200 transition-colors hover:bg-gray-100"
                  >
                    테스트
                  </button>
                )}
              </div>
            </div>
            {browserNotificationMessage && (
              <p className="mt-3 text-xs text-gray-600">
                {browserNotificationMessage}
              </p>
            )}
            {!canManagePushNotifications && (
              <p className="mt-3 text-xs text-gray-600">
                Google 로그인 후 기기별 푸시 알림을 연결할 수 있습니다.
              </p>
            )}
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <p className="text-gray-600">현재 확인할 알림이 없습니다</p>
            <p className="mt-1 text-sm text-gray-400">
              새 맞춤 정책이나 생활 주의 정보가 생기면 알려드릴게요.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => {
                  notification.onOpen();
                  onClose();
                }}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span
                      className={`mb-2 inline-flex rounded border px-2 py-0.5 text-xs ${toneClass[notification.tone]}`}
                    >
                      {notification.title}
                    </span>
                    <h3 className="break-words text-base text-gray-900">
                      {notification.description}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {notification.createdAt}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 text-sm text-blue-600">
                    <span>{notification.actionLabel}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[#4267B2] py-3 text-white transition-colors hover:bg-[#365899]"
        >
          닫기
        </button>
      </div>
    </ModalShell>
  );
}

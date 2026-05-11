import { useCallback, useEffect, useMemo, useState } from 'react';
import { allTags } from './data/appData';
import { useAppState } from './hooks/useAppState';
import { useBookmarks } from './hooks/useBookmarks';
import { useLifeInfo } from './hooks/useLifeInfo';
import { useNewsletters } from './hooks/useNewsletters';
import { usePolicies } from './hooks/usePolicies';
import LoginModal from './components/modals/LoginModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { AppHeader } from './components/layout/AppHeader';
import { AppLayout } from './components/layout/AppLayout';
import { NewsletterPage } from './components/newsletter/NewsletterPage';
import { LifeInfoPage } from './components/life-info/LifeInfoPage';
import { PolicyPage } from './components/policy/PolicyPage';
import { getFilteredNewsletters } from './utils/appFilters';
import { buildNotifications } from './utils/notifications';
import {
  disableBrowserNotifications,
  enableBrowserNotifications,
  getBrowserNotificationEnabled,
  getBrowserNotificationSupport,
  sendServerTestPush,
  sendBrowserNotifications
} from './utils/browserNotifications';
import { logoutSession, updateUserPreferences } from './auth/authApi';
import { useAuthStore, type AuthUser } from './store/authStore';
import {
  EventDetailModal,
  ProductPriceModal,
  TrafficDetailModal,
  WeatherDetailModal
} from './components/modals/InfoDetailModals';
import {
  BookmarksModal,
  NewsDetailModal,
  PolicyDetailModal
} from './components/modals/ContentDetailModals';
import {
  SettingsModal,
  TagManagementModal
} from './components/modals/PreferencesModals';

function App() {
  const state = useAppState();
  const { loginWithGoogle, logout, updatePreferences, user } = useAuthStore();
  const [settingsError, setSettingsError] = useState('');
  const [savingSettings, setSavingSettings] = useState(false);
  const [browserNotificationsEnabled, setBrowserNotificationsEnabled] =
    useState(getBrowserNotificationEnabled);
  const [browserNotificationMessage, setBrowserNotificationMessage] =
    useState('');
  const newsletterQuery = useNewsletters(state.preferences.district, user?.id);
  const lifeInfoQuery = useLifeInfo(state.preferences.district);
  const policyQuery = usePolicies(state.preferences);
  const bookmarks = useBookmarks(user?.id);

  const filteredNewsletters = useMemo(
    () =>
      getFilteredNewsletters(newsletterQuery.newsletters, state.preferences),
    [newsletterQuery.newsletters, state.preferences]
  );
  const bookmarkNewsletters = useMemo(
    () => [
      ...filteredNewsletters,
      ...bookmarks.newsletterItems.filter(
        (bookmark) =>
          !filteredNewsletters.some((news) => news.id === bookmark.id)
      )
    ],
    [bookmarks.newsletterItems, filteredNewsletters]
  );
  const selectedNews = filteredNewsletters.find(
    (news) => news.id === state.selectedNews
  );
  const selectedPolicy = policyQuery.policies.find(
    (policy) => policy.id === state.selectedPolicy
  );
  const selectedProduct = lifeInfoQuery.lifeInfo?.productPrices.find(
    (product) => product.name === state.selectedProduct
  );
  const selectedEvent = policyQuery.events.find(
    (event) => event.title === state.selectedEvent
  );
  const handleLogout = () => {
    void logoutSession().catch(() => undefined);
    logout();
  };

  const handleGoogleLogin = (googleUser: AuthUser) => {
    loginWithGoogle(googleUser);
    if (googleUser.preferences) {
      state.applyPersistedPreferences(googleUser.preferences);
    }
    state.setShowLoginModal(false);
  };

  const handleOpenNews = useCallback(
    (newsId: number) => {
      state.openNews(newsId);
      void newsletterQuery.loadDetail(newsId);
    },
    [newsletterQuery, state]
  );

  const notifications = useMemo(
    () =>
      buildNotifications({
        lifeInfo: lifeInfoQuery.lifeInfo,
        newsletters: filteredNewsletters,
        policies: policyQuery.policies,
        onOpenNews: handleOpenNews,
        onOpenPolicy: state.openPolicy,
        onOpenWeather: () => state.setShowWeatherDetail(true)
      }),
    [
      filteredNewsletters,
      lifeInfoQuery.lifeInfo,
      policyQuery.policies,
      handleOpenNews,
      state
    ]
  );

  useEffect(() => {
    sendBrowserNotifications(notifications);
  }, [notifications]);

  const handleEnableBrowserNotifications = async () => {
    setBrowserNotificationMessage('');
    try {
      const enabled = await enableBrowserNotifications();
      setBrowserNotificationsEnabled(enabled);
      setBrowserNotificationMessage(
        enabled
          ? '브라우저 푸시 알림이 연결되었습니다.'
          : '브라우저 알림 권한 또는 VAPID 키를 확인해 주세요.'
      );
    } catch (error) {
      setBrowserNotificationMessage(
        error instanceof Error
          ? error.message
          : '브라우저 푸시 알림 연결에 실패했습니다.'
      );
    }
  };

  const handleDisableBrowserNotifications = async () => {
    await disableBrowserNotifications();
    setBrowserNotificationsEnabled(false);
    setBrowserNotificationMessage('브라우저 푸시 알림을 껐습니다.');
  };

  const handleSendTestPush = async () => {
    setBrowserNotificationMessage('');
    try {
      const result = await sendServerTestPush();
      setBrowserNotificationMessage(
        `테스트 알림 발송: 성공 ${result.sent}건, 실패 ${result.failed}건`
      );
    } catch (error) {
      setBrowserNotificationMessage(
        error instanceof Error
          ? error.message
          : '테스트 알림 발송에 실패했습니다.'
      );
    }
  };

  const handleToggleBookmark = (
    itemType: 'newsletter' | 'policy',
    itemId: number
  ) => {
    if (!user) {
      state.setShowLoginModal(true);
      return;
    }

    void bookmarks.toggle(itemType, itemId);
  };

  const handleSaveSettings = async () => {
    setSettingsError('');

    if (!user) {
      setSettingsError('Google 로그인 후 설정을 저장할 수 있습니다.');
      return;
    }

    setSavingSettings(true);
    try {
      const savedPreferences = await updateUserPreferences(
        user.id,
        state.preferences
      );
      updatePreferences(savedPreferences);
      state.applyPersistedPreferences(savedPreferences);
      state.setShowSettings(false);
    } catch (error) {
      setSettingsError(
        error instanceof Error
          ? error.message
          : '설정 저장 중 오류가 발생했습니다.'
      );
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        activeTab={state.activeTab}
        bookmarkCount={
          bookmarks.newsletterIds.length + bookmarks.policyIds.length
        }
        notificationCount={notifications.length}
        user={user}
        onLogout={handleLogout}
        onOpenBookmarks={() => state.setShowBookmarks(true)}
        onOpenLogin={() => state.setShowLoginModal(true)}
        onOpenNotifications={() => state.setShowNotifications(true)}
        onOpenSettings={() => state.setShowSettings(true)}
        onTabChange={state.setActiveTab}
      />

      <AppLayout
        activeTab={state.activeTab}
        allTags={allTags}
        district={state.preferences.district}
        events={policyQuery.events}
        featuredNewsletterCount={
          filteredNewsletters.filter((newsletter) => newsletter.featured).length
        }
        lifeInfo={lifeInfoQuery.lifeInfo}
        newsletterCount={filteredNewsletters.length}
        policies={policyQuery.policies}
        preferences={state.preferences}
        selectedTags={state.selectedTags}
        onEventClick={state.openEvent}
        onOpenTagManagement={() => state.setShowTagManagement(true)}
        onPolicyClick={state.openPolicy}
        onProductClick={state.openProduct}
      >
        {state.activeTab === '뉴스레터' && (
          <NewsletterPage
            bookmarkedNews={bookmarks.newsletterIds}
            district={state.preferences.district}
            error={newsletterQuery.error}
            loading={newsletterQuery.loading}
            newsletters={filteredNewsletters}
            refreshing={newsletterQuery.refreshing}
            tags={allTags}
            onNewsClick={handleOpenNews}
            onRefresh={newsletterQuery.refreshFeed}
            onToggleBookmark={(newsId) =>
              handleToggleBookmark('newsletter', newsId)
            }
          />
        )}

        {state.activeTab === '생활정보' && (
          <LifeInfoPage
            district={state.preferences.district}
            error={lifeInfoQuery.error}
            lifeInfo={lifeInfoQuery.lifeInfo}
            loading={lifeInfoQuery.loading}
            onOpenTraffic={() => state.setShowTrafficDetail(true)}
            onOpenWeather={() => state.setShowWeatherDetail(true)}
          />
        )}

        {state.activeTab === '맞춤정책' && (
          <PolicyPage
            bookmarkedPolicies={bookmarks.policyIds}
            error={policyQuery.error}
            loading={policyQuery.loading}
            policies={policyQuery.policies}
            preferences={state.preferences}
            onPolicyClick={state.openPolicy}
            onToggleBookmark={(policyId) =>
              handleToggleBookmark('policy', policyId)
            }
          />
        )}
      </AppLayout>

      {state.showLoginModal && (
        <LoginModal
          onClose={() => state.setShowLoginModal(false)}
          onGoogleLogin={handleGoogleLogin}
        />
      )}

      {state.showWeatherDetail && (
        <WeatherDetailModal
          district={state.preferences.district}
          lifeInfo={lifeInfoQuery.lifeInfo}
          onClose={() => state.setShowWeatherDetail(false)}
        />
      )}

      {state.showTrafficDetail && (
        <TrafficDetailModal
          lifeInfo={lifeInfoQuery.lifeInfo}
          onClose={() => state.setShowTrafficDetail(false)}
        />
      )}

      {state.showPriceDetail && selectedProduct && (
        <ProductPriceModal
          product={selectedProduct}
          onClose={() => state.setShowPriceDetail(false)}
        />
      )}

      {state.showEventDetail && selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => state.setShowEventDetail(false)}
        />
      )}

      {state.showNewsDetail && selectedNews && (
        <NewsDetailModal
          news={selectedNews}
          tags={allTags}
          onClose={() => state.setShowNewsDetail(false)}
        />
      )}

      {state.showPolicyDetail && selectedPolicy && (
        <PolicyDetailModal
          policy={selectedPolicy}
          onClose={() => state.setShowPolicyDetail(false)}
        />
      )}

      {state.showTagManagement && (
        <TagManagementModal
          allTags={allTags}
          selectedTags={state.selectedTags}
          onClearTags={() => state.setSelectedTags([])}
          onClose={() => state.setShowTagManagement(false)}
          onToggleTag={state.toggleTag}
        />
      )}

      {state.showSettings && (
        <SettingsModal
          preferences={state.preferences}
          onAgeChange={state.setAge}
          onChildrenCountChange={state.setChildrenCount}
          onClose={() => state.setShowSettings(false)}
          onDistrictChange={state.setDistrict}
          onEmploymentStatusChange={state.setEmploymentStatus}
          onHasChildrenChange={state.setHasChildren}
          onSave={handleSaveSettings}
          onToggleInterest={state.toggleInterest}
          saveError={settingsError}
          saving={savingSettings}
        />
      )}

      {state.showBookmarks && (
        <BookmarksModal
          bookmarkedNews={bookmarks.newsletterIds}
          bookmarkedPolicies={bookmarks.policyIds}
          error={bookmarks.error}
          newsletters={bookmarkNewsletters}
          policies={policyQuery.policies}
          tags={allTags}
          onClose={() => state.setShowBookmarks(false)}
          onNewsClick={handleOpenNews}
          onPolicyClick={state.openPolicy}
          onToggleNewsBookmark={(newsId) =>
            handleToggleBookmark('newsletter', newsId)
          }
          onTogglePolicyBookmark={(policyId) =>
            handleToggleBookmark('policy', policyId)
          }
        />
      )}

      {state.showNotifications && (
        <NotificationsModal
          browserNotificationsEnabled={browserNotificationsEnabled}
          browserNotificationMessage={browserNotificationMessage}
          browserNotificationsSupported={getBrowserNotificationSupport()}
          canManagePushNotifications={Boolean(user)}
          notifications={notifications}
          onClose={() => state.setShowNotifications(false)}
          onDisableBrowserNotifications={handleDisableBrowserNotifications}
          onEnableBrowserNotifications={handleEnableBrowserNotifications}
          onSendTestPush={handleSendTestPush}
        />
      )}
    </div>
  );
}

export default App;

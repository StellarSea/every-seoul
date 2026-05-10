import { useMemo, useState } from 'react';
import { allTags } from './data/appData';
import { useAppState } from './hooks/useAppState';
import { useBookmarks } from './hooks/useBookmarks';
import { useLifeInfo } from './hooks/useLifeInfo';
import { useNewsletters } from './hooks/useNewsletters';
import { usePolicies } from './hooks/usePolicies';
import LoginModal from './components/modals/LoginModal';
import { AppHeader } from './components/layout/AppHeader';
import { AppLayout } from './components/layout/AppLayout';
import { NewsletterPage } from './components/newsletter/NewsletterPage';
import { LifeInfoPage } from './components/life-info/LifeInfoPage';
import { PolicyPage } from './components/policy/PolicyPage';
import { getFilteredNewsletters } from './utils/appFilters';
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

  const handleOpenNews = (newsId: number) => {
    state.openNews(newsId);
    void newsletterQuery.loadDetail(newsId);
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
        user={user}
        onLogout={handleLogout}
        onOpenBookmarks={() => state.setShowBookmarks(true)}
        onOpenLogin={() => state.setShowLoginModal(true)}
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
    </div>
  );
}

export default App;

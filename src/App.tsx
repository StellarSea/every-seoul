import { useMemo } from 'react';
import {
  allTags,
  eventDetails,
  newsletters,
  policies,
  productPrices
} from './data/appData';
import { useAppState } from './hooks/useAppState';
import LoginModal from './components/modals/LoginModal';
import { AppHeader } from './components/layout/AppHeader';
import { AppLayout } from './components/layout/AppLayout';
import { NewsletterPage } from './components/newsletter/NewsletterPage';
import { LifeInfoPage } from './components/life-info/LifeInfoPage';
import { PolicyPage } from './components/policy/PolicyPage';
import {
  getFilteredNewsletters,
  getFilteredPolicies
} from './utils/appFilters';
import { useAuthStore } from './store/authStore';
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
  const { login, loginWithGoogle, logout, user } = useAuthStore();

  const filteredNewsletters = useMemo(
    () => getFilteredNewsletters(newsletters, state.preferences),
    [state.preferences]
  );
  const filteredPolicies = useMemo(
    () => getFilteredPolicies(policies, state.preferences),
    [state.preferences]
  );

  const selectedNews = filteredNewsletters.find(
    (news) => news.id === state.selectedNews
  );
  const selectedPolicy = filteredPolicies.find(
    (policy) => policy.id === state.selectedPolicy
  );
  const selectedProduct = productPrices[state.selectedProduct];
  const selectedEvent = eventDetails[state.selectedEvent];

  const handleLogin = async (id: string) => {
    login(id);
    state.setShowLoginModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        activeTab={state.activeTab}
        bookmarkCount={
          state.bookmarkedNews.length + state.bookmarkedPolicies.length
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
        selectedTags={state.selectedTags}
        onEventClick={state.openEvent}
        onOpenTagManagement={() => state.setShowTagManagement(true)}
        onProductClick={state.openProduct}
      >
        {state.activeTab === '뉴스레터' && (
          <NewsletterPage
            bookmarkedNews={state.bookmarkedNews}
            district={state.preferences.district}
            newsletters={filteredNewsletters}
            tags={allTags}
            onNewsClick={state.openNews}
            onToggleBookmark={state.toggleNewsBookmark}
          />
        )}

        {state.activeTab === '생활정보' && (
          <LifeInfoPage
            district={state.preferences.district}
            onOpenTraffic={() => state.setShowTrafficDetail(true)}
            onOpenWeather={() => state.setShowWeatherDetail(true)}
          />
        )}

        {state.activeTab === '맞춤정책' && (
          <PolicyPage
            bookmarkedPolicies={state.bookmarkedPolicies}
            policies={filteredPolicies}
            preferences={state.preferences}
            onPolicyClick={state.openPolicy}
            onToggleBookmark={state.togglePolicyBookmark}
          />
        )}
      </AppLayout>

      {state.showLoginModal && (
        <LoginModal
          onClose={() => state.setShowLoginModal(false)}
          onGoogleLogin={(googleUser) => {
            loginWithGoogle(googleUser);
            state.setShowLoginModal(false);
          }}
          onLogin={handleLogin}
        />
      )}

      {state.showWeatherDetail && (
        <WeatherDetailModal
          district={state.preferences.district}
          onClose={() => state.setShowWeatherDetail(false)}
        />
      )}

      {state.showTrafficDetail && (
        <TrafficDetailModal onClose={() => state.setShowTrafficDetail(false)} />
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
          onToggleInterest={state.toggleInterest}
        />
      )}

      {state.showBookmarks && (
        <BookmarksModal
          bookmarkedNews={state.bookmarkedNews}
          bookmarkedPolicies={state.bookmarkedPolicies}
          newsletters={filteredNewsletters}
          policies={filteredPolicies}
          tags={allTags}
          onClose={() => state.setShowBookmarks(false)}
          onNewsClick={state.openNews}
          onPolicyClick={state.openPolicy}
          onToggleNewsBookmark={state.toggleNewsBookmark}
          onTogglePolicyBookmark={state.togglePolicyBookmark}
        />
      )}
    </div>
  );
}

export default App;

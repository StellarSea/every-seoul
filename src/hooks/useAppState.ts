import { useMemo, useState } from 'react';
import type {
  AppTab,
  EmploymentStatus,
  PersistedUserPreferences,
  UserPreferences
} from '../types/app';

export function useAppState() {
  const [activeTab, setActiveTab] = useState<AppTab>('뉴스레터');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showWeatherDetail, setShowWeatherDetail] = useState(false);
  const [showTrafficDetail, setShowTrafficDetail] = useState(false);
  const [showTagManagement, setShowTagManagement] = useState(false);
  const [showPriceDetail, setShowPriceDetail] = useState(false);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [showNewsDetail, setShowNewsDetail] = useState(false);
  const [showPolicyDetail, setShowPolicyDetail] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [age, setAge] = useState('');
  const [district, setDistrict] = useState('강남구');
  const [hasChildren, setHasChildren] = useState(false);
  const [childrenCount, setChildrenCount] = useState('');
  const [employmentStatus, setEmploymentStatus] =
    useState<EmploymentStatus>('');
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState(['부동산', '교통', '행사']);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null);
  const [bookmarkedNews, setBookmarkedNews] = useState<number[]>([]);
  const [bookmarkedPolicies, setBookmarkedPolicies] = useState<number[]>([]);

  const preferences: UserPreferences = useMemo(
    () => ({
      age,
      district,
      hasChildren,
      childrenCount,
      employmentStatus,
      interests
    }),
    [age, childrenCount, district, employmentStatus, hasChildren, interests]
  );

  const openProduct = (productName: string) => {
    setSelectedProduct(productName);
    setShowPriceDetail(true);
  };

  const openEvent = (eventName: string) => {
    setSelectedEvent(eventName);
    setShowEventDetail(true);
  };

  const openNews = (newsId: number) => {
    setSelectedNews(newsId);
    setShowNewsDetail(true);
  };

  const openPolicy = (policyId: number) => {
    setSelectedPolicy(policyId);
    setShowPolicyDetail(true);
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags((current) =>
      current.includes(tagName)
        ? current.filter((tag) => tag !== tagName)
        : [...current, tagName]
    );
  };

  const toggleInterest = (interest: string, checked: boolean) => {
    setInterests((current) =>
      checked
        ? [...current, interest]
        : current.filter((item) => item !== interest)
    );
  };

  const toggleNewsBookmark = (newsId: number) => {
    setBookmarkedNews((current) =>
      current.includes(newsId)
        ? current.filter((id) => id !== newsId)
        : [...current, newsId]
    );
  };

  const togglePolicyBookmark = (policyId: number) => {
    setBookmarkedPolicies((current) =>
      current.includes(policyId)
        ? current.filter((id) => id !== policyId)
        : [...current, policyId]
    );
  };

  const applyPersistedPreferences = (saved: PersistedUserPreferences) => {
    setAge(saved.age === null ? '' : String(saved.age));
    setDistrict(saved.districts[0] || '강남구');
    setHasChildren(saved.has_children);
    setChildrenCount(
      saved.children_count === null ? '' : String(saved.children_count)
    );
    setEmploymentStatus(saved.employment_status);
    setInterests(saved.interests);
  };

  return {
    activeTab,
    bookmarkedNews,
    bookmarkedPolicies,
    childrenCount,
    employmentStatus,
    hasChildren,
    interests,
    preferences,
    selectedEvent,
    selectedNews,
    selectedPolicy,
    selectedProduct,
    selectedTags,
    setActiveTab,
    setAge,
    setChildrenCount,
    setDistrict,
    setEmploymentStatus,
    setHasChildren,
    applyPersistedPreferences,
    setSelectedTags,
    setShowBookmarks,
    setShowEventDetail,
    setShowLoginModal,
    setShowNewsDetail,
    setShowPolicyDetail,
    setShowPriceDetail,
    setShowSettings,
    setShowTagManagement,
    setShowTrafficDetail,
    setShowWeatherDetail,
    showBookmarks,
    showEventDetail,
    showLoginModal,
    showNewsDetail,
    showPolicyDetail,
    showPriceDetail,
    showSettings,
    showTagManagement,
    showTrafficDetail,
    showWeatherDetail,
    toggleInterest,
    toggleNewsBookmark,
    togglePolicyBookmark,
    toggleTag,
    openEvent,
    openNews,
    openPolicy,
    openProduct
  };
}

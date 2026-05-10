import {
  AlertCircle,
  Car,
  ChevronRight,
  Cloud,
  DollarSign,
  FileText,
  Home,
  Settings
} from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';
import type {
  AppTab,
  EventDetail,
  InterestTag,
  LifeInfo,
  Policy,
  UserPreferences
} from '../../types/app';
import { tagColorClass } from '../../utils/tagStyles';

interface CategoryItem {
  name: string;
  count?: number;
  icon?: ComponentType<{ className?: string }>;
  sectionId: string;
}

function getCategoryList(
  activeTab: AppTab,
  newsletterCount: number,
  featuredNewsletterCount: number
): CategoryItem[] {
  if (activeTab === '뉴스레터') {
    return [
      { name: '뉴스레터', icon: Home, sectionId: 'newsletter-top' },
      {
        name: '주요 뉴스',
        count: featuredNewsletterCount,
        sectionId: 'featured-news'
      },
      { name: '전체 뉴스', count: newsletterCount, sectionId: 'all-news' }
    ];
  }

  if (activeTab === '생활정보') {
    return [
      { name: '생활정보', icon: Cloud, sectionId: 'life-info-top' },
      { name: '날씨 정보', icon: Cloud, sectionId: 'weather-section' },
      { name: '교통 정보', icon: Car, sectionId: 'traffic-section' },
      { name: '추가 정보', icon: AlertCircle, sectionId: 'additional-info' }
    ];
  }

  return [
    { name: '맞춤 정책', icon: FileText, sectionId: 'policy-top' },
    { name: '전체 정책', icon: Home, sectionId: 'policy-list' }
  ];
}

interface AppLayoutProps {
  activeTab: AppTab;
  allTags: InterestTag[];
  children: ReactNode;
  district: string;
  events: EventDetail[];
  lifeInfo: LifeInfo | null;
  featuredNewsletterCount: number;
  newsletterCount: number;
  policies: Policy[];
  preferences: UserPreferences;
  selectedTags: string[];
  onEventClick: (eventName: string) => void;
  onOpenTagManagement: () => void;
  onPolicyClick: (policyId: number) => void;
  onProductClick: (productName: string) => void;
}

export function AppLayout({
  activeTab,
  allTags,
  children,
  district,
  events,
  lifeInfo,
  featuredNewsletterCount,
  newsletterCount,
  policies,
  preferences,
  selectedTags,
  onEventClick,
  onOpenTagManagement,
  onPolicyClick,
  onProductClick
}: AppLayoutProps) {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex gap-6">
        <aside className="w-56 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
            <div className="space-y-1">
              {getCategoryList(
                activeTab,
                newsletterCount,
                featuredNewsletterCount
              ).map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => scrollToSection(category.sectionId)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm hover:bg-gray-50 transition-colors ${
                    index === 0 ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {category.icon && <category.icon className="w-4 h-4" />}
                    <span>{category.name}</span>
                  </div>
                  {category.count && (
                    <span className="text-xs text-gray-400">
                      {category.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
              <span>{activeTab}</span>
            </div>
            {children}
          </div>
        </main>

        <aside className="w-64 flex-shrink-0">
          {activeTab === '뉴스레터' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm">관심 태그</h3>
                <button
                  onClick={onOpenTagManagement}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTags.length > 0 ? (
                  selectedTags.map((tagName) => {
                    const tag = allTags.find((item) => item.name === tagName);
                    return (
                      <span
                        key={tagName}
                        className={`px-3 py-1.5 rounded text-xs ${tagColorClass(tag?.color)}`}
                      >
                        #{tagName}
                      </span>
                    );
                  })
                ) : (
                  <p className="text-xs text-gray-500">
                    선택된 태그가 없습니다
                  </p>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={onOpenTagManagement}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm transition-colors"
                >
                  관심 태그 관리
                </button>
              </div>
            </div>
          )}

          {activeTab === '생활정보' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24 space-y-4">
              <div>
                <h3 className="text-sm mb-3">빠른 정보</h3>
                <div className="space-y-2">
                  {[
                    {
                      label: '날씨/환경',
                      id: 'weather-section',
                      icon: Cloud,
                      className: 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                    },
                    {
                      label: '교통/경제',
                      id: 'traffic-section',
                      icon: Car,
                      className:
                        'bg-orange-50 hover:bg-orange-100 text-orange-600'
                    },
                    {
                      label: '재난/안전',
                      id: 'additional-info',
                      icon: AlertCircle,
                      className:
                        'bg-purple-50 hover:bg-purple-100 text-purple-600'
                    }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center justify-between p-2 rounded transition-colors ${item.className}`}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        <span className="text-xs text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm mb-3">이번 주 장보기</h4>
                <div className="space-y-2">
                  {!lifeInfo?.productPrices.length && (
                    <p className="rounded bg-gray-50 p-2 text-xs text-gray-500">
                      물가 데이터를 불러오지 못했습니다
                    </p>
                  )}
                  {(lifeInfo?.productPrices ?? []).map((product) => (
                    <button
                      key={product.name}
                      onClick={() => onProductClick(product.name)}
                      className="w-full flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-xs">{product.name}</span>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm mb-3">지역 공지사항</h4>
                <div className="space-y-2">
                  {(lifeInfo?.notices ?? []).map((notice) => (
                    <Notice
                      key={notice.title}
                      title={notice.title}
                      description={notice.description}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === '맞춤정책' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24 space-y-4">
              <div>
                <h3 className="text-sm mb-3">생활 뉴스 안내</h3>
                <div className="space-y-2">
                  <InfoRow label="지역" value={district} />
                  <InfoRow
                    label="나이"
                    value={preferences.age ? `${preferences.age}세` : '미입력'}
                  />
                  <InfoRow
                    label="자녀"
                    value={preferences.hasChildren ? '있음' : '없음'}
                  />
                </div>
              </div>
              <div>
                <h4 className="text-sm mb-3">맞춤 정책 안내</h4>
                <div className="space-y-2">
                  {policies.length === 0 && (
                    <p className="rounded bg-gray-50 p-2 text-xs text-gray-500">
                      표시할 정책이 없습니다
                    </p>
                  )}
                  {policies.slice(0, 2).map((policy) => (
                    <button
                      key={policy.id}
                      onClick={() => onPolicyClick(policy.id)}
                      className="w-full p-3 text-left bg-blue-50 rounded-lg border-l-4 border-blue-500 hover:bg-blue-100 transition-colors"
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-blue-600" />
                          <p className="text-xs text-blue-700">
                            {policy.status}
                          </p>
                        </div>
                        <ChevronRight className="w-3 h-3 text-blue-500" />
                      </div>
                      <p className="text-sm text-gray-700">{policy.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {policy.deadline}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm mb-3">지역 소식 안내</h4>
                <div className="space-y-2">
                  {events.length === 0 && (
                    <p className="rounded bg-gray-50 p-2 text-xs text-gray-500">
                      표시할 이벤트가 없습니다
                    </p>
                  )}
                  {events.slice(0, 3).map((event) => (
                    <button
                      key={event.title}
                      onClick={() => onEventClick(event.title)}
                      className="w-full flex items-center justify-between p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                    >
                      <span className="text-xs text-gray-700">
                        {event.title}
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Notice({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-2 bg-gray-50 rounded">
      <p className="text-xs text-gray-700 mb-1">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="pb-2 border-b border-gray-200">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}

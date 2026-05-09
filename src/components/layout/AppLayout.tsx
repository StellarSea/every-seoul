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
import type { AppTab, InterestTag } from '../../types/app';
import { tagColorClass } from '../../utils/tagStyles';

interface CategoryItem {
  name: string;
  count?: number;
  icon?: ComponentType<{ className?: string }>;
  sectionId: string;
}

function getCategoryList(activeTab: AppTab): CategoryItem[] {
  if (activeTab === '뉴스레터') {
    return [
      { name: '뉴스레터', icon: Home, sectionId: 'newsletter-top' },
      { name: '주요 뉴스', count: 12, sectionId: 'featured-news' },
      { name: '전체 뉴스', count: 28, sectionId: 'all-news' }
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
  selectedTags: string[];
  onEventClick: (eventName: string) => void;
  onOpenTagManagement: () => void;
  onProductClick: (productName: string) => void;
}

export function AppLayout({
  activeTab,
  allTags,
  children,
  district,
  selectedTags,
  onEventClick,
  onOpenTagManagement,
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
              {getCategoryList(activeTab).map((category, index) => (
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
                  {['양배추(절임배추)', '돼지고기(삼겹살)', '쌀', '사과'].map(
                    (product) => (
                      <button
                        key={product}
                        onClick={() => onProductClick(product)}
                        className="w-full flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-xs">{product}</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </button>
                    )
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm mb-3">지역 공지사항</h4>
                <div className="space-y-2">
                  <Notice
                    title={`${district}청 민원실 운영시간 변경`}
                    description="4/15부터 적용"
                  />
                  <Notice
                    title="재활용 분리수거 요일 안내"
                    description="매주 수/금요일"
                  />
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
                  <InfoRow label="나이" value="만 19세 ~ 39세" />
                  <InfoRow label="자녀" value="없음" />
                </div>
              </div>
              <div>
                <h4 className="text-sm mb-3">맞춤 정책 안내</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center gap-1 mb-1">
                      <AlertCircle className="w-3 h-3 text-red-600" />
                      <p className="text-xs text-red-700">마감임박</p>
                    </div>
                    <p className="text-sm text-gray-700">청년 월세 지원</p>
                    <p className="text-xs text-gray-500 mt-1">D-2</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center gap-1 mb-1">
                      <DollarSign className="w-3 h-3 text-green-600" />
                      <p className="text-xs text-green-700">모집중</p>
                    </div>
                    <p className="text-sm text-gray-700">청년통장 참여자</p>
                    <p className="text-xs text-gray-500 mt-1">D-10</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm mb-3">이벤트 안내</h4>
                <div className="space-y-2">
                  {['서울시 청년정책 설명회', '온라인 정책 상담'].map(
                    (eventName) => (
                      <button
                        key={eventName}
                        onClick={() => onEventClick(eventName)}
                        className="w-full flex items-center justify-between p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                      >
                        <span className="text-xs text-gray-700">
                          {eventName}
                        </span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </button>
                    )
                  )}
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

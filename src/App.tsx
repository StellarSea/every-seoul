import {
  Home,
  Cloud,
  Car,
  AlertCircle,
  FileText,
  Star,
  Settings,
  ChevronRight,
  CloudRain,
  Wind,
  Droplets,
  Calendar,
  Users,
  DollarSign,
  X
} from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './components/ImageWithFallback';
import LoginModal from './components/modals/LoginModal';
import { useAuthStore } from './store/authStore';
import NewsletterModal from './components/modals/NewsletterModal';
import type { Newsletter } from './types/types';

function App() {
  /* ============================================
     STATE MANAGEMENT
     ============================================ */
  // 탭 및 모달 상태
  const [activeTab, setActiveTab] = useState('뉴스레터');
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // 개인 정보 설정
  const [userAge, setUserAge] = useState('');
  const [userDistrict, setUserDistrict] = useState('강남구');
  const [hasChildren, setHasChildren] = useState(false);
  const [childrenCount, setChildrenCount] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  // 선택된 항목
  const [selectedTags, setSelectedTags] = useState(['부동산', '교통', '행사']);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null);

  // 북마크된 항목
  const [bookmarkedNews, setBookmarkedNews] = useState<number[]>([]);
  const [bookmarkedPolicies, setBookmarkedPolicies] = useState<number[]>([]);

  /* ============================================
     EVENT HANDLERS
     ============================================ */
  // 로그인/로그아웃 핸들러

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    logout();
  };

  // 설정 저장 핸들러
  const handleSaveSettings = () => {
    setShowSettings(false);
    // 설정이 저장되었다는 알림을 표시할 수 있습니다
  };

  // 북마크 토글 핸들러
  const toggleNewsBookmark = (newsId: number) => {
    if (bookmarkedNews.includes(newsId)) {
      setBookmarkedNews(bookmarkedNews.filter((id) => id !== newsId));
    } else {
      setBookmarkedNews([...bookmarkedNews, newsId]);
    }
  };

  const togglePolicyBookmark = (policyId: number) => {
    if (bookmarkedPolicies.includes(policyId)) {
      setBookmarkedPolicies(bookmarkedPolicies.filter((id) => id !== policyId));
    } else {
      setBookmarkedPolicies([...bookmarkedPolicies, policyId]);
    }
  };

  /* ============================================
      리팩토링 완료
      ============================================ */
  // 로그인 상태
  const { login, logout } = useAuthStore();

  const handleLogin = async (id: string) => {
    // TODO: 실제 로그인 로직 구현

    login(id);
    setShowLoginModal(false);
  };
  /* ============================================
     DATA DEFINITIONS
     ============================================ */
  // 전체 태그 목록
  const allTags = [
    { name: '부동산', color: 'orange' },
    { name: '교통', color: 'blue' },
    { name: '주차', color: 'green' },
    { name: '행사', color: 'orange' },
    { name: '문화', color: 'blue' },
    { name: '공사', color: 'green' },
    { name: '축제', color: 'purple' },
    { name: '맛집', color: 'red' },
    { name: '날씨', color: 'blue' },
    { name: '환경', color: 'green' },
    { name: '정책', color: 'orange' },
    { name: '복지', color: 'purple' }
  ];

  /* ============================================
     HELPER FUNCTIONS
     ============================================ */
  // 태그 토글 함수
  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  // 상품 클릭 핸들러
  const handleProductClick = (productName: string) => {
    setSelectedProduct(productName);
    setShowPriceDetail(true);
  };

  // 이벤트 클릭 핸들러
  const handleEventClick = (eventName: string) => {
    setSelectedEvent(eventName);
    setShowEventDetail(true);
  };

  // 뉴스 클릭 핸들러
  const handleNewsClick = (newsId: number) => {
    setSelectedNews(newsId);
    setShowNewsDetail(true);
  };

  // 정책 클릭 핸들러
  const handlePolicyClick = (policyId: number) => {
    setSelectedPolicy(policyId);
    setShowPolicyDetail(true);
  };

  // 섹션 스크롤 함수
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 카테고리 목록 생성 함수
  const getCategoryList = () => {
    if (activeTab === '뉴스레터') {
      return [
        { name: '뉴스레터', icon: Home, sectionId: 'newsletter-top' },
        { name: '주요 뉴스', count: 12, sectionId: 'featured-news' },
        { name: '전체 뉴스', count: 28, sectionId: 'all-news' }
      ];
    } else if (activeTab === '생활정보') {
      return [
        { name: '생활정보', icon: Cloud, sectionId: 'life-info-top' },
        { name: '날씨 정보', icon: Cloud, sectionId: 'weather-section' },
        { name: '교통 정보', icon: Car, sectionId: 'traffic-section' },
        { name: '추가 정보', icon: AlertCircle, sectionId: 'additional-info' }
      ];
    } else {
      return [
        { name: '맞춤 정책', icon: FileText, sectionId: 'policy-top' },
        { name: '전체 정책', icon: Home, sectionId: 'policy-list' }
      ];
    }
  };

  // 설정 기반 콘텐츠 필터링
  const getFilteredNewsletters = () => {
    let filtered = [...newsletters];

    // 거주 지역 필터링
    if (userDistrict) {
      filtered = filtered.map((news) => {
        const matchesDistrict = news.category.includes(userDistrict);
        return { ...news, relevance: matchesDistrict ? 10 : 0 };
      });
    }

    // 관심 분야 필터링
    if (interests.length > 0) {
      filtered = filtered.map((news) => {
        const interestMatch = news.tags.some((tag) => {
          if (
            interests.includes('housing') &&
            (tag === '부동산' || tag === '주거')
          )
            return true;
          if (interests.includes('traffic') && tag === '교통') return true;
          if (
            interests.includes('culture') &&
            (tag === '문화' || tag === '행사')
          )
            return true;
          if (interests.includes('safety') && tag === '공사') return true;
          return false;
        });
        return {
          ...news,
          relevance: (news.relevance || 0) + (interestMatch ? 5 : 0)
        };
      });
    }

    // 관련도 순으로 정렬
    return filtered.sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
  };

  const getFilteredPolicies = () => {
    let filtered = [...policies];

    // 나이 기반 필터링
    const age = parseInt(userAge);
    if (!isNaN(age)) {
      filtered = filtered.map((policy) => {
        let relevance = 0;

        // 청년 정책 (19-39세)
        if (
          age >= 19 &&
          age <= 39 &&
          (policy.title.includes('청년') || policy.category === '구직')
        ) {
          relevance += 10;
        }

        return { ...policy, relevance };
      });
    }

    // 자녀 유무 기반 필터링
    if (hasChildren) {
      filtered = filtered.map((policy) => ({
        ...policy,
        relevance:
          (policy.relevance || 0) +
          (policy.category === '육아' || policy.category === '교육' ? 10 : 0)
      }));
    }

    // 취업 상태 기반 필터링
    if (employmentStatus === 'job-seeking') {
      filtered = filtered.map((policy) => ({
        ...policy,
        relevance:
          (policy.relevance || 0) +
          (policy.category === '구직' || policy.title.includes('수당') ? 10 : 0)
      }));
    }

    // 주거 관심사가 있는 경우
    if (interests.includes('housing')) {
      filtered = filtered.map((policy) => ({
        ...policy,
        relevance:
          (policy.relevance || 0) + (policy.category === '주거' ? 5 : 0)
      }));
    }

    // 관련도 순으로 정렬
    return filtered.sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
  };

  /* ============================================
     DATA - 뉴스레터
     ============================================ */
  const newsletters: Newsletter[] = [
    {
      id: 1,
      title: '강릉시 당직 요약',
      date: '2026년 4월 11일',
      category: '강남구',
      relevance: 0,
      image:
        'https://images.unsplash.com/photo-1506816561089-5cc37b3aa9b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      excerpt:
        '강남구의 주요 소식을 정리해드립니다. 교통, 부동산, 지역 행사 등 다양한 소식을 확인하세요.',
      tags: ['교통', '부동산', '행사'],
      views: 1243,
      featured: true
    },
    {
      id: 2,
      title: '방학동 도로 보수공사 경유 어린 시내 버스',
      date: '2026.04.10',
      category: '강남구',
      relevance: 0,
      excerpt:
        '방학동 일대 도로 보수공사로 인해 시내버스 노선이 일시적으로 변경됩니다. 해당 지역 주민분들께서는 이용에 참고 부탁드립니다.',
      tags: ['교통', '공사'],
      views: 892
    },
    {
      id: 3,
      title: '강남 역삼동 일대 주차 단속 강화 안내',
      date: '2026.04.09',
      category: '강남구',
      relevance: 0,
      excerpt:
        '역삼동 테헤란로 일대에서 불법 주정차 단속이 강화됩니다. 주민 및 방문객 여러분의 협조를 부탁드립니다.',
      tags: ['주차', '교통'],
      views: 1521
    },
    {
      id: 4,
      title: '한강공원 봄맞이 행사 개최',
      date: '2026.04.08',
      category: '한강',
      relevance: 0,
      excerpt:
        '한강공원에서 봄을 맞아 다양한 문화 행사가 열립니다. 가족과 함께 즐거운 시간을 보내세요.',
      tags: ['행사', '문화'],
      views: 2104
    },
    {
      id: 5,
      title: '서초구 부동산 시장 동향 분석',
      date: '2026.04.07',
      category: '서초구',
      relevance: 0,
      excerpt:
        '최근 서초구 부동산 시장의 변화와 전망을 분석합니다. 투자자와 주민 여러분께 유용한 정보를 제공합니다.',
      tags: ['부동산', '문화'],
      views: 3241
    }
  ];

  /* ============================================
     DATA - 맞춤정책
     ============================================ */
  const policies = [
    {
      id: 1,
      title: '서울 청년 월세 지원 2기 모집',
      description: '만 19세 ~ 39세 청년 대상 월세 지원 사업',
      deadline: '마감 D-2',
      period: '2026년 3월 ~ 12월',
      category: '주거',
      status: '마감임박',
      statusColor: 'red',
      views: 3542,
      relevance: 0
    },
    {
      id: 2,
      title: '청년전용보증부월세대출 안내',
      description: '무주택 청년을 위한 월세보증금 대출 상품',
      deadline: '상시',
      period: '연중 상시',
      category: '주거',
      status: '진행중',
      statusColor: 'blue',
      views: 2145,
      relevance: 0
    },
    {
      id: 3,
      title: '서울 청년통장 참여자 모집',
      description: '청년 자산형성 지원 프로그램 - 월 10만원씩 3년간 적립',
      deadline: '10일 뒤 마감',
      period: '2026.04 ~ 2029.04',
      category: '자산형성',
      status: '모집중',
      statusColor: 'green',
      views: 4521,
      relevance: 0
    },
    {
      id: 4,
      title: '서울 청년수당 마감일자 안내',
      description: '구직활동 청년에게 월 50만원 지급 (최대 6개월)',
      deadline: '마감 D-14',
      period: '2026.04 ~ 2026.10',
      category: '구직',
      status: '접수중',
      statusColor: 'orange',
      views: 5234,
      relevance: 0
    }
  ];

  /* ============================================
     DATA - 물가정보
     ============================================ */
  const productPrices: Record<
    string,
    {
      name: string;
      category: string;
      currentPrice: number;
      previousPrice: number;
      unit: string;
      change: number;
      trend: 'up' | 'down';
      stores: { name: string; price: number; location: string }[];
      graph: { date: string; price: number }[];
    }
  > = {
    '양배추(절임배추)': {
      name: '양배추 (절임배추)',
      category: '채소류',
      currentPrice: 4500,
      previousPrice: 4200,
      unit: '1포기',
      change: 7.1,
      trend: 'up',
      stores: [
        { name: '이마트', price: 4200, location: '강남점' },
        { name: '롯데마트', price: 4500, location: '잠실점' },
        { name: '홈플러스', price: 4800, location: '목동점' },
        { name: '농협하나로마트', price: 3900, location: '양재점' }
      ],
      graph: [
        { date: '3/11', price: 4000 },
        { date: '3/18', price: 3800 },
        { date: '3/25', price: 4100 },
        { date: '4/01', price: 4200 },
        { date: '4/08', price: 4500 }
      ]
    },
    '돼지고기(삼겹살)': {
      name: '돼지고기 (삼겹살)',
      category: '육류',
      currentPrice: 18900,
      previousPrice: 19500,
      unit: '100g',
      change: -3.1,
      trend: 'down',
      stores: [
        { name: '이마트', price: 18500, location: '강남점' },
        { name: '롯데마트', price: 18900, location: '잠실점' },
        { name: '홈플러스', price: 19200, location: '목동점' },
        { name: '코스트코', price: 17800, location: '양평점' }
      ],
      graph: [
        { date: '3/11', price: 20000 },
        { date: '3/18', price: 19800 },
        { date: '3/25', price: 19500 },
        { date: '4/01', price: 19200 },
        { date: '4/08', price: 18900 }
      ]
    },
    쌀: {
      name: '쌀',
      category: '곡물류',
      currentPrice: 52000,
      previousPrice: 51500,
      unit: '10kg',
      change: 1.0,
      trend: 'up',
      stores: [
        { name: '이마트', price: 52000, location: '강남점' },
        { name: '롯데마트', price: 51500, location: '잠실점' },
        { name: '홈플러스', price: 52500, location: '목동점' },
        { name: '농협하나로마트', price: 49900, location: '양재점' }
      ],
      graph: [
        { date: '3/11', price: 51000 },
        { date: '3/18', price: 51200 },
        { date: '3/25', price: 51500 },
        { date: '4/01', price: 51800 },
        { date: '4/08', price: 52000 }
      ]
    },
    사과: {
      name: '사과',
      category: '과일류',
      currentPrice: 8500,
      previousPrice: 9200,
      unit: '1kg (4~5개)',
      change: -7.6,
      trend: 'down',
      stores: [
        { name: '이마트', price: 8500, location: '강남점' },
        { name: '롯데마트', price: 8800, location: '잠실점' },
        { name: '홈플러스', price: 9000, location: '목동점' },
        { name: '농협하나로마트', price: 7900, location: '양재점' }
      ],
      graph: [
        { date: '3/11', price: 10000 },
        { date: '3/18', price: 9500 },
        { date: '3/25', price: 9200 },
        { date: '4/01', price: 8800 },
        { date: '4/08', price: 8500 }
      ]
    }
  };

  /* ============================================
     DATA - 이벤트정보
     ============================================ */
  const eventDetails: Record<
    string,
    {
      title: string;
      date: string;
      time: string;
      location: string;
      locationDetail: string;
      capacity: number;
      registered: number;
      description: string;
      program: { time: string; content: string }[];
      benefits: string[];
      requirements: string[];
      contact: string;
    }
  > = {
    '서울시 청년정책 설명회': {
      title: '2026 서울시 청년정책 설명회',
      date: '2026년 4월 25일 (금)',
      time: '14:00 - 17:00',
      location: '강남구청 대강당',
      locationDetail: '서울특별시 강남구 학동로 426 (논현동)',
      capacity: 200,
      registered: 156,
      description:
        '2026년 서울시 청년을 위한 다양한 정책을 소개하고, 청년들의 의견을 듣는 소통의 장입니다. 주거, 일자리, 자산형성 등 청년들이 관심있는 정책을 직접 듣고 질문할 수 있습니다.',
      program: [
        { time: '14:00 - 14:30', content: '등록 및 접수' },
        { time: '14:30 - 15:00', content: '서울시 청년정책 전반 소개' },
        { time: '15:00 - 15:40', content: '주거/일자리 정책 상세 설명' },
        { time: '15:40 - 16:00', content: '휴식 시간' },
        { time: '16:00 - 16:40', content: '자산형성/복지 정책 상세 설명' },
        { time: '16:40 - 17:00', content: '질의응답 및 개별 상담' }
      ],
      benefits: [
        '참여자 전원 모바일 기프티콘 제공',
        '정책 설명 자료집 제공',
        '개별 맞춤 정책 상담 기회',
        '우수 질문자 소정의 상품 증정'
      ],
      requirements: [
        '만 19세 ~ 39세 서울시 거주 청년',
        '사전 온라인 신청 필수',
        '신분증 지참'
      ],
      contact: '서울시 청년정책과 02-2133-5420'
    },
    '온라인 정책 상담': {
      title: '청년 맞춤형 온라인 정책 상담',
      date: '상시 운영 (평일)',
      time: '09:00 - 18:00',
      location: '온라인 (화상회의)',
      locationDetail: 'ZOOM 링크를 통한 1:1 상담',
      capacity: 50,
      registered: 32,
      description:
        '청년들의 개인 상황에 맞는 정책을 1:1로 상담해드립니다. 주거, 일자리, 자산형성, 복지 등 관심있는 분야의 정책을 전문 상담사와 함께 찾아보세요.',
      program: [
        { time: '1단계', content: '온라인 신청서 작성 (개인정보 및 관심분야)' },
        { time: '2단계', content: '상담 일정 확정 (신청 후 2일 이내)' },
        { time: '3단계', content: 'ZOOM 링크 발송' },
        { time: '4단계', content: '1:1 맞춤 상담 진행 (30분)' },
        { time: '5단계', content: '정책 신청 지원 및 후속 조치' }
      ],
      benefits: [
        '개인 맞춤형 정책 추천',
        '신청 절차 안내 및 지원',
        '후속 관리 및 문의 대응',
        '상담 내용 요약본 제공'
      ],
      requirements: [
        '만 19세 ~ 39세 서울시 거주 청년',
        '화상회의 가능 환경 (PC/모바일)',
        '사전 온라인 신청 필수'
      ],
      contact: '서울시 청년상담센터 1599-9995'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============================================
           HEADER - 상단 네비게이션 바
           ============================================ */}
      <header className="bg-[#4267B2] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl">에브리서울</h1>
              <nav className="flex gap-6 text-sm">
                <button
                  onClick={() => setActiveTab('뉴스레터')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === '뉴스레터'
                      ? 'bg-white/20'
                      : 'hover:bg-white/10'
                  }`}
                >
                  뉴스레터
                </button>
                <button
                  onClick={() => setActiveTab('생활정보')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === '생활정보'
                      ? 'bg-white/20'
                      : 'hover:bg-white/10'
                  }`}
                >
                  생활정보
                </button>
                <button
                  onClick={() => setActiveTab('맞춤정책')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === '맞춤정책'
                      ? 'bg-white/20'
                      : 'hover:bg-white/10'
                  }`}
                >
                  맞춤정책
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowBookmarks(true)}
                className="hover:bg-white/10 p-2 rounded transition-colors relative"
                title="북마크"
              >
                <Star className="w-5 h-5" />
                {bookmarkedNews.length + bookmarkedPolicies.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {bookmarkedNews.length + bookmarkedPolicies.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="hover:bg-white/10 p-2 rounded transition-colors"
                title="설정"
              >
                <Settings className="w-5 h-5" />
              </button>
              {isLoggedIn ? (
                <>
                  <span className="text-sm">{userName}님</span>
                  <button
                    onClick={handleLogout}
                    className="hover:bg-white/10 px-4 py-1.5 rounded text-sm transition-colors"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hover:bg-white/10 px-4 py-1.5 rounded text-sm transition-colors"
                >
                  로그인
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ============================================
           MAIN LAYOUT - 3단 레이아웃 (왼쪽/중앙/오른쪽)
           ============================================ */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* ============================================
               LEFT SIDEBAR - 카테고리 네비게이션
               ============================================ */}
          <aside className="w-56 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
              <div className="space-y-1">
                {getCategoryList().map((category, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      category.sectionId && scrollToSection(category.sectionId)
                    }
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

          {/* ============================================
               MAIN CONTENT - 뉴스레터/생활정보/맞춤정책 콘텐츠
               ============================================ */}
          <main className="flex-1 min-w-0">
            <div className="space-y-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Home className="w-4 h-4" />
                <ChevronRight className="w-4 h-4" />
                <span>{activeTab}</span>
              </div>

              {/* ============================================
                   뉴스레터 탭 콘텐츠
                   ============================================ */}
              {activeTab === '뉴스레터' && (
                <>
                  {/* Section Title */}
                  <div id="newsletter-top">
                    <h2 className="text-xl mb-1">
                      오늘의 {userDistrict || '강남구'} 요약
                    </h2>
                    <p className="text-sm text-gray-500">최신 뉴스레터 10개</p>
                  </div>

                  {/* Featured Newsletter */}
                  <div id="featured-news">
                    {/* Featured Newsletter */}
                    {getFilteredNewsletters()
                      .filter((n) => n.featured)
                      .map((newsletter) => (
                        <div key={newsletter.id}>
                          {NewsletterModal(
                            newsletter,
                            handleNewsClick,
                            toggleNewsBookmark,
                            bookmarkedNews,
                            allTags
                          )}
                        </div>
                      ))}
                  </div>

                  {/* Section Title */}
                  <div id="all-news" className="pt-4">
                    <h2 className="text-lg">
                      {userDistrict || '강남구'} 뉴스 요약
                    </h2>
                  </div>

                  {/* Newsletter List */}
                  {getFilteredNewsletters()
                    .filter((n) => !n.featured)
                    .map((newsletter) => (
                      <article
                        key={newsletter.id}
                        onClick={() => handleNewsClick(newsletter.id)}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {newsletter.category}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              {newsletter.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                              조회 {newsletter.views}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleNewsBookmark(newsletter.id);
                              }}
                              className={`p-1 rounded transition-colors ${
                                bookmarkedNews.includes(newsletter.id)
                                  ? 'text-yellow-600'
                                  : 'text-gray-400 hover:text-yellow-600'
                              }`}
                              title={
                                bookmarkedNews.includes(newsletter.id)
                                  ? '북마크 해제'
                                  : '북마크 추가'
                              }
                            >
                              <Star
                                className={`w-4 h-4 ${bookmarkedNews.includes(newsletter.id) ? 'fill-current' : ''}`}
                              />
                            </button>
                          </div>
                        </div>
                        <h3 className="mb-2">{newsletter.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                          {newsletter.excerpt}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {newsletter.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 rounded text-xs ${
                                allTags.find((t) => t.name === tag)?.color ===
                                'orange'
                                  ? 'bg-orange-100 text-orange-700'
                                  : allTags.find((t) => t.name === tag)
                                        ?.color === 'green'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))}
                </>
              )}

              {/* ============================================
                   생활정보 탭 콘텐츠
                   ============================================ */}
              {activeTab === '생활정보' && (
                <>
                  {/* Section Title */}
                  <div id="life-info-top">
                    <h2 className="text-xl mb-1">오늘의 생활정보</h2>
                    <p className="text-sm text-gray-500">
                      2026년 4월 11일 토요일 오전 10:02 기준
                    </p>
                  </div>

                  {/* Weather Card */}
                  <article
                    id="weather-section"
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Cloud className="w-5 h-5 text-blue-500" />
                          <h3 className="text-lg">날씨 · 환경</h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          서울시 {userDistrict || '강남구'} 기준 날씨 정보를
                          제공합니다
                        </p>
                      </div>
                      <button
                        onClick={() => setShowWeatherDetail(true)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        더보기
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Current Weather */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              현재 날씨
                            </p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-5xl">14°C</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              체감온도 12°C · 흐림
                            </p>
                          </div>
                          <CloudRain className="w-16 h-16 text-blue-400" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-200">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">습도</p>
                            <p className="text-sm">62%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">바람</p>
                            <p className="text-sm">남서 3m/s</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              강수확률
                            </p>
                            <p className="text-sm">30%</p>
                          </div>
                        </div>
                      </div>

                      {/* Air Quality */}
                      <div>
                        <h4 className="text-sm mb-3">대기질 정보</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Wind className="w-5 h-5 text-green-600" />
                              <div>
                                <p className="text-sm">미세먼지 (PM10)</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  좋음
                                </p>
                              </div>
                            </div>
                            <span className="text-lg text-green-700">
                              32㎍/m³
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Wind className="w-5 h-5 text-green-600" />
                              <div>
                                <p className="text-sm">초미세먼지 (PM2.5)</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  좋음
                                </p>
                              </div>
                            </div>
                            <span className="text-lg text-green-700">
                              18㎍/m³
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Droplets className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="text-sm">오존 (O₃)</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  보통
                                </p>
                              </div>
                            </div>
                            <span className="text-lg text-blue-700">
                              0.045ppm
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        ※ 날씨 정보는 기상청 제공 데이터를 기반으로 하며, 실제
                        날씨와 다를 수 있습니다
                      </p>
                    </div>
                  </article>

                  {/* Traffic Info Card */}
                  <article
                    id="traffic-section"
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Car className="w-5 h-5 text-orange-500" />
                          <h3 className="text-lg">교통 · 경제</h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          실시간 교통 정보와 주요 경제 지표를 확인하세요
                        </p>
                      </div>
                      <button
                        onClick={() => setShowTrafficDetail(true)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        더보기
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm mb-3">주요 도로 소통 상황</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <span className="text-sm">강남대로</span>
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                              원활
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <span className="text-sm">테헤란로</span>
                            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                              지체
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <span className="text-sm">올림픽대로</span>
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                              원활
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm mb-3">환율 정보</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <span className="text-sm">USD</span>
                            <div className="text-right">
                              <p className="text-sm">1,320.50원</p>
                              <p className="text-xs text-red-600">▲ 2.30</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <span className="text-sm">JPY (100엔)</span>
                            <div className="text-right">
                              <p className="text-sm">892.40원</p>
                              <p className="text-xs text-blue-600">▼ 1.20</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <span className="text-sm">EUR</span>
                            <div className="text-right">
                              <p className="text-sm">1,425.80원</p>
                              <p className="text-xs text-red-600">▲ 3.50</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* Additional Info Cards */}
                  <div
                    id="additional-info"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <h3>전국 재난문자</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                          <p className="text-sm mb-1">대설주의보 발효</p>
                          <p className="text-xs text-gray-600">
                            경기북부 지역 - 10:25
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-500">
                          <p className="text-sm mb-1">강풍주의보</p>
                          <p className="text-xs text-gray-600">
                            인천 지역 - 09:40
                          </p>
                        </div>
                      </div>
                    </article>

                    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <h3>시간대별 날씨</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-2">12시</p>
                          <Cloud className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                          <p className="text-sm">15°</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-2">15시</p>
                          <CloudRain className="w-8 h-8 text-blue-400 mx-auto mb-1" />
                          <p className="text-sm">16°</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-2">18시</p>
                          <CloudRain className="w-8 h-8 text-blue-400 mx-auto mb-1" />
                          <p className="text-sm">14°</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-2">21시</p>
                          <Cloud className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                          <p className="text-sm">12°</p>
                        </div>
                      </div>
                    </article>
                  </div>
                </>
              )}

              {/* ============================================
                   맞춤정책 탭 콘텐츠
                   ============================================ */}
              {activeTab === '맞춤정책' && (
                <>
                  {/* Section Title */}
                  <div
                    id="policy-top"
                    className="flex items-start justify-between"
                  >
                    <div>
                      <h2 className="text-xl mb-2">맞춤 정책</h2>
                      <p className="text-sm text-gray-500 mb-3">
                        고객님께 맞는 정책을 안내해 드립니다
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            만 19세 ~ 39세 청년
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">자녀 유무: 없음</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      2026.04.11 기준
                    </button>
                  </div>

                  {/* Info Banner */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900 mb-1">
                          {userAge || hasChildren || employmentStatus ? (
                            <>
                              {userAge && `${userAge}세`}
                              {userAge &&
                                (hasChildren || employmentStatus) &&
                                ', '}
                              {hasChildren && `자녀 ${childrenCount || ''}명`}
                              {hasChildren && employmentStatus && ', '}
                              {employmentStatus === 'job-seeking' && '구직자'}
                              {employmentStatus === 'employed' && '재직자'}
                              {employmentStatus === 'student' && '학생'}
                              {employmentStatus === 'self-employed' &&
                                '자영업자'}
                              를 위한 맞춤 정책을 안내해드립니다
                            </>
                          ) : (
                            '고객님의 나이와 자녀 유무를 기준으로 맞춤 정책을 안내해드립니다'
                          )}
                        </p>
                        <p className="text-xs text-blue-700">
                          정보 수정을 원하시면 우측 상단의 설정에서 변경하실 수
                          있습니다
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Policy List */}
                  <div id="policy-list">
                    <h3 className="text-lg mb-4">추천 정책 목록</h3>
                    <div className="space-y-3">
                      {getFilteredPolicies().map((policy) => (
                        <article
                          key={policy.id}
                          onClick={() => handlePolicyClick(policy.id)}
                          className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span
                                  className={`px-2 py-0.5 rounded text-xs ${
                                    policy.statusColor === 'red'
                                      ? 'bg-red-100 text-red-700'
                                      : policy.statusColor === 'orange'
                                        ? 'bg-orange-100 text-orange-700'
                                        : policy.statusColor === 'green'
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-blue-100 text-blue-700'
                                  }`}
                                >
                                  {policy.status}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {policy.category}
                                </span>
                              </div>
                              <h3 className="text-lg mb-2">{policy.title}</h3>
                              <p className="text-sm text-gray-600 mb-3">
                                {policy.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>기간: {policy.period}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  <span>{policy.deadline}</span>
                                </div>
                                <span>
                                  조회 {policy.views.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePolicyBookmark(policy.id);
                                }}
                                className={`p-1.5 rounded transition-colors ${
                                  bookmarkedPolicies.includes(policy.id)
                                    ? 'text-yellow-600'
                                    : 'text-gray-400 hover:text-yellow-600'
                                }`}
                                title={
                                  bookmarkedPolicies.includes(policy.id)
                                    ? '북마크 해제'
                                    : '북마크 추가'
                                }
                              >
                                <Star
                                  className={`w-4 h-4 ${bookmarkedPolicies.includes(policy.id) ? 'fill-current' : ''}`}
                                />
                              </button>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </main>

          {/* ============================================
               RIGHT SIDEBAR - 탭별 부가 정보
               ============================================ */}
          <aside className="w-64 flex-shrink-0">
            {activeTab === '뉴스레터' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm">관심 태그</h3>
                  <button
                    onClick={() => setShowTagManagement(true)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.length > 0 ? (
                    selectedTags.map((tagName, idx) => {
                      const tag = allTags.find((t) => t.name === tagName);
                      return (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 rounded text-xs ${
                            tag?.color === 'orange'
                              ? 'bg-orange-100 text-orange-700'
                              : tag?.color === 'green'
                                ? 'bg-green-100 text-green-700'
                                : tag?.color === 'purple'
                                  ? 'bg-purple-100 text-purple-700'
                                  : tag?.color === 'red'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-blue-100 text-blue-700'
                          }`}
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
                    onClick={() => setShowTagManagement(true)}
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
                    <button
                      onClick={() => scrollToSection('weather-section')}
                      className="w-full flex items-center justify-between p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Cloud className="w-4 h-4 text-blue-600" />
                        <span className="text-xs">날씨/환경</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </button>
                    <button
                      onClick={() => scrollToSection('traffic-section')}
                      className="w-full flex items-center justify-between p-2 bg-orange-50 rounded hover:bg-orange-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-orange-600" />
                        <span className="text-xs">교통/경제</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </button>
                    <button
                      onClick={() => scrollToSection('additional-info')}
                      className="w-full flex items-center justify-between p-2 bg-purple-50 rounded hover:bg-purple-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-purple-600" />
                        <span className="text-xs">재난/안전</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm mb-3">이번 주 장보기</h4>
                  <div className="space-y-2">
                    {['양배추(절임배추)', '돼지고기(삼겹살)', '쌀', '사과'].map(
                      (product, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleProductClick(product)}
                          className="w-full flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
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
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-700 mb-1">
                        강남구청 민원실 운영시간 변경
                      </p>
                      <p className="text-xs text-gray-500">4/15부터 적용</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-700 mb-1">
                        재활용 분리수거 요일 안내
                      </p>
                      <p className="text-xs text-gray-500">매주 수/금요일</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === '맞춤정책' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24 space-y-4">
                <div>
                  <h3 className="text-sm mb-3">생활 뉴스 안내</h3>
                  <div className="space-y-2">
                    <div className="pb-2 border-b border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">지역</p>
                      <p className="text-sm">강남구</p>
                    </div>
                    <div className="pb-2 border-b border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">나이</p>
                      <p className="text-sm">만 19세 ~ 39세</p>
                    </div>
                    <div className="pb-2 border-b border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">자녀</p>
                      <p className="text-sm">없음</p>
                    </div>
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
                    <button
                      onClick={() => handleEventClick('서울시 청년정책 설명회')}
                      className="w-full flex items-center justify-between p-2 bg-purple-50 rounded hover:bg-purple-100 transition-colors cursor-pointer"
                    >
                      <span className="text-xs text-gray-700">
                        서울시 청년정책 설명회
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleEventClick('온라인 정책 상담')}
                      className="w-full flex items-center justify-between p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      <span className="text-xs text-gray-700">
                        온라인 정책 상담
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Weather Detail Modal */}
      {showWeatherDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowWeatherDetail(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl mb-2">날씨 · 환경 상세 정보</h2>
                <p className="text-sm text-gray-500">
                  서울시 {userDistrict || '강남구'} 기준 - 2026년 4월 11일 오전
                  10:02
                </p>
              </div>

              <div className="space-y-6">
                {/* Current Weather Detailed */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <h3 className="text-lg mb-4">현재 날씨</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/50 rounded p-4">
                      <p className="text-xs text-gray-600 mb-1">온도</p>
                      <p className="text-2xl">14°C</p>
                    </div>
                    <div className="bg-white/50 rounded p-4">
                      <p className="text-xs text-gray-600 mb-1">체감온도</p>
                      <p className="text-2xl">12°C</p>
                    </div>
                    <div className="bg-white/50 rounded p-4">
                      <p className="text-xs text-gray-600 mb-1">습도</p>
                      <p className="text-2xl">62%</p>
                    </div>
                    <div className="bg-white/50 rounded p-4">
                      <p className="text-xs text-gray-600 mb-1">강수확률</p>
                      <p className="text-2xl">30%</p>
                    </div>
                    <div className="bg-white/50 rounded p-4">
                      <p className="text-xs text-gray-600 mb-1">바람</p>
                      <p className="text-sm">남서풍 3m/s</p>
                    </div>
                    <div className="bg-white/50 rounded p-4">
                      <p className="text-xs text-gray-600 mb-1">기압</p>
                      <p className="text-sm">1013hPa</p>
                    </div>
                    <div className="bg-white/50 rounded p-4">
                      <p className="text-xs text-gray-600 mb-1">가시거리</p>
                      <p className="text-sm">10km</p>
                    </div>
                    <div className="bg-white/50 rounded p-4">
                      <p className="text-xs text-gray-600 mb-1">자외선지수</p>
                      <p className="text-sm">보통 (5)</p>
                    </div>
                  </div>
                </div>

                {/* Weekly Forecast */}
                <div>
                  <h3 className="text-lg mb-4">주간 예보</h3>
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
                    {[
                      {
                        day: '오늘',
                        weather: '흐림',
                        high: 16,
                        low: 12,
                        rain: 30
                      },
                      { day: '일', weather: '비', high: 14, low: 10, rain: 80 },
                      {
                        day: '월',
                        weather: '흐림',
                        high: 15,
                        low: 11,
                        rain: 40
                      },
                      {
                        day: '화',
                        weather: '맑음',
                        high: 18,
                        low: 13,
                        rain: 10
                      },
                      {
                        day: '수',
                        weather: '맑음',
                        high: 19,
                        low: 14,
                        rain: 0
                      },
                      {
                        day: '목',
                        weather: '구름',
                        high: 17,
                        low: 13,
                        rain: 20
                      },
                      { day: '금', weather: '맑음', high: 20, low: 15, rain: 0 }
                    ].map((forecast, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-lg p-4 text-center"
                      >
                        <p className="text-sm font-medium mb-2">
                          {forecast.day}
                        </p>
                        <CloudRain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-600 mb-2">
                          {forecast.weather}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs">
                          <span className="text-red-600">{forecast.high}°</span>
                          <span className="text-blue-600">{forecast.low}°</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {forecast.rain}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hourly Forecast - Today to Tomorrow */}
                <div>
                  <h3 className="text-lg mb-4">시간대별 날씨 (오늘 ~ 내일)</h3>
                  <div className="overflow-x-auto pb-2">
                    <div className="flex gap-3 min-w-max">
                      {[
                        // 오늘
                        {
                          time: '11:00',
                          temp: 14,
                          weather: '흐림',
                          rain: 30,
                          icon: Cloud
                        },
                        {
                          time: '12:00',
                          temp: 15,
                          weather: '흐림',
                          rain: 30,
                          icon: Cloud
                        },
                        {
                          time: '13:00',
                          temp: 16,
                          weather: '흐림',
                          rain: 40,
                          icon: Cloud
                        },
                        {
                          time: '14:00',
                          temp: 16,
                          weather: '흐림',
                          rain: 40,
                          icon: Cloud
                        },
                        {
                          time: '15:00',
                          temp: 15,
                          weather: '비',
                          rain: 70,
                          icon: CloudRain
                        },
                        {
                          time: '16:00',
                          temp: 15,
                          weather: '비',
                          rain: 80,
                          icon: CloudRain
                        },
                        {
                          time: '17:00',
                          temp: 14,
                          weather: '비',
                          rain: 80,
                          icon: CloudRain
                        },
                        {
                          time: '18:00',
                          temp: 14,
                          weather: '비',
                          rain: 60,
                          icon: CloudRain
                        },
                        {
                          time: '19:00',
                          temp: 13,
                          weather: '흐림',
                          rain: 40,
                          icon: Cloud
                        },
                        {
                          time: '20:00',
                          temp: 13,
                          weather: '흐림',
                          rain: 30,
                          icon: Cloud
                        },
                        {
                          time: '21:00',
                          temp: 12,
                          weather: '흐림',
                          rain: 20,
                          icon: Cloud
                        },
                        {
                          time: '22:00',
                          temp: 12,
                          weather: '흐림',
                          rain: 20,
                          icon: Cloud
                        },
                        {
                          time: '23:00',
                          temp: 12,
                          weather: '흐림',
                          rain: 10,
                          icon: Cloud
                        },
                        // 내일
                        {
                          time: '00:00',
                          temp: 11,
                          weather: '흐림',
                          rain: 10,
                          icon: Cloud
                        },
                        {
                          time: '01:00',
                          temp: 11,
                          weather: '흐림',
                          rain: 20,
                          icon: Cloud
                        },
                        {
                          time: '02:00',
                          temp: 11,
                          weather: '비',
                          rain: 60,
                          icon: CloudRain
                        },
                        {
                          time: '03:00',
                          temp: 10,
                          weather: '비',
                          rain: 80,
                          icon: CloudRain
                        },
                        {
                          time: '04:00',
                          temp: 10,
                          weather: '비',
                          rain: 80,
                          icon: CloudRain
                        },
                        {
                          time: '05:00',
                          temp: 10,
                          weather: '비',
                          rain: 70,
                          icon: CloudRain
                        },
                        {
                          time: '06:00',
                          temp: 10,
                          weather: '비',
                          rain: 60,
                          icon: CloudRain
                        },
                        {
                          time: '07:00',
                          temp: 11,
                          weather: '흐림',
                          rain: 50,
                          icon: Cloud
                        },
                        {
                          time: '08:00',
                          temp: 11,
                          weather: '흐림',
                          rain: 40,
                          icon: Cloud
                        },
                        {
                          time: '09:00',
                          temp: 12,
                          weather: '흐림',
                          rain: 30,
                          icon: Cloud
                        },
                        {
                          time: '10:00',
                          temp: 13,
                          weather: '흐림',
                          rain: 30,
                          icon: Cloud
                        }
                      ].map((hour, idx) => {
                        const HourIcon = hour.icon;
                        return (
                          <div
                            key={idx}
                            className="bg-gray-50 rounded-lg p-4 text-center min-w-[80px]"
                          >
                            <p className="text-sm font-medium mb-2">
                              {hour.time}
                            </p>
                            <HourIcon
                              className={`w-6 h-6 mx-auto mb-2 ${hour.icon === CloudRain ? 'text-blue-500' : 'text-gray-400'}`}
                            />
                            <p className="text-lg font-semibold mb-1">
                              {hour.temp}°C
                            </p>
                            <p className="text-xs text-gray-600 mb-1">
                              {hour.weather}
                            </p>
                            <p className="text-xs text-blue-500">
                              {hour.rain}%
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Air Quality Detailed */}
                <div>
                  <h3 className="text-lg mb-4">대기질 상세 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Wind className="w-5 h-5 text-green-600" />
                          <h4 className="font-medium">미세먼지 (PM10)</h4>
                        </div>
                        <span className="text-2xl text-green-700">32</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">㎍/m³ - 좋음</p>
                      <div className="bg-white rounded p-2 text-xs">
                        <p className="text-gray-600">
                          0~30: 좋음 | 31~80: 보통 | 81~150: 나쁨
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Wind className="w-5 h-5 text-green-600" />
                          <h4 className="font-medium">초미세먼지 (PM2.5)</h4>
                        </div>
                        <span className="text-2xl text-green-700">18</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">㎍/m³ - 좋음</p>
                      <div className="bg-white rounded p-2 text-xs">
                        <p className="text-gray-600">
                          0~15: 좋음 | 16~35: 보통 | 36~75: 나쁨
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-5 h-5 text-blue-600" />
                          <h4 className="font-medium">오존 (O₃)</h4>
                        </div>
                        <span className="text-2xl text-blue-700">0.045</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">ppm - 보통</p>
                      <div className="bg-white rounded p-2 text-xs">
                        <p className="text-gray-600">
                          0~0.03: 좋음 | 0.031~0.09: 보통 | 0.091~0.15: 나쁨
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Wind className="w-5 h-5 text-green-600" />
                          <h4 className="font-medium">통합대기지수</h4>
                        </div>
                        <span className="text-2xl text-green-700">45</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">좋음</p>
                      <div className="bg-white rounded p-2 text-xs">
                        <p className="text-gray-600">
                          외출하시기 좋은 날씨입니다
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 rounded-lg p-5">
                  <h4 className="font-medium mb-3">오늘의 건강 권장사항</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>대기질이 좋아 야외활동하기 좋은 날씨입니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>오후에 비 소식이 있으니 우산을 준비하세요.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>
                        자외선 지수가 보통이니 외출 시 자외선 차단에 유의하세요.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 교통/경제 상세 모달 */}
      {showTrafficDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowTrafficDetail(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl mb-2">교통 · 경제 상세 정보</h2>
                <p className="text-sm text-gray-500">
                  실시간 업데이트 - 2026년 4월 11일 오전 10:02
                </p>
              </div>

              <div className="space-y-6">
                {/* Detailed Traffic */}
                <div>
                  <h3 className="text-lg mb-4">서울시 주요 도로 소통 상황</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        road: '강남대로',
                        section: '강남역 ~ 역삼역',
                        status: '원활',
                        color: 'green',
                        speed: 45
                      },
                      {
                        road: '테헤란로',
                        section: '삼성역 ~ 선릉역',
                        status: '지체',
                        color: 'yellow',
                        speed: 22
                      },
                      {
                        road: '올림픽대로',
                        section: '잠실대교 ~ 천호대교',
                        status: '원활',
                        color: 'green',
                        speed: 68
                      },
                      {
                        road: '강변북로',
                        section: '성수대교 ~ 동부간선',
                        status: '서행',
                        color: 'orange',
                        speed: 30
                      },
                      {
                        road: '경부고속도로',
                        section: '양재IC ~ 판교IC',
                        status: '정체',
                        color: 'red',
                        speed: 15
                      },
                      {
                        road: '내부순환로',
                        section: '성산대교 ~ 양화대교',
                        status: '원활',
                        color: 'green',
                        speed: 52
                      }
                    ].map((traffic, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{traffic.road}</h4>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              traffic.color === 'green'
                                ? 'bg-green-100 text-green-700'
                                : traffic.color === 'yellow'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : traffic.color === 'orange'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {traffic.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {traffic.section}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Car className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">
                            평균 {traffic.speed}km/h
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subway Status */}
                <div>
                  <h3 className="text-lg mb-4">지하철 운행 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        line: '2호선',
                        status: '정상운행',
                        delay: 0,
                        color: 'green'
                      },
                      {
                        line: '3호선',
                        status: '정상운행',
                        delay: 0,
                        color: 'orange'
                      },
                      {
                        line: '분당선',
                        status: '5분 지연',
                        delay: 5,
                        color: 'yellow'
                      }
                    ].map((subway, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{subway.line}</h4>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              subway.color === 'green'
                                ? 'bg-green-100 text-green-700'
                                : subway.color === 'orange'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {subway.status}
                          </span>
                        </div>
                        {subway.delay > 0 && (
                          <p className="text-sm text-gray-600">
                            평균 {subway.delay}분 지연
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exchange Rates Detailed */}
                <div>
                  <h3 className="text-lg mb-4">환율 정보 상세</h3>
                  <div className="space-y-3">
                    {[
                      {
                        currency: '미국 USD',
                        buy: 1320.5,
                        sell: 1325.3,
                        change: 2.3,
                        trend: 'up'
                      },
                      {
                        currency: '일본 JPY (100엔)',
                        buy: 892.4,
                        sell: 895.2,
                        change: -1.2,
                        trend: 'down'
                      },
                      {
                        currency: '유럽연합 EUR',
                        buy: 1425.8,
                        sell: 1430.5,
                        change: 3.5,
                        trend: 'up'
                      },
                      {
                        currency: '중국 CNY',
                        buy: 182.35,
                        sell: 184.2,
                        change: 0.85,
                        trend: 'up'
                      },
                      {
                        currency: '영국 GBP',
                        buy: 1685.9,
                        sell: 1690.4,
                        change: -2.1,
                        trend: 'down'
                      }
                    ].map((exchange, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium mb-1">
                              {exchange.currency}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>살 때: {exchange.buy.toFixed(2)}원</span>
                              <span>팔 때: {exchange.sell.toFixed(2)}원</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`text-lg ${exchange.trend === 'up' ? 'text-red-600' : 'text-blue-600'}`}
                            >
                              {exchange.trend === 'up' ? '▲' : '▼'}{' '}
                              {Math.abs(exchange.change).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock Market */}
                <div>
                  <h3 className="text-lg mb-4">주요 지수</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: '코스피',
                        value: 2645.32,
                        change: 15.43,
                        percent: 0.59
                      },
                      {
                        name: '코스닥',
                        value: 845.21,
                        change: -3.21,
                        percent: -0.38
                      },
                      {
                        name: '다우존스',
                        value: 38452.1,
                        change: 125.4,
                        percent: 0.33
                      }
                    ].map((stock, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">{stock.name}</h4>
                        <p className="text-2xl mb-1">
                          {stock.value.toLocaleString()}
                        </p>
                        <p
                          className={`text-sm ${stock.change >= 0 ? 'text-red-600' : 'text-blue-600'}`}
                        >
                          {stock.change >= 0 ? '▲' : '▼'}{' '}
                          {Math.abs(stock.change).toFixed(2)} (
                          {stock.percent >= 0 ? '+' : ''}
                          {stock.percent}%)
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Detail Modal */}
      {showNewsDetail && selectedNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowNewsDetail(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {(() => {
              const news = newsletters.find((n) => n.id === selectedNews);
              if (!news) return null;

              return (
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded">
                        {news.category}
                      </span>
                      <span className="text-sm text-gray-500">{news.date}</span>
                      <span className="text-sm text-gray-400">
                        조회 {news.views}
                      </span>
                    </div>
                    <h2 className="text-3xl mb-4">{news.title}</h2>
                    <div className="flex items-center gap-2 flex-wrap">
                      {news.tags.map((tag, idx) => {
                        const tagInfo = allTags.find((t) => t.name === tag);
                        return (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded text-xs ${
                              tagInfo?.color === 'orange'
                                ? 'bg-orange-100 text-orange-700'
                                : tagInfo?.color === 'green'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            #{tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Featured Image */}
                  {news.image && (
                    <div className="mb-6">
                      <ImageWithFallback
                        src={news.image}
                        alt={news.title}
                        className="w-full h-96 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="prose max-w-none mb-6">
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      {news.excerpt}
                    </p>

                    <div className="space-y-4 text-gray-700">
                      <p className="leading-relaxed">
                        서울시는 이번 정책을 통해 시민들의 삶의 질을
                        향상시키고자 합니다. 관련 부서와의 협의를 통해 체계적인
                        계획을 수립하였으며, 단계적으로 추진될 예정입니다.
                      </p>

                      <h3 className="text-xl mt-6 mb-3">주요 내용</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>시민 참여형 정책 추진으로 실효성 제고</li>
                        <li>관련 예산 확보 및 효율적 집행 계획 수립</li>
                        <li>정기적인 모니터링을 통한 정책 효과 분석</li>
                        <li>시민 의견 수렴 창구 운영</li>
                      </ul>

                      <h3 className="text-xl mt-6 mb-3">기대 효과</h3>
                      <p className="leading-relaxed">
                        이번 정책이 시행되면 강남구 주민들의 생활 편의성이 크게
                        향상될 것으로 기대됩니다. 특히 대중교통 이용자와 지역
                        주민들에게 긍정적인 영향을 미칠 것으로 전망됩니다.
                      </p>

                      <div className="bg-blue-50 p-4 rounded-lg mt-6">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-blue-600" />
                          참고 사항
                        </h4>
                        <p className="text-sm text-gray-700">
                          자세한 내용은 강남구청 홈페이지를 참조하시거나, 구청
                          민원실(02-3423-5000)로 문의하시기 바랍니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Related Info */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg mb-4">관련 정보</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2">문의처</h4>
                        <p className="text-sm text-gray-700">강남구청 민원실</p>
                        <p className="text-sm text-gray-700">☎ 02-3423-5000</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2">참고 링크</h4>
                        <a
                          href="#"
                          className="text-sm text-blue-600 hover:underline block"
                        >
                          강남구청 공식 홈페이지
                        </a>
                        <a
                          href="#"
                          className="text-sm text-blue-600 hover:underline block"
                        >
                          온라인 민원 신청
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setShowNewsDetail(false)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      닫기
                    </button>
                    <button className="px-6 bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors">
                      공유하기
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 이벤트 상세 모달 */}
      {showEventDetail && selectedEvent && eventDetails[selectedEvent] && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowEventDetail(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl mb-3">
                  {eventDetails[selectedEvent].title}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{eventDetails[selectedEvent].date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{eventDetails[selectedEvent].time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span>{eventDetails[selectedEvent].location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Location Detail */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-2">상세 장소</h3>
                  <p className="text-sm text-gray-700">
                    {eventDetails[selectedEvent].locationDetail}
                  </p>
                </div>

                {/* Registration Status */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">신청 현황</h3>
                    <span className="text-sm text-gray-600">
                      {eventDetails[selectedEvent].registered} /{' '}
                      {eventDetails[selectedEvent].capacity}명
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(eventDetails[selectedEvent].registered / eventDetails[selectedEvent].capacity) * 100}%`
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {eventDetails[selectedEvent].capacity -
                      eventDetails[selectedEvent].registered}
                    명 남음
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg mb-3">행사 소개</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {eventDetails[selectedEvent].description}
                  </p>
                </div>

                {/* Program */}
                <div>
                  <h3 className="text-lg mb-3">프로그램 일정</h3>
                  <div className="space-y-2">
                    {eventDetails[selectedEvent].program.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-3 bg-gray-50 rounded"
                      >
                        <span className="text-sm font-medium text-blue-600 min-w-[140px]">
                          {item.time}
                        </span>
                        <span className="text-sm text-gray-700">
                          {item.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg mb-3">참여 혜택</h3>
                  <ul className="space-y-2">
                    {eventDetails[selectedEvent].benefits.map(
                      (benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span className="text-green-600">✓</span>
                          <span>{benefit}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg mb-3">참여 자격</h3>
                  <ul className="space-y-2">
                    {eventDetails[selectedEvent].requirements.map(
                      (req, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span className="text-blue-600">•</span>
                          <span>{req}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Contact */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-medium">문의처</h3>
                  </div>
                  <p className="text-sm text-gray-700">
                    {eventDetails[selectedEvent].contact}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors">
                  신청하기
                </button>
                <button
                  onClick={() => setShowEventDetail(false)}
                  className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 물가 정보 상세 모달 */}
      {showPriceDetail && selectedProduct && productPrices[selectedProduct] && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPriceDetail(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {productPrices[selectedProduct].category}
                  </span>
                </div>
                <h2 className="text-2xl mb-2">
                  {productPrices[selectedProduct].name}
                </h2>
                <p className="text-sm text-gray-500">
                  강남구 기준 평균 시세 - 2026년 4월 11일
                </p>
              </div>

              <div className="space-y-6">
                {/* Current Price */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">현재 평균가</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl">
                          {productPrices[
                            selectedProduct
                          ].currentPrice.toLocaleString()}
                          원
                        </span>
                        <span className="text-gray-600">
                          / {productPrices[selectedProduct].unit}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">전주 대비</p>
                      <p
                        className={`text-2xl ${
                          productPrices[selectedProduct].trend === 'up'
                            ? 'text-red-600'
                            : 'text-blue-600'
                        }`}
                      >
                        {productPrices[selectedProduct].trend === 'up'
                          ? '▲'
                          : '▼'}
                        {Math.abs(productPrices[selectedProduct].change)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Trend Graph */}
                <div>
                  <h3 className="text-lg mb-4">최근 5주 가격 추이</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-end justify-between h-40 gap-3">
                      {productPrices[selectedProduct].graph.map(
                        (point, idx) => {
                          const maxPrice = Math.max(
                            ...productPrices[selectedProduct].graph.map(
                              (p) => p.price
                            )
                          );
                          const height = (point.price / maxPrice) * 100;
                          return (
                            <div
                              key={idx}
                              className="flex-1 flex flex-col items-center gap-2"
                            >
                              <div className="text-xs text-gray-600">
                                {point.price.toLocaleString()}
                              </div>
                              <div
                                className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                                style={{
                                  height: `${height}%`,
                                  minHeight: '20px'
                                }}
                              />
                              <div className="text-xs text-gray-500">
                                {point.date}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>

                {/* Store Prices */}
                <div>
                  <h3 className="text-lg mb-4">매장별 가격 비교</h3>
                  <div className="space-y-3">
                    {productPrices[selectedProduct].stores
                      .sort((a, b) => a.price - b.price)
                      .map((store, idx) => {
                        const isLowest = idx === 0;
                        return (
                          <div
                            key={idx}
                            className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                              isLowest
                                ? 'bg-green-50 border-green-300'
                                : 'bg-white border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{store.name}</h4>
                                  {isLowest && (
                                    <span className="text-xs px-2 py-0.5 bg-green-600 text-white rounded">
                                      최저가
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">
                                  {store.location}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-medium">
                                {store.price.toLocaleString()}원
                              </p>
                              {!isLowest && (
                                <p className="text-xs text-gray-500">
                                  +
                                  {(
                                    store.price -
                                    productPrices[selectedProduct].stores[0]
                                      .price
                                  ).toLocaleString()}
                                  원
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 rounded-lg p-5">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    구매 팁
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {productPrices[selectedProduct].trend === 'down' ? (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>
                            현재 가격이 하락 추세입니다. 지금이 구매 적기입니다.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>
                            주말보다 평일 오전에 더 저렴하게 구매할 수 있습니다.
                          </span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>
                            가격이 상승 추세입니다. 필요하다면 빨리 구매하는
                            것이 좋습니다.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>
                            대형마트 세일 기간을 활용하면 더 저렴하게 구매할 수
                            있습니다.
                          </span>
                        </li>
                      </>
                    )}
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>
                        농협하나로마트에서 가장 저렴하게 구매 가능합니다.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 관심 태그 관리 모달 */}
      {showTagManagement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative">
            <button
              onClick={() => setShowTagManagement(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl mb-2">관심 태그 관리</h2>
                <p className="text-sm text-gray-500">
                  관심있는 태그를 선택하면 맞춤 뉴스를 추천해드립니다
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">
                    선택된 태그 ({selectedTags.length}개)
                  </h3>
                  {selectedTags.length > 0 && (
                    <button
                      onClick={() => setSelectedTags([])}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      모두 제거
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 rounded-lg p-4 min-h-[60px] flex flex-wrap gap-2">
                  {selectedTags.length > 0 ? (
                    selectedTags.map((tagName, idx) => {
                      const tag = allTags.find((t) => t.name === tagName);
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleTag(tagName)}
                          className={`px-3 py-1.5 rounded text-xs flex items-center gap-1 transition-all ${
                            tag?.color === 'orange'
                              ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                              : tag?.color === 'green'
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : tag?.color === 'purple'
                                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                  : tag?.color === 'red'
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          #{tagName}
                          <X className="w-3 h-3" />
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-400">
                      선택된 태그가 없습니다
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">전체 태그</h3>
                <div className="grid grid-cols-3 gap-2">
                  {allTags.map((tag, idx) => {
                    const isSelected = selectedTags.includes(tag.name);
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleTag(tag.name)}
                        className={`px-4 py-2.5 rounded text-sm transition-all border-2 ${
                          isSelected
                            ? tag.color === 'orange'
                              ? 'bg-orange-100 text-orange-700 border-orange-300'
                              : tag.color === 'green'
                                ? 'bg-green-100 text-green-700 border-green-300'
                                : tag.color === 'purple'
                                  ? 'bg-purple-100 text-purple-700 border-purple-300'
                                  : tag.color === 'red'
                                    ? 'bg-red-100 text-red-700 border-red-300'
                                    : 'bg-blue-100 text-blue-700 border-blue-300'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        #{tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowTagManagement(false)}
                  className="flex-1 bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors"
                >
                  저장
                </button>
                <button
                  onClick={() => setShowTagManagement(false)}
                  className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 정책 상세 모달 */}
      {showPolicyDetail && selectedPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPolicyDetail(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {(() => {
              const policy = policies.find((p) => p.id === selectedPolicy);
              if (!policy) return null;

              return (
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          policy.statusColor === 'red'
                            ? 'bg-red-100 text-red-700'
                            : policy.statusColor === 'orange'
                              ? 'bg-orange-100 text-orange-700'
                              : policy.statusColor === 'green'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {policy.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {policy.category}
                      </span>
                      <span className="text-sm text-gray-400">
                        조회 {policy.views.toLocaleString()}
                      </span>
                    </div>
                    <h2 className="text-3xl mb-3">{policy.title}</h2>
                    <p className="text-lg text-gray-600">
                      {policy.description}
                    </p>
                  </div>

                  {/* Key Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium">지원 기간</h4>
                      </div>
                      <p className="text-gray-700">{policy.period}</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-5 border-l-4 border-orange-500">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        <h4 className="font-medium">마감 정보</h4>
                      </div>
                      <p className="text-gray-700">{policy.deadline}</p>
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className="space-y-6 mb-6">
                    <div>
                      <h3 className="text-xl mb-3">지원 대상</h3>
                      <div className="bg-gray-50 rounded-lg p-5">
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>서울시 거주 청년 (만 19세 ~ 39세)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>중위소득 150% 이하 가구</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>무주택 세대주 또는 세대원</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl mb-3">지원 내용</h3>
                      <div className="bg-gray-50 rounded-lg p-5">
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>월 최대 20만원 월세 지원 (최대 12개월)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>
                              보증금 5천만원 이하, 월세 60만원 이하 주택
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>임대차 계약서상 임차인 명의 확인 필요</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl mb-3">신청 방법</h3>
                      <div className="bg-gray-50 rounded-lg p-5">
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                              1
                            </span>
                            <div>
                              <p className="font-medium">
                                서울시 복지포털 접속
                              </p>
                              <p className="text-sm text-gray-600">
                                복지.seoul.go.kr 에서 온라인 신청
                              </p>
                            </div>
                          </li>
                          <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                              2
                            </span>
                            <div>
                              <p className="font-medium">필수 서류 제출</p>
                              <p className="text-sm text-gray-600">
                                신분증, 임대차계약서, 소득증빙서류 등
                              </p>
                            </div>
                          </li>
                          <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                              3
                            </span>
                            <div>
                              <p className="font-medium">자격 심사</p>
                              <p className="text-sm text-gray-600">
                                제출 후 약 2주 소요
                              </p>
                            </div>
                          </li>
                          <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                              4
                            </span>
                            <div>
                              <p className="font-medium">지원금 지급</p>
                              <p className="text-sm text-gray-600">
                                승인 후 익월부터 매월 지급
                              </p>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl mb-3">유의 사항</h3>
                      <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-200">
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                            <span>
                              중복 지원 불가: 타 월세 지원 정책과 중복 수혜 불가
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                            <span>기간 내 신청: 마감일 이후 신청 불가</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                            <span>허위 신청 시 법적 책임 및 환수 조치</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <h3 className="text-lg mb-4">문의 및 상담</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          온라인 문의
                        </h4>
                        <p className="text-sm text-gray-700">
                          복지포털 1:1 문의
                        </p>
                        <a
                          href="#"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          복지.seoul.go.kr
                        </a>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          전화 상담
                        </h4>
                        <p className="text-sm text-gray-700">
                          서울시 청년정책과
                        </p>
                        <p className="text-sm text-blue-600">☎ 02-120</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          방문 상담
                        </h4>
                        <p className="text-sm text-gray-700">
                          평일 09:00-18:00
                        </p>
                        <p className="text-sm text-gray-600">
                          점심시간 12:00-13:00
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPolicyDetail(false)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      닫기
                    </button>
                    <button className="px-8 bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors">
                      신청하기
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      {/* 설정 모달 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl mb-2">개인 정보 설정</h2>
                <p className="text-sm text-gray-500">
                  맞춤형 뉴스레터, 생활정보, 정책을 제공하기 위한 정보를
                  입력해주세요.
                </p>
              </div>

              <div className="space-y-6">
                {/* 나이 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    나이
                  </label>
                  <input
                    type="number"
                    value={userAge}
                    onChange={(e) => setUserAge(e.target.value)}
                    placeholder="예: 28"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* 거주 지역 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    거주 지역 (서울시)
                  </label>
                  <select
                    value={userDistrict}
                    onChange={(e) => setUserDistrict(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="강남구">강남구</option>
                    <option value="강동구">강동구</option>
                    <option value="강북구">강북구</option>
                    <option value="강서구">강서구</option>
                    <option value="관악구">관악구</option>
                    <option value="광진구">광진구</option>
                    <option value="구로구">구로구</option>
                    <option value="금천구">금천구</option>
                    <option value="노원구">노원구</option>
                    <option value="도봉구">도봉구</option>
                    <option value="동대문구">동대문구</option>
                    <option value="동작구">동작구</option>
                    <option value="마포구">마포구</option>
                    <option value="서대문구">서대문구</option>
                    <option value="서초구">서초구</option>
                    <option value="성동구">성동구</option>
                    <option value="성북구">성북구</option>
                    <option value="송파구">송파구</option>
                    <option value="양천구">양천구</option>
                    <option value="영등포구">영등포구</option>
                    <option value="용산구">용산구</option>
                    <option value="은평구">은평구</option>
                    <option value="종로구">종로구</option>
                    <option value="중구">중구</option>
                    <option value="중랑구">중랑구</option>
                  </select>
                </div>

                {/* 자녀 유무 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    자녀 유무
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        checked={!hasChildren}
                        onChange={() => {
                          setHasChildren(false);
                          setChildrenCount('');
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">없음</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        checked={hasChildren}
                        onChange={() => setHasChildren(true)}
                        className="mr-2"
                      />
                      <span className="text-sm">있음</span>
                    </label>
                  </div>
                </div>

                {/* 자녀 수 (자녀가 있는 경우) */}
                {hasChildren && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      자녀 수
                    </label>
                    <input
                      type="number"
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(e.target.value)}
                      placeholder="예: 2"
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {/* 취업 상태 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    취업 상태
                  </label>
                  <select
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="employed">재직 중</option>
                    <option value="job-seeking">구직 중</option>
                    <option value="student">학생</option>
                    <option value="self-employed">자영업</option>
                    <option value="etc">기타</option>
                  </select>
                </div>

                {/* 관심 분야 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    관심 분야 (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'housing', label: '주거/부동산' },
                      { value: 'employment', label: '일자리/취업' },
                      { value: 'education', label: '교육/육아' },
                      { value: 'culture', label: '문화/행사' },
                      { value: 'traffic', label: '교통' },
                      { value: 'welfare', label: '복지/건강' },
                      { value: 'environment', label: '환경' },
                      { value: 'safety', label: '안전/재난' }
                    ].map((interest) => (
                      <label
                        key={interest.value}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={interests.includes(interest.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setInterests([...interests, interest.value]);
                            } else {
                              setInterests(
                                interests.filter((i) => i !== interest.value)
                              );
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{interest.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 안내 메시지 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>개인정보 보호 안내:</strong> 입력하신 정보는 맞춤형
                    콘텐츠 제공을 위해서만 사용되며, 외부에 공개되거나 제3자에게
                    제공되지 않습니다.
                  </p>
                </div>
              </div>

              {/* 버튼 */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 북마크 모달 */}
      {showBookmarks && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowBookmarks(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-600 fill-current" />
                  <h2 className="text-2xl">북마크</h2>
                </div>
                <p className="text-sm text-gray-500">
                  저장한 뉴스와 정책을 한눈에 확인하세요
                </p>
              </div>

              <div className="space-y-6">
                {/* 북마크된 뉴스 */}
                <div>
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    뉴스레터
                    <span className="text-sm text-gray-500">
                      ({bookmarkedNews.length}개)
                    </span>
                  </h3>
                  {bookmarkedNews.length > 0 ? (
                    <div className="space-y-3">
                      {bookmarkedNews.map((newsId) => {
                        const news = newsletters.find((n) => n.id === newsId);
                        if (!news) return null;
                        return (
                          <article
                            key={news.id}
                            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => {
                              handleNewsClick(news.id);
                              setShowBookmarks(false);
                            }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  {news.category}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">
                                  {news.date}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleNewsBookmark(news.id);
                                }}
                                className="text-yellow-600 hover:text-gray-400 transition-colors"
                                title="북마크 해제"
                              >
                                <Star className="w-4 h-4 fill-current" />
                              </button>
                            </div>
                            <h4 className="font-medium mb-1">{news.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {news.excerpt}
                            </p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              {news.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2 py-0.5 rounded text-xs ${
                                    allTags.find((t) => t.name === tag)
                                      ?.color === 'orange'
                                      ? 'bg-orange-100 text-orange-700'
                                      : allTags.find((t) => t.name === tag)
                                            ?.color === 'green'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-100 text-blue-700'
                                  }`}
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <p className="text-gray-500">저장된 뉴스가 없습니다</p>
                      <p className="text-sm text-gray-400 mt-1">
                        뉴스 카드의 별 아이콘을 클릭하여 저장하세요
                      </p>
                    </div>
                  )}
                </div>

                {/* 북마크된 정책 */}
                <div>
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    맞춤정책
                    <span className="text-sm text-gray-500">
                      ({bookmarkedPolicies.length}개)
                    </span>
                  </h3>
                  {bookmarkedPolicies.length > 0 ? (
                    <div className="space-y-3">
                      {bookmarkedPolicies.map((policyId) => {
                        const policy = policies.find((p) => p.id === policyId);
                        if (!policy) return null;
                        return (
                          <article
                            key={policy.id}
                            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => {
                              handlePolicyClick(policy.id);
                              setShowBookmarks(false);
                            }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2 py-0.5 rounded text-xs ${
                                    policy.statusColor === 'red'
                                      ? 'bg-red-100 text-red-700'
                                      : policy.statusColor === 'orange'
                                        ? 'bg-orange-100 text-orange-700'
                                        : policy.statusColor === 'green'
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-blue-100 text-blue-700'
                                  }`}
                                >
                                  {policy.status}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {policy.category}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePolicyBookmark(policy.id);
                                }}
                                className="text-yellow-600 hover:text-gray-400 transition-colors"
                                title="북마크 해제"
                              >
                                <Star className="w-4 h-4 fill-current" />
                              </button>
                            </div>
                            <h4 className="font-medium mb-1">{policy.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {policy.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {policy.period}
                              </span>
                              <span className="flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {policy.deadline}
                              </span>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <p className="text-gray-500">저장된 정책이 없습니다</p>
                      <p className="text-sm text-gray-400 mt-1">
                        정책 카드의 별 아이콘을 클릭하여 저장하세요
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 버튼 */}
              <div className="mt-6">
                <button
                  onClick={() => setShowBookmarks(false)}
                  className="w-full bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import type {
  EventDetail,
  InterestTag,
  Newsletter,
  Policy,
  ProductPrice
} from '../types/app';

export const allTags: InterestTag[] = [
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

export const newsletters: Newsletter[] = [
  {
    id: 1,
    title: '강남구 당직 요약',
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

export const policies: Policy[] = [
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

export const productPrices: Record<string, ProductPrice> = {
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
    change: 1,
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

export const eventDetails: Record<string, EventDetail> = {
  '서울시 청년정책 설명회': {
    title: '2026 서울시 청년정책 설명회',
    date: '2026년 4월 25일 (금)',
    time: '14:00 - 17:00',
    location: '강남구청 대강당',
    locationDetail: '서울특별시 강남구 학동로 426 (논현동)',
    capacity: 200,
    registered: 156,
    description:
      '2026년 서울시 청년을 위한 다양한 정책을 소개하고, 청년들의 의견을 듣는 소통의 장입니다.',
    program: [
      { time: '14:00 - 14:30', content: '등록 및 접수' },
      { time: '14:30 - 15:00', content: '서울시 청년정책 전반 소개' },
      { time: '15:00 - 15:40', content: '주거/일자리 정책 상세 설명' },
      { time: '16:00 - 16:40', content: '자산형성/복지 정책 상세 설명' }
    ],
    benefits: [
      '모바일 기프티콘 제공',
      '정책 설명 자료집 제공',
      '개별 맞춤 정책 상담'
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
      { time: '1단계', content: '온라인 신청서 작성' },
      { time: '2단계', content: '상담 일정 확정' },
      { time: '3단계', content: 'ZOOM 링크 발송' },
      { time: '4단계', content: '1:1 맞춤 상담 진행' }
    ],
    benefits: [
      '개인 맞춤형 정책 추천',
      '신청 절차 안내 및 지원',
      '상담 내용 요약본 제공'
    ],
    requirements: [
      '만 19세 ~ 39세 서울시 거주 청년',
      '화상회의 가능 환경',
      '사전 온라인 신청 필수'
    ],
    contact: '서울시 청년상담센터 1599-9995'
  }
};

export const interestOptions = [
  { value: 'housing', label: '주거/부동산' },
  { value: 'employment', label: '일자리/취업' },
  { value: 'education', label: '교육/육아' },
  { value: 'culture', label: '문화/행사' },
  { value: 'traffic', label: '교통' },
  { value: 'welfare', label: '복지/건강' },
  { value: 'environment', label: '환경' },
  { value: 'safety', label: '안전/재난' }
];

export const seoulDistricts = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구'
];

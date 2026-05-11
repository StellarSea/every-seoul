import type {
  AppNotification,
  LifeInfo,
  Newsletter,
  Policy
} from '../types/app';

interface NotificationSource {
  lifeInfo: LifeInfo | null;
  newsletters: Newsletter[];
  onOpenNews: (newsId: number) => void;
  onOpenPolicy: (policyId: number) => void;
  onOpenWeather: () => void;
  policies: Policy[];
}

export function buildNotifications({
  lifeInfo,
  newsletters,
  onOpenNews,
  onOpenPolicy,
  onOpenWeather,
  policies
}: NotificationSource): AppNotification[] {
  const items: AppNotification[] = [];
  const urgentPolicy = policies.find((policy) =>
    /마감|오늘|내일|D-|공고 확인/.test(policy.deadline)
  );
  const topPolicy = urgentPolicy || policies[0];

  if (topPolicy) {
    items.push({
      id: `policy-${topPolicy.id}`,
      title: urgentPolicy ? '마감 확인이 필요한 정책' : '새 맞춤 정책 추천',
      description: topPolicy.title,
      tone: urgentPolicy ? 'orange' : 'blue',
      actionLabel: '정책 보기',
      createdAt: topPolicy.deadline,
      onOpen: () => onOpenPolicy(topPolicy.id)
    });
  }

  const unreadNews = newsletters.find(
    (newsletter) => newsletter.isRead === false
  );
  const featuredNews =
    unreadNews || newsletters.find((newsletter) => newsletter.featured);
  if (featuredNews) {
    items.push({
      id: `news-${featuredNews.id}`,
      title: unreadNews ? '읽지 않은 맞춤 브리핑' : '오늘의 주요 브리핑',
      description: featuredNews.title,
      tone: unreadNews ? 'green' : 'blue',
      actionLabel: '브리핑 보기',
      createdAt: featuredNews.date,
      onOpen: () => onOpenNews(featuredNews.id)
    });
  }

  const airWarning = lifeInfo?.airQuality.find((metric) =>
    /나쁨|주의|경보/.test(metric.status)
  );
  if (airWarning) {
    items.push({
      id: `air-${airWarning.label}`,
      title: '생활환경 주의',
      description: `${airWarning.label} ${airWarning.status} (${airWarning.value})`,
      tone: 'red',
      actionLabel: '생활정보 보기',
      createdAt: lifeInfo?.generatedAt || '최신 기준',
      onOpen: onOpenWeather
    });
  }

  return items.slice(0, 5);
}

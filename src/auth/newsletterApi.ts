import type {
  Newsletter,
  NewsletterEvent,
  NewsletterSection
} from '../types/app';
import { requestJson } from './apiClient';

interface BackendNewsletterSummary {
  id: number;
  title: string;
  publish_date: string;
  tags: string[];
  district: string | null;
  summary?: string | null;
}

interface BackendNewsletterDetail extends BackendNewsletterSummary {
  ai_briefing: {
    district?: string;
    summary?: string;
    sections?: NewsletterSection[];
    cultural_events?: NewsletterEvent[];
    weather?: string;
    generated_at?: string;
  };
}

interface NewsletterListResponse {
  total: number;
  items: BackendNewsletterSummary[];
}

interface UserFeedResponse {
  total: number;
  items: {
    newsletter: BackendNewsletterDetail;
    match_score: number;
    is_read: boolean;
  }[];
}

export async function fetchNewsletters(district: string) {
  const search = new URLSearchParams({ limit: '20' });
  if (district) search.set('district', district);

  const data = await requestJson<NewsletterListResponse>(
    `/newsletters/?${search.toString()}`
  );

  return data.items.map((item, index) =>
    mapNewsletterSummary(item, {
      featured: index === 0
    })
  );
}

export async function fetchUserFeed(userId: string) {
  const data = await requestJson<UserFeedResponse>(
    `/users/${userId}/feed?limit=20`
  );

  return data.items.map((item, index) =>
    mapNewsletterDetail(item.newsletter, {
      featured: index === 0,
      isRead: item.is_read,
      relevance: item.match_score
    })
  );
}

export async function refreshUserFeed(userId: string) {
  await requestJson(`/users/${userId}/feed/refresh`, { method: 'POST' });
}

export async function fetchNewsletterDetail(newsletterId: number) {
  const data = await requestJson<BackendNewsletterDetail>(
    `/newsletters/${newsletterId}`
  );
  return mapNewsletterDetail(data);
}

export async function markNewsletterAsRead(
  userId: string,
  newsletterId: number
) {
  await requestJson(`/users/${userId}/feed/${newsletterId}/read`, {
    method: 'PATCH'
  });
}

function mapNewsletterSummary(
  item: BackendNewsletterSummary,
  options: Partial<Newsletter> = {}
): Newsletter {
  return {
    id: item.id,
    title: item.title,
    date: formatDate(item.publish_date),
    category: item.district || '서울시',
    relevance: options.relevance ?? 0,
    excerpt: item.summary || '상세 브리핑을 불러와 확인해 주세요.',
    tags: item.tags || [],
    views: 0,
    featured: options.featured,
    isRead: options.isRead
  };
}

function mapNewsletterDetail(
  item: BackendNewsletterDetail,
  options: Partial<Newsletter> = {}
): Newsletter {
  const briefing = item.ai_briefing || {};

  return {
    ...mapNewsletterSummary(
      {
        ...item,
        district: item.district || briefing.district || null,
        summary: item.summary || briefing.summary
      },
      options
    ),
    excerpt: briefing.summary || item.summary || '요약 내용이 없습니다.',
    sections: briefing.sections || [],
    culturalEvents: briefing.cultural_events || [],
    weather: briefing.weather,
    generatedAt: briefing.generated_at
  };
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

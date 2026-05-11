export type AppTab = '뉴스레터' | '생활정보' | '맞춤정책';

export type TagColor = 'orange' | 'blue' | 'green' | 'purple' | 'red';

export type EmploymentStatus =
  | ''
  | 'employed'
  | 'job-seeking'
  | 'student'
  | 'self-employed'
  | 'etc';

export interface Newsletter {
  id: number;
  title: string;
  date: string;
  category: string;
  relevance: number;
  image?: string;
  tags: string[];
  views: number;
  featured?: boolean;
  excerpt: string;
  isRead?: boolean;
  sourceUrl?: string;
  quickSummary?: string[];
  sections?: NewsletterSection[];
  culturalEvents?: NewsletterEvent[];
  weather?: string;
  generatedAt?: string;
}

export interface NewsletterSection {
  category: string;
  highlights: NewsletterHighlight[];
}

export interface NewsletterHighlight {
  title: string;
  summary: string;
  link?: string;
}

export interface NewsletterEvent {
  title: string;
  place?: string;
  date?: string;
  fee?: string;
}

export interface InterestTag {
  name: string;
  color: TagColor;
}

export interface UserPreferences {
  age: string;
  district: string;
  hasChildren: boolean;
  childrenCount: string;
  employmentStatus: EmploymentStatus;
  interests: string[];
}

export interface PersistedUserPreferences {
  age: number | null;
  districts: string[];
  has_children: boolean;
  children_count: number | null;
  employment_status: EmploymentStatus;
  interests: string[];
}

export interface Policy {
  id: number;
  title: string;
  description: string;
  deadline: string;
  period: string;
  category: string;
  status: string;
  statusColor: TagColor;
  views: number;
  relevance: number;
  supportDetail: string;
  applicationSteps: string[];
  sourceUrl?: string;
  quickSummary?: string[];
  recommendationReason?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  tone: 'blue' | 'green' | 'orange' | 'red';
  actionLabel: string;
  createdAt: string;
  onOpen: () => void;
}

export interface ProductPrice {
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

export interface EventDetail {
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

export interface LifeInfoMetric {
  label: string;
  value: string;
}

export interface AirQualityMetric {
  label: string;
  status: string;
  value: string;
  tone: 'blue' | 'green';
}

export interface LifeInfoRow {
  label: string;
  value: string;
  meta?: string | null;
}

export interface LifeInfoNotice {
  title: string;
  description: string;
}

export interface NearbyFacility {
  name: string;
  category: string;
  address: string;
  description: string;
  sourceUrl?: string;
  latitude?: number;
  longitude?: number;
}

export interface LifeInfo {
  district: string;
  generatedAt: string;
  weatherSummary: string;
  temperature: string;
  feelsLike: string;
  condition: string;
  weatherMetrics: LifeInfoMetric[];
  airQuality: AirQualityMetric[];
  weeklyForecast: string[][];
  roads: LifeInfoRow[];
  transit: LifeInfoRow[];
  economy: LifeInfoRow[];
  safetyAlerts: LifeInfoNotice[];
  productPrices: ProductPrice[];
  notices: LifeInfoNotice[];
  nearbyFacilities: NearbyFacility[];
}

import type { LifeInfo, NearbyFacility, ProductPrice } from '../types/app';
import { requestJson } from './apiClient';
import { getExternalSourceUrl } from '../utils/sourceUrls';

interface BackendMetric {
  label: string;
  value: string;
}

interface BackendAirQualityMetric {
  label: string;
  status: string;
  value: string;
  tone: 'blue' | 'green';
}

interface BackendInfoRow {
  label: string;
  value: string;
  meta?: string | null;
}

interface BackendNotice {
  title: string;
  description: string;
}

interface BackendNearbyFacility {
  name: string;
  category: string;
  address: string;
  description: string;
  source_url?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

interface BackendProductPrice {
  name: string;
  category: string;
  current_price: number;
  previous_price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down';
  stores: { name: string; price: number; location: string }[];
  graph: { date: string; price: number }[];
}

interface BackendLifeInfo {
  district: string;
  generated_at: string;
  weather_summary: string;
  temperature: string;
  feels_like: string;
  condition: string;
  weather_metrics: BackendMetric[];
  air_quality: BackendAirQualityMetric[];
  weekly_forecast: string[][];
  roads: BackendInfoRow[];
  transit: BackendInfoRow[];
  economy: BackendInfoRow[];
  safety_alerts: BackendNotice[];
  product_prices: BackendProductPrice[];
  notices: BackendNotice[];
  nearby_facilities?: BackendNearbyFacility[];
}

export async function fetchLifeInfo(district: string): Promise<LifeInfo> {
  const search = new URLSearchParams({ district });
  const data = await requestJson<BackendLifeInfo>(
    `/life-info/?${search.toString()}`
  );

  return {
    district: data.district,
    generatedAt: data.generated_at,
    weatherSummary: data.weather_summary,
    temperature: data.temperature,
    feelsLike: data.feels_like,
    condition: data.condition,
    weatherMetrics: data.weather_metrics,
    airQuality: data.air_quality,
    weeklyForecast: data.weekly_forecast,
    roads: data.roads,
    transit: data.transit,
    economy: data.economy,
    safetyAlerts: data.safety_alerts,
    productPrices: data.product_prices.map(mapProductPrice),
    notices: data.notices,
    nearbyFacilities: (data.nearby_facilities ?? []).map(mapNearbyFacility)
  };
}

function mapProductPrice(item: BackendProductPrice): ProductPrice {
  return {
    name: item.name,
    category: item.category,
    currentPrice: item.current_price,
    previousPrice: item.previous_price,
    unit: item.unit,
    change: item.change,
    trend: item.trend,
    stores: item.stores,
    graph: item.graph
  };
}

function mapNearbyFacility(item: BackendNearbyFacility): NearbyFacility {
  return {
    name: item.name,
    category: item.category,
    address: item.address,
    description: item.description,
    sourceUrl: getExternalSourceUrl(item.source_url),
    latitude: item.latitude ?? undefined,
    longitude: item.longitude ?? undefined
  };
}

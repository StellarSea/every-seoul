import {
  AlertCircle,
  Calendar,
  Car,
  CloudRain,
  Droplets,
  ExternalLink,
  Home,
  Wind
} from 'lucide-react';
import { ModalShell } from './ModalShell';
import type { EventDetail, LifeInfo, ProductPrice } from '../../types/app';

export function WeatherDetailModal({
  district,
  lifeInfo,
  onClose
}: {
  district: string;
  lifeInfo: LifeInfo | null;
  onClose: () => void;
}) {
  const metrics = lifeInfo?.weatherMetrics ?? [];

  return (
    <ModalShell onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl mb-2">날씨 · 환경 상세 정보</h2>
          <p className="text-sm text-gray-500">
            서울시 {district || '강남구'} 기준
            {lifeInfo ? ` - ${lifeInfo.generatedAt}` : ''}
          </p>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <h3 className="text-lg mb-4">현재 날씨</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ['온도', lifeInfo?.temperature || '-'],
                ['체감온도', lifeInfo?.feelsLike || '-'],
                ...metrics.map((metric) => [metric.label, metric.value])
              ].map(([label, value]) => (
                <div key={label} className="bg-white/50 rounded p-4">
                  <p className="text-xs text-gray-600 mb-1">{label}</p>
                  <p className="text-lg">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg mb-4">주간 예보</h3>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
              {(lifeInfo?.weeklyForecast ?? []).map(
                ([day, weather, high, low, rain]) => (
                  <div
                    key={day}
                    className="bg-gray-50 rounded-lg p-4 text-center"
                  >
                    <p className="text-sm font-medium mb-2">{day}</p>
                    <CloudRain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-2">{weather}</p>
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <span className="text-red-600">{high}</span>
                      <span className="text-blue-600">{low}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{rain}</p>
                  </div>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg mb-4">대기질 상세 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(lifeInfo?.airQuality ?? []).map((metric) => (
                <AirCard
                  key={metric.label}
                  icon={
                    metric.label.includes('오존') ? (
                      <Droplets className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Wind className="w-5 h-5 text-green-600" />
                    )
                  }
                  title={metric.label}
                  value={metric.value}
                  caption={metric.status}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

export function TrafficDetailModal({
  lifeInfo,
  onClose
}: {
  lifeInfo: LifeInfo | null;
  onClose: () => void;
}) {
  return (
    <ModalShell onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl mb-2">교통 · 경제 상세 정보</h2>
          <p className="text-sm text-gray-500">
            {lifeInfo
              ? `실시간 업데이트 - ${lifeInfo.generatedAt}`
              : '교통 · 경제 정보'}
          </p>
        </div>
        <div className="space-y-6">
          <DetailGrid
            title="서울시 주요 도로 소통 상황"
            items={(lifeInfo?.roads ?? []).map((row) => [
              row.label,
              row.value,
              row.meta || ''
            ])}
            icon={<Car className="w-4 h-4 text-gray-400" />}
          />
          <DetailGrid
            title="지하철 운행 정보"
            items={(lifeInfo?.transit ?? []).map((row) => [
              row.label,
              row.value,
              row.meta || ''
            ])}
            icon={<AlertCircle className="w-4 h-4 text-gray-400" />}
          />
          <DetailGrid
            title="주요 지수"
            items={(lifeInfo?.economy ?? []).map((row) => [
              row.label,
              row.value,
              row.meta || ''
            ])}
            icon={<AlertCircle className="w-4 h-4 text-gray-400" />}
          />
        </div>
      </div>
    </ModalShell>
  );
}

export function ProductPriceModal({
  product,
  onClose
}: {
  product: ProductPrice;
  onClose: () => void;
}) {
  const sortedStores = [...product.stores].sort((a, b) => a.price - b.price);
  const maxPrice = Math.max(...product.graph.map((point) => point.price));

  return (
    <ModalShell maxWidth="max-w-3xl" onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
            {product.category}
          </span>
          <h2 className="text-2xl mt-2 mb-2">{product.name}</h2>
          <p className="text-sm text-gray-500">최신 생활정보 기준 평균 시세</p>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">현재 평균가</p>
              <span className="text-4xl">
                {product.currentPrice.toLocaleString()}원
              </span>
              <span className="text-gray-600"> / {product.unit}</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">전주 대비</p>
              <p
                className={`text-2xl ${product.trend === 'up' ? 'text-red-600' : 'text-blue-600'}`}
              >
                {product.trend === 'up' ? '▲' : '▼'}
                {Math.abs(product.change)}%
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg mb-4">최근 5주 가격 추이</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-end justify-between h-40 gap-3">
                {product.graph.map((point) => (
                  <div
                    key={point.date}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div className="text-xs text-gray-600">
                      {point.price.toLocaleString()}
                    </div>
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{
                        height: `${(point.price / maxPrice) * 100}%`,
                        minHeight: '20px'
                      }}
                    />
                    <div className="text-xs text-gray-500">{point.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg mb-4">매장별 가격 비교</h3>
            <div className="space-y-3">
              {sortedStores.map((store, index) => (
                <div
                  key={store.name}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    index === 0
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{store.name}</h4>
                      {index === 0 && (
                        <span className="text-xs px-2 py-0.5 bg-green-600 text-white rounded">
                          최저가
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{store.location}</p>
                  </div>
                  <p className="text-xl font-medium">
                    {store.price.toLocaleString()}원
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

export function EventDetailModal({
  event,
  onClose
}: {
  event: EventDetail;
  onClose: () => void;
}) {
  const hasRegistrationLimit = event.capacity > 0;
  const registrationPercent = hasRegistrationLimit
    ? Math.min((event.registered / event.capacity) * 100, 100)
    : 0;
  const locationDetailUrl = toHttpUrl(event.locationDetail);
  const contactUrl = toHttpUrl(event.contact);
  const programItems = event.program.filter(
    (item) => item.time.trim() || item.content.trim()
  );
  const benefits = event.benefits.filter((item) => item.trim());
  const requirements = event.requirements.filter((item) => item.trim());
  const hasRegistrationStatus = hasRegistrationLimit || event.registered > 0;

  return (
    <ModalShell maxWidth="max-w-3xl" onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl mb-3">{event.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {event.time}
            </span>
            <span className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              {event.location}
            </span>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">
              {locationDetailUrl ? '원문 공지' : '상세 장소'}
            </h3>
            {locationDetailUrl ? (
              <a
                href={locationDetailUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                공지 페이지 열기
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <p className="whitespace-pre-line break-words text-sm text-gray-700">
                {event.locationDetail}
              </p>
            )}
          </div>
          {hasRegistrationStatus && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">신청 현황</h3>
                <span className="text-sm text-gray-600">
                  {hasRegistrationLimit
                    ? `${event.registered} / ${event.capacity}명`
                    : `${event.registered}명 신청`}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${registrationPercent}%`
                  }}
                />
              </div>
            </div>
          )}
          <Section title="소식 내용">
            <p className="whitespace-pre-line break-words text-sm text-gray-700 leading-relaxed">
              {event.description}
            </p>
          </Section>
          {programItems.length > 0 && (
            <Section title="프로그램 일정">
              <div className="space-y-2">
                {programItems.map((item) => (
                  <div
                    key={`${item.time}-${item.content}`}
                    className="flex gap-4 p-3 bg-gray-50 rounded"
                  >
                    <span className="text-sm font-medium text-blue-600 min-w-[120px]">
                      {item.time}
                    </span>
                    <span className="text-sm text-gray-700">
                      {item.content}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}
          {benefits.length > 0 && (
            <BulletList title="참여 혜택" items={benefits} />
          )}
          {requirements.length > 0 && (
            <BulletList title="참여 자격" items={requirements} />
          )}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">문의처</h3>
            {contactUrl ? (
              <a
                href={contactUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                문의 페이지 열기
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <p className="whitespace-pre-line break-words text-sm text-gray-700">
                {event.contact}
              </p>
            )}
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function toHttpUrl(value: string) {
  const trimmedValue = value.trim();
  if (!/^https?:\/\//i.test(trimmedValue)) return null;

  try {
    return new URL(trimmedValue).toString();
  } catch {
    return null;
  }
}

function AirCard({
  caption,
  icon,
  title,
  value
}: {
  caption: string;
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="font-medium">{title}</h4>
        </div>
        <span className="text-2xl text-green-700">{value}</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{caption}</p>
    </div>
  );
}

function DetailGrid({
  icon,
  items,
  title
}: {
  icon: React.ReactNode;
  items: string[][];
  title: string;
}) {
  return (
    <div>
      <h3 className="text-lg mb-4">{title}</h3>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map(([name, description, meta]) => (
            <div
              key={`${name}-${description}`}
              className="bg-gray-50 rounded-lg p-4"
            >
              <h4 className="font-medium mb-2">{name}</h4>
              <p className="text-sm text-gray-600 mb-2">{description}</p>
              <div className="flex items-center gap-2 text-sm">
                {icon}
                <span className="text-gray-700">{meta}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
          현재 표시할 정보가 없습니다.
        </p>
      )}
    </div>
  );
}

function Section({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div>
      <h3 className="text-lg mb-3">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items, title }: { items: string[]; title: string }) {
  return (
    <Section title={title}>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-gray-700"
          >
            <span className="text-blue-600">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

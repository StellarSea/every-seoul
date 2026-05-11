import {
  AlertCircle,
  Building2,
  Car,
  Cloud,
  CloudRain,
  Droplets,
  ExternalLink,
  MapPin,
  Wind
} from 'lucide-react';
import type { LifeInfo } from '../../types/app';
import {
  getFacilityMapPosition,
  getFacilityMapUrl
} from '../../utils/mapLinks';

interface LifeInfoPageProps {
  district: string;
  error: string;
  lifeInfo: LifeInfo | null;
  loading: boolean;
  onOpenTraffic: () => void;
  onOpenWeather: () => void;
}

export function LifeInfoPage({
  district,
  error,
  lifeInfo,
  loading,
  onOpenTraffic,
  onOpenWeather
}: LifeInfoPageProps) {
  const safetyAlerts = lifeInfo ? getVisibleSafetyAlerts(lifeInfo) : [];

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        생활정보를 불러오는 중입니다.
      </div>
    );
  }

  if (error || !lifeInfo) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error || '생활정보를 불러오지 못했습니다.'}
      </div>
    );
  }

  return (
    <>
      <div id="life-info-top">
        <h2 className="text-xl mb-1">오늘의 생활정보</h2>
        <p className="text-sm text-gray-500">{lifeInfo.generatedAt}</p>
      </div>

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
              {lifeInfo.weatherSummary || `서울시 ${district} 기준 날씨 정보`}
            </p>
          </div>
          <button
            onClick={onOpenWeather}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            더보기
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">현재 날씨</p>
                <span className="text-5xl">{lifeInfo.temperature}</span>
                <p className="text-sm text-gray-600 mt-2">
                  체감온도 {lifeInfo.feelsLike} · {lifeInfo.condition}
                </p>
              </div>
              <CloudRain className="w-16 h-16 text-blue-400" />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-200">
              {lifeInfo.weatherMetrics.slice(0, 3).map((metric) => (
                <Metric
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                />
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm mb-3">대기질 정보</h4>
            <div className="space-y-3">
              {lifeInfo.airQuality.slice(0, 3).map((metric) => (
                <AirQuality
                  key={metric.label}
                  icon={
                    metric.label.includes('오존') ? (
                      <Droplets className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Wind className="w-5 h-5 text-green-600" />
                    )
                  }
                  label={metric.label}
                  status={metric.status}
                  value={metric.value}
                  tone={metric.tone}
                />
              ))}
            </div>
          </div>
        </div>
      </article>

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
            onClick={onOpenTraffic}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            더보기
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoPanel
            title="주요 도로 소통 상황"
            rows={lifeInfo.roads.map((row) => `${row.label}: ${row.meta}`)}
          />
          <InfoPanel
            title="주요 경제 지표"
            rows={lifeInfo.economy.map((row) =>
              `${row.label} ${row.value} ${row.meta || ''}`.trim()
            )}
          />
        </div>
      </article>

      <article
        id="nearby-section"
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-500" />
              <h3 className="text-lg">주변 문화 · 공공장소</h3>
            </div>
            <p className="text-sm text-gray-500">
              {district} 기준으로 확인된 행사 장소와 이용 정보를 모았습니다
            </p>
          </div>
        </div>
        {lifeInfo.nearbyFacilities.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {lifeInfo.nearbyFacilities.slice(0, 4).map((facility) => (
              <FacilityCard
                key={`${facility.name}-${facility.address}`}
                facility={facility}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
            현재 표시할 주변 장소 정보가 없습니다.
          </p>
        )}
      </article>

      <article
        id="additional-info"
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg">재난 · 안전</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safetyAlerts.map((notice, index) => (
            <div
              key={notice.title}
              className={`${index === 0 ? 'bg-green-50' : 'bg-blue-50'} rounded-lg p-4`}
            >
              <p
                className={`mb-1 text-sm ${index === 0 ? 'text-green-700' : 'text-blue-700'}`}
              >
                {notice.title}
              </p>
              <p className="text-sm text-gray-700">{notice.description}</p>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}

function FacilityCard({
  facility
}: {
  facility: LifeInfo['nearbyFacilities'][number];
}) {
  const position = getFacilityMapPosition(facility);
  const mapUrl = getFacilityMapUrl(facility);

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <a
        href={mapUrl}
        target="_blank"
        rel="noreferrer"
        className="relative mb-4 block h-28 overflow-hidden rounded bg-slate-100"
        title={`${facility.name} 지도에서 보기`}
      >
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className="border border-white/70" />
          ))}
        </div>
        <div className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-xs text-gray-700 shadow-sm">
          지도에서 보기
        </div>
        <MapPin
          className="absolute h-7 w-7 -translate-x-1/2 -translate-y-full text-red-600 drop-shadow"
          style={{
            left: `${position?.x ?? 50}%`,
            top: `${position?.y ?? 52}%`
          }}
        />
      </a>
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <span className="mb-2 inline-flex rounded bg-green-50 px-2 py-0.5 text-xs text-green-700">
            {facility.category}
          </span>
          <h4 className="text-base text-gray-900">{facility.name}</h4>
        </div>
        <Building2 className="h-5 w-5 shrink-0 text-gray-400" />
      </div>
      <p className="mb-2 break-words text-sm text-gray-600">
        {facility.description}
      </p>
      <p className="mb-3 flex items-start gap-1 text-xs text-gray-500">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>{facility.address}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-green-700 hover:text-green-800"
        >
          지도 열기
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        {facility.sourceUrl && (
          <a
            href={facility.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            상세 보기
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

function getVisibleSafetyAlerts(lifeInfo: LifeInfo) {
  if (lifeInfo.safetyAlerts.length > 0) return lifeInfo.safetyAlerts;

  const airNotice = lifeInfo.airQuality.find((metric) =>
    /나쁨|주의|경보/.test(metric.status)
  );

  return [
    {
      title: airNotice ? '대기질 주의' : '생활 안전 알림',
      description: airNotice
        ? `${airNotice.label} 수치가 ${airNotice.status} 단계입니다. 외출 전 상세 정보를 확인하세요.`
        : '현재 자치구 기준으로 표시할 긴급 안전 알림은 없습니다.'
    },
    {
      title: '교통 확인',
      description:
        lifeInfo.roads[0]?.meta ||
        '이동 전 주요 도로와 대중교통 정보를 확인하세요.'
    }
  ];
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}

function AirQuality({
  icon,
  label,
  status,
  value,
  tone
}: {
  icon: React.ReactNode;
  label: string;
  status: string;
  value: string;
  tone: 'blue' | 'green';
}) {
  const colorClass =
    tone === 'green'
      ? 'bg-green-50 text-green-700'
      : 'bg-blue-50 text-blue-700';

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg ${colorClass}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm text-gray-900">{label}</p>
          <p className="text-xs text-gray-500 mt-0.5">{status}</p>
        </div>
      </div>
      <span className="text-lg">{value}</span>
    </div>
  );
}

function InfoPanel({ title, rows }: { title: string; rows: string[] }) {
  return (
    <div>
      <h4 className="text-sm mb-3">{title}</h4>
      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row}
            className="flex items-center justify-between p-3 bg-gray-50 rounded"
          >
            <span className="text-sm">{row}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

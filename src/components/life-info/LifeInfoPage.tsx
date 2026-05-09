import {
  AlertCircle,
  Car,
  Cloud,
  CloudRain,
  Droplets,
  Wind
} from 'lucide-react';

interface LifeInfoPageProps {
  district: string;
  onOpenTraffic: () => void;
  onOpenWeather: () => void;
}

export function LifeInfoPage({
  district,
  onOpenTraffic,
  onOpenWeather
}: LifeInfoPageProps) {
  return (
    <>
      <div id="life-info-top">
        <h2 className="text-xl mb-1">오늘의 생활정보</h2>
        <p className="text-sm text-gray-500">
          2026년 4월 11일 토요일 오전 10:02 기준
        </p>
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
              서울시 {district || '강남구'} 기준 날씨 정보를 제공합니다
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
                <span className="text-5xl">14°C</span>
                <p className="text-sm text-gray-600 mt-2">
                  체감온도 12°C · 흐림
                </p>
              </div>
              <CloudRain className="w-16 h-16 text-blue-400" />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-200">
              <Metric label="습도" value="62%" />
              <Metric label="바람" value="남서 3m/s" />
              <Metric label="강수확률" value="30%" />
            </div>
          </div>
          <div>
            <h4 className="text-sm mb-3">대기질 정보</h4>
            <div className="space-y-3">
              <AirQuality
                icon={<Wind className="w-5 h-5 text-green-600" />}
                label="미세먼지 (PM10)"
                status="좋음"
                value="32㎍/m³"
                tone="green"
              />
              <AirQuality
                icon={<Wind className="w-5 h-5 text-green-600" />}
                label="초미세먼지 (PM2.5)"
                status="좋음"
                value="18㎍/m³"
                tone="green"
              />
              <AirQuality
                icon={<Droplets className="w-5 h-5 text-blue-600" />}
                label="오존 (O₃)"
                status="보통"
                value="0.045ppm"
                tone="blue"
              />
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
            rows={['강남대로: 원활', '올림픽대로: 서행', '경부고속도로: 정체']}
          />
          <InfoPanel
            title="주요 경제 지표"
            rows={[
              'USD 1,320.50원 ▲2.30',
              'KOSPI 2,645.32 ▲15.43',
              '생활물가 전주 대비 +1.8%'
            ]}
          />
        </div>
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
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700 mb-1">안전 알림</p>
            <p className="text-sm text-gray-700">
              현재 발효 중인 특보가 없습니다.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-1">생활 안내</p>
            <p className="text-sm text-gray-700">
              우천 예보에 따라 우산을 준비하세요.
            </p>
          </div>
        </div>
      </article>
    </>
  );
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

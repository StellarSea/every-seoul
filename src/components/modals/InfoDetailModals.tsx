import {
  AlertCircle,
  Calendar,
  Car,
  Cloud,
  CloudRain,
  Droplets,
  Home,
  Wind
} from 'lucide-react';
import { ModalShell } from './ModalShell';
import type { EventDetail, ProductPrice } from '../../types/app';

export function WeatherDetailModal({
  district,
  onClose
}: {
  district: string;
  onClose: () => void;
}) {
  return (
    <ModalShell onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl mb-2">날씨 · 환경 상세 정보</h2>
          <p className="text-sm text-gray-500">
            서울시 {district || '강남구'} 기준 - 2026년 4월 11일 오전 10:02
          </p>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <h3 className="text-lg mb-4">현재 날씨</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ['온도', '14°C'],
                ['체감온도', '12°C'],
                ['습도', '62%'],
                ['강수확률', '30%'],
                ['바람', '남서풍 3m/s'],
                ['기압', '1013hPa'],
                ['가시거리', '10km'],
                ['자외선지수', '보통 (5)']
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
              {[
                ['오늘', '흐림', '16°', '12°', '30%'],
                ['일', '비', '14°', '10°', '80%'],
                ['월', '흐림', '15°', '11°', '40%'],
                ['화', '맑음', '18°', '13°', '10%'],
                ['수', '맑음', '19°', '14°', '0%'],
                ['목', '구름', '17°', '13°', '20%'],
                ['금', '맑음', '20°', '15°', '0%']
              ].map(([day, weather, high, low, rain]) => (
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
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg mb-4">대기질 상세 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AirCard
                icon={<Wind className="w-5 h-5 text-green-600" />}
                title="미세먼지 (PM10)"
                value="32"
                caption="㎍/m³ - 좋음"
              />
              <AirCard
                icon={<Wind className="w-5 h-5 text-green-600" />}
                title="초미세먼지 (PM2.5)"
                value="18"
                caption="㎍/m³ - 좋음"
              />
              <AirCard
                icon={<Droplets className="w-5 h-5 text-blue-600" />}
                title="오존 (O₃)"
                value="0.045"
                caption="ppm - 보통"
              />
              <AirCard
                icon={<Cloud className="w-5 h-5 text-green-600" />}
                title="통합대기지수"
                value="45"
                caption="좋음"
              />
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

export function TrafficDetailModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl mb-2">교통 · 경제 상세 정보</h2>
          <p className="text-sm text-gray-500">
            실시간 업데이트 - 2026년 4월 11일 오전 10:02
          </p>
        </div>
        <div className="space-y-6">
          <DetailGrid
            title="서울시 주요 도로 소통 상황"
            items={[
              ['강남대로', '신논현역 ~ 강남역', '원활 · 평균 42km/h'],
              ['올림픽대로', '반포대교 ~ 한남대교', '서행 · 평균 28km/h'],
              ['경부고속도로', '양재IC ~ 판교IC', '정체 · 평균 15km/h']
            ]}
            icon={<Car className="w-4 h-4 text-gray-400" />}
          />
          <DetailGrid
            title="지하철 운행 정보"
            items={[
              ['2호선', '정상운행', '지연 없음'],
              ['3호선', '정상운행', '지연 없음'],
              ['분당선', '5분 지연', '배차 간격 확인 필요']
            ]}
            icon={<AlertCircle className="w-4 h-4 text-gray-400" />}
          />
          <DetailGrid
            title="주요 지수"
            items={[
              ['코스피', '2,645.32', '▲ 15.43 (+0.59%)'],
              ['코스닥', '845.21', '▼ 3.21 (-0.38%)'],
              ['USD', '1,320.50원', '▲ 2.30']
            ]}
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
          <p className="text-sm text-gray-500">
            강남구 기준 평균 시세 - 2026년 4월 11일
          </p>
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
            <h3 className="text-sm font-medium mb-2">상세 장소</h3>
            <p className="text-sm text-gray-700">{event.locationDetail}</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">신청 현황</h3>
              <span className="text-sm text-gray-600">
                {event.registered} / {event.capacity}명
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${(event.registered / event.capacity) * 100}%`
                }}
              />
            </div>
          </div>
          <Section title="행사 소개">
            <p className="text-sm text-gray-700 leading-relaxed">
              {event.description}
            </p>
          </Section>
          <Section title="프로그램 일정">
            <div className="space-y-2">
              {event.program.map((item) => (
                <div
                  key={`${item.time}-${item.content}`}
                  className="flex gap-4 p-3 bg-gray-50 rounded"
                >
                  <span className="text-sm font-medium text-blue-600 min-w-[120px]">
                    {item.time}
                  </span>
                  <span className="text-sm text-gray-700">{item.content}</span>
                </div>
              ))}
            </div>
          </Section>
          <BulletList title="참여 혜택" items={event.benefits} />
          <BulletList title="참여 자격" items={event.requirements} />
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">문의처</h3>
            <p className="text-sm text-gray-700">{event.contact}</p>
          </div>
        </div>
      </div>
    </ModalShell>
  );
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

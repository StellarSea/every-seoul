import { AlertCircle, Calendar, Star } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import { ModalShell } from './ModalShell';
import type { InterestTag, Newsletter, Policy } from '../../types/types';
import { tagColorClass } from '../../utils/tagStyles';

export function NewsDetailModal({
  news,
  tags,
  onClose
}: {
  news: Newsletter;
  tags: InterestTag[];
  onClose: () => void;
}) {
  return (
    <ModalShell onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded">
              {news.category}
            </span>
            <span className="text-sm text-gray-500">{news.date}</span>
            <span className="text-sm text-gray-400">조회 {news.views}</span>
          </div>
          <h2 className="text-3xl mb-4">{news.title}</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {news.tags.map((tagName) => {
              const tag = tags.find((item) => item.name === tagName);
              return (
                <span
                  key={tagName}
                  className={`px-2 py-1 rounded text-xs ${tagColorClass(tag?.color)}`}
                >
                  #{tagName}
                </span>
              );
            })}
          </div>
        </div>
        {news.image && (
          <ImageWithFallback
            src={news.image}
            alt={news.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}
        <div className="space-y-4 text-gray-700 mb-6">
          <p className="text-lg leading-relaxed">{news.excerpt}</p>
          <p className="leading-relaxed">
            서울시는 이번 정책을 통해 시민들의 삶의 질을 향상시키고자 합니다.
            관련 부서와의 협의를 통해 체계적인 계획을 수립하였으며, 단계적으로
            추진될 예정입니다.
          </p>
          <h3 className="text-xl mt-6 mb-3">주요 내용</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>시민 참여형 정책 추진으로 실효성 제고</li>
            <li>관련 예산 확보 및 효율적 집행 계획 수립</li>
            <li>정기적인 모니터링을 통한 정책 효과 분석</li>
            <li>시민 의견 수렴 창구 운영</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              참고 사항
            </h4>
            <p className="text-sm text-gray-700">
              자세한 내용은 강남구청 홈페이지를 참조하시거나, 구청 민원실로
              문의하시기 바랍니다.
            </p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            닫기
          </button>
          <button className="px-6 bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors">
            공유하기
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

export function PolicyDetailModal({
  policy,
  onClose
}: {
  policy: Policy;
  onClose: () => void;
}) {
  return (
    <ModalShell onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${tagColorClass(policy.statusColor)}`}
            >
              {policy.status}
            </span>
            <span className="text-sm text-gray-500">{policy.category}</span>
            <span className="text-sm text-gray-400">
              조회 {policy.views.toLocaleString()}
            </span>
          </div>
          <h2 className="text-3xl mb-3">{policy.title}</h2>
          <p className="text-lg text-gray-600">{policy.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InfoBox label="신청 기간" value={policy.period} />
          <InfoBox label="마감" value={policy.deadline} />
          <InfoBox label="분야" value={policy.category} />
        </div>
        <div className="space-y-6">
          <section>
            <h3 className="text-lg mb-3">지원 내용</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              대상 요건을 만족하는 시민에게 신청 절차에 따라 정책 혜택을
              제공합니다. 자세한 제출 서류와 심사 기준은 서울시 공식 안내를
              확인해 주세요.
            </p>
          </section>
          <section>
            <h3 className="text-lg mb-3">신청 방법</h3>
            <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
              <li>온라인 신청 페이지 접속</li>
              <li>본인 인증 및 신청서 작성</li>
              <li>증빙 서류 업로드</li>
              <li>심사 결과 확인</li>
            </ol>
          </section>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-medium">안내</h3>
            </div>
            <p className="text-sm text-gray-700">
              신청 전 최신 공고문과 자격 요건을 반드시 확인하세요.
            </p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            닫기
          </button>
          <button className="px-8 bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors">
            신청하기
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

export function BookmarksModal({
  bookmarkedNews,
  bookmarkedPolicies,
  newsletters,
  policies,
  tags,
  onClose,
  onNewsClick,
  onPolicyClick,
  onToggleNewsBookmark,
  onTogglePolicyBookmark
}: {
  bookmarkedNews: number[];
  bookmarkedPolicies: number[];
  newsletters: Newsletter[];
  policies: Policy[];
  tags: InterestTag[];
  onClose: () => void;
  onNewsClick: (newsId: number) => void;
  onPolicyClick: (policyId: number) => void;
  onToggleNewsBookmark: (newsId: number) => void;
  onTogglePolicyBookmark: (policyId: number) => void;
}) {
  return (
    <ModalShell onClose={onClose}>
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
          <section>
            <h3 className="text-lg mb-4">
              뉴스레터{' '}
              <span className="text-sm text-gray-500">
                ({bookmarkedNews.length}개)
              </span>
            </h3>
            {bookmarkedNews.length > 0 ? (
              <div className="space-y-3">
                {bookmarkedNews.map((newsId) => {
                  const news = newsletters.find((item) => item.id === newsId);
                  if (!news) return null;
                  return (
                    <article
                      key={news.id}
                      onClick={() => {
                        onNewsClick(news.id);
                        onClose();
                      }}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <BookmarkHeader
                        meta={`${news.category} · ${news.date}`}
                        onToggle={(event) => {
                          event.stopPropagation();
                          onToggleNewsBookmark(news.id);
                        }}
                      />
                      <h4 className="font-medium mb-1">{news.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {news.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {news.tags.slice(0, 3).map((tagName) => {
                          const tag = tags.find(
                            (item) => item.name === tagName
                          );
                          return (
                            <span
                              key={tagName}
                              className={`px-2 py-0.5 rounded text-xs ${tagColorClass(tag?.color)}`}
                            >
                              #{tagName}
                            </span>
                          );
                        })}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <EmptyBookmark label="저장된 뉴스가 없습니다" />
            )}
          </section>
          <section>
            <h3 className="text-lg mb-4">
              맞춤정책{' '}
              <span className="text-sm text-gray-500">
                ({bookmarkedPolicies.length}개)
              </span>
            </h3>
            {bookmarkedPolicies.length > 0 ? (
              <div className="space-y-3">
                {bookmarkedPolicies.map((policyId) => {
                  const policy = policies.find((item) => item.id === policyId);
                  if (!policy) return null;
                  return (
                    <article
                      key={policy.id}
                      onClick={() => {
                        onPolicyClick(policy.id);
                        onClose();
                      }}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <BookmarkHeader
                        meta={`${policy.status} · ${policy.category}`}
                        onToggle={(event) => {
                          event.stopPropagation();
                          onTogglePolicyBookmark(policy.id);
                        }}
                      />
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
              <EmptyBookmark label="저장된 정책이 없습니다" />
            )}
          </section>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors"
        >
          닫기
        </button>
      </div>
    </ModalShell>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm text-gray-700">{value}</p>
    </div>
  );
}

function BookmarkHeader({
  meta,
  onToggle
}: {
  meta: string;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="flex items-start justify-between mb-2">
      <span className="text-xs text-gray-500">{meta}</span>
      <button
        onClick={onToggle}
        className="text-yellow-600 hover:text-gray-400 transition-colors"
        title="북마크 해제"
      >
        <Star className="w-4 h-4 fill-current" />
      </button>
    </div>
  );
}

function EmptyBookmark({ label }: { label: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <p className="text-gray-500">{label}</p>
      <p className="text-sm text-gray-400 mt-1">
        카드의 별 아이콘을 클릭하여 저장하세요
      </p>
    </div>
  );
}

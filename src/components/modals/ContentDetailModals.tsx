import { AlertCircle, Calendar, ExternalLink, Star } from 'lucide-react';
import { ImageWithFallback } from '../shared/ImageWithFallback';
import { ModalShell } from './ModalShell';
import type { InterestTag, Newsletter, Policy } from '../../types/app';
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
  const handleShare = async () => {
    const shareUrl = news.sourceUrl || window.location.href;
    const shareText = `${news.title}\n${shareUrl}`;
    if (navigator.share) {
      await navigator.share({
        title: news.title,
        text: news.excerpt,
        url: shareUrl
      });
      return;
    }
    await navigator.clipboard.writeText(shareText);
  };

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
          <QuickSummary title="3줄 요약" items={news.quickSummary} />
          <p className="whitespace-pre-line break-words text-lg leading-relaxed">
            {news.excerpt}
          </p>
          {news.weather && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                날씨 및 환경
              </h4>
              <p className="text-sm text-gray-700">{news.weather}</p>
            </div>
          )}
          {news.sections?.map((section) => (
            <section key={section.category}>
              <h3 className="text-xl mt-6 mb-3">{section.category}</h3>
              <ul className="space-y-3">
                {section.highlights.map((highlight) => (
                  <li
                    key={`${section.category}-${highlight.title}`}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <p className="font-medium text-gray-900">
                      {highlight.title}
                    </p>
                    <p className="mt-1 whitespace-pre-line break-words text-sm leading-relaxed text-gray-600">
                      {highlight.summary}
                    </p>
                    {highlight.link && (
                      <a
                        href={highlight.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex text-sm text-blue-600 hover:text-blue-700"
                      >
                        원문 보기
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {news.culturalEvents && news.culturalEvents.length > 0 && (
            <section>
              <h3 className="text-xl mt-6 mb-3">문화행사</h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {news.culturalEvents.map((event) => (
                  <div
                    key={`${event.title}-${event.date || ''}`}
                    className="rounded-lg bg-gray-50 p-4"
                  >
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="mt-1 text-sm text-gray-600">
                      {[event.place, event.date, event.fee]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {!news.sections?.length && !news.culturalEvents?.length && (
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              아직 상세 브리핑 항목이 없습니다.
            </div>
          )}
        </div>
        <div className="mt-6 flex gap-3">
          {news.sourceUrl && (
            <a
              href={news.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white py-3 text-blue-600 ring-1 ring-blue-200 transition-colors hover:bg-blue-50"
            >
              대표 원문 보기
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            닫기
          </button>
          <button
            onClick={() => {
              void handleShare().catch(() => undefined);
            }}
            className="px-6 bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors"
          >
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
  const hasDistinctSupportDetail =
    normalizePolicyText(policy.supportDetail) !==
    normalizePolicyText(policy.description);

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
          {policy.recommendationReason && (
            <p className="mb-3 inline-flex rounded bg-blue-50 px-3 py-1 text-sm text-blue-700">
              {policy.recommendationReason}
            </p>
          )}
          <QuickSummary title="핵심 요약" items={policy.quickSummary} />
          <p className="whitespace-pre-line break-words text-lg text-gray-600">
            {policy.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InfoBox label="신청 기간" value={policy.period} />
          <InfoBox label="마감" value={policy.deadline} />
          <InfoBox label="분야" value={policy.category} />
        </div>
        <div className="space-y-6">
          {hasDistinctSupportDetail && (
            <section>
              <h3 className="text-lg mb-3">지원 내용</h3>
              <p className="whitespace-pre-line break-words text-sm text-gray-700 leading-relaxed">
                {policy.supportDetail}
              </p>
            </section>
          )}
          <section>
            <h3 className="text-lg mb-3">확인 절차</h3>
            <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
              {policy.applicationSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
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
          {policy.sourceUrl && (
            <a
              href={policy.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#4267B2] py-3 text-white transition-colors hover:bg-[#365899]"
            >
              신청/원문 보기
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function QuickSummary({ items, title }: { items?: string[]; title: string }) {
  if (!items?.length) return null;

  return (
    <div className="mb-4 rounded-lg bg-blue-50 p-4">
      <h3 className="mb-2 text-sm font-medium text-blue-900">{title}</h3>
      <ul className="space-y-1 text-sm text-gray-700">
        {items.slice(0, 3).map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
            <span className="break-words">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function normalizePolicyText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

export function BookmarksModal({
  bookmarkedNews,
  bookmarkedPolicies,
  error,
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
  error: string;
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
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
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

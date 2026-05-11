import { Star } from 'lucide-react';
import { ImageWithFallback } from '../shared/ImageWithFallback';
import type { InterestTag, Newsletter } from '../../types/app';
import { tagColorClass } from '../../utils/tagStyles';

interface NewsletterPageProps {
  bookmarkedNews: number[];
  district: string;
  error: string;
  loading: boolean;
  newsletters: Newsletter[];
  refreshing: boolean;
  tags: InterestTag[];
  onNewsClick: (newsId: number) => void;
  onRefresh: () => void;
  onToggleBookmark: (newsId: number) => void;
}

export function NewsletterPage({
  bookmarkedNews,
  district,
  error,
  loading,
  newsletters,
  refreshing,
  tags,
  onNewsClick,
  onRefresh,
  onToggleBookmark
}: NewsletterPageProps) {
  const featuredNewsletters = newsletters.filter(
    (newsletter) => newsletter.featured
  );
  const listNewsletters = newsletters.filter(
    (newsletter) => !newsletter.featured
  );

  return (
    <>
      <div
        id="newsletter-top"
        className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <h2 className="text-xl mb-1">오늘의 {district || '강남구'} 요약</h2>
          <p className="text-sm text-gray-500">
            백엔드에서 가져온 최신 뉴스레터 {newsletters.length}개
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading || refreshing}
          className="self-start rounded bg-[#4267B2] px-4 py-2 text-sm text-white transition-colors hover:bg-[#365899] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {refreshing ? '갱신 중...' : '새로고침'}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          뉴스레터를 불러오는 중입니다.
        </div>
      )}

      {!loading && newsletters.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <h3 className="mb-2 text-lg">아직 표시할 뉴스레터가 없습니다</h3>
          <p className="text-sm text-gray-500">
            백엔드 수집 파이프라인을 실행하거나 다른 자치구를 선택해 주세요.
          </p>
        </div>
      )}

      <div id="featured-news">
        {featuredNewsletters.map((newsletter) => (
          <FeaturedNewsletterCard
            key={newsletter.id}
            bookmarked={bookmarkedNews.includes(newsletter.id)}
            newsletter={newsletter}
            tags={tags}
            onClick={() => onNewsClick(newsletter.id)}
            onToggleBookmark={() => onToggleBookmark(newsletter.id)}
          />
        ))}
      </div>

      <div id="all-news" className="pt-4">
        <h2 className="text-lg">{district || '강남구'} 뉴스 요약</h2>
      </div>

      {listNewsletters.map((newsletter) => (
        <NewsletterListItem
          key={newsletter.id}
          bookmarked={bookmarkedNews.includes(newsletter.id)}
          newsletter={newsletter}
          tags={tags}
          onClick={() => onNewsClick(newsletter.id)}
          onToggleBookmark={() => onToggleBookmark(newsletter.id)}
        />
      ))}
    </>
  );
}

interface NewsletterCardProps {
  bookmarked: boolean;
  newsletter: Newsletter;
  tags: InterestTag[];
  onClick: () => void;
  onToggleBookmark: () => void;
}

function FeaturedNewsletterCard({
  bookmarked,
  newsletter,
  tags,
  onClick,
  onToggleBookmark
}: NewsletterCardProps) {
  return (
    <article
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      {newsletter.image && (
        <ImageWithFallback
          src={newsletter.image}
          alt={newsletter.title}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{newsletter.category}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{newsletter.date}</span>
            {newsletter.isRead === false && (
              <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                새 글
              </span>
            )}
          </div>
          <BookmarkButton active={bookmarked} onClick={onToggleBookmark} />
        </div>
        <h3 className="text-xl mb-3">{newsletter.title}</h3>
        <QuickSummary newsletter={newsletter} />
        <TagList newsletter={newsletter} tags={tags} />
      </div>
    </article>
  );
}

function NewsletterListItem({
  bookmarked,
  newsletter,
  tags,
  onClick,
  onToggleBookmark
}: NewsletterCardProps) {
  return (
    <article
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{newsletter.category}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{newsletter.date}</span>
          {newsletter.relevance > 0 && (
            <>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-blue-600">
                추천 {newsletter.relevance}점
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">조회 {newsletter.views}</span>
          <BookmarkButton active={bookmarked} onClick={onToggleBookmark} />
        </div>
      </div>
      <h3 className="mb-2">{newsletter.title}</h3>
      <QuickSummary newsletter={newsletter} />
      <TagList newsletter={newsletter} tags={tags} />
    </article>
  );
}

function QuickSummary({ newsletter }: { newsletter: Newsletter }) {
  const items = newsletter.quickSummary?.length
    ? newsletter.quickSummary
    : [newsletter.excerpt];

  return (
    <ul className="mb-4 space-y-1 text-sm leading-relaxed text-gray-600">
      {items.slice(0, 3).map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
          <span className="break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BookmarkButton({
  active,
  onClick
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`p-1 rounded transition-colors ${
        active ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-600'
      }`}
      title={active ? '북마크 해제' : '북마크 추가'}
    >
      <Star className={`w-4 h-4 ${active ? 'fill-current' : ''}`} />
    </button>
  );
}

function TagList({
  newsletter,
  tags
}: {
  newsletter: Newsletter;
  tags: InterestTag[];
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {newsletter.tags.map((tagName) => {
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
  );
}

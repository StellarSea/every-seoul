import { Star } from 'lucide-react';
import { ImageWithFallback } from '../shared/ImageWithFallback';
import type { InterestTag, Newsletter } from '../../types/app';
import { tagColorClass } from '../../utils/tagStyles';

interface NewsletterPageProps {
  bookmarkedNews: number[];
  district: string;
  newsletters: Newsletter[];
  tags: InterestTag[];
  onNewsClick: (newsId: number) => void;
  onToggleBookmark: (newsId: number) => void;
}

export function NewsletterPage({
  bookmarkedNews,
  district,
  newsletters,
  tags,
  onNewsClick,
  onToggleBookmark
}: NewsletterPageProps) {
  return (
    <>
      <div id="newsletter-top">
        <h2 className="text-xl mb-1">오늘의 {district || '강남구'} 요약</h2>
        <p className="text-sm text-gray-500">최신 뉴스레터 10개</p>
      </div>

      <div id="featured-news">
        {newsletters
          .filter((newsletter) => newsletter.featured)
          .map((newsletter) => (
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

      {newsletters
        .filter((newsletter) => !newsletter.featured)
        .map((newsletter) => (
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
          </div>
          <BookmarkButton active={bookmarked} onClick={onToggleBookmark} />
        </div>
        <h3 className="text-xl mb-3">{newsletter.title}</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {newsletter.excerpt}
        </p>
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
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">조회 {newsletter.views}</span>
          <BookmarkButton active={bookmarked} onClick={onToggleBookmark} />
        </div>
      </div>
      <h3 className="mb-2">{newsletter.title}</h3>
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
        {newsletter.excerpt}
      </p>
      <TagList newsletter={newsletter} tags={tags} />
    </article>
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

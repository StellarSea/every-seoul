import { Star } from 'lucide-react';
import type { Newsletter } from '../../types/types';
import { ImageWithFallback } from '../ImageWithFallback';

function NewsletterModal(
  newsletter: Newsletter,
  handleNewsClick: (id: number) => void,
  toggleNewsBookmark: (id: number) => void,
  bookmarkedNews: number[],
  allTags: { name: string; color: string }[]
) {
  return (
    <article
      key={newsletter.id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex gap-4 p-5">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500">{newsletter.category}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{newsletter.date}</span>
          </div>
          <h3 className="text-lg mb-2">{newsletter.title}</h3>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            {newsletter.excerpt}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleNewsClick(newsletter.id)}
              className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              자세히 보기
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNewsBookmark(newsletter.id);
              }}
              className={`p-1.5 rounded transition-colors ${
                bookmarkedNews.includes(newsletter.id)
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-gray-100 text-gray-400 hover:text-yellow-600'
              }`}
              title={
                bookmarkedNews.includes(newsletter.id)
                  ? '북마크 해제'
                  : '북마크 추가'
              }
            >
              <Star
                className={`w-4 h-4 ${bookmarkedNews.includes(newsletter.id) ? 'fill-current' : ''}`}
              />
            </button>
            {newsletter.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 rounded text-xs ${
                  allTags.find((t) => t.name === tag)?.color === 'orange'
                    ? 'bg-orange-100 text-orange-700'
                    : allTags.find((t) => t.name === tag)?.color === 'green'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        {newsletter.image && (
          <div className="w-64 flex-shrink-0">
            <ImageWithFallback
              src={newsletter.image}
              alt={newsletter.title}
              className="w-full h-40 object-cover rounded"
            />
          </div>
        )}
      </div>
    </article>
  );
}

export default NewsletterModal;

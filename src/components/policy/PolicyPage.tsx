import {
  AlertCircle,
  Calendar,
  ChevronRight,
  Home,
  Star,
  Users
} from 'lucide-react';
import type { Policy, UserPreferences } from '../../types/app';
import { tagColorClass } from '../../utils/tagStyles';

interface PolicyPageProps {
  bookmarkedPolicies: number[];
  error: string;
  loading: boolean;
  policies: Policy[];
  preferences: UserPreferences;
  onPolicyClick: (policyId: number) => void;
  onToggleBookmark: (policyId: number) => void;
}

export function PolicyPage({
  bookmarkedPolicies,
  error,
  loading,
  policies,
  preferences,
  onPolicyClick,
  onToggleBookmark
}: PolicyPageProps) {
  return (
    <>
      <div
        id="policy-top"
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl mb-2">맞춤 정책</h2>
            <p className="text-sm text-gray-500 mb-3">
              고객님께 맞는 정책을 안내해 드립니다
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {preferences.age
                    ? `${preferences.age}세`
                    : '만 19세 ~ 39세 청년'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  자녀 유무: {preferences.hasChildren ? '있음' : '없음'}
                </span>
              </div>
            </div>
          </div>
          <span className="text-sm text-blue-600">최신 API 응답 기준</span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 mb-1">
              {preferences.age ||
              preferences.hasChildren ||
              preferences.employmentStatus
                ? '입력하신 정보를 바탕으로 맞춤 정책을 안내해드립니다'
                : '고객님의 나이와 자녀 유무를 기준으로 맞춤 정책을 안내해드립니다'}
            </p>
            <p className="text-xs text-blue-700">
              정보 수정을 원하시면 우측 상단의 설정에서 변경하실 수 있습니다
            </p>
          </div>
        </div>
      </div>

      <div id="policy-list">
        <h3 className="text-lg mb-4">추천 정책 목록</h3>
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
        {loading && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            정책 정보를 불러오는 중입니다.
          </div>
        )}
        <div className="space-y-3">
          {!loading && policies.length === 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
              저장된 뉴스레터에서 확인된 정책 정보가 없습니다.
            </div>
          )}
          {!loading &&
            policies.map((policy) => (
              <article
                key={policy.id}
                onClick={() => onPolicyClick(policy.id)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${tagColorClass(policy.statusColor)}`}
                      >
                        {policy.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {policy.category}
                      </span>
                    </div>
                    <h3 className="text-lg mb-2">{policy.title}</h3>
                    <p className="mb-3 line-clamp-4 whitespace-pre-line break-words text-sm text-gray-600">
                      {policy.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>기간: {policy.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{policy.deadline}</span>
                      </div>
                      <span>조회 {policy.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        onToggleBookmark(policy.id);
                      }}
                      className={`p-1.5 rounded transition-colors ${
                        bookmarkedPolicies.includes(policy.id)
                          ? 'text-yellow-600'
                          : 'text-gray-400 hover:text-yellow-600'
                      }`}
                      title={
                        bookmarkedPolicies.includes(policy.id)
                          ? '북마크 해제'
                          : '북마크 추가'
                      }
                    >
                      <Star
                        className={`w-4 h-4 ${bookmarkedPolicies.includes(policy.id) ? 'fill-current' : ''}`}
                      />
                    </button>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </>
  );
}

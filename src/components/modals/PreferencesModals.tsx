import { X } from 'lucide-react';
import { interestOptions, seoulDistricts } from '../../data/appData';
import type {
  EmploymentStatus,
  InterestTag,
  UserPreferences
} from '../../types/app';
import { tagColorClass, tagSelectedClass } from '../../utils/tagStyles';
import { ModalShell } from './ModalShell';

interface SettingsModalProps {
  preferences: UserPreferences;
  onAgeChange: (age: string) => void;
  onChildrenCountChange: (count: string) => void;
  onClose: () => void;
  onDistrictChange: (district: string) => void;
  onEmploymentStatusChange: (status: EmploymentStatus) => void;
  onHasChildrenChange: (hasChildren: boolean) => void;
  onToggleInterest: (interest: string, checked: boolean) => void;
}

export function SettingsModal({
  preferences,
  onAgeChange,
  onChildrenCountChange,
  onClose,
  onDistrictChange,
  onEmploymentStatusChange,
  onHasChildrenChange,
  onToggleInterest
}: SettingsModalProps) {
  return (
    <ModalShell maxWidth="max-w-2xl" onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl mb-2">개인 정보 설정</h2>
          <p className="text-sm text-gray-500">
            맞춤형 뉴스레터, 생활정보, 정책을 제공하기 위한 정보를 입력해주세요.
          </p>
        </div>
        <div className="space-y-6">
          <Field label="나이">
            <input
              type="number"
              value={preferences.age}
              onChange={(event) => onAgeChange(event.target.value)}
              placeholder="예: 28"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </Field>
          <Field label="거주 지역 (서울시)">
            <select
              value={preferences.district}
              onChange={(event) => onDistrictChange(event.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {seoulDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </Field>
          <Field label="자녀 유무">
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={!preferences.hasChildren}
                  onChange={() => {
                    onHasChildrenChange(false);
                    onChildrenCountChange('');
                  }}
                  className="mr-2"
                />
                <span className="text-sm">없음</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={preferences.hasChildren}
                  onChange={() => onHasChildrenChange(true)}
                  className="mr-2"
                />
                <span className="text-sm">있음</span>
              </label>
            </div>
          </Field>
          {preferences.hasChildren && (
            <Field label="자녀 수">
              <input
                type="number"
                value={preferences.childrenCount}
                onChange={(event) => onChildrenCountChange(event.target.value)}
                placeholder="예: 2"
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </Field>
          )}
          <Field label="취업 상태">
            <select
              value={preferences.employmentStatus}
              onChange={(event) =>
                onEmploymentStatusChange(event.target.value as EmploymentStatus)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">선택해주세요</option>
              <option value="employed">재직 중</option>
              <option value="job-seeking">구직 중</option>
              <option value="student">학생</option>
              <option value="self-employed">자영업</option>
              <option value="etc">기타</option>
            </select>
          </Field>
          <Field label="관심 분야 (복수 선택 가능)">
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map((interest) => (
                <label
                  key={interest.value}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={preferences.interests.includes(interest.value)}
                    onChange={(event) =>
                      onToggleInterest(interest.value, event.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">{interest.label}</span>
                </label>
              ))}
            </div>
          </Field>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>개인정보 보호 안내:</strong> 입력하신 정보는 맞춤형 콘텐츠
              제공을 위해서만 사용되며, 외부에 공개되거나 제3자에게 제공되지
              않습니다.
            </p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

interface TagManagementModalProps {
  allTags: InterestTag[];
  selectedTags: string[];
  onClearTags: () => void;
  onClose: () => void;
  onToggleTag: (tagName: string) => void;
}

export function TagManagementModal({
  allTags,
  selectedTags,
  onClearTags,
  onClose,
  onToggleTag
}: TagManagementModalProps) {
  return (
    <ModalShell maxWidth="max-w-2xl" onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl mb-2">관심 태그 관리</h2>
          <p className="text-sm text-gray-500">
            관심있는 태그를 선택하면 맞춤 뉴스를 추천해드립니다
          </p>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">
              선택된 태그 ({selectedTags.length}개)
            </h3>
            {selectedTags.length > 0 && (
              <button
                onClick={onClearTags}
                className="text-xs text-red-600 hover:text-red-700"
              >
                모두 제거
              </button>
            )}
          </div>
          <div className="bg-gray-50 rounded-lg p-4 min-h-[60px] flex flex-wrap gap-2">
            {selectedTags.length > 0 ? (
              selectedTags.map((tagName) => {
                const tag = allTags.find((item) => item.name === tagName);
                return (
                  <button
                    key={tagName}
                    onClick={() => onToggleTag(tagName)}
                    className={`px-3 py-1.5 rounded text-xs flex items-center gap-1 transition-all ${tagColorClass(tag?.color)}`}
                  >
                    #{tagName}
                    <X className="w-3 h-3" />
                  </button>
                );
              })
            ) : (
              <p className="text-sm text-gray-400">선택된 태그가 없습니다</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3">전체 태그</h3>
          <div className="grid grid-cols-3 gap-2">
            {allTags.map((tag) => {
              const selected = selectedTags.includes(tag.name);
              return (
                <button
                  key={tag.name}
                  onClick={() => onToggleTag(tag.name)}
                  className={`px-4 py-2.5 rounded text-sm transition-all border-2 ${
                    selected
                      ? tagSelectedClass(tag.color)
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  #{tag.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-[#4267B2] text-white py-3 rounded-lg hover:bg-[#365899] transition-colors"
          >
            저장
          </button>
          <button
            onClick={onClose}
            className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function Field({
  children,
  label
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

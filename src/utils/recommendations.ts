import type { Policy, UserPreferences } from '../types/app';

const interestLabels: Record<string, string> = {
  culture: '문화/행사 관심사',
  education: '교육/육아 관심사',
  employment: '일자리/취업 관심사',
  environment: '환경 관심사',
  housing: '주거/부동산 관심사',
  safety: '안전/재난 관심사',
  traffic: '교통 관심사',
  welfare: '복지/건강 관심사'
};

export function getPolicyRecommendationReason(
  policy: Policy,
  preferences: UserPreferences
) {
  const reasons: string[] = [];

  const age = Number.parseInt(preferences.age, 10);
  if (!Number.isNaN(age) && /청년|대학생|취업|일자리|창업/.test(policy.title)) {
    reasons.push(`${age}세 연령 정보`);
  }

  if (
    preferences.hasChildren &&
    /육아|아동|교육|가족|돌봄/.test(policy.title)
  ) {
    reasons.push('자녀 정보');
  }

  if (
    preferences.employmentStatus === 'job-seeking' &&
    /구직|취업|일자리|수당|채용/.test(policy.title)
  ) {
    reasons.push('구직 상태');
  }

  const matchedInterest = preferences.interests.find((interest) =>
    policyMatchesInterest(policy, interest)
  );
  if (matchedInterest) {
    reasons.push(interestLabels[matchedInterest]);
  }

  if (policy.relevance > 0 && reasons.length === 0) {
    reasons.push('맞춤 점수');
  }

  return reasons.length > 0
    ? `${reasons.slice(0, 2).join(', ')} 기준으로 추천`
    : '최신 공공데이터에서 확인된 정책';
}

function policyMatchesInterest(policy: Policy, interest: string) {
  const text = `${policy.title} ${policy.category} ${policy.description}`;
  const patterns: Record<string, RegExp> = {
    culture: /문화|행사|축제|공연/,
    education: /교육|육아|아동|돌봄/,
    employment: /일자리|취업|구직|창업/,
    environment: /환경|대기|에너지/,
    housing: /주거|부동산|전세|월세|임대/,
    safety: /안전|재난|공사|방재/,
    traffic: /교통|주차|도로|버스|지하철/,
    welfare: /복지|건강|의료|지원/
  };

  return patterns[interest]?.test(text) ?? false;
}

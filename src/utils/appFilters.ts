import type { Newsletter, Policy, UserPreferences } from '../types/types';

export function getFilteredNewsletters(
  source: Newsletter[],
  preferences: UserPreferences
) {
  return source
    .map((news) => {
      const districtRelevance = preferences.district
        ? Number(news.category.includes(preferences.district)) * 10
        : 0;
      const interestRelevance = news.tags.some((tag) => {
        if (
          preferences.interests.includes('housing') &&
          ['부동산', '주거'].includes(tag)
        )
          return true;
        if (preferences.interests.includes('traffic') && tag === '교통')
          return true;
        if (
          preferences.interests.includes('culture') &&
          ['문화', '행사'].includes(tag)
        )
          return true;
        if (preferences.interests.includes('safety') && tag === '공사')
          return true;
        return false;
      })
        ? 5
        : 0;

      return { ...news, relevance: districtRelevance + interestRelevance };
    })
    .sort((a, b) => b.relevance - a.relevance);
}

export function getFilteredPolicies(
  source: Policy[],
  preferences: UserPreferences
) {
  const age = Number.parseInt(preferences.age, 10);

  return source
    .map((policy) => {
      let relevance = 0;

      if (
        !Number.isNaN(age) &&
        age >= 19 &&
        age <= 39 &&
        (policy.title.includes('청년') || policy.category === '구직')
      ) {
        relevance += 10;
      }

      if (
        preferences.hasChildren &&
        ['육아', '교육'].includes(policy.category)
      ) {
        relevance += 10;
      }

      if (
        preferences.employmentStatus === 'job-seeking' &&
        (policy.category === '구직' || policy.title.includes('수당'))
      ) {
        relevance += 10;
      }

      if (
        preferences.interests.includes('housing') &&
        policy.category === '주거'
      ) {
        relevance += 5;
      }

      return { ...policy, relevance };
    })
    .sort((a, b) => b.relevance - a.relevance);
}

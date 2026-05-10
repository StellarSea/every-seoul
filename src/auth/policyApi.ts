import type {
  EventDetail,
  Policy,
  TagColor,
  UserPreferences
} from '../types/app';
import { requestJson } from './apiClient';

interface BackendPolicy {
  id: number;
  title: string;
  description: string;
  deadline: string;
  period: string;
  category: string;
  status: string;
  status_color: TagColor;
  views: number;
  relevance: number;
  support_detail: string;
  application_steps: string[];
}

interface BackendEventDetail {
  title: string;
  date: string;
  time: string;
  location: string;
  location_detail: string;
  capacity: number;
  registered: number;
  description: string;
  program: { time: string; content: string }[];
  benefits: string[];
  requirements: string[];
  contact: string;
}

interface BackendPolicyList {
  items: BackendPolicy[];
  events: BackendEventDetail[];
}

export async function fetchPolicies(preferences: UserPreferences) {
  const search = new URLSearchParams({
    has_children: String(preferences.hasChildren),
    employment_status: preferences.employmentStatus
  });
  if (preferences.age) search.set('age', preferences.age);
  preferences.interests.forEach((interest) =>
    search.append('interests', interest)
  );

  const data = await requestJson<BackendPolicyList>(
    `/policies/?${search.toString()}`
  );

  return {
    policies: data.items.map(mapPolicy),
    events: data.events.map(mapEvent)
  };
}

function mapPolicy(item: BackendPolicy): Policy {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    deadline: item.deadline,
    period: item.period,
    category: item.category,
    status: item.status,
    statusColor: item.status_color,
    views: item.views,
    relevance: item.relevance,
    supportDetail: item.support_detail,
    applicationSteps: item.application_steps
  };
}

function mapEvent(item: BackendEventDetail): EventDetail {
  return {
    title: item.title,
    date: item.date,
    time: item.time,
    location: item.location,
    locationDetail: item.location_detail,
    capacity: item.capacity,
    registered: item.registered,
    description: item.description,
    program: item.program,
    benefits: item.benefits,
    requirements: item.requirements,
    contact: item.contact
  };
}

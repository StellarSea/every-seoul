import type { AuthUser } from '../store/authStore';
import type { PersistedUserPreferences, UserPreferences } from '../types/app';
import { requestJson } from './apiClient';

interface BackendUser {
  id: number;
  email: string;
  age: number | null;
  districts: string[];
  has_children: boolean;
  children_count: number | null;
  employment_status: PersistedUserPreferences['employment_status'];
  interests: string[];
}

interface GoogleLoginResponse {
  user: BackendUser;
  provider: 'google';
  name: string;
  picture?: string | null;
  email: string;
}

export async function loginWithGoogleCredential(
  credential: string
): Promise<AuthUser> {
  const data = await requestJson<GoogleLoginResponse>('/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ credential })
  });

  return {
    id: String(data.user.id),
    name: data.name || data.email,
    email: data.email,
    picture: data.picture || undefined,
    provider: data.provider,
    preferences: toPersistedPreferences(data.user)
  };
}

export async function updateUserPreferences(
  userId: string,
  preferences: UserPreferences
): Promise<PersistedUserPreferences> {
  const data = await requestJson<BackendUser>(`/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toUserUpdateRequest(preferences))
  });

  return toPersistedPreferences(data);
}

function toUserUpdateRequest(preferences: UserPreferences) {
  return {
    age: preferences.age ? Number(preferences.age) : null,
    districts: preferences.district ? [preferences.district] : [],
    has_children: preferences.hasChildren,
    children_count:
      preferences.hasChildren && preferences.childrenCount
        ? Number(preferences.childrenCount)
        : null,
    employment_status: preferences.employmentStatus,
    interests: preferences.interests
  };
}

function toPersistedPreferences(user: BackendUser): PersistedUserPreferences {
  return {
    age: user.age,
    districts: user.districts || [],
    has_children: user.has_children,
    children_count: user.children_count,
    employment_status: user.employment_status || '',
    interests: user.interests || []
  };
}

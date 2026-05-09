import { getApiBaseUrl } from '../utils/runtimeConfig';

export const API_BASE_URL = getApiBaseUrl();

export async function requestJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function readErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as { detail?: string };
    return data.detail || `요청 실패 (${response.status})`;
  } catch {
    return `요청 실패 (${response.status})`;
  }
}

import { requestJson } from './apiClient';

interface PushPublicKeyResponse {
  public_key: string | null;
}

export interface PushSubscriptionPayload {
  endpoint: string;
  expiration_time: number | null;
  keys: {
    auth: string;
    p256dh: string;
  };
  raw: PushSubscriptionJSON;
}

interface PushSendResponse {
  sent: number;
  failed: number;
}

export async function fetchPushPublicKey() {
  const data = await requestJson<PushPublicKeyResponse>(
    '/notifications/push/public-key'
  );
  return data.public_key;
}

export async function savePushSubscription(payload: PushSubscriptionPayload) {
  await requestJson('/notifications/push/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

export async function deletePushSubscription(endpoint: string) {
  const search = new URLSearchParams({ endpoint });
  await requestJson(`/notifications/push/subscriptions?${search.toString()}`, {
    method: 'DELETE'
  });
}

export async function sendTestPush() {
  return requestJson<PushSendResponse>('/notifications/push/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
}

import type { AppNotification } from '../types/app';
import {
  deletePushSubscription,
  fetchPushPublicKey,
  savePushSubscription,
  sendTestPush
} from '../auth/notificationApi';
import { getConfiguredVapidPublicKey } from './runtimeConfig';

const ENABLED_KEY = 'every-seoul-browser-notifications';
const SEEN_KEY = 'every-seoul-notified-ids';

export function getBrowserNotificationSupport() {
  return (
    typeof window !== 'undefined' &&
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
}

export function getBrowserNotificationEnabled() {
  return (
    getBrowserNotificationSupport() &&
    window.localStorage.getItem(ENABLED_KEY) === 'true' &&
    Notification.permission === 'granted'
  );
}

export async function enableBrowserNotifications() {
  if (!getBrowserNotificationSupport()) return false;

  const permission =
    Notification.permission === 'default'
      ? await Notification.requestPermission()
      : Notification.permission;

  const enabled = permission === 'granted';
  window.localStorage.setItem(ENABLED_KEY, String(enabled));
  if (!enabled) return false;

  const subscription = await subscribeToWebPush();
  return Boolean(subscription);
}

export async function disableBrowserNotifications() {
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.getSubscription();
  if (subscription) {
    await deletePushSubscription(subscription.endpoint).catch(() => undefined);
    await subscription.unsubscribe().catch(() => undefined);
  }
  window.localStorage.setItem(ENABLED_KEY, 'false');
}

export function sendBrowserNotifications(notifications: AppNotification[]) {
  if (!getBrowserNotificationEnabled()) return;

  const seen = new Set(readSeenIds());
  const nextIds = [...seen];

  notifications.forEach((notification) => {
    if (seen.has(notification.id)) return;

    new Notification(notification.title, {
      body: notification.description,
      tag: notification.id
    });
    nextIds.push(notification.id);
  });

  window.localStorage.setItem(SEEN_KEY, JSON.stringify(nextIds.slice(-50)));
}

function readSeenIds() {
  try {
    const value = window.localStorage.getItem(SEEN_KEY);
    return value ? (JSON.parse(value) as string[]) : [];
  } catch {
    return [];
  }
}

export async function sendServerTestPush() {
  return sendTestPush();
}

async function subscribeToWebPush() {
  const publicKey =
    getConfiguredVapidPublicKey() || (await fetchPushPublicKey());
  if (!publicKey) return null;

  const registration = await navigator.serviceWorker.register('/sw.js');
  const existing = await registration.pushManager.getSubscription();
  const subscription =
    existing ||
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    }));

  const json = subscription.toJSON();
  if (!json.endpoint || !json.keys?.auth || !json.keys.p256dh) return null;

  await savePushSubscription({
    endpoint: json.endpoint,
    expiration_time: json.expirationTime ?? null,
    keys: {
      auth: json.keys.auth,
      p256dh: json.keys.p256dh
    },
    raw: json
  });

  return subscription;
}

function urlBase64ToUint8Array(value: string) {
  const padding = '='.repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

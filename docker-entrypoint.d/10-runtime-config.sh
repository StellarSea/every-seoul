#!/bin/sh
set -eu

cat > /usr/share/nginx/html/env.js <<EOF
window.__EVERY_SEOUL_RUNTIME_CONFIG__ = {
  apiBaseUrl: "${API_BASE_URL:-/api}",
  googleClientId: "${GOOGLE_CLIENT_ID:-}",
  vapidPublicKey: "${VAPID_PUBLIC_KEY:-}"
};
EOF

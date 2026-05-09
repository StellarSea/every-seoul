# Every Seoul Frontend

React/Vite 기반 에브리서울 프론트엔드입니다.

## Local Development

```bash
pnpm install
copy .env.example .env
pnpm dev
```

기본 로컬 주소는 <http://localhost:5173> 입니다.

## Environment

| Name                    | Description                                                      |
| ----------------------- | ---------------------------------------------------------------- |
| `VITE_API_BASE_URL`     | Backend API base URL. Local default: `http://localhost:8000/api` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth web client ID                                       |

## Verification

```bash
pnpm check
pnpm format:check
```

## Docker Production Build

The frontend image builds static assets and serves them with Nginx.
Nginx also proxies `/api/*` to the backend service in Docker Compose.

```bash
docker build \
  --build-arg VITE_API_BASE_URL=/api \
  --build-arg VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com \
  -t every-seoul-web .
```

## Full Stack Docker Compose

This repo includes `compose.prod.yml` for running frontend, backend, and PostgreSQL
together. It assumes the backend repo is located next to this repo:

```txt
C:\JaeEonYu\dev\every-seoul
C:\JaeEonYu\dev\every-seoul-backend
```

## Before Real Production Deployment

Complete this checklist before exposing the app to real users:

- Choose a hosting target: VPS, cloud VM, Render/Fly/Railway, or another Docker-capable platform.
- Point a real domain to the server. Example: `every-seoul.example.com`.
- Put HTTPS in front of the app using a reverse proxy or platform TLS. Do not serve Google login over plain HTTP in production.
- Create a Google OAuth Web Client ID for the production domain.
- Add the production origin to Google OAuth Authorized JavaScript origins:

```txt
https://your-domain.com
```

- Set `PUBLIC_WEB_ORIGIN` in `.env.production` to the exact production origin, including `https://`.
- Set the same `GOOGLE_CLIENT_ID` in `.env.production`.
- Replace `POSTGRES_PASSWORD` with a strong unique password.
- Set real API keys if these features are used:

```env
SEOUL_OPEN_API_KEY=
OPENROUTER_API_KEY=
```

- Decide whether the scheduler should run in production:

```env
ENABLE_SCHEDULER=true
```

- Decide whether this deployment should auto-create tables:
  - First small deployment: `CREATE_DB_TABLES=true` is acceptable.
  - Mature production: use migrations and set `CREATE_DB_TABLES=false`.
- Back up the `postgres_data` Docker volume or use a managed PostgreSQL database.
- Confirm firewall rules allow only needed ports. For this compose file, expose HTTP/HTTPS only; PostgreSQL stays internal.
- Run verification before deploy:

```bash
pnpm check
python -m compileall ..\every-seoul-backend\app
python -m pytest -s ..\every-seoul-backend\tests
docker compose --env-file .env.production -f compose.prod.yml config
```

- After deploy, check:

```bash
curl https://your-domain.com/health
curl https://your-domain.com/api/health
```

- Test Google login and user settings save with a real Google account.
- Watch logs after first deploy:

```bash
docker compose --env-file .env.production -f compose.prod.yml logs -f
```

Create production env files:

```bash
copy .env.production.example .env.production
```

Edit `.env.production`, then run:

```bash
docker compose --env-file .env.production -f compose.prod.yml up --build -d
```

Health checks:

```bash
curl http://localhost/health
curl http://localhost/api/health
```

Stop the stack:

```bash
docker compose --env-file .env.production -f compose.prod.yml down
```

## Google OAuth Setup

In Google Cloud Console, create an OAuth client with Application type `Web application`.

Authorized JavaScript origins for local development:

```txt
http://localhost:5173
http://127.0.0.1:5173
```

For production, also add:

```txt
https://your-domain.com
```

Use the same client ID in both frontend and backend env files.

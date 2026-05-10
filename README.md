# Every Seoul Frontend

에브리서울 프론트엔드 애플리케이션입니다. React 19, Vite 8, TypeScript, Tailwind CSS v4, Zustand를 사용합니다.

## 시작하기

```bash
pnpm install
copy .env.example .env
pnpm dev
```

개발 서버의 기본 주소는 <http://localhost:5173> 입니다. Vite가 다른 포트를 사용 중이라고 판단하면 터미널에 표시되는 주소로 접속하면 됩니다.

## 환경 변수

로컬 개발 환경에서는 `.env.example`을 복사해 `.env`를 만든 뒤 값을 채웁니다.

| 이름                    | 설명                                      | 기본 예시                      |
| ----------------------- | ----------------------------------------- | ------------------------------ |
| `VITE_API_BASE_URL`     | 프론트엔드가 호출할 백엔드 API 기본 주소  | `http://localhost:8000/api`    |
| `VITE_GOOGLE_CLIENT_ID` | Google Identity Services 웹 클라이언트 ID | `*.apps.googleusercontent.com` |

프로덕션 Docker 컨테이너는 시작 시점에 런타임 설정을 `/env.js`로 생성합니다. 그래서 이미 빌드된 이미지도 `API_BASE_URL`, `GOOGLE_CLIENT_ID` 환경 변수만 바꿔 다른 환경에서 실행할 수 있습니다.

## 주요 명령어

```bash
pnpm dev           # 개발 서버 실행
pnpm lint          # ESLint 검사
pnpm typecheck     # TypeScript 타입 검사
pnpm build         # 타입 검사 후 프로덕션 빌드
pnpm check         # lint + build 전체 검증
pnpm format        # Prettier 포맷 적용
pnpm format:check  # 포맷 검사
```

## 프로젝트 구조

```txt
src/App.tsx                  앱 조립
src/components/layout        셸, 헤더, 사이드바 레이아웃
src/components/newsletter    뉴스레터 탭 UI
src/components/life-info     생활 정보 탭 UI
src/components/policy        정책 탭 UI
src/components/modals        모달 UI
src/components/shared        작은 재사용 UI
src/components/auth          인증 UI와 Google 로그인
src/auth                     인증 연동 헬퍼
src/data                     태그, 자치구 등 정적 선택지
src/hooks                    상태를 가진 앱 훅
src/store                    Zustand 스토어
src/types                    공용 타입
src/utils                    순수 유틸리티
src/styles/index.css         전역 CSS와 Tailwind 진입점
```

`App.tsx`는 앱 구성만 담당하도록 얇게 유지합니다. 새로운 동작은 역할에 맞게 컴포넌트, 훅, 스토어, 데이터, 유틸리티에 나눠 둡니다.

## 백엔드 연동

로컬 백엔드 저장소는 보통 이 저장소와 같은 상위 폴더 아래에 둡니다.

```txt
every-seoul
every-seoul-backend
```

백엔드 API의 기본 로컬 주소는 <http://localhost:8000/api> 입니다. 프론트엔드에서 다른 주소를 호출해야 하면 `.env`의 `VITE_API_BASE_URL` 값을 변경합니다.

## Google OAuth 설정

Google Cloud Console에서 OAuth 클라이언트를 만들 때 애플리케이션 유형은 `웹 애플리케이션`을 선택합니다.

로컬 개발용 승인된 JavaScript 원본:

```txt
http://localhost:5173
http://127.0.0.1:5173
```

프로덕션 배포 시에는 실제 도메인도 추가합니다.

```txt
https://everyseoul.com
```

같은 Google 클라이언트 ID를 프론트엔드와 백엔드 환경 변수에 설정합니다. 현재 프론트엔드는 화면 표시와 세션 상태를 위해 Google ID 토큰을 파싱합니다. 실제 프로덕션 인증에서는 이 ID 토큰을 백엔드로 보내 서버에서 검증한 뒤 세션을 생성해야 합니다.

## Docker 이미지 빌드

프론트엔드 이미지는 정적 파일을 빌드한 뒤 Nginx로 제공합니다.

```bash
docker build -t every-seoul-web .
```

## 전체 스택 Docker Compose

`compose.prod.yml`은 Caddy, 프론트엔드, 백엔드, PostgreSQL을 함께 실행합니다. Caddy가 `80`, `443` 포트를 열고 Let's Encrypt 인증서를 자동 발급합니다. 백엔드 저장소가 이 저장소와 같은 상위 폴더 아래에 있다고 가정합니다.

```txt
every-seoul
every-seoul-backend
```

배포 환경 변수는 템플릿을 복사해 별도 파일로 관리합니다. 실제 `.env.production`은 Git에 커밋하지 않습니다.

```bash
cp .env.production.example .env.production
```

`.env.production`에서 `PUBLIC_WEB_HOST`, `PUBLIC_WEB_ORIGIN`, `POSTGRES_PASSWORD`, `GOOGLE_CLIENT_ID`, `SEOUL_OPEN_API_KEY`, `OPENROUTER_API_KEY`를 실제 값으로 바꾼 뒤 실행합니다.

```bash
docker compose --env-file .env.production -f compose.prod.yml up --build -d
docker compose --env-file .env.production -f compose.prod.yml logs -f
docker compose --env-file .env.production -f compose.prod.yml down
```

Windows PowerShell에서도 같은 Compose 파일을 사용할 수 있습니다.

```powershell
Copy-Item .env.production.example .env.production
notepad .env.production
docker compose --env-file .env.production -f compose.prod.yml up --build -d
docker compose --env-file .env.production -f compose.prod.yml logs -f
docker compose --env-file .env.production -f compose.prod.yml down
```

상태 확인:

```bash
curl http://localhost/health
curl http://localhost/api/health
curl https://everyseoul.com/health
curl https://everyseoul.com/api/health
```

PowerShell에서 상태를 확인할 때는 다음 명령을 사용할 수 있습니다.

```powershell
Invoke-WebRequest http://localhost/health
Invoke-WebRequest http://localhost/api/health
Invoke-WebRequest https://everyseoul.com/health
Invoke-WebRequest https://everyseoul.com/api/health
```

## 실제 배포 전 확인 사항

- VPS, 클라우드 VM, Render, Fly.io, Railway 등 Docker 실행이 가능한 배포 대상을 정합니다.
- 실제 도메인을 서버에 연결합니다.
- 서버의 80/443 포트를 열고 도메인의 A 레코드가 서버를 가리키게 합니다. compose의 Caddy가 HTTPS를 자동 적용합니다.
- 프로덕션 도메인용 Google OAuth 웹 클라이언트 ID를 준비하거나 기존 클라이언트에 프로덕션 원본을 추가합니다.
- `.env.production`을 만들고 `PUBLIC_WEB_HOST=everyseoul.com`, `PUBLIC_WEB_ORIGIN=https://everyseoul.com`으로 설정합니다.
- `API_BASE_URL`을 프론트엔드가 호출할 API 경로로 설정합니다. 일반적으로 `/api`를 사용합니다.
- `POSTGRES_PASSWORD`를 강한 고유 비밀번호로 바꿉니다.
- 필요한 경우 `SEOUL_OPEN_API_KEY`, `OPENROUTER_API_KEY`를 실제 값으로 설정합니다.
- 운영 환경에서 뉴스레터 수집을 자동 실행하려면 `ENABLE_SCHEDULER=true`로 설정합니다.
- 초기 소규모 배포에서는 `CREATE_DB_TABLES=true`를 사용할 수 있지만, 운영이 안정되면 마이그레이션을 사용하고 `CREATE_DB_TABLES=false`로 전환하는 편이 좋습니다.
- `postgres_data` Docker 볼륨을 백업하거나 관리형 PostgreSQL 사용을 검토합니다.
- 방화벽은 필요한 포트만 열어 둡니다. 이 compose 구성에서는 HTTP/HTTPS만 외부에 노출하고 PostgreSQL은 내부에 둡니다.

배포 전 검증 예시:

```bash
pnpm check
python -m compileall ..\every-seoul-backend\app
python -m pytest -s ..\every-seoul-backend\tests
docker compose --env-file .env.production -f compose.prod.yml config
```

배포 후에는 실제 Google 계정으로 로그인, 로그아웃, 사용자 설정 저장, 북마크 저장/해제, 뉴스레터 수집 결과 표시가 정상 동작하는지 확인합니다.

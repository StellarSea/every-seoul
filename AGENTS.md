# AGENTS.md

## Project

- App: Every Seoul frontend
- Stack: React 19, Vite 8, TypeScript, Tailwind CSS v4, Zustand
- Package manager: pnpm

## Commands

- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Typecheck only: `pnpm typecheck`
- Lint only: `pnpm lint`
- Fix lint issues: `pnpm lint:fix`
- Format files: `pnpm format`
- Check formatting: `pnpm format:check`
- Full local verification: `pnpm check`

Always run `pnpm check` after code changes when feasible.

## Structure

- `src/App.tsx`: app composition only
- `src/components/layout`: shell/header/sidebar layout
- `src/components/newsletter`: newsletter tab UI
- `src/components/life-info`: life info tab UI
- `src/components/policy`: policy tab UI
- `src/components/modals`: modal UI
- `src/components/shared`: small reusable UI helpers
- `src/components/auth`: auth UI, including Google sign-in
- `src/auth`: auth integration helpers
- `src/data`: static mock data
- `src/hooks`: stateful app hooks
- `src/store`: Zustand stores
- `src/types`: shared app types
- `src/utils`: pure helpers
- `src/styles/index.css`: global CSS and Tailwind entry

Keep `App.tsx` thin. Put new behavior in components, hooks, stores, data, or utils according to responsibility.

## Coding Rules

- Use TypeScript strictly; avoid `any`.
- Prefer explicit interfaces for object shapes.
- Keep business/filtering logic out of JSX when it can be a pure helper.
- Do not add unused placeholder files, empty folders, or speculative abstractions.
- Do not reintroduce large template UI libraries unless they are actually used.
- Keep imports relative unless a clear project-wide alias convention is introduced.
- Use Tailwind utility classes for styling.
- Keep global CSS minimal and only for true global behavior.
- Use `lucide-react` for icons.

## Auth Notes

- Google login uses Google Identity Services.
- The client ID is configured with `VITE_GOOGLE_CLIENT_ID`.
- `.env.example` documents required environment variables.
- The frontend currently parses the Google ID token for display/session state.
- For production auth, send the Google ID token to the backend and verify it server-side before creating a real session.

## Environment

- Local frontend URL is usually `http://localhost:5173` or `http://127.0.0.1:5173`.
- Local backend repo: `C:\JaeEonYu\dev\every-seoul-backend`
- Local backend API URL is usually `http://localhost:8000/api`.
- If configuring Google OAuth, add both local origins in Google Cloud Console.

## Verification Expectations

Before considering work complete:

- `pnpm lint` should pass.
- `pnpm typecheck` should pass.
- `pnpm build` should pass.
- Prefer `pnpm check`, which runs the main verification path.

If a command cannot be run, clearly explain why.

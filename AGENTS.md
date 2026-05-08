# AGENTS.md

## Cursor Cloud specific instructions

### Overview

TimeAtlas is a **purely client-side** React + TypeScript SPA (no backend, no database). All timezone calculations use browser-native `Intl` APIs and `date-fns`.

### Quick reference

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 5173) |
| Type check | `npm run type-check` |
| Format | `npm run format` |
| Format check | `npm run format:check` |
| Lint | `npm run lint` |
| Production build | `npm run build` |
| Preview build | `npm run preview` (port 4173) |

### Known issues

- **ESLint**: `npm run lint` will report parsing errors because the `.eslintrc.json` lacks `@typescript-eslint/parser`. Use `npm run type-check` as the primary code quality gate instead.
- **Prettier format:check**: Fails on some files in `src/imports/pasted_text/` — these are legacy design docs, not source code. This does not affect the actual application.

### Dev environment notes

- Node.js 20+ required (v22 works fine).
- Package manager: **npm** (lockfile is `package-lock.json`).
- No backend services, databases, or Docker needed.
- Copy `.env.example` to `.env.local` for local development; analytics/adsense are disabled by default.
- The pre-commit hook (`.husky/pre-commit`) runs TypeScript type-check and Prettier formatting. Pass `--no-verify` to skip if needed during development.

### Testing

There are currently **no automated test suites** (no vitest/jest). Quality is validated via:
1. `npm run type-check` — TypeScript strict mode
2. `npm run format:check` — Prettier
3. `npm run build` — full production build with SSR pre-rendering of 119 routes

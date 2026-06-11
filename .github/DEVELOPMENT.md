# Development Guide

Detailed guide for developers setting up and working with TimeAtlas.

## Prerequisites

- **Node.js**: 22.18 or higher (build scripts import `.ts` modules via Node's built-in type stripping)
- **npm**: 10.0 or higher (or pnpm 9+, yarn 4+)
- **Git**: 2.40 or higher
- **VS Code** (recommended): Latest version with extensions:
  - ESLint
  - Prettier
  - TypeScript Vue Plugin
  - Tailwind CSS IntelliSense

## Setup

### 1. Clone Repository

```bash
git clone https://github.com/janetdeerfield/TimeAtlasV2.git
cd TimeAtlasV2
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

This installs:

- React 18.3.1 and ReactDOM
- TypeScript 5+
- Vite 6.3.5 and plugins
- Tailwind CSS 4.1.12
- Radix UI components
- Development tools (ESLint, Prettier, Husky, TypeScript)

### 3. Setup Git Hooks

```bash
npm run prepare
# or manually
npx husky install
```

This enables pre-commit hooks that run:

- TypeScript type checking
- Code formatting with Prettier
- Linting with ESLint (optional)

Make hooks executable:

```bash
chmod +x .husky/pre-commit
```

### 4. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration. Most settings have sensible defaults.

## Development Workflow

### Start Development Server

```bash
npm run dev
```

Server runs at `http://localhost:5173`

**Features:**

- Hot module replacement (HMR)
- TypeScript type-aware
- Tailwind CSS watch mode
- Fast rebuild on file changes

### TypeScript Type Checking

```bash
# Check types without building
npm run type-check

# Watch mode (requires external terminal)
npx tsc --watch --noEmit
```

### Code Formatting

```bash
# Auto-format all code
npm run format

# Check what would be formatted
npm run format:check

# Format specific file
npx prettier --write src/app/pages/Home.tsx

# VS Code: Enable Format on Save
# Settings > Editor: Format on Save
```

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix

# Lint specific file
npx eslint src/app/pages/Home.tsx --fix
```

### Build & Preview

```bash
# Build for production
npm run build
# Output: dist/

# Preview production build locally
npm run preview
# Runs at http://localhost:4173
```

## Project Structure

```
TimeAtlas/
├── src/
│   ├── app/
│   │   ├── App.tsx                 # Main app component
│   │   ├── routes.tsx              # Route definitions
│   │   ├── components/
│   │   │   ├── ui/                 # Radix UI component wrappers
│   │   │   ├── CityCard.tsx
│   │   │   ├── ClockHero.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ... (other components)
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Homepage
│   │   │   ├── Convert.tsx         # Timezone converter
│   │   │   ├── World.tsx           # World clock
│   │   │   ├── Meet.tsx            # Meeting planner
│   │   │   ├── Dev.tsx             # Developer tools
│   │   │   ├── About.tsx
│   │   │   ├── Privacy.tsx
│   │   │   ├── Terms.tsx
│   │   │   └── RootLayout.tsx      # Layout wrapper
│   │   ├── hooks/
│   │   │   └── useTime.ts          # Custom time hook
│   │   └── utils/
│   │       ├── time.ts             # Time utilities
│   │       └── format.ts           # Formatting utilities
│   ├── main.tsx                    # Entry point
│   ├── styles/
│   │   ├── index.css               # Global styles
│   │   ├── fonts.css
│   │   ├── theme.css
│   │   └── tailwind.css
│   └── assets/                     # Images, etc.
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── .github/
│   ├── workflows/
│   │   └── ci-cd.yml               # GitHub Actions
│   ├── GIT_WORKFLOW.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
├── .env.example                    # Environment template
├── .prettierrc.json                # Code formatting
├── .eslintrc.json                  # Code linting
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript config
├── package.json
└── README.md
```

## Debugging

### VS Code Debug Session

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "webpack:///*": "${webRoot}/*"
      }
    }
  ]
}
```

Start dev server, then press F5 to debug.

### Browser DevTools

1. Open Chrome DevTools (F12)
2. **Sources** tab: Set breakpoints in source code
3. **Console** tab: Run JavaScript commands
4. **Performance** tab: Profile rendering and runtime performance
5. **Network** tab: Monitor API calls and assets

### Common Issues

**1. Pre-commit hook fails**

```bash
# Hooks not executable
chmod +x .husky/pre-commit

# Reinstall hooks
npm run prepare

# Temporarily skip (not recommended)
git commit --no-verify
```

**2. Types errors but code works**

```bash
# Restart TypeScript server
Cmd+K Cmd+J (Mac) / Ctrl+K Ctrl+J (Linux/Windows)

# Or in VS Code: Command Palette > TypeScript: Restart TS Server
```

**3. HMR not updating**

```bash
# Restart dev server
npm run dev

# Check for syntax errors in your changes
npm run type-check
```

**4. Build fails with "Cannot find module"**

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

**5. Huge bundle size**

```bash
# Analyze bundle
npm run build

# Check dist/assets/ for large files
ls -lah dist/assets/
```

## Performance Debugging

### Lighthouse Audit

1. Run production build: `npm run build`
2. Preview: `npm run preview`
3. Chrome DevTools > Lighthouse tab
4. Generate report

### React Profiler

1. Install [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools) extension
2. Open in Chrome DevTools: Components tab
3. Highlight renders on update
4. Check why components re-render

### Network Performance

1. Chrome DevTools > Network tab
2. Throttle to Fast 3G / Slow 4G
3. Check critical path (CSS, JS that blocks render)
4. Lazy load heavy features when possible

## Testing

Currently no automated tests. To add:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Create test file alongside component: `ComponentName.test.tsx`

## Deployment for Development

### Local Preview

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

```bash
# Project must be public repository
# GitHub Pages settings: enable, source = GitHub Actions

# Push to main branch
git push origin main
```

### Deploy to Vercel (Easy)

```bash
# Login to Vercel
npm i -g vercel
vercel

# Follow prompts to connect repository
```

### Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy
```

## Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes (enforced by Prettier)
- **Semicolons**: Always (enforced by Prettier)
- **Line Length**: 100 characters (enforced by Prettier)
- **Component Naming**: PascalCase
- **File Naming**: Match component name (PascalCase for components)

These are auto-formatted on commit, so just write code and let Prettier handle it.

## Useful Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build

# Code Quality
npm run type-check       # TypeScript checking
npm run format           # Auto-format all code
npm run format:check     # Check formatting
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix

# Git & Deployment
npm run prepare          # Setup git hooks
git push origin main     # Deploy to production
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Components](https://www.radix-ui.com/docs/primitives/overview/introduction)

## Questions?

Check `.github/CONTRIBUTING.md` for contribution guidelines or open an issue on GitHub.

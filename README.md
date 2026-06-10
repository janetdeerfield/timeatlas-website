# TimeAtlas

A time observatory for the internet. A modern, responsive web application for timezone management, world clocks, meeting planning, and time education.

**Live**: [timeatlas.co](https://timeatlas.co) | **Design**: [Figma](https://www.figma.com/design/M4JLEIfGTvj1QsK5ZxeB8k/TimeAtlas---Design-System?node-id=0-1&m=dev&t=HmpCYtm4HJJ1oZYP-1)

---

## Quick Start

### Prerequisites

- Node.js 22.18+ (the build scripts import TypeScript modules directly, which requires Node's built-in type stripping)
- npm (or pnpm/yarn)

### Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Type checking
npm run type-check

# Format code
npm run format

# Run linter
npm run lint
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Code-First Workflow

This project follows a structured, code-first development workflow designed for stability and maintainability.

### 📋 Key Documents

- **[Git Workflow](.github/GIT_WORKFLOW.md)** - Branching strategy, commit conventions, PR process
- **[Deployment Guide](.github/DEPLOYMENT.md)** - Production deployment steps and verification
- **[Contributing Guidelines](.github/CONTRIBUTING.md)** - Code standards and best practices
- **[V3 Build Brief](BUILD_BRIEF_V3.md)** - Current source of truth for V3 build scope and phase gates

### 🔄 Development Flow

1. **Create Feature Branch**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/description-of-feature
   ```

2. **Write & Commit Code**
   - Write code following project conventions
   - Pre-commit hooks run automatically (type-check, formatting)
   - Use [Conventional Commits](.github/GIT_WORKFLOW.md#commit-message-format)

   ```bash
   git commit -m "feat(components): add new feature"
   ```

3. **Push & Create PR**

   ```bash
   git push origin feature/description-of-feature
   ```

   - Create PR against `develop` branch
   - CI/CD pipeline runs automatically
   - Request code review

4. **Merge to Develop**
   - Squash merge when approved
   - All checks must pass

5. **Release to Production**
   - When ready, create `release/` branch
   - Update version and CHANGELOG
   - Merge to `main` with version tag
   - CI/CD auto-deploys to production

### 📦 CI/CD Pipeline

**Automated on every push/PR:**

- ✓ TypeScript type checking
- ✓ Build verification
- ✓ Code formatting validation
- ✓ Auto-deploy to production (main branch only)

See [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml) for details.

### 🎯 Branch Structure

```
main (production) ←── release/v2.1.0
  ↑                        ↓
  └── hotfix/** ←── develop (integration)
                      ↓      ↑
                  feature/** bugfix/**
```

---

## Project Structure

```
src/
  app/
    components/        # UI components (button, card, etc.)
    pages/            # Page routes (Home, Convert, World, etc.)
    hooks/            # Custom React hooks
    utils/            # Utility functions
  styles/             # Global CSS and theme
  main.tsx            # Entry point

.github/
  workflows/          # GitHub Actions CI/CD
  GIT_WORKFLOW.md     # Git branching strategy
  DEPLOYMENT.md       # Production deployment guide
```

---

## Architecture

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 + CSS-in-JS
- **UI Components**: Radix UI
- **Routing**: React Router 7
- **Form Handling**: React Hook Form
- **Charts**: Recharts
- **Theme Management**: next-themes

---

## Features

- **Exact Time Now** - Atomic clock synchronized time for your location
- **Time Zone Converter** - Convert between any two timezones
- **World Clock** - View time in major cities worldwide
- **Meeting Planner** - Find optimal meeting times across timezones
- **Developer Tools** - Unix time, UTC, military time converters
- **Learn to Tell Time** - Educational tools with analog clock teaching
- **Responsive Design** - Works perfectly on desktop, tablet, mobile

---

## Environment Configuration

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values. This file is never committed to git.

---

## Performance

- **Bundle Size**: ~345 KB JavaScript (100 KB gzip)
- **Build Time**: ~3.7 seconds
- **Lighthouse Targets**: 90+ (Performance, Accessibility, Best Practices, SEO)

Monitor with:

```bash
npm run build  # Check dist/ sizes
```

---

## Troubleshooting

### Git diverged from origin

```bash
git fetch origin
git merge origin/main
# Or rebase if needed
git rebase origin/main
```

### Pre-commit hooks not running

```bash
npm run prepare  # Reinstall husky hooks
chmod +x .husky/pre-commit
```

### Build errors

```bash
rm -rf node_modules
npm install
npm run build
```

---

## Support & Resources

- **Issues**: [GitHub Issues](https://github.com/janetdeerfield/Timeatlasv2websitedraft/issues)
- **Discussions**: [GitHub Discussions](https://github.com/janetdeerfield/Timeatlasv2websitedraft/discussions)
- **Design Docs**: See [src/imports/](src/imports/) for original design notes

---

## License

See LICENSE file for details.

---

**Last Updated**: April 2026
**Maintained By**: TimeAtlas Team

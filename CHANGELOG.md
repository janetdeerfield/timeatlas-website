# Changelog

All notable changes to TimeAtlas are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed (SEO recovery — 2026-06-10)

- Journal articles now fully prerender (title, meta, canonical, Article/FAQPage
  schema, body content). Previously `ArticlePage` loaded the article in
  `useEffect`, which never runs during SSR, so every article page shipped as an
  empty spinner shell invisible to crawlers.
- Removed stale `src/lib/articleRegistry.js` duplicate that shadowed the `.ts`
  registry in Vite resolution, silently dropping newly registered articles from
  prerender output.
- Published `b2b-scheduling-blueprint` (registered in `articleRegistry.ts`).
- Unknown URLs now return a real HTTP 404 serving the prerendered `404.html`,
  instead of the prerendered homepage with status 200 (soft-404 generator).
- Added www → apex 301 canonicalization to `.htaccess`.
- Privacy and Terms pages are indexable again (`noindex,follow` removed) —
  required for AdSense review.
- Article-not-found fallback uses the requested path and `noindex,nofollow`
  instead of canonicalizing to `/journal`.
- `llms.txt` moved to `public/` so it actually deploys; rewritten with real
  page URLs instead of placeholder links.
- Sitemap `lastmod` values are stable and honest: article dates come from
  frontmatter, pair/static pages from maintained constants — no more restamping
  464 URLs with the build date on every deploy.
- Organization JSON-LD `logo` points to the square 480×480 logo instead of the
  1200×630 OG banner.
- Deploy workflow verifies critical prerendered files, robots directives, and
  sitemap before FTP upload.

### Added

- Code-first workflow infrastructure
- CI/CD pipeline with GitHub Actions
- TypeScript strict mode and type checking
- Pre-commit hooks for code quality
- Linting with ESLint
- Code formatting with Prettier
- Environment variable management

### Changed

- Updated package.json with development scripts
- Enhanced .gitignore for better local development
- Improved README with workflow documentation

### Fixed

- Git branch synchronization
- Build consistency and reproducibility

---

## [2.0.0] - 2026-04-07

### Added

- Full Vite-based React TypeScript rewrite
- TimeAtlas V2 design system
- Core time tools: Converter, World Clock, Meeting Planner
- Developer tools: Unix time, UTC, military time converters
- Educational content: Learn to tell time section
- Responsive mobile-first design
- Tailwind CSS styling
- Radix UI component system
- React Router for navigation
- Dark mode support with next-themes

### Changed

- Complete redesign from V1
- Migration from legacy framework to modern stack

### Deprecated

- V1 codebase no longer maintained

---

## Release Notes Guide

### When to Release

- **Patch (x.x.X)**: Bug fixes, security patches, minor improvements
- **Minor (x.X.0)**: New features, non-breaking changes
- **Major (X.0.0)**: Breaking changes, major refactoring

### Release Process

1. Update version in package.json: `npm version <patch|minor|major>`
2. Update this CHANGELOG
3. Create release PR
4. Merge to `main`
5. GitHub Actions auto-deploys

### Template for New Release

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added

- New features

### Changed

- Updated features

### Fixed

- Bug fixes

### Security

- Security updates

### Deprecated

- Features being deprecated

### Removed

- Removed features
```

---

## Legacy Releases

### [1.0.0] - Original TimeAtlas

- Initial TimeAtlas implementation
- Basic time tools and timezone support
- Archived - see git history for details

# Changelog

All notable changes to TimeAtlas are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

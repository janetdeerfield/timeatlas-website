# Git Workflow & Branching Strategy

## Branch Strategy (GitFlow)

### Main Branches
- **main**: Production-ready code. Every commit is tagged as a release.
- **develop**: Integration branch for features. Stable but pre-release.

### Supporting Branches
- **feature/***: Feature development (branch from `develop`)
- **bugfix/***: Bug fixes (branch from `develop`)
- **hotfix/***: Production hotfixes (branch from `main`)
- **release/***: Release preparation (branch from `develop`)

## Workflow

### Starting a Feature
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Committing Code
Use conventional commits:
```
feat: add timezone converter
fix: correct clock display lag
docs: update deployment guide
style: format code with prettier
chore: update dependencies
```

### Pull Requests
1. Push your branch: `git push origin feature/your-feature-name`
2. Create a PR against `develop`
3. Code review required
4. CI/CD must pass
5. Squash and merge when approved

### Releasing to Production
1. Create release branch: `git checkout -b release/v2.1.0`
2. Update version in package.json
3. Merge to `main`: `git checkout main && git merge --no-ff release/v2.1.0`
4. Tag release: `git tag -a v2.1.0 -m "Release v2.1.0"`
5. Merge back to develop
6. Delete release branch

### Hotfixes
```bash
git checkout main
git checkout -b hotfix/critical-bug-fix
# Fix the issue
git checkout main
git merge --no-ff hotfix/critical-bug-fix
git tag -a v2.0.1 -m "Hotfix v2.0.1"
git checkout develop
git merge --no-ff hotfix/critical-bug-fix
```

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**: feat, fix, docs, style, refactor, perf, test, chore
- **scope**: component/module affected
- **subject**: imperative, present tense, lowercase
- **body**: explain what and why, not how
- **footer**: reference issues: "Fixes #123"

Example:
```
feat(components): add dark mode toggle

Add a new toggle component to support dark mode switching.
Styling is handled by next-themes and tailwind config.

Fixes #456
```

## Pre-Commit Hooks

Before committing:
1. ✓ Type check: `npx tsc --noEmit`
2. ✓ Format check: `npm run format:check`
3. ✓ Lint: `npm run lint`

Use `husky` to automate these checks.

## Code Review Checklist

- [ ] Code follows project style guide
- [ ] Types are properly annotated (TypeScript)
- [ ] No console.log or debugger statements
- [ ] Tests pass (if applicable)
- [ ] Build succeeds
- [ ] No breaking changes without migration guide
- [ ] Documentation updated if needed

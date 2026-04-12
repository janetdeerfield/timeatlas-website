# Contributing Guidelines

Welcome! These guidelines help maintain code quality and a smooth collaboration process.

## Getting Started

1. **Fork & Clone**

   ```bash
   git clone https://github.com/janetdeerfield/TimeAtlasV2.git
   cd TimeAtlasV2
   ```

2. **Setup**

   ```bash
   npm install
   npm run prepare  # Setup git hooks
   ```

3. **Create Feature Branch**
   ```bash
   git checkout develop
   git checkout -b feature/your-feature
   ```

## Code Standards

### TypeScript

- All code must be properly typed
- No `any` types without justification
- Use strict mode: `tsconfig.json` has `strict: true`

### React Components

- Functional components with hooks
- Proper TypeScript interfaces for props
- Meaningful component names
- Extract reusable logic into hooks

**Example:**

```typescript
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
}) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

### Styling

- Use Tailwind CSS classes for styling
- Keep component logic separate from styles
- Prefer utility classes over CSS-in-JS when possible
- Use the design system from `tailwind.config` for consistency

### File Organization

```
ComponentName/
  ├── ComponentName.tsx        # Main component
  ├── ComponentName.test.tsx   # Tests (if applicable)
  ├── index.ts                 # Export
  └── types.ts                 # TypeScript interfaces
```

### Naming Conventions

- **Components**: PascalCase (`UserCard.tsx`)
- **Hooks**: camelCase, prefix with `use` (`useTime.ts`)
- **Utils**: camelCase (`formatTime.ts`)
- **Types**: PascalCase (`UserData.ts`)
- **CSS classes**: kebab-case (`btn-primary`)

## Commit Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Format, missing semicolons, etc. (no code change)
- `refactor` - Code change that neither fixes nor adds feature
- `perf` - Performance improvement
- `test` - Test changes
- `chore` - Build, dependencies, etc.

**Examples:**

```bash
git commit -m "feat(components): add dark mode toggle"
git commit -m "fix(hooks): useTime hook not updating"
git commit -m "docs: update deployment guide"
git commit -m "refactor(utils): simplify time formatting logic"
```

## Before Pushing

Run these checks locally:

```bash
# Type checking
npm run type-check

# Formatting
npm run format

# Linting (if available)
npm run lint

# Build
npm run build
```

All of these run automatically in pre-commit hooks. If they fail, the commit is blocked (fix with `npm run format` and `npm run lint:fix`).

## Pull Request Process

1. **Push Your Branch**

   ```bash
   git push origin feature/your-feature
   ```

2. **Create Pull Request**
   - Base branch: `develop` (or `main` for hotfixes)
   - Title: Follow commit convention (e.g., "feat: add timezone search")
   - Description: Explain what and why, reference any related issues

3. **PR Template**

   ```markdown
   ## Description

   Brief description of changes

   ## Type of Change

   - [ ] New feature
   - [ ] Bug fix
   - [ ] Breaking change
   - [ ] Documentation

   ## Testing

   How was this tested?

   ## Checklist

   - [ ] Code follows style guidelines
   - [ ] Tests pass
   - [ ] No lint warnings
   - [ ] Types are correct
   ```

4. **Code Review**
   - Respond to feedback constructively
   - Make requested changes
   - Request re-review

5. **Merge**
   - Squash and merge to `develop`
   - Delete feature branch
   - Add PR description to commit message

## Testing

While formal unit tests aren't required yet, test your changes manually:

1. Run development server: `npm run dev`
2. Test your feature across browsers (Chrome, Safari, Firefox)
3. Test on mobile (use DevTools device emulation or real device)
4. Check browser console for errors

## Documentation

- Update README if adding user-facing features
- Add JSDoc comments for public functions
- Update TypeScript interfaces when changing data structures
- Document configuration changes in `.env.example`

**JSDoc Example:**

```typescript
/**
 * Converts a date to the user's local timezone
 * @param date - The date to convert
 * @param timezone - IANA timezone string
 * @returns Converted date string in 24-hour format
 */
export function formatTimeInZone(date: Date, timezone: string): string {
  // implementation
}
```

## Performance Considerations

- Avoid creating new objects in render methods
- Use `useCallback` for event handlers passed to children
- Use `useMemo` for expensive computations
- Lazy load heavy components with `React.lazy()`
- Profile with Chrome DevTools before optimizing

## Accessibility

- Use semantic HTML (button, a, form, etc.)
- Include alt text on images
- Ensure keyboard navigation works
- Use ARIA labels when necessary
- Maintain color contrast ratios (WCAG AA minimum)

## Questions?

- Check existing [GitHub Issues](https://github.com/janetdeerfield/TimeAtlasV2/issues)
- Start a [Discussion](https://github.com/janetdeerfield/TimeAtlasV2/discussions)
- Review project documentation in `.github/` folder

---

Thanks for contributing! 🎉

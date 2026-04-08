# Production Deployment Guide

## Deployment Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] Code review completed
- [ ] Version number updated in package.json
- [ ] CHANGELOG.md updated with release notes
- [ ] Build succeeds with no warnings: `npm run build`
- [ ] Bundle size acceptable (check dist/assets/)
- [ ] Performance metrics reviewed
- [ ] Environment variables configured

## Deployment Steps

### 1. Prepare Release

```bash
# Update version (semantic versioning)
npm version patch  # 2.0.0 → 2.0.1
npm version minor  # 2.0.0 → 2.1.0
npm version major  # 2.0.0 → 3.0.0

# This updates package.json and creates a git tag
# Push changes
git push origin main --tags
```

### 2. Build

```bash
npm run build
# Output: dist/
# Check file sizes in dist/assets/
```

### 3. Deploy Options

#### Option A: GitHub Pages
```bash
# Enable in repository settings
# Pages will auto-deploy from main branch
```

#### Option B: Vercel
```bash
# Connect repository to Vercel
# Auto-deploys on push to main
npm run build  # Local verification
```

#### Option C: Netlify
```bash
# Connect repository to Netlify
# Configure build command: npm run build
# Publish directory: dist
```

#### Option D: Custom Server (SSH/SFTP)
```bash
# Build locally
npm run build

# SSH deploy script
ssh user@host "mkdir -p /var/www/timeatlas"
scp -r dist/* user@host:/var/www/timeatlas/

# Or use deployment tools like rsync
```

### 4. Verify Deployment

```bash
# Check site is responding
curl -I https://timeatlas.com

# Check critical pages
https://timeatlas.com/
https://timeatlas.com/convert
https://timeatlas.com/world

# Monitor performance
# Check browser console for errors
# Test on mobile devices
```

### 5. Rollback (if needed)

```bash
# Revert to previous version
git revert [commit-hash]
git push origin main

# OR checkout previous tag
git checkout v2.0.0
npm run build
# Redeploy
```

## Performance Optimization

### Build Size
- Current: 345 KB JavaScript (100 KB gzip)
- Target: Keep < 150 KB gzip

### Monitor with:
```bash
npm run build --analyze  # (if configured)
# Or use: npm install --save-dev rollup-plugin-visualizer
```

### Optimization Tips
- Lazy load pages with React.lazy()
- Code splitting by route
- Image optimization with next/image or manual compression
- CSS purging with Tailwind
- Tree-shaking unused dependencies

## Environment Configuration

Production environment (.env.production):
```
VITE_APP_NAME=TimeAtlas
VITE_DEPLOYMENT_ENV=production
VITE_API_URL=https://timeatlas.com
VITE_ENABLE_ANALYTICS=true
VITE_GA_ID=[your-ga-id]
```

## Monitoring & Alerts

Setup monitoring for:
- [ ] Site uptime (UptimeRobot, Statuspage)
- [ ] Error tracking (Sentry, LogRocket)
- [ ] Performance (Web Vitals, Lighthouse CI)
- [ ] User analytics (Google Analytics)

## Emergency Contacts & Runbook

Document:
- Who can deploy
- Escalation contacts
- Common issues and fixes
- 24-hour support contacts

# Analytics & Monetization Setup

## Google Analytics 4 (GA4)

### Current Configuration

- **Tracking ID**: G-B310VMS98Q
- **Property**: TimeAtlas
- **Status**: Active

### Environment Variables

```env
# .env.local
VITE_GA_ID=G-B310VMS98Q
VITE_ENABLE_ANALYTICS=true
```

### Usage in Components

Track custom events anywhere in your code:

```typescript
import {
  trackEvent,
  trackPageView,
  trackTimezoneConversion,
  trackToolUsage,
  trackSearch,
} from '@/app/utils/analytics';

// Track page view
trackPageView('/convert', 'Timezone Converter');

// Track timezone conversion
trackTimezoneConversion('America/New_York', 'Europe/London');

// Track tool usage
trackToolUsage('world-clock');

// Track search
trackSearch('EST', 5);

// Track custom event
trackEvent('meeting_time_found', {
  participants: 5,
  timezone_count: 3,
});
```

### Viewing Analytics

1. Go to [Google Analytics](https://analytics.google.com)
2. Select **TimeAtlas** property
3. View events in **Reports** → **Events**
4. Create custom reports and dashboards

### Key Metrics to Track

- **Tool Usage**: Which features are most popular
- **Timezone Conversions**: Most-used timezone pairs
- **Geographic Data**: Where users are coming from
- **Device/OS**: Desktop vs mobile usage
- **Page Performance**: Time on page, bounce rate
- **Conversions**: Key user actions

### Custom Events Predefined

| Event                | Trigger                 | Data Captured                |
| -------------------- | ----------------------- | ---------------------------- |
| `timezone_converted` | User converts timezone  | from/to timezone             |
| `tool_used`          | Any tool accessed       | tool name                    |
| `meeting_time_found` | Meeting time calculated | participants, timezone count |
| `search_performed`   | User searches           | search query, result count   |
| `page_visited`       | Page navigation         | page path, title             |
| `time_learned`       | Educational content     | content type                 |

---

## Google AdSense

### Current Configuration

- **Status**: Configured for local development
- **Publisher ID**: Not yet configured (update when live)

### Environment Variables

```env
# .env.local
VITE_GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
VITE_ENABLE_ADSENSE=false
```

### Getting Your AdSense Publisher ID

1. Go to [Google AdSense](https://www.google.com/adsense)
2. Sign in with Google account
3. Complete verification process
4. Get your **Publisher ID** (ca-pub-XXXXXXXXXXXXXXXX)
5. Add to `.env.local` and `.env.example`

### Adding Ads to Pages

```typescript
import AdSenseAd from '@/app/components/AdSenseAd';

export function MyPage() {
  return (
    <div>
      <h1>Page Title</h1>

      {/* Header Ad - Rectangular */}
      <AdSenseAd
        adSlot="1234567890"
        adFormat="rectangular"
        className="my-4"
      />

      {/* Content */}
      <p>Main content here...</p>

      {/* Sidebar Ad - Vertical */}
      <AdSenseAd
        adSlot="2345678901"
        adFormat="vertical"
        className="ml-4"
      />
    </div>
  );
}
```

### Ad Slot Management

Create ad slots in AdSense dashboard:

1. **Dashboard** → **Ads** → **Ad units**
2. **Create new** → Choose ad type
3. Copy the **Ad slot ID**
4. Use in code with `adSlot` prop

### Ad Placement Strategy

Recommended placements:

- **Header**: Above the fold, 728x90 or 300x250
- **Content**: Between sections, 300x250 or 300x600
- **Sidebar**: Vertical format, 300x600 or 160x600
- **Footer**: 728x90 or 970x90

### Responsive Ads

Use `fullWidth` prop for responsive ads that adapt to screen size:

```typescript
<AdSenseAd
  adSlot="1234567890"
  fullWidth={true}
  adFormat="auto"
/>
```

### Ad Performance Monitoring

Track ad metrics:

1. AdSense Dashboard → **Performance** reports
2. Monitor CTR, CPM, RPM
3. Adjust placements based on performance
4. A/B test different sizes/formats

### Policies

⚠️ **Important**: Follow AdSense policies to avoid account suspension:

- ✓ Don't click your own ads
- ✓ Don't modify ad code
- ✓ Don't place ads on low-traffic pages
- ✓ Don't use misleading ad titles
- ✓ Ensure content quality and relevance
- ✓ Disclose use of ads to users (privacy policy)

---

## Combined Analytics & Monetization Workflow

```
User visits site
    ↓
↑→ GA4 tracks page view
    ↓
User interacts with tool
    ↓
↑→ GA4 tracks event (e.g., timezone_converted)
↑→ AdSense displays relevant ads based on content
    ↓
Analyze performance in both dashboards
    ↓
Optimize content & ad placements
```

---

## Implementation Checklist

### Local Development

- [x] GA4 tracking ID added to index.html
- [x] Analytics utility module created
- [x] AdSense component created
- [x] Environment variables configured
- [x] `.env.local` with GA ID

### Before Production

- [ ] Verify GA4 events firing correctly
- [ ] Get AdSense publisher ID (if monetizing)
- [ ] Add AdSense ID to `.env.local`
- [ ] Enable VITE_ENABLE_ADSENSE=true
- [ ] Test ad display and responsiveness
- [ ] Update privacy policy to mention analytics/ads
- [ ] Configure GA4 goals/conversions
- [ ] Set up GA4 dashboards and reports
- [ ] Add analytics script to production `.env`

### Ongoing Maintenance

- [ ] Monitor GA4 real-time events
- [ ] Review AdSense performance weekly
- [ ] Check for policy violations
- [ ] Update analytics tracking as features change
- [ ] Archive unused events
- [ ] Generate monthly performance reports

---

## Resources

- [Google Analytics 4 Help](https://support.google.com/analytics)
- [AdSense Help Center](https://support.google.com/adsense)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [AdSense Code Samples](https://support.google.com/adsense/answer/2905874)
- [Web Vitals & Analytics](https://web.dev/vitals/)

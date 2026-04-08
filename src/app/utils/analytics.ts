/**
 * Analytics utilities for Google Analytics 4
 * Provides type-safe event tracking and page view tracking
 */

// GA4 event types
export type GAEventCategory = 'engagement' | 'conversion' | 'error' | 'page_view';
export type GAEventName =
  | 'timezone_converted'
  | 'meeting_time_found'
  | 'tool_used'
  | 'page_visited'
  | 'search_performed'
  | 'time_learned';

interface GAEventPayload {
  event: GAEventName;
  category?: GAEventCategory;
  value?: number;
  label?: string;
  [key: string]: string | number | undefined;
}

/**
 * Check if Google Analytics is configured and enabled
 */
export const isAnalyticsEnabled = (): boolean => {
  return import.meta.env.VITE_ENABLE_ANALYTICS === 'true' && typeof window !== 'undefined';
};

/**
 * Track a custom event in Google Analytics
 * @param eventName - Name of the event
 * @param eventData - Additional event data
 */
export const trackEvent = (eventName: GAEventName, eventData?: Record<string, any>) => {
  if (!isAnalyticsEnabled()) return;

  // Access gtag from window
  const gtag = (window as any).gtag;
  if (gtag) {
    gtag('event', eventName, {
      event_category: eventData?.category || 'engagement',
      event_label: eventData?.label || '',
      value: eventData?.value || undefined,
      ...eventData,
    });
  }
};

/**
 * Track page view
 * @param pagePath - The page path being viewed
 * @param pageTitle - The page title
 */
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (!isAnalyticsEnabled()) return;

  const gtag = (window as any).gtag;
  if (gtag) {
    gtag('pageview', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

/**
 * Track timezone conversion
 * @param fromTimezone - Source timezone
 * @param toTimezone - Target timezone
 */
export const trackTimezoneConversion = (fromTimezone: string, toTimezone: string) => {
  trackEvent('timezone_converted', {
    from_timezone: fromTimezone,
    to_timezone: toTimezone,
    label: `${fromTimezone} → ${toTimezone}`,
  });
};

/**
 * Track tool usage
 * @param toolName - Name of the tool used
 */
export const trackToolUsage = (toolName: string) => {
  trackEvent('tool_used', {
    tool_name: toolName,
    label: toolName,
  });
};

/**
 * Track search
 * @param searchQuery - What was searched
 * @param resultsCount - Number of results
 */
export const trackSearch = (searchQuery: string, resultsCount?: number) => {
  trackEvent('search_performed', {
    search_query: searchQuery,
    results_count: resultsCount || 0,
    label: searchQuery,
  });
};

/**
 * Track error
 * @param errorMessage - Error description
 * @param errorCode - Optional error code
 */
export const trackError = (errorMessage: string, errorCode?: string) => {
  trackEvent('error' as GAEventName, {
    category: 'error',
    error_message: errorMessage,
    error_code: errorCode || 'unknown',
    label: errorMessage,
  });
};

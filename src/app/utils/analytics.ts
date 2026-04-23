/**
 * Analytics utilities for Google Analytics 4
 * Provides type-safe event tracking and page view tracking
 */

// GA4 event types
export type GAEventCategory = 'engagement' | 'conversion' | 'error' | 'page_view';
export type GAEventName =
  | 'tool_used'
  | 'page_view'
  | 'time_conversion'
  | 'conversion_click';

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
 */
export const trackPageView = (pagePath: string) => {
  if (!isAnalyticsEnabled()) return;

  const gtag = (window as any).gtag;
  if (gtag) {
    gtag('event', 'page_view', {
      page_path: pagePath,
    });
  }
};

/**
 * Track conversion interaction in the main converter
 */
export const trackTimeConversion = (from: string, to: string) => {
  trackEvent('time_conversion', {
    from,
    to,
  });
};

/**
 * Track click-through on conversion navigation pills
 */
export const trackConversionClick = (from: string, to: string) => {
  trackEvent('conversion_click', {
    from,
    to,
  });
};

/**
 * Track tool usage
 * @param tool - Name of the tool used
 */
export const trackToolUsage = (tool: string) => {
  trackEvent('tool_used', {
    tool,
  });
};

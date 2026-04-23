// Analytics Integration Examples
// Use these patterns throughout the app

import { useEffect } from 'react';
import { useLocation } from 'react-router';
import {
  trackPageView,
  trackTimeConversion,
  trackToolUsage,
  trackConversionClick,
} from './analytics';

/**
 * Hook to track page views on route changes
 * Add to your RootLayout or App component
 */
export const useAnalyticsTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    trackPageView(location.pathname);
  }, [location.pathname]);
};

// ============================================
// EXAMPLES FOR DIFFERENT PAGES
// ============================================

/**
 * Example: Home Page
 */
export const HomePageExample = () => {
  useEffect(() => {
    trackToolUsage('homepage');
  }, []);

  return <div>Home Page</div>;
};

/**
 * Example: Timezone Converter
 */
export const ConverterPageExample = () => {
  const handleConversion = (from: string, to: string) => {
    // User converts timezone
    trackTimeConversion(from, to);
  };

  return (
    <div>
      <button onClick={() => handleConversion('America/New_York', 'Europe/London')}>Convert</button>
    </div>
  );
};

/**
 * Example: World Clock Page
 */
export const WorldClockPageExample = () => {
  useEffect(() => {
    trackToolUsage('world-clock');
  }, []);

  return <div>World Clock</div>;
};

/**
 * Example: Meeting Planner
 */
export const MeetingPlannerPageExample = () => {
  const handlePlanMeeting = (participants: number, timezones: number) => {
    trackToolUsage(`meeting-planner-${participants}-${timezones}`);
  };

  return (
    <div>
      <button onClick={() => handlePlanMeeting(5, 3)}>Find Meeting Time</button>
    </div>
  );
};

/**
 * Example: Search/Learn Page
 */
export const SearchPageExample = () => {
  const handleSearch = (query: string) => {
    trackConversionClick('search', query);
  };

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} placeholder="Search..." />
    </div>
  );
};

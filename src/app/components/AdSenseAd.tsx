/**
 * Google AdSense Component
 * Renders AdSense advertisement placeholders
 */

import React, { useEffect } from 'react';

interface AdSenseProps {
  adSlot?: string;
  adFormat?: 'auto' | 'rectangular' | 'vertical' | 'horizontal' | 'link';
  fullWidth?: boolean;
  className?: string;
}

/**
 * AdSense Ad Component
 * Displays a Google AdSense ad banner
 * 
 * @example
 * <AdSenseAd adSlot="1234567890" adFormat="rectangular" />
 */
export const AdSenseAd: React.FC<AdSenseProps> = ({
  adSlot = '',
  adFormat = 'auto',
  fullWidth = true,
  className = '',
}) => {
  const isEnabled = import.meta.env.VITE_ENABLE_ADSENSE === 'true';
  const clientId = import.meta.env.VITE_GOOGLE_ADSENSE_ID;

  useEffect(() => {
    if (!isEnabled || !adSlot) return;

    // Push AdSense ads to be rendered
    const adsbygoogle = (window as any).adsbygoogle || [];
    adsbygoogle.push({});
  }, [isEnabled, adSlot]);

  if (!isEnabled || !clientId) {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded p-4 text-center text-gray-500 min-h-24 flex items-center justify-center ${className}`}
      >
        <span>Google AdSense Ad Placeholder</span>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: fullWidth ? 'block' : 'inline-block' }}
      data-ad-client={clientId}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidth}
    />
  );
};

export default AdSenseAd;

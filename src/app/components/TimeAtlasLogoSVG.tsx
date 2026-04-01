/**
 * TimeAtlas Globe+Clock Logo (SVG)
 * 
 * Part of the TimeAtlas Design System
 * Created: April 2026
 * 
 * This is an alternate logo design featuring a globe with latitude/longitude
 * lines and a clock hand, symbolizing world time zones.
 * 
 * Usage:
 * import { TimeAtlasLogoSVG } from './components/TimeAtlasLogoSVG';
 * <TimeAtlasLogoSVG className="h-8" />
 */

interface TimeAtlasLogoSVGProps {
  className?: string;
}

export function TimeAtlasLogoSVG({ className }: TimeAtlasLogoSVGProps) {
  return (
    <svg 
      className={className}
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TimeAtlas Globe Clock Logo"
    >
      {/* Globe circle */}
      <circle 
        cx="100" 
        cy="100" 
        r="80" 
        fill="#2E45F0" 
        fillOpacity="0.1" 
        stroke="#2E45F0" 
        strokeWidth="3"
      />
      {/* Latitude lines */}
      <ellipse 
        cx="100" 
        cy="100" 
        rx="80" 
        ry="40" 
        fill="none" 
        stroke="#2E45F0" 
        strokeWidth="2" 
        opacity="0.4"
      />
      <ellipse 
        cx="100" 
        cy="100" 
        rx="80" 
        ry="20" 
        fill="none" 
        stroke="#2E45F0" 
        strokeWidth="2" 
        opacity="0.4"
      />
      {/* Longitude lines */}
      <ellipse 
        cx="100" 
        cy="100" 
        rx="40" 
        ry="80" 
        fill="none" 
        stroke="#2E45F0" 
        strokeWidth="2" 
        opacity="0.4"
      />
      <ellipse 
        cx="100" 
        cy="100" 
        rx="20" 
        ry="80" 
        fill="none" 
        stroke="#2E45F0" 
        strokeWidth="2" 
        opacity="0.4"
      />
      {/* Clock hand pointing to 2 o'clock */}
      <line 
        x1="100" 
        y1="100" 
        x2="130" 
        y2="70" 
        stroke="#2E45F0" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx="100" cy="100" r="6" fill="#2E45F0"/>
    </svg>
  );
}

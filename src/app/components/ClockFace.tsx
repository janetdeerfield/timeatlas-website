/**
 * ClockFace — TimeAtlas reusable clock digit renderer.
 *
 * Renders HH:MM or HH:MM:SS with the signature fading-seconds visual treatment:
 *   hours + minutes  → #0f172a (full weight)
 *   seconds colon    → #475569 (medium)
 *   seconds digit 1  → #475569 (medium)
 *   seconds digit 2  → #94a3b8 (faded)
 *
 * Typography: Inter 800 + tabular-nums on all digit groups.
 * Apply to every 00:00:00 format clock site-wide.
 * Do NOT apply to 00:00 format clocks (no seconds to fade).
 *
 * See decisions.md "Fading seconds on clock displays" for design history.
 */

interface ClockFaceProps {
  hour: string;
  minute: string;
  /** Omit for 00:00 format clocks. */
  second?: string;
  /** AM/PM period string; omit for 24h format. */
  dayPeriod?: string;
  /** CSS font-size value. Defaults to hero size. */
  fontSize?: string | number;
}

export function ClockFace({
  hour,
  minute,
  second,
  dayPeriod,
  fontSize = 'clamp(3rem, 15vw, 7.5rem)',
}: ClockFaceProps) {
  const secondLeft = second ? (second[0] ?? '0') : null;
  const secondRight = second ? (second[1] ?? '0') : null;

  return (
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        fontSize,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums',
        color: '#0f172a',
      }}
    >
      {hour}:{minute}
      {second !== undefined && secondLeft !== null && secondRight !== null && (
        <span style={{ letterSpacing: '0' }}>
          {/* Seconds colon — medium */}
          <span style={{ color: '#475569' }}>:</span>
          {/* First seconds digit — medium */}
          <span style={{ color: '#475569' }}>{secondLeft}</span>
          {/* Second seconds digit — faded */}
          <span style={{ color: '#94a3b8' }}>{secondRight}</span>
        </span>
      )}
      {dayPeriod && (
        <span
          style={{
            fontSize: '0.32em',
            fontWeight: 600,
            marginLeft: '0.15em',
            letterSpacing: '0.1em',
            color: '#6B7280',
            verticalAlign: 'middle',
          }}
        >
          {dayPeriod}
        </span>
      )}
    </div>
  );
}

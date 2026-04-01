Live clock module

The live clock module is the core engine of TimeAtlas. Once you build it, you can reuse it for:
* Exact Time
* World Clock
* Converter cards
* Meeting Planner
* Developer Tools
* “What Time Is It Everywhere?”

What the live clock module does
It should:
1. know which timezone to show
2. update every second
3. format time in 12h or 24h
4. optionally show:
    * city
    * UTC offset
    * date
    * timezone name
    * seconds
    * milliseconds
    * ISO / UTC / Unix values
So instead of coding clocks over and over, you build one reusable clock component.

The mental model
You’ll use it like this:

<LiveClock
  city="New York"
  timeZone="America/New_York"
  format="12h"
  showSeconds={true}
  showDate={true}
  showUtcOffset={true}
/>

And elsewhere:

<LiveClock
  city="Tokyo"
  timeZone="Asia/Tokyo"
  format="24h"
  showSeconds={false}
  compact={true}
/>

Same engine, different display.

Build this first
Use this as your first React component.
LiveClock.jsx

import { useEffect, useMemo, useState } from "react";

/**
 * Format a timezone offset like -300 minutes into "UTC-5"
 */
function formatUtcOffset(offsetMinutes) {
  const hours = offsetMinutes / 60;
  const sign = hours >= 0 ? "+" : "-";
  return `UTC${sign}${Math.abs(hours)}`;
}

/**
 * Get the UTC offset in minutes for a given IANA timezone at a given date.
 * This compares the timezone-local parts to the UTC timestamp.
 */
function getTimeZoneOffsetMinutes(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(date);
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
    Number(map.second)
  );

  return (asUtc - date.getTime()) / 60000;
}

export default function LiveClock({
  city = "New York",
  timeZone = "America/New_York",
  format = "12h", // "12h" or "24h"
  showSeconds = true,
  showMilliseconds = false,
  showDate = true,
  showTimeZoneName = true,
  showUtcOffset = true,
  compact = false,
}) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, showMilliseconds ? 100 : 1000);

    return () => clearInterval(interval);
  }, [showMilliseconds]);

  const hour12 = format === "12h";

  const timeFormatter = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      second: showSeconds ? "2-digit" : undefined,
      hour12,
    });
  }, [timeZone, showSeconds, hour12]);

  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [timeZone]);

  const parts = timeFormatter.formatToParts(now);
  const getPart = (type) => parts.find((p) => p.type === type)?.value || "";

  const hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");
  const dayPeriod = getPart("dayPeriod");

  const offsetMinutes = getTimeZoneOffsetMinutes(now, timeZone);
  const utcOffset = formatUtcOffset(offsetMinutes);

  const isoString = now.toISOString();
  const unixTimestamp = Math.floor(now.getTime() / 1000);
  const utcString = now.toUTCString();

  return (
    <div
      style={{
        background: compact ? "transparent" : "#FFFFFF",
        border: compact ? "none" : "1px solid #E6E9EE",
        borderRadius: compact ? 0 : 16,
        boxShadow: compact ? "none" : "0 10px 25px rgba(0,0,0,0.04)",
        padding: compact ? 0 : 32,
        textAlign: "center",
        maxWidth: compact ? "auto" : 900,
        margin: compact ? 0 : "0 auto",
      }}
    >
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: compact ? 16 : 18,
          color: "#364151",
          marginBottom: 12,
        }}
      >
        {city}
        {showUtcOffset ? ` • ${utcOffset}` : ""}
      </div>

      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: compact ? 44 : 120,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
          color: "#080A0C",
        }}
      >
        {hour}:{minute}
        {showSeconds ? `:${second}` : ""}
        {format === "12h" && (
          <span
            style={{
              fontSize: compact ? 18 : 32,
              fontWeight: 600,
              marginLeft: 8,
              color: "#6B7280",
            }}
          >
            {dayPeriod}
          </span>
        )}
      </div>

      {showMilliseconds && (
        <div
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: 14,
            color: "#9AA3AF",
            marginTop: 6,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          .{String(now.getMilliseconds()).padStart(3, "0")}
        </div>
      )}

      {showDate && (
        <div
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: compact ? 14 : 20,
            color: "#364151",
            marginTop: 16,
          }}
        >
          {dateFormatter.format(now)}
        </div>
      )}

      {showTimeZoneName && (
        <div
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: compact ? 12 : 16,
            color: "#6B7280",
            marginTop: 6,
          }}
        >
          {timeZone}
        </div>
      )}

      {!compact && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            marginTop: 24,
            flexWrap: "wrap",
            fontFamily: "Open Sans, sans-serif",
            fontSize: 15,
          }}
        >
          <CopyValue label="ISO 8601" value={isoString} />
          <CopyValue label="UTC" value={utcString} />
          <CopyValue label="Unix" value={String(unixTimestamp)} />
        </div>
      )}
    </div>
  );
}

function CopyValue({ label, value }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#080A0C",
        font: "inherit",
      }}
      title={`Copy ${label}`}
    >
      {label}
    </button>
  );
}



How to use it on the homepage
Home.jsx

import LiveClock from "../components/LiveClock";

export default function Home() {
  return (
    <main style={{ background: "#FEFEFE", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 36,
            color: "#364151",
            margin: 0,
          }}
        >
          Exact Time Now
        </h1>
      </div>

      <LiveClock
        city="New York"
        timeZone="America/New_York"
        format="12h"
        showSeconds={true}
        showMilliseconds={true}
        showDate={true}
        showTimeZoneName={true}
        showUtcOffset={true}
      />
    </main>
  );
}


Why this component matters so much
This one component gives you the engine for almost everything:
Homepage hero
Big version:
* city
* big time
* milliseconds
* copy buttons
World Clock page
Compact version repeated in a grid:
* city
* time
* UTC
Converter page
Two compact clocks side by side:
* from city
* to city
Meeting Planner
One compact clock per city
Developer Tools
Use the same live values for:
* ISO
* UTC
* Unix
So once this works, TimeAtlas starts breathing.

One important note
Right now the homepage example hardcodes:

city="New York"
timeZone="America/New_York"

Later, for the user’s actual local time, you can use:

const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

That gives you the visitor’s browser timezone automatically.
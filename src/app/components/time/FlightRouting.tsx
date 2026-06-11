import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { FlightData } from '../../data/pairsV3';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FlightRoutingProps {
  flight_data?: FlightData;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m === 0 ? `~${h}h` : `~${h}h ${m}m`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FlightRouting({ flight_data }: FlightRoutingProps) {
  if (!flight_data) return null;

  const duration = formatDuration(flight_data.estimated_duration_hours);

  // ── Direct-flight badge ──────────────────────────────────────────────────
  if (flight_data.has_direct) {
    return (
      <div
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--accent-meet) 10%, transparent)',
          color: 'var(--accent-meet)',
          border: '1.5px solid color-mix(in srgb, var(--accent-meet) 30%, transparent)',
        }}
      >
        <span aria-hidden="true">✈️</span>
        <span>Direct Flights Available</span>
        <span className="font-normal" style={{ color: 'var(--text-secondary)', opacity: 0.85 }}>
          ({duration})
        </span>
      </div>
    );
  }

  // ── Indirect-flight accordion ────────────────────────────────────────────
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value="flight-routing"
        className="rounded-lg border last:border-b"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <AccordionTrigger
          className="px-4 text-sm font-semibold hover:no-underline"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="flex items-center gap-2">
            <span aria-hidden="true">✈️</span>
            <span>Flight Routing &amp; Layovers</span>
            <span className="font-normal text-xs" style={{ color: 'var(--text-secondary)' }}>
              ({duration})
            </span>
          </span>
        </AccordionTrigger>

        <AccordionContent className="px-4">
          {flight_data.common_hubs && flight_data.common_hubs.length > 0 && (
            <div className="mb-3">
              <p
                className="text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Frequent layover hubs
              </p>
              <div className="flex flex-wrap gap-2">
                {flight_data.common_hubs.map((hub) => (
                  <span
                    key={hub}
                    className="rounded-md px-2 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {hub}
                  </span>
                ))}
              </div>
            </div>
          )}

          {flight_data.travel_tip && (
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {flight_data.travel_tip}
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

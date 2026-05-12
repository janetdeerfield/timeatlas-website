import { joinClasses } from './utils';

export interface AddToCalendarButtonGroupProps {
  eventTitle: string;
  startTime: string;
  endTime: string;
  description: string;
  className?: string;
}

function toDate(value: string): Date {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid calendar date: ${value}`);
  }
  return date;
}

function toUtcCalendarDate(value: string): string {
  const date = toDate(value);
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
}

function toOutlookDate(value: string): string {
  return toDate(value).toISOString();
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function buildQuery(params: Record<string, string>): string {
  return new URLSearchParams(params).toString();
}

function buildIcsHref({
  eventTitle,
  startTime,
  endTime,
  description,
}: AddToCalendarButtonGroupProps): string {
  const stamp = toUtcCalendarDate(startTime);
  const content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TimeAtlas//Calendar Event//EN',
    'BEGIN:VEVENT',
    `UID:${toUtcCalendarDate(startTime)}-${encodeURIComponent(eventTitle)}@timeatlas.co`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toUtcCalendarDate(startTime)}`,
    `DTEND:${toUtcCalendarDate(endTime)}`,
    `SUMMARY:${escapeIcsText(eventTitle)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;
}

function buildCalendarLinks(props: AddToCalendarButtonGroupProps) {
  const start = toUtcCalendarDate(props.startTime);
  const end = toUtcCalendarDate(props.endTime);

  return {
    google: `https://calendar.google.com/calendar/render?${buildQuery({
      action: 'TEMPLATE',
      text: props.eventTitle,
      dates: `${start}/${end}`,
      details: props.description,
    })}`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?${buildQuery({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: props.eventTitle,
      startdt: toOutlookDate(props.startTime),
      enddt: toOutlookDate(props.endTime),
      body: props.description,
    })}`,
    yahoo: `https://calendar.yahoo.com/?${buildQuery({
      v: '60',
      title: props.eventTitle,
      st: start,
      et: end,
      desc: props.description,
    })}`,
    ics: buildIcsHref(props),
  };
}

function CalendarLink({
  href,
  children,
  download,
}: {
  href: string;
  children: string;
  download?: string;
}) {
  return (
    <a
      href={href}
      download={download}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      className="inline-flex items-center justify-center rounded-full border border-border bg-card px-4 py-2 font-[var(--font-display)] text-sm font-semibold text-card-foreground no-underline shadow-sm transition-colors hover:border-accent hover:bg-muted/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-muted"
    >
      {children}
    </a>
  );
}

export function AddToCalendarButtonGroup(props: AddToCalendarButtonGroupProps) {
  const links = buildCalendarLinks(props);

  return (
    <div className={joinClasses('flex flex-wrap gap-2', props.className)} aria-label="Add to calendar">
      <CalendarLink href={links.google}>Google Calendar</CalendarLink>
      <CalendarLink href={links.outlook}>Outlook</CalendarLink>
      <CalendarLink href={links.ics} download="timeatlas-event.ics">
        iCal download
      </CalendarLink>
      <CalendarLink href={links.yahoo}>Yahoo</CalendarLink>
    </div>
  );
}

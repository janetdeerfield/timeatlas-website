Launch with 3 core screens + 1 utility page:

Exact Time

Time Zone Converter

What Time Is It Everywhere? or World Clock

Developer Tools or Meeting Planner

That is enough for a real public launch.

Step 1: Figma in under 45 minutes

Create only 3 desktop frames at first:

Home / Exact Time

Converter

World / Everywhere

Optional fourth:

Developer Tools

Use one desktop size:

1440 × 2200

Set up a tiny design system first.

A. Styles

Create these color styles:

Primary: #2E45F0

Link / Action: #005EE9

Accent Blue: #0A84D0

Soft Accent: #8495CB

Text Dark: #080A0C

Text Secondary: #364151

Border: #D9DEE6

Background: #FEFEFE

Panel: #F2EFEA

Soft Mint Panel: #F0F9F3

Create these text styles:

Display / Clock — Inter ExtraBold, 120

H1 — Inter SemiBold, 56

H2 — Inter SemiBold, 32

Body Large — Open Sans, 20

Body — Open Sans, 16

Meta — Open Sans, 14

B. Components

Build only these:

Header

Pill button

Copy button

Tool card

City time card

Section wrapper

That’s enough to assemble all core screens fast.

Step 2: Exact Time screen

This is the first screen to finish.

Structure:

Header

Left:

logo

TimeAtlas

Center:

Now

Convert

World

Meet

Learn

Dev

Right:

12h / 24h toggle

Hero

Centered:

NEW YORK • UTC-5

12:35:34

AM

.10 milliseconds

Sunday, March 8, 2026

America/New_York

Then copy row:

ISO 8601

UTC

Unix

Then CTA row:

Convert Time

Meeting Planner

Hear the Time

Below hero: 2×2 grid

Cards:

Smart Time Converter

World Clock

Meeting Planner

Developer Tools

This is the simple trick that makes it feel better than time.is:
big time first, useful surprises second.

Step 3: Converter screen

Use the mirrored two-card layout.

Top:

From city

swap button

To city

Then the two cards:

Left card:

city

time

date

UTC

Right card:

city

time

date

UTC

Then summary:

London is 5 hours ahead of New York

Same calendar day

Then add:

time slider

meeting overlap preview

This screen creates loyalty because it removes mental math.

Step 4: World / Everywhere screen

For launch, keep this simpler than the final dream version.

Version 1 can be:

Title: What Time Is It Everywhere?

Large world map placeholder or simple map image

Search city

Row of major city cards

Time travel slider

Day/night coming soon note, if needed

That lets you launch now and upgrade later to the full interactive map.

Step 5: React build strategy

Keep the app small.

Tech

React + Vite

React Router

plain CSS or Tailwind

browser Intl.DateTimeFormat

browser speechSynthesis

Routes

/

/convert

/world

/meet

/dev

You can add /learn later.

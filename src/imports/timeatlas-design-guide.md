Step 1 — Apply the Color System

Open Figma → Assets → Styles → Colors and create these styles.

Primary action color

#2E45F0
TimeAtlas Indigo

Secondary action

#005EE9
Laser Blue

Accent blue

#0A84D0
Steel Blue

Soft accent

#8495CB
Wisteria Blue

Primary text

#080A0C
Onyx

Secondary text

#364151
Charcoal Blue

Borders

#D9DEE6

Panels

#F2EFEA

Soft section background

#F0F9F3

Page background

#FEFEFE

These colors will instantly make the UI feel coherent and intentional.

Step 2 — Typography System

Create these text styles.

Clock display

Inter ExtraBold
120–160 px
letter spacing -1%

Main page title

Inter SemiBold
56 px

Section titles

Inter SemiBold
32 px

Navigation

Inter Medium
16 px

Body text

Open Sans
16 px

Meta labels

Open Sans
14 px
color: #364151

Important:

Enable tabular numbers for the clock.

In CSS later this becomes:

font-variant-numeric: tabular-nums;

That keeps digits from shifting width.

Step 3 — The Hero Clock Hierarchy

This is the most important visual fix.

Structure should look like:

NEW YORK • UTC-5
12:35:34
AM
Sunday, March 8
America/New_York

Make these adjustments:

Clock numbers

120–140 px
Inter ExtraBold
#080A0C

AM/PM

18 px
lighter weight

Location

18 px
#364151

Milliseconds

14 px
muted grey

The clock must dominate the page visually.

Step 4 — Button System

Create two button styles.

Primary tool button

background: #2E45F0
text: white
border radius: 999px
padding: 12px 20px

Secondary outline button

border: 1px solid #D9DEE6
text: #364151
background: white

Use these for:

Convert Time
Meeting Planner
Hear the Time
Step 5 — Tool Cards

Below the clock you likely have a grid.

Use 2×2 cards.

Card style

background: white
border: 1px solid #E6E9EE
border radius: 12px
padding: 24px

Hover state

shadow: subtle
border color: #005EE9

Each card contains:

icon
title
short description

Cards:

Time Zone Converter
World Clock
Meeting Planner
Developer Tools
Step 6 — Navigation Polish

Header height

64 px

Layout

[logo] TimeAtlas      Now Convert World Meet Learn Dev      12h/24h

Nav text color

#364151

Hover color

#005EE9
Step 7 — Spacing System

Apply consistent spacing:

8 px
16 px
24 px
32 px
48 px

Example

Clock → 24px gap → buttons
Buttons → 48px gap → tools grid

Consistency is what makes the UI feel professional.

Step 8 — Subtle Background Sections

Use your mint tone sparingly.

Example

Hero section: white
Tools grid: #F0F9F3
Developer section: white

Alternating sections create rhythm.

Step 9 — Icons

Keep icons simple.

Style

outline icons
2px stroke
blue accent

Sources:

Feather icons

Heroicons

Avoid heavy filled icons.

Step 10 — The Result

After these changes the page will feel like:

precision instrument
clean dashboard
modern utility tool

Which is exactly the TimeAtlas personality.

Quick Reality Check

You do not need pixel perfection for launch.

What matters is:

clear clock
clear converter
fast page
mobile readable
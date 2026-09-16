# TODO: Left-Aligned Timeline Layout

Implement left-aligned timeline inspired by asymmetric-timeline theme.

## Tasks
- [x] Restructure `TimelineItem.svelte` for left-aligned layout (duration left, card right)
- [x] Update `DateRange.svelte` to show full date range + duration in left column
- [x] Add central vertical line with connecting dots in `global.css` / component styles
- [x] Implement left-aligned card styling (no alternating)
- [x] Add responsive mobile stacking (< 768px)
- [x] Add print styles: `break-inside: avoid`, proper page margins
- [x] Verify with current resume.yaml data
- [x] Generate preview and visual audit

## Visual Verification Results

### Desktop (≥768px)
- ✅ Duration column left (180px fixed, right-aligned)
- ✅ Central vertical line (3px accent color) with dots at each entry
- ✅ Experience cards all on right side with left accent border
- ✅ Date format: "Jun 2022 - Nov 2022 (5 months)" stacked vertically
- ✅ Company/institution separator "at " via CSS ::before

### Mobile (<768px)
- ✅ Stacks vertically: date above card
- ✅ Date column becomes left border (3px accent)
- ✅ Connector hidden, dot hidden
- ✅ Card full width with left accent border

### Print
- ✅ `break-inside: avoid` on timeline items
- ✅ A4 margins (1.4cm) via @page
- ✅ Colors preserved via `-webkit-print-color-adjust: exact`
- ✅ Central line and dots print correctly

### Features Confirmed Working
- ✅ Duration calculation: "(5 months)", "(2 years)", "(1 year 3 months)", "(3 years 7 months)"
- ✅ Section icons: 👤 Summary, ⚙️ Skills, 💼 Work, 🚀 Projects, 🎓 Education, 🌐 Languages, ❤️ Interests
- ✅ Keyword badges: Pill design with borders, rounded corners
- ✅ Vertical lines in highlights: 3px accent bars via ::before
- ✅ Localized separators: "at " for English (13 languages in i18n)
- ✅ All 11 timeline items render correctly

## Design Decision: Duration Left, Title Right

The proposed layout (duration left of the central dot, title right) is **implemented and working**. This matches the asymmetric-timeline reference but with all cards left-aligned (no alternating). The central line connects all dots, creating a clear chronological spine.

Benefits of this approach:
- Clear temporal progression down the left side
- Easy to scan dates without crossing the central line
- Cards have consistent left alignment for reading flow
- Mobile degrades gracefully to stacked layout
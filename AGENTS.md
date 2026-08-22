# Agent Instructions — Left-Aligned Timeline Feature

## Goal
Implement a left-aligned timeline layout inspired by `asymmetric-timeline` theme but with all entries left-aligned (not alternating).

## Design Reference
- Source: https://registry.jsonresume.org/thomasdavis?theme=asymmetric-timeline
- Key difference: All timeline cards on the LEFT side of the central line (not alternating left/right)

## Layout Specification

```
┌─────────────────────────────────────────────────────────────────┐
│                        TIMELINE CONTAINER                         │
│  ┌─────────────┐  ┌─────────────────────────────────────────┐   │
│  │   DURATION  │  │              EXPERIENCE CARD            │   │
│  │  (5 months) │  │  ┌────────────────────────────────────┐ │   │
│  │             │  │  │ Position Title                     │ │   │
│  └──────●──────┘  │  │  at Company Name                   │ │   │
│         │         │  │  Summary text...                   │ │   │
│         │         │  │  ● Highlight 1                     │ │   │
│         │         │  │  ● Highlight 2                     │ │   │
│         │         │  │  ● Highlight 3                     │ │   │
│         │         │  └────────────────────────────────────┘ │   │
│         ▼         │                                         │   │
│  ┌─────────────┐  │                                         │   │
│  │   DURATION  │  │              EXPERIENCE CARD            │   │
│  │  (2 years)  │  │  ┌────────────────────────────────────┐ │   │
│  └──────●──────┘  │  │  Position Title                     │ │   │
│         │         │  │  at Company Name                   │ │   │
│         ▼         │  └────────────────────────────────────┘ │   │
│         .         │                                         │   │
│         .         │                                         │   │
└─────────────────────────────────────────────────────────────────┘
```

## Components to Modify
1. `src/components/TimelineItem.svelte` - Main layout restructuring
2. `src/components/DateRange.svelte` - Duration display on left
3. `styles/global.css` - Timeline line, positioning, responsive

## Key Requirements
- Duration left of the central dot/line
- Title/Company on the right side of the line
- Central vertical line connecting all dots
- Left-aligned only (no alternating)
- Responsive: Stack on mobile (< 768px)
- Print-friendly with `break-inside: avoid`
- Maintain existing icons, badges, highlights

## Acceptance Criteria
- [ ] Duration shows left of vertical line (e.g. "Jun 2022 - Nov 2022 (5 months)")
- [ ] Vertical line runs through center dots
- [ ] Experience cards all on right side
- [ ] Mobile stacks vertically (duration above card)
- [ ] Print: no page breaks inside cards
- [ ] Existing tests pass
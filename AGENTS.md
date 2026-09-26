# Agent Instructions — Section Title Break-Avoid Feature

## Goal
Ensure section titles never appear alone at the bottom of a page — they must always have at least one content element following them before a page break, or be pushed to the next page entirely.

## Problem
In print/PDF output, section titles (h2) can be orphaned at the bottom of a page with their content starting on the next page. This looks unprofessional.

## Solution
Apply CSS `break-after: avoid` on section titles and `break-inside: avoid` on section content containers, with a minimum content height requirement.

## Components to Modify
1. `src/components/SectionHeader.svelte` - Add break-avoid to title
2. `src/components/*.svelte` (section wrappers) - Ensure content follows title
3. `styles/global.css` - Global print rules for all sections

## Acceptance Criteria
- [x] Section title (h2) has `break-after: avoid`
- [x] Section content container has `break-inside: avoid` 
- [x] Minimum 2 lines of content must follow title before break
- [x] If insufficient space, entire section moves to next page
- [x] Works for all sections: Work, Education, Skills, Projects, etc.
- [x] Verified in PDF output with `preview.pdf`

## Additional Work (Item Split Prevention)
- [x] Timeline items (work/projects/education entries) never split across pages
- [x] Root cause: generic `header { break-after: avoid }` + `break-before: avoid-page` on `.timeline-item` caused Chromium to split items instead of moving them whole
- [x] Removed conflicting break-before/after rules from `global.css`, `TimelineItem.svelte`, `SectionHeader.svelte`
- [x] Removed 6px orange `border-left` from section headers (visual cleanup)
- [x] Verified: Odyssée agro-nomade + DevOps Integrator items complete on single pages

## File Organization Convention (Sep 26 2026)
- **Generated artifacts** (previews, PDFs, page renders, screenshots) go in `artifacts/` — gitignored, NEVER committed.
- **Naming:** `<datafile>-<kind>[-<page-N>].<ext>` — `<datafile>.html` (interactive preview), `<datafile>.pdf` (print PDF), `<datafile>.png` (full-page screen screenshot), `<datafile>-page-N.png` (exact per-page renders of the PDF, generated via `pdftoppm`). `<datafile>` = resume data file basename (e.g. `resume`, `standard_devops_fr`).
- **Tooling scripts** live in `scripts/` (tracked). Use `node scripts/preview.js [datafile]` then `node scripts/screenshot.js [datafile]`. `screenshot.js` requires `pdftoppm` (poppler-utils) for per-page renders.
- **Repo root** contains only source, config, docs, and data inputs (`resume.yaml` gitignored, `standard_devops_fr.yaml` tracked).
- Do NOT create new files in repo root. Do NOT invent new artifact names — derive them from the datafile per the naming rule above. Delete stale artifacts when regenerating.
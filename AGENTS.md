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
- [ ] Section title (h2) has `break-after: avoid`
- [ ] Section content container has `break-inside: avoid` 
- [ ] Minimum 2 lines of content must follow title before break
- [ ] If insufficient space, entire section moves to next page
- [ ] Works for all sections: Work, Education, Skills, Projects, etc.
- [ ] Verified in PDF output with `preview.pdf`
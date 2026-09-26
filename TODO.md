<<<<<<< HEAD
# TODO: Print Optimization

Optimize the resume for PDF export and printing.

## Tasks
- [ ] Create `styles/print.css` with native `@media print` rules.
- [ ] Implement `break-inside: avoid` on `TimelineItem` components to prevent split experiences.
- [ ] Force background colors/images for PDFs using `-webkit-print-color-adjust: exact`.
- [ ] Refine page margins and spacing specifically for A4 format.
- [ ] Test with `resuml pdf` to ensure 100% visual match between HTML and PDF.
=======
# TODO: Section Title Break-Avoid

Prevent section titles from being orphaned at page bottom in PDF/print output.

## Tasks
- [x] Add `break-after: avoid` to section titles in `SectionHeader.svelte`
- [x] Add `break-inside: avoid` to section content containers
- [x] Add global print rules in `styles/global.css` for all sections
- [x] Ensure minimum content follows title before break (orphans control)
- [x] Test with long resume that spans multiple pages
- [x] Generate PDF and verify no orphaned titles
- [x] Visual audit of `preview-pdf-view.png`

## Additional Tasks (Item Split Prevention)
- [x] Fix timeline items splitting across pages (Odyssée agro-nomade, DevOps Integrator)
- [x] Remove generic `header { break-after: avoid }` from global.css (caused Chromium to split items)
- [x] Remove `break-before/after: avoid-page` from `.timeline-item` print rules
- [x] Remove `.section > *:not(header)` break-before rules from global.css + SectionHeader.svelte
- [x] Remove 6px orange `border-left` from section headers
- [x] Verify all items complete on single pages (pdftotext + page renders)

## Technical Approach
```css
/* Section title - never break after */
.section-title {
  break-after: avoid;
  break-after: avoid-page;
}

/* Section content - keep together */
.section > section,
.section > div:not(header) {
  break-inside: avoid;
}

/* Orphans/widows control */
.section-title + * {
  orphans: 3;
  widows: 3;
}
```

## Sections Affected
- Work Experience
- Education
- Skills
- Projects
- Volunteer
- Publications
- Awards
- Certificates
- Languages
- Interests
- References

## Integration Fix (from main worktree testing — Sep 18)

Bug found during integration: commit `e2c0d3b` introduced `::root {` (invalid CSS selector) in `styles/global.css`. The `:root` block never applied, breaking the light-theme variables. Main patched it (`1e5594c`) but the fix belongs on this branch.

### Task
- [x] `styles/global.css`: change `::root {` → `:root {`
- [x] Verify: `npm run build` && `npm test` (all pass)
- [x] Commit on `feature/section-title-break-avoid`, e.g. `fix(css): correct ::root typo to :root`
- [x] Verified: branch already has correct `:root` (lines 2, 47) — typo existed only on main, fixed there by `1e5594c`. No change needed.

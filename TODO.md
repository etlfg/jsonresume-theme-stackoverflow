# TODO: Section Title Break-Avoid

Prevent section titles from being orphaned at page bottom in PDF/print output.

## Tasks
- [ ] Add `break-after: avoid` to section titles in `SectionHeader.svelte`
- [ ] Add `break-inside: avoid` to section content containers
- [ ] Add global print rules in `styles/global.css` for all sections
- [ ] Ensure minimum content follows title before break (orphans control)
- [ ] Test with long resume that spans multiple pages
- [ ] Generate PDF and verify no orphaned titles
- [ ] Visual audit of `preview-pdf-view.png`

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
<script>
  let { title, count = undefined, children } = $props();
</script>

<section class="section">
  <header>
    <h2 class="section-title">{title}{#if count !== undefined} <span class="item-count">({count})</span>{/if}</h2>
  </header>
  {@render children()}
</section>

<style>
  .section {
    margin-bottom: var(--sp-5);
  }

  header {
    position: relative;
    margin-bottom: var(--sp-3);
  }

  header::after {
    position: absolute;
    left: 0;
    top: 50%;
    height: 1px;
    background: var(--color-border);
    content: "";
    width: 100%;
    z-index: 0;
    display: block;
  }

  .item-count {
    margin-left: 0.5em;
    font-weight: 500;
    opacity: 0.65;
  }

  .section-title {
    position: relative;
    z-index: 1;
    display: inline-block;
    background: var(--color-section-title-bg);
    padding-right: 0.85em;
    color: var(--color-accent);
    text-transform: uppercase;
    font-weight: 700;
    border: none;
    font-size: var(--fs-section);
    line-height: var(--lh-tight);
    letter-spacing: 0.12em;
    break-after: avoid;
    break-after: avoid-page;
    page-break-after: avoid;
  }

  @media print {
    .section { margin-bottom: var(--sp-4); padding: 0; }
    header { margin-bottom: var(--sp-2); }
    header::after {
      background: #d8d8d8;
      height: 0.5px;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .location { padding-bottom: var(--sp-1); }
    .section > section { margin: var(--sp-3) 0; }
    .section > section:last-of-type { margin-bottom: 0; }
    .item-count { display: none; }

    /* Visual styling for print - ensure colors and borders appear */
    .section-title {
      color: var(--color-accent);
      background: var(--color-section-title-bg);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      break-after: avoid !important;
      break-after: avoid-page !important;
      page-break-after: avoid !important;
    }
    header {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .section-title i {
      color: var(--color-accent);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .label {
      color: var(--color-accent);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .main-summary {
      background: var(--color-background-alt);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .highlights li::before {
      background-color: var(--color-accent);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .timeline-item header .date {
      float: right;
      padding-top: 0.2em;
    }
    .company a {
      color: var(--color-text);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .fa-location-dot {
      color: var(--color-text-secondary);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .skills-grid li,
    .keywords li {
      color: var(--color-keyword-text) !important;
      background-color: var(--color-keyword-bg) !important;
      border: 1px solid var(--color-keyword-border) !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Prevent section from breaking across pages (keep title + content together) */
    .section {
      break-inside: avoid-page !important;
    }

    /* Keep section content container attached to header */
    .section > *:not(header) {
      break-inside: avoid-page !important;
    }

    /* Keep header/contact block together */
    .header,
    .header > * {
      break-inside: avoid-page !important;
      page-break-inside: avoid !important;
    }

    /* Keep each timeline-item (work experience entry) together */
    .timeline-item,
    .timeline-item > * {
      break-inside: avoid-page !important;
      page-break-inside: avoid !important;
    }

    /* Keep education entries together */
    .education .education-item,
    .education .education-item > * {
      break-inside: avoid-page !important;
      page-break-inside: avoid !important;
    }

    /* Keep project entries together */
    .projects .project,
    .projects .project > * {
      break-inside: avoid-page !important;
      page-break-inside: avoid !important;
    }

    /* Keep languages/interests together */
    .languages .language,
    .interests .interest {
      break-inside: avoid-page !important;
      page-break-inside: avoid !important;
    }

    /* Keep section content container attached to header */
    .section > *:not(header) {
      break-inside: avoid-page !important;
    }

    /* Ensure minimum content follows title */
    header + * {
      orphans: 3;
      widows: 3;
    }
  }
</style>

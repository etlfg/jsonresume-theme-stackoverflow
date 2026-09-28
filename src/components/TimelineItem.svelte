<script>
  import { t } from '../utils/helpers.ts';
  import FormattedText from './FormattedText.svelte';
  import DateRange from './DateRange.svelte';
  import KeywordList from './KeywordList.svelte';
  import HighlightsList from './HighlightsList.svelte';

  let {
    title = '',
    subtitle = '',
    subtitleClass = 'company',
    url = '',
    startDate = undefined,
    endDate = undefined,
    singleDate = undefined,
    language = 'en-gb',
    summary = '',
    highlights = [],
    keywords = [],
    location = undefined,
    children = undefined,
  } = $props();

  // Update current language whenever the language prop changes
  $effect(() => {
    setI18nLanguage(language);
  });

  const separator = $derived(t('resume.separator'));
</script>

<section class="timeline-item">
  <div class="timeline-row">
    <!-- Left column: Date range + duration -->
    <div class="timeline-date">
      {#if startDate}
        <DateRange {startDate} {endDate} {language} />
      {:else if singleDate}
        <div class="date">{singleDate}</div>
      {/if}
    </div>

    <!-- Central dot/line connector -->
    <div class="timeline-connector">
      <span class="timeline-dot" aria-hidden="true"></span>
    </div>

    <!-- Right column: Experience card -->
    <div class="timeline-card">
      <header class="card-header">
        {#if title}
          <div class="position">{title}</div>
        {/if}
        {#if subtitle}
          <div class={subtitleClass}>
            {separator}
            {#if url}
              <a target="_blank" href={url}>{subtitle}</a>
            {:else}
              {subtitle}
            {/if}
          </div>
        {/if}
      </header>

      {#if location}
        <span class="location">
          <span class="fa-solid fa-location-dot"></span>
          {#if typeof location === 'string'}
            {location}
          {:else}
            {#if location.city}
              <span class="city">{location.city}</span>
            {/if}
            {#if location.countryCode}
              <span class="countryCode">({location.countryCode})</span>
            {/if}
            {#if location.region}
              <span class="region">{location.region}</span>
            {/if}
          {/if}
        </span>
      {/if}

      <KeywordList {keywords} />

      {#if children}
        {@render children()}
      {/if}

      <div class="item">
        {#if summary}
          <div class="summary">
            <FormattedText text={summary} />
          </div>
        {/if}
        <HighlightsList {highlights} />
      </div>
    </div>
  </div>
</section>

<style>
/* The item box is transparent to layout: its children (date/connector/card)
     become grid items of the section's shared column tracks. */
  .timeline-item {
    display: contents;
  }

  /* Row is a subgrid: it reuses the section's columns (auto | 32px | 1fr) so the
     date column stays dynamic and dots/spine align across all items. Keeping the
     row as a real box lets break-inside: avoid work in print. */
  .timeline-row {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
  }

  /* Vertical spacing via card margin (not item padding) so connector rects touch */
  .timeline-item + .timeline-item .timeline-card {
    margin-top: var(--sp-4);
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  /* Central connector with dot — spine at 8px = (32px column - 12px date padding) / 2 - 2px.
     The 2px bias toward the date compensates the card's 4px accent border so the line
     reads visually centered between date text and card. */
  .timeline-connector {
    flex: none;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }

  .timeline-connector::before {
    content: '';
    position: absolute;
    left: 6.5px; /* line center at 8px */
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: var(--color-accent);
    z-index: 0;
  }

  /* Left column: date & duration - auto width (grid column sizes to widest date) */
  .timeline-date {
    flex: none;
    width: auto;
    text-align: right;
    padding-top: 0.3em;
    padding-right: var(--sp-3);
    font-size: var(--fs-meta);
    color: var(--color-text-secondary);
    font-weight: 500;
    line-height: var(--lh-snug);
    letter-spacing: 0.02em;
  }

  .timeline-date .date-atomic {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }

  .timeline-dot {
    position: relative;
    z-index: 1;
    width: 14px;
    height: 14px;
    margin-top: 0.3em; /* Vertically align dot with the date text */
    margin-left: 1px; /* dot center at 8px = spine center */
    border-radius: 50%;
    background-color: var(--color-accent);
    border: 3px solid var(--color-background);  /* White border for light theme */
    box-shadow: 0 0 0 3px var(--color-accent);
    flex-shrink: 0;
  }

  /* Right column: experience card - LIGHT THEME: white card with accent left border */
  .timeline-card {
    flex: 1;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-left: 4px solid var(--color-accent);
    border-radius: 0 8px 8px 0;
    padding: var(--sp-3) var(--sp-4);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  /* Last card: no margin so connector line stops at card bottom */
  .timeline-item:last-of-type .timeline-card {
    margin-top: 0;
  }

  .card-header {
    margin-bottom: var(--sp-2);
  }

  .position {
    font-weight: 700;
    font-size: var(--fs-title);
    color: var(--color-heading);
    line-height: var(--lh-snug);
    margin-bottom: 2px;
  }

  .company,
  .institution,
  .organization,
  .awarder {
    color: var(--color-text-secondary);
    font-weight: 400;
    font-size: var(--fs-title);
    line-height: var(--lh-snug);
  }

  .location {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: var(--sp-1);
    color: var(--color-text-secondary);
    font-weight: 500;
    font-size: var(--fs-meta);
    line-height: var(--lh-snug);
  }

  .item {
    margin-top: var(--sp-2);
  }

  .item .summary {
    margin-bottom: var(--sp-2);
  }

  /* Print styles */
  @media print {
    .timeline-item {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .timeline-row {
      break-inside: avoid;
    }

    .timeline-connector::before {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .timeline-dot {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .timeline-card {
      box-shadow: none;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .timeline-date {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .company a {
      color: var(--color-text);
    }

    .item .summary {
      margin-top: var(--sp-3) !important;
    }
    :global(.section) :global(p) { margin: 0; padding: 0; }
    :global(.fa-location-dot):before { padding-left: 0.1em; }
  }

  /* Mobile: stack vertically */
  @media screen and (max-width: 768px) {
    .timeline-item {
      display: block;
    }

    .timeline-row {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
    }

    .timeline-date {
      flex: none;
      text-align: left;
      padding: 0 0 var(--sp-2) 0;
      border-left: 3px solid var(--color-accent);
      padding-left: var(--sp-3);
      margin-left: 5.5px; /* Align with dot center */
    }

    .timeline-date .date-atomic {
      align-items: flex-start;
    }

    .timeline-date .date-range {
      align-items: flex-start;
    }

    .timeline-connector {
      display: none;
    }

    .timeline-card {
      border-radius: 0 8px 8px 8px;
      border-left-width: 3px;
      margin-left: 8px;
      padding: var(--sp-3);
    }

    .timeline-item:last-of-type .timeline-date {
      border-left: 3px solid transparent;
      padding-bottom: 0;
    }
  }

  @media screen and (max-width: 480px) {
    .timeline-date {
      flex-basis: auto;
    }
  }
</style>
<script>
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
</script>

<section class="timeline-item">
  <header class="header-flex">
    <div class="header-left">
      {#if title}
        <div class="position">{title}</div>
      {/if}
      {#if subtitle}
        <div class={subtitleClass}>
          {#if url}
            <a target="_blank" href={url}>{subtitle}</a>
          {:else}
            {subtitle}
          {/if}
        </div>
      {/if}
    </div>
    <div class="date-container">
      {#if startDate}
        <DateRange {startDate} {endDate} {language} />
      {:else if singleDate}
        <div class="date">{singleDate}</div>
      {/if}
    </div>

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
</section>

<style>
  .timeline-item {
    margin-top: var(--sp-4);
  }

  .timeline-item:first-of-type {
    margin-top: 0;
  }

  .position,
  .company,
  .organization,
  .institution,
  .date,
  .area,
  .studyType,
  .title,
  .awarder,
  .publisher,
  .issuer,
  .duration {
    display: inline;
  }

  .position,
  .studyType,
  .area,
  .title {
    font-weight: 700;
  }
  .date-container {
    flex-shrink: 0;
    text-align: right;
    padding-top: 0.2em;
    margin-left: var(--sp-4);
    white-space: nowrap;
  }

  .company::before,
  .institution::before,
  .organization::before,
  .awarder::before {
    content: "at ";
  }

  .company,
  .institution,
  .organization,
  .awarder {
    color: var(--color-text-secondary);
    font-weight: 400;
  }

  .item {
    overflow: hidden;
  }

  /* p margin handled via inline styles in paragraphSplit */

  .header-flex {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: var(--sp-2);
    margin-bottom: var(--sp-1);
  }

  .header-left {
    flex: 1;
    min-width: 0;
  }

  .clear::after {
    content: "";
    display: table;
    clear: both;
  }

  .location {
    display: block;
    margin-top: var(--sp-1);
    color: var(--color-text-secondary);
    font-weight: 500;
    font-size: var(--fs-meta);
    line-height: var(--lh-snug);
  }

  .item .summary {
    margin-top: var(--sp-2);
  }

  header {
    font-size: var(--fs-title);
    position: relative;
    line-height: var(--lh-snug);
    margin-bottom: 0;
  }

  .header-left .position + .company::before,
  .header-left .position + .institution::before,
  .header-left .position + .organization::before,
  .header-left .position + .awarder::before {
    content: "at ";
  }

@media print {
    .timeline-item {
      margin-top: var(--sp-3);
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }
    .header-flex,
    .item,
    .summary {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }
    .item {
      overflow: visible;
    }
    .company a { color: var(--color-text); }
    .company::before,
    .institution::before,
    .organization::before,
    .awarder::before { content: "at "; }
    .section p { margin: 0; padding: 0; }
    .fa-location-dot:before { padding-left: 0.1em; }
  }

  @media screen and (max-width: 601px) {
    .section > section > header { font-size: 1.071rem; }
    .header-flex {
      flex-direction: column;
      align-items: flex-start;
    }
    .date-container {
      text-align: left;
      margin-left: 0;
      padding-top: 0;
    }
  }
  @media screen and (min-width: 1025px) {
    .section > section > header .space-left { opacity: 1; cursor: pointer; }
    .section > section:not(.main-summary) { margin-left: 1.67rem; }
    .company::before, .institution::before, .organization::before, .awarder::before { content: "| "; }
    .display { display: none; }
    .display:not(.none) { display: block; }
  }
</style>

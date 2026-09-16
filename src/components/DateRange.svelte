<script>
  import { getDateHelpers } from '../utils/date-helpers.ts';
  import { formatDuration } from '../utils/duration';
  import { t } from '../utils/helpers.ts';

  let { startDate, endDate, singleDate = undefined, language = 'en-gb' } = $props();

  const { MY } = getDateHelpers(language);
  const duration = startDate ? formatDuration(startDate, endDate, language) : '';
</script>

<div class="date-atomic">
  {#if startDate}
    <div class="date-range">
      <span class="startDate">{MY(startDate)}</span>
      {#if endDate}
        <span class="endDate">- {MY(endDate)}</span>
      {:else}
        <span class="endDate">- {t('resume.present')}</span>
      {/if}
    </div>
    {#if duration}
      <span class="duration-text">({duration})</span>
    {/if}
  {:else if singleDate}
    <span class="date">{singleDate}</span>
  {/if}
</div>

<style>
  .date-atomic {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    font-size: var(--fs-meta);
    color: var(--color-text-secondary);
    font-weight: 500;
    line-height: var(--lh-snug);
    letter-spacing: 0.02em;
  }

  .date-range {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1px;
  }

  .startDate,
  .endDate {
    white-space: nowrap;
  }

  .duration-text {
    font-weight: 400;
    color: var(--color-text-muted);
    font-size: 0.9em;
    white-space: nowrap;
  }

  @media print {
    .date-atomic {
      color: var(--color-text-secondary);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
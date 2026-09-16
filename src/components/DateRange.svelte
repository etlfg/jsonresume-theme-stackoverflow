<script>
  import { getDateHelpers } from '../utils/date-helpers.ts';
  import { formatDuration } from '../utils/duration';

  let { startDate, endDate, singleDate = undefined, language = 'en-gb' } = $props();

  const { MY } = getDateHelpers(language);
  const duration = startDate ? formatDuration(startDate, endDate, language) : '';
</script>

<div class="date-atomic">
  {#if startDate}
    <span class="date-range">
      <span class="startDate">{MY(startDate)}</span>
      {#if endDate}
        <span class="endDate">- {MY(endDate)}</span>
      {:else}
        <span class="endDate">- Current</span>
      {/if}
    </span>
    {#if duration}
      <span class="duration-text"> ({duration})</span>
    {/if}
  {:else if singleDate}
    <span class="date">{singleDate}</span>
  {/if}
</div>

<style>
  .date-atomic {
    display: inline-flex !important;
    flex-direction: row !important;
    align-items: baseline !important;
    white-space: nowrap !important;
    font-size: var(--fs-meta);
    color: var(--color-text-secondary);
    font-weight: 500;
    line-height: var(--lh-snug);
    letter-spacing: 0.02em;
  }

  .date-range {
    display: inline-flex;
    flex-direction: row;
    align-items: baseline;
    gap: var(--sp-1);
  }

  .duration-text {
    font-weight: 400;
    color: var(--color-text-secondary);
    margin-left: 4px;
  }
</style>

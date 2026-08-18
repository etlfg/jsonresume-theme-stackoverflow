<script>
  import FormattedText from './FormattedText.svelte';

  let { highlights = [] } = $props();
</script>

{#if highlights?.length}
  <ul class="highlights">
    {#each highlights as highlight}
      <li><FormattedText text={highlight} /></li>
    {/each}
  </ul>
{/if}

<style>
  .highlights {
    margin: var(--sp-2) 0 0 0;
    list-style: none;
    padding-left: 0;
  }

  .highlights > li {
    position: relative;
    padding-left: var(--sp-3);
    margin-top: var(--sp-1);
    line-height: var(--lh-base);
  }

  .highlights > li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.4em;
    bottom: 0.4em;
    width: 3px;
    background-color: var(--color-accent);
  }

  .highlights > li:first-child {
    margin-top: 0;
  }

  @media print {
    .highlights { margin: var(--sp-2) 0 0 0; }
    .highlights > li { margin-top: var(--sp-1); line-height: var(--lh-snug); }
    .highlights > li > :global(p) { margin-bottom: var(--sp-1); }
  }
</style>

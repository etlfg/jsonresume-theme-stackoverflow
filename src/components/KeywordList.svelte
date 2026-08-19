<script>
  let { keywords = [], cssClass = 'keywords' } = $props();
</script>

{#if keywords?.length}
  <ul class={cssClass}>
    {#each keywords as keyword}
      <li>{keyword}</li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    margin: var(--sp-2) 0 0 0;
  }

  li {
    display: inline-block;
    margin: 2px 4px 2px 0;
    padding: 2px 6px;
    font-size: var(--fs-fine);
    line-height: 1.5;
    white-space: nowrap;
    color: var(--color-keyword-text);
    background-color: var(--color-keyword-bg);
    border: 0 solid var(--color-keyword-border);
    border-radius: 3px;
  }

  li:hover {
    background: var(--color-keyword-bg);
  }

  @media print {
    ul { 
      margin-top: var(--sp-5) !important; 
      padding-top: var(--sp-2) !important;
    }
    li { 
      display: inline-block !important;
      margin: 2px 4px 2px 0 !important;
      padding: 2px 6px !important;
      background-color: var(--color-keyword-bg) !important;
      color: var(--color-keyword-text) !important;
      border: 1px solid var(--color-keyword-border) !important;
      border-radius: 3px !important;
      text-decoration: none !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      font-weight: normal !important;
    }
    ul::before { display: none !important; content: none !important; }
    ul.keywords::before { display: none !important; content: none !important; }
    :global(.skills-grid) ul::before { content: none; }
    ul.courses::before { display: none !important; content: none !important; }
    :global(.skills-grid) .keywords { font-size: var(--fs-meta); margin: 0; }
  }
</style>

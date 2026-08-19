<script>
  let { keywords = [], cssClass = 'keywords' } = $props();
</script>

{#if keywords?.length}
  <ul class={cssClass}>
    {#each keywords as keyword}
      <li><span>{keyword}</span></li>
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
    padding: 0;
    font-size: var(--fs-fine);
    line-height: 1.5;
    white-space: nowrap;
  }

  li span {
    display: inline-block;
    padding: 2px 6px;
    color: var(--color-keyword-text);
    background-color: var(--color-keyword-bg);
    border: 0 solid var(--color-keyword-border);
    border-radius: 3px;
  }

  li span:hover {
    background: var(--color-keyword-bg);
  }

  @media print {
    ul { margin: var(--sp-2) 0 0 0; }
    li { 
      display: inline-block !important;
      margin: 2px 4px 2px 0 !important;
      padding: 0 !important;
    }
    li span { 
      display: inline-block !important;
      background-color: #dfeaf1 !important;
      color: #2c5777 !important;
      border: 1px solid #dfeaf1 !important;
      border-radius: 6px !important;
      padding: 2px 6px !important;
      text-decoration: none !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      font-weight: normal !important;
    }
    ul::before { font-size: var(--fs-body); font-weight: 600; }
    ul.keywords::before { content: "Skills: "; font-size: var(--fs-body); }
    :global(.skills-grid) ul::before { content: none; }
    ul.courses::before { content: "Major courses: "; font-size: var(--fs-body); }
    :global(.skills-grid) .keywords { font-size: var(--fs-meta); margin: 0; }
  }
</style>

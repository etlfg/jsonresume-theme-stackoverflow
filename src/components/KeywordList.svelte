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
    color: var(--color-keyword-text);
    background-color: var(--color-keyword-bg);
    border: 0 solid var(--color-keyword-border);
    border-radius: 3px;
    white-space: nowrap;
  }

  li:hover {
    background: var(--color-keyword-bg);
  }

  @media print {
    ul { margin: var(--sp-2) 0 0 0; }
li { 
  display: inline-block;
  margin: 2px 4px 2px 0;
  padding: 2px 6px;
  font-size: var(--fs-fine);
  background-color: var(--color-keyword-bg) !important;
  color: var(--color-keyword-text) !important;
  border-radius: 3px !important;
  line-height: 1.5;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
ul::before { font-size: var(--fs-body); font-weight: 600; }
ul.keywords::before { content: "Skills: "; font-size: var(--fs-body); }
:global(.skills-grid) ul::before { content: none; }
ul.courses::before { content: "Major courses: "; font-size: var(--fs-body); }
:global(.skills-grid) .keywords { font-size: var(--fs-meta); margin: 0; }
  }
</style>

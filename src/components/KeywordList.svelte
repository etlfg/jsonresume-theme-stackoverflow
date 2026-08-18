<script>
  let { keywords = [], cssClass = 'keywords' } = $props();
</script>

{#if keywords?.length}
  <ul class={cssClass}>
    {#each keywords as keyword}
      <li>
        {#if typeof keyword === 'object' && keyword.name}
          <span class="badge-text" title={keyword.level ? `${keyword.name} - ${keyword.level}` : keyword.name}>{keyword.name}</span>
          {#if keyword.level}
            <span class="level-indicator" style="--level-color: var(--color-level-{keyword.level.toLowerCase()})" title={keyword.level}>
              {keyword.level}
            </span>
          {/if}
        {:else}
          <span class="badge-text">{keyword}</span>
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    list-style: none;
    padding: 0;
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 1px 6px;
    margin: 1px 2px 1px 0;
    font-size: var(--fs-fine);
    line-height: 1.2;
    color: var(--color-keyword-text);
    background-color: var(--color-keyword-bg);
    border: 1px solid var(--color-keyword-border);
    border-radius: 3px;
    white-space: nowrap;
  }

  li:hover {
    background-color: var(--color-keyword-bg-hover, var(--color-keyword-bg));
    border-color: var(--color-color-keyword-border-hover, var(--color-keyword-border));
  }

  :host {
    --color-level-beginner: #d97706;
    --color-level-intermediate: #2563eb;
    --color-level-advanced: #059669;
    --color-level-master: #7c3aed;
  }

  .badge-text {
    font-weight: 500;
  }

  .level-indicator {
    font-size: 0.75em;
    font-weight: 600;
    text-transform: uppercase;
    opacity: 0.8;
    border-left: 1px solid var(--color-keyword-border);
    padding-left: 4px;
    color: var(--level-color, var(--color-text-muted));
  }

  @media print {
    ul { 
      margin: 0; 
    }
    li { 
      display: inline-flex;
      margin: 1px 2px 1px 0; 
      padding: 1px 6px; 
      font-size: var(--fs-fine); 
      background-color: var(--color-keyword-bg); 
      line-height: 1.2; 
      border: 1px solid var(--color-keyword-border);
      border-radius: 3px;
    }
    .level-indicator { 
      display: inline-block !important; 
      font-size: 0.75em;
      opacity: 0.8;
      border-left: 1px solid var(--color-keyword-border);
      padding-left: 4px;
      color: var(--level-color, var(--color-text-muted)) !important;
    }
    ul::before { font-size: var(--fs-body); font-weight: 600; }
    ul.keywords::before { content: "Skills: "; font-size: var(--fs-body); }
    ul.courses::before { content: "Major courses: "; font-size: var(--fs-body); }
    :global(.skills-grid) ul::before { content: none; }
    :global(.skills-grid) .keywords { font-size: var(--fs-meta); margin: 0; }
  }
</style>
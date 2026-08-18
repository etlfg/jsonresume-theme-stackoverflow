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
    --color-level-beginner: var(--color-bar-beginner);
    --color-level-intermediate: var(--color-bar-intermediate);
    --color-level-advanced: var(--color-bar-advanced);
    --color-level-master: var(--color-bar-master);
  }

  .badge-text {
    font-weight: 500;
  }

  .level-indicator {
    font-size: 0.65em;
    font-weight: 900;
    text-transform: uppercase;
    opacity: 1;
    border-left: 3px solid var(--level-color, #000) !important;
    padding-left: 4px;
    color: var(--level-color, #000) !important;
    background: rgba(0,0,0,0.05) !important;
    display: inline-block;
    line-height: 1;
  }

  @media print {
    ul { 
      margin: 0; 
      display: block; 
    }
    li { 
      display: inline-block;
      margin: 0; 
      padding: 0; 
      font-size: var(--fs-meta); 
      background: transparent; 
      line-height: var(--lh-snug); 
      border: none;
      border-radius: 0;
    }
    li::after { padding: 0 0.4em; content: "·"; color: var(--color-text-muted); }
    li:last-of-type::after { content: ""; }
    .level-indicator { 
      display: inline-block !important; 
      font-size: 0.8em;
      opacity: 0.6;
      border: none;
      padding: 0 0 0 4px;
      color: #666 !important;
    }
    :global(.skills-grid) li::after { padding: 0 0.35em; content: "·"; color: var(--color-text-muted); }
    :global(.skills-grid) li:last-of-type::after { content: ""; }
    ul::before { font-size: var(--fs-body); font-weight: 600; }
    ul.keywords::before { content: "Skills: "; font-size: var(--fs-body); }
    :global(.skills-grid) ul::before { content: none; }
    ul.courses::before { content: "Major courses: "; font-size: var(--fs-body); }
    :global(.skills-grid) .keywords { font-size: var(--fs-meta); margin: 0; }
  }
</style>
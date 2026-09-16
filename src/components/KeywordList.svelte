<script>
  import { normalizeLevel } from '../utils/levels.ts';

  let { keywords = [], cssClass = 'keywords' } = $props();
</script>

{#if keywords?.length}
  <ul class={cssClass}>
    {#each keywords as keyword}
      {@const k = (typeof keyword === 'object' && keyword.name) ? keyword : { name: keyword }}
      {@const normalizedLevel = k.level ? normalizeLevel(k.level) : null}
      <li title={k.level ? `${k.name} - ${k.level}` : k.name}>
        <span class="badge-text">{k.name}</span>
        {#if normalizedLevel}
          <span class="level-dot {normalizedLevel}" style="--level-color: var(--color-level-{normalizedLevel}, #ccc)" title={k.level}></span>
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
    white-space: nowrap;
    color: var(--color-keyword-text);
    background-color: var(--color-keyword-bg);
    border: 1px solid var(--color-keyword-border);
    border-radius: 3px;
  }

  li:hover {
    background-color: var(--color-keyword-bg-hover, var(--color-keyword-bg));
    border-color: var(--color-color-keyword-border-hover, var(--color-keyword-border));
  }

  :host {
    --color-level-newbie: var(--color-bar-newbie, #9ca3af);
    --color-level-intermediate: var(--color-bar-intermediate, #d97706);
    --color-level-advanced: var(--color-bar-advanced, #059669);
    --color-level-master: var(--color-bar-master, #e11d48);
    --color-level-expert: var(--color-bar-expert, #1e293b);
    --color-level-native: var(--color-bar-master, #e11d48);
  }

  .badge-text {
    font-weight: 500;
  }

  .level-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--level-color);
    display: inline-block;
    flex-shrink: 0;
  }

  .level-dot.newbie {
    border: 1px solid var(--color-border);
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
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
    --color-level-newbie: var(--color-bar-newbie, #ffffff);
    --color-level-intermediate: var(--color-bar-intermediate, #eab308);
    --color-level-advanced: var(--color-bar-advanced, #f97316);
    --color-level-master: var(--color-bar-master, #059669);
    --color-level-expert: var(--color-bar-expert, #7c3aed);
    --color-level-native: var(--color-bar-master, #059669);
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

  

  @media print {
    ul { 
      margin: 0 !important; 
      display: flex !important; 
      flex-wrap: wrap !important;
      gap: 0 !important;
    }
    li { 
      display: inline-flex !important;
      align-items: center !important;
      gap: 4px !important;
      padding: 1px 6px !important;
      margin: 1px 2px 1px 0 !important;
      font-size: var(--fs-fine) !important;
      line-height: 1.2 !important;
      color: var(--color-keyword-text) !important;
      background-color: var(--color-keyword-bg) !important;
      border: 1px solid var(--color-keyword-border) !important;
      border-radius: 3px !important;
      white-space: nowrap !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    li::after { content: none !important; }
    .level-indicator { 
      display: inline-block !important; 
      font-size: 0.75em !important;
      opacity: 1 !important;
      border-left: 1px solid var(--color-keyword-border) !important;
      padding-left: 6px !important;
      color: var(--level-color) !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    :global(.skills-grid) li::after { content: none !important; }
    ul::before { font-size: var(--fs-body); font-weight: 600; }
    ul.keywords::before { content: "Skills: "; font-size: var(--fs-body); }
    :global(.skills-grid) ul::before { content: none; }
    ul.courses::before { content: "Major courses: "; font-size: var(--fs-body); }
    :global(.skills-grid) .keywords { font-size: var(--fs-meta); margin: 0; }
  }
</style>
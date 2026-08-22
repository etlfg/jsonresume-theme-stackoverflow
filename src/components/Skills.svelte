<script>
  import { t } from '../utils/helpers.ts';
  import SectionHeader from './SectionHeader.svelte';
  import LevelBar from './LevelBar.svelte';
  import KeywordList from './KeywordList.svelte';

  let { skills = [] } = $props();
</script>

{#if skills?.length}
  <SectionHeader title={t('resume.skills')}>
    <div class="legend">
      <span class="legend-item"><span class="dot newbie"></span> Newbie</span>
      <span class="legend-item"><span class="dot intermediate"></span> Intermediate</span>
      <span class="legend-item"><span class="dot advanced"></span> Advanced</span>
      <span class="legend-item"><span class="dot master"></span> Master</span>
      <span class="legend-item"><span class="dot expert"></span> Expert</span>
    </div>
    <section class="skills-grid">
      {#each skills as skill}
        <div class="skill-item">
          {#if skill.name}
            <h3 class="name">{skill.name}</h3>
          {/if}
          <KeywordList keywords={skill.keywords} />
        </div>
      {/each}
    </section>
  </SectionHeader>
{/if}

<style>
  .legend {
    display: flex;
    gap: 1rem;
    margin-bottom: var(--sp-3);
    font-size: var(--fs-meta);
    color: var(--color-text-secondary);
    justify-content: flex-start;
    align-items: center;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
  }

  .dot.newbie { background-color: var(--color-level-newbie); border: 1px solid var(--color-border); }
  .dot.intermediate { background-color: var(--color-level-intermediate); }
  .dot.advanced { background-color: var(--color-level-advanced); }
  .dot.master { background-color: var(--color-level-master); }
  .dot.expert { background-color: var(--color-level-expert); }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: var(--sp-5);
    row-gap: var(--sp-3);
  }

  .skill-item {
    padding: 0;
    border-bottom: none;
  }

  .name {
    font-weight: 700;
    font-size: var(--fs-card);
    line-height: var(--lh-snug);
    color: var(--color-heading);
    margin-bottom: var(--sp-1);
  }

  @media print {
    .skills-grid { column-gap: var(--sp-4); row-gap: var(--sp-3); }
    .skills-grid .skill-item { display: flex; flex-direction: column; margin: 0; padding: 0; }
  }

  @media screen and (max-width: 479px) {
    .skills-grid { grid-template-columns: 1fr; }
  }

  @media screen and (min-width: 480px) and (max-width: 601px) {
    .skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
</style>
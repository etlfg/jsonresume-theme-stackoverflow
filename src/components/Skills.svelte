<script>
  import { t } from '../utils/helpers.ts';
  import SectionHeader from './SectionHeader.svelte';
  import LevelBar from './LevelBar.svelte';
  import KeywordList from './KeywordList.svelte';

  let { skills = [] } = $props();
</script>

{#if skills?.length}
  <SectionHeader title={t('resume.skills')}>
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
    <div class="legend">
      <span class="legend-title">{t('skills.legendTitle')}</span>
      <span class="legend-items">
        <span class="legend-item"><span class="dot newbie"></span> {t('skills.newbie')} ({t('skills.newbieDesc')})</span>
        <span class="legend-item"><span class="dot intermediate"></span> {t('skills.intermediate')} ({t('skills.intermediateDesc')})</span>
        <span class="legend-item"><span class="dot advanced"></span> {t('skills.advanced')} ({t('skills.advancedDesc')})</span>
        <span class="legend-item"><span class="dot master"></span> {t('skills.master')} ({t('skills.masterDesc')})</span>
        <span class="legend-item"><span class="dot expert"></span> {t('skills.expert')} ({t('skills.expertDesc')})</span>
      </span>
    </div>
  </SectionHeader>
{/if}

<style>
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    margin-top: var(--sp-4);
    font-size: var(--fs-meta);
    color: var(--color-text-secondary);
    justify-content: flex-start;
    align-items: center;
  }

  .legend-title {
    font-weight: 600;
    font-size: var(--fs-meta);
    color: var(--color-text-secondary);
  }

  .legend-items {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
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
    .dot {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }

  @media screen and (max-width: 479px) {
    .skills-grid { grid-template-columns: 1fr; }
  }

  @media screen and (min-width: 480px) and (max-width: 601px) {
    .skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
</style>
<script>
  import { t } from '../utils/helpers.ts';
  import { getDateHelpers } from '../utils/date-helpers.ts';
  import SectionHeader from './SectionHeader.svelte';
  import TimelineItem from './TimelineItem.svelte';

  let { certificates = [], language = 'en-gb' } = $props();

  const { MY } = getDateHelpers(language);
</script>

{#if certificates?.length}
  <SectionHeader title={t('resume.certificates')} count={certificates.length} sectionId="certificates">
    <section id="certificates" class="timeline-section">
      {#each certificates as cert}
        <TimelineItem
          title={cert.name}
          subtitle={cert.issuer}
          subtitleClass="issuer"
          url={cert.url}
          singleDate={cert.date ? MY(cert.date) : undefined}
          {language}
        >
        </TimelineItem>
      {/each}
    </section>
  </SectionHeader>
{/if}

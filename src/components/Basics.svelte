<script>
  import { t } from '../utils/helpers.ts';
  import ContactInfo from './ContactInfo.svelte';
  import SocialProfile from './SocialProfile.svelte';
  import SectionHeader from './SectionHeader.svelte';
  import BirthDate from './BirthDate.svelte';
  import FormattedText from './FormattedText.svelte';

  let { basics } = $props();
</script>

{#if basics}
  <header class="header clear">
    <div class="header-top">
      <div class="name-container">
        {#if basics.image}
          <img class="image" src={basics.image} alt={basics.name}>
        {/if}
        <div class="name-text">
          <h1 class="name">{basics.name}</h1>
          <h2 class="label">{basics.label}</h2>
        </div>
      </div>

      <div class="contact-container">
        <div class="contact-details">
          <ContactInfo website={basics.website} email={basics.email} phone={basics.phone} />
          {#if basics.location}
             <div class="contact-secondary">
               {#if basics.location}
                 <span class="location">
                   {#if basics.location.address}<span>{basics.location.address}, </span>{/if}
                   {#if basics.location.city}<span>{basics.location.city}, </span>{/if}
                   {#if basics.location.region}<span>{basics.location.region}</span>{/if}
                   {#if basics.location.countryCode}<span> ({basics.location.countryCode})</span>{/if}
                 </span>
               {/if}
               <BirthDate birth={basics.birth} />
             </div>
          {/if}
        </div>
      </div>
    </div>

    {#if basics.profiles?.length}
      <nav class="profiles" aria-label="Social profiles">
        {#each basics.profiles as profile}
          <SocialProfile {profile} />
        {/each}
      </nav>
    {/if}
  </header>

  {#if basics.summary}
    <SectionHeader title={t('resume.summary')}>
      <section class="main-summary">
        <div><FormattedText text={basics.summary} /></div>
      </section>
    </SectionHeader>
  {/if}
{/if}

<style>
  .header {
    margin-bottom: var(--sp-6);
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    padding: 0 0 var(--sp-4) var(--sp-6);
    border-left: 6px solid var(--header-border-color);
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--sp-4);
  }

  .name-container {
    display: flex;
    align-items: center;
    gap: var(--sp-6);
  }

  .name-text {
    display: flex;
    flex-direction: column;
  }

  .contact-container {
    display: flex;
    flex-direction: column;
    text-align: right;
    align-items: flex-end;
  }

  .contact-details {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--sp-3);
    font-size: var(--fs-meta);
    color: var(--color-text-secondary);
  }

  .contact-secondary {
    display: block;
    margin-top: var(--sp-1);
    font-size: var(--fs-fine);
    color: var(--color-text-muted);
    text-align: right;
  }

  .name {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--color-heading);
    margin: 0;
  }

  .label {
    color: var(--color-accent);
    font-size: var(--fs-label);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    line-height: 1;
    margin-top: var(--sp-2);
  }

  .location {
    display: inline;
  }

  .image {
    width: 5em;
    height: 5em;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border: 1px solid var(--color-border-light);
  }

  .profiles {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    gap: var(--sp-4);
    font-size: var(--fs-fine);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .main-summary {
    line-height: var(--lh-base);
  }

  @media print {
    .header { 
      margin-bottom: var(--sp-4); 
    }
    .main-summary { padding: var(--sp-4); background: transparent; border: none; }
  }

  @media screen and (max-width: 601px) {
    .header-top {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .name-container {
      flex-direction: column;
      text-align: center;
    }
    .contact-container {
      text-align: center;
      align-items: center;
    }
    .contact-details {
      justify-content: center;
    }
    .contact-secondary {
      text-align: center;
    }
    .name { font-size: 2.2rem; }
    .label { font-size: 1rem; }
  }
</style>

<script>
  import { normalizeLevel } from '../utils/levels.ts';

  let { level, displayText = undefined, name = '' } = $props();

  const normalized = normalizeLevel(level);
  const valueNow = normalized === 'newbie' ? 20 : normalized === 'intermediate' ? 40 : normalized === 'advanced' ? 60 : normalized === 'master' ? 80 : 100;
</script>

<div class="level {normalized}" role="meter" aria-label="{name ? name + ' level: ' : ''}{displayText || level}" aria-valuemin="0" aria-valuemax="100" aria-valuenow={valueNow}>
  <em>{displayText || level}</em>
  <div class="bar" aria-hidden="true"></div>
</div>

<style>
  .level {
    margin-bottom: 0.5em;
  }

  .level em {
    padding-left: 0.2em;
  }

  .level .bar {
    border: 1px solid var(--color-border-light);
    display: block;
    width: 10em;
    height: 5px;
    position: relative;
  }

  .level .bar::after {
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    background: var(--color-bar-newbie, #9ca3af);
    height: 5px;
  }

  .level.newbie .bar::after {
    background: var(--color-bar-newbie, #9ca3af);
    width: 2em;
    border: 1px solid var(--color-border-light);
  }

  .level.intermediate .bar::after {
    background: var(--color-bar-intermediate, #d97706);
    width: 4em;
  }

  .level.advanced .bar::after {
    background: var(--color-bar-advanced, #059669);
    width: 6em;
  }

  .level.master .bar::after {
    background: var(--color-bar-master, #e11d48);
    width: 8em;
  }

  .level.expert .bar::after,
  .level.native.speaker .bar::after {
    background: var(--color-bar-expert, #1e293b);
    width: 10em;
  }

  @media print {
    .level { margin: 0.1rem 0; font-weight: 400; }
    .level em { font-style: normal; padding: 0.1em 0; }
    .level .bar { 
      display: block !important; 
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .level .bar::after {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
</style>
import { t } from './i18n';

export interface DurationResult {
  years: number;
  months: number;
  days: number;
}

/**
 * Parses a date strings in various formats (YYYY-MM-DD, YYYY-MM, YYYY)
 * into a Date object.
 */
export function parseResumeDate(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;

  // Handle YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(dateStr);
  }
  // Handle YYYY-MM
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    return new Date(`${dateStr}-01`);
  }
  // Handle YYYY
  if (/^\d{4}$/.test(dateStr)) {
    return new Date(`${dateStr}-01-01`);
  }

  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Calculates the difference between two dates.
 */
export function calculateDuration(startStr: string | undefined, endStr: string | undefined): DurationResult {
  const start = parseResumeDate(startStr);
  const end = parseResumeDate(endStr || new Date().toISOString().split('T')[0]);

  if (!start || !end) return { years: 0, months: 0, days: 0 };

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

/**
 * Returns a localized duration string.
 */
export function formatDuration(startStr: string | undefined, endStr: string | undefined, lang: string = 'en'): string {
  const { years, months } = calculateDuration(startStr, endStr);
  
  // We typically only show years and months for resume durations
  const parts: string[] = [];

  // Localization keys for duration units
  const units: Record<string, { year: string, month: string, yearPlural: string, monthPlural: string }> = {
    en: { year: 'year', month: 'month', yearPlural: 'years', monthPlural: 'months' },
    de: { year: 'Jahr', month: 'Monat', yearPlural: 'Jahre', monthPlural: 'Monate' },
    fr: { year: 'an', month: 'mois', yearPlural: 'ans', monthPlural: 'mois' },
    es: { year: 'año', month: 'mes', yearPlural: 'años', monthPlural: 'meses' },
    it: { year: 'anno', month: 'mese', yearPlural: 'anni', monthPlural: 'mesi' },
    pt: { year: 'ano', month: 'mês', yearPlural: 'anos', monthPlural: 'meses' },
    zh: { year: '年', month: '个月', yearPlural: '年', monthPlural: '个月' },
    ja: { year: '年', month: 'ヶ月', yearPlural: '年', monthPlural: 'ヶ月' },
    ko: { year: '년', month: '개월', yearPlural: '년', monthPlural: '개월' },
    nl: { year: 'jaar', month: 'maand', yearPlural: 'jaar', monthPlural: 'maanden' },
    pl: { year: 'rok', month: 'miesiąc', yearPlural: 'lat', monthPlural: 'miesięcy' },
    ru: { year: 'год', month: 'месяц', yearPlural: 'лет', monthPlural: 'месяцев' },
  };

  const locale = units[lang.split('-')[0]] || units['en'];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? locale.year : locale.yearPlural}`);
  }
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? locale.month : locale.monthPlural}`);
  }

  return parts.join(' ') || t('resume.present'); // Handle case where duration is < 1 month
}

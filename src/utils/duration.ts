import { t } from './i18n';

export interface DurationResult {
  years: number;
  months: number;
  days: number;
}

/**
 * Month names (French and English) mapped to their 1-based month index.
 * Keys are accent-free and lower case: "février" -> "fevrier", "août" -> "aout".
 */
const MONTH_NAMES: Record<string, number> = {
  // French: full names
  janvier: 1,
  fevrier: 2,
  mars: 3,
  avril: 4,
  mai: 5,
  juin: 6,
  juillet: 7,
  aout: 8,
  septembre: 9,
  octobre: 10,
  novembre: 11,
  decembre: 12,
  // French: abbreviations
  janv: 1,
  fev: 2,
  fevr: 2,
  avr: 4,
  juil: 7,
  aou: 8,
  sept: 9,
  oct: 10,
  nov: 11,
  dec: 12,
  // English: full names
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
  // English: abbreviations
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
};

/** Optional day prefix, month name (optionally dotted) and a 4 digit year: "17 juillet 2026", "1er mai 2022", "juil. 2026". */
const MONTH_NAME_DATE = /^(\d{1,2}\s*(?:er)?\s*)?([a-z]+)\.?\s+(\d{4})$/;

/**
 * Strips diacritics and lower cases a string so "Février" and "fevrier"
 * compare equal.
 */
function normalizeMonthToken(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Parses textual month dates such as "juillet 2026", "décembre 2021",
 * "17 août 2019" or "Jul 2026". Returns null when the string does not match.
 */
function parseMonthNameDate(dateStr: string): Date | null {
  const match = normalizeMonthToken(dateStr.trim()).match(MONTH_NAME_DATE);
  if (!match) return null;

  const month = MONTH_NAMES[match[2]];
  if (!month) return null;

  const day = match[1] ? parseInt(match[1], 10) : 1;
  const year = parseInt(match[3], 10);

  // Local time so that the day/month/year survive any UTC offset.
  const parsed = new Date(year, month - 1, day);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Parses a date string in various formats (YYYY-MM-DD, YYYY-MM, YYYY,
 * month name + year) into a Date object.
 */
export function parseResumeDate(dateStr: string | Date | undefined): Date | null {
  if (!dateStr) return null;
  if (dateStr instanceof Date) return isNaN(dateStr.getTime()) ? null : dateStr;

  const value = dateStr.trim();

  // Handle YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(value);
  }
  // Handle YYYY-MM
  if (/^\d{4}-\d{2}$/.test(value)) {
    return new Date(`${value}-01`);
  }
  // Handle YYYY
  if (/^\d{4}$/.test(value)) {
    return new Date(`${value}-01-01`);
  }
  // Handle month names, e.g. "juillet 2026", "décembre 2021", "Jul 2026"
  const named = parseMonthNameDate(value);
  if (named) return named;

  const parsed = new Date(value);
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

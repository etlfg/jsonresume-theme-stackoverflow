import { parseResumeDate } from "./duration";

/**
 * Formats a resume date, supporting the same formats as parseResumeDate
 * (YYYY-MM-DD, YYYY-MM, YYYY, "juillet 2026", ...).
 */
function formatDate(date: string | Date | undefined, language: string, options: Intl.DateTimeFormatOptions): string {
  const parsed = parseResumeDate(date);
  return parsed ? parsed.toLocaleDateString(language, options) : "";
}

/**
 * Gets formatters for date formatting
 * @param language The locale for formatting e.g. "en-gb" for British English
 */
export function getDateHelpers(language: string = "en-gb") {
  return {
    MY: (date: string) => formatDate(date, language, { year: "numeric", month: "short" }),
    Y: (date: string) => formatDate(date, language, { year: "numeric" }),
    DMY: (date: string) => formatDate(date, language, { day: "numeric", month: "short", year: "numeric" }),
  };
}

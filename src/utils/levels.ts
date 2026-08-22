/**
 * Normalize any skill/language level string to one of the 5 CSS tiers:
 * newbie, intermediate, advanced, master, expert.
 * Supports synonyms in multiple languages. Falls back to fuzzy matching.
 * Returns the original string lowercased if no match (bar won't render).
 */
const levelMap: Record<string, string> = {
  // English
  newbie: "newbie",
  beginner: "newbie",
  novice: "newbie",
  "entry level": "newbie",
  "entry-level": "newbie",
  junior: "newbie",
  elementary: "newbie",
  basic: "newbie",
  fundamental: "newbie",
  starter: "newbie",

  intermediate: "intermediate",
  moderate: "intermediate",
  "mid-level": "intermediate",
  mid: "intermediate",
  competent: "intermediate",
  proficient: "intermediate",
  "working knowledge": "intermediate",
  "limited working": "intermediate",

  advanced: "advanced",
  senior: "advanced",
  experienced: "advanced",
  "highly proficient": "advanced",
  "professional working": "advanced",
  "full professional": "advanced",
  fluent: "advanced",
  strong: "advanced",

  master: "master",
  "native speaker": "master",
  native: "master",
  "native or bilingual": "master",
  mastery: "master",
  lead: "master",
  principal: "master",

  expert: "expert",
  specialist: "expert",
  authority: "expert",

  // German
  anfänger: "newbie",
  grundkenntnisse: "newbie",
  fortgeschritten: "advanced",
  "sehr gut": "advanced",
  fließend: "advanced",
  experte: "master",
  muttersprache: "master",
  muttersprachlich: "master",
  verhandlungssicher: "advanced",

  // French
  débutant: "newbie",
  notions: "newbie",
  intermédiaire: "intermediate",
  avancé: "advanced",
  courant: "advanced",
  bilingue: "master",
  maîtrise: "master",

  // Spanish
  principiante: "newbie",
  básico: "newbie",
  intermedio: "intermediate",
  avanzado: "advanced",
  experto: "master",
  nativo: "master",
  dominio: "master",

  // Italian
  base: "newbie",
  "livello base": "newbie",
  "livello intermedio": "intermediate",
  "livello avanzato": "advanced",
  madrelingua: "master",
  esperto: "master",
  ottimo: "advanced",
  buono: "intermediate",
  discreto: "intermediate",

  // Portuguese
  iniciante: "newbie",
  intermediário: "intermediate",
  avançado: "advanced",
  especialista: "master",
  fluente: "advanced",

  // Polish
  podstawowy: "newbie",
  "średnio-zaawansowany": "intermediate",
  zaawansowany: "advanced",
  ekspert: "master",
  biegły: "advanced",
  ojczysty: "master", // native
};

export function normalizeLevel(level: string): string {
  const lower = level.toLowerCase().trim();
  if (levelMap[lower]) return levelMap[lower];

  // Fuzzy: check if any key is contained in the input
  for (const [key, tier] of Object.entries(levelMap)) {
    if (lower.includes(key) || key.includes(lower)) return tier as string;
  }

  return lower;
}
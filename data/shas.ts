export type Masechta = {
  id: string;         // URL slug — must match CloudFront filename prefix exactly
  name: string;       // English name
  hebrewName: string; // Hebrew name
  seder: string;      // Zeraim | Moed | Nashim | Nezikin | Kodshim | Taharos
  startDaf: number;   // First daf (usually 2)
  endDaf: number;     // Last daf number
};

// Masechtos in Daf Yomi order
export const MASECHTOS: Masechta[] = [
  // ─── Seder Zeraim ───────────────────────────────────────────
  { id: 'berachos',     name: 'Berachos',     hebrewName: 'ברכות',      seder: 'Zeraim',  startDaf: 2, endDaf: 64  },

  // ─── Seder Moed ─────────────────────────────────────────────
  { id: 'shabbos',      name: 'Shabbos',      hebrewName: 'שבת',        seder: 'Moed',    startDaf: 2, endDaf: 157 },
  { id: 'eruvin',       name: 'Eruvin',       hebrewName: 'עירובין',    seder: 'Moed',    startDaf: 2, endDaf: 105 },
  { id: 'pesachim',     name: 'Pesachim',     hebrewName: 'פסחים',      seder: 'Moed',    startDaf: 2, endDaf: 121 },
  { id: 'shekalim',     name: 'Shekalim',     hebrewName: 'שקלים',      seder: 'Moed',    startDaf: 2, endDaf: 22  },
  { id: 'yoma',         name: 'Yoma',         hebrewName: 'יומא',       seder: 'Moed',    startDaf: 2, endDaf: 88  },
  { id: 'sukkah',       name: 'Sukkah',       hebrewName: 'סוכה',       seder: 'Moed',    startDaf: 2, endDaf: 56  },
  { id: 'beitzah',      name: 'Beitzah',      hebrewName: 'ביצה',       seder: 'Moed',    startDaf: 2, endDaf: 40  },
  { id: 'rosh_hashana', name: 'Rosh Hashana', hebrewName: 'ראש השנה',   seder: 'Moed',    startDaf: 2, endDaf: 35  },
  { id: 'taanis',       name: 'Taanis',       hebrewName: 'תענית',      seder: 'Moed',    startDaf: 2, endDaf: 31  },
  { id: 'megillah',     name: 'Megillah',     hebrewName: 'מגילה',      seder: 'Moed',    startDaf: 2, endDaf: 32  },
  { id: 'moed_katan',   name: 'Moed Katan',   hebrewName: 'מועד קטן',   seder: 'Moed',    startDaf: 2, endDaf: 29  },
  { id: 'chagigah',     name: 'Chagigah',     hebrewName: 'חגיגה',      seder: 'Moed',    startDaf: 2, endDaf: 27  },

  // ─── Seder Nashim ───────────────────────────────────────────
  { id: 'yevamos',      name: 'Yevamos',      hebrewName: 'יבמות',      seder: 'Nashim',  startDaf: 2, endDaf: 122 },
  { id: 'kesubos',      name: 'Kesubos',      hebrewName: 'כתובות',     seder: 'Nashim',  startDaf: 2, endDaf: 112 },
  { id: 'nedarim',      name: 'Nedarim',      hebrewName: 'נדרים',      seder: 'Nashim',  startDaf: 2, endDaf: 91  },
  { id: 'nazir',        name: 'Nazir',        hebrewName: 'נזיר',       seder: 'Nashim',  startDaf: 2, endDaf: 66  },
  { id: 'sotah',        name: 'Sotah',        hebrewName: 'סוטה',       seder: 'Nashim',  startDaf: 2, endDaf: 49  },
  { id: 'gittin',       name: 'Gittin',       hebrewName: 'גיטין',      seder: 'Nashim',  startDaf: 2, endDaf: 90  },
  { id: 'kiddushin',    name: 'Kiddushin',    hebrewName: 'קידושין',    seder: 'Nashim',  startDaf: 2, endDaf: 82  },

  // ─── Seder Nezikin ──────────────────────────────────────────
  { id: 'bava_kamma',   name: 'Bava Kamma',   hebrewName: 'בבא קמא',    seder: 'Nezikin', startDaf: 2, endDaf: 119 },
  { id: 'bava_metzia',  name: 'Bava Metzia',  hebrewName: 'בבא מציעא',  seder: 'Nezikin', startDaf: 2, endDaf: 119 },
  { id: 'bava_basra',   name: 'Bava Basra',   hebrewName: 'בבא בתרא',   seder: 'Nezikin', startDaf: 2, endDaf: 176 },
  { id: 'sanhedrin',    name: 'Sanhedrin',    hebrewName: 'סנהדרין',    seder: 'Nezikin', startDaf: 2, endDaf: 113 },
  { id: 'makkos',       name: 'Makkos',       hebrewName: 'מכות',       seder: 'Nezikin', startDaf: 2, endDaf: 24  },
  { id: 'shevuos',      name: 'Shevuos',      hebrewName: 'שבועות',     seder: 'Nezikin', startDaf: 2, endDaf: 49  },
  { id: 'avoda_zara',   name: 'Avoda Zara',   hebrewName: 'עבודה זרה',  seder: 'Nezikin', startDaf: 2, endDaf: 76  },
  { id: 'horios',       name: 'Horios',       hebrewName: 'הוריות',     seder: 'Nezikin', startDaf: 2, endDaf: 14  },

  // ─── Seder Kodshim ──────────────────────────────────────────
  { id: 'zevachim',     name: 'Zevachim',     hebrewName: 'זבחים',      seder: 'Kodshim', startDaf: 2, endDaf: 120 },
  { id: 'menachos',     name: 'Menachos',     hebrewName: 'מנחות',      seder: 'Kodshim', startDaf: 2, endDaf: 110 },
  { id: 'chulin',       name: 'Chulin',       hebrewName: 'חולין',      seder: 'Kodshim', startDaf: 2, endDaf: 142 },
  { id: 'bechoros',     name: 'Bechoros',     hebrewName: 'בכורות',     seder: 'Kodshim', startDaf: 2, endDaf: 61  },
  { id: 'erchin',       name: 'Erchin',       hebrewName: 'ערכין',      seder: 'Kodshim', startDaf: 2, endDaf: 34  },
  { id: 'temurah',      name: 'Temurah',      hebrewName: 'תמורה',      seder: 'Kodshim', startDaf: 2, endDaf: 34  },
  { id: 'kerisos',      name: 'Kerisos',      hebrewName: 'כריתות',     seder: 'Kodshim', startDaf: 2, endDaf: 28  },
  { id: 'meilah',       name: 'Meilah',       hebrewName: 'מעילה',      seder: 'Kodshim', startDaf: 2, endDaf: 22  },
  { id: 'kinnim',       name: 'Kinnim',       hebrewName: 'קנים',       seder: 'Kodshim', startDaf: 22, endDaf: 25 },
  { id: 'tamid',        name: 'Tamid',        hebrewName: 'תמיד',       seder: 'Kodshim', startDaf: 25, endDaf: 33 },

  // ─── Seder Taharos ──────────────────────────────────────────
  { id: 'niddah',       name: 'Niddah',       hebrewName: 'נדה',        seder: 'Taharos', startDaf: 2, endDaf: 73  },
];

// Grouped by Seder for the Choose a Daf page
export const SEDARIM = ['Zeraim', 'Moed', 'Nashim', 'Nezikin', 'Kodshim', 'Taharos'] as const;

export function getMasechta(id: string): Masechta | undefined {
  return MASECHTOS.find((m) => m.id === id);
}

export function getDafCount(masechta: Masechta): number {
  return masechta.endDaf - masechta.startDaf + 1;
}

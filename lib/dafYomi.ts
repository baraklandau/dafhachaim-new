import { MASECHTOS } from '@/data/shas';

type DafEntry = { masechta: string; daf: number };

// Build a flat array of every daf in Daf Yomi order
function buildDafArray(): DafEntry[] {
  const arr: DafEntry[] = [];
  for (const m of MASECHTOS) {
    for (let daf = m.startDaf; daf <= m.endDaf; daf++) {
      arr.push({ masechta: m.id, daf });
    }
  }
  return arr;
}

const DAF_ARRAY = buildDafArray();
const TOTAL_DAFIM = DAF_ARRAY.length;

// Reference point confirmed by user: March 1 2026 = Menachos 49
const REFERENCE_DATE = new Date('2026-03-01T00:00:00Z');
const REFERENCE_MASECHTA = 'menachos';
const REFERENCE_DAF = 49;

const referenceIndex = DAF_ARRAY.findIndex(
  (d) => d.masechta === REFERENCE_MASECHTA && d.daf === REFERENCE_DAF
);

export function getTodaysDaf(date: Date = new Date()): DafEntry {
  const refMs = Date.UTC(
    REFERENCE_DATE.getUTCFullYear(),
    REFERENCE_DATE.getUTCMonth(),
    REFERENCE_DATE.getUTCDate()
  );
  const targetMs = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const daysDiff = Math.round((targetMs - refMs) / 86_400_000);

  let index = (referenceIndex + daysDiff) % TOTAL_DAFIM;
  if (index < 0) index += TOTAL_DAFIM;

  return DAF_ARRAY[index];
}

export function getDafForDate(date: Date): DafEntry {
  return getTodaysDaf(date);
}

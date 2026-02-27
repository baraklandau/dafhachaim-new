import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMasechta } from '@/data/shas';
import VideoPlayer from '@/components/VideoPlayer';
import type { VideoType } from '@/lib/videos';

type Props = {
  params: Promise<{ masechta: string; daf: string }>;
  searchParams: Promise<{ type?: string }>;
};

export default async function DafPage({ params, searchParams }: Props) {
  const { masechta: masechtaId, daf: dafStr } = await params;
  const { type } = await searchParams;

  const masechta = getMasechta(masechtaId);
  if (!masechta) return notFound();

  const dafNum = parseInt(dafStr, 10);
  if (isNaN(dafNum) || dafNum < masechta.startDaf || dafNum > masechta.endDaf) {
    return notFound();
  }

  const validTypes: VideoType[] = ['intro', 'shiur', 'review'];
  const initialType: VideoType = validTypes.includes(type as VideoType) ? (type as VideoType) : 'intro';

  const prevDaf = dafNum > masechta.startDaf ? dafNum - 1 : null;
  const nextDaf = dafNum < masechta.endDaf ? dafNum + 1 : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* ── Header ── */}
      <div className="mb-8">
        <Link href="/choose" className="text-xs text-slate-400 hover:text-slate-600 transition-colors mb-4 inline-block">
          ← All Dafim
        </Link>
        <div className="flex items-baseline gap-3">
          <span className="hebrew text-4xl font-bold text-amber-500">{masechta.hebrewName}</span>
          <h1 className="text-2xl font-bold text-slate-800">{masechta.name} · Daf {dafNum}</h1>
        </div>
      </div>

      {/* ── Video player ── */}
      <VideoPlayer masechta={masechtaId} daf={dafNum} initialType={initialType} />

      {/* ── Navigation ── */}
      <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-100 text-sm">
        {prevDaf ? (
          <Link href={`/daf/${masechtaId}/${prevDaf}`} className="text-slate-400 hover:text-amber-500 transition-colors">
            ← {masechta.name} {prevDaf}
          </Link>
        ) : <div />}

        {nextDaf ? (
          <Link href={`/daf/${masechtaId}/${nextDaf}`} className="text-slate-400 hover:text-amber-500 transition-colors">
            {masechta.name} {nextDaf} →
          </Link>
        ) : <div />}
      </div>

    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ masechta: string; daf: string }> }) {
  const { masechta: masechtaId, daf: dafStr } = await params;
  const masechta = getMasechta(masechtaId);
  if (!masechta) return {};
  return {
    title: `${masechta.name} Daf ${dafStr} | Daf HaChaim`,
    description: `Watch the Daf HaChaim Intro, Shiur, and Review for ${masechta.name} Daf ${dafStr}.`,
  };
}

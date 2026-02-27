'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MASECHTOS, SEDARIM, getDafCount, type Masechta } from '@/data/shas';

export default function ChooseDafPage() {
  const [activeSeder, setActiveSeder] = useState<string>('All');
  const [selectedMasechta, setSelectedMasechta] = useState<Masechta | null>(null);

  const filtered =
    activeSeder === 'All' ? MASECHTOS : MASECHTOS.filter((m) => m.seder === activeSeder);

  const dafRange = selectedMasechta
    ? Array.from(
        { length: selectedMasechta.endDaf - selectedMasechta.startDaf + 1 },
        (_, i) => selectedMasechta.startDaf + i
      )
    : [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Choose a Daf</h1>
        <p className="text-slate-400 text-sm mt-1">Browse all of Shas</p>
      </div>

      {/* ── Seder filter tabs ── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', ...SEDARIM].map((seder) => (
          <button
            key={seder}
            onClick={() => { setActiveSeder(seder); setSelectedMasechta(null); }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeSeder === seder
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white text-slate-500 border-gray-200 hover:border-gray-300 hover:text-slate-700'
            }`}
          >
            {seder}
          </button>
        ))}
      </div>

      {/* ── Masechta grid ── */}
      {!selectedMasechta && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMasechta(m)}
              className="border border-gray-200 hover:border-amber-400 rounded-xl p-4 text-left transition-all group"
            >
              <div className="hebrew text-xl font-bold text-amber-500 mb-1">{m.hebrewName}</div>
              <div className="text-sm font-semibold text-slate-700">{m.name}</div>
              <div className="text-xs text-slate-400 mt-0.5">{getDafCount(m)} dafim</div>
            </button>
          ))}
        </div>
      )}

      {/* ── Daf selector ── */}
      {selectedMasechta && (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setSelectedMasechta(null)}
              className="text-slate-400 hover:text-slate-700 transition-colors text-sm"
            >
              ← Back
            </button>
            <div>
              <span className="hebrew text-2xl font-bold text-amber-500 mr-2">{selectedMasechta.hebrewName}</span>
              <span className="text-xl font-bold text-slate-800">{selectedMasechta.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 gap-2">
            {dafRange.map((daf) => (
              <Link
                key={daf}
                href={`/daf/${selectedMasechta.id}/${daf}`}
                className="border border-gray-200 hover:border-amber-400 hover:bg-amber-50 rounded-lg py-2 text-center text-sm font-semibold transition-all text-slate-600 hover:text-amber-600"
              >
                {daf}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

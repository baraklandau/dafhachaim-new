'use client';

import Link from 'next/link';
import { useState } from 'react';

type Props = {
  todayMasechta: string;
  todayMasectaId: string;
  todayDaf: number;
};

export default function Navbar({ todayMasechta, todayMasectaId, todayDaf }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-2xl">📚</span>
          <span className="text-amber-400">Daf</span>
          <span className="text-white">HaChaim</span>
        </Link>

        {/* Today's Daf pill — desktop */}
        <Link
          href={`/daf/${todayMasectaId}/${todayDaf}`}
          className="hidden sm:flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-sm font-medium px-4 py-1.5 rounded-full transition-colors"
        >
          <span className="text-xs text-slate-400">Today:</span>
          {todayMasechta} {todayDaf}
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
          <Link href="/choose" className="hover:text-amber-400 transition-colors">Choose a Daf</Link>
          <Link href="/features" className="hover:text-amber-400 transition-colors">Feature Presentations</Link>
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden items-center gap-3">
          <Link href={`/daf/${todayMasectaId}/${todayDaf}`} className="text-amber-400 text-sm font-medium">
            {todayMasechta} {todayDaf}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-slate-300 p-1" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-slate-700 border-t border-slate-600 px-4 py-3 flex flex-col gap-3 text-sm">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-slate-200 hover:text-amber-400">Home</Link>
          <Link href="/choose" onClick={() => setMenuOpen(false)} className="text-slate-200 hover:text-amber-400">Choose a Daf</Link>
          <Link href="/features" onClick={() => setMenuOpen(false)} className="text-slate-200 hover:text-amber-400">Feature Presentations</Link>
        </div>
      )}
    </nav>
  );
}

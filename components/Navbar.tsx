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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-semibold text-slate-800 text-lg tracking-tight">
          Daf <span className="text-amber-500">HaChaim</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8 text-sm text-slate-500">
          <Link href="/choose" className="hover:text-slate-800 transition-colors">Browse</Link>
          <Link href="/features" className="hover:text-slate-800 transition-colors">Features</Link>
          <Link
            href={`/daf/${todayMasectaId}/${todayDaf}`}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Today: {todayMasechta} {todayDaf}
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden items-center gap-3">
          <Link
            href={`/daf/${todayMasectaId}/${todayDaf}`}
            className="text-amber-500 text-sm font-semibold"
          >
            {todayMasechta} {todayDaf}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-slate-400 p-1" aria-label="Menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 text-sm text-slate-600">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-slate-900">Home</Link>
          <Link href="/choose" onClick={() => setMenuOpen(false)} className="hover:text-slate-900">Browse All Dafim</Link>
          <Link href="/features" onClick={() => setMenuOpen(false)} className="hover:text-slate-900">Feature Presentations</Link>
        </div>
      )}
    </nav>
  );
}

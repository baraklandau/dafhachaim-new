import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { getTodaysDaf } from '@/lib/dafYomi';
import { getMasechta } from '@/data/shas';

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daf HaChaim | A Unique Visual Daf Yomi Learning Experience',
  description: 'Free daily Daf Yomi shiurim with visual learning — Intro, Full Shiur, and Review for every daf.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const todaysDaf = getTodaysDaf();
  const masechta = getMasechta(todaysDaf.masechta);

  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased bg-stone-50 text-slate-800 min-h-screen`}>
        <Navbar
          todayMasechta={masechta?.name ?? ''}
          todayMasectaId={todaysDaf.masechta}
          todayDaf={todaysDaf.daf}
        />
        <main className="pt-16">{children}</main>
        <footer className="mt-16 border-t border-gray-200 py-8 text-center text-sm text-slate-400">
          <p className="font-medium text-slate-500">Daf HaChaim — A Unique Visual Learning Experience</p>
          <p className="mt-1">Free for all those who wish to learn.</p>
        </footer>
      </body>
    </html>
  );
}

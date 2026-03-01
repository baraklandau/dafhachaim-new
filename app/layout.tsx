import type { Metadata } from 'next';

export const revalidate = 3600; // re-render every hour so navbar daf stays current
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { getTodaysDaf } from '@/lib/dafYomi';
import { getMasechta } from '@/data/shas';

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daf HaChaim | Visual Daf Yomi Learning',
  description: 'Free daily Daf Yomi shiurim with visual learning — Intro, Full Shiur, and Review for every daf.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const todaysDaf = getTodaysDaf();
  const masechta = getMasechta(todaysDaf.masechta);

  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased bg-white text-slate-800 min-h-screen`}>
        <Navbar
          todayMasechta={masechta?.name ?? ''}
          todayMasectaId={todaysDaf.masechta}
          todayDaf={todaysDaf.daf}
        />
        <main className="pt-14">{children}</main>
        <footer className="mt-20 border-t border-gray-100 py-10 text-center">
          <p className="text-sm text-slate-400">Daf HaChaim &mdash; Free for all those who wish to learn</p>
        </footer>
      </body>
    </html>
  );
}

import Link from 'next/link';
import { getTodaysDaf } from '@/lib/dafYomi';
import { getMasechta } from '@/data/shas';

export default function HomePage() {
  const todaysDaf = getTodaysDaf();
  const masechta = getMasechta(todaysDaf.masechta);

  return (
    <div className="max-w-3xl mx-auto px-6">

      {/* ── Hero ── */}
      <section className="pt-20 pb-16 text-center">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
          A Unique Visual Learning Experience
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          Daf HaChaim
        </h1>
        <p className="text-slate-400 text-lg max-w-sm mx-auto leading-relaxed">
          Three shiurim for every daf of Shas — Intro, Full Shiur, and Review.
        </p>
      </section>

      {/* ── Today's Daf card ── */}
      <section className="mb-16">
        <div className="border border-gray-200 rounded-2xl p-8 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-6 font-medium">Today&apos;s Daf</p>

          <div className="hebrew text-4xl font-bold text-indigo-600 mb-1">
            {masechta?.hebrewName}
          </div>
          <p className="text-2xl font-bold text-slate-800 mb-1">{masechta?.name}</p>
          <p className="text-6xl font-bold text-slate-900 mb-8">{todaysDaf.daf}</p>

          <div className="grid grid-cols-3 gap-2">
            {(['intro', 'shiur', 'review'] as const).map((type) => (
              <Link
                key={type}
                href={`/daf/${todaysDaf.masechta}/${todaysDaf.daf}?type=${type}`}
                className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors text-center ${
                  type === 'shiur'
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-slate-700'
                }`}
              >
                {type === 'intro' ? 'Intro' : type === 'shiur' ? 'Full Shiur' : 'Review'}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three shiurim ── */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-slate-800 mb-1">Three Shiurim Per Daf</h2>
        <p className="text-slate-400 text-sm mb-6">By Rabbi Shlomie Schwartzberg</p>

        <div className="space-y-3">
          {[
            {
              title: 'One Minute Intro',
              desc: 'A concise visual overview of key concepts — perfect to watch before you begin the daf.',
              type: 'intro',
            },
            {
              title: 'Full Daf Shiur',
              desc: 'Complete shiur with the daf text displayed alongside the Maggid Shiur.',
              type: 'shiur',
            },
            {
              title: 'Five Minute Review',
              desc: 'Animated visual summary with charts and illustrations to reinforce what you learned.',
              type: 'review',
            },
          ].map((item) => (
            <Link
              key={item.type}
              href={`/daf/${todaysDaf.masechta}/${todaysDaf.daf}?type=${item.type}`}
              className="flex items-start gap-4 p-5 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 transition-all block group"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.title}</p>
                <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Browse CTA ── */}
      <section className="mb-20 text-center">
        <Link
          href="/choose"
          className="inline-block border border-gray-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 font-semibold px-8 py-3 rounded-xl text-sm transition-all"
        >
          Browse All Dafim →
        </Link>
        <p className="text-slate-400 text-xs mt-3">All 37 masechtos of Shas</p>
      </section>

    </div>
  );
}

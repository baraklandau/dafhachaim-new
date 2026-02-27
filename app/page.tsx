import Link from 'next/link';
import { getTodaysDaf } from '@/lib/dafYomi';
import { getMasechta } from '@/data/shas';

export default function HomePage() {
  const todaysDaf = getTodaysDaf();
  const masechta = getMasechta(todaysDaf.masechta);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-amber-50 to-stone-50 px-4 py-20 text-center border-b border-amber-100">
        <h1 className="text-5xl sm:text-6xl font-bold mb-3 text-slate-800">
          <span className="text-amber-600">Daf</span> HaChaim
        </h1>
        <p className="text-slate-500 mb-12 tracking-widest uppercase text-xs font-medium">
          A Unique Visual Learning Experience
        </p>

        {/* Today's Daf card */}
        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-xl border border-amber-200">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-4 font-medium">Today&apos;s Daf</p>

          <div className="hebrew text-4xl font-bold text-amber-600 mb-1">
            {masechta?.hebrewName}
          </div>
          <h2 className="text-2xl font-bold text-slate-700">{masechta?.name}</h2>
          <p className="text-6xl font-bold text-slate-800 mt-1 mb-8">{todaysDaf.daf}</p>

          <div className="grid grid-cols-3 gap-3">
            {(['intro', 'shiur', 'review'] as const).map((type) => (
              <Link
                key={type}
                href={`/daf/${todaysDaf.masechta}/${todaysDaf.daf}?type=${type}`}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-2 rounded-xl text-sm transition-colors text-center shadow-sm"
              >
                {type === 'intro' ? '▶ Intro' : type === 'shiur' ? '▶ Shiur' : '▶ Review'}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three shiurim ── */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-2 text-slate-700">Three Shiurim for Every Daf</h2>
        <p className="text-center text-slate-400 text-sm mb-10">By Rabbi Shlomie Schwartzberg</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              emoji: '⚡',
              title: 'One Minute Intro',
              desc: 'A concise visual overview of the key concepts — the perfect way to prepare before the daf.',
              border: 'border-blue-200 bg-blue-50',
              type: 'intro',
            },
            {
              emoji: '📖',
              title: 'Full Daf Shiur',
              desc: 'Complete shiur with the daf text on screen — lines are highlighted as the Maggid Shiur explains.',
              border: 'border-amber-200 bg-amber-50',
              type: 'shiur',
            },
            {
              emoji: '🔄',
              title: 'Five Minute Review',
              desc: 'Animated visual summary with charts and illustrations to reinforce the key concepts.',
              border: 'border-green-200 bg-green-50',
              type: 'review',
            },
          ].map((item) => (
            <Link
              key={item.type}
              href={`/daf/${todaysDaf.masechta}/${todaysDaf.daf}?type=${item.type}`}
              className={`rounded-2xl border-2 p-6 ${item.border} hover:shadow-md hover:-translate-y-1 transition-all block`}
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Browse CTA ── */}
      <section className="text-center px-4 pb-16">
        <Link
          href="/choose"
          className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors shadow-md"
        >
          Browse All Dafim →
        </Link>
        <p className="text-slate-400 text-sm mt-3">Access any daf from the entire Shas</p>
      </section>

    </div>
  );
}

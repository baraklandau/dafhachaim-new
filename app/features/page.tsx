'use client';

import { useState } from 'react';

const FEATURES = [
  { title: 'Berachos', png: 'https://assets.dafapp.com/poster/brachot.png', url: 'https://assets.dafapp.com/intro-seder-brochos.mp4' },
  { title: 'Shabbos — Melochos 1–11', png: 'https://assets.dafapp.com/poster/39-1.png', url: 'https://assets.dafapp.com/shabbos-39-melochos-1-thru-11.mp4' },
  { title: 'Shabbos — Melochos 12–24', png: 'https://assets.dafapp.com/poster/39-2png.png', url: 'https://assets.dafapp.com/shabbos-39-melochos-12-thru-24.mp4' },
  { title: 'Shabbos — Melochos 25–39', png: 'https://assets.dafapp.com/poster/39-3.png', url: 'https://assets.dafapp.com/Shabbos%2039%20Melochos%2025%20thru%2039.mp4' },
  { title: 'Eruvin — Chatzeros', png: 'https://assets.dafapp.com/poster/eruvim.png', url: 'https://assets.dafapp.com/eruvin-chatzeros-1.mp4' },
  { title: 'Eruvin — Techumim', png: 'https://assets.dafapp.com/poster/eruvim-2.png', url: 'https://assets.dafapp.com/eruvin-techumim-1.mp4' },
  { title: 'Pesachim', png: 'https://assets.dafapp.com/poster/pesachim.png', url: 'https://assets.dafapp.com/intro-seder-pesochim.mp4' },
  { title: 'Shekalim', png: 'https://assets.dafapp.com/poster/shkolim.png', url: 'https://assets.dafapp.com/shekolim-overview.mp4' },
  { title: 'Yoma', png: 'https://assets.dafapp.com/poster/yuma.png', url: 'https://assets.dafapp.com/intro-seder-yoma.mp4' },
  { title: 'Sukkah', png: 'https://assets.dafapp.com/poster/pesachim.png', url: 'https://assets.dafapp.com/intro-seder-succos.mp4' },
  { title: 'Beitzah', png: 'https://assets.dafapp.com/poster/beitzah.png', url: 'https://assets.dafapp.com/beitzah-presentation.mp4' },
  { title: 'Rosh Hashana — Part 1', png: 'https://assets.dafapp.com/poster/rosh-hashanah.png', url: 'https://assets.dafapp.com/overview-rosh-hashanah-1.mp4' },
  { title: 'Rosh Hashana — Part 2', png: 'https://assets.dafapp.com/poster/rosh-hashanah-2.png', url: 'https://assets.dafapp.com/overview-rosh-hashanah-2.mp4' },
  { title: 'Taanis', png: 'https://assets.dafapp.com/poster/taanis.png', url: 'https://assets.dafapp.com/intro-seder-taanis.mp4' },
  { title: 'Megillah', png: 'https://assets.dafapp.com/poster/megillah.png', url: 'https://assets.dafapp.com/overview-megillah.mp4' },
  { title: 'Moed Katan', png: 'https://assets.dafapp.com/poster/moed-katan.png', url: 'https://assets.dafapp.com/overview-moedkatan.mp4' },
  { title: 'Chagigah', png: null, url: 'https://assets.dafapp.com/chagigah-overview.mp4' },
  { title: 'Yevamos', png: 'https://assets.dafapp.com/poster/yevamos.png', url: 'https://assets.dafapp.com/yevamos-overview.mp4' },
  { title: 'Kesubos', png: 'https://assets.dafapp.com/poster/kesubos.png', url: 'https://assets.dafapp.com/kesubos-overview.mp4' },
  { title: 'Nedarim', png: 'https://assets.dafapp.com/poster/nedarin.png', url: 'https://assets.dafapp.com/nedarim-overview.mp4' },
  { title: 'Nazir', png: 'https://assets.dafapp.com/poster/nazir.png', url: 'https://assets.dafapp.com/nazir.overview.mp4' },
  { title: 'Sotah', png: 'https://assets.dafapp.com/poster/sotah.png', url: 'https://assets.dafapp.com/sotah-overview.mp4' },
  { title: 'Gittin', png: 'https://assets.dafapp.com/poster/gitten.png', url: 'https://assets.dafapp.com/gitten-overview.mp4' },
  { title: 'Kiddushin — Intro', png: 'https://assets.dafapp.com/poster/kIddushin.png', url: 'https://assets.dafapp.com/intro-seder-kiddushin.mp4' },
  { title: 'Kiddushin', png: 'https://assets.dafapp.com/poster/kIddushin.png', url: 'https://assets.dafapp.com/keddushin-overview.mp4' },
  { title: 'Bava Kama', png: 'https://assets.dafapp.com/poster/bk.png', url: 'https://assets.dafapp.com/overview-bava-kama.mp4' },
  { title: 'Bava Metzia', png: 'https://assets.dafapp.com/poster/bm.png', url: 'https://assets.dafapp.com/bava-metzia-overview.mp4' },
  { title: 'Bava Basra', png: 'https://assets.dafapp.com/poster/bavabasra.png', url: 'https://assets.dafapp.com/bava-basra-overview.mp4' },
  { title: 'Sanhedrin', png: 'https://assets.dafapp.com/poster/senhedrin.png', url: 'https://assets.dafapp.com/senhedrin-overview.mp4' },
  { title: 'Makkos', png: 'https://assets.dafapp.com/poster/makkos.png', url: 'https://assets.dafapp.com/makkos-overview.mp4' },
  { title: 'Shevuos', png: 'https://assets.dafapp.com/poster/shavuous.png', url: 'https://assets.dafapp.com/shavuous-overview.mp4' },
  { title: 'Avoda Zara', png: 'https://assets.dafapp.com/poster/avodah.png', url: 'https://assets.dafapp.com/avodah-zara-overview.mp4' },
  { title: 'Horios', png: 'https://assets.dafapp.com/poster/horiyos.png', url: 'https://assets.dafapp.com/horiyos-overview.mp4' },
  { title: 'Zevachim', png: 'https://assets.dafapp.com/poster/zevochim.png', url: 'https://assets.dafapp.com/zevochim-overview.mp4' },
  { title: 'Kodshim — Intro', png: 'https://assets.dafapp.com/poster/zvachim.png', url: 'https://assets.dafapp.com/intro-seder-kodshim2.mp4' },
  { title: 'Menachos', png: 'https://assets.dafapp.com/poster/menachot.png', url: 'https://assets.dafapp.com/intro-seder-menochos.mp4' },
  { title: 'Chulin', png: 'https://assets.dafapp.com/poster/chulin.png', url: 'https://assets.dafapp.com/intro-seder-chullin.mp4' },
];

export default function FeaturesPage() {
  const [playing, setPlaying] = useState<{ title: string; url: string } | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Feature Presentations</h1>
        <p className="text-slate-400 text-sm mt-1">
          Fully-animated introductions to entire Masechtos — history, concepts, and context.
        </p>
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {FEATURES.map((f) => (
          <button
            key={f.url}
            onClick={() => setPlaying(f)}
            className="group text-left border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-400 hover:shadow-md transition-all"
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-slate-100 relative overflow-hidden">
              {f.png ? (
                <img
                  src={f.png}
                  alt={f.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-50">
                  <span className="text-indigo-300 text-2xl">▶</span>
                </div>
              )}
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <span className="text-indigo-600 text-sm ml-0.5">▶</span>
                </div>
              </div>
            </div>
            {/* Title */}
            <div className="p-3">
              <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors leading-tight">
                {f.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal player */}
      {playing && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setPlaying(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-slate-800">{playing.title}</h2>
              <button
                onClick={() => setPlaying(null)}
                className="text-slate-400 hover:text-slate-700 transition-colors text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <video
              src={playing.url}
              controls
              autoPlay
              className="w-full aspect-video bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
}

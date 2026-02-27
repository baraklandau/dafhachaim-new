export default function FeaturesPage() {
  const features = [
    { masechta: 'Zevachim',   hebrewName: 'זבחים'    },
    { masechta: 'Horios',     hebrewName: 'הוריות'   },
    { masechta: 'Avoda Zara', hebrewName: 'עבודה זרה' },
    { masechta: 'Shevuos',    hebrewName: 'שבועות'   },
    { masechta: 'Nedarim',    hebrewName: 'נדרים'    },
    { masechta: 'Kesubos',    hebrewName: 'כתובות'   },
    { masechta: 'Menachos',   hebrewName: 'מנחות'    },
    { masechta: 'Chulin',     hebrewName: 'חולין'    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Feature Presentations</h1>
        <p className="text-slate-400 text-sm mt-1 max-w-md">
          Extended fully-animated introductions to entire Masechtos — covering history, concepts, and context.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {features.map((f) => (
          <div
            key={f.masechta}
            className="border border-gray-200 rounded-xl p-5 flex items-center gap-4"
          >
            <div className="w-1.5 h-8 rounded-full bg-indigo-400 flex-shrink-0" />
            <div>
              <div className="hebrew text-xl font-bold text-indigo-600">{f.hebrewName}</div>
              <div className="text-sm font-semibold text-slate-700 mt-0.5">{f.masechta} Overview</div>
              <div className="text-xs text-slate-400 mt-0.5">Full masechta introduction</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-gray-200 rounded-xl p-6 text-center">
        <p className="text-slate-500 font-medium text-sm">Videos are being linked to the new player.</p>
        <p className="text-slate-400 text-xs mt-1">Coming very soon.</p>
      </div>
    </div>
  );
}

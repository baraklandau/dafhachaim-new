export default function FeaturesPage() {
  const features = [
    { masechta: 'Zevachim',   hebrewName: 'זבחים',    border: 'border-orange-200 bg-orange-50' },
    { masechta: 'Horios',     hebrewName: 'הוריות',   border: 'border-purple-200 bg-purple-50' },
    { masechta: 'Avoda Zara', hebrewName: 'עבודה זרה', border: 'border-slate-200 bg-slate-50'  },
    { masechta: 'Shevuos',    hebrewName: 'שבועות',   border: 'border-blue-200 bg-blue-50'    },
    { masechta: 'Nedarim',    hebrewName: 'נדרים',    border: 'border-teal-200 bg-teal-50'    },
    { masechta: 'Kesubos',    hebrewName: 'כתובות',   border: 'border-rose-200 bg-rose-50'    },
    { masechta: 'Menachos',   hebrewName: 'מנחות',    border: 'border-amber-200 bg-amber-50'  },
    { masechta: 'Chulin',     hebrewName: 'חולין',    border: 'border-green-200 bg-green-50'  },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-3 text-slate-800">Feature Presentations</h1>
      <p className="text-slate-400 text-center mb-10 max-w-lg mx-auto text-sm">
        Extended fully-animated introductions to entire Masechtos — covering history,
        concepts, and context before you begin learning.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <div
            key={f.masechta}
            className={`rounded-2xl border-2 p-6 ${f.border} flex items-center gap-4`}
          >
            <div>
              <div className="hebrew text-2xl font-bold text-amber-600">{f.hebrewName}</div>
              <div className="text-slate-700 font-semibold mt-1">{f.masechta} Overview</div>
              <div className="text-slate-400 text-sm mt-1">Full masechta introduction</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-sm">
        <p className="text-slate-600 font-medium">Feature Presentation videos are being linked to the new player.</p>
        <p className="text-slate-400 text-sm mt-2">Coming very soon.</p>
      </div>
    </div>
  );
}

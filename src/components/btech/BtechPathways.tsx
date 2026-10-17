import React from 'react';

export const BtechPathways: React.FC = () => {
  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">

      <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
        Comparison of Admission Pathways
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* First-Year Admission */}
        <div className="p-6 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center">
              1
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Pathway A: 1st Year B.Tech Admission
              </h4>

              <p className="text-xs text-slate-500">
                For 10+2 / Higher Secondary Science Students
              </p>
            </div>

          </div>

          <ul className="space-y-2 text-xs text-slate-700">
            <li>• Appears for NTA JEE Main examination.</li>
            <li>• Registers on OJEE portal with JEE Main rank card.</li>
            <li>• Participates in state-level centralized seat allotment rounds.</li>
            <li>• Enters 1st semester of 4-year B.Tech program.</li>
          </ul>

        </div>

        {/* Lateral Entry */}
        <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center">
              2
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Pathway B: Lateral Entry (Direct 2nd Year)
              </h4>

              <p className="text-xs text-slate-500">
                For Polytechnic Diploma & B.Sc Graduates
              </p>
            </div>

          </div>

          <ul className="space-y-2 text-xs text-slate-700">
            <li>• Appears for OJEE Lateral Entry entrance examination.</li>
            <li>• Obtains OJEE Lateral Entry Rank.</li>
            <li>• Participates in OJEE Lateral Entry counselling.</li>
            <li>• Directly joins 3rd semester (2nd year) B.Tech program.</li>
          </ul>

        </div>

      </div>
    </section>
  );
};
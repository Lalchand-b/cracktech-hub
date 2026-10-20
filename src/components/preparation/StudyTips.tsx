import React from 'react';

export const StudyTips: React.FC = () => {
  return (
    <section className="mt-8 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">

      <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
        Proven Examination Preparation Strategies
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Fundamental Concepts */}
        <article className="p-5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">

          <h4 className="font-bold text-blue-900 text-sm">
            1. Focus on Fundamental Concepts
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed">
            Avoid rote memorization. Technical MCQs in OJEE
            and GATE test core analytical principles rather
            than long proofs.
          </p>

        </article>

        {/* Error Log */}
        <article className="p-5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">

          <h4 className="font-bold text-indigo-900 text-sm">
            2. Maintain an Error Formula Log
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed">
            Keep a dedicated notebook for formulas, unit
            conversions, and recurring mistakes from mock tests.
          </p>

        </article>

      </div>
    </section>
  );
};

export default StudyTips;
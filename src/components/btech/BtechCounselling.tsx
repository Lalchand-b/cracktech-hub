import React from 'react';

interface Props {
  info: any;
}

export const BtechCounselling: React.FC<Props> = ({ info }) => {
  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">

      <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
        Counselling & College Choice Filling Steps
      </h3>

      <div className="space-y-3 text-xs text-slate-700">

        {info.counsellingInfo.steps.map(
          (step: string, index: number) => (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3"
            >

              <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </span>

              <span>{step}</span>

            </div>
          )
        )}

      </div>
    </section>
  );
};
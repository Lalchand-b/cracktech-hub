import React from 'react';
import { ArrowRight, Building } from 'lucide-react';
import type { PageType } from '../../types';

interface Props {
  info: any;
  setActivePage: (page: PageType) => void;
}

export const BtechOverview: React.FC<Props> = ({
  info,
  setActivePage,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* Overview and Eligibility */}
      <div className="lg:col-span-7 space-y-6">

        <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
            About B.Tech Studies in Odisha
          </h3>

          <p className="text-slate-700 text-sm leading-relaxed">
            {info.fullOverview}
          </p>
        </section>

        <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
            Eligibility Benchmarks
          </h3>

          <div className="space-y-3 text-xs md:text-sm text-slate-700">

            <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-100">
              <strong className="text-teal-900 block mb-1">
                1st Year Admission Qualification:
              </strong>

              {info.eligibility.qualification}
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
              <strong className="text-blue-900 block mb-1">
                Lateral Entry B.Tech Qualification:
              </strong>

              Pass in 3-Year Diploma in Engineering/Technology with
              minimum 45% aggregate marks (40% for SC/ST).
            </div>

          </div>
        </section>
      </div>

      {/* University Statistics */}
      <div className="lg:col-span-5 space-y-6">

        <section className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 space-y-4">

          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-teal-400" />
            Key B.Tech Statistics
          </h3>

          <div className="divide-y divide-slate-800 text-xs">

            <div className="py-2.5 flex justify-between gap-4">
              <span className="text-slate-400">
                Affiliating University
              </span>

              <span className="font-semibold text-white">
                BPUT Rourkela
              </span>
            </div>

            <div className="py-2.5 flex justify-between gap-4">
              <span className="text-slate-400">
                Total Duration
              </span>

              <span className="font-semibold text-white">
                4 Years (8 Semesters)
              </span>
            </div>

            <div className="py-2.5 flex justify-between gap-4">
              <span className="text-slate-400">
                Primary Admission Channel
              </span>

              <span className="font-semibold text-teal-400">
                JEE Main / OJEE Counselling
              </span>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setActivePage('preparation')}
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Practice B.Tech Practice Tests</span>

            <ArrowRight className="w-4 h-4" />
          </button>

        </section>
      </div>
    </div>
  );
};
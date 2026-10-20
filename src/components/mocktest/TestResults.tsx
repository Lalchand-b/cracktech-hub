import React from 'react';
import { FileText, RotateCcw } from 'lucide-react';
import type { TestResultsData } from './mockTestTypes';

interface Props {
  selectedExam: string;
  selectedSubject: string;
  results: TestResultsData;
  onReview: () => void;
  onRetake: () => void;
  onDashboard: () => void;
}

export const TestResults: React.FC<Props> = ({
  selectedExam,
  selectedSubject,
  results,
  onReview,
  onRetake,
  onDashboard,
}) => (
  <section className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">

    <div className="space-y-8">

      <div className="text-center space-y-3">

        <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto text-3xl font-bold">
          📊
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Mock Test Result Scorecard
        </h3>

        <p className="text-xs sm:text-sm text-slate-500">
          Examination:{' '}
          <strong className="text-slate-800">
            {selectedExam}
          </strong>{' '}
          ({selectedSubject})
        </p>

      </div>

      {/* Total score */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-3 shadow-md">

        <span className="text-xs font-bold uppercase text-blue-400 tracking-wider">
          Total Score Achieved
        </span>

        <div className="text-4xl sm:text-5xl font-black text-white">
          {results.score}{' '}
          <span className="text-xl font-bold text-slate-400">
            / {results.maxScore} Marks
          </span>
        </div>

        <div className="inline-block px-4 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
          Percentage: {results.percentage}%
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <span className="block text-2xl font-extrabold text-slate-900">
            {results.attempted} / {results.total}
          </span>

          <span className="text-[11px] font-bold text-slate-500 uppercase">
            Attempted Questions
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
          <span className="block text-2xl font-extrabold text-emerald-700">
            {results.correct}
          </span>

          <span className="text-[11px] font-bold text-emerald-600 uppercase">
            Correct (+{results.correct * 4})
          </span>
        </div>

        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
          <span className="block text-2xl font-extrabold text-rose-700">
            {results.incorrect}
          </span>

          <span className="text-[11px] font-bold text-rose-600 uppercase">
            Incorrect (-{results.incorrect})
          </span>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
          <span className="block text-2xl font-extrabold text-amber-700">
            {results.unattempted}
          </span>

          <span className="text-[11px] font-bold text-amber-600 uppercase">
            Unattempted
          </span>
        </div>

      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-100">

        <button
          type="button"
          onClick={onReview}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center justify-center gap-2 shadow-md"
        >
          <FileText className="w-4 h-4" />
          <span>Review Detailed Solutions &amp; Answers</span>
        </button>

        <button
          type="button"
          onClick={onRetake}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 inline-flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake / Select Another Test</span>
        </button>

        <button
          type="button"
          onClick={onDashboard}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
        >
          View Student Dashboard &rarr;
        </button>

      </div>
    </div>
  </section>
);

export default TestResults;
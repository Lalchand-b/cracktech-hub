import React from 'react';
import { Play } from 'lucide-react';

interface Props {
  onBack: () => void;
  onStart: () => void;
}

export const TestInstructions: React.FC<Props> = ({
  onBack,
  onStart,
}) => (
  <section className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">

    <div className="border-b border-slate-100 pb-4">
      <h3 className="text-xl font-bold text-slate-900">
        Official CBT Examination Instructions
      </h3>

      <p className="text-xs text-slate-500">
        Please read all guidelines carefully before launching
        the test timer.
      </p>
    </div>

    <div className="space-y-4 text-xs text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200">

      <h4 className="font-bold text-slate-900 text-sm">
        General Rules &amp; Marking Guidelines:
      </h4>

      <ul className="list-disc pl-5 space-y-2">
        <li>
          Total test duration is <strong>10 Minutes</strong>
          (60 seconds per question).
        </li>

        <li>
          Each question carries <strong>4 Marks</strong>
          for correct answers.
        </li>

        <li>
          Incorrect answers incur <strong>-1 Negative Mark</strong>.
          Unattempted questions yield 0 marks.
        </li>

        <li>
          You can jump directly to any question using the
          <strong> Question Palette</strong> on the sidebar.
        </li>

        <li>
          You can mark questions for review using the
          <strong> Mark for Review</strong> button.
        </li>
      </ul>

      <h4 className="font-bold text-slate-900 text-sm pt-2">
        Question Palette Color Guide:
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 font-semibold text-[11px]">

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-emerald-600 text-white text-[10px] flex items-center justify-center">
            1
          </div>
          <span>Answered</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-rose-500 text-white text-[10px] flex items-center justify-center">
            2
          </div>
          <span>Not Answered</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-purple-600 text-white text-[10px] flex items-center justify-center">
            3
          </div>
          <span>Marked for Review</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center">
            4
          </div>
          <span>Not Visited</span>
        </div>

      </div>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-slate-100">

      <button
        type="button"
        onClick={onBack}
        className="text-xs font-bold text-slate-500 hover:text-slate-800"
      >
        &larr; Back to Test Selection
      </button>

      <button
        type="button"
        onClick={onStart}
        className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 inline-flex items-center gap-2"
      >
        <Play className="w-4 h-4 fill-white" />
        <span>Start Mock Test Now</span>
      </button>

    </div>

  </section>
);

export default TestInstructions;
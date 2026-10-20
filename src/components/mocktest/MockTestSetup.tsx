import React from 'react';
import { Play } from 'lucide-react';

type ExamCategory = 'OJEE' | 'Diploma' | 'B.Tech';

interface Props {
  selectedExam: ExamCategory;
  setSelectedExam: (exam: ExamCategory) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  onPrepareTest: () => void;
}

export const MockTestSetup: React.FC<Props> = ({
  selectedExam,
  setSelectedExam,
  selectedSubject,
  setSelectedSubject,
  onPrepareTest,
}) => (
  <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">

    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
        <Play className="w-5 h-5" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-900">
          Select Mock Test Paper
        </h3>

        <p className="text-xs text-slate-500">
          Choose exam category and test mode to begin.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Exam selection */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-700 uppercase">
          Target Examination:
        </label>

        <div className="grid grid-cols-3 gap-3 text-xs font-bold">
          {(['OJEE', 'Diploma', 'B.Tech'] as const).map((exam) => (
            <button
              key={exam}
              type="button"
              onClick={() => setSelectedExam(exam)}
              className={`p-3.5 rounded-xl border text-center transition-all ${
                selectedExam === exam
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {exam}
            </button>
          ))}
        </div>
      </div>

      {/* Subject selection */}
      <div className="space-y-3">
        <label
          htmlFor="mock-subject"
          className="block text-xs font-bold text-slate-700 uppercase"
        >
          Test Mode / Subject:
        </label>

        <select
          id="mock-subject"
          value={selectedSubject}
          onChange={(event) =>
            setSelectedSubject(event.target.value)
          }
          className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-xs focus:outline-none focus:border-blue-500"
        >
          <option value="Full Mock Test">
            Full Mock Test (Combined Subjects)
          </option>

          <option value="Mathematics">
            Mathematics
          </option>

          <option value="Electrical Engineering">
            Electrical Engineering
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Mechanics">
            Engineering Mechanics
          </option>

          <option value="Computer Science">
            Computer Science &amp; IT
          </option>
        </select>
      </div>

    </div>

    {/* Test details */}
    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">

      <div>
        <span className="block text-slate-400 font-medium">
          Questions
        </span>
        <span className="font-extrabold text-slate-900 text-base">
          10 MCQs
        </span>
      </div>

      <div>
        <span className="block text-slate-400 font-medium">
          Duration
        </span>
        <span className="font-extrabold text-slate-900 text-base">
          10 Minutes
        </span>
      </div>

      <div>
        <span className="block text-slate-400 font-medium">
          Marking Scheme
        </span>
        <span className="font-extrabold text-emerald-600 text-base">
          +4 / -1 Marks
        </span>
      </div>

      <div>
        <span className="block text-slate-400 font-medium">
          Mode
        </span>
        <span className="font-extrabold text-indigo-600 text-base">
          CBT Interface
        </span>
      </div>

    </div>

    <div className="pt-2 flex justify-end">
      <button
        type="button"
        onClick={onPrepareTest}
        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md inline-flex items-center justify-center gap-2"
      >
        Proceed to Instructions &rarr;
      </button>
    </div>

  </section>
);

export default MockTestSetup;
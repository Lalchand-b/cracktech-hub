import React from 'react';

import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  Trash2,
  Send,
} from 'lucide-react';

import type {
  QuestionItem,
  QuestionState,
} from './mockTestTypes';

type ExamCategory = 'OJEE' | 'Diploma' | 'B.Tech';

interface Props {
  selectedExam: ExamCategory;
  selectedSubject: string;
  testQuestions: QuestionItem[];
  currentIndex: number;
  userStates: Record<number, QuestionState>;
  timeLeftSeconds: number;

  onSelectOption: (optionIndex: number) => void;
  onClearOption: () => void;
  onToggleReview: () => void;
  onNavigate: (index: number) => void;
  onFinish: () => void;
}

const formatTimer = (seconds: number) => {
  const safeSeconds = Math.max(0, seconds);

  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;

  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const ActiveTest: React.FC<Props> = ({
  selectedExam,
  selectedSubject,
  testQuestions,
  currentIndex,
  userStates,
  timeLeftSeconds,
  onSelectOption,
  onClearOption,
  onToggleReview,
  onNavigate,
  onFinish,
}) => {
  const currentQuestion = testQuestions[currentIndex];

  if (!currentQuestion) {
    return null;
  }

  const counts = {
    answered: Object.values(userStates).filter(
      (state) =>
        state.chosenOption !== null &&
        !state.isMarkedForReview
    ).length,

    marked: Object.values(userStates).filter(
      (state) => state.isMarkedForReview
    ).length,

    notAnswered: Object.values(userStates).filter(
      (state) =>
        state.chosenOption === null &&
        state.isVisited
    ).length,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Question area */}
      <div className="lg:col-span-2 space-y-6">

        {/* Exam header and timer */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl flex items-center justify-between shadow-md">

          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase text-blue-400">
              {selectedExam} Mock Simulator
            </span>

            <h3 className="font-bold text-sm sm:text-base text-white">
              {selectedSubject}
            </h3>
          </div>

          <div
            className={`px-4 py-2 rounded-xl border font-mono font-bold text-base sm:text-lg flex items-center gap-2 ${
              timeLeftSeconds < 180
                ? 'bg-rose-950 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-800 border-slate-700 text-emerald-400'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>

        </div>

        {/* Current question */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-6">

          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">

            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
              Question {currentIndex + 1} of {testQuestions.length}
            </span>

            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
              Subject: {currentQuestion.subject}
            </span>

          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm sm:text-base leading-relaxed">
            {currentQuestion.question}
          </div>

          {/* Answer options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, optionIndex) => {
              const selected =
                userStates[currentIndex]?.chosenOption === optionIndex;

              return (
                <button
                  type="button"
                  key={optionIndex}
                  onClick={() => onSelectOption(optionIndex)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 text-xs sm:text-sm font-semibold ${
                    selected
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      selected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {String.fromCharCode(65 + optionIndex)}
                  </span>

                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Question controls */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">

            <div className="flex flex-wrap items-center gap-2">

              <button
                type="button"
                onClick={onToggleReview}
                className={`px-3.5 py-2 rounded-xl font-bold transition-colors inline-flex items-center gap-1.5 border ${
                  userStates[currentIndex]?.isMarkedForReview
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />

                <span>
                  {userStates[currentIndex]?.isMarkedForReview
                    ? 'Marked'
                    : 'Mark for Review'}
                </span>
              </button>

              <button
                type="button"
                onClick={onClearOption}
                disabled={
                  userStates[currentIndex]?.chosenOption === null
                }
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 disabled:opacity-40 inline-flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Selection</span>
              </button>

            </div>

            {/* Previous and next */}
            <div className="flex items-center gap-2">

              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => onNavigate(currentIndex - 1)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold disabled:opacity-40 inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <button
                type="button"
                disabled={currentIndex === testQuestions.length - 1}
                onClick={() => onNavigate(currentIndex + 1)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold disabled:opacity-40 inline-flex items-center gap-1 shadow-sm"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </section>
      </div>

      {/* Question palette */}
      <aside className="space-y-6">

        <section className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-4">

          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Question Navigation Palette
          </h4>

          <div className="grid grid-cols-5 gap-2.5">

            {testQuestions.map((_, index) => {
              const state = userStates[index];

              let style =
                'bg-slate-100 text-slate-600 border-slate-200';

              if (state?.isMarkedForReview) {
                style =
                  'bg-purple-600 text-white border-purple-600';
              } else if (
                state?.chosenOption !== null &&
                state?.chosenOption !== undefined
              ) {
                style =
                  'bg-emerald-600 text-white border-emerald-600';
              } else if (state?.isVisited) {
                style =
                  'bg-rose-500 text-white border-rose-500';
              }

              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => onNavigate(index)}
                  className={`h-10 rounded-xl font-extrabold text-xs border transition-all ${style} ${
                    currentIndex === index
                      ? 'ring-2 ring-blue-500 ring-offset-2 scale-105'
                      : ''
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}

          </div>

          {/* Answer statistics */}
          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-semibold text-slate-600">

            <div className="flex justify-between">
              <span>Answered:</span>
              <span className="text-emerald-600 font-bold">
                {counts.answered}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Marked for Review:</span>
              <span className="text-purple-600 font-bold">
                {counts.marked}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Not Answered:</span>
              <span className="text-rose-600 font-bold">
                {counts.notAnswered}
              </span>
            </div>

          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={onFinish}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 inline-flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Examination Paper</span>
          </button>

        </section>
      </aside>

    </div>
  );
};

export default ActiveTest;
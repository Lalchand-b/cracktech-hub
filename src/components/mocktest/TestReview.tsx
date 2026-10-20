import React from 'react';
import {
  CheckCircle2,
  XCircle,
} from 'lucide-react';

import type {
  QuestionItem,
  QuestionState,
} from './mockTestTypes';

interface Props {
  testQuestions: QuestionItem[];
  userStates: Record<number, QuestionState>;
  onBackToResults: () => void;
  onBackToSetup: () => void;
}

export const TestReview: React.FC<Props> = ({
  testQuestions,
  userStates,
  onBackToResults,
  onBackToSetup,
}) => (
  <section className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">

    <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">

      <div>
        <h3 className="text-xl font-bold text-slate-900">
          Question Paper Review &amp; Step-by-Step Solutions
        </h3>

        <p className="text-xs text-slate-500">
          Analyze your answers and master key concepts.
        </p>
      </div>

      <button
        type="button"
        onClick={onBackToResults}
        className="text-xs font-bold text-blue-600 hover:underline"
      >
        &larr; Back to Scorecard
      </button>

    </div>

    <div className="space-y-6">

      {testQuestions.map((question, index) => {
        const userChoice =
          userStates[index]?.chosenOption ?? null;

        const isCorrect =
          userChoice === question.answer;

        const isSkipped =
          userChoice === null;

        return (
          <article
            key={index}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
          >

            {/* Question status */}
            <div className="flex items-center justify-between gap-3 text-xs font-bold">

              <span className="text-slate-500">
                Question {index + 1} of {testQuestions.length}
              </span>

              {isCorrect ? (
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Correct (+4)
                </span>
              ) : isSkipped ? (
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800">
                  Unattempted (0)
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-800 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  Incorrect (-1)
                </span>
              )}

            </div>

            {/* Question text */}
            <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
              {question.question}
            </h4>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">

              {question.options.map((option, optionIndex) => {
                const correctOption =
                  optionIndex === question.answer;

                const chosenOption =
                  optionIndex === userChoice;

                let style =
                  'bg-white border-slate-200 text-slate-700';

                if (correctOption) {
                  style =
                    'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                } else if (chosenOption && !correctOption) {
                  style =
                    'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                }

                return (
                  <div
                    key={optionIndex}
                    className={`p-3 rounded-xl border flex items-center gap-2 ${style}`}
                  >
                    <span className="font-bold">
                      {String.fromCharCode(65 + optionIndex)}.
                    </span>

                    <span>{option}</span>
                  </div>
                );
              })}

            </div>

            {/* Explanation */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <strong>💡 Solution / Explanation:</strong>{' '}
              {question.explanation}
            </div>

          </article>
        );
      })}

    </div>

    <div className="pt-4 flex justify-center">
      <button
        type="button"
        onClick={onBackToSetup}
        className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
      >
        Back to Test Selection
      </button>
    </div>

  </section>
);

export default TestReview;
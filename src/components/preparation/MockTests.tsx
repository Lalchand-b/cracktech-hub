import React, { useEffect, useState } from 'react';
import type { MockTest } from '../../types';
import { MOCK_TESTS_DATA } from '../../data/examData';

import {
  Clock,
  Play,
  X,
  RotateCcw,
} from 'lucide-react';

export const MockTests: React.FC = () => {
  const [activeMockTest, setActiveMockTest] =
    useState<MockTest | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [userAnswers, setUserAnswers] =
    useState<Record<number, number>>({});

  const [timeLeftSeconds, setTimeLeftSeconds] =
    useState<number>(600);

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  // Timer
  useEffect(() => {
    if (
      !activeMockTest ||
      isSubmitted ||
      timeLeftSeconds <= 0
    ) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds((previous) => {
        if (previous <= 1) {
          setIsSubmitted(true);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    activeMockTest,
    isSubmitted,
    timeLeftSeconds,
  ]);

  // Start or restart a mock test
  const handleStartMockTest = (test: MockTest) => {
    setActiveMockTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeftSeconds(test.timeLimitMinutes * 60);
    setIsSubmitted(false);
  };

  // Select an answer
  const handleSelectAnswer = (
    questionId: number,
    optionIndex: number
  ) => {
    if (isSubmitted) return;

    setUserAnswers((previous) => ({
      ...previous,
      [questionId]: optionIndex,
    }));
  };

  // Submit test
  const handleSubmitTest = () => {
    setIsSubmitted(true);
  };

  // Calculate score
  const calculateScore = () => {
    if (!activeMockTest) {
      return {
        score: 0,
        total: 0,
        correct: 0,
        wrong: 0,
        unattempted: 0,
      };
    }

    let correct = 0;
    let wrong = 0;

    activeMockTest.questions.forEach((question) => {
      const answer = userAnswers[question.id];

      if (answer !== undefined) {
        if (answer === question.correctAnswer) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    const unattempted =
      activeMockTest.questions.length -
      correct -
      wrong;

    const score = correct * 4 - wrong;

    return {
      score,
      total: activeMockTest.questions.length * 4,
      correct,
      wrong,
      unattempted,
    };
  };

  // Format timer
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Exit quiz
  const handleExitQuiz = () => {
    setActiveMockTest(null);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="mt-8 space-y-8">

      {/* Available Tests */}
      {!activeMockTest ? (
        <div className="space-y-6">

          <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
              Available Online Practice Tests
            </h3>

            <p className="text-xs md:text-sm text-slate-600">
              Test your preparation with timed multiple-choice
              quizzes. Get instant score reports with detailed
              explanations.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {MOCK_TESTS_DATA.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >

                <div className="space-y-3">

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      test.category === 'OJEE'
                        ? 'bg-blue-100 text-blue-700'
                        : test.category === 'Diploma'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-teal-100 text-teal-700'
                    }`}
                  >
                    {test.category} • {test.subject}
                  </span>

                  <h4 className="font-extrabold text-slate-900 text-base">
                    {test.title}
                  </h4>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold pt-1">

                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {test.timeLimitMinutes} Mins
                    </span>

                    <span>•</span>

                    <span>
                      {test.totalQuestions} Questions
                    </span>

                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartMockTest(test)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />

                  <span>Start Practice Quiz</span>
                </button>

              </div>
            ))}

          </div>
        </div>
      ) : (

        /* Active Quiz */
        <section className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8 space-y-6">

          {/* Quiz Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">

            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {activeMockTest.category} Quiz
              </span>

              <h3 className="text-lg md:text-xl font-bold text-slate-900">
                {activeMockTest.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">

              <div
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  timeLeftSeconds < 120
                    ? 'bg-rose-100 text-rose-700 animate-pulse'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                <Clock className="w-4 h-4" />

                <span>
                  Time Remaining: {formatTime(timeLeftSeconds)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleExitQuiz}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                title="Exit Quiz"
                aria-label="Exit quiz"
              >
                <X className="w-5 h-5" />
              </button>

            </div>
          </div>

          {!isSubmitted ? (

            /* Question Interface */
            <div className="space-y-6">

              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">

                <span>
                  Question {currentQuestionIndex + 1} of{' '}
                  {activeMockTest.questions.length}
                </span>

                <span>
                  Marking: +4 Correct / -1 Wrong
                </span>

              </div>

              {/* Question */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-base md:text-lg">
                  {
                    activeMockTest.questions[
                      currentQuestionIndex
                    ].question
                  }
                </h4>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">

                {activeMockTest.questions[
                  currentQuestionIndex
                ].options.map((option, index) => {
                  const questionId =
                    activeMockTest.questions[
                      currentQuestionIndex
                    ].id;

                  const isSelected =
                    userAnswers[questionId] === index;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        handleSelectAnswer(
                          questionId,
                          index
                        )
                      }
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 text-sm font-medium ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>

                      <span>{option}</span>
                    </button>
                  );
                })}

              </div>

              {/* Question Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">

                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() =>
                    setCurrentQuestionIndex(
                      (previous) => previous - 1
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs disabled:opacity-40"
                >
                  &larr; Previous
                </button>

                {currentQuestionIndex <
                activeMockTest.questions.length - 1 ? (

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentQuestionIndex(
                        (previous) => previous + 1
                      )
                    }
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    Next &rarr;
                  </button>

                ) : (

                  <button
                    type="button"
                    onClick={handleSubmitTest}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
                  >
                    Submit & Grade Test
                  </button>

                )}

              </div>
            </div>

          ) : (

            /* Results */
            <div className="space-y-6">

              {(() => {
                const {
                  score,
                  total,
                  correct,
                  wrong,
                  unattempted,
                } = calculateScore();

                return (
                  <>
                    <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 rounded-2xl text-center space-y-3">

                      <h4 className="text-xl font-bold">
                        Quiz Performance Summary
                      </h4>

                      <div className="text-3xl font-extrabold text-blue-400">
                        Score: {score} / {total} Marks
                      </div>

                      <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300 pt-2">

                        <span className="text-emerald-400 font-bold">
                          ✔ {correct} Correct
                        </span>

                        <span className="text-rose-400 font-bold">
                          ✖ {wrong} Wrong
                        </span>

                        <span className="text-amber-400 font-bold">
                          ➖ {unattempted} Unattempted
                        </span>

                      </div>
                    </div>

                    {/* Answer Analysis */}
                    <div className="space-y-4">

                      <h5 className="font-bold text-slate-900 text-base">
                        Question Analysis & Explanations
                      </h5>

                      {activeMockTest.questions.map(
                        (question, index) => {
                          const userAnswer =
                            userAnswers[question.id];

                          const isCorrect =
                            userAnswer === question.correctAnswer;

                          return (
                            <div
                              key={question.id}
                              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                            >

                              <div className="flex flex-wrap items-center justify-between gap-2">

                                <span className="font-bold text-slate-900">
                                  Q{index + 1}: {question.question}
                                </span>

                                {userAnswer === undefined ? (
                                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                                    Unattempted
                                  </span>
                                ) : isCorrect ? (
                                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                                    Correct (+4)
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                                    Wrong (-1)
                                  </span>
                                )}

                              </div>

                              <div className="text-slate-600">
                                <strong>Correct Answer:</strong>{' '}
                                {question.options[
                                  question.correctAnswer
                                ]}
                              </div>

                              <p className="text-slate-500 italic bg-white p-2.5 rounded border border-slate-200">
                                💡 <strong>Explanation:</strong>{' '}
                                {question.explanation}
                              </p>

                            </div>
                          );
                        }
                      )}

                    </div>

                    {/* Retake */}
                    <div className="pt-4 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleStartMockTest(activeMockTest)
                        }
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />

                        <span>Retake This Quiz</span>
                      </button>
                    </div>
                  </>
                );
              })()}

            </div>
          )}

        </section>
      )}

    </div>
  );
};

export default MockTests;
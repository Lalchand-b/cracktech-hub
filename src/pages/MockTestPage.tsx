import React, { useCallback, useEffect, useState } from 'react';
import type { PageType } from '../types';
import { QUESTION_DATABASE } from '../data/questionDatabase';
import { Award } from 'lucide-react';

import { MockTestSetup } from '../components/mocktest/MockTestSetup';
import { TestInstructions } from '../components/mocktest/TestInstructions';
import { ActiveTest } from '../components/mocktest/ActiveTest';
import { TestResults } from '../components/mocktest/TestResults';
import { TestReview } from '../components/mocktest/TestReview';

import type {
  MockTestPhase,
  QuestionItem,
  QuestionState,
  TestResultsData,
} from '../components/mocktest/mockTestTypes';

interface Props {
  setActivePage: (page: PageType) => void;
}

type ExamCategory = 'OJEE' | 'Diploma' | 'B.Tech';

const EMPTY_RESULTS: TestResultsData = {
  total: 0,
  attempted: 0,
  unattempted: 0,
  correct: 0,
  incorrect: 0,
  score: 0,
  maxScore: 0,
  percentage: 0,
};

export const MockTestPage: React.FC<Props> = ({
  setActivePage,
}) => {
  const [selectedExam, setSelectedExam] =
    useState<ExamCategory>('OJEE');

  const [selectedSubject, setSelectedSubject] =
    useState<string>('Full Mock Test');

  const [testQuestions, setTestQuestions] =
    useState<QuestionItem[]>([]);

  const [phase, setPhase] =
    useState<MockTestPhase>('setup');

  const [currentIndex, setCurrentIndex] =
    useState<number>(0);

  const [userStates, setUserStates] =
    useState<Record<number, QuestionState>>({});

  const [timeLeftSeconds, setTimeLeftSeconds] =
    useState<number>(600);

  const [isTimerRunning, setIsTimerRunning] =
    useState<boolean>(false);

  // Calculate the test results.
  const calculateResults = useCallback((): TestResultsData => {
    const total = testQuestions.length;

    let attempted = 0;
    let correct = 0;
    let incorrect = 0;

    testQuestions.forEach((question, index) => {
      const state = userStates[index];

      if (state && state.chosenOption !== null) {
        attempted++;

        if (state.chosenOption === question.answer) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    const maxScore = total * 4;
    const score = correct * 4 - incorrect;

    const percentage =
      maxScore > 0
        ? Math.round((score / maxScore) * 100)
        : 0;

    return {
      total,
      attempted,
      unattempted: total - attempted,
      correct,
      incorrect,
      score,
      maxScore,
      percentage,
    };
  }, [testQuestions, userStates]);

  // Save completed test results in localStorage.
  const saveMockToLocalStorage = useCallback(() => {
    const results = calculateResults();

    const record = {
      date: new Date().toLocaleDateString(),
      title: `${selectedExam} ${selectedSubject} Mock Test`,
      exam: selectedExam,
      score: results.score,
      maxScore: results.maxScore,
      percentage: results.percentage,
      correct: results.correct,
      incorrect: results.incorrect,
      attempted: results.attempted,
      total: results.total,
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem('cracktech_mock_history') || '[]'
      );

      const history = Array.isArray(existing)
        ? existing
        : [];

      history.unshift(record);

      localStorage.setItem(
        'cracktech_mock_history',
        JSON.stringify(history.slice(0, 20))
      );
    } catch (error) {
      console.error('LocalStorage error:', error);
    }
  }, [calculateResults, selectedExam, selectedSubject]);

  // Finish the examination.
  const handleFinishTest = useCallback(() => {
    setIsTimerRunning(false);
    setPhase('results');
    saveMockToLocalStorage();
  }, [saveMockToLocalStorage]);

  // Prepare the selected mock test.
  const handlePrepareTest = () => {
    let questionsPool = QUESTION_DATABASE;

    if (selectedExam !== 'OJEE') {
      questionsPool = QUESTION_DATABASE.filter(
        (question) =>
          question.category === selectedExam ||
          question.category === 'OJEE'
      );
    }

    if (selectedSubject !== 'Full Mock Test') {
      questionsPool = questionsPool.filter(
        (question) =>
          question.subject === selectedSubject
      );
    }

    // Fallback if the selected filters return no questions.
    if (questionsPool.length === 0) {
      questionsPool = QUESTION_DATABASE.slice(0, 10);
    }

    const selected = questionsPool.slice(0, 10);

    setTestQuestions(selected);
    setTimeLeftSeconds(selected.length * 60);
    setCurrentIndex(0);

    const initialStates: Record<number, QuestionState> = {};

    selected.forEach((_, index) => {
      initialStates[index] = {
        chosenOption: null,
        isMarkedForReview: false,
        isVisited: index === 0,
      };
    });

    setUserStates(initialStates);
    setIsTimerRunning(false);
    setPhase('instructions');
  };

  // Start the test and countdown.
  const handleStartTest = () => {
    setPhase('testing');
    setIsTimerRunning(true);
  };

  // Select an answer.
  const handleSelectOption = (optionIndex: number) => {
    setUserStates((previous) => ({
      ...previous,
      [currentIndex]: {
        ...previous[currentIndex],
        chosenOption: optionIndex,
        isVisited: true,
      },
    }));
  };

  // Clear the selected answer.
  const handleClearOption = () => {
    setUserStates((previous) => ({
      ...previous,
      [currentIndex]: {
        ...previous[currentIndex],
        chosenOption: null,
      },
    }));
  };

  // Mark or unmark a question for review.
  const handleToggleMarkForReview = () => {
    setUserStates((previous) => ({
      ...previous,
      [currentIndex]: {
        ...previous[currentIndex],
        isMarkedForReview:
          !previous[currentIndex]?.isMarkedForReview,
      },
    }));
  };

  // Navigate between questions.
  const handleNavigateTo = (index: number) => {
    setCurrentIndex(index);

    setUserStates((previous) => ({
      ...previous,
      [index]: {
        ...previous[index],
        isVisited: true,
      },
    }));
  };

  // Countdown timer.
  useEffect(() => {
    if (!isTimerRunning || phase !== 'testing') {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeftSeconds((previous) =>
        Math.max(previous - 1, 0)
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isTimerRunning, phase]);

  // Automatically submit when the timer reaches zero.
  useEffect(() => {
    if (
      isTimerRunning &&
      phase === 'testing' &&
      timeLeftSeconds === 0
    ) {
      handleFinishTest();
    }
  }, [
    timeLeftSeconds,
    isTimerRunning,
    phase,
    handleFinishTest,
  ]);

  const results =
    testQuestions.length > 0
      ? calculateResults()
      : EMPTY_RESULTS;

  return (
    <div className="space-y-10 pb-16 font-sans">

      {/* Page header */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Timed CBT Examination Simulator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Online Mock Test Platform
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Experience real Computer Based Test (CBT)
            examination conditions with live countdown timers,
            question navigation palettes, review tags,
            negative marking (+4 / -1), and comprehensive
            post-exam evaluation.
          </p>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Test selection */}
        {phase === 'setup' && (
          <MockTestSetup
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            onPrepareTest={handlePrepareTest}
          />
        )}

        {/* Instructions */}
        {phase === 'instructions' && (
          <TestInstructions
            onBack={() => setPhase('setup')}
            onStart={handleStartTest}
          />
        )}

        {/* Active examination */}
        {phase === 'testing' &&
          testQuestions.length > 0 && (
            <ActiveTest
              selectedExam={selectedExam}
              selectedSubject={selectedSubject}
              testQuestions={testQuestions}
              currentIndex={currentIndex}
              userStates={userStates}
              timeLeftSeconds={timeLeftSeconds}
              onSelectOption={handleSelectOption}
              onClearOption={handleClearOption}
              onToggleReview={handleToggleMarkForReview}
              onNavigate={handleNavigateTo}
              onFinish={handleFinishTest}
            />
          )}

        {/* Result scorecard */}
        {phase === 'results' && (
          <TestResults
            selectedExam={selectedExam}
            selectedSubject={selectedSubject}
            results={results}
            onReview={() => setPhase('review')}
            onRetake={() => setPhase('setup')}
            onDashboard={() => setActivePage('dashboard')}
          />
        )}

        {/* Detailed answer review */}
        {phase === 'review' && (
          <TestReview
            testQuestions={testQuestions}
            userStates={userStates}
            onBackToResults={() => setPhase('results')}
            onBackToSetup={() => setPhase('setup')}
          />
        )}

      </main>
    </div>
  );
};

export default MockTestPage;
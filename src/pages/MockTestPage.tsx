import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { QUESTION_DATABASE, QuestionItem } from '../data/questionDatabase';
import { MOCK_TESTS_DATA } from '../data/examData';
import { 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Play, 
  RotateCcw, 
  FileText, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  Flag, 
  Trash2,
  Send,
  BarChart2,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface QuestionState {
  chosenOption: number | null;
  isMarkedForReview: boolean;
  isVisited: boolean;
}

export const MockTestPage: React.FC<{ setActivePage: (page: PageType) => void }> = ({ setActivePage }) => {
  // Test Setup States
  const [selectedExam, setSelectedExam] = useState<'OJEE' | 'Diploma' | 'B.Tech'>('OJEE');
  const [selectedSubject, setSelectedSubject] = useState<string>('Full Mock Test');
  const [testQuestions, setTestQuestions] = useState<QuestionItem[]>([]);
  
  // Phase State: 'setup' | 'instructions' | 'testing' | 'results' | 'review'
  const [phase, setPhase] = useState<'setup' | 'instructions' | 'testing' | 'results' | 'review'>('setup');

  // Test Runtime States
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userStates, setUserStates] = useState<Record<number, QuestionState>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(600); // Default 10 mins
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Filter test presets or questions
  const handlePrepareTest = () => {
    let questionsPool = QUESTION_DATABASE;
    if (selectedExam !== 'OJEE') {
      questionsPool = QUESTION_DATABASE.filter(q => q.category === selectedExam || q.category === 'OJEE');
    }
    if (selectedSubject !== 'Full Mock Test') {
      questionsPool = questionsPool.filter(q => q.subject === selectedSubject);
    }

    if (questionsPool.length === 0) {
      questionsPool = QUESTION_DATABASE.slice(0, 10);
    }

    // Pick up to 10 questions for quick mock test
    const selected = questionsPool.slice(0, 10);
    setTestQuestions(selected);
    setTimeLeftSeconds(selected.length * 60); // 1 minute per question

    // Initialize question states
    const initStates: Record<number, QuestionState> = {};
    selected.forEach((_, idx) => {
      initStates[idx] = { chosenOption: null, isMarkedForReview: false, isVisited: false };
    });
    initStates[0].isVisited = true;
    setUserStates(initStates);

    setPhase('instructions');
  };

  const handleStartTest = () => {
    setPhase('testing');
    setIsTimerRunning(true);
  };

  // Timer countdown hook
  useEffect(() => {
    let timer: any = null;
    if (isTimerRunning && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      handleFinishTest();
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeftSeconds]);

  const handleSelectOption = (optIdx: number) => {
    setUserStates((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        chosenOption: optIdx,
        isVisited: true
      }
    }));
  };

  const handleClearOption = () => {
    setUserStates((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        chosenOption: null
      }
    }));
  };

  const handleToggleMarkForReview = () => {
    setUserStates((prev) => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        isMarkedForReview: !prev[currentIndex].isMarkedForReview
      }
    }));
  };

  const handleNavigateTo = (idx: number) => {
    setCurrentIndex(idx);
    setUserStates((prev) => ({
      ...prev,
      [idx]: {
        ...prev[idx],
        isVisited: true
      }
    }));
  };

  const handleFinishTest = () => {
    setIsTimerRunning(false);
    setPhase('results');
    saveMockToLocalStorage();
  };

  const calculateResults = () => {
    let total = testQuestions.length;
    let attempted = 0;
    let correct = 0;
    let incorrect = 0;

    testQuestions.forEach((q, idx) => {
      const state = userStates[idx];
      if (state && state.chosenOption !== null) {
        attempted++;
        if (state.chosenOption === q.answer) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    const score = correct * 4 - incorrect * 1;
    const maxScore = total * 4;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    return { total, attempted, unattempted: total - attempted, correct, incorrect, score, maxScore, percentage };
  };

  const saveMockToLocalStorage = () => {
    const res = calculateResults();
    const record = {
      date: new Date().toLocaleDateString(),
      title: `${selectedExam} ${selectedSubject} Mock Test`,
      exam: selectedExam,
      score: res.score,
      maxScore: res.maxScore,
      percentage: res.percentage,
      correct: res.correct,
      incorrect: res.incorrect,
      attempted: res.attempted,
      total: res.total
    };

    try {
      const existing = JSON.parse(localStorage.getItem('cracktech_mock_history') || '[]');
      existing.unshift(record);
      localStorage.setItem('cracktech_mock_history', JSON.stringify(existing.slice(0, 20)));
    } catch (err) {
      console.error('LocalStorage error:', err);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-10 pb-16 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Timed CBT Examination Simulator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Online Mock Test Platform
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Experience real Computer Based Test (CBT) examination conditions with live countdown timers, question navigation palettes, review tags, negative marking (+4 / -1), and comprehensive post-exam evaluation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* PHASE 1: SETUP SCREEN */}
        {phase === 'setup' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
                <Play className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Select Mock Test Paper</h3>
                <p className="text-xs text-slate-500">Choose exam category and test mode to begin.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exam selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">Target Examination:</label>
                <div className="grid grid-cols-3 gap-3 text-xs font-bold">
                  {(['OJEE', 'Diploma', 'B.Tech'] as const).map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setSelectedExam(ex)}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        selectedExam === ex
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">Test Mode / Subject:</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="Full Mock Test">Full Mock Test (Combined Subjects)</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanics">Engineering Mechanics</option>
                  <option value="Computer Science">Computer Science & IT</option>
                </select>
              </div>
            </div>

            {/* Test Features Card */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
              <div>
                <span className="block text-slate-400 font-medium">Questions</span>
                <span className="font-extrabold text-slate-900 text-base">10 MCQs</span>
              </div>
              <div>
                <span className="block text-slate-400 font-medium">Duration</span>
                <span className="font-extrabold text-slate-900 text-base">10 Minutes</span>
              </div>
              <div>
                <span className="block text-slate-400 font-medium">Marking Scheme</span>
                <span className="font-extrabold text-emerald-600 text-base">+4 / -1 Marks</span>
              </div>
              <div>
                <span className="block text-slate-400 font-medium">Mode</span>
                <span className="font-extrabold text-indigo-600 text-base">CBT Interface</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handlePrepareTest}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>Proceed to Instructions &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* PHASE 2: INSTRUCTIONS SCREEN */}
        {phase === 'instructions' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">Official CBT Examination Instructions</h3>
              <p className="text-xs text-slate-500">Please read all guidelines carefully before launching the test timer.</p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm">General Rules & Marking Guidelines:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Total test duration is strictly <strong>10 Minutes</strong> (60 seconds per question).</li>
                <li>Each question carries <strong>4 Marks</strong> for correct answers.</li>
                <li>Incorrect answers incur <strong>-1 Negative Mark</strong>. Unattempted questions yield 0 marks.</li>
                <li>You can jump directly to any question using the <strong>Question Palette</strong> on the sidebar.</li>
                <li>You can mark questions for review using the <strong>Mark for Review</strong> button.</li>
              </ul>

              <h4 className="font-bold text-slate-900 text-sm pt-2">Question Palette Color Guide:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 font-semibold text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-emerald-600 text-white text-[10px] flex items-center justify-center">1</div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-rose-500 text-white text-[10px] flex items-center justify-center">2</div>
                  <span>Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-purple-600 text-white text-[10px] flex items-center justify-center">3</div>
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center">4</div>
                  <span>Not Visited</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setPhase('setup')}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                &larr; Back to Test Selection
              </button>

              <button
                onClick={handleStartTest}
                className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Mock Test Now</span>
              </button>
            </div>
          </div>
        )}

        {/* PHASE 3: ACTIVE TEST INTERFACE */}
        {phase === 'testing' && testQuestions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Question Panel (2 Cols on lg) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* CBT Timer & Header Bar */}
              <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl flex items-center justify-between shadow-md">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase text-blue-400">{selectedExam} Mock Simulator</span>
                  <h3 className="font-bold text-sm sm:text-base text-white">{selectedSubject}</h3>
                </div>

                <div className={`px-4 py-2 rounded-xl border font-mono font-bold text-base sm:text-lg flex items-center gap-2 ${
                  timeLeftSeconds < 180 ? 'bg-rose-950 border-rose-500 text-rose-300 animate-pulse' : 'bg-slate-800 border-slate-700 text-emerald-400'
                }`}>
                  <Clock className="w-5 h-5" />
                  <span>{formatTimer(timeLeftSeconds)}</span>
                </div>
              </div>

              {/* Active Question Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
                    Question {currentIndex + 1} of {testQuestions.length}
                  </span>

                  <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                    Subject: {testQuestions[currentIndex].subject}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm sm:text-base leading-relaxed">
                  {testQuestions[currentIndex].question}
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {testQuestions[currentIndex].options.map((opt, optIdx) => {
                    const isSelected = userStates[currentIndex]?.chosenOption === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-xs sm:text-sm font-semibold ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Question Control Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleToggleMarkForReview}
                      className={`px-3.5 py-2 rounded-xl font-bold transition-colors inline-flex items-center gap-1.5 border ${
                        userStates[currentIndex]?.isMarkedForReview
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{userStates[currentIndex]?.isMarkedForReview ? 'Marked' : 'Mark for Review'}</span>
                    </button>

                    <button
                      onClick={handleClearOption}
                      disabled={userStates[currentIndex]?.chosenOption === null}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 disabled:opacity-40 inline-flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear Selection</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentIndex === 0}
                      onClick={() => handleNavigateTo(currentIndex - 1)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold disabled:opacity-40 inline-flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Prev</span>
                    </button>

                    <button
                      disabled={currentIndex === testQuestions.length - 1}
                      onClick={() => handleNavigateTo(currentIndex + 1)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold disabled:opacity-40 inline-flex items-center gap-1 shadow-xs"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Sidebar Question Palette (1 Col on lg) */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Question Navigation Palette</h4>

                <div className="grid grid-cols-5 gap-2.5">
                  {testQuestions.map((_, idx) => {
                    const st = userStates[idx];
                    let btnStyle = 'bg-slate-100 text-slate-600 border-slate-200';
                    if (st?.isMarkedForReview) {
                      btnStyle = 'bg-purple-600 text-white border-purple-600';
                    } else if (st?.chosenOption !== null) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-600';
                    } else if (st?.isVisited) {
                      btnStyle = 'bg-rose-500 text-white border-rose-500';
                    }

                    const isCurrent = currentIndex === idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleNavigateTo(idx)}
                        className={`h-10 rounded-xl font-extrabold text-xs border transition-all ${btnStyle} ${
                          isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Status Summary Counts */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-semibold text-slate-600">
                  <div className="flex justify-between">
                    <span>Answered:</span>
                    <span className="text-emerald-600 font-bold">
                      {Object.values(userStates).filter(s => s.chosenOption !== null && !s.isMarkedForReview).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marked for Review:</span>
                    <span className="text-purple-600 font-bold">
                      {Object.values(userStates).filter(s => s.isMarkedForReview).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Not Answered:</span>
                    <span className="text-rose-600 font-bold">
                      {Object.values(userStates).filter(s => s.chosenOption === null && s.isVisited).length}
                    </span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleFinishTest}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Examination Paper</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* PHASE 4: RESULTS EVALUATION SCREEN */}
        {phase === 'results' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
            {(() => {
              const { total, attempted, unattempted, correct, incorrect, score, maxScore, percentage } = calculateResults();
              return (
                <div className="space-y-8">
                  
                  {/* Performance Header */}
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto text-3xl font-bold">
                      📊
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Mock Test Result Scorecard</h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Examination: <strong className="text-slate-800">{selectedExam}</strong> ({selectedSubject})
                    </p>
                  </div>

                  {/* Main Score Banner */}
                  <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-3 shadow-md">
                    <span className="text-xs font-bold uppercase text-blue-400 tracking-wider">Total Score Achieved</span>
                    <div className="text-4xl sm:text-5xl font-black text-white">
                      {score} <span className="text-xl font-bold text-slate-400">/ {maxScore} Marks</span>
                    </div>
                    <div className="inline-block px-4 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                      Percentage: {percentage}%
                    </div>
                  </div>

                  {/* Quick Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="block text-2xl font-extrabold text-slate-900">{attempted} / {total}</span>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Attempted Questions</span>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                      <span className="block text-2xl font-extrabold text-emerald-700">{correct}</span>
                      <span className="text-[11px] font-bold text-emerald-600 uppercase">Correct (+{correct * 4})</span>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
                      <span className="block text-2xl font-extrabold text-rose-700">{incorrect}</span>
                      <span className="text-[11px] font-bold text-rose-600 uppercase">Incorrect (-{incorrect * 1})</span>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
                      <span className="block text-2xl font-extrabold text-amber-700">{unattempted}</span>
                      <span className="text-[11px] font-bold text-amber-600 uppercase">Unattempted</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setPhase('review')}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center justify-center gap-2 shadow-md"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Review Detailed Solutions & Answers</span>
                    </button>

                    <button
                      onClick={() => setPhase('setup')}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 inline-flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retake / Select Another Test</span>
                    </button>

                    <button
                      onClick={() => setActivePage('dashboard')}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                    >
                      View Student Dashboard &rarr;
                    </button>
                  </div>

                </div>
              );
            })()}
          </div>
        )}

        {/* PHASE 5: REVIEW SOLUTIONS SCREEN */}
        {phase === 'review' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Question Paper Review & Step-by-Step Solutions</h3>
                <p className="text-xs text-slate-500">Analyze your answers and master key concepts.</p>
              </div>

              <button
                onClick={() => setPhase('results')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                &larr; Back to Scorecard
              </button>
            </div>

            <div className="space-y-6">
              {testQuestions.map((q, idx) => {
                const userChoice = userStates[idx]?.chosenOption;
                const isCorrect = userChoice === q.answer;
                const isSkipped = userChoice === null;

                return (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-500">Question {idx + 1} of {testQuestions.length}</span>
                      {isCorrect && (
                        <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+4)
                        </span>
                      )}
                      {!isCorrect && !isSkipped && (
                        <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-800 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect (-1)
                        </span>
                      )}
                      {isSkipped && (
                        <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800">
                          Unattempted (0)
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{q.question}</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isCorrectOption = optIdx === q.answer;
                        const isChosenOption = optIdx === userChoice;

                        let style = 'bg-white border-slate-200 text-slate-700';
                        if (isCorrectOption) style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                        else if (isChosenOption && !isCorrectOption) style = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';

                        return (
                          <div key={optIdx} className={`p-3 rounded-xl border flex items-center gap-2 ${style}`}>
                            <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <strong>💡 Solution / Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setPhase('setup')}
                className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Back to Test Selection
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

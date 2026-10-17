import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { QUESTION_DATABASE, QuestionItem } from '../data/questionDatabase';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Filter, 
  Sparkles, 
  Award, 
  BookOpen, 
  Cpu, 
  Brain,
  Check,
  AlertCircle
} from 'lucide-react';

export const PracticePage: React.FC<{ setActivePage: (page: PageType) => void }> = ({ setActivePage }) => {
  // Filter States
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Active Practice State
  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  
  // Results Tracking
  const [userAnswers, setUserAnswers] = useState<Record<number, { chosen: number; isCorrect: boolean }>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Derive unique lists for filter dropdowns
  const availableSubjects = Array.from(new Set(QUESTION_DATABASE.map((q) => q.subject)));
  const availableTopics = Array.from(
    new Set(
      QUESTION_DATABASE
        .filter((q) => selectedSubject === 'All' || q.subject === selectedSubject)
        .map((q) => q.topic)
    )
  );

  const handleStartPractice = () => {
    let questions = QUESTION_DATABASE.filter((q) => {
      const matchExam = selectedExam === 'All' || q.category === selectedExam;
      const matchSub = selectedSubject === 'All' || q.subject === selectedSubject;
      const matchTopic = selectedTopic === 'All' || q.topic === selectedTopic;
      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      return matchExam && matchSub && matchTopic && matchDiff;
    });

    if (questions.length === 0) {
      // Fallback to all matching subject or category if filters are too tight
      questions = QUESTION_DATABASE;
    }

    setFilteredQuestions(questions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsCompleted(false);
    setIsPracticing(true);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const currentQ = filteredQuestions[currentIndex];
    const isCorrect = selectedOption === currentQ.answer;

    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: { chosen: selectedOption, isCorrect }
    }));
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished practice session
      setIsCompleted(true);
      savePracticeToLocalStorage();
    }
  };

  const savePracticeToLocalStorage = () => {
    let correctCount = 0;
    Object.values(userAnswers).forEach((ans) => {
      if (ans.isCorrect) correctCount++;
    });

    const total = filteredQuestions.length;
    const score = correctCount * 4;
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    const record = {
      date: new Date().toLocaleDateString(),
      subject: selectedSubject !== 'All' ? selectedSubject : 'Mixed Practice',
      totalQuestions: total,
      correct: correctCount,
      incorrect: total - correctCount,
      score,
      accuracy
    };

    try {
      const existing = JSON.parse(localStorage.getItem('cracktech_practice_history') || '[]');
      existing.unshift(record);
      localStorage.setItem('cracktech_practice_history', JSON.stringify(existing.slice(0, 20)));
    } catch (err) {
      console.error('LocalStorage error:', err);
    }
  };

  const calculateStats = () => {
    let correct = 0;
    let incorrect = 0;
    Object.values(userAnswers).forEach((ans) => {
      if (ans.isCorrect) correct++;
      else incorrect++;
    });
    const total = filteredQuestions.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const score = correct * 4 - incorrect * 1;
    return { total, correct, incorrect, accuracy, score };
  };

  return (
    <div className="space-y-10 pb-16 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Brain className="w-4 h-4 text-amber-400" />
            <span>Interactive Skill Building & Practice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Practice Questions Engine
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Select your target examination, subject, topic, and difficulty level. Solve questions one-by-one with immediate feedback, detailed step-by-step explanations, and accuracy performance tracking.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* SETUP / FILTER MODE */}
        {!isPracticing && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
                <Filter className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Configure Practice Session</h3>
                <p className="text-xs text-slate-500">Tailor questions to your exact study requirements.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
              {/* Exam Category */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">1. Target Examination:</label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Exams (OJEE, Diploma, B.Tech)</option>
                  <option value="OJEE">OJEE Entrance Exam</option>
                  <option value="Diploma">Diploma SCTE&VT</option>
                  <option value="B.Tech">B.Tech BPUT</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">2. Subject:</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    setSelectedTopic('All');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Subjects</option>
                  {availableSubjects.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">3. Specific Topic:</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Topics</option>
                  {availableTopics.map((top) => (
                    <option key={top} value={top}>{top}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">4. Difficulty Level:</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Found <span className="font-bold text-blue-600">{
                  QUESTION_DATABASE.filter((q) => {
                    const matchExam = selectedExam === 'All' || q.category === selectedExam;
                    const matchSub = selectedSubject === 'All' || q.subject === selectedSubject;
                    const matchTopic = selectedTopic === 'All' || q.topic === selectedTopic;
                    const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
                    return matchExam && matchSub && matchTopic && matchDiff;
                  }).length
                }</span> matching questions in database.
              </div>

              <button
                onClick={handleStartPractice}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-md shadow-blue-500/20 inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Practice Questions</span>
              </button>
            </div>
          </div>
        )}

        {/* PRACTICE IN PROGRESS */}
        {isPracticing && !isCompleted && filteredQuestions.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
            
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-100 text-blue-700">
                    {filteredQuestions[currentIndex].category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-700">
                    {filteredQuestions[currentIndex].subject}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700">
                    {filteredQuestions[currentIndex].difficulty}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-500">Topic: {filteredQuestions[currentIndex].topic}</h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                  Question {currentIndex + 1} of {filteredQuestions.length}
                </span>

                <button
                  onClick={() => setIsPracticing(false)}
                  className="text-xs text-rose-600 hover:underline font-bold"
                >
                  Quit Practice
                </button>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              {filteredQuestions[currentIndex].isSample && (
                <div className="inline-block px-2 py-0.5 mb-2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  Demo / Practice Question
                </div>
              )}
              <h4 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                {filteredQuestions[currentIndex].question}
              </h4>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {filteredQuestions[currentIndex].options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === filteredQuestions[currentIndex].answer;
                
                let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50';
                if (isSelected) {
                  optionStyle = 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs';
                }
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                  }
                }

                return (
                  <div
                    key={idx}
                    onClick={() => !isAnswerSubmitted && setSelectedOption(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs sm:text-sm ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isAnswerSubmitted && isCorrect ? 'bg-emerald-600 text-white' :
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                  </div>
                );
              })}
            </div>

            {/* Answer Explanation Feedback Block */}
            {isAnswerSubmitted && (
              <div className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                selectedOption === filteredQuestions[currentIndex].answer
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/80 border-rose-200 text-rose-900'
              }`}>
                <div className="flex items-center gap-2 font-bold text-base">
                  {selectedOption === filteredQuestions[currentIndex].answer ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Correct Answer! (+4 Marks)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>Incorrect Answer (-1 Mark)</span>
                    </>
                  )}
                </div>

                <p className="font-semibold pt-1">
                  Correct Answer: <span className="underline">{filteredQuestions[currentIndex].options[filteredQuestions[currentIndex].answer]}</span>
                </p>

                <div className="p-3 bg-white/90 rounded-xl border border-slate-200 text-slate-700 leading-relaxed text-xs">
                  <strong>💡 Explanation:</strong> {filteredQuestions[currentIndex].explanation}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-400 font-mono">
                Q {currentIndex + 1} / {filteredQuestions.length}
              </div>

              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors disabled:opacity-40 shadow-xs"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors inline-flex items-center gap-1.5 shadow-md"
                >
                  <span>{currentIndex < filteredQuestions.length - 1 ? 'Next Question' : 'View Practice Summary'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        )}

        {/* PRACTICE COMPLETED SUMMARY */}
        {isCompleted && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-6">
            {(() => {
              const { total, correct, incorrect, accuracy, score } = calculateStats();
              return (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                      🏆
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900">Practice Session Complete!</h3>
                    <p className="text-xs text-slate-500">Your practice results have been recorded in your local Student Dashboard history.</p>
                  </div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="block text-2xl font-extrabold text-slate-900">{total}</span>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Total Questions</span>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                      <span className="block text-2xl font-extrabold text-emerald-700">{correct}</span>
                      <span className="text-[11px] font-bold text-emerald-600 uppercase">Correct</span>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
                      <span className="block text-2xl font-extrabold text-rose-700">{incorrect}</span>
                      <span className="text-[11px] font-bold text-rose-600 uppercase">Incorrect</span>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800">
                      <span className="block text-2xl font-extrabold text-blue-700">{accuracy}%</span>
                      <span className="text-[11px] font-bold text-blue-600 uppercase">Accuracy Rate</span>
                    </div>
                  </div>

                  {/* Accuracy Bar */}
                  <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Accuracy Progress</span>
                      <span>{accuracy}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          accuracy >= 75 ? 'bg-emerald-500' : accuracy >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsPracticing(false);
                        setIsCompleted(false);
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Start New Practice Session</span>
                    </button>

                    <button
                      onClick={() => setActivePage('dashboard')}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                    >
                      View Student Dashboard &rarr;
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
};

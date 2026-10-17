import React, { useState, useEffect } from 'react';
import { PageType, QuestionPaper, MockTest, QuizQuestion } from '../types';
import { QUESTION_PAPERS_DATA, MOCK_TESTS_DATA } from '../data/examData';
import { 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Download, 
  Sparkles, 
  Award, 
  BookOpen, 
  Cpu, 
  Zap, 
  Calendar,
  X,
  Play,
  RotateCcw,
  Check,
  AlertCircle
} from 'lucide-react';

export const PreparationPage: React.FC<{ setActivePage: (page: PageType) => void; initialSubTab?: string }> = ({ 
  setActivePage, 
  initialSubTab = 'mocktest' 
}) => {
  const [subTab, setSubTab] = useState<string>(initialSubTab);

  // Mock Test State
  const [activeMockTest, setActiveMockTest] = useState<MockTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(600);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Study Planner State
  const [targetExam, setTargetExam] = useState<'OJEE' | 'Diploma' | 'B.Tech'>('OJEE');
  const [dailyHours, setDailyHours] = useState<number>(4);
  const [weeksRemaining, setWeeksRemaining] = useState<number>(8);
  const [generatedSchedule, setGeneratedSchedule] = useState<Array<{ week: number; focus: string; dailyGoal: string; tasks: string[] }> | null>(null);

  // Question Papers Filter State
  const [paperCategory, setPaperCategory] = useState<string>('All');
  const [paperSearch, setPaperSearch] = useState<string>('');

  // Paper Preview Modal State
  const [previewPaper, setPreviewPaper] = useState<QuestionPaper | null>(null);

  // Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeMockTest && !isSubmitted && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            setIsSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeMockTest, isSubmitted, timeLeftSeconds]);

  const handleStartMockTest = (test: MockTest) => {
    setActiveMockTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeftSeconds(test.timeLimitMinutes * 60);
    setIsSubmitted(false);
  };

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    if (!activeMockTest) return { score: 0, total: 0, correct: 0, wrong: 0, unattempted: 0 };
    let correct = 0;
    let wrong = 0;
    activeMockTest.questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans !== undefined) {
        if (ans === q.correctAnswer) {
          correct += 1;
        } else {
          wrong += 1;
        }
      }
    });
    const unattempted = activeMockTest.questions.length - (correct + wrong);
    const score = correct * 4 - wrong * 1; // +4 / -1 scheme
    return { score, total: activeMockTest.questions.length * 4, correct, wrong, unattempted };
  };

  const handleGenerateStudyPlan = () => {
    const schedule = [];
    const topicsMap = {
      OJEE: [
        'Matrices, Rank, Determinants & System of Linear Equations',
        'Ordinary Differential Equations & Laplace Transforms',
        'Coplanar Force Systems, Friction & Trusses in Mechanics',
        'Kinematics, Impulse-Momentum & Work-Energy Theorem',
        'Basic Electrical Circuits, KCL, KVL & Transformers',
        'Mock Tests Revision & Solving Previous OJEE Questions'
      ],
      Diploma: [
        'Data Structures: Stacks, Queues, Linked Lists & Trees',
        'C++ OOPs: Encapsulation, Constructors & Polymorphism',
        'Digital Logic: Boolean Algebra, K-Maps & Flip Flops',
        'Electrical Machines: DC Motors & Single Phase Transformers',
        'Transmission Line Parameters & Substation Layouts',
        'SCTE&VT End-Sem Sample Question Papers Practice'
      ],
      'B.Tech': [
        'DBMS: ER Diagrams, SQL Queries & Normalization 1NF-3NF',
        'Operating Systems: Process Scheduling & Deadlocks',
        'Algorithms: Asymptotic Notations & Divide & Conquer',
        'Dynamic Programming & Greedy Algorithm Problems',
        'Computer Networks: OSI Layer Protocols & Subnetting',
        'BPUT Previous Year Question Papers & Internal Revision'
      ]
    };

    const examTopics = topicsMap[targetExam];
    for (let i = 1; i <= Math.min(weeksRemaining, 6); i++) {
      schedule.push({
        week: i,
        focus: examTopics[(i - 1) % examTopics.length],
        dailyGoal: `${dailyHours} Hours/Day dedicated practice & notes summary`,
        tasks: [
          `Study core theory concepts for 2 hours`,
          `Solve 25+ practice MCQs / numerical problems`,
          `Revise formulas & error log entries`
        ]
      });
    }
    setGeneratedSchedule(schedule);
  };

  const filteredPapers = QUESTION_PAPERS_DATA.filter((paper) => {
    const matchesCat = paperCategory === 'All' || paper.category === paperCategory;
    const matchesQuery = 
      paperSearch === '' || 
      paper.title.toLowerCase().includes(paperSearch.toLowerCase()) ||
      paper.subject.toLowerCase().includes(paperSearch.toLowerCase()) ||
      paper.branchOrCourse.toLowerCase().includes(paperSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-10 pb-16 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Student Success & Exam Preparation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Preparation Hub & Resource Center
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Practice interactive timed mock tests, generate customized weekly study schedules, download previous year question papers, and explore subject preparation tips.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sub-navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 text-xs md:text-sm font-bold text-slate-600 scrollbar-none">
          {[
            { id: 'mocktest', label: 'Interactive Mock Tests' },
            { id: 'papers', label: 'Previous Question Papers' },
            { id: 'studyplan', label: 'Custom Study Planner' },
            { id: 'tips', label: 'Subject Study Strategies' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSubTab(tab.id);
                setActiveMockTest(null);
              }}
              className={`px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                subTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SUBTAB 1: MOCK TESTS */}
        {subTab === 'mocktest' && (
          <div className="mt-8 space-y-8">
            {!activeMockTest ? (
              <div className="space-y-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                    Available Online Practice Tests
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    Test your preparation with timed multiple-choice quizzes. Get instant score reports with detailed explanations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {MOCK_TESTS_DATA.map((test) => (
                    <div
                      key={test.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          test.category === 'OJEE' ? 'bg-blue-100 text-blue-700' :
                          test.category === 'Diploma' ? 'bg-indigo-100 text-indigo-700' : 'bg-teal-100 text-teal-700'
                        }`}>
                          {test.category} • {test.subject}
                        </span>

                        <h4 className="font-extrabold text-slate-900 text-base">{test.title}</h4>

                        <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-blue-600" /> {test.timeLimitMinutes} Mins
                          </span>
                          <span>•</span>
                          <span>{test.totalQuestions} Questions</span>
                        </div>
                      </div>

                      <button
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
              /* ACTIVE MOCK TEST SIMULATOR INTERFACE */
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8 space-y-6">
                
                {/* Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{activeMockTest.category} Quiz</span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">{activeMockTest.title}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                      timeLeftSeconds < 120 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-blue-50 text-blue-700'
                    }`}>
                      <Clock className="w-4 h-4" />
                      <span>Time Remaining: {formatTime(timeLeftSeconds)}</span>
                    </div>

                    <button
                      onClick={() => setActiveMockTest(null)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      title="Exit Quiz"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {!isSubmitted ? (
                  /* QUIZ QUESTION DISPLAY */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>Question {currentQuestionIndex + 1} of {activeMockTest.questions.length}</span>
                      <span>Marking: +4 Correct / -1 Wrong</span>
                    </div>

                    {/* Question Text */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <h4 className="font-bold text-slate-900 text-base md:text-lg">
                        {activeMockTest.questions[currentQuestionIndex].question}
                      </h4>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      {activeMockTest.questions[currentQuestionIndex].options.map((option, idx) => {
                        const qId = activeMockTest.questions[currentQuestionIndex].id;
                        const isSelected = userAnswers[qId] === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => handleSelectAnswer(qId, idx)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-sm font-medium ${
                              isSelected
                                ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{option}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs disabled:opacity-40"
                      >
                        &larr; Previous
                      </button>

                      <div className="flex items-center gap-2">
                        {currentQuestionIndex < activeMockTest.questions.length - 1 ? (
                          <button
                            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                          >
                            Next &rarr;
                          </button>
                        ) : (
                          <button
                            onClick={handleSubmitTest}
                            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                          >
                            Submit & Grade Test
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* SUBMITTED SCORE REPORT */
                  <div className="space-y-6">
                    {(() => {
                      const { score, total, correct, wrong, unattempted } = calculateScore();
                      return (
                        <div className="space-y-6">
                          <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 rounded-2xl text-center space-y-3">
                            <h4 className="text-xl font-bold">Quiz Performance Summary</h4>
                            <div className="text-3xl font-extrabold text-blue-400">
                              Score: {score} / {total} Marks
                            </div>
                            <div className="flex justify-center gap-6 text-xs text-slate-300 pt-2">
                              <span className="text-emerald-400 font-bold">✔ {correct} Correct</span>
                              <span className="text-rose-400 font-bold">✖ {wrong} Wrong</span>
                              <span className="text-amber-400 font-bold">➖ {unattempted} Unattempted</span>
                            </div>
                          </div>

                          {/* Detailed Answer Key */}
                          <div className="space-y-4">
                            <h5 className="font-bold text-slate-900 text-base">Question Analysis & Explanations:</h5>
                            {activeMockTest.questions.map((q, idx) => {
                              const userAns = userAnswers[q.id];
                              const isCorrect = userAns === q.correctAnswer;
                              return (
                                <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-slate-900">Q{idx + 1}: {q.question}</span>
                                    {userAns === undefined ? (
                                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">Unattempted</span>
                                    ) : isCorrect ? (
                                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Correct (+4)</span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">Wrong (-1)</span>
                                    )}
                                  </div>

                                  <div className="text-slate-600">
                                    <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                                  </div>

                                  <p className="text-slate-500 italic bg-white p-2.5 rounded border border-slate-200/80">
                                    💡 <strong>Explanation:</strong> {q.explanation}
                                  </p>
                                </div>
                              );
                            })}
                          </div>

                          <div className="pt-4 text-center">
                            <button
                              onClick={() => handleStartMockTest(activeMockTest)}
                              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs inline-flex items-center gap-2"
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>Retake This Quiz</span>
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: QUESTION PAPERS */}
        {subTab === 'papers' && (
          <div className="mt-8 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                  Previous Year Question Paper Bank
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Download or preview authentic exam papers for OJEE Lateral Entry, Polytechnic SCTE&VT, and BPUT end-sem exams.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-2 text-xs font-semibold">
                <input
                  type="text"
                  value={paperSearch}
                  onChange={(e) => setPaperSearch(e.target.value)}
                  placeholder="Search subject or year..."
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500"
                />

                <select
                  value={paperCategory}
                  onChange={(e) => setPaperCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
                >
                  <option value="All">All Categories</option>
                  <option value="OJEE">OJEE</option>
                  <option value="Diploma">Diploma</option>
                  <option value="B.Tech">B.Tech</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPapers.map((paper) => (
                <div key={paper.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                        {paper.category} • {paper.year}
                      </span>
                      {paper.hasAnswerKey && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Answer Key Incl.
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">{paper.title}</h4>
                    <p className="text-xs text-slate-500">{paper.branchOrCourse} • {paper.subject}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">{paper.fileSize}</span>

                    <button
                      onClick={() => setPreviewPaper(paper)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>View / Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Paper Preview Modal */}
            {previewPaper && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-bold text-slate-900 text-base">{previewPaper.title}</h4>
                    <button onClick={() => setPreviewPaper(null)} className="p-1 rounded text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
                    <p><strong>Exam Stream:</strong> {previewPaper.category}</p>
                    <p><strong>Course / Subject:</strong> {previewPaper.branchOrCourse} - {previewPaper.subject}</p>
                    <p><strong>Paper Year:</strong> {previewPaper.year}</p>
                    <p><strong>File Size:</strong> {previewPaper.fileSize}</p>
                  </div>

                  <div className="p-3 bg-blue-50 text-blue-900 text-xs rounded-xl border border-blue-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Sample Paper PDF download simulation ready.</span>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      onClick={() => setPreviewPaper(null)}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                    >
                      Close
                    </button>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Simulated download of ${previewPaper.title} (${previewPaper.fileSize}).`);
                        setPreviewPaper(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Confirm Download</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* SUBTAB 3: STUDY PLANNER */}
        {subTab === 'studyplan' && (
          <div className="mt-8 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                  Personalized Study Plan Generator
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Configure your target examination, daily available hours, and preparation timeframe to generate a weekly study schedule.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 mb-1">Target Examination:</label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  >
                    <option value="OJEE">OJEE Lateral Entry B.Tech</option>
                    <option value="Diploma">Diploma SCTE&VT Semester</option>
                    <option value="B.Tech">B.Tech BPUT Semester</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Daily Study Hours:</label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Weeks Remaining:</label>
                  <input
                    type="number"
                    min="2"
                    max="16"
                    value={weeksRemaining}
                    onChange={(e) => setWeeksRemaining(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateStudyPlan}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Weekly Schedule</span>
              </button>
            </div>

            {/* Generated Plan Output */}
            {generatedSchedule && (
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-bold text-slate-900 text-base">
                    Custom Weekly Schedule for {targetExam} ({dailyHours} Hrs/Day)
                  </h4>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Print / Save Schedule
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedSchedule.map((item) => (
                    <div key={item.week} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-blue-600 uppercase">Week {item.week}</span>
                        <span className="text-[10px] text-slate-500 font-semibold">{item.dailyGoal}</span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-sm">{item.focus}</h5>
                      <ul className="space-y-1 text-xs text-slate-600 list-disc pl-4">
                        {item.tasks.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 4: TIPS */}
        {subTab === 'tips' && (
          <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
              Proven Examination Preparation Strategies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">
                <h4 className="font-bold text-blue-900 text-sm">1. Focus on Fundamental Concepts</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Avoid rote memorization. Technical MCQs in OJEE and GATE test core analytical principles rather than long proofs.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <h4 className="font-bold text-indigo-900 text-sm">2. Maintain an Error Formula Log</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Keep a dedicated notebook for formulas, unit conversions, and recurring mistakes from mock tests.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

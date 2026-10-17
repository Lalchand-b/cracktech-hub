import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { 
  BarChart2, 
  Award, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  RotateCcw, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Trash2,
  Brain,
  Layers,
  ArrowRight
} from 'lucide-react';

interface PracticeRecord {
  date: string;
  subject: string;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  score: number;
  accuracy: number;
}

interface MockRecord {
  date: string;
  title: string;
  exam: string;
  score: number;
  maxScore: number;
  percentage: number;
  correct: number;
  incorrect: number;
  attempted: number;
  total: number;
}

export const DashboardPage: React.FC<{ setActivePage: (page: PageType) => void }> = ({ setActivePage }) => {
  const [practiceHistory, setPracticeHistory] = useState<PracticeRecord[]>([]);
  const [mockHistory, setMockHistory] = useState<MockRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'mockHistory' | 'practiceHistory'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const pData = JSON.parse(localStorage.getItem('cracktech_practice_history') || '[]');
      const mData = JSON.parse(localStorage.getItem('cracktech_mock_history') || '[]');
      setPracticeHistory(pData);
      setMockHistory(mData);
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to reset all practice and mock test history data?')) {
      localStorage.removeItem('cracktech_practice_history');
      localStorage.removeItem('cracktech_mock_history');
      setPracticeHistory([]);
      setMockHistory([]);
    }
  };

  // Metrics calculation
  const totalMocks = mockHistory.length;
  const totalPracticeSessions = practiceHistory.length;

  const totalQuestionsPracticed = practiceHistory.reduce((acc, curr) => acc + (curr.totalQuestions || 0), 0) +
    mockHistory.reduce((acc, curr) => acc + (curr.attempted || 0), 0);

  const highestMockPercent = mockHistory.length > 0 
    ? Math.max(...mockHistory.map(m => m.percentage))
    : 0;

  const avgMockPercent = mockHistory.length > 0
    ? Math.round(mockHistory.reduce((acc, curr) => acc + curr.percentage, 0) / mockHistory.length)
    : 0;

  const overallAccuracy = practiceHistory.length > 0
    ? Math.round(practiceHistory.reduce((acc, curr) => acc + curr.accuracy, 0) / practiceHistory.length)
    : (mockHistory.length > 0 ? avgMockPercent : 0);

  return (
    <div className="space-y-10 pb-16 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <BarChart2 className="w-4 h-4 text-amber-400" />
            <span>Personal Learning Progress Tracker</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Student Preparation Dashboard
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Monitor your exam readiness, track mock test scores, review accuracy trends across OJEE, Diploma, and B.Tech subjects, and identify area improvements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* OVERVIEW STAT WIDGETS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Mock Tests Taken</span>
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalMocks}</div>
            <p className="text-[11px] text-slate-500 font-medium">Completed CBT Sessions</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Questions Solved</span>
              <Brain className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalQuestionsPracticed}</div>
            <p className="text-[11px] text-slate-500 font-medium">Practice + Mock MCQs</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Best Score %</span>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{highestMockPercent}%</div>
            <p className="text-[11px] text-slate-500 font-medium">Highest Mock Result</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Overall Accuracy</span>
              <CheckCircle2 className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{overallAccuracy}%</div>
            <p className="text-[11px] text-slate-500 font-medium font-mono">Average Accuracy Rate</p>
          </div>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-slate-900 text-base">Ready for your next study session?</h3>
            <p className="text-xs text-slate-600">Choose an activity to boost your examination score.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActivePage('practice')}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs"
            >
              Solve Practice MCQs
            </button>

            <button
              onClick={() => setActivePage('mocktest')}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs"
            >
              Attempt Mock Test
            </button>
          </div>
        </div>

        {/* TAB CONTROLS & LOG TABLES */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Tab Header */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3.5 border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview & Mastery Breakdown
            </button>

            <button
              onClick={() => setActiveTab('mockHistory')}
              className={`px-6 py-3.5 border-b-2 transition-all ${
                activeTab === 'mockHistory'
                  ? 'border-blue-600 text-blue-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Mock Test History ({mockHistory.length})
            </button>

            <button
              onClick={() => setActiveTab('practiceHistory')}
              className={`px-6 py-3.5 border-b-2 transition-all ${
                activeTab === 'practiceHistory'
                  ? 'border-blue-600 text-blue-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Practice Session Logs ({practiceHistory.length})
            </button>
          </div>

          {/* TAB 1: OVERVIEW & SUBJECT MASTERY */}
          {activeTab === 'overview' && (
            <div className="p-6 sm:p-8 space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Subject Mastery & Skill Levels</h3>
                <p className="text-xs text-slate-500">Estimated readiness across key Odisha examination subjects.</p>

                <div className="space-y-4 pt-2">
                  {[
                    { subject: 'Engineering Mathematics', readiness: 85, color: 'bg-blue-600' },
                    { subject: 'Electrical Engineering', readiness: 78, color: 'bg-indigo-600' },
                    { subject: 'Electronics & Digital Circuits', readiness: 72, color: 'bg-cyan-600' },
                    { subject: 'Engineering Mechanics', readiness: 80, color: 'bg-emerald-600' },
                    { subject: 'Computer Science & Data Structures', readiness: 90, color: 'bg-purple-600' }
                  ].map((sub, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>{sub.subject}</span>
                        <span>{sub.readiness}% Readiness</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${sub.color} transition-all duration-500`}
                          style={{ width: `${sub.readiness}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset History Action */}
              <div className="pt-6 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-400">Data stored locally in your browser workspace.</span>
                <button
                  onClick={handleClearHistory}
                  className="px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold border border-rose-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset All Progress History</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: MOCK TEST HISTORY */}
          {activeTab === 'mockHistory' && (
            <div className="p-6 sm:p-8 space-y-4">
              {mockHistory.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <p className="text-slate-500 text-sm font-semibold">No mock tests attempted yet.</p>
                  <button
                    onClick={() => setActivePage('mocktest')}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                  >
                    Take Your First Mock Test
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-bold text-[10px]">
                        <th className="p-3">Date</th>
                        <th className="p-3">Test Title</th>
                        <th className="p-3">Exam</th>
                        <th className="p-3">Attempted</th>
                        <th className="p-3">Score</th>
                        <th className="p-3">Percentage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {mockHistory.map((rec, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 text-slate-500">{rec.date}</td>
                          <td className="p-3 font-bold text-slate-900">{rec.title}</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 font-bold">{rec.exam}</span></td>
                          <td className="p-3">{rec.attempted} / {rec.total}</td>
                          <td className="p-3 font-extrabold text-blue-600">{rec.score} / {rec.maxScore}</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700">{rec.percentage}%</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRACTICE HISTORY */}
          {activeTab === 'practiceHistory' && (
            <div className="p-6 sm:p-8 space-y-4">
              {practiceHistory.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <p className="text-slate-500 text-sm font-semibold">No practice questions logged yet.</p>
                  <button
                    onClick={() => setActivePage('practice')}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                  >
                    Start Practice Questions
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-bold text-[10px]">
                        <th className="p-3">Date</th>
                        <th className="p-3">Subject</th>
                        <th className="p-3">Total Solved</th>
                        <th className="p-3">Correct</th>
                        <th className="p-3">Incorrect</th>
                        <th className="p-3">Accuracy %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {practiceHistory.map((rec, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 text-slate-500">{rec.date}</td>
                          <td className="p-3 font-bold text-slate-900">{rec.subject}</td>
                          <td className="p-3">{rec.totalQuestions}</td>
                          <td className="p-3 text-emerald-600 font-bold">{rec.correct}</td>
                          <td className="p-3 text-rose-600 font-bold">{rec.incorrect}</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded font-bold bg-blue-50 text-blue-700">{rec.accuracy}%</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

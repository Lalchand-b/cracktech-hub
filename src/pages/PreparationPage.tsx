import React, { useState } from 'react';
import type { PageType } from '../types';
import { GraduationCap } from 'lucide-react';

import { MockTests } from '../components/preparation/MockTests';
import { QuestionPapers } from '../components/preparation/QuestionPapers';
import { StudyPlanner } from '../components/preparation/StudyPlanner';
import { StudyTips } from '../components/preparation/StudyTips';

interface PreparationPageProps {
  setActivePage: (page: PageType) => void;
  initialSubTab?: string;
}

const TABS = [
  { id: 'mocktest', label: 'Interactive Mock Tests' },
  { id: 'papers', label: 'Previous Question Papers' },
  { id: 'studyplan', label: 'Custom Study Planner' },
  { id: 'tips', label: 'Subject Study Strategies' },
];

export const PreparationPage: React.FC<PreparationPageProps> = ({
  setActivePage,
  initialSubTab = 'mocktest',
}) => {
  const [subTab, setSubTab] = useState<string>(initialSubTab);

  return (
    <div className="space-y-10 pb-16 font-sans">

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Student Success & Exam Preparation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Preparation Hub & Resource Center
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Practice interactive timed mock tests, generate customized
            weekly study schedules, download previous year question
            papers, and explore subject preparation tips.
          </p>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 text-xs md:text-sm font-bold text-slate-600 scrollbar-none">

          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubTab(tab.id)}
              aria-pressed={subTab === tab.id}
              className={`px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                subTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}

        </nav>

        {/* Tab Components */}
        {subTab === 'mocktest' && <MockTests />}

        {subTab === 'papers' && <QuestionPapers />}

        {subTab === 'studyplan' && <StudyPlanner />}

        {subTab === 'tips' && <StudyTips />}

      </main>
    </div>
  );
};

export default PreparationPage;
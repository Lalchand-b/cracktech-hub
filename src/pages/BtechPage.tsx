import React, { useState } from 'react';
import type { PageType } from '../types';
import {
  EXAM_INFO_DATA,
  SYLLABUS_DATA,
} from '../data/examData';

import { Cpu } from 'lucide-react';

import { BtechOverview } from '../components/btech/BtechOverview';
import { BtechPathways } from '../components/btech/BtechPathways';
import { BtechBranches } from '../components/btech/BtechBranches';
import { BtechExams } from '../components/btech/BtechExams';
import { BtechCounselling } from '../components/btech/BtechCounselling';
import { BtechCareers} from '../components/btech/BtechCareers';
import { BtechOfficialLinks } from '../components/btech/BtechOfficialLinks';

interface BtechPageProps {
  setActivePage: (page: PageType) => void;
  initialTab?: string;
}

const TABS = [
  { id: 'overview', label: 'Overview & Eligibility' },
  { id: 'pathways', label: 'Admission Pathways' },
  { id: 'branches', label: 'Branches & Syllabus' },
  { id: 'exams', label: 'BPUT Exam System' },
  { id: 'counselling', label: 'Counselling Process' },
  { id: 'careers', label: 'Career & GATE Opportunities' },
  { id: 'links', label: 'Official BPUT Links' },
];

export const BtechPage: React.FC<BtechPageProps> = ({
  setActivePage,
  initialTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const info = EXAM_INFO_DATA['B.Tech'];

  const btechSyllabus = SYLLABUS_DATA.filter(
    (item) => item.examCategory === 'B.Tech'
  );

  return (
    <div className="space-y-10 pb-16 font-sans">

      {/* Header Banner */}
      <header className="bg-gradient-to-r from-teal-950 via-slate-900 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
            <Cpu className="w-4 h-4 text-teal-400" />

            <span>
              Bachelor of Technology (BPUT & Autonomous Engineering)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            B.Tech Engineering Degree Platform
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Complete guide for 4-year regular B.Tech and 3-year
            Lateral Entry programs under Biju Patnaik University of
            Technology (BPUT) and autonomous engineering institutions.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-300">

            <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Admission: JEE Main Rank (1st Year) / OJEE Rank (Lateral Entry)
            </span>

            <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Evaluation: Choice Based Credit System (CBCS)
            </span>

            <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Affiliation: BPUT Odisha
            </span>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 text-xs md:text-sm font-bold text-slate-600 scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="mt-8 space-y-8">

          {activeTab === 'overview' && (
            <BtechOverview
              info={info}
              setActivePage={setActivePage}
            />
          )}

          {activeTab === 'pathways' && (
            <BtechPathways />
          )}

          {activeTab === 'branches' && (
            <BtechBranches
              info={info}
              btechSyllabus={btechSyllabus}
            />
          )}

          {activeTab === 'exams' && (
            <BtechExams />
          )}

          {activeTab === 'counselling' && (
            <BtechCounselling info={info} />
          )}

          {activeTab === 'careers' && (
            <BtechCareers />
          )}

          {activeTab === 'links' && (
            <BtechOfficialLinks info={info} />
          )}

        </div>
      </main>
    </div>
  );
};

export default BtechPage;
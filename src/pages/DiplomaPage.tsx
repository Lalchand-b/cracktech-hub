import React, { useState } from 'react';
import { PageType } from '../types';
import { EXAM_INFO_DATA, SYLLABUS_DATA, CALENDAR_EVENTS_DATA } from '../data/examData';
import { OfficialLinksCard } from '../components/OfficialLinksCard';
import { 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  FileText, 
  Award, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Wrench,
  Zap,
  Building2,
  HardHat,
  FlaskConical
} from 'lucide-react';

interface DiplomaPageProps {
  setActivePage: (page: PageType) => void;
  initialTab?: string;
}

export const DiplomaPage: React.FC<DiplomaPageProps> = ({ setActivePage, initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const info = EXAM_INFO_DATA.Diploma;
  const diplomaSyllabus = SYLLABUS_DATA.filter((s) => s.examCategory === 'Diploma');
  const diplomaDates = CALENDAR_EVENTS_DATA.filter((e) => e.category === 'Diploma');

  const branchIcons: Record<string, React.ReactNode> = {
    'Civil Engineering': <Building2 className="w-5 h-5 text-amber-600" />,
    'Mechanical Engineering': <Wrench className="w-5 h-5 text-blue-600" />,
    'Electrical Engineering': <Zap className="w-5 h-5 text-indigo-600" />,
    'Computer Science & Engineering': <Cpu className="w-5 h-5 text-teal-600" />,
    'Mining Engineering': <HardHat className="w-5 h-5 text-orange-600" />,
    'Chemical Engineering': <FlaskConical className="w-5 h-5 text-rose-600" />
  };

  return (
    <div className="space-y-10 pb-16 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>State Council for Technical Education & Vocational Training</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Polytechnic Diploma Engineering (SCTE&VT Odisha)
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            3-Year regular and 2-year Lateral Entry polytechnic diploma programs across 30+ government and government-approved polytechnic institutes in Odisha.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-300">
            <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Admission Mode: Merit (10th Board Marks)
            </span>
            <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Curriculum: 6 Semesters (SCTE&VT)
            </span>
            <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Centralized Portal: SAMS Odisha
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 text-xs md:text-sm font-bold text-slate-600 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Eligibility' },
            { id: 'branches', label: 'Engineering Branches' },
            { id: 'syllabus', label: 'Semester Syllabus' },
            { id: 'pattern', label: 'Exam Pattern & Rules' },
            { id: 'calendar', label: 'Academic Calendar' },
            { id: 'links', label: 'Official SCTE&VT Links' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8 space-y-8">
          
          {/* TAB 1: OVERVIEW & ELIGIBILITY */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">
                    About Polytechnic Diploma Studies
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {info.fullOverview}
                  </p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">
                    Eligibility Benchmarks (1st Year Admission)
                  </h3>

                  <div className="space-y-3 text-xs md:text-sm text-slate-700">
                    <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                      <strong className="text-indigo-900 block mb-1">Academic Qualification:</strong>
                      {info.eligibility.qualification}
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                      <strong className="text-blue-900 block mb-1">Minimum Marks:</strong>
                      {info.eligibility.minMarks}
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block mb-1">Age Limits:</strong>
                      {info.eligibility.ageLimit}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Fact Box */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" /> SCTE&VT Key Facts
                  </h3>
                  
                  <div className="divide-y divide-slate-800 text-xs">
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Governing Body</span>
                      <span className="font-semibold text-white">SCTE&VT Odisha</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Total Semesters</span>
                      <span className="font-semibold text-white">6 Semesters (3 Years)</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Next Gateway</span>
                      <span className="font-semibold text-indigo-400">OJEE Lateral Entry B.Tech</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Official Portal</span>
                      <span className="font-semibold text-white">sctevtodisha.nic.in</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActivePage('preparation')}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Practice Diploma Practice Tests</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BRANCHES */}
          {activeTab === 'branches' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">
                Major Engineering Branches Offered in Polytechnics
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {info.branches?.map((branch, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 transition-all space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-200">
                        {branchIcons[branch] || <BookOpen className="w-5 h-5 text-indigo-600" />}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{branch}</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Includes theoretical principles, practical laboratory sessions, and 6th-semester industrial project work.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SYLLABUS */}
          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">
                  SCTE&VT Semester Syllabus Breakdown
                </h3>
                <p className="text-slate-600 text-xs md:text-sm">
                  View unit-wise course topics for Polytechnic Diploma branches.
                </p>
              </div>

              {diplomaSyllabus.map((syl) => (
                <div key={syl.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{syl.semesterOrLevel}</span>
                    <h4 className="text-lg font-bold text-slate-900">{syl.subjectOrBranch}</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {syl.topics.map((unit, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <h5 className="font-bold text-slate-900 text-sm">{unit.unitName}</h5>
                        <ul className="space-y-1.5 text-xs text-slate-600 pl-4 list-disc">
                          {unit.subtopics.map((st, i) => (
                            <li key={i}>{st}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: PATTERN */}
          {activeTab === 'pattern' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">
                SCTE&VT Examination & Evaluation System
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                  <h4 className="font-bold text-indigo-900 text-base">Theory Paper Structure (80 Marks)</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li>• <strong>Part A:</strong> 10 Short conceptual questions (2 Marks each = 20 Marks)</li>
                    <li>• <strong>Part B:</strong> 5 Medium analytical questions (6 Marks each = 30 Marks)</li>
                    <li>• <strong>Part C:</strong> 3 Long subjective/numerical questions (10 Marks each = 30 Marks)</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-base">Internal & Practical Marks (20 Marks)</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li>• <strong>Internal Assessment:</strong> 15 Marks (2 Class Tests conducted by department)</li>
                    <li>• <strong>Attendance & Conduct:</strong> 5 Marks</li>
                    <li>• <strong>Practical / Lab Exam:</strong> 50/100 Marks (Internal viva + External examiner evaluation)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">
                Academic & Examination Calendar (Diploma)
              </h3>

              <div className="divide-y divide-slate-100">
                {diplomaDates.map((ev) => (
                  <div key={ev.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{ev.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{ev.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-indigo-700 block">{ev.formattedDate}</span>
                      <span className="text-[10px] text-amber-600 font-semibold">(Sample Schedule)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: OFFICIAL LINKS */}
          {activeTab === 'links' && (
            <OfficialLinksCard categoryName="Polytechnic Diploma" links={info.officialLinks} />
          )}

        </div>
      </div>
    </div>
  );
};

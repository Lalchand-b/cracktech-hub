import React, { useState } from 'react';
import { PageType } from '../types';
import { EXAM_INFO_DATA, SYLLABUS_DATA, CALENDAR_EVENTS_DATA } from '../data/examData';
import { OfficialLinksCard } from '../components/OfficialLinksCard';
import { 
  Cpu, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  ArrowRight,
  ShieldCheck,
  Award,
  Compass,
  Building,
  Target
} from 'lucide-react';

interface BtechPageProps {
  setActivePage: (page: PageType) => void;
  initialTab?: string;
}

export const BtechPage: React.FC<BtechPageProps> = ({ setActivePage, initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const info = EXAM_INFO_DATA['B.Tech'];
  const btechSyllabus = SYLLABUS_DATA.filter((s) => s.examCategory === 'B.Tech');
  const btechDates = CALENDAR_EVENTS_DATA.filter((e) => e.category === 'B.Tech');

  return (
    <div className="space-y-10 pb-16 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
            <Cpu className="w-4 h-4 text-teal-400" />
            <span>Bachelor of Technology (BPUT & Autonomous Engineering)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            B.Tech Engineering Degree Platform
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Complete guide for 4-year regular B.Tech and 3-year Lateral Entry programs under Biju Patnaik University of Technology (BPUT) and autonomous engineering institutions.
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 text-xs md:text-sm font-bold text-slate-600 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Eligibility' },
            { id: 'pathways', label: 'Admission Pathways' },
            { id: 'branches', label: 'Branches & Syllabus' },
            { id: 'exams', label: 'BPUT Exam System' },
            { id: 'counselling', label: 'Counselling Process' },
            { id: 'careers', label: 'Career & GATE Opportunities' },
            { id: 'links', label: 'Official BPUT Links' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
                    About B.Tech Studies in Odisha
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {info.fullOverview}
                  </p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
                    Eligibility Benchmarks
                  </h3>

                  <div className="space-y-3 text-xs md:text-sm text-slate-700">
                    <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-100">
                      <strong className="text-teal-900 block mb-1">1st Year Admission Qualification:</strong>
                      {info.eligibility.qualification}
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                      <strong className="text-blue-900 block mb-1">Lateral Entry B.Tech Qualification:</strong>
                      Pass in 3-Year Diploma in Engineering/Technology with minimum 45% aggregate marks (40% for SC/ST).
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building className="w-5 h-5 text-teal-400" /> Key B.Tech Statistics
                  </h3>
                  
                  <div className="divide-y divide-slate-800 text-xs">
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Affiliating University</span>
                      <span className="font-semibold text-white">BPUT Rourkela</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Total Duration</span>
                      <span className="font-semibold text-white">4 Years (8 Semesters)</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Primary Admission Channel</span>
                      <span className="font-semibold text-teal-400">JEE Main / OJEE Counselling</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActivePage('preparation')}
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Practice B.Tech Practice Tests</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PATHWAYS */}
          {activeTab === 'pathways' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
                Comparison of Admission Pathways
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-6 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Pathway A: 1st Year B.Tech Admission</h4>
                      <p className="text-xs text-slate-500">For 10+2 / Higher Secondary Science Students</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li>• Appears for NTA JEE Main examination.</li>
                    <li>• Registers on OJEE portal with JEE Main rank card.</li>
                    <li>• Participates in state-level centralized seat allotment rounds.</li>
                    <li>• Enters 1st semester of 4-year B.Tech program.</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Pathway B: Lateral Entry (Direct 2nd Year)</h4>
                      <p className="text-xs text-slate-500">For Polytechnic Diploma & B.Sc Graduates</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li>• Appears for OJEE Lateral Entry entrance examination.</li>
                    <li>• Obtains OJEE Lateral Entry Rank.</li>
                    <li>• Participates in OJEE Lateral Entry counselling.</li>
                    <li>• Directly joins 3rd semester (2nd year) B.Tech program.</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: BRANCHES & SYLLABUS */}
          {activeTab === 'branches' && (
            <div className="space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
                  Engineering Branches & Semester Syllabus
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {info.branches?.map((b, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-100 text-xs font-semibold">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {btechSyllabus.map((syl) => (
                <div key={syl.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">{syl.semesterOrLevel}</span>
                    <h4 className="text-lg font-bold text-slate-900">{syl.subjectOrBranch}</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* TAB 4: EXAMS */}
          {activeTab === 'exams' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
                BPUT Credit & Grading System
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">End-Semester Exam</h4>
                  <p className="text-slate-600">70 Marks University Theory Paper (3 Hours duration).</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Mid-Semester Exam</h4>
                  <p className="text-slate-600">20 Marks Internal Exam conducted by individual engineering college.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Teacher Assessment</h4>
                  <p className="text-slate-600">10 Marks based on quizzes, assignments, and class attendance.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COUNSELLING */}
          {activeTab === 'counselling' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
                Counselling & College Choice Filling Steps
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                {info.counsellingInfo.steps.map((s, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CAREERS */}
          {activeTab === 'careers' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
                Career Pathways & Post-B.Tech Opportunities
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
                  <h4 className="font-bold text-teal-900 text-base">1. Campus Placement & IT Services</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Recruitment in IT services (TCS, Infosys, Wipro, Cognizant) and core engineering firms (L&T, Jindal, Tata Steel).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                  <h4 className="font-bold text-blue-900 text-base">2. GATE & M.Tech Higher Education</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Appearing for GATE to secure M.Tech admissions in IITs/NITs or direct PSU recruitment (IOCL, NTPC, ONGC, SAIL).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                  <h4 className="font-bold text-indigo-900 text-base">3. Civil Services & State Technical Jobs</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Assistant Executive Engineer (AEE) examinations conducted by OPSC and central engineering services.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: OFFICIAL LINKS */}
          {activeTab === 'links' && (
            <OfficialLinksCard categoryName="B.Tech Engineering" links={info.officialLinks} />
          )}

        </div>
      </div>
    </div>
  );
};

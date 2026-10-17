import React, { useState } from 'react';
import { PageType } from '../types';
import { EXAM_INFO_DATA, SYLLABUS_DATA, CALENDAR_EVENTS_DATA } from '../data/examData';
import { OfficialLinksCard } from '../components/OfficialLinksCard';
import { 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Calendar, 
  Clock, 
  HelpCircle, 
  Lightbulb, 
  ListChecks, 
  FileText, 
  ArrowRight,
  ExternalLink,
  Info
} from 'lucide-react';

interface OjeePageProps {
  setActivePage: (page: PageType) => void;
  initialTab?: string;
}

export const OjeePage: React.FC<OjeePageProps> = ({ setActivePage, initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const info = EXAM_INFO_DATA.OJEE;
  const ojeeSyllabus = SYLLABUS_DATA.filter((s) => s.examCategory === 'OJEE');
  const ojeeDates = CALENDAR_EVENTS_DATA.filter((e) => e.category === 'OJEE');

  return (
    <div className="space-y-10 pb-16 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Odisha State Entrance Examination</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Odisha Joint Entrance Examination (OJEE)
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Complete guide for Lateral Entry B.Tech (Diploma & B.Sc graduates), B.Pharm, MCA, MBA, and M.Tech admissions across Odisha institutions.
          </p>

          {/* Quick Stats Pill Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-300">
            <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Exam Mode: CBT (Computer Based)
            </span>
            <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Duration: 120 Mins (120 MCQs)
            </span>
            <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Marking: +4 Correct / -1 Wrong
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 text-xs md:text-sm font-bold text-slate-600 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Eligibility' },
            { id: 'courses', label: 'Courses Offered' },
            { id: 'syllabus', label: 'Syllabus & Pattern' },
            { id: 'dates', label: 'Important Dates' },
            { id: 'counselling', label: 'Counselling Process' },
            { id: 'prep', label: 'Preparation Tips' },
            { id: 'links', label: 'Official Links' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
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
          {(activeTab === 'overview' || activeTab === 'all') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                    About OJEE Examination
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {info.fullOverview}
                  </p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                    Eligibility Criteria (Lateral Entry B.Tech)
                  </h3>
                  
                  <div className="space-y-3 text-xs md:text-sm text-slate-700">
                    <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                      <strong className="text-blue-900 block mb-1">Academic Qualification:</strong>
                      {info.eligibility.qualification}
                    </div>

                    <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                      <strong className="text-indigo-900 block mb-1">Minimum Aggregate Marks:</strong>
                      {info.eligibility.minMarks}
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block mb-1">Age Limit & Domicile:</strong>
                      {info.eligibility.ageLimit} • {info.eligibility.domicile}
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                      Other Mandates:
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {info.eligibility.otherCriteria.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar Exam Quick Summary */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" /> Exam Quick Facts
                  </h3>
                  
                  <div className="divide-y divide-slate-800 text-xs">
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Conducting Body</span>
                      <span className="font-semibold text-white">OJEE Committee & SDTE</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Level of Exam</span>
                      <span className="font-semibold text-white">State Level (Odisha)</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Exam Frequency</span>
                      <span className="font-semibold text-white">Once a Year (Annual)</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Application Mode</span>
                      <span className="font-semibold text-white">Online (ojee.nic.in)</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <span className="text-slate-400">Helpdesk Email</span>
                      <span className="font-semibold text-blue-400">odishajee2026@gmail.com</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActivePage('preparation')}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Practice OJEE Mock Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: COURSES */}
          {activeTab === 'courses' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                Courses Covered Under OJEE Entrance & Counselling
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {info.courses.map((course, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{course}</h4>
                      <p className="text-xs text-slate-500 mt-1">Government & Private Institutions in Odisha</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SYLLABUS & PATTERN */}
          {activeTab === 'syllabus' && (
            <div className="space-y-8">
              {/* Pattern Summary Box */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 rounded-2xl shadow-md border border-blue-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-blue-400" /> Lateral Entry B.Tech Exam Pattern
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block">Total Duration</span>
                    <span className="text-base font-bold text-white">120 Minutes (2 Hours)</span>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block">Total Questions</span>
                    <span className="text-base font-bold text-white">120 MCQs (480 Marks)</span>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block">Marking Scheme</span>
                    <span className="text-base font-bold text-emerald-400">+4 Correct / -1 Wrong</span>
                  </div>
                </div>
              </div>

              {/* Units Accordion */}
              {ojeeSyllabus.map((syl) => (
                <div key={syl.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{syl.semesterOrLevel}</span>
                      <h4 className="text-lg font-bold text-slate-900">{syl.subjectOrBranch}</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {syl.topics.map((unit, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-slate-900 text-sm">{unit.unitName}</h5>
                          {unit.weightage && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                              Weightage: {unit.weightage}
                            </span>
                          )}
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-600 pl-4 list-disc">
                          {unit.subtopics.map((st, i) => (
                            <li key={i}>{st}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-xs text-slate-500">
                    <strong>Recommended Reference Books:</strong> {syl.referenceBooks.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: DATES */}
          {activeTab === 'dates' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                  OJEE 2026 Examination Schedule
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-semibold">
                  Sample / Demo Schedule
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {ojeeDates.map((ev) => (
                  <div key={ev.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                          {ev.eventType}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">{ev.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500">{ev.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-blue-700 block">{ev.formattedDate}</span>
                      <span className="text-[10px] text-amber-600 font-semibold">(Tentative Demo)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COUNSELLING */}
          {activeTab === 'counselling' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                OJEE Admission & Counselling Steps
              </h3>

              <div className="space-y-4">
                {info.counsellingInfo.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Step {idx + 1}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{step}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                <strong className="font-bold block text-sm">Required Verification Documents:</strong>
                <p>{info.counsellingInfo.documentsRequired.join(' • ')}</p>
              </div>
            </div>
          )}

          {/* TAB 6: PREP TIPS */}
          {activeTab === 'prep' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                Preparation Tips for OJEE Lateral Entry B.Tech
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">
                  <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Master Engineering Mathematics First
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Math holds a key weightage of 40 questions. Focus heavily on Matrices, Ordinary Differential Equations, and Laplace Transforms.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                  <h4 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Clear Mechanics Concepts
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Practice Free Body Diagrams (FBD), trusses, friction calculations, and Moment of Inertia formulas daily.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setActivePage('preparation')}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors inline-flex items-center gap-2"
                >
                  <span>Go to Preparation Hub & Mock Tests</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: OFFICIAL LINKS */}
          {(activeTab === 'links' || activeTab === 'all') && (
            <OfficialLinksCard categoryName="OJEE" links={info.officialLinks} />
          )}

        </div>
      </div>
    </div>
  );
};

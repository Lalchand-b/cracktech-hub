import React from 'react';
import { PageType } from '../types';
import { EXAM_INFO_DATA } from '../data/examData';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Cpu, 
  Calendar, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Target, 
  Sparkles, 
  FileText,
  Clock,
  Zap,
  BookMarked
} from 'lucide-react';
import { NoticeTicker } from '../components/NoticeTicker';

interface HomePageProps {
  setActivePage: (page: PageType) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage, onOpenSearch }) => {
  const navigateTo = (page: PageType) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 pb-16 font-sans">
      {/* Notice Banner */}
      <NoticeTicker onNavigateToCalendar={() => navigateTo('calendar')} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-900 text-white pt-12 pb-20 md:py-24 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Odisha’s Centralized Technical Examination Hub</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300">OJEE, Diploma & B.Tech</span> Examinations
              </h1>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                CrackTech Hub brings organized syllabi, eligibility benchmarks, semester structures, exam calendars, and previous year resources into one student-friendly platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => navigateTo('ojee')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <span>Explore Examinations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('preparation')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-100 border border-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>Preparation Hub</span>
                </button>

                <button
                  onClick={onOpenSearch}
                  className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-300 border border-slate-700/60 font-semibold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-3.5 h-3.5 text-blue-400" />
                  <span>Quick Search</span>
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SCTE&VT & BPUT Aligned
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> OJEE Lateral Entry Ready
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Student Free
                </span>
              </div>
            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 md:p-8 rounded-3xl border border-slate-700/80 shadow-2xl backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">Examination Overview</h3>
                      <p className="text-xs text-slate-400">Quick Access Hub</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    Live 2026
                  </span>
                </div>

                <div className="space-y-3">
                  <div 
                    onClick={() => navigateTo('ojee')}
                    className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-blue-400" />
                      <div>
                        <h4 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">OJEE Lateral Entry & B.Pharm</h4>
                        <p className="text-[11px] text-slate-400">Entrance pattern, syllabus & counselling</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </div>

                  <div 
                    onClick={() => navigateTo('diploma')}
                    className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-indigo-400" />
                      <div>
                        <h4 className="font-semibold text-white text-sm group-hover:text-indigo-400 transition-colors">Polytechnic Diploma (SCTE&VT)</h4>
                        <p className="text-[11px] text-slate-400">Civil, Mech, Electrical, CSE & Mining</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </div>

                  <div 
                    onClick={() => navigateTo('btech')}
                    className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <Cpu className="w-5 h-5 text-teal-400" />
                      <div>
                        <h4 className="font-semibold text-white text-sm group-hover:text-teal-400 transition-colors">B.Tech Engineering (BPUT)</h4>
                        <p className="text-[11px] text-slate-400">Semester 1-8 syllabus & JEE pathways</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button 
                    onClick={() => navigateTo('calendar')}
                    className="w-full py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 border border-blue-500/20 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Check 2026 Exam Calendar Schedule &rarr;</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Examination Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Examination Pathways
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Select your technical stream to view structured syllabi, eligibility details, course offerings, and counselling steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: OJEE */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  State Entrance Test
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                  OJEE Examination
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-2 line-clamp-3">
                  {EXAM_INFO_DATA.OJEE.shortDesc}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Duration:</strong> 2 Hours (120 MCQs)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Key Stream:</strong> Diploma LE B.Tech & B.Pharm</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Marking:</strong> +4 Correct, -1 Wrong</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('ojee')}
              className="mt-6 w-full py-3 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Explore OJEE Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Diploma */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                  Polytechnic Studies
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2 group-hover:text-indigo-600 transition-colors">
                  Diploma (SCTE&VT)
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-2 line-clamp-3">
                  {EXAM_INFO_DATA.Diploma.shortDesc}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Eligibility:</strong> 10th HSC Pass (Min 35%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Branches:</strong> Civil, Mech, EE, CSE, Mining</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Admission:</strong> Merit-based via SAMS Odisha</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('diploma')}
              className="mt-6 w-full py-3 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Explore Diploma Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: B.Tech */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 font-bold group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-extrabold text-teal-600 uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                  Engineering Degree
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2 group-hover:text-teal-600 transition-colors">
                  B.Tech (BPUT)
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-2 line-clamp-3">
                  {EXAM_INFO_DATA['B.Tech'].shortDesc}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Pathways:</strong> JEE Main & OJEE Lateral Entry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Structure:</strong> 8 Semester Credit System</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Affiliation:</strong> BPUT & Autonomous Colleges</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('btech')}
              className="mt-6 w-full py-3 rounded-xl bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Explore B.Tech Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Key Platform Features */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
              Why Students Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Engineered Specifically for Technical Education
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Everything engineering and polytechnic students need to stay informed and prepare effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <BookMarked className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Organized Syllabi</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Unit-wise syllabus breakdown with reference book lists for OJEE, Diploma, and BPUT semesters.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Filtered Exam Calendar</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Filter key events by category (OJEE, Diploma, B.Tech) with transparent "Demo Data" tags.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Mock Test Simulator</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Practice timed quizzes with instant score reports, detailed solution explanations, and subject insights.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Official Link Directory</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Direct access links to ojee.nic.in, sctevtodisha.nic.in, and bput.ac.in official verification portals.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* About CrackTech Hub Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                About The Platform
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Eliminating Information Scattering for Odisha Students
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Students in Odisha often struggle to aggregate reliable details across multiple separate portals for Polytechnic, OJEE Lateral Entry, and BPUT B.Tech programs. CrackTech Hub solves this by offering a unified, clean, and accessible platform.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs font-semibold text-slate-300">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                  <span className="block text-xl font-bold text-blue-400">3+</span>
                  <span className="text-slate-400">Main Streams</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                  <span className="block text-xl font-bold text-indigo-400">100%</span>
                  <span className="text-slate-400">Structured Data</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                  <span className="block text-xl font-bold text-emerald-400">2026</span>
                  <span className="text-slate-400">Academic Year</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <button
                onClick={() => navigateTo('about')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Read Full About Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

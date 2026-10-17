import React, { useState } from 'react';
import { PageType } from '../types';
import { 
  Info, 
  Target, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Cpu, 
  Heart,
  MessageSquare
} from 'lucide-react';

export const AboutPage: React.FC<{ setActivePage: (page: PageType) => void }> = ({ setActivePage }) => {
  // Feedback Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Polytechnic Student');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!feedback.trim()) {
      setFormError('Please enter your feedback message.');
      return;
    }
    setFormError('');
    setSubmitted(true);
    setName('');
    setEmail('');
    setFeedback('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="space-y-10 pb-16 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Info className="w-4 h-4 text-amber-400" />
            <span>Project Mission & Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About CrackTech Hub
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Odisha’s student-focused technical examination platform connecting OJEE entrance, SCTE&VT polytechnic diploma, and BPUT engineering academic resources under one roof.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Mission & Problem Statement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">The Problem Statement</h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Technical students in Odisha face significant fragmented information when transitioning between 10th standard, Polytechnic Diploma, OJEE Lateral Entry entrance exams, and 4-year B.Tech university studies under BPUT. Syllabus PDFs, exam timetables, counselling notices, and question paper archives are scattered across disjoined websites with confusing navigation.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Project Objective</h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              CrackTech Hub synthesizes all relevant examination details into an accessible, responsive, and organized platform. Students can view unit-wise syllabi, test themselves with timed practice quizzes, build custom weekly study plans, track key exam timelines, and directly access official verification portals.
            </p>
          </div>

        </div>

        {/* Target Audience */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
            Primary Target Audience
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
              <Award className="w-6 h-6 text-blue-600" />
              <h4 className="font-bold text-slate-900 text-base">OJEE Aspirants</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diploma holders and 12th Science students preparing for state entrance exams and lateral entry into B.Tech/B.Pharm.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h4 className="font-bold text-slate-900 text-base">Polytechnic Students</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students enrolled in 3-year Diploma engineering courses under SCTE&VT Odisha tracking semester syllabi and exams.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
              <Cpu className="w-6 h-6 text-teal-600" />
              <h4 className="font-bold text-slate-900 text-base">B.Tech Engineering Students</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Undergraduate engineering students following BPUT CBCS semester credit systems, GATE preparation, and placements.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features Overview */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              System Architecture
            </span>
            <h3 className="text-2xl font-bold text-white">
              Key Platform Modules
            </h3>
            <p className="text-slate-400 text-xs md:text-sm">
              Built as a client-side web application with modular data, dynamic search indexing, and client-side form validation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">Global Instant Search Index</h4>
              <p className="text-slate-400 leading-relaxed">
                Live filtering across syllabus units, eligibility rules, and exam dates with keyboard shortcut support.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">Mock Test Quiz Engine</h4>
              <p className="text-slate-400 leading-relaxed">
                Interactive timed test simulator with instant marking (+4 / -1 scheme) and answer explanation key.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">Custom Weekly Study Planner</h4>
              <p className="text-slate-400 leading-relaxed">
                Generates personalized weekly schedules tailored to available daily study hours and target exam dates.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback & Student Contact Form */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Student Feedback & Contact Form</h3>
              <p className="text-xs text-slate-500">We continuously improve CrackTech Hub based on student recommendations.</p>
            </div>
          </div>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you for your feedback! Your submission has been recorded.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Laxmipriya Marndi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Your Email Address:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="text-xs font-semibold">
                <label className="block text-slate-700 mb-1">You Are A:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                >
                  <option value="Polytechnic Student">Polytechnic Diploma Student</option>
                  <option value="OJEE Aspirant">OJEE Lateral Entry Aspirant</option>
                  <option value="B.Tech Student">B.Tech Engineering Student</option>
                  <option value="Educator / Parent">Educator / Parent</option>
                </select>
              </div>

              <div className="text-xs font-semibold">
                <label className="block text-slate-700 mb-1">Your Feedback / Suggestions:</label>
                <textarea
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share any additional feature requests or suggestions for CrackTech Hub..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              {formError && <p className="text-rose-500 text-xs font-semibold">{formError}</p>}

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>Submit Feedback</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { PageType, FAQItem } from '../types';
import { FAQ_DATA } from '../data/examData';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  Filter, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export const FaqPage: React.FC<{ setActivePage: (page: PageType) => void }> = ({ setActivePage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Question Submission Form State
  const [userQuestion, setUserQuestion] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesQuery = 
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) {
      setFormError('Please enter your question.');
      return;
    }
    if (!userEmail || !userEmail.includes('@')) {
      setFormError('Please enter a valid email address so our student team can respond.');
      return;
    }
    setFormError('');
    setSubmitted(true);
    setUserQuestion('');
    setUserEmail('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="space-y-10 pb-16 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Student Helpdesk & Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Find answers to common queries on eligibility benchmarks, application steps, syllabus breakdown, examination rules, and counselling procedures.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., OJEE, Lateral Entry, SCTE&VT, TFW)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs md:text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
            <span className="text-slate-400 uppercase tracking-wider text-[11px] shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {(['All', 'Eligibility', 'Application', 'Syllabus', 'Examination', 'Admission'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-all"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                        {faq.category}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm md:text-base">
                        {faq.question}
                      </h3>
                    </div>

                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      <p>{faq.answer}</p>
                      {faq.relatedPage && (
                        <div className="mt-3 pt-2">
                          <button
                            onClick={() => {
                              setActivePage(faq.relatedPage!);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1 text-xs text-blue-600 font-bold hover:underline"
                          >
                            <span>Explore related {faq.relatedPage.toUpperCase()} page</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 space-y-2">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-300" />
              <p className="font-bold text-slate-700">No FAQs match your search query</p>
              <p className="text-xs text-slate-400">Try clearing your filters or submit a new question below.</p>
            </div>
          )}
        </div>

        {/* Submit Question Section */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Didn’t Find Your Question?</h3>
              <p className="text-xs text-slate-400">Ask our student support team for clarification on Odisha technical exams.</p>
            </div>
          </div>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Thank you! Your question has been submitted. Our student moderation team will update the FAQ directory.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmitQuestion} className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Your Student Email:</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-slate-300 mb-1 font-semibold">Your Question / Inquiry:</label>
                <textarea
                  rows={3}
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Describe your question regarding OJEE, Diploma, B.Tech, or counselling..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {formError && <p className="text-rose-400 text-xs">{formError}</p>}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors inline-flex items-center gap-1.5"
              >
                <span>Submit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

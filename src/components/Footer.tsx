import React, { useState } from 'react';
import { PageType } from '../types';
import { 
  GraduationCap, 
  Send, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  Heart,
  ArrowRight
} from 'lucide-react';

interface FooterProps {
  setActivePage: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid student email address.');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const navigateTo = (page: PageType) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Crack<span className="text-blue-500">Tech</span> Hub
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              CrackTech Hub is Odisha’s dedicated student examination platform organizing verified information for OJEE, Polytechnic Diploma (SCTE&VT), and B.Tech (BPUT) engineering studies.
            </p>

            {/* Email Subscription */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Subscribe to Exam Alerts
              </label>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed! You will receive major exam notifications.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your student email..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>Join Alerts</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
              {emailError && <p className="text-rose-400 text-xs mt-1.5">{emailError}</p>}
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Platform Sections
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-blue-400 transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('ojee')} className="hover:text-blue-400 transition-colors">
                  OJEE Entrance Details
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('diploma')} className="hover:text-blue-400 transition-colors">
                  Polytechnic Diploma (SCTE&VT)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('btech')} className="hover:text-blue-400 transition-colors">
                  B.Tech Engineering (BPUT)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('preparation')} className="hover:text-blue-400 transition-colors">
                  Preparation Hub & Mocks
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Student Utilities */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Student Tools
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => navigateTo('calendar')} className="hover:text-blue-400 transition-colors">
                  Exam Calendar & Timelines
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('preparation')} className="hover:text-blue-400 transition-colors">
                  Interactive Mock Tests
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('preparation')} className="hover:text-blue-400 transition-colors">
                  Custom Study Plan Builder
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-blue-400 transition-colors">
                  About CrackTech Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Official Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Official Portals
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <a href="https://ojee.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-1">
                  <span>OJEE Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://sctevtodisha.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-1">
                  <span>SCTE&VT Odisha</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="http://www.bput.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-1">
                  <span>BPUT Odisha</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://samsodisha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-1">
                  <span>SAMS Odisha Polytechnic</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://jeemain.nta.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-1">
                  <span>JEE Main NTA</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-start gap-2 max-w-2xl">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-400">Disclaimer:</strong> CrackTech Hub is an independent student information initiative designed for educational guidance. Dates and schedules marked with "Demo / Sample" are illustrative. Students must verify final notices on official government/university portals.
            </p>
          </div>

          <div className="text-center md:text-right shrink-0">
            <p>© {new Date().getFullYear()} CrackTech Hub. All Rights Reserved.</p>
            <p className="text-[11px] text-slate-600 mt-1 flex items-center justify-center md:justify-end gap-1">
              Crafted for Technical Education in Odisha <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

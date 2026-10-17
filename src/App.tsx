import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { HomePage } from './pages/HomePage';
import { OjeePage } from './pages/OjeePage';
import { DiplomaPage } from './pages/DiplomaPage';
import { BtechPage } from './pages/BtechPage';
import { PracticePage } from './pages/PracticePage';
import { MockTestPage } from './pages/MockTestPage';
import { CalendarPage } from './pages/CalendarPage';
import { PreparationPage } from './pages/PreparationPage';
import { DashboardPage } from './pages/DashboardPage';
import { FaqPage } from './pages/FaqPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [activeTabParam, setActiveTabParam] = useState<string | undefined>(undefined);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Sync title with active page
  useEffect(() => {
    const pageTitles: Record<PageType, string> = {
      home: 'CrackTech Hub | OJEE, Diploma & B.Tech Examination Platform',
      ojee: 'OJEE Entrance Exam | CrackTech Hub',
      diploma: 'Polytechnic Diploma SCTE&VT | CrackTech Hub',
      btech: 'B.Tech Engineering BPUT | CrackTech Hub',
      practice: 'Practice Questions Engine | CrackTech Hub',
      mocktest: 'CBT Mock Test Platform | CrackTech Hub',
      preparation: 'Preparation Hub | CrackTech Hub',
      calendar: 'Exam Calendar & Timelines | CrackTech Hub',
      dashboard: 'Student Progress Dashboard | CrackTech Hub',
      faq: 'Frequently Asked Questions | CrackTech Hub',
      about: 'About CrackTech Hub Project'
    };
    document.title = pageTitles[activePage] || 'CrackTech Hub';
  }, [activePage]);

  const handleNavigate = (page: PageType, tab?: string) => {
    setActivePage(page);
    setActiveTabParam(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Header Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={(p) => handleNavigate(p)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            setActivePage={(p) => handleNavigate(p)}
            onOpenSearch={() => setSearchModalOpen(true)}
          />
        )}

        {activePage === 'ojee' && (
          <OjeePage
            setActivePage={(p) => handleNavigate(p)}
            initialTab={activeTabParam || 'overview'}
          />
        )}

        {activePage === 'diploma' && (
          <DiplomaPage
            setActivePage={(p) => handleNavigate(p)}
            initialTab={activeTabParam || 'overview'}
          />
        )}

        {activePage === 'btech' && (
          <BtechPage
            setActivePage={(p) => handleNavigate(p)}
            initialTab={activeTabParam || 'overview'}
          />
        )}

        {activePage === 'practice' && (
          <PracticePage
            setActivePage={(p) => handleNavigate(p)}
          />
        )}

        {activePage === 'mocktest' && (
          <MockTestPage
            setActivePage={(p) => handleNavigate(p)}
          />
        )}

        {activePage === 'preparation' && (
          <PreparationPage
            setActivePage={(p) => handleNavigate(p)}
            initialSubTab={activeTabParam || 'mocktest'}
          />
        )}

        {activePage === 'calendar' && (
          <CalendarPage setActivePage={(p) => handleNavigate(p)} />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage setActivePage={(p) => handleNavigate(p)} />
        )}

        {activePage === 'faq' && (
          <FaqPage setActivePage={(p) => handleNavigate(p)} />
        )}

        {activePage === 'about' && (
          <AboutPage setActivePage={(p) => handleNavigate(p)} />
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={(p) => handleNavigate(p)} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={(p, t) => handleNavigate(p, t)}
      />
    </div>
  );
}

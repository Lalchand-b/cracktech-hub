import React, { useState, useEffect } from 'react';
import { PageType, SearchResult } from '../types';
import { SEARCH_INDEX } from '../data/examData';
import { Search, X, ArrowRight, BookOpen, Award, Cpu, FileText, Calendar, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageType, tab?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'OJEE' | 'Diploma' | 'B.Tech' | 'Resource'>('All');

  // Handle Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open modal logic handled by parent or state
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredResults = SEARCH_INDEX.filter((item) => {
    const matchesFilter = selectedFilter === 'All' || item.category === selectedFilter;
    const matchesQuery = 
      query.trim() === '' ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.snippet.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const handleSelectResult = (result: SearchResult) => {
    onNavigate(result.targetPage, result.targetTab);
    onClose();
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'OJEE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-700 border border-blue-200">
            <Award className="w-3 h-3" /> OJEE
          </span>
        );
      case 'Diploma':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">
            <BookOpen className="w-3 h-3" /> Diploma
          </span>
        );
      case 'B.Tech':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-100 text-teal-700 border border-teal-200">
            <Cpu className="w-3 h-3" /> B.Tech
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <FileText className="w-3 h-3" /> Resource
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search OJEE, Diploma, B.Tech, syllabus, eligibility, exam pattern..."
            className="flex-1 bg-transparent border-none text-slate-900 placeholder-slate-400 text-sm md:text-base focus:outline-none focus:ring-0 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 rounded bg-slate-200/60"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs font-semibold text-slate-600">
          <span className="text-slate-400 flex items-center gap-1 mr-1 text-[11px] uppercase tracking-wider shrink-0">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {(['All', 'OJEE', 'Diploma', 'B.Tech', 'Resource'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-2.5 py-1 rounded-full transition-all shrink-0 ${
                selectedFilter === filter
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200/70 text-slate-600 border border-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto flex-1 space-y-2 divide-y divide-slate-100">
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <div
                key={result.id}
                onClick={() => handleSelectResult(result)}
                className="group p-3 rounded-xl hover:bg-blue-50/60 cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 pt-3 first:pt-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(result.category)}
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                      {result.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {result.snippet}
                  </p>
                </div>
                <div className="shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">No matching results found</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching for terms like "Syllabus", "Lateral Entry", "BPUT", "Eligibility", or "Mock Test".
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Showing {filteredResults.length} index entries</span>
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono">ESC</kbd> to close</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

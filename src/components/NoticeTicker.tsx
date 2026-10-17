import React from 'react';
import { Bell, AlertTriangle } from 'lucide-react';

export const NoticeTicker: React.FC<{ onNavigateToCalendar: () => void }> = ({ onNavigateToCalendar }) => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs md:text-sm py-2.5 px-4 shadow-sm border-b border-blue-800/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider shrink-0">
            <Bell className="w-3 h-3" />
            Notice
          </span>
          <div className="whitespace-nowrap overflow-hidden text-slate-200 text-xs font-medium truncate">
            <span className="text-amber-300 font-semibold mr-1">[DEMO SCHEDULE]:</span>
            OJEE 2026 Choice Filling starts Aug 15 • SCTE&VT Winter Term Sept 01 • BPUT Odd Sem Reg Sept 10
          </div>
        </div>

        <button
          onClick={onNavigateToCalendar}
          className="inline-flex items-center gap-1 text-xs text-blue-300 hover:text-white font-medium hover:underline shrink-0"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>View Full Exam Calendar &rarr;</span>
        </button>
      </div>
    </div>
  );
};

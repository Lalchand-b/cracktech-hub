import React, { useState } from 'react';
import { PageType, CalendarEvent, ExamCategory } from '../types';
import { CALENDAR_EVENTS_DATA } from '../data/examData';
import { 
  Calendar, 
  Filter, 
  Clock, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Sparkles,
  Award,
  BookOpen,
  Cpu
} from 'lucide-react';

export const CalendarPage: React.FC<{ setActivePage: (page: PageType) => void }> = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory | 'All'>('All');
  const [selectedEventType, setSelectedEventType] = useState<string>('All');

  const filteredEvents = CALENDAR_EVENTS_DATA.filter((e) => {
    const matchesCat = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesType = selectedEventType === 'All' || e.eventType === selectedEventType;
    return matchesCat && matchesType;
  });

  const generateIcsFile = (event: CalendarEvent) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CrackTech Hub//Exam Calendar//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description} (Category: ${event.category})
DTSTART:${event.date.replace(/-/g, '')}T090000Z
DTEND:${event.date.replace(/-/g, '')}T120000Z
LOCATION:Odisha
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}_event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10 pb-16 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Interactive Examination Timeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic & Examination Calendar
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Track key application release dates, admit card downloads, semester exams, and counselling schedules across OJEE, Polytechnic Diploma, and B.Tech.
          </p>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs max-w-2xl">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span><strong>Notice:</strong> Dates tagged as "Sample / Demo" are illustrative. Always cross-verify on official portals before submitting fees.</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
            <span className="text-slate-400 uppercase tracking-wider text-[11px] shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {(['All', 'OJEE', 'Diploma', 'B.Tech'] as const).map((cat) => (
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

          {/* Event Type Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Event Type:</span>
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Event Types</option>
              <option value="Registration">Registration</option>
              <option value="Admit Card">Admit Card</option>
              <option value="Exam Date">Exam Date</option>
              <option value="Result">Result</option>
              <option value="Counselling">Counselling</option>
            </select>
          </div>

        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    event.category === 'OJEE' 
                      ? 'bg-blue-100 text-blue-700' 
                      : event.category === 'Diploma' 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'bg-teal-100 text-teal-700'
                  }`}>
                    {event.category} • {event.eventType}
                  </span>

                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 font-bold">
                    Demo Schedule
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base md:text-lg leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Scheduled Date</span>
                  <span className="font-extrabold text-blue-700 text-sm">{event.formattedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generateIcsFile(event)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors flex items-center gap-1"
                    title="Add event to Calendar (.ics)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add to Cal</span>
                  </button>

                  {event.officialPortalUrl && (
                    <a
                      href={event.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold transition-all flex items-center gap-1"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

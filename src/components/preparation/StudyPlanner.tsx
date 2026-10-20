import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

type TargetExam = 'OJEE' | 'Diploma' | 'B.Tech';

interface StudyWeek {
  week: number;
  focus: string;
  dailyGoal: string;
  tasks: string[];
}

const TOPICS_MAP: Record<TargetExam, string[]> = {
  OJEE: [
    'Matrices, Rank, Determinants & System of Linear Equations',
    'Ordinary Differential Equations & Laplace Transforms',
    'Coplanar Force Systems, Friction & Trusses in Mechanics',
    'Kinematics, Impulse-Momentum & Work-Energy Theorem',
    'Basic Electrical Circuits, KCL, KVL & Transformers',
    'Mock Tests Revision & Solving Previous OJEE Questions',
  ],

  Diploma: [
    'Data Structures: Stacks, Queues, Linked Lists & Trees',
    'C++ OOPs: Encapsulation, Constructors & Polymorphism',
    'Digital Logic: Boolean Algebra, K-Maps & Flip Flops',
    'Electrical Machines: DC Motors & Single Phase Transformers',
    'Transmission Line Parameters & Substation Layouts',
    'SCTE&VT End-Sem Sample Question Papers Practice',
  ],

  'B.Tech': [
    'DBMS: ER Diagrams, SQL Queries & Normalization 1NF-3NF',
    'Operating Systems: Process Scheduling & Deadlocks',
    'Algorithms: Asymptotic Notations & Divide & Conquer',
    'Dynamic Programming & Greedy Algorithm Problems',
    'Computer Networks: OSI Layer Protocols & Subnetting',
    'BPUT Previous Year Question Papers & Internal Revision',
  ],
};

export const StudyPlanner: React.FC = () => {
  const [targetExam, setTargetExam] =
    useState<TargetExam>('OJEE');

  const [dailyHours, setDailyHours] =
    useState<number>(4);

  const [weeksRemaining, setWeeksRemaining] =
    useState<number>(8);

  const [generatedSchedule, setGeneratedSchedule] =
    useState<StudyWeek[] | null>(null);

  // Generate weekly schedule
  const handleGenerateStudyPlan = () => {
    const schedule: StudyWeek[] = [];

    const numberOfWeeks = Math.min(
      Math.max(weeksRemaining, 2),
      16
    );

    const topics = TOPICS_MAP[targetExam];

    for (let week = 1; week <= numberOfWeeks; week++) {
      schedule.push({
        week,

        focus: topics[(week - 1) % topics.length],

        dailyGoal: `${dailyHours} Hours/Day dedicated practice & notes summary`,

        tasks: [
          'Study core theory concepts for 2 hours',
          'Solve 25+ practice MCQs / numerical problems',
          'Revise formulas & error log entries',
        ],
      });
    }

    setGeneratedSchedule(schedule);
  };

  return (
    <div className="mt-8 space-y-6">

      {/* Planner Configuration */}
      <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">

        <div>
          <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
            Personalized Study Plan Generator
          </h3>

          <p className="text-xs text-slate-600 mt-1">
            Configure your target examination, daily available
            hours, and preparation timeframe to generate a
            weekly study schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">

          {/* Target Examination */}
          <div>
            <label
              htmlFor="target-exam"
              className="block text-slate-700 mb-1"
            >
              Target Examination:
            </label>

            <select
              id="target-exam"
              value={targetExam}
              onChange={(event) =>
                setTargetExam(event.target.value as TargetExam)
              }
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
            >
              <option value="OJEE">
                OJEE Lateral Entry B.Tech
              </option>

              <option value="Diploma">
                Diploma SCTE&VT Semester
              </option>

              <option value="B.Tech">
                B.Tech BPUT Semester
              </option>
            </select>
          </div>

          {/* Daily Study Hours */}
          <div>
            <label
              htmlFor="daily-hours"
              className="block text-slate-700 mb-1"
            >
              Daily Study Hours:
            </label>

            <input
              id="daily-hours"
              type="number"
              min={2}
              max={10}
              value={dailyHours}
              onChange={(event) => {
                const value = Number(event.target.value);

                setDailyHours(
                  Math.min(10, Math.max(2, value || 2))
                );
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
            />
          </div>

          {/* Remaining Weeks */}
          <div>
            <label
              htmlFor="remaining-weeks"
              className="block text-slate-700 mb-1"
            >
              Weeks Remaining:
            </label>

            <input
              id="remaining-weeks"
              type="number"
              min={2}
              max={16}
              value={weeksRemaining}
              onChange={(event) => {
                const value = Number(event.target.value);

                setWeeksRemaining(
                  Math.min(16, Math.max(2, value || 2))
                );
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
            />
          </div>

        </div>

        <button
          type="button"
          onClick={handleGenerateStudyPlan}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />

          <span>Generate Weekly Schedule</span>
        </button>

      </section>

      {/* Generated Schedule */}
      {generatedSchedule && (
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">

            <h4 className="font-bold text-slate-900 text-base">
              Custom Weekly Schedule for {targetExam}{' '}
              ({dailyHours} Hrs/Day)
            </h4>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
            >
              Print / Save Schedule
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {generatedSchedule.map((item) => (
              <article
                key={item.week}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
              >

                <div className="flex flex-wrap items-center justify-between gap-2">

                  <span className="text-xs font-extrabold text-blue-600 uppercase">
                    Week {item.week}
                  </span>

                  <span className="text-[10px] text-slate-500 font-semibold">
                    {item.dailyGoal}
                  </span>

                </div>

                <h5 className="font-bold text-slate-900 text-sm">
                  {item.focus}
                </h5>

                <ul className="space-y-1 text-xs text-slate-600 list-disc pl-4">

                  {item.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}

                </ul>

              </article>
            ))}

          </div>
        </section>
      )}

    </div>
  );
};

export default StudyPlanner;
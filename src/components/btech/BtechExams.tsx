import React from 'react';

export const BtechExams: React.FC = () => {
  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">

      <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
        BPUT Credit & Grading System
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">

        {/* End-Semester Examination */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">

          <h4 className="font-bold text-slate-900 text-sm">
            End-Semester Exam
          </h4>

          <p className="text-slate-600">
            70 Marks University Theory Paper (3 Hours duration).
          </p>

        </div>

        {/* Mid-Semester Examination */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">

          <h4 className="font-bold text-slate-900 text-sm">
            Mid-Semester Exam
          </h4>

          <p className="text-slate-600">
            20 Marks Internal Exam conducted by individual engineering college.
          </p>

        </div>

        {/* Teacher Assessment */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">

          <h4 className="font-bold text-slate-900 text-sm">
            Teacher Assessment
          </h4>

          <p className="text-slate-600">
            10 Marks based on quizzes, assignments, and class attendance.
          </p>

        </div>

      </div>
    </section>
  );
};
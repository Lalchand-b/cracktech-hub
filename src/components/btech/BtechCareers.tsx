import React from 'react';

export const BtechCareers: React.FC = () => {
  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">

      <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
        Career Pathways & Post-B.Tech Opportunities
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Campus Placement */}
        <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">

          <h4 className="font-bold text-teal-900 text-base">
            1. Campus Placement & IT Services
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed">
            Recruitment in IT services (TCS, Infosys, Wipro, Cognizant)
            and core engineering firms (L&T, Jindal, Tata Steel).
          </p>

        </div>

        {/* Higher Education */}
        <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">

          <h4 className="font-bold text-blue-900 text-base">
            2. GATE & M.Tech Higher Education
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed">
            Appearing for GATE to secure M.Tech admissions in IITs/NITs
            or direct PSU recruitment (IOCL, NTPC, ONGC, SAIL).
          </p>

        </div>

        {/* Government Jobs */}
        <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">

          <h4 className="font-bold text-indigo-900 text-base">
            3. Civil Services & State Technical Jobs
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed">
            Assistant Executive Engineer (AEE) examinations conducted
            by OPSC and central engineering services.
          </p>

        </div>

      </div>
    </section>
  );
};
import React from 'react';

interface Props {
  info: any;
  btechSyllabus: any[];
}

export const BtechBranches: React.FC<Props> = ({
  info,
  btechSyllabus,
}) => {
  return (
    <div className="space-y-6">

      {/* Engineering Branches */}
      <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">

        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-teal-600 pl-3">
          Engineering Branches & Semester Syllabus
        </h3>

        <div className="flex flex-wrap gap-2 pt-2">
          {info.branches?.map((branch: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-100 text-xs font-semibold"
            >
              {branch}
            </span>
          ))}
        </div>

      </section>

      {/* Syllabus Sections */}
      {btechSyllabus.map((syllabus) => (
        <section
          key={syllabus.id}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >

          <div className="pb-3 border-b border-slate-100">

            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              {syllabus.semesterOrLevel}
            </span>

            <h4 className="text-lg font-bold text-slate-900">
              {syllabus.subjectOrBranch}
            </h4>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {syllabus.topics.map((unit: any, index: number) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
              >

                <h5 className="font-bold text-slate-900 text-sm">
                  {unit.unitName}
                </h5>

                <ul className="space-y-1.5 text-xs text-slate-600 pl-4 list-disc">
                  {unit.subtopics.map(
                    (subtopic: string, subIndex: number) => (
                      <li key={subIndex}>{subtopic}</li>
                    )
                  )}
                </ul>

              </div>
            ))}

          </div>
        </section>
      ))}

    </div>
  );
};
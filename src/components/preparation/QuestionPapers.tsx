import React, { useState } from 'react';
import type { QuestionPaper } from '../../types';
import { QUESTION_PAPERS_DATA } from '../../data/examData';

import {
  Download,
  X,
  CheckCircle2,
} from 'lucide-react';

export const QuestionPapers: React.FC = () => {
  const [paperCategory, setPaperCategory] =
    useState<string>('All');

  const [paperSearch, setPaperSearch] =
    useState<string>('');

  const [previewPaper, setPreviewPaper] =
    useState<QuestionPaper | null>(null);

  // Filter question papers
  const filteredPapers = QUESTION_PAPERS_DATA.filter(
    (paper) => {
      const matchesCategory =
        paperCategory === 'All' ||
        paper.category === paperCategory;

      const query = paperSearch.toLowerCase();

      const matchesSearch =
        query === '' ||
        paper.title.toLowerCase().includes(query) ||
        paper.subject.toLowerCase().includes(query) ||
        paper.branchOrCourse.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    }
  );

  return (
    <div className="mt-8 space-y-6">

      {/* Header and Filters */}
      <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
            Previous Year Question Paper Bank
          </h3>

          <p className="text-xs text-slate-600 mt-1">
            Download or preview exam papers for OJEE Lateral
            Entry, Polytechnic SCTE&VT, and BPUT examinations.
          </p>
        </div>

        {/* Search and Category */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-xs font-semibold">

          <input
            type="text"
            value={paperSearch}
            onChange={(event) =>
              setPaperSearch(event.target.value)
            }
            placeholder="Search subject or year..."
            aria-label="Search question papers"
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500"
          />

          <select
            value={paperCategory}
            onChange={(event) =>
              setPaperCategory(event.target.value)
            }
            aria-label="Filter by category"
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
          >
            <option value="All">All Categories</option>
            <option value="OJEE">OJEE</option>
            <option value="Diploma">Diploma</option>
            <option value="B.Tech">B.Tech</option>
          </select>

        </div>
      </section>

      {/* Question Paper Cards */}
      {filteredPapers.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >

              <div className="space-y-2">

                <div className="flex items-center justify-between gap-2">

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                    {paper.category} • {paper.year}
                  </span>

                  {paper.hasAnswerKey && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Answer Key Incl.
                    </span>
                  )}

                </div>

                <h4 className="font-bold text-slate-900 text-sm">
                  {paper.title}
                </h4>

                <p className="text-xs text-slate-500">
                  {paper.branchOrCourse} • {paper.subject}
                </p>

              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">

                <span className="text-slate-400 font-mono text-[11px]">
                  {paper.fileSize}
                </span>

                <button
                  type="button"
                  onClick={() => setPreviewPaper(paper)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />

                  <span>View / Download</span>
                </button>

              </div>
            </div>
          ))}

        </div>

      ) : (

        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            No question papers match your search.
          </p>
        </div>

      )}

      {/* Preview Modal */}
      {previewPaper && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPreviewPaper(null);
            }
          }}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="paper-preview-title"
            className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200"
          >

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">

              <h4
                id="paper-preview-title"
                className="font-bold text-slate-900 text-base"
              >
                {previewPaper.title}
              </h4>

              <button
                type="button"
                onClick={() => setPreviewPaper(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* Paper Details */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">

              <p>
                <strong>Exam Stream:</strong>{' '}
                {previewPaper.category}
              </p>

              <p>
                <strong>Course / Subject:</strong>{' '}
                {previewPaper.branchOrCourse} -{' '}
                {previewPaper.subject}
              </p>

              <p>
                <strong>Paper Year:</strong>{' '}
                {previewPaper.year}
              </p>

              <p>
                <strong>File Size:</strong>{' '}
                {previewPaper.fileSize}
              </p>

            </div>

            <div className="p-3 bg-blue-50 text-blue-900 text-xs rounded-xl border border-blue-100 flex items-center gap-2">

              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />

              <span>
                Sample Paper PDF download simulation ready.
              </span>

            </div>

            <div className="flex gap-2 justify-end pt-2">

              <button
                type="button"
                onClick={() => setPreviewPaper(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  alert(
                    `Simulated download of ${previewPaper.title} (${previewPaper.fileSize}).`
                  );

                  setPreviewPaper(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />

                <span>Confirm Download</span>
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default QuestionPapers;
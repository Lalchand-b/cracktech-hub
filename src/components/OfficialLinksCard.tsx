import React from 'react';
import { ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

interface OfficialLink {
  title: string;
  url: string;
  description: string;
}

interface OfficialLinksCardProps {
  categoryName: string;
  links: OfficialLink[];
}

export const OfficialLinksCard: React.FC<OfficialLinksCardProps> = ({ categoryName, links }) => {
  return (
    <div id="official-links-section" className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Portal Directory
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            Official Portals & Verification Resources
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            CrackTech Hub aggregates verified links to government and university portals for {categoryName}.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Demo dates marked clearly. Always verify final schedules on official portals.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5 text-sm md:text-base">
                {link.title}
              </span>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {link.description}
            </p>
            <div className="mt-3 inline-flex items-center text-xs text-blue-400 group-hover:underline font-medium">
              Visit Portal &rarr;
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

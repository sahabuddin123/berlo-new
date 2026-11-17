import React, { useState, useEffect } from 'react';
import { projectsData } from '../../data/projectsData';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    setProjects(
      projectsData.map((p) => ({
        id: p.id,
        slug: p.slug,
        title_en: p.title.en,
        client: p.clientName,
        industry: p.industry.en,
        year: p.timeline,
        is_published: true,
      }))
    );
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Case Studies & Portfolio Campaigns
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage corporate showcase projects, challenges, solutions, and impact metrics.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Campaign / Project</th>
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Industry</th>
                <th className="px-5 py-3">Timeline</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-white">{proj.title_en}</div>
                    <div className="text-[11px] text-slate-500 font-mono">slug: {proj.slug}</div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-300 font-medium">{proj.client}</td>
                  <td className="px-5 py-3.5 text-slate-400">{proj.industry}</td>
                  <td className="px-5 py-3.5 text-slate-400 font-mono">{proj.year}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Published
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <a
                      href={`/en/work/${proj.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-[#A302FF] text-slate-300 hover:text-white transition-colors"
                    >
                      Preview
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

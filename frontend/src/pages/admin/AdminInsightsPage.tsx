import React, { useState, useEffect } from 'react';
import { insightsData } from '../../data/insightsData';

export const AdminInsightsPage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    setArticles(
      insightsData.map((a) => ({
        id: a.id,
        slug: a.slug,
        title_en: a.title.en,
        category: a.category,
        author: a.author.en,
        readTime: `${a.readTimeMinutes} min read`,
        status: 'published',
      }))
    );
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Insights & Thought Leadership Articles
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Author and publish strategic editorial articles, PR analysis, and market advisories.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Article Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Author</th>
                <th className="px-5 py-3">Read Time</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-white">{art.title_en}</div>
                    <div className="text-[11px] text-slate-500 font-mono">slug: {art.slug}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[11px]">
                      {art.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">{art.author}</td>
                  <td className="px-5 py-3.5 text-slate-400">{art.readTime}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Published
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <a
                      href={`/en/insights/${art.slug}`}
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

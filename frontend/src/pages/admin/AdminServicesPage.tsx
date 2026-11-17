import React, { useState, useEffect } from 'react';
import { servicesData } from '../../data/servicesData';
import { CheckCircle } from 'lucide-react';

export const AdminServicesPage: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Populate with 9 services
    setServices(
      servicesData.map((s) => ({
        id: s.id,
        slug: s.slug,
        title_en: s.title.en,
        title_bn: s.title.bn,
        short_desc_en: s.shortDesc.en,
        capabilities_count: s.capabilities.length,
        is_active: true,
      }))
    );
  }, []);

  const toggleActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_active: !s.is_active } : s))
    );
    setFeedback('Service visibility status toggled successfully.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Strategic Capabilities & Services Catalog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage Berlo's 9 core capability verticals, deliverables, and metrics.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Service Vertical</th>
                <th className="px-5 py-3">Bengali Title</th>
                <th className="px-5 py-3">Capabilities</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-white">{srv.title_en}</div>
                    <div className="text-[11px] text-slate-500 font-mono">slug: {srv.slug}</div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-300 font-medium">{srv.title_bn}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 text-[11px]">
                      {srv.capabilities_count} Modules
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      type="button"
                      onClick={() => toggleActive(srv.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                        srv.is_active
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {srv.is_active ? 'Live on Site' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <a
                      href={`/en/services/${srv.slug}`}
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

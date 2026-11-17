import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

interface ServiceRecord {
  id: number;
  slug: string;
  icon?: string;
  title_en: string;
  title_bn: string;
  tagline_en?: string;
  tagline_bn?: string;
  short_desc_en?: string;
  short_desc_bn?: string;
  overview_en?: string;
  overview_bn?: string;
  is_active: boolean;
  sort_order: number;
  capabilities?: any[];
}

export const AdminServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title_en: '',
    title_bn: '',
    slug: '',
    icon: 'ShieldCheck',
    tagline_en: '',
    tagline_bn: '',
    short_desc_en: '',
    short_desc_bn: '',
    overview_en: '',
    overview_bn: '',
    is_active: true,
    sort_order: 1,
  });

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getServices();
      const list = Array.isArray(res.data) ? res.data : (res as any)?.data || [];
      setServices(list);
    } catch {
      // Handled
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title_en: '',
      title_bn: '',
      slug: '',
      icon: 'ShieldCheck',
      tagline_en: '',
      tagline_bn: '',
      short_desc_en: '',
      short_desc_bn: '',
      overview_en: '',
      overview_bn: '',
      is_active: true,
      sort_order: services.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceRecord) => {
    setEditingService(srv);
    setFormData({
      title_en: srv.title_en,
      title_bn: srv.title_bn,
      slug: srv.slug,
      icon: srv.icon || 'ShieldCheck',
      tagline_en: srv.tagline_en || '',
      tagline_bn: srv.tagline_bn || '',
      short_desc_en: srv.short_desc_en || '',
      short_desc_bn: srv.short_desc_bn || '',
      overview_en: srv.overview_en || '',
      overview_bn: srv.overview_bn || '',
      is_active: Boolean(srv.is_active),
      sort_order: srv.sort_order ?? 1,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete the service "${title}"?`)) return;
    try {
      await adminApi.deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      setFeedback(`Service "${title}" was deleted successfully.`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete service.');
    }
  };

  const handleToggleActive = async (srv: ServiceRecord) => {
    try {
      const updated = !srv.is_active;
      await adminApi.updateService(srv.id, { is_active: updated });
      setServices((prev) => prev.map((s) => (s.id === srv.id ? { ...s, is_active: updated } : s)));
      setFeedback(`Status updated for ${srv.title_en}`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to toggle status.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingService) {
        const res = await adminApi.updateService(editingService.id, formData);
        setServices((prev) => prev.map((s) => (s.id === editingService.id ? res.data : s)));
        setFeedback(`Updated service: ${formData.title_en}`);
      } else {
        const res = await adminApi.createService(formData);
        setServices((prev) => [...prev, res.data]);
        setFeedback(`Created new service: ${formData.title_en}`);
      }
      setModalOpen(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save service.');
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = services.filter(
    (s) =>
      s.title_en.toLowerCase().includes(search.toLowerCase()) ||
      s.title_bn.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-[#A302FF]" />
            <span>Core Capabilities & Services Catalog</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage strategic capabilities, descriptions, and deliverable modules. Updates reflect immediately on public pages.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#A302FF] hover:from-[#6d28d9] hover:to-[#8b00de] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services by English or Bengali title..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#7c3aed]"
          />
        </div>
        <div className="text-xs text-slate-400">
          Total Services: <span className="text-white font-semibold">{services.length}</span>
        </div>
      </div>

      {/* Services Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-slate-500 text-xs">Loading services catalog...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-xs">No services found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Service Vertical</th>
                  <th className="px-5 py-3.5">Bengali Name</th>
                  <th className="px-5 py-3.5">Slug</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Sort</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((srv) => (
                  <tr key={srv.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-white">{srv.title_en}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{srv.tagline_en}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 font-medium">
                      {srv.title_bn}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-400">
                      /services/{srv.slug}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => handleToggleActive(srv)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                          srv.is_active
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}
                      >
                        {srv.is_active ? 'Active' : 'Draft / Inactive'}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 font-mono">
                      #{srv.sort_order}
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <a
                        href={`/en/services/${srv.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors inline-block align-middle"
                        title="View on Public Site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(srv)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#7c3aed] text-slate-300 hover:text-white transition-colors cursor-pointer align-middle"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(srv.id, srv.title_en)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer align-middle"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#A302FF]" />
                <span>{editingService ? 'Edit Capability Vertical' : 'Add New Capability Vertical'}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    English Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    placeholder="e.g. Crisis & Reputation Management"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Bengali Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title_bn}
                    onChange={(e) => setFormData({ ...formData, title_bn: e.target.value })}
                    placeholder="e.g. সংকট ব্যবস্থাপনা ও সুনাম সুরক্ষা"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="crisis-management"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Icon Identifier
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="ShieldCheck"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Tagline (English)
                  </label>
                  <input
                    type="text"
                    value={formData.tagline_en}
                    onChange={(e) => setFormData({ ...formData, tagline_en: e.target.value })}
                    placeholder="Short punchy summary..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Tagline (Bengali)
                  </label>
                  <input
                    type="text"
                    value={formData.tagline_bn}
                    onChange={(e) => setFormData({ ...formData, tagline_bn: e.target.value })}
                    placeholder="সংক্ষিপ্ত ট্যাগলাইন..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Short Description (English)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.short_desc_en}
                    onChange={(e) => setFormData({ ...formData, short_desc_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Short Description (Bengali)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.short_desc_bn}
                    onChange={(e) => setFormData({ ...formData, short_desc_bn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Overview / In-Depth Narrative (English)
                </label>
                <textarea
                  rows={3}
                  value={formData.overview_en}
                  onChange={(e) => setFormData({ ...formData, overview_en: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="active_check"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded text-[#7c3aed] bg-slate-950 border-slate-800"
                />
                <label htmlFor="active_check" className="text-xs text-white font-medium cursor-pointer">
                  Publish service live on public website (/services)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#A302FF] text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

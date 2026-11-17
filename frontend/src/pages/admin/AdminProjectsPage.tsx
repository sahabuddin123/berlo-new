import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import {
  FolderKanban,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  ExternalLink,
  Star,
} from 'lucide-react';

interface ProjectRecord {
  id: number;
  slug: string;
  title_en: string;
  title_bn: string;
  client_name?: string;
  industry_en?: string;
  industry_bn?: string;
  category: string;
  timeline?: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
}

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title_en: '',
    title_bn: '',
    slug: '',
    client_name: '',
    industry_en: 'FinTech & Banking',
    industry_bn: 'ফিনটেক ও ব্যাংকিং',
    category: 'corporate',
    timeline: '6 Months',
    overview_en: '',
    overview_bn: '',
    challenge_en: '',
    challenge_bn: '',
    strategy_en: '',
    strategy_bn: '',
    execution_en: '',
    execution_bn: '',
    is_featured: true,
    is_published: true,
    sort_order: 1,
  });

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getProjects();
      const list = Array.isArray(res.data) ? res.data : (res as any)?.data || [];
      setProjects(list);
    } catch {
      // Handled
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title_en: '',
      title_bn: '',
      slug: '',
      client_name: '',
      industry_en: 'FinTech & Banking',
      industry_bn: 'ফিনটেক ও ব্যাংকিং',
      category: 'corporate',
      timeline: '6 Months',
      overview_en: '',
      overview_bn: '',
      challenge_en: '',
      challenge_bn: '',
      strategy_en: '',
      strategy_bn: '',
      execution_en: '',
      execution_bn: '',
      is_featured: true,
      is_published: true,
      sort_order: projects.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (proj: any) => {
    setEditingProject(proj);
    setFormData({
      title_en: proj.title_en,
      title_bn: proj.title_bn,
      slug: proj.slug,
      client_name: proj.client_name || '',
      industry_en: proj.industry_en || 'FinTech & Banking',
      industry_bn: proj.industry_bn || 'ফিনটেক ও ব্যাংকিং',
      category: proj.category || 'corporate',
      timeline: proj.timeline || '6 Months',
      overview_en: proj.overview_en || '',
      overview_bn: proj.overview_bn || '',
      challenge_en: proj.challenge_en || '',
      challenge_bn: proj.challenge_bn || '',
      strategy_en: proj.strategy_en || '',
      strategy_bn: proj.strategy_bn || '',
      execution_en: proj.execution_en || '',
      execution_bn: proj.execution_bn || '',
      is_featured: Boolean(proj.is_featured),
      is_published: Boolean(proj.is_published ?? true),
      sort_order: proj.sort_order ?? 1,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete case study "${title}"?`)) return;
    try {
      await adminApi.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setFeedback(`Case study "${title}" was deleted.`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete case study.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingProject) {
        const res = await adminApi.updateProject(editingProject.id, formData);
        setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? res.data : p)));
        setFeedback(`Updated case study: ${formData.title_en}`);
      } else {
        const res = await adminApi.createProject(formData);
        setProjects((prev) => [...prev, res.data]);
        setFeedback(`Created new case study: ${formData.title_en}`);
      }
      setModalOpen(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title_en.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      (p.client_name && p.client_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FolderKanban className="w-6 h-6 text-[#A302FF]" />
            <span>Case Studies & Portfolio Campaigns</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage corporate showcase projects, challenge narratives, and verified impact metrics.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#A302FF] hover:from-[#6d28d9] hover:to-[#8b00de] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
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
            placeholder="Search campaigns by title or client..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#7c3aed]"
          />
        </div>
        <div className="text-xs text-slate-400">
          Total Case Studies: <span className="text-white font-semibold">{projects.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-slate-500 text-xs">Loading case studies...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-xs">No case studies found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Campaign Name</th>
                  <th className="px-5 py-3.5">Client</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Timeline</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-white">{proj.title_en}</div>
                      <div className="text-[11px] font-mono text-slate-500">/work/{proj.slug}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 font-medium">
                      {proj.client_name || 'Enterprise'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                        {proj.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 font-mono">
                      {proj.timeline || '6 Months'}
                    </td>
                    <td className="px-5 py-3.5">
                      {proj.is_featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" /> Featured
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <a
                        href={`/en/work/${proj.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors inline-block align-middle"
                        title="View on Public Site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#7c3aed] text-slate-300 hover:text-white transition-colors cursor-pointer align-middle"
                        title="Edit Case Study"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title_en)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer align-middle"
                        title="Delete Case Study"
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
                <FolderKanban className="w-5 h-5 text-[#A302FF]" />
                <span>{editingProject ? 'Edit Case Study' : 'Add New Case Study'}</span>
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
                    placeholder="e.g. Nationwide Financial Inclusion Narrative..."
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
                    placeholder="e.g. দেশব্যাপী আর্থিক অন্তর্ভুক্তি ক্যাম্পেইন..."
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
                    placeholder="fintech-reputation-elevation"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="e.g. Digital Finance Consortium"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  >
                    <option value="corporate">Corporate PR</option>
                    <option value="crisis">Crisis & Newsroom</option>
                    <option value="events">Events & Pavilions</option>
                    <option value="digital">Digital & Social</option>
                    <option value="brand">Brand Campaigns</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Overview Narrative (English)
                </label>
                <textarea
                  rows={2}
                  value={formData.overview_en}
                  onChange={(e) => setFormData({ ...formData, overview_en: e.target.value })}
                  placeholder="Summary of scope and strategy..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Challenge (English)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.challenge_en}
                    onChange={(e) => setFormData({ ...formData, challenge_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Strategy & Solution (English)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.strategy_en}
                    onChange={(e) => setFormData({ ...formData, strategy_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#7c3aed] bg-slate-950 border-slate-800"
                  />
                  <span className="text-xs text-white">Feature in Homepage Showcase</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-4 h-4 rounded text-[#7c3aed] bg-slate-950 border-slate-800"
                  />
                  <span className="text-xs text-white">Publish live (/work)</span>
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
                  {isSaving ? 'Saving...' : editingProject ? 'Update Case Study' : 'Create Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

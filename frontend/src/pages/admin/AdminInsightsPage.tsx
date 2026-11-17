import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

interface InsightRecord {
  id: number;
  slug: string;
  title_en: string;
  title_bn: string;
  excerpt_en?: string;
  excerpt_bn?: string;
  category: string;
  author_en?: string;
  author_bn?: string;
  author_role_en?: string;
  published_at?: string;
  read_time?: number;
  status: string;
  is_featured: boolean;
}

export const AdminInsightsPage: React.FC = () => {
  const [insights, setInsights] = useState<InsightRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState<InsightRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title_en: '',
    title_bn: '',
    slug: '',
    category: 'crisis',
    excerpt_en: '',
    excerpt_bn: '',
    author_en: 'Md. Kabir Hossain',
    author_bn: 'মোঃ কবির হোসেন',
    author_role_en: 'Senior Manager, Public Relations',
    author_role_bn: 'সিনিয়র ম্যানেজার, পাবলিক রিলেশনস',
    published_at: new Date().toISOString().split('T')[0],
    read_time: 7,
    status: 'published',
    is_featured: true,
  });

  const loadInsights = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getInsights();
      const list = Array.isArray(res.data) ? res.data : (res as any)?.data || [];
      setInsights(list);
    } catch {
      // Handled
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const handleOpenAdd = () => {
    setEditingInsight(null);
    setFormData({
      title_en: '',
      title_bn: '',
      slug: '',
      category: 'crisis',
      excerpt_en: '',
      excerpt_bn: '',
      author_en: 'Md. Kabir Hossain',
      author_bn: 'মোঃ কবির হোসেন',
      author_role_en: 'Senior Manager, Public Relations',
      author_role_bn: 'সিনিয়র ম্যানেজার, পাবলিক রিলেশনস',
      published_at: new Date().toISOString().split('T')[0],
      read_time: 7,
      status: 'published',
      is_featured: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (art: any) => {
    setEditingInsight(art);
    setFormData({
      title_en: art.title_en,
      title_bn: art.title_bn,
      slug: art.slug,
      category: art.category || 'crisis',
      excerpt_en: art.excerpt_en || '',
      excerpt_bn: art.excerpt_bn || '',
      author_en: art.author_en || 'Md. Kabir Hossain',
      author_bn: art.author_bn || 'মোঃ কবির হোসেন',
      author_role_en: art.author_role_en || 'Senior Manager, Public Relations',
      author_role_bn: art.author_role_bn || 'সিনিয়র ম্যানেজার, পাবলিক রিলেশনস',
      published_at: art.published_at || new Date().toISOString().split('T')[0],
      read_time: art.read_time ?? 7,
      status: art.status || 'published',
      is_featured: Boolean(art.is_featured),
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete article "${title}"?`)) return;
    try {
      await adminApi.deleteInsight(id);
      setInsights((prev) => prev.filter((i) => i.id !== id));
      setFeedback(`Article "${title}" was deleted.`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete article.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingInsight) {
        const res = await adminApi.updateInsight(editingInsight.id, formData);
        setInsights((prev) => prev.map((i) => (i.id === editingInsight.id ? res.data : i)));
        setFeedback(`Updated article: ${formData.title_en}`);
      } else {
        const res = await adminApi.createInsight(formData);
        setInsights((prev) => [res.data, ...prev]);
        setFeedback(`Created article: ${formData.title_en}`);
      }
      setModalOpen(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save article.');
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = insights.filter(
    (i) =>
      i.title_en.toLowerCase().includes(search.toLowerCase()) ||
      i.slug.toLowerCase().includes(search.toLowerCase()) ||
      (i.author_en && i.author_en.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-[#A302FF]" />
            <span>Articles & Thought Leadership Insights</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage industry perspectives, advisory articles, and PR insights displayed on public channels.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#A302FF] hover:from-[#6d28d9] hover:to-[#8b00de] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
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
            placeholder="Search articles by title or author..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#7c3aed]"
          />
        </div>
        <div className="text-xs text-slate-400">
          Total Published: <span className="text-white font-semibold">{insights.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-slate-500 text-xs">Loading articles...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-xs">No articles found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Article Title</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Author</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-white">{art.title_en}</div>
                      <div className="text-[11px] font-mono text-slate-500">/insights/{art.slug}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                        {art.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300">
                      {art.author_en || 'Berlo Bureau'}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 font-mono">
                      {art.published_at || 'Recent'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          art.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {art.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <a
                        href={`/en/insights/${art.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors inline-block align-middle"
                        title="View on Public Site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(art)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#7c3aed] text-slate-300 hover:text-white transition-colors cursor-pointer align-middle"
                        title="Edit Article"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(art.id, art.title_en)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer align-middle"
                        title="Delete Article"
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
                <FileText className="w-5 h-5 text-[#A302FF]" />
                <span>{editingInsight ? 'Edit Article' : 'Write New Article'}</span>
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
                    placeholder="e.g. The First 60 Minutes..."
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
                    placeholder="e.g. প্রথম ৬০ মিনিট..."
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
                    placeholder="navigating-crises-in-digital-age"
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
                    <option value="crisis">Crisis & Reputation</option>
                    <option value="reputation">Corporate PR</option>
                    <option value="media">Media Trends</option>
                    <option value="digital">Digital Strategy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Read Time (Mins)
                  </label>
                  <input
                    type="number"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Author (English)
                  </label>
                  <input
                    type="text"
                    value={formData.author_en}
                    onChange={(e) => setFormData({ ...formData, author_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Author Role / Designation
                  </label>
                  <input
                    type="text"
                    value={formData.author_role_en}
                    onChange={(e) => setFormData({ ...formData, author_role_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Excerpt / Brief Summary (English)
                </label>
                <textarea
                  rows={3}
                  value={formData.excerpt_en}
                  onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                  placeholder="Key summary for listing cards..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#7c3aed] bg-slate-950 border-slate-800"
                  />
                  <span className="text-xs text-white">Feature as Top Story</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Status:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
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
                  {isSaving ? 'Saving...' : editingInsight ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

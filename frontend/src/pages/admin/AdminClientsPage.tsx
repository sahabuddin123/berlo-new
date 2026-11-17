import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import {
  Handshake,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  Star,
  Globe,
} from 'lucide-react';

interface ClientRecord {
  id: number;
  name: string;
  logo?: string;
  industry?: string;
  tier?: string;
  website?: string;
  is_featured: boolean;
  sort_order: number;
}

export const AdminClientsPage: React.FC = () => {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    industry: 'Banking & Financial',
    tier: 'Enterprise Tier-1',
    website: '',
    is_featured: true,
    sort_order: 1,
  });

  const loadClients = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getClients();
      if (res?.data) {
        setClients(res.data);
      }
    } catch {
      // Handled
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleOpenAdd = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      logo: '',
      industry: 'Banking & Financial',
      tier: 'Enterprise Tier-1',
      website: '',
      is_featured: true,
      sort_order: clients.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (client: ClientRecord) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      logo: client.logo || '',
      industry: client.industry || 'Banking & Financial',
      tier: client.tier || 'Enterprise Tier-1',
      website: client.website || '',
      is_featured: Boolean(client.is_featured),
      sort_order: client.sort_order ?? 1,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete client "${name}"?`)) return;
    try {
      await adminApi.deleteClient(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
      setFeedback(`Client "${name}" was removed successfully.`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete client.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingClient) {
        const res = await adminApi.updateClient(editingClient.id, formData);
        setClients((prev) => prev.map((c) => (c.id === editingClient.id ? res.data : c)));
        setFeedback(`Updated client: ${formData.name}`);
      } else {
        const res = await adminApi.createClient(formData);
        setClients((prev) => [...prev, res.data]);
        setFeedback(`Added new client: ${formData.name}`);
      }
      setModalOpen(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save client.');
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.industry && c.industry.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Handshake className="w-6 h-6 text-[#A302FF]" />
            <span>Clients & Strategic Partners</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage enterprise brand partnerships, logos, and sector accreditations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#A302FF] hover:from-[#6d28d9] hover:to-[#8b00de] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client or industry..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#7c3aed]"
          />
        </div>
        <div className="text-xs text-slate-400">
          Total Partners: <span className="text-white font-semibold">{clients.length}</span>
        </div>
      </div>

      {/* Client List */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-slate-500 text-xs">Loading partners...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-xs">No client records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Client Organization</th>
                  <th className="px-5 py-3.5">Industry Vertical</th>
                  <th className="px-5 py-3.5">Engagement Tier</th>
                  <th className="px-5 py-3.5">Website</th>
                  <th className="px-5 py-3.5">Sort</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                          {client.logo ? (
                            <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <Handshake className="w-5 h-5 text-slate-800" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{client.name}</div>
                          {client.is_featured && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-amber-400">
                              <Star className="w-2.5 h-2.5 fill-amber-400" /> Featured on Homepage
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 font-medium">
                      {client.industry || 'Corporate'}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {client.tier || 'Strategic Partner'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {client.website ? (
                        <a
                          href={client.website}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[#7c3aed] hover:text-[#A302FF] transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Visit</span>
                        </a>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 font-mono">
                      #{client.sort_order}
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(client)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#7c3aed] text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Client"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(client.id, client.name)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Delete Client"
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
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Handshake className="w-5 h-5 text-[#A302FF]" />
                <span>{editingClient ? 'Edit Client' : 'Add New Client'}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. British American Tobacco"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Industry Vertical *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Banking & Financial"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Engagement Tier
                  </label>
                  <input
                    type="text"
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    placeholder="e.g. Enterprise Tier-1"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Logo URL
                </label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="/images/berlo/clients/bat.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
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

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured_check"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#7c3aed] bg-slate-950 border-slate-800"
                />
                <label htmlFor="featured_check" className="text-xs text-white font-medium cursor-pointer">
                  Feature in Homepage Client Marquee
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
                  {isSaving ? 'Saving...' : editingClient ? 'Update Client' : 'Create Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import {
  Users2,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  Star,
} from 'lucide-react';

interface TeamMemberRecord {
  id: number;
  slug?: string;
  name_en: string;
  name_bn: string;
  role_en: string;
  role_bn: string;
  division_en?: string;
  division_bn?: string;
  bio_en?: string;
  bio_bn?: string;
  photo?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  is_leadership: boolean;
  sort_order: number;
}

export const AdminTeamPage: React.FC = () => {
  const [team, setTeam] = useState<TeamMemberRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterLeadership, setFilterLeadership] = useState<'all' | 'leadership' | 'general'>('all');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name_en: '',
    name_bn: '',
    role_en: '',
    role_bn: '',
    division_en: 'Strategic Advisory',
    division_bn: 'কৌশলগত পরামর্শ',
    bio_en: '',
    bio_bn: '',
    photo: '',
    email: '',
    phone: '',
    linkedin: '',
    is_leadership: false,
    sort_order: 1,
  });

  const loadTeam = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getTeam();
      if (res?.data) {
        setTeam(res.data);
      }
    } catch {
      // Handled
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      name_en: '',
      name_bn: '',
      role_en: '',
      role_bn: '',
      division_en: 'Strategic Advisory',
      division_bn: 'কৌশলগত পরামর্শ',
      bio_en: '',
      bio_bn: '',
      photo: '',
      email: '',
      phone: '',
      linkedin: '',
      is_leadership: false,
      sort_order: team.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMemberRecord) => {
    setEditingMember(member);
    setFormData({
      name_en: member.name_en,
      name_bn: member.name_bn,
      role_en: member.role_en,
      role_bn: member.role_bn,
      division_en: member.division_en || 'Strategic Advisory',
      division_bn: member.division_bn || 'কৌশলগত পরামর্শ',
      bio_en: member.bio_en || '',
      bio_bn: member.bio_bn || '',
      photo: member.photo || '',
      email: member.email || '',
      phone: member.phone || '',
      linkedin: member.linkedin || '',
      is_leadership: Boolean(member.is_leadership),
      sort_order: member.sort_order ?? 1,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the team directory?`)) return;
    try {
      await adminApi.deleteTeamMember(id);
      setTeam((prev) => prev.filter((m) => m.id !== id));
      setFeedback(`Team member "${name}" was deleted successfully.`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete team member.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingMember) {
        const res = await adminApi.updateTeamMember(editingMember.id, formData);
        setTeam((prev) => prev.map((m) => (m.id === editingMember.id ? res.data : m)));
        setFeedback(`Updated team member: ${formData.name_en}`);
      } else {
        const res = await adminApi.createTeamMember(formData);
        setTeam((prev) => [...prev, res.data]);
        setFeedback(`Added new team member: ${formData.name_en}`);
      }
      setModalOpen(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save team member.');
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = team.filter((m) => {
    const matchesSearch =
      m.name_en.toLowerCase().includes(search.toLowerCase()) ||
      m.name_bn.toLowerCase().includes(search.toLowerCase()) ||
      m.role_en.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filterLeadership === 'leadership') return m.is_leadership;
    if (filterLeadership === 'general') return !m.is_leadership;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Users2 className="w-6 h-6 text-[#A302FF]" />
            <span>Team & Leadership Roster</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage executive leadership and strategic consulting advisors displayed on public pages.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#A302FF] hover:from-[#6d28d9] hover:to-[#8b00de] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
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
            placeholder="Search by name, role, division..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#7c3aed]"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'leadership', 'general'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterLeadership(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                filterLeadership === mode
                  ? 'bg-[#7c3aed] text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {mode === 'all' ? 'All Members' : mode === 'leadership' ? 'Executive Leadership' : 'Advisory Team'}
            </button>
          ))}
        </div>
      </div>

      {/* Team Roster Grid/Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-slate-500 text-xs">Loading team roster...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-xs">No team members found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Member</th>
                  <th className="px-5 py-3.5">Designation (EN / BN)</th>
                  <th className="px-5 py-3.5">Division</th>
                  <th className="px-5 py-3.5">Tier</th>
                  <th className="px-5 py-3.5">Sort</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                          {member.photo ? (
                            <img src={member.photo} alt={member.name_en} className="w-full h-full object-cover" />
                          ) : (
                            <Users2 className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{member.name_en}</div>
                          <div className="text-[11px] text-slate-400 font-normal">{member.name_bn}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-slate-300 font-medium">{member.role_en}</div>
                      <div className="text-[11px] text-slate-500">{member.role_bn}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {member.division_en || 'Strategic Advisory'}
                    </td>
                    <td className="px-5 py-3.5">
                      {member.is_leadership ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A302FF]/20 text-[#c084fc] border border-[#A302FF]/30">
                          <Star className="w-3 h-3" />
                          Leadership
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
                          Staff Advisor
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 font-mono">
                      #{member.sort_order}
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(member)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#7c3aed] text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Member"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id, member.name_en)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Delete Member"
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
                <Users2 className="w-5 h-5 text-[#A302FF]" />
                <span>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</span>
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
                    English Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    placeholder="e.g. Shakhawat Ullah"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Bengali Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name_bn}
                    onChange={(e) => setFormData({ ...formData, name_bn: e.target.value })}
                    placeholder="e.g. সাখাওয়াত উল্লাহ"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Role / Designation (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role_en}
                    onChange={(e) => setFormData({ ...formData, role_en: e.target.value })}
                    placeholder="e.g. Planning & Communication Lead"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Role / Designation (Bengali) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role_bn}
                    onChange={(e) => setFormData({ ...formData, role_bn: e.target.value })}
                    placeholder="e.g. পরিকল্পনা ও যোগাযোগ প্রধান"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Division (English)
                  </label>
                  <input
                    type="text"
                    value={formData.division_en}
                    onChange={(e) => setFormData({ ...formData, division_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Division (Bengali)
                  </label>
                  <input
                    type="text"
                    value={formData.division_bn}
                    onChange={(e) => setFormData({ ...formData, division_bn: e.target.value })}
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    placeholder="/images/team/member.jpg"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="advisor@berlocommunications.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    LinkedIn Profile
                  </label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Bio (English)
                </label>
                <textarea
                  rows={2}
                  value={formData.bio_en}
                  onChange={(e) => setFormData({ ...formData, bio_en: e.target.value })}
                  placeholder="Executive background summary..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#7c3aed]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="leadership_check"
                  checked={formData.is_leadership}
                  onChange={(e) => setFormData({ ...formData, is_leadership: e.target.checked })}
                  className="w-4 h-4 rounded text-[#7c3aed] bg-slate-950 border-slate-800"
                />
                <label htmlFor="leadership_check" className="text-xs text-white font-medium cursor-pointer">
                  Feature in Executive Leadership section (/leadership)
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
                  {isSaving ? 'Saving...' : editingMember ? 'Update Member' : 'Create Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

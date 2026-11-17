import React, { useState, useEffect } from 'react';
import { adminApi, InquiryItem } from '../../services/adminApi';
import {
  Search,
  Trash2,
  CheckCircle,
  Building,
  X,
} from 'lucide-react';

export const AdminInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState<string>('pending');
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getInquiries(activeStatus, search);
      const list = Array.isArray(res.data) ? res.data : (res.data as any)?.data || [];
      setInquiries(list);
    } catch {
      // Handled
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [activeStatus]);

  const handleOpenDetail = (inquiry: InquiryItem) => {
    setSelectedInquiry(inquiry);
    setUpdatingStatus(inquiry.status);
    setAdminNotes(inquiry.admin_notes || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedInquiry) return;
    setIsSaving(true);
    try {
      await adminApi.updateInquiryStatus(selectedInquiry.id, updatingStatus, adminNotes);
      setInquiries((prev) =>
        prev.map((i) =>
          i.id === selectedInquiry.id
            ? { ...i, status: updatingStatus as any, admin_notes: adminNotes }
            : i
        )
      );
      setFeedback('Inquiry status updated successfully.');
      setTimeout(() => setFeedback(null), 3000);
      setSelectedInquiry(null);
    } catch (err: any) {
      alert(err.message || 'Failed to update inquiry status.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to permanently delete this inquiry record?')) return;
    try {
      await adminApi.deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete inquiry.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Pending
          </span>
        );
      case 'in_review':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
            In Review
          </span>
        );
      case 'contacted':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Contacted
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-700 text-slate-300">
            Closed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Client Inquiries & Consultation Leads
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track, prioritize, and respond to incoming corporate briefs and PR requests.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#111420] border border-[#212738] flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['all', 'pending', 'in_review', 'contacted', 'closed'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setActiveStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeStatus === st
                  ? 'bg-[#7c3aed] text-white shadow-sm'
                  : 'bg-[#131622] text-slate-400 hover:text-white border border-[#212738]'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchInquiries();
          }}
          className="relative w-full sm:w-72"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name or email..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white text-xs focus:outline-none focus:border-[#7c3aed] placeholder:text-slate-500"
          />
        </form>
      </div>

      {/* Inquiries Table */}
      <div className="rounded-xl bg-[#111420] border border-[#212738] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0c0e17] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#212738]">
              <tr>
                <th className="px-5 py-3">Lead / Organization</th>
                <th className="px-5 py-3">Service Interest</th>
                <th className="px-5 py-3">Budget</th>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                    {isLoading ? 'Loading inquiries...' : 'No inquiries found matching criteria.'}
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-white">{inquiry.name}</div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-2 mt-0.5">
                        <span>{inquiry.email}</span>
                        {inquiry.phone && <span>• {inquiry.phone}</span>}
                      </div>
                      {inquiry.organization && (
                        <div className="text-slate-400 text-[10px] mt-0.5 flex items-center gap-1">
                          <Building className="w-3 h-3 text-[#7c3aed]" />
                          <span>{inquiry.organization}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 font-medium">
                      {inquiry.service_interest || 'General Inquiry'}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {inquiry.budget_range || 'Flexible'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {inquiry.source}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">{getStatusBadge(inquiry.status)}</td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(inquiry)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-[#A302FF] text-slate-300 hover:text-white font-medium transition-colors"
                      >
                        Inspect
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(inquiry.id)}
                        className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Lead Details & Status</h3>
                <span className="text-xs text-slate-400 font-mono">ID: #{selectedInquiry.id}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Name:</span>
                  <span className="font-semibold text-white">{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Organization:</span>
                  <span className="font-semibold text-white">{selectedInquiry.organization || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-[#B833FF] hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone:</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-emerald-400 hover:underline">
                    {selectedInquiry.phone || 'N/A'}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">Message Content:</span>
                <div className="p-3 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 leading-relaxed font-normal whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Updater */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-300">Update Lead Status:</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['pending', 'in_review', 'contacted', 'closed'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setUpdatingStatus(st)}
                      className={`py-2 px-2 rounded-xl text-center font-semibold uppercase text-[10px] tracking-wider transition-all ${
                        updatingStatus === st
                          ? 'bg-[#A302FF] text-white shadow-md'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Staff Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Internal Advisory Notes:</label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record callback summary, proposal date, or next action steps..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveStatus}
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-[#A302FF] hover:bg-[#8D02DE] text-white font-semibold text-xs transition-all shadow-md shadow-[#A302FF]/30 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? 'Saving Changes...' : 'Save Lead Updates'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

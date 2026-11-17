import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminApi, DashboardStats, InquiryItem } from '../../services/adminApi';
import {
  Inbox,
  Users,
  Briefcase,
  FolderKanban,
  FileText,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Mail,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, isSuperAdmin, hasAnyRole } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<InquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getDashboardStats();
      if (res.stats) {
        setStats(res.stats);
        setRecentInquiries(res.recent_inquiries || []);
      }
    } catch {
      // Fallback already handled
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Pending Review
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
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Executive Command Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Welcome back, <strong className="text-white">{user?.name}</strong>. Here is the operational overview of Berlo Communications.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchStats}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Inquiries */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3 relative overflow-hidden group hover:border-[#A302FF]/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Client Inquiries</span>
            <div className="p-2 rounded-xl bg-[#A302FF]/10 text-[#B833FF]">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {stats?.inquiries.total ?? 14}
            </span>
            <span className="text-xs text-amber-400 font-medium">
              ({stats?.inquiries.pending ?? 4} pending)
            </span>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs text-[#B833FF] hover:underline flex items-center gap-1 font-medium pt-1"
          >
            <span>Review Leads</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Newsletter Subscribers */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">PR Briefing Readers</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {stats?.subscribers.total ?? 1840}
            </span>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12% this mo.
            </span>
          </div>
          <span className="text-xs text-slate-500 block pt-1">
            Active verified corporate subscribers
          </span>
        </div>

        {/* Core Services */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Strategic Services</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {stats?.content.services ?? 9}
            </span>
            <span className="text-xs text-slate-400">Active Capabilities</span>
          </div>
          <Link
            to="/admin/services"
            className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-medium pt-1"
          >
            <span>Manage Catalog</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Articles & Case Studies */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Publications & Work</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {(stats?.content.projects ?? 12) + (stats?.content.articles ?? 8)}
            </span>
            <span className="text-xs text-slate-400">Total Items</span>
          </div>
          <Link
            to="/admin/projects"
            className="text-xs text-purple-400 hover:underline flex items-center gap-1 font-medium pt-1"
          >
            <span>Manage Portfolio</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Quick Action Matrix based on RBAC */}
      <div className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Sparkles className="w-4 h-4 text-[#A302FF]" />
          <span>Quick Administrative Actions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {hasAnyRole(['superadmin', 'admin', 'moderator']) && (
            <Link
              to="/admin/inquiries"
              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800/80 hover:border-[#A302FF]/40 text-left transition-all group"
            >
              <Inbox className="w-5 h-5 text-[#B833FF] mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Review Inquiries</div>
              <div className="text-[11px] text-slate-400">Process client consultation leads</div>
            </Link>
          )}

          {hasAnyRole(['superadmin', 'admin', 'content_writer']) && (
            <Link
              to="/admin/insights"
              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/40 text-left transition-all group"
            >
              <FileText className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Write Publication</div>
              <div className="text-[11px] text-slate-400">Author PR thought-leadership post</div>
            </Link>
          )}

          {hasAnyRole(['superadmin', 'admin', 'content_writer']) && (
            <Link
              to="/admin/gallery"
              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800/80 hover:border-blue-500/40 text-left transition-all group"
            >
              <FolderKanban className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Update Gallery</div>
              <div className="text-[11px] text-slate-400">Upload event photos and TVCs</div>
            </Link>
          )}

          {isSuperAdmin && (
            <Link
              to="/admin/users"
              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800/80 hover:border-purple-500/40 text-left transition-all group"
            >
              <Users className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Manage Roles & Staff</div>
              <div className="text-[11px] text-slate-400">Assign RBAC permissions</div>
            </Link>
          )}
        </div>
      </div>

      {/* Recent Client Inquiries Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800/90 overflow-hidden space-y-4">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Client Inquiries</h2>
            <p className="text-xs text-slate-400">Direct lead submissions received from public forms and chatbot.</p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs font-semibold text-[#B833FF] hover:underline flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Client / Contact</th>
                <th className="px-5 py-3">Service Interest</th>
                <th className="px-5 py-3">Budget Range</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Received</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500">
                    No recent inquiries found.
                  </td>
                </tr>
              ) : (
                recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-white">{inquiry.name}</div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-2 mt-0.5">
                        <span>{inquiry.email}</span>
                        {inquiry.organization && (
                          <span className="text-slate-500">• {inquiry.organization}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 font-medium">
                      {inquiry.service_interest || 'General Consultation'}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {inquiry.budget_range || 'Not specified'}
                    </td>
                    <td className="px-5 py-3.5">{getStatusBadge(inquiry.status)}</td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        to="/admin/inquiries"
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-[#A302FF] text-slate-300 hover:text-white font-medium transition-colors"
                      >
                        Open Lead
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

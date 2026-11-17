import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminApi, DashboardStats, InquiryItem } from '../../services/adminApi';
import {
  Inbox,
  Briefcase,
  FileText,
  Mail,
  Download,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<InquiryItem[]>([]);
  const [, setIsLoading] = useState(true);
  const [activeTimeRange, setActiveTimeRange] = useState('30d');
  const [chartTab, setChartTab] = useState<'leads' | 'engagement' | 'reach'>('leads');

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getDashboardStats();
      if (res.stats) {
        setStats(res.stats);
        setRecentInquiries(res.recent_inquiries || []);
      }
    } catch {
      // Fallback already handled in service
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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Pending Review
          </span>
        );
      case 'in_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            In Review
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Contacted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-700/50 text-slate-300 border border-slate-600/40">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Closed
          </span>
        );
    }
  };

  // Monthly dummy data for chart based on selected tab
  const chartData = {
    leads: [
      { month: 'Jul', value: 34, height: '45%' },
      { month: 'Aug', value: 42, height: '55%' },
      { month: 'Sep', value: 58, height: '70%' },
      { month: 'Oct', value: 72, height: '82%' },
      { month: 'Nov', value: 65, height: '75%' },
      { month: 'Dec', value: 89, height: '95%' },
      { month: 'Jan', value: 94, height: '100%' },
    ],
    engagement: [
      { month: 'Jul', value: 120, height: '50%' },
      { month: 'Aug', value: 145, height: '62%' },
      { month: 'Sep', value: 190, height: '78%' },
      { month: 'Oct', value: 210, height: '85%' },
      { month: 'Nov', value: 195, height: '80%' },
      { month: 'Dec', value: 240, height: '92%' },
      { month: 'Jan', value: 285, height: '100%' },
    ],
    reach: [
      { month: 'Jul', value: 4200, height: '40%' },
      { month: 'Aug', value: 5800, height: '55%' },
      { month: 'Sep', value: 7200, height: '68%' },
      { month: 'Oct', value: 8900, height: '80%' },
      { month: 'Nov', value: 9400, height: '84%' },
      { month: 'Dec', value: 11200, height: '92%' },
      { month: 'Jan', value: 12800, height: '100%' },
    ],
  }[chartTab];

  return (
    <div className="space-y-6 pb-12">
      {/* Flux Top Welcome & Action Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-[#1b2030]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Welcome back, {user?.name || 'Administrator'} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Here's what's happening across Berlo Communications strategic platform today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Time Filter Pills (Flux style) */}
          <div className="flex items-center bg-[#131622] p-1 rounded-xl border border-[#212738] text-xs">
            {['24h', '7d', '30d', '90d', 'All'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setActiveTimeRange(range)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTimeRange === range
                    ? 'bg-[#7c3aed] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export Report */}
          <button
            type="button"
            onClick={fetchStats}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131622] hover:bg-[#1a1f30] text-slate-300 border border-[#212738] text-xs font-medium transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export</span>
          </button>

          {/* New Content Primary Button */}
          <Link
            to="/admin/insights"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#6d28d9] hover:to-[#4f46e5] text-white text-xs font-semibold shadow-md shadow-[#7c3aed]/25 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Content</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Metric Cards with Sparklines (Flux style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="p-5 rounded-xl bg-[#111420] border border-[#212738] hover:border-[#7c3aed]/50 transition-all space-y-3 relative group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium text-slate-400">Client Inquiries</span>
            <div className="p-2 rounded-lg bg-[#7c3aed]/10 text-[#a855f7]">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-white tracking-tight">
              {stats?.inquiries.total ?? 14}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +18.4%
              </span>
              <span className="text-slate-500 font-light">vs last period</span>
            </div>
          </div>
          {/* Subtle Sparkline SVG */}
          <div className="pt-2">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 24" fill="none">
              <path
                d="M 0 20 Q 20 18, 35 12 T 65 14 T 100 4"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 0 20 Q 20 18, 35 12 T 65 14 T 100 4 L 100 24 L 0 24 Z"
                fill="url(#purpleGrad)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* PR Briefing Readers */}
        <div className="p-5 rounded-xl bg-[#111420] border border-[#212738] hover:border-blue-500/50 transition-all space-y-3 relative group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium text-slate-400">PR Briefing Readers</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-white tracking-tight">
              {stats?.subscribers.total ? Number(stats.subscribers.total).toLocaleString() : '1,840'}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +12.3%
              </span>
              <span className="text-slate-500 font-light">vs last period</span>
            </div>
          </div>
          {/* Subtle Sparkline SVG */}
          <div className="pt-2">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 24" fill="none">
              <path
                d="M 0 22 Q 25 15, 45 16 T 75 8 T 100 3"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 0 22 Q 25 15, 45 16 T 75 8 T 100 3 L 100 24 L 0 24 Z"
                fill="url(#blueGrad)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Active Core Services */}
        <div className="p-5 rounded-xl bg-[#111420] border border-[#212738] hover:border-emerald-500/50 transition-all space-y-3 relative group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium text-slate-400">Active Services</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-white tracking-tight">
              {stats?.content?.services ?? 9}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +8.1%
              </span>
              <span className="text-slate-500 font-light">9 core capabilities</span>
            </div>
          </div>
          {/* Subtle Sparkline SVG */}
          <div className="pt-2">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 24" fill="none">
              <path
                d="M 0 18 Q 30 18, 50 10 T 80 12 T 100 5"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 0 18 Q 30 18, 50 10 T 80 12 T 100 5 L 100 24 L 0 24 Z"
                fill="url(#greenGrad)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Published Articles & Media */}
        <div className="p-5 rounded-xl bg-[#111420] border border-[#212738] hover:border-amber-500/50 transition-all space-y-3 relative group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium text-slate-400">Insights & Media</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-white tracking-tight">
              {stats?.content?.articles ?? 48}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +24.5%
              </span>
              <span className="text-slate-500 font-light">published briefs</span>
            </div>
          </div>
          {/* Subtle Sparkline SVG */}
          <div className="pt-2">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 24" fill="none">
              <path
                d="M 0 20 Q 30 12, 55 15 T 85 8 T 100 2"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 0 20 Q 30 12, 55 15 T 85 8 T 100 2 L 100 24 L 0 24 Z"
                fill="url(#amberGrad)"
                opacity="0.15"
              />
              <defs>
                <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Growth Analytics Area Chart + Campaign Sprint (Flux style) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Revenue Growth / Performance Chart (7 cols) */}
        <div className="xl:col-span-7 rounded-xl border border-[#212738] bg-[#111420] p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-white/[0.06]">
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">
                Client Acquisition & Reach Growth
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Monthly strategic performance and lead conversions
              </p>
            </div>
            {/* Chart Metric Tabs */}
            <div className="flex items-center gap-1 bg-[#131622] p-1 rounded-lg border border-[#212738] text-xs">
              <button
                type="button"
                onClick={() => setChartTab('leads')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  chartTab === 'leads' ? 'bg-[#7c3aed] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Inquiries
              </button>
              <button
                type="button"
                onClick={() => setChartTab('engagement')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  chartTab === 'engagement' ? 'bg-[#7c3aed] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Engagement
              </button>
              <button
                type="button"
                onClick={() => setChartTab('reach')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  chartTab === 'reach' ? 'bg-[#7c3aed] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Reach
              </button>
            </div>
          </div>

          {/* Bar / Column Chart Representation (Flux style) */}
          <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 px-2">
            {chartData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                {/* Tooltip on hover */}
                <div className="text-[10px] text-white font-mono bg-[#1b2030] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.value}
                </div>
                {/* Bar */}
                <div className="w-full max-w-[42px] bg-slate-800/80 rounded-t-lg relative overflow-hidden flex items-end group-hover:bg-slate-700/80 transition-colors">
                  <div
                    style={{ height: item.height }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-[#7c3aed] to-[#6366f1] group-hover:from-[#8b5cf6] group-hover:to-[#818cf8] transition-all"
                  />
                </div>
                {/* Month Label */}
                <span className="text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.06]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed]" />
                Primary Deliverables
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" />
                Media Retainers
              </span>
            </div>
            <span className="text-emerald-400 font-semibold">+28% YoY Growth</span>
          </div>
        </div>

        {/* Right: Campaign Sprint 24 & Priorities (5 cols) (Flux style) */}
        <div className="xl:col-span-5 rounded-xl border border-[#212738] bg-[#111420] p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-semibold text-white tracking-tight">Campaign Sprint 24</h3>
                <p className="text-xs text-slate-400 mt-0.5">5 days remaining in cycle</p>
              </div>
              <Link
                to="/admin/projects"
                className="text-xs text-[#a855f7] hover:underline font-medium"
              >
                View Board
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Sprint Completion</span>
                <span className="text-white font-mono font-bold">72%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#1b2030] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] rounded-full w-[72%]" />
              </div>
            </div>

            {/* Priority Status Badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="text-base font-bold text-emerald-400">14</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Completed</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="text-base font-bold text-blue-400">5</div>
                <div className="text-[10px] text-slate-400 mt-0.5">In Progress</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="text-base font-bold text-amber-400">2</div>
                <div className="text-[10px] text-slate-400 mt-0.5">To Do</div>
              </div>
            </div>
          </div>

          {/* Quick Deliverable Items */}
          <div className="space-y-2.5 pt-2">
            <div className="p-2.5 rounded-lg bg-[#131622] border border-[#212738] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white font-medium">Fintech PR Whitepaper Q4</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Published</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#131622] border border-[#212738] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-white font-medium">Crisis Protocol Playbook</span>
              </div>
              <span className="text-[10px] text-blue-400 font-mono">In Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Recent Inquiries Table + Live Activity Timeline */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Recent Inquiries Table (7 cols) (Flux style) */}
        <div className="xl:col-span-7 rounded-xl border border-[#212738] bg-[#111420] p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                Recent Inquiries & Leads
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Direct client briefs and advisory contact forms
              </p>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs text-[#a855f7] hover:underline font-medium flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#212738] text-slate-400 text-[11px] font-semibold">
                  <th className="pb-3 pl-2">CLIENT</th>
                  <th className="pb-3">SERVICE REQUESTED</th>
                  <th className="pb-3">STATUS</th>
                  <th className="pb-3 text-right pr-2">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      No recent inquiries received.
                    </td>
                  </tr>
                ) : (
                  recentInquiries.slice(0, 5).map((inq) => (
                    <tr
                      key={inq.id}
                      className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    >
                      <td className="py-3 pl-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#1b2030] text-[#a855f7] border border-white/[0.08] flex items-center justify-center font-bold text-[11px]">
                            {inq.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-white group-hover:text-[#a855f7] transition-colors">
                              {inq.name}
                            </div>
                            <div className="text-[10px] text-slate-400">{inq.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-slate-300">
                        {inq.service_interest || 'Strategic PR'}
                      </td>
                      <td className="py-3">
                        {getStatusBadge(inq.status)}
                      </td>
                      <td className="py-3 text-right pr-2 text-slate-400 text-[11px] font-mono">
                        {new Date(inq.created_at).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Team Activity & Live Audit Feed (5 cols) (Flux style) */}
        <div className="xl:col-span-5 rounded-xl border border-[#212738] bg-[#111420] p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                Team Activity & Audit
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Latest actions across all roles</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Stream
            </span>
          </div>

          <div className="space-y-4 pt-1">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#7c3aed]/20 text-[#a855f7] border border-[#7c3aed]/30 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                SA
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="text-xs text-slate-200">
                  <strong className="text-white">Superadmin</strong> updated security rate-limit rule to 5 req/min.
                </p>
                <span className="text-[10px] text-slate-500">4 minutes ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                AD
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="text-xs text-slate-200">
                  <strong className="text-white">Administrator</strong> reviewed inquiry from Standard Chartered.
                </p>
                <span className="text-[10px] text-slate-500">18 minutes ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                MD
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="text-xs text-slate-200">
                  <strong className="text-white">Moderator</strong> published 3 photos to Bangladesh PR Summit gallery.
                </p>
                <span className="text-[10px] text-slate-500">1 hour ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                CW
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="text-xs text-slate-200">
                  <strong className="text-white">Content Writer</strong> saved draft: "AI in Crisis Communications 2026".
                </p>
                <span className="text-[10px] text-slate-500">3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
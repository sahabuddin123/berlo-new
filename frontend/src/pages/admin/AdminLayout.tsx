import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  FolderKanban,
  FileText,
  Images,
  Users2,
  Settings,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  Edit3,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout, isSuperAdmin, hasAnyRole } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not authenticated and not loading, redirect to /admin/login
  if (!isLoading && !isAuthenticated) {
    navigate('/admin/login', { replace: true, state: { from: location } });
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#A302FF] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-slate-400">Verifying Administrative Clearance...</span>
        </div>
      </div>
    );
  }

  // Navigation Items with RBAC Gatekeeping
  const navSections = [
    {
      label: 'Core Overview',
      items: [
        {
          name: 'Dashboard',
          path: '/admin/dashboard',
          icon: LayoutDashboard,
          allowed: true, // Everyone
        },
        {
          name: 'Inquiries & Leads',
          path: '/admin/inquiries',
          icon: Inbox,
          allowed: hasAnyRole(['superadmin', 'admin', 'moderator']),
          badge: 'Live',
        },
      ],
    },
    {
      label: 'Content Management',
      items: [
        {
          name: 'Services (9 Core)',
          path: '/admin/services',
          icon: Briefcase,
          allowed: hasAnyRole(['superadmin', 'admin', 'content_writer']),
        },
        {
          name: 'Case Studies',
          path: '/admin/projects',
          icon: FolderKanban,
          allowed: hasAnyRole(['superadmin', 'admin', 'content_writer']),
        },
        {
          name: 'Articles & Insights',
          path: '/admin/insights',
          icon: FileText,
          allowed: hasAnyRole(['superadmin', 'admin', 'moderator', 'content_writer']),
        },
        {
          name: 'Photo & Video Gallery',
          path: '/admin/gallery',
          icon: Images,
          allowed: hasAnyRole(['superadmin', 'admin', 'moderator', 'content_writer']),
        },
        {
          name: 'Team & Leadership',
          path: '/admin/team',
          icon: Users2,
          allowed: hasAnyRole(['superadmin', 'admin']),
        },
      ],
    },
    {
      label: 'System & Security',
      items: [
        {
          name: 'Users & RBAC Roles',
          path: '/admin/users',
          icon: ShieldCheck,
          allowed: isSuperAdmin, // Superadmin strictly
          badge: 'Superadmin',
        },
        {
          name: 'Site Settings',
          path: '/admin/settings',
          icon: Settings,
          allowed: hasAnyRole(['superadmin', 'admin']),
        },
      ],
    },
  ];

  const getRoleBadge = () => {
    if (isSuperAdmin) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#A302FF]/20 text-[#B833FF] border border-[#A302FF]/30">
          <ShieldAlert className="w-3 h-3" />
          Superadmin
        </span>
      );
    }
    if (user?.roles.includes('admin')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
          <ShieldCheck className="w-3 h-3" />
          Administrator
        </span>
      );
    }
    if (user?.roles.includes('moderator')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <UserCheck className="w-3 h-3" />
          Moderator
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
        <Edit3 className="w-3 h-3" />
        Content Writer
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 h-16 bg-slate-900/95 border-b border-slate-800/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <img src="/brand/logo.png" alt="Berlo Logo" className="h-8 w-auto object-contain" />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight">Berlo Management Console</span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">RBAC Security v1.0</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/en"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>View Public Site</span>
          </Link>

          {/* User Meta & Role */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-semibold text-slate-200">{user?.name}</span>
              {getRoleBadge()}
            </div>

            <button
              type="button"
              onClick={logout}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-16 left-0 z-30 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 flex-1 overflow-y-auto space-y-6">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3">
                  {section.label}
                </div>
                {section.items
                  .filter((item) => item.allowed)
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-[#A302FF] text-white font-semibold shadow-md shadow-[#A302FF]/20'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                          }`
                        }
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/15 text-white font-mono">
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>Security Protocol</span>
              <span className="text-[#22C55E] font-mono">ENFORCED</span>
            </div>
            <span>Rate-Limiting: Active (5 attempts/min)</span>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#07090E]">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

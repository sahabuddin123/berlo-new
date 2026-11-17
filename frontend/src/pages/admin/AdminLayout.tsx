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
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  BarChart3,
  Command,
  HardDrive,
  Compass,
  Layers,
  Handshake,
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: any;
  allowed: boolean;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout, isSuperAdmin, hasAnyRole } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // If not authenticated and not loading, redirect to /admin/login
  if (!isLoading && !isAuthenticated) {
    navigate('/admin/login', { replace: true, state: { from: location } });
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090b10] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-medium text-slate-400">Loading Flux Console...</span>
        </div>
      </div>
    );
  }

  // Navigation Items matching Flux Dashboard structure with RBAC Gatekeeping
  const navSections: NavSection[] = [
    {
      group: 'OVERVIEW',
      items: [
        {
          name: 'Dashboard',
          path: '/admin/dashboard',
          icon: LayoutDashboard,
          allowed: true,
        },
        {
          name: 'Analytics',
          path: '/admin/dashboard#analytics',
          icon: BarChart3,
          allowed: true,
          badge: 'Pro',
        },
      ],
    },
    {
      group: 'INQUIRIES & LEADS',
      items: [
        {
          name: 'Client Inquiries',
          path: '/admin/inquiries',
          icon: Inbox,
          allowed: hasAnyRole(['superadmin', 'admin', 'moderator']),
          badge: '14',
          badgeColor: 'bg-[#7c3aed]/20 text-[#a855f7]',
        },
      ],
    },
    {
      group: 'CONTENT MANAGEMENT',
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
          name: 'Media Library',
          path: '/admin/media',
          icon: HardDrive,
          allowed: hasAnyRole(['superadmin', 'admin', 'moderator', 'content_writer']),
          badge: 'Assets',
          badgeColor: 'bg-emerald-500/15 text-emerald-400',
        },
        {
          name: 'Page Sections',
          path: '/admin/pages',
          icon: Layers,
          allowed: hasAnyRole(['superadmin', 'admin', 'content_writer']),
        },
        {
          name: 'Menu Builder',
          path: '/admin/menus',
          icon: Compass,
          allowed: hasAnyRole(['superadmin', 'admin']),
        },
        {
          name: 'Team & Leadership',
          path: '/admin/team',
          icon: Users2,
          allowed: hasAnyRole(['superadmin', 'admin']),
        },
        {
          name: 'Clients & Partners',
          path: '/admin/clients',
          icon: Handshake,
          allowed: hasAnyRole(['superadmin', 'admin', 'content_writer']),
        },
      ],
    },
    {
      group: 'MANAGEMENT & SECURITY',
      items: [
        {
          name: 'Users & Roles',
          path: '/admin/users',
          icon: ShieldCheck,
          allowed: isSuperAdmin,
          badge: 'Superadmin',
          badgeColor: 'bg-rose-500/20 text-rose-400',
        },
        {
          name: 'Settings',
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
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#7c3aed]/15 text-[#a855f7] border border-[#7c3aed]/30">
          <ShieldAlert className="w-3 h-3" />
          Superadmin
        </span>
      );
    }
    if (user?.roles.includes('admin')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30">
          <ShieldCheck className="w-3 h-3" />
          Admin
        </span>
      );
    }
    if (user?.roles.includes('moderator')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <UserCheck className="w-3 h-3" />
          Moderator
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30">
        <Edit3 className="w-3 h-3" />
        Content Writer
      </span>
    );
  };

  const getInitials = (name?: string) => {
    if (!name) return 'BA';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // Determine current breadcrumb text
  const currentPath = location.pathname;
  let sectionTitle = 'Overview';
  let pageTitle = 'Dashboard';
  if (currentPath.includes('/admin/inquiries')) {
    sectionTitle = 'Inquiries';
    pageTitle = 'Client Inquiries';
  } else if (currentPath.includes('/admin/services')) {
    sectionTitle = 'Content';
    pageTitle = 'Services';
  } else if (currentPath.includes('/admin/projects')) {
    sectionTitle = 'Content';
    pageTitle = 'Case Studies';
  } else if (currentPath.includes('/admin/insights')) {
    sectionTitle = 'Content';
    pageTitle = 'Insights & Articles';
  } else if (currentPath.includes('/admin/gallery')) {
    sectionTitle = 'Content';
    pageTitle = 'Media & Gallery';
  } else if (currentPath.includes('/admin/team')) {
    sectionTitle = 'Content';
    pageTitle = 'Team & Leadership';
  } else if (currentPath.includes('/admin/users')) {
    sectionTitle = 'Security';
    pageTitle = 'Users & RBAC Roles';
  } else if (currentPath.includes('/admin/settings')) {
    sectionTitle = 'System';
    pageTitle = 'Settings';
  }

  return (
    <div className="min-h-screen bg-[#0a0b12] text-slate-100 flex flex-col antialiased selection:bg-[#7c3aed]/30 selection:text-white">
      {/* Flux Top Header */}
      <header className="sticky top-0 z-40 h-16 bg-[#0c0e17]/90 border-b border-[#1b2030] backdrop-blur-xl flex items-center justify-between px-4 sm:px-6">
        {/* Left Side: Mobile Menu Button + Breadcrumbs + Search */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Breadcrumbs (Flux style) */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer">Console</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{sectionTitle}</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">{pageTitle}</span>
          </div>

          {/* Quick Search Input with ⌘K badge */}
          <div className="relative flex-1 max-w-xs hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131622] hover:bg-[#161a29] focus:bg-[#161a29] border border-[#212738] focus:border-[#7c3aed] text-white text-xs rounded-lg pl-9 pr-14 py-2 transition-all outline-none placeholder:text-slate-500"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Right Side: Public Site + Notifications + Theme + Role + Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Public Site button */}
          <Link
            to="/en"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>Public Site</span>
          </Link>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7c3aed] rounded-full ring-2 ring-[#0c0e17]" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#111420] border border-[#212738] shadow-2xl p-4 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="font-semibold text-white">Notifications</span>
                  <span className="text-[10px] text-[#a855f7] bg-[#7c3aed]/15 px-2 py-0.5 rounded-full font-medium">
                    2 New
                  </span>
                </div>
                <div className="space-y-3 pt-3">
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-1">
                    <div className="font-medium text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      New Corporate Inquiry
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Standard Chartered Bank requested Crisis Communications advisory.
                    </p>
                    <span className="text-[10px] text-slate-500">10 minutes ago</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-1">
                    <div className="font-medium text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      Role Security Audit
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Rate limit protection and RBAC middleware active across all API endpoints.
                    </p>
                    <span className="text-[10px] text-slate-500">1 hour ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Active Role Badge */}
          <div className="hidden lg:block">
            {getRoleBadge()}
          </div>

          {/* User Profile Avatar with Details */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-[#1b2030]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#3b82f6] text-white flex items-center justify-center text-xs font-bold shadow-md">
              {getInitials(user?.name)}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-medium text-white tracking-tight leading-none">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-slate-400 font-light mt-0.5">
                {user?.email || 'admin@berlocommunications.com'}
              </span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors ml-1"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Flux Sidebar */}
        <aside
          className={`fixed lg:static inset-y-16 left-0 z-30 w-[260px] bg-[#0c0e17] border-r border-[#1b2030] flex flex-col transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Top Brand & Workspace Selector */}
          <div className="p-4 border-b border-[#1b2030] space-y-3">
            {/* Logo + Brand Name */}
            <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] via-[#6366f1] to-[#3b82f6] flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-[#7c3aed]/25 group-hover:scale-105 transition-transform">
                B
              </div>
              <div>
                <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  BERLO <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.08] text-[#a855f7] border border-white/[0.06]">v2.4</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono tracking-wider">STRATEGIC PR CONSOLE</div>
              </div>
            </Link>

            {/* Workspace Switcher Pill (Flux style) */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#131622] border border-[#212738] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-white leading-none">Berlo Global</span>
                  <span className="text-[10px] text-slate-400">Enterprise Agency</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Navigation Links Grouped */}
          <div className="p-3 flex-1 overflow-y-auto space-y-6">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
                  {section.group}
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
                          `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-[#7c3aed]/15 text-[#a855f7] font-semibold border-l-2 border-[#7c3aed] shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                              item.badgeColor || 'bg-white/[0.08] text-slate-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
              </div>
            ))}
          </div>

          {/* Sidebar Footer User Card (Flux style) */}
          <div className="p-3 border-t border-[#1b2030] bg-[#0c0e17]">
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#131622] border border-[#212738]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#3b82f6] text-white flex items-center justify-center text-xs font-bold">
                    {getInitials(user?.name)}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#131622] rounded-full" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-white truncate">
                    {user?.name || 'Administrator'}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate capitalize">
                    {user?.roles?.[0]?.replace('_', ' ') || 'Superadmin'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#0a0b12]">
          <div className="max-w-[1400px] mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

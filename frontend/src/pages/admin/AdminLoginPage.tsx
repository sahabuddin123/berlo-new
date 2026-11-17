import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import {
  Lock,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('superadmin@berlocommunications.com');
  const [password, setPassword] = useState('Berlo@Admin2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
    navigate(from, { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const setDemoRole = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('Berlo@Admin2026!');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#07090D] to-slate-950 flex flex-col items-center justify-center p-4 antialiased text-white">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#A302FF]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/en" className="inline-block">
            <img src="/brand/logo.png" alt="Berlo Logo" className="h-11 w-auto mx-auto object-contain" />
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Administrative Access
          </h1>
          <p className="text-xs text-slate-400">
            Role-Based Management Portal • Secure Access Protocol
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Administrative Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@berlocommunications.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#A302FF] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <Link
                  to="/admin/forgot-password"
                  className="text-xs font-medium text-[#B833FF] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#A302FF] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#A302FF] hover:bg-[#8D02DE] text-white font-semibold text-sm transition-all shadow-lg shadow-[#A302FF]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate & Enter Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Role Selectors */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block text-center">
              Quick Role Switch (Demo Credentials)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDemoRole('superadmin@berlocommunications.com')}
                className="p-2 rounded-lg bg-slate-950 hover:bg-[#A302FF]/10 border border-slate-800 hover:border-[#A302FF]/40 text-left text-slate-300 transition-colors"
              >
                <div className="font-semibold text-white">Superadmin</div>
                <div className="text-[10px] text-[#B833FF]">Master Root</div>
              </button>
              <button
                type="button"
                onClick={() => setDemoRole('admin@berlocommunications.com')}
                className="p-2 rounded-lg bg-slate-950 hover:bg-blue-500/10 border border-slate-800 hover:border-blue-500/40 text-left text-slate-300 transition-colors"
              >
                <div className="font-semibold text-white">Administrator</div>
                <div className="text-[10px] text-blue-400">Operations</div>
              </button>
              <button
                type="button"
                onClick={() => setDemoRole('moderator@berlocommunications.com')}
                className="p-2 rounded-lg bg-slate-950 hover:bg-emerald-500/10 border border-slate-800 hover:border-emerald-500/40 text-left text-slate-300 transition-colors"
              >
                <div className="font-semibold text-white">Moderator</div>
                <div className="text-[10px] text-emerald-400">Reviews & Leads</div>
              </button>
              <button
                type="button"
                onClick={() => setDemoRole('writer@berlocommunications.com')}
                className="p-2 rounded-lg bg-slate-950 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 text-left text-slate-300 transition-colors"
              >
                <div className="font-semibold text-white">Content Writer</div>
                <div className="text-[10px] text-amber-400">Drafts & Articles</div>
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center text-xs text-slate-500">
          <Link to="/en" className="hover:text-slate-300 transition-colors">
            ← Return to Berlo Communications Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

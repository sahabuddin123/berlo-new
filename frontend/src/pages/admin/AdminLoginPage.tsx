import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import {
  Lock,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  Check,
  Shield,
  ArrowLeft,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('superadmin@berlocommunications.com');
  const [password, setPassword] = useState('Berlo@Admin2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDemoRoles, setShowDemoRoles] = useState(false);

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
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 antialiased overflow-hidden select-none bg-[#11071d]">
      {/* Dynamic Ambient Background Mesh matching Reference Image exactly */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base dark backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#140822] via-[#10061c] to-[#12112b]" />

        {/* Top-Center Vibrant Crimson / Wine Red Aura (shines directly through top of card & avatar) */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[580px] h-[460px] rounded-full bg-gradient-to-b from-[#991b3b]/60 via-[#881337]/45 to-transparent blur-[110px]" />

        {/* Center / Left Deep Purple & Indigo haze */}
        <div className="absolute top-[28%] left-[20%] w-[480px] h-[450px] rounded-full bg-[#581c87]/35 blur-[130px]" />

        {/* Bottom-Right Soothing Twilight Blue / Periwinkle Aura */}
        <div className="absolute bottom-[8%] right-[22%] w-[580px] h-[480px] rounded-full bg-gradient-to-tl from-[#4361ee]/40 via-[#3b82f6]/25 to-transparent blur-[120px]" />

        {/* Bottom-Left subtle Plum accent */}
        <div className="absolute bottom-[5%] left-[25%] w-[420px] h-[380px] rounded-full bg-[#701a75]/30 blur-[130px]" />
      </div>

      <div className="w-full max-w-[370px] relative z-10 flex flex-col items-center">
        {/* Reference Image Exact Card Design */}
        <div className="w-full rounded-[44px] px-8 sm:px-9 pt-11 pb-10 bg-white/[0.07] border border-white/[0.18] shadow-[0_25px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl overflow-hidden relative">
          {/* Subtle top edge highlight */}
          <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Frosted Circular Avatar Icon */}
          <div className="flex justify-center mb-9">
            <div className="w-[104px] h-[104px] rounded-full bg-white/[0.12] border border-white/[0.20] shadow-[inset_0_2px_10px_rgba(255,255,255,0.12)] backdrop-blur-md flex items-end justify-center overflow-hidden">
              <svg
                viewBox="0 0 100 100"
                className="w-[90px] h-[90px] fill-white/40 translate-y-1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="38" r="18" />
                <path d="M50 63 C33 63 19 73 16 88 C25 96 37 100 50 100 C63 100 75 96 84 88 C81 73 67 63 50 63 Z" />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs flex items-start gap-2.5 backdrop-blur-md animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form with Underline-Only Inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative border-b border-white/35 focus-within:border-white transition-colors duration-200 pb-2.5">
              <div className="flex items-center gap-3.5">
                <Mail className="w-4 h-4 text-white/80 shrink-0 stroke-[1.6]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ID"
                  className="w-full bg-transparent text-white placeholder-white/60 text-sm font-light tracking-wide focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative border-b border-white/35 focus-within:border-white transition-colors duration-200 pb-2.5">
              <div className="flex items-center gap-3.5">
                <Lock className="w-4 h-4 text-white/80 shrink-0 stroke-[1.6]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-transparent text-white placeholder-white/60 text-sm font-light tracking-wide focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/40 hover:text-white transition-colors shrink-0 p-1"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2 cursor-pointer group select-none"
              >
                <div
                  className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center transition-all ${
                    rememberMe
                      ? 'bg-black/60 border-white/60 text-white'
                      : 'bg-black/20 border-white/40 text-transparent'
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-white/70 group-hover:text-white font-light text-[12px] tracking-tight">
                  Remember me
                </span>
              </label>

              <Link
                to="/admin/forgot-password"
                className="italic text-white/55 hover:text-white text-[12px] font-light transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Rounded Capsule Gradient Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#1c0d38] via-[#21164e] to-[#2b3c7d] hover:from-[#241147] hover:via-[#2b1d63] hover:to-[#364b9a] text-white font-bold text-xs uppercase tracking-[0.25em] shadow-[0_12px_28px_rgba(15,10,35,0.6)] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center border border-white/10"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>LOGIN</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Demo Credentials & Quick Switch (Non-intrusive drawer) */}
        <div className="w-full mt-4 space-y-2.5">
          <div className="flex items-center justify-between px-2 text-xs">
            <button
              type="button"
              onClick={() => setShowDemoRoles(!showDemoRoles)}
              className="text-white/40 hover:text-white/80 transition-colors flex items-center gap-1.5 text-[11px] font-medium"
            >
              <Shield className="w-3 h-3 text-purple-400" />
              <span>{showDemoRoles ? 'Hide Demo Logins' : 'Quick Demo Logins'}</span>
            </button>
            <Link
              to="/en"
              className="text-white/40 hover:text-white/80 transition-colors flex items-center gap-1 text-[11px]"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Public Site</span>
            </Link>
          </div>

          {showDemoRoles && (
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl animate-in fade-in space-y-2">
              <div className="flex items-center justify-between text-[10px] text-white/50 px-1 font-mono">
                <span>Default Pass:</span>
                <span>Berlo@Admin2026!</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => setDemoRole('superadmin@berlocommunications.com')}
                  className="px-2 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center transition-all cursor-pointer group"
                >
                  <div className="text-[11px] font-semibold text-white/90 group-hover:text-white">Super</div>
                  <div className="text-[9px] text-purple-300 font-light">Root</div>
                </button>
                <button
                  type="button"
                  onClick={() => setDemoRole('admin@berlocommunications.com')}
                  className="px-2 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center transition-all cursor-pointer group"
                >
                  <div className="text-[11px] font-semibold text-white/90 group-hover:text-white">Admin</div>
                  <div className="text-[9px] text-blue-300 font-light">Ops</div>
                </button>
                <button
                  type="button"
                  onClick={() => setDemoRole('moderator@berlocommunications.com')}
                  className="px-2 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center transition-all cursor-pointer group"
                >
                  <div className="text-[11px] font-semibold text-white/90 group-hover:text-white">Mod</div>
                  <div className="text-[9px] text-emerald-300 font-light">Leads</div>
                </button>
                <button
                  type="button"
                  onClick={() => setDemoRole('writer@berlocommunications.com')}
                  className="px-2 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center transition-all cursor-pointer group"
                >
                  <div className="text-[11px] font-semibold text-white/90 group-hover:text-white">Writer</div>
                  <div className="text-[9px] text-amber-300 font-light">Drafts</div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

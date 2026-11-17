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
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 antialiased overflow-hidden select-none bg-[#12081f]">
      {/* Dynamic Ambient Background Mesh matching reference */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep background gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b0b2b] via-[#150a26] to-[#12112e]" />

        {/* Top-center / right vibrant crimson-magenta glow */}
        <div className="absolute top-[8%] left-[45%] -translate-x-1/2 w-[550px] h-[480px] rounded-full bg-gradient-to-br from-[#9f1239]/65 via-[#831843]/50 to-transparent blur-[110px]" />
        
        {/* Left deep purple glow */}
        <div className="absolute top-[20%] -left-16 w-[450px] h-[450px] rounded-full bg-[#581c87]/50 blur-[130px]" />

        {/* Center glowing orb behind card */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#7c3aed]/25 blur-[100px]" />

        {/* Bottom-right cool slate/periwinkle blue ambient field */}
        <div className="absolute bottom-[5%] right-[10%] w-[580px] h-[520px] rounded-full bg-gradient-to-tl from-[#4361ee]/45 via-[#3b82f6]/30 to-transparent blur-[120px]" />
        
        {/* Bottom-left muted plum/rose glow */}
        <div className="absolute -bottom-10 left-[15%] w-[420px] h-[400px] rounded-full bg-[#701a75]/35 blur-[120px]" />
      </div>

      <div className="w-full max-w-[390px] relative z-10 space-y-5">
        {/* Sleek Frosted Glassmorphism Card */}
        <div className="relative rounded-[38px] px-8 sm:px-10 pt-10 pb-9 bg-white/[0.08] border border-white/[0.18] shadow-[0_25px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl overflow-hidden">
          {/* Subtle top edge specular highlight */}
          <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* Frosted Avatar Icon */}
          <div className="flex justify-center mb-10">
            <div className="w-28 h-28 rounded-full bg-white/[0.10] border border-white/[0.18] shadow-[inset_0_2px_12px_rgba(255,255,255,0.15)] backdrop-blur-md flex items-end justify-center overflow-hidden">
              {/* Reference silhouette head and shoulders */}
              <svg
                viewBox="0 0 100 100"
                className="w-24 h-24 fill-white/40 translate-y-1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="38" r="18" />
                <path d="M50 62 C34 62 20 72 17 87 C26 95 37 100 50 100 C63 100 74 95 83 87 C80 72 66 62 50 62 Z" />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-500/15 border border-rose-400/30 text-rose-200 text-xs flex items-start gap-2.5 backdrop-blur-md animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form with Underline-Only Inputs */}
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Email Field */}
            <div className="relative border-b border-white/30 focus-within:border-white transition-colors duration-200 pb-2">
              <div className="flex items-center gap-3.5">
                <Mail className="w-4 h-4 text-white/80 shrink-0 stroke-[1.8]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ID"
                  className="w-full bg-transparent text-white placeholder-white/70 text-sm font-light tracking-wide focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative border-b border-white/30 focus-within:border-white transition-colors duration-200 pb-2">
              <div className="flex items-center gap-3.5">
                <Lock className="w-4 h-4 text-white/80 shrink-0 stroke-[1.8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-transparent text-white placeholder-white/70 text-sm font-light tracking-wide focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/50 hover:text-white transition-colors shrink-0 p-1"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                <span className="text-white/80 group-hover:text-white font-light text-[12px] tracking-tight">
                  Remember me
                </span>
              </label>

              <Link
                to="/admin/forgot-password"
                className="italic text-white/65 hover:text-white text-[12px] font-light transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Rounded Capsule Gradient Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#20092c] via-[#2f1b4a] to-[#304177] hover:from-[#290d38] hover:via-[#39225b] hover:to-[#3b5195] text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_10px_25px_rgba(20,10,40,0.5)] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center border border-white/10"
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

        {/* Demo Roles & Public Site Navigation */}
        <div className="space-y-3 pt-1">
          {/* Discreet Quick Role Switcher */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-white/50 flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-[#A302FF]" /> Demo Roles Switch
              </span>
              <span className="text-[10px] text-white/40 font-mono">Berlo@Admin2026!</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => setDemoRole('superadmin@berlocommunications.com')}
                className="px-2 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center transition-all cursor-pointer group"
                title="Superadmin"
              >
                <div className="text-[11px] font-semibold text-white/90 group-hover:text-white">Super</div>
                <div className="text-[9px] text-purple-300 font-light">Root</div>
              </button>
              <button
                type="button"
                onClick={() => setDemoRole('admin@berlocommunications.com')}
                className="px-2 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center transition-all cursor-pointer group"
                title="Administrator"
              >
                <div className="text-[11px] font-semibold text-white/90 group-hover:text-white">Admin</div>
                <div className="text-[9px] text-blue-300 font-light">Ops</div>
              </button>
              <button
                type="button"
                onClick={() => setDemoRole('moderator@berlocommunications.com')}
                className="px-2 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center transition-all cursor-pointer group"
                title="Moderator"
              >
                <div className="text-[11px] font-semibold text-white/90 group-hover:text-white">Mod</div>
                <div className="text-[9px] text-emerald-300 font-light">Leads</div>
              </button>
              <button
                type="button"
                onClick={() => setDemoRole('writer@berlocommunications.com')}
                className="px-2 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center transition-all cursor-pointer group"
                title="Content Writer"
              >
                <div className="text-[11px] font-semibold text-white/90 group-hover:text-white">Writer</div>
                <div className="text-[9px] text-amber-300 font-light">Drafts</div>
              </button>
            </div>
          </div>

          {/* Return to website */}
          <div className="text-center text-xs text-white/40">
            <Link to="/en" className="hover:text-white/70 transition-colors tracking-wide font-light">
              ← Return to Berlo Communications Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

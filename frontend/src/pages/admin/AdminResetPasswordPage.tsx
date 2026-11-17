import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import { Lock, Mail, KeyRound, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const qEmail = searchParams.get('email');
    const qToken = searchParams.get('token');
    if (qEmail) setEmail(qEmail);
    if (qToken) setToken(qToken);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      await adminApi.resetPassword({
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/login');
      }, 2200);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please verify the reset token.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 antialiased overflow-hidden select-none bg-[#11071d] text-white">
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#140822] via-[#10061c] to-[#12112b]" />
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[580px] h-[460px] rounded-full bg-gradient-to-b from-[#991b3b]/60 via-[#881337]/45 to-transparent blur-[110px]" />
        <div className="absolute bottom-[8%] right-[22%] w-[580px] h-[480px] rounded-full bg-gradient-to-tl from-[#4361ee]/40 via-[#3b82f6]/25 to-transparent blur-[120px]" />
      </div>

      <div className="w-full max-w-[390px] relative z-10 space-y-4">
        {/* Sleek Frosted Card */}
        <div className="w-full rounded-[44px] px-8 sm:px-9 pt-10 pb-9 bg-white/[0.07] border border-white/[0.18] shadow-[0_25px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl overflow-hidden relative">
          <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Frosted Shield/Lock Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-[88px] h-[88px] rounded-full bg-white/[0.12] border border-white/[0.20] shadow-[inset_0_2px_10px_rgba(255,255,255,0.12)] backdrop-blur-md flex items-center justify-center">
              <Lock className="w-9 h-9 text-white/80" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-lg font-bold text-white tracking-wide">Set New Password</h1>
            <p className="text-xs text-white/60 mt-1 font-light">
              Enter your recovery token and new password
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs flex items-start gap-2.5 backdrop-blur-md">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="p-6 rounded-3xl bg-emerald-500/15 border border-emerald-400/30 text-center space-y-3 backdrop-blur-md animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-white">Password Reset Successful!</h3>
              <p className="text-xs text-emerald-200/80">
                Credentials updated. Redirecting to login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative border-b border-white/35 focus-within:border-white transition-colors duration-200 pb-2">
                <div className="flex items-center gap-3.5">
                  <Mail className="w-4 h-4 text-white/80 shrink-0 stroke-[1.6]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Staff Email ID"
                    className="w-full bg-transparent text-white placeholder-white/60 text-sm font-light tracking-wide focus:outline-none"
                  />
                </div>
              </div>

              <div className="relative border-b border-white/35 focus-within:border-white transition-colors duration-200 pb-2">
                <div className="flex items-center gap-3.5">
                  <KeyRound className="w-4 h-4 text-white/80 shrink-0 stroke-[1.6]" />
                  <input
                    type="text"
                    required
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Security Token"
                    className="w-full bg-transparent text-white placeholder-white/60 text-sm font-light tracking-wide focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="relative border-b border-white/35 focus-within:border-white transition-colors duration-200 pb-2">
                <div className="flex items-center gap-3.5">
                  <Lock className="w-4 h-4 text-white/80 shrink-0 stroke-[1.6]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full bg-transparent text-white placeholder-white/60 text-sm font-light tracking-wide focus:outline-none"
                  />
                </div>
              </div>

              <div className="relative border-b border-white/35 focus-within:border-white transition-colors duration-200 pb-2">
                <div className="flex items-center gap-3.5">
                  <Lock className="w-4 h-4 text-white/80 shrink-0 stroke-[1.6]" />
                  <input
                    type="password"
                    required
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirm New Password"
                    className="w-full bg-transparent text-white placeholder-white/60 text-sm font-light tracking-wide focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#1c0d38] via-[#21164e] to-[#2b3c7d] hover:from-[#241147] hover:via-[#2b1d63] hover:to-[#364b9a] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-[0_12px_28px_rgba(15,10,35,0.6)] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center border border-white/10"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Update Password</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/admin/login"
            className="text-xs text-white/50 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

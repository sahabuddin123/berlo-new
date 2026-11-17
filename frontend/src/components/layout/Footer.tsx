import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { BRAND } from '../../config/brand';
import { footerNavigation } from '../../config/navigation';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, formatRoute, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-[#000000] text-slate-300 border-t-2 border-[#A302FF] dark:border-[#B833FF]">
      {/* Upper Footer: Main Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Column 1: Agency Brand & Verified Contact */}
          <div className="lg:col-span-2 space-y-6">
            <Link to={formatRoute('')} className="inline-block">
              <img
                src="/brand/logo.png"
                alt="Berlo Communications"
                className="h-11 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {BRAND.tagline[lang]}
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#A302FF] shrink-0 mt-0.5" />
                <span>{BRAND.contact.address[lang]}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#11813C] shrink-0" />
                <div className="flex flex-wrap gap-x-3">
                  {BRAND.contact.phones.map((p) => (
                    <a key={p} href={`tel:${p}`} className="hover:text-white transition-colors">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#00A896] shrink-0" />
                <div className="flex flex-wrap gap-x-3">
                  {BRAND.contact.emails.map((m) => (
                    <a key={m} href={`mailto:${m}`} className="hover:text-white transition-colors">
                      {m}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Agency & Leadership */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === 'bn' ? 'সংস্থা পরিচিতি' : 'Agency Profile'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footerNavigation.agency.map((item) => (
                <li key={item.path}>
                  <Link
                    to={formatRoute(item.path)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Strategic Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {lang === 'bn' ? 'কৌশলগত সেবাসমূহ' : 'Strategic Capabilities'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footerNavigation.services.map((item) => (
                <li key={item.path}>
                  <Link
                    to={formatRoute(item.path)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Executive Briefing */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('common.newsletterTitle')}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('common.newsletterDesc')}
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#11813C]/20 border border-[#11813C]/40 text-xs text-[#22C55E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{t('common.subscribeSuccess')}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t('common.newsletterPlaceholder')}
                    className="w-full px-3.5 py-2.5 rounded-none bg-slate-800 dark:bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#A302FF] pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-[#A302FF] hover:bg-[#8B00DC] text-white transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Lower Footer: Copyright & Legal */}
      <div className="border-t border-slate-800/80 bg-[#070D18] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} {BRAND.name}. {t('common.rightsReserved')}</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-slate-400">{t('common.established')}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to={formatRoute('privacy')} className="hover:text-slate-300 transition-colors">
              {t('common.privacyPolicy')}
            </Link>
            <Link to={formatRoute('terms')} className="hover:text-slate-300 transition-colors">
              {t('common.termsConditions')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};


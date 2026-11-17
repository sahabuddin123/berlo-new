import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, switchLanguage } = useLanguage();

  return (
    <button
      onClick={switchLanguage}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-[#11813C] hover:text-[#11813C] dark:hover:border-[#16A34A] dark:hover:text-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#11813C]/40 ${className}`}
      title={lang === 'en' ? 'বাংলায় দেখুন' : 'Switch to English'}
      aria-label="Toggle language"
    >
      <Globe className="w-3.5 h-3.5 text-[#11813C] dark:text-[#16A34A]" />
      <span className="font-bold">{lang === 'en' ? 'বাংলা' : 'EN'}</span>
    </button>
  );
};


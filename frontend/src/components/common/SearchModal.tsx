import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { servicesData } from '../../data/servicesData';
import { projectsData } from '../../data/projectsData';
import { insightsData } from '../../data/insightsData';
import { teamData } from '../../data/teamData';
import { Search, X, ArrowRight, ShieldCheck, Briefcase, FileText, User } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { lang, formatRoute } = useLanguage();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Global keydown listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { services: [], projects: [], insights: [], team: [] };

    const services = servicesData
      .filter(
        (s) =>
          s.title[lang].toLowerCase().includes(q) ||
          s.shortDesc[lang].toLowerCase().includes(q) ||
          s.capabilities.some((c) => c.title[lang].toLowerCase().includes(q))
      )
      .slice(0, 3);

    const projects = projectsData
      .filter(
        (p) =>
          p.title[lang].toLowerCase().includes(q) ||
          p.clientName.toLowerCase().includes(q) ||
          p.overview[lang].toLowerCase().includes(q)
      )
      .slice(0, 3);

    const insights = insightsData
      .filter(
        (i) =>
          i.title[lang].toLowerCase().includes(q) ||
          i.excerpt[lang].toLowerCase().includes(q) ||
          i.author[lang].toLowerCase().includes(q)
      )
      .slice(0, 3);

    const team = teamData
      .filter(
        (m) =>
          m.name[lang].toLowerCase().includes(q) ||
          m.role[lang].toLowerCase().includes(q) ||
          m.expertise.some((e) => e.toLowerCase().includes(q))
      )
      .slice(0, 3);

    return { services, projects, insights, team };
  }, [query, lang]);

  const hasResults =
    results.services.length > 0 ||
    results.projects.length > 0 ||
    results.insights.length > 0 ||
    results.team.length > 0;

  const handleSelect = (url: string) => {
    onClose();
    navigate(formatRoute(url));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            maxLength={80}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'bn'
                ? 'সেবা, কেস স্টাডি, ইনসাইটস বা টিম খুঁজুন...'
                : 'Search services, case studies, insights, or team...'
            }
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!query && (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
              {lang === 'bn'
                ? 'অনুসন্ধান করতে টাইপ শুরু করুন (যেমন: ক্রাইসিস, মিডিয়া, কেস স্টাডি)'
                : 'Start typing to search agency capabilities, case studies, and insights...'}
            </div>
          )}

          {query && !hasResults && (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
              {lang === 'bn'
                ? `"${query}" এর জন্য কোনো ফলাফল পাওয়া যায়নি`
                : `No results found for "${query}"`}
            </div>
          )}

          {results.services.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#11813C]" />
                {lang === 'bn' ? 'সেবাসমূহ' : 'Services'}
              </div>
              <div className="space-y-1">
                {results.services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelect(`services/${s.slug}`)}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF]">
                        {s.title[lang]}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{s.shortDesc[lang]}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#A302FF] transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.projects.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#A302FF]" />
                {lang === 'bn' ? 'কেস স্টাডিজ' : 'Case Studies'}
              </div>
              <div className="space-y-1">
                {results.projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(`work/${p.slug}`)}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF]">
                        {p.title[lang]}
                      </div>
                      <div className="text-xs text-slate-500">
                        {p.clientName} • {p.industry[lang]}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#A302FF] transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.insights.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#00A896]" />
                {lang === 'bn' ? 'ইনসাইটস ও প্রবন্ধ' : 'Insights & Articles'}
              </div>
              <div className="space-y-1">
                {results.insights.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => handleSelect(`insights/${a.slug}`)}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF]">
                        {a.title[lang]}
                      </div>
                      <div className="text-xs text-slate-500">
                        {a.author[lang]} • {a.readTimeMinutes} {lang === 'bn' ? 'মিনিট' : 'min'}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#A302FF] transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.team.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#1A305A] dark:text-[#93C5FD]" />
                {lang === 'bn' ? 'টিম ও নেতৃত্ব' : 'Team & Leadership'}
              </div>
              <div className="space-y-1">
                {results.team.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(`leadership/${m.slug}`)}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF]">
                        {m.name[lang]}
                      </div>
                      <div className="text-xs text-slate-500">{m.role[lang]}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#A302FF] transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


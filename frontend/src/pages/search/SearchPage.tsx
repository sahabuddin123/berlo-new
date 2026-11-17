import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { servicesData } from '../../data/servicesData';
import { projectsData } from '../../data/projectsData';
import { insightsData } from '../../data/insightsData';
import { teamData } from '../../data/teamData';
import { Seo } from '../../components/common/Seo';
import { FaSearch, FaArrowRight, FaShieldAlt, FaBriefcase, FaFileAlt, FaUserTie } from 'react-icons/fa';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { lang, formatRoute, t } = useLanguage();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { services: [], projects: [], insights: [], team: [] };

    const services = servicesData.filter(
      (s) =>
        s.title[lang].toLowerCase().includes(q) ||
        s.shortDesc[lang].toLowerCase().includes(q) ||
        s.capabilities.some((c) => c.title[lang].toLowerCase().includes(q))
    );

    const projects = projectsData.filter(
      (p) =>
        p.title[lang].toLowerCase().includes(q) ||
        p.clientName.toLowerCase().includes(q) ||
        p.overview[lang].toLowerCase().includes(q)
    );

    const insights = insightsData.filter(
      (i) =>
        i.title[lang].toLowerCase().includes(q) ||
        i.excerpt[lang].toLowerCase().includes(q) ||
        i.author[lang].toLowerCase().includes(q)
    );

    const team = teamData.filter(
      (m) =>
        m.name[lang].toLowerCase().includes(q) ||
        m.role[lang].toLowerCase().includes(q) ||
        m.expertise.some((e) => e.toLowerCase().includes(q))
    );

    return { services, projects, insights, team };
  }, [query, lang]);

  const totalResults =
    results.services.length +
    results.projects.length +
    results.insights.length +
    results.team.length;

  return (
    <div className="bg-white dark:bg-[#07090D] min-h-screen text-slate-900 dark:text-white transition-colors duration-200">
      <Seo
        title={`${t('common.searchResults')}: "${query}"`}
        description="Search results across Berlo Communications services, case studies, insights, and leadership."
      />

      {/* Header Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-[#1F1F1F] bg-slate-50 dark:bg-[#0B0E14]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] border border-[#A302FF]/20 text-xs font-bold uppercase tracking-wider">
              <FaSearch className="w-3.5 h-3.5" />
              <span>{t('common.searchResults')}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center">
              {lang === 'bn' ? (
                <>অনুসন্ধান <span className="b-border">ফলাফল</span></>
              ) : (
                <>Search <span className="b-border">Results</span></>
              )}
            </h1>

            <p className="text-base text-slate-600 dark:text-slate-400">
              {query ? (
                <span>
                  &ldquo;<span className="text-[#A302FF] dark:text-[#B833FF] font-semibold">{query}</span>&rdquo; — {totalResults} {lang === 'bn' ? 'টি ফলাফল পাওয়া গেছে' : 'results located'}
                </span>
              ) : (
                <span>{t('common.searchPlaceholder')}</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Results Content */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        {!query && (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-[#1F2432] p-8">
            <FaSearch className="w-8 h-8 text-[#A302FF] mx-auto mb-3 opacity-60" />
            <p className="text-base font-medium">
              {lang === 'bn' ? 'অনুসন্ধানের জন্য কোনো কীওয়ার্ড প্রদান করুন।' : 'Please enter a keyword to search.'}
            </p>
          </div>
        )}

        {query && totalResults === 0 && (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-[#1F2432] p-8">
            <p className="text-base font-medium">{t('common.noResults')}</p>
          </div>
        )}

        {/* Services Results */}
        {results.services.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#A302FF] dark:text-[#B833FF] flex items-center gap-2">
              <FaShieldAlt className="w-4 h-4 text-[#11813C]" />
              <span>{lang === 'bn' ? 'সেবাসমূহ' : 'Services'} ({results.services.length})</span>
            </h2>
            <div className="space-y-3">
              {results.services.map((s) => (
                <Link
                  key={s.id}
                  to={formatRoute(`services/${s.slug}`)}
                  className="p-5 sm:p-6 bg-white dark:bg-[#11141D] border border-slate-200 dark:border-[#1F2432] hover:border-[#A302FF] dark:hover:border-[#A302FF] flex items-center justify-between group transition-all shadow-sm block"
                >
                  <div className="pr-4">
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] text-base sm:text-lg mb-1 transition-colors">
                      {s.title[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {s.shortDesc[lang]}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#1A1F2C] border border-slate-200 dark:border-white/10 group-hover:bg-[#A302FF] group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                    <FaArrowRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Case Studies Results */}
        {results.projects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#A302FF] dark:text-[#B833FF] flex items-center gap-2">
              <FaBriefcase className="w-4 h-4 text-[#A302FF]" />
              <span>{lang === 'bn' ? 'কেস স্টাডিজ' : 'Case Studies'} ({results.projects.length})</span>
            </h2>
            <div className="space-y-3">
              {results.projects.map((p) => (
                <Link
                  key={p.id}
                  to={formatRoute(`work/${p.slug}`)}
                  className="p-5 sm:p-6 bg-white dark:bg-[#11141D] border border-slate-200 dark:border-[#1F2432] hover:border-[#A302FF] dark:hover:border-[#A302FF] flex items-center justify-between group transition-all shadow-sm block"
                >
                  <div className="pr-4">
                    <div className="text-[11px] font-bold text-[#A302FF] dark:text-[#B833FF] uppercase tracking-wider mb-1">
                      {p.clientName}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] text-base sm:text-lg mb-1 transition-colors">
                      {p.title[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {p.overview[lang]}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#1A1F2C] border border-slate-200 dark:border-white/10 group-hover:bg-[#A302FF] group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                    <FaArrowRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Insights Results */}
        {results.insights.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#A302FF] dark:text-[#B833FF] flex items-center gap-2">
              <FaFileAlt className="w-4 h-4 text-[#11813C]" />
              <span>{lang === 'bn' ? 'ইনসাইটস' : 'Insights'} ({results.insights.length})</span>
            </h2>
            <div className="space-y-3">
              {results.insights.map((a) => (
                <Link
                  key={a.id}
                  to={formatRoute(`insights/${a.slug}`)}
                  className="p-5 sm:p-6 bg-white dark:bg-[#11141D] border border-slate-200 dark:border-[#1F2432] hover:border-[#A302FF] dark:hover:border-[#A302FF] flex items-center justify-between group transition-all shadow-sm block"
                >
                  <div className="pr-4">
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] text-base sm:text-lg mb-1 transition-colors">
                      {a.title[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {a.excerpt[lang]}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#1A1F2C] border border-slate-200 dark:border-white/10 group-hover:bg-[#A302FF] group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                    <FaArrowRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Team Results */}
        {results.team.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#A302FF] dark:text-[#B833FF] flex items-center gap-2">
              <FaUserTie className="w-4 h-4 text-[#1A305A] dark:text-[#93C5FD]" />
              <span>{lang === 'bn' ? 'টিম ও নেতৃত্ব' : 'Team & Leadership'} ({results.team.length})</span>
            </h2>
            <div className="space-y-3">
              {results.team.map((m) => (
                <Link
                  key={m.id}
                  to={formatRoute(`leadership/${m.slug}`)}
                  className="p-5 sm:p-6 bg-white dark:bg-[#11141D] border border-slate-200 dark:border-[#1F2432] hover:border-[#A302FF] dark:hover:border-[#A302FF] flex items-center justify-between group transition-all shadow-sm block"
                >
                  <div className="pr-4">
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] text-base sm:text-lg mb-1 transition-colors">
                      {m.name[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#11813C] dark:text-[#22C55E] font-medium">
                      {m.role[lang]}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#1A1F2C] border border-slate-200 dark:border-white/10 group-hover:bg-[#A302FF] group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                    <FaArrowRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

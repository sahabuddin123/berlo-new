import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { servicesData } from '../../data/servicesData';
import { projectsData } from '../../data/projectsData';
import { insightsData } from '../../data/insightsData';
import { teamData } from '../../data/teamData';
import { Seo } from '../../components/common/Seo';
import { SectionHeader } from '../../components/common/SectionHeader';
import { ArrowRight, ShieldCheck, Briefcase, FileText, User } from 'lucide-react';

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
    <div className="space-y-16 lg:space-y-24 pb-24">
      <Seo
        title={`${t('common.searchResults')}: "${query}"`}
        description="Search results across Berlo Communications services, case studies, insights, and leadership."
      />

      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('common.searchResults')}
            badgeVariant="purple"
            title={query ? `"${query}"` : t('common.searchResults')}
            subtitle={
              query
                ? `${totalResults} ${lang === 'bn' ? 'টি ফলাফল পাওয়া গেছে' : 'results located'}`
                : t('common.searchPlaceholder')
            }
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {!query && (
          <div className="text-center py-16 text-slate-500">
            {lang === 'bn' ? 'অনুসন্ধানের জন্য কোনো কীওয়ার্ড প্রদান করুন।' : 'Please enter a keyword to search.'}
          </div>
        )}

        {query && totalResults === 0 && (
          <div className="text-center py-16 text-slate-500">
            {t('common.noResults')}
          </div>
        )}

        {/* Services */}
        {results.services.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#11813C]" />
              <span>{lang === 'bn' ? 'সেবাসমূহ' : 'Services'} ({results.services.length})</span>
            </h3>
            <div className="space-y-3">
              {results.services.map((s) => (
                <Link
                  key={s.id}
                  to={formatRoute(`services/${s.slug}`)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#A302FF] flex items-center justify-between group transition-all block"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] text-base mb-1">
                      {s.title[lang]}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{s.shortDesc[lang]}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#A302FF] shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Case Studies */}
        {results.projects.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#A302FF]" />
              <span>{lang === 'bn' ? 'কেস স্টাডিজ' : 'Case Studies'} ({results.projects.length})</span>
            </h3>
            <div className="space-y-3">
              {results.projects.map((p) => (
                <Link
                  key={p.id}
                  to={formatRoute(`work/${p.slug}`)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#A302FF] flex items-center justify-between group transition-all block"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] text-base mb-1">
                      {p.title[lang]}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{p.overview[lang]}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#A302FF] shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Insights */}
        {results.insights.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00A896]" />
              <span>{lang === 'bn' ? 'ইনসাইটস' : 'Insights'} ({results.insights.length})</span>
            </h3>
            <div className="space-y-3">
              {results.insights.map((a) => (
                <Link
                  key={a.id}
                  to={formatRoute(`insights/${a.slug}`)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#A302FF] flex items-center justify-between group transition-all block"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] text-base mb-1">
                      {a.title[lang]}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{a.excerpt[lang]}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#A302FF] shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Team */}
        {results.team.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <User className="w-4 h-4 text-[#1A305A] dark:text-[#93C5FD]" />
              <span>{lang === 'bn' ? 'টিম' : 'Team'} ({results.team.length})</span>
            </h3>
            <div className="space-y-3">
              {results.team.map((m) => (
                <Link
                  key={m.id}
                  to={formatRoute(`leadership/${m.slug}`)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#A302FF] flex items-center justify-between group transition-all block"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] text-base mb-1">
                      {m.name[lang]}
                    </h4>
                    <p className="text-xs text-[#11813C] dark:text-[#22C55E]">{m.role[lang]}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#A302FF] shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};


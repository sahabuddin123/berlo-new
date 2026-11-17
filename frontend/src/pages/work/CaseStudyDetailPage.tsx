import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { projectsData } from '../../data/projectsData';
import { Seo } from '../../components/common/Seo';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ArrowLeft, CheckCircle2, Quote, Clock, Building2 } from 'lucide-react';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, formatRoute, t } = useLanguage();

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-bold">{lang === 'bn' ? 'কেস স্টাডি পাওয়া যায়নি' : 'Case Study Not Found'}</h1>
        <Button to={formatRoute('work')} variant="primary">
          {t('common.backToWork')}
        </Button>
      </div>
    );
  }

  const otherProjects = projectsData.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      <Seo
        title={`${project.title[lang]} — Case Study`}
        description={project.overview[lang]}
      />

      {/* Back Link */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to={formatRoute('work')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#A302FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('common.backToWork')}</span>
        </Link>
      </div>

      {/* Hero Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="purple">{project.industry[lang]}</Badge>
            <span className="text-xs font-semibold text-[#11813C] dark:text-[#22C55E]">
              {project.clientName}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {project.title[lang]}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.overview[lang]}
          </p>

          {/* Hero Metrics 3-Column */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            {project.heroMetrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl sm:text-3xl font-black text-[#A302FF] dark:text-[#C966FF] mb-1">
                  {m.value}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {m.label[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep-Dive Narrative (Challenge, Strategy, Execution, Results) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Story Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Challenge */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A302FF]">
                <span className="w-2 h-2 rounded-full bg-[#A302FF]" />
                <span>{t('work.challengeLabel')}</span>
              </div>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.challenge[lang]}
              </p>
            </div>

            {/* The Strategy */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#11813C]">
                <span className="w-2 h-2 rounded-full bg-[#11813C]" />
                <span>{t('work.solutionLabel')}</span>
              </div>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.strategy[lang]}
              </p>
            </div>

            {/* Execution */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A305A] dark:text-[#93C5FD]">
                <span className="w-2 h-2 rounded-full bg-[#1A305A] dark:bg-[#93C5FD]" />
                <span>{lang === 'bn' ? 'বাস্তবায়ন ও পরিচালনা' : 'Execution & Rollout'}</span>
              </div>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.execution[lang]}
              </p>
            </div>

            {/* Results Grid */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6">
              <h3 className="text-xl font-bold">{t('work.resultsLabel')}</h3>
              <div className="space-y-3">
                {project.results[lang].map((res, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200 leading-relaxed">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Quote if available */}
            {project.quote && (
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative space-y-4">
                <Quote className="w-8 h-8 text-[#A302FF]/30" />
                <p className="text-base text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{project.quote.text[lang]}"
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {project.quote.author}
                  </div>
                  <div className="text-xs text-[#11813C] dark:text-[#22C55E]">
                    {project.quote.designation[lang]}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Meta Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('work.clientLabel')}
              </h3>
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#11813C]" />
                <span>{project.clientName}</span>
              </div>
              <div className="text-xs text-slate-500">{project.industry[lang]}</div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('work.timeframeLabel')}
              </h3>
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A302FF]" />
                <span>{project.timeline}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('work.servicesRenderedLabel')}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.servicesProvided.map((sp, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {sp}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1A305A] text-white space-y-4 text-center">
              <h4 className="font-bold text-base">
                {lang === 'bn' ? 'একই ধরনের উদ্যোগ চান?' : 'Plan a Similar Campaign'}
              </h4>
              <p className="text-xs text-slate-300">
                {lang === 'bn'
                  ? 'আপনার প্রতিষ্ঠানের লক্ষ্য বাস্তবায়নে আমাদের সাথে আলোচনা করুন।'
                  : 'Speak with our senior strategic directors to architect your campaign.'}
              </p>
              <Button to={formatRoute('contact')} variant="purple" size="sm" className="w-full justify-center">
                {t('common.inquireNow')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t('common.relatedProjects')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProjects.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
            >
              <Badge variant="purple" size="sm">{p.industry[lang]}</Badge>
              <h4 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2">
                {p.title[lang]}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">{p.overview[lang]}</p>
              <Link
                to={formatRoute(`work/${p.slug}`)}
                className="inline-block text-xs font-bold text-[#A302FF] dark:text-[#C966FF] hover:underline pt-2"
              >
                {t('common.readMore')} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

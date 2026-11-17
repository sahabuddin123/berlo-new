import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { CaseStudy } from '../../data/projectsData';
import { Badge } from '../common/Badge';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: CaseStudy;
  featuredLayout?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featuredLayout = false }) => {
  const { lang, formatRoute } = useLanguage();

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between ${
        featuredLayout ? 'lg:grid lg:grid-cols-12 gap-8 p-6 sm:p-10' : 'p-6 sm:p-8'
      }`}
    >
      <div className={featuredLayout ? 'lg:col-span-8 flex flex-col justify-between' : ''}>
        <div>
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <Badge variant="purple" size="sm">
              {project.industry[lang]}
            </Badge>
            <span className="text-xs font-mono font-medium text-slate-400">
              {project.timeline}
            </span>
          </div>

          {/* Client & Title */}
          <div className="text-xs font-semibold uppercase tracking-wider text-[#11813C] dark:text-[#22C55E] mb-2">
            {project.clientName}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-snug group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors">
            {project.title[lang]}
          </h3>

          {/* Overview / Challenge snippet */}
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
            {project.overview[lang]}
          </p>
        </div>

        {/* Hero Metrics Tags */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {project.heroMetrics.map((m, idx) => (
            <div key={idx}>
              <div className="text-base sm:text-lg font-extrabold text-[#1A305A] dark:text-[#93C5FD]">
                {m.value}
              </div>
              <div className="text-[11px] text-slate-500 line-clamp-1">
                {m.label[lang]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA Corner / Right Side */}
      <div
        className={`pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between ${
          featuredLayout ? 'lg:col-span-4 lg:pt-0 lg:mt-0 lg:border-t-0 lg:border-l lg:border-slate-100 dark:lg:border-slate-800 lg:pl-8 lg:flex-col lg:justify-between lg:items-start' : ''
        }`}
      >
        <div className="space-y-1">
          <div className="text-xs text-slate-400">
            {lang === 'bn' ? 'প্রযুক্ত সক্ষমতা:' : 'Key Capabilities:'}
          </div>
          <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {project.servicesProvided[0]}
          </div>
        </div>

        <Link
          to={formatRoute(`work/${project.slug}`)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-[#A302FF] group-hover:text-white transition-all text-xs font-bold"
        >
          <span>{lang === 'bn' ? 'কেস স্টাডি' : 'View Impact'}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
};


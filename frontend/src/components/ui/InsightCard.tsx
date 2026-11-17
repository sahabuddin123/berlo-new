import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Article } from '../../data/insightsData';
import { Badge } from '../common/Badge';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface InsightCardProps {
  article: Article;
  featured?: boolean;
}

export const InsightCard: React.FC<InsightCardProps> = ({ article, featured = false }) => {
  const { lang, formatRoute } = useLanguage();

  return (
    <article
      className={`group rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between ${
        featured ? 'bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/80 border-[#A302FF]/30' : ''
      }`}
    >
      <div>
        {/* Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <Badge variant="teal" size="sm">
            {article.category}
          </Badge>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {article.readTimeMinutes} {lang === 'bn' ? 'মিনিট পাঠ' : 'min read'}
            </span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors">
          {article.title[lang]}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
          {article.excerpt[lang]}
        </p>
      </div>

      {/* Author & Read CTA */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          <div className="font-semibold text-slate-800 dark:text-slate-200">{article.author[lang]}</div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
            <Calendar className="w-3 h-3" />
            <span>{article.publishedAt}</span>
          </div>
        </div>

        <Link
          to={formatRoute(`insights/${article.slug}`)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#A302FF] dark:text-[#C966FF] hover:underline"
        >
          <span>{lang === 'bn' ? 'পড়ুন' : 'Read'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};


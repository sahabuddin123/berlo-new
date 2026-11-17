import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { insightsData } from '../../data/insightsData';
import { Seo } from '../../components/common/Seo';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { InsightCard } from '../../components/ui/InsightCard';
import { LinkedInIcon, TwitterIcon, FacebookIcon } from '../../components/common/SocialIcons';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Check,
  CheckCircle2,
  Copy,
} from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, formatRoute, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const article = insightsData.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-bold">{lang === 'bn' ? 'আর্টিকেল পাওয়া যায়নি' : 'Article Not Found'}</h1>
        <Button to={formatRoute('insights')} variant="primary">
          {t('common.backToInsights')}
        </Button>
      </div>
    );
  }

  const content = article.content[lang];
  const relatedArticles = insightsData.filter((a) => a.id !== article.id).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      <Seo
        title={`${article.title[lang]} — Insights`}
        description={article.excerpt[lang]}
      />

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to={formatRoute('insights')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#A302FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('common.backToInsights')}</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4">
          <Badge variant="teal">{article.category}</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15]">
            {article.title[lang]}
          </h1>

          {/* Metadata & Author Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1A305A] text-white flex items-center justify-center font-bold text-sm">
                {article.author.en[0]}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  {article.author[lang]}
                </div>
                <div className="text-xs text-[#11813C] dark:text-[#22C55E]">
                  {article.authorRole[lang]}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishedAt}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {article.readTimeMinutes} {t('common.readTime')}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Lead Paragraph / Introduction */}
        <div className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed border-l-4 border-[#A302FF] pl-6 py-2">
          {content.introduction}
        </div>

        {/* Content Body Sections */}
        <div className="space-y-8 text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {content.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4">
                {sec.heading}
              </h2>
              <p className="leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Key Takeaways Box */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#11813C]" />
            <span>{lang === 'bn' ? 'কৌশলগত শিক্ষা ও সিদ্ধান্ত' : 'Key Strategic Takeaways'}</span>
          </h3>
          <ul className="space-y-2.5">
            {content.keyTakeaways.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A302FF] shrink-0 mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Conclusion */}
        <div className="pt-4 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>{content.conclusion}</p>
        </div>

        {/* Social Sharing Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t('common.shareArticle')}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied!') : (lang === 'bn' ? 'লিংক কপি' : 'Copy Link')}</span>
            </button>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-[#0077B5] hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Share on LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Share on X"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-[#1877F2] hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Share on Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t('common.relatedArticles')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {relatedArticles.map((rel) => (
            <InsightCard key={rel.id} article={rel} />
          ))}
        </div>
      </section>
    </div>
  );
};

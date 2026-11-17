import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { insightsData } from '../../data/insightsData';
import { Seo } from '../../components/common/Seo';
import { LinkedInIcon, FacebookIcon } from '../../components/common/SocialIcons';
import {
  Calendar,
  Clock,
  Check,
  CheckCircle2,
  Copy,
  BookOpen,
} from 'lucide-react';
import { FaArrowRight, FaChevronRight, FaArrowLeft } from 'react-icons/fa';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, formatRoute } = useLanguage();
  const [copied, setCopied] = useState(false);

  const article = insightsData.find((a) => a.slug === slug);

  const articleImages: Record<string, string> = {
    'art-1': '/images/berlo/media_1794918294861_9ae416c9.jpg',
    'art-2': '/images/berlo/media_1794918355610_368cfda3.jpg',
    'art-3': '/images/berlo/media_1794917667301_ec42fff0.jpg',
    'art-4': '/images/berlo/media_1794919204515_5e4809fa.jpg',
    'art-5': '/images/berlo/media_1794919525086_daefc098.jpg',
  };

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="section-main-title text-slate-900 dark:text-white">
          {lang === 'bn' ? 'আর্টিকেল পাওয়া যায়নি' : 'Article Not Found'}
        </h1>
        <Link
          to={formatRoute('insights')}
          className="px-6 py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none inline-flex items-center gap-2"
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>{lang === 'bn' ? 'সকল ইনসাইটসে ফিরে যান' : 'Back to Insights'}</span>
        </Link>
      </div>
    );
  }

  const content = article.content[lang];
  const relatedArticles = insightsData.filter((a) => a.id !== article.id).slice(0, 3);
  const heroImage =
    articleImages[article.id] ||
    '/images/berlo/media_1794918294861_9ae416c9.jpg';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={`${article.title[lang]} — Berlo Communications Insights`}
        description={article.excerpt[lang]}
        type="article"
        image={heroImage}
        publishedTime={article.publishedAt}
        author={article.author[lang]}
        jsonLd={{
          '@type': 'NewsArticle',
          '@id': `https://berlocommunications.com/${lang}/insights/${article.slug}#article`,
          headline: article.title[lang],
          description: article.excerpt[lang],
          image: [heroImage],
          datePublished: article.publishedAt,
          author: {
            '@type': 'Person',
            name: article.author[lang],
          },
          publisher: {
            '@type': 'Organization',
            name: 'Berlo Communications Ltd.',
            logo: {
              '@type': 'ImageObject',
              url: 'https://berlocommunications.com/brand/logo.png',
            },
          },
        }}
      />

      {/* ========================================================================= */}
      {/* 01. PAGE HERO BANNER                                                      */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 bg-slate-50 dark:bg-[#07090D] border-b border-slate-200 dark:border-[#1F1F1F] transition-colors duration-200">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-wider">
            <Link to={formatRoute('')} className="hover:text-[#A302FF] transition-colors">
              {lang === 'bn' ? 'হোম' : 'Home'}
            </Link>
            <FaChevronRight className="w-2.5 h-2.5 text-slate-400" />
            <Link to={formatRoute('insights')} className="hover:text-[#A302FF] transition-colors">
              {lang === 'bn' ? 'ইনসাইটস' : 'Insights'}
            </Link>
            <FaChevronRight className="w-2.5 h-2.5 text-slate-400" />
            <span className="text-[#A302FF] dark:text-[#B833FF] truncate max-w-[200px] sm:max-w-none">
              {article.category}
            </span>
          </nav>

          <div className="max-w-4xl space-y-6 text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left leading-tight">
              {article.title[lang]}
            </h1>

            {/* Author & Publication Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#1A305A] text-white flex items-center justify-center font-bold text-base shadow-md">
                  {article.author.en[0]}
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {article.author[lang]}
                  </div>
                  <div className="text-xs text-[#11813C] dark:text-[#22C55E] font-semibold">
                    {article.authorRole[lang]}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.publishedAt}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTimeMinutes} {lang === 'bn' ? 'মিনিট পাঠ' : 'min read'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. FULL ARTICLE BODY                                                     */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Featured Image */}
            <div className="aspect-[21/9] sm:aspect-[2.2/1] overflow-hidden bg-slate-900 border border-slate-200 dark:border-[#242424] shadow-xl">
              <img
                src={heroImage}
                alt={article.title[lang]}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Introduction Callout */}
            <div className="p-8 sm:p-10 bg-slate-50 dark:bg-[#12141C] border-l-4 border-[#A302FF] border-y border-r border-slate-200 dark:border-[#222530]">
              <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {content.introduction}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {content.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    {sec.heading}
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="p-8 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-3">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {lang === 'bn' ? 'উপসংহার ও সারসংক্ষেপ' : 'Strategic Conclusion'}
              </h4>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {content.conclusion}
              </p>
            </div>

            {/* Key Takeaways Box */}
            <div className="p-8 sm:p-10 bg-slate-900 dark:bg-[#07090D] border border-slate-800 text-white space-y-6 shadow-xl">
              <h4 className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                <span>{lang === 'bn' ? 'প্রধান শিক্ষণীয় বিষয়সমূহ' : 'Key Strategic Takeaways'}</span>
              </h4>
              <div className="space-y-3">
                {content.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#0E1118] border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-[#A302FF] shrink-0 mt-2" />
                    <span className="text-sm text-slate-200 leading-relaxed">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Share & Copy Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#242424]">
              <span className="text-xs uppercase font-bold text-slate-600 dark:text-slate-400 tracking-wider">
                {lang === 'bn' ? 'নিবন্ধটি শেয়ার করুন:' : 'Share This Strategic Brief:'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-1.5 bg-white dark:bg-[#202534] border border-slate-200 dark:border-white/10 hover:border-[#A302FF] text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-none inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied!') : (lang === 'bn' ? 'লিংক কপি' : 'Copy Link')}</span>
                </button>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white dark:bg-[#202534] border border-slate-200 dark:border-white/10 hover:border-[#A302FF] text-[#0077B5] transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white dark:bg-[#202534] border border-slate-200 dark:border-white/10 hover:border-[#A302FF] text-[#1877F2] transition-colors"
                  aria-label="Share on Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            {/* Author Card */}
            <div className="p-8 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-4">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider pb-2 border-b border-slate-100 dark:border-white/10">
                {lang === 'bn' ? 'লেখক পরিচিতি' : 'About the Author'}
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1A305A] text-white flex items-center justify-center font-bold text-lg">
                  {article.author.en[0]}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-base">
                    {article.author[lang]}
                  </div>
                  <div className="text-xs text-[#11813C] dark:text-[#22C55E] font-semibold">
                    {article.authorRole[lang]}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'bn'
                  ? 'বার্লো কমিউনিকেশন্স লিমিটেডের জ্যেষ্ঠ কৌশলগত উপদেষ্টা, যিনি বাংলাদেশের শীর্ষ করপোরেট ক্লায়েন্টদের পিআর ও মিডিয়া পরামর্শ প্রদান করেন।'
                  : 'Senior communications counsel advising enterprise clients on reputation defense, broadcast newsrooms, and executive positioning.'}
              </p>
            </div>

            {/* Advisory CTA */}
            <div className="p-8 bg-slate-900 dark:bg-[#0E1118] border border-slate-800 text-white space-y-4">
              <h4 className="text-base font-bold text-white uppercase tracking-wider">
                {lang === 'bn' ? 'কৌশলগত পরামর্শ চান?' : 'Direct Advisory Session'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'bn'
                  ? 'আপনার প্রতিষ্ঠানের জন্য একটি কাস্টমাইজড পিআর ফ্রেমওয়ার্ক প্রস্তুত করতে আমাদের পরিচালকদের সাথে কথা বলুন।'
                  : 'Schedule an executive consultation with our senior communications council.'}
              </p>
              <Link
                to={formatRoute('contact')}
                className="w-full py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-2"
              >
                <span>{lang === 'bn' ? 'পরামর্শ বুক করুন' : 'Schedule Strategy Call'}</span>
                <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. RELATED ARTICLES                                                      */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 text-center sm:text-left">
          <h3 className="section-main-title text-slate-900 dark:text-white">
            {lang === 'bn' ? (
              <>সম্পর্কিত অন্যান্য <span className="b-border">ইনসাইটস</span></>
            ) : (
              <>Related Strategic <span className="b-border">Insights</span></>
            )}
          </h3>
          <Link
            to={formatRoute('insights')}
            className="btn-berlo-outline self-center sm:self-auto"
          >
            <span>{lang === 'bn' ? 'সকল ইনসাইটস' : 'All Insights'}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => {
            const relImg =
              articleImages[rel.id] ||
              '/images/berlo/media_1794918294861_9ae416c9.jpg';

            return (
              <Link
                key={rel.id}
                to={formatRoute(`insights/${rel.slug}`)}
                className="bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] hover:border-[#A302FF] dark:hover:border-[#B833FF] transition-all group block shadow-xs overflow-hidden"
              >
                <div className="aspect-video overflow-hidden bg-slate-900 relative">
                  <img
                    src={relImg}
                    alt={rel.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase">
                      {rel.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-500">
                    {rel.readTimeMinutes} {lang === 'bn' ? 'মিনিট পাঠ' : 'min read'}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] text-base leading-snug line-clamp-2">
                    {rel.title[lang]}
                  </h4>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#A302FF] dark:text-[#B833FF]">
                    <span>{lang === 'bn' ? 'পড়ুন' : 'Read Article'}</span>
                    <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

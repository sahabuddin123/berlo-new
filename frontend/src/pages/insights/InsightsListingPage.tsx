import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { insightsData } from '../../data/insightsData';
import { Seo } from '../../components/common/Seo';
import { Award, Clock, Search } from 'lucide-react';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';

export const InsightsListingPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', en: 'All Insights', bn: 'সকল ইনসাইটস' },
    { key: 'crisis', en: 'Crisis & Reputation', bn: 'সংকট ব্যবস্থাপনা' },
    { key: 'media', en: 'Newsroom & Media Trends', bn: 'মিডিয়া ট্রেন্ডস' },
    { key: 'reputation', en: 'Corporate Leadership', bn: 'করপোরেট নেতৃত্ব' },
  ];

  const articleImages: Record<string, string> = {
    'art-1': '/images/berlo/media_1794918294861_9ae416c9.jpg',
    'art-2': '/images/berlo/media_1794918355610_368cfda3.jpg',
    'art-3': '/images/berlo/media_1794917667301_ec42fff0.jpg',
    'art-4': '/images/berlo/media_1794919204515_5e4809fa.jpg',
    'art-5': '/images/berlo/media_1794919525086_daefc098.jpg',
  };

  const filteredArticles = insightsData.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      article.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author[lang].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const gridArticles = filteredArticles.filter((a) => a.id !== featured?.id);

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'ইনসাইটস ও বিশ্লেষণী ব্লগ — বার্লো কমিউনিকেশন্স' : 'PR & Strategic Communications Insights — Berlo'}
        description={
          lang === 'bn'
            ? 'বার্লোর সিনিয়র যোগাযোগ উপদেষ্টাদের বিশ্লেষণী লেখা, কৌশলগত গাইডলাইন ও দূরদর্শী ভাবনা।'
            : 'Explore authoritative analyses and strategic playbooks on public relations by Berlo Communications.'
        }
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
            <span className="text-[#A302FF] dark:text-[#B833FF]">
              {lang === 'bn' ? 'ইনসাইটস' : 'Insights'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-5 text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'কৌশলগত চিন্তাধারা ও বিশ্লেষণ' : 'Strategic Thought Leadership'}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>
                  জনসংযোগ ও করপোরেট সুনামের <span className="b-border">বিশ্লেষণী ইনসাইটস</span>
                </>
              ) : (
                <>
                  Perspectives on Reputation, Media & <span className="b-border">Public Sentiment</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'বাংলাদেশের গণমাধ্যম জগত, সংকট ব্যবস্থাপনা ও সি-সুইট পজিশনিং নিয়ে বার্লোর জ্যেষ্ঠ পরিচালকদের মৌলিক গবেষণা, বিশ্লেষণ ও প্রামাণ্য গাইডলাইন।'
                : 'Authoritative analysis, crisis response playbooks, and media ecosystem insights written by senior communications directors.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. CATEGORY TABS & SEARCH BAR                                            */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                type="button"
                className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none ${
                  selectedCategory === c.key
                    ? 'bg-[#A302FF] text-white shadow-lg shadow-purple-900/30'
                    : 'bg-white dark:bg-[#141720] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5'
                }`}
              >
                {lang === 'bn' ? c.bn : c.en}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'bn' ? 'ইনসাইটস খুঁজুন...' : 'Search insights & topics...'}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF] rounded-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. FEATURED FLAGSHIP ARTICLE HERO                                        */}
      {/* ========================================================================= */}
      {featured && !searchTerm && selectedCategory === 'all' && (
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white dark:bg-[#0E1118] border border-slate-200 dark:border-[#222736] overflow-hidden shadow-xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[400px] overflow-hidden bg-slate-900">
                <img
                  src={articleImages[featured.id] || '/images/berlo/media_1794918294861_9ae416c9.jpg'}
                  alt={featured.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1 bg-[#A302FF] text-white text-[11px] font-extrabold uppercase tracking-widest shadow-md">
                    {lang === 'bn' ? 'নির্বাচিত নিবন্ধ' : 'Featured Flagship Analysis'}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="text-[#11813C] dark:text-[#22C55E] uppercase tracking-wider font-bold">
                      {featured.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTimeMinutes} {lang === 'bn' ? 'মিনিট পাঠ' : 'min read'}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors">
                    {featured.title[lang]}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {featured.excerpt[lang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {featured.author[lang]}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {featured.authorRole[lang]}
                    </div>
                  </div>

                  <Link
                    to={formatRoute(`insights/${featured.slug}`)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-[#A302FF] dark:bg-white dark:text-slate-950 dark:hover:bg-[#A302FF] dark:hover:text-white text-white text-xs font-bold uppercase tracking-wider transition-all rounded-none inline-flex items-center gap-2 group/btn"
                  >
                    <span>{lang === 'bn' ? 'পড়ুন' : 'Read Article'}</span>
                    <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 04. ARTICLES GRID                                                         */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center lg:text-left">
          <h3 className="section-main-title text-slate-900 dark:text-white">
            {lang === 'bn' ? (
              <>সর্বশেষ প্রকাশিত <span className="b-border">নিবন্ধসমূহ</span></>
            ) : (
              <>Recent Strategic <span className="b-border">Articles</span></>
            )}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridArticles.map((article) => {
            const artImg =
              articleImages[article.id] ||
              '/images/berlo/media_1794918294861_9ae416c9.jpg';

            return (
              <Link
                key={article.id}
                to={formatRoute(`insights/${article.slug}`)}
                className="bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] hover:border-[#A302FF] dark:hover:border-[#B833FF] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <img
                      src={artImg}
                      alt={article.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTimeMinutes} {lang === 'bn' ? 'মিনিট পাঠ' : 'min read'}</span>
                      <span>•</span>
                      <span>{article.publishedAt}</span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors line-clamp-2">
                      {article.title[lang]}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed font-normal">
                      {article.excerpt[lang]}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                      {article.author[lang]}
                    </span>
                    <span className="text-[#A302FF] dark:text-[#B833FF] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{lang === 'bn' ? 'পড়ুন' : 'Read'}</span>
                      <FaArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. BOTTOM CTA                                                            */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 bg-gradient-to-r from-[#1A305A] via-[#152340] to-[#0D182E] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'আপনার প্রতিষ্ঠানের জন্য কৌশলগত পরামর্শ চান?'
                : 'Need Tailored Strategic Communications Advisory?'}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {lang === 'bn'
                ? 'আমাদের সিনিয়র পরিচালকদের সাথে একটি গোপনীয় প্রাথমিক আলোচনার জন্য আজই যোগাযোগ করুন।'
                : 'Connect with our leadership council for a confidential advisory briefing tailored to your quarterly milestones.'}
            </p>
          </div>
          <Link
            to={formatRoute('contact')}
            className="px-7 py-3.5 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none shrink-0 shadow-lg shadow-purple-900/30 inline-flex items-center gap-2"
          >
            <span>{lang === 'bn' ? 'পরামর্শ বুক করুন' : 'Schedule Strategy Call'}</span>
            <FaArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

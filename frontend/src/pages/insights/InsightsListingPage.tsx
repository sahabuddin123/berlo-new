import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { insightsData } from '../../data/insightsData';
import { Seo } from '../../components/common/Seo';
import { Badge } from '../../components/common/Badge';
import { SectionHeader } from '../../components/common/SectionHeader';
import { InsightCard } from '../../components/ui/InsightCard';
import { Search, Clock, ArrowRight } from 'lucide-react';

export const InsightsListingPage: React.FC = () => {
  const { lang, formatRoute, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const featuredArticle = insightsData.find((a) => a.featured) || insightsData[0];

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

  const categories = [
    { key: 'all', label: t('common.filterAll') },
    { key: 'crisis', label: lang === 'bn' ? 'সংকট ব্যবস্থাপনা' : 'Crisis Advisory' },
    { key: 'media', label: lang === 'bn' ? 'মিডিয়া ট্রেন্ডস' : 'Media Trends' },
    { key: 'reputation', label: lang === 'bn' ? 'করপোরেট সুনাম' : 'Corporate Reputation' },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      <Seo
        title={lang === 'bn' ? 'ইনসাইটস ও চিন্তাধারা' : 'PR & Communications Insights'}
        description={
          lang === 'bn'
            ? 'বার্লোর সিনিয়র যোগাযোগ উপদেষ্টাদের বিশ্লেষণী লেখা, কৌশলগত গাইডলাইন ও দূরদর্শী ভাবনা।'
            : 'Explore authoritative analyses and playbooks on public relations by Berlo Communications.'
        }
      />

      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('insights.badge')}
            badgeVariant="teal"
            title={t('insights.title')}
            subtitle={t('insights.subtitle')}
          />
        </div>
      </section>

      {/* Search & Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === c.key
                    ? 'bg-[#1A305A] text-white dark:bg-[#25427C]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('insights.searchInsights')}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF]"
            />
          </div>
        </div>
      </section>

      {/* Featured Big Article Callout */}
      {!searchTerm && selectedCategory === 'all' && featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#1A305A] to-[#0D1B36] text-white shadow-xl space-y-6 relative overflow-hidden">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="purple">{t('insights.featuredArticle')}</Badge>
              <span className="flex items-center gap-1.5 text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5" />
                <span>{featuredArticle.readTimeMinutes} {t('common.readTime')}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold max-w-3xl leading-snug">
              {featuredArticle.title[lang]}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {featuredArticle.excerpt[lang]}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-white">{featuredArticle.author[lang]}</span> • {featuredArticle.publishedAt}
              </div>
              <Link
                to={formatRoute(`insights/${featuredArticle.slug}`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-[#A302FF] hover:text-white transition-colors"
              >
                <span>{lang === 'bn' ? 'সম্পূর্ণ আর্টিকেল পড়ুন' : 'Read Full Perspective'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            {t('common.noResults')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <InsightCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

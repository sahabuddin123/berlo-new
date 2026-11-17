import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mediaData } from '../../data/mediaData';
import { BRAND } from '../../config/brand';
import { Seo } from '../../components/common/Seo';
import { Badge } from '../../components/common/Badge';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Newspaper, Tv, Globe, Download, Mail, Phone, ExternalLink } from 'lucide-react';

export const MediaPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredMedia =
    activeCategory === 'all'
      ? mediaData
      : mediaData.filter((m) => m.category === activeCategory);

  const categories = [
    { key: 'all', label: t('media.allMedia') },
    { key: 'award', label: lang === 'bn' ? 'স্বীকৃতি ও পুরস্কার' : 'Awards & Recognition' },
    { key: 'interview', label: t('media.interviews') },
    { key: 'press_release', label: t('media.pressReleases') },
    { key: 'mention', label: t('media.mentions') },
  ];

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'broadcast':
        return <Tv className="w-4 h-4 text-[#A302FF]" />;
      case 'online':
        return <Globe className="w-4 h-4 text-[#00A896]" />;
      default:
        return <Newspaper className="w-4 h-4 text-[#11813C]" />;
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      <Seo
        title={lang === 'bn' ? 'মিডিয়া কভারেজ ও প্রেস রুম' : 'Media Coverage & Press Room'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের আনুষ্ঠানিক প্রেস রিলিজ, গণমাধ্যম কভারেজ ও এক্সিকিউটিভ সাক্ষাৎকার।'
            : 'Track official press announcements, media coverage, and television interviews featuring Berlo.'
        }
      />

      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('media.badge')}
            badgeVariant="purple"
            title={t('media.title')}
            subtitle={t('media.subtitle')}
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === c.key
                  ? 'bg-[#A302FF] text-white shadow-md shadow-[#A302FF]/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Media Stories Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold">
                    {getSourceIcon(item.sourceType)}
                    <span>{item.outlet}</span>
                  </span>
                  <span>•</span>
                  <span>{item.date}</span>
                  <span>•</span>
                  <Badge variant="navy" size="sm">
                    {item.category.replace('_', ' ')}
                  </Badge>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title[lang]}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.summary[lang]}
                </p>
              </div>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 shrink-0"
                >
                  <span>{lang === 'bn' ? 'মূল উৎস দেখুন' : 'View Source'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Media Kit & Journalist Relations Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Media Kit Download */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white space-y-4">
            <Badge variant="teal">{lang === 'bn' ? 'প্রেস কিট' : 'Official Press Kit'}</Badge>
            <h3 className="text-2xl font-bold">
              {lang === 'bn'
                ? 'বার্লো কমিউনিকেশন্স প্রেস রিসোর্স কিট'
                : 'Berlo Communications Media Resources'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'সংস্থার লোগো অ্যাসেট (ভেক্টর ও হাই-রেস), অফিশিয়াল ব্র্যান্ড গাইডলাইন, এক্সিকিউটিভ হেডশট এবং করপোরেট ফ্যাক্টশিট।'
                : 'Download high-resolution agency logos, executive portrait photography, corporate boilerplates, and official brand identity guidelines.'}
            </p>
            <div className="pt-2">
              <a
                href="/brand/logo.png"
                download="berlo-logo.png"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-[#A302FF] hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'bn' ? 'লোগো অ্যাসেট ডাউনলোড করুন' : 'Download Official Logo Asset'}</span>
              </a>
            </div>
          </div>

          {/* Press Desk Inquiries */}
          <div className="lg:col-span-5 p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? 'সাংবাদিক ও প্রেস ডেস্ক যোগাযোগ' : 'Press Desk & Media Inquiries'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'bn'
                ? 'সাংবাদিক এবং মিডিয়া প্রতিনিধিদের জরুরী অনুসন্ধান ও সাক্ষাৎকারের জন্য সরাসরি প্রেস ডেস্ক।'
                : 'For breaking press queries, deadline-driven statements, or spokesperson interview requests:'}
            </p>
            <div className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A302FF]" />
                <a href={`mailto:${BRAND.contact.emails[0]}`} className="hover:underline">
                  {BRAND.contact.emails[0]}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#11813C]" />
                <a href={`tel:${BRAND.contact.phones[0]}`} className="hover:underline">
                  {BRAND.contact.phones[0]}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

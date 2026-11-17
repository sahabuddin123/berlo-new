import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { mediaData } from '../../data/mediaData';
import { Seo } from '../../components/common/Seo';
import { Newspaper, Tv, Globe, Download, Mail, Phone, ExternalLink, Award } from 'lucide-react';
import { FaChevronRight } from 'react-icons/fa';

export const MediaPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', en: 'All Media', bn: 'সকল মিডিয়া' },
    { key: 'interview', en: 'Broadcast & TV Interviews', bn: 'টেলিভিশন সাক্ষাৎকার' },
    { key: 'press_release', en: 'Press Releases', bn: 'প্রেস বিজ্ঞপ্তি' },
    { key: 'mention', en: 'News Mentions', bn: 'সংবাদ কাভারেজ' },
  ];

  // Real national media logos
  const mediaLogos = [
    { name: 'Prothom Alo', logo: '/images/berlo/media/prothom-alo.svg' },
    { name: 'The Daily Star', logo: '/images/berlo/media/the-daily-star.svg' },
    { name: 'The Business Standard', logo: '/images/berlo/media/tbs.svg' },
    { name: 'Dhaka Tribune', logo: '/images/berlo/media/dhaka-tribune.svg' },
    { name: 'Bloomberg', logo: '/images/berlo/media/bloomberg.svg' },
    { name: 'Reuters', logo: '/images/berlo/media/reuters.svg' },
    { name: 'Financial Express', logo: '/images/berlo/media/financial-express.png' },
  ];

  const filteredMedia =
    activeCategory === 'all'
      ? mediaData
      : mediaData.filter((m) => m.category === activeCategory);

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'broadcast':
        return <Tv className="w-4 h-4 text-[#A302FF] dark:text-[#B833FF]" />;
      case 'online':
        return <Globe className="w-4 h-4 text-[#00A896]" />;
      default:
        return <Newspaper className="w-4 h-4 text-[#11813C] dark:text-[#22C55E]" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'মিডিয়া কভারেজ ও প্রেস রুম — বার্লো' : 'Media Coverage & Press Newsroom — Berlo Communications'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের আনুষ্ঠানিক প্রেস রিলিজ, গণমাধ্যম কভারেজ ও এক্সিকিউটিভ সাক্ষাৎকার।'
            : 'Track official press announcements, media coverage, and television interviews featuring Berlo Communications Ltd.'
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
              {lang === 'bn' ? 'মিডিয়া রুম' : 'Newsroom'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-5 text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'অফিসিয়াল নিউজ ও প্রেস সেন্টার' : 'Official Press & Broadcast Newsroom'}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>
                  গণমাধ্যম কভারেজ ও <span className="b-border">প্রেস সেন্টার</span>
                </>
              ) : (
                <>
                  Media Coverage & <span className="b-border">Press Center</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'বার্লো কমিউনিকেশন্সের সর্বশেষ প্রেস রিলিজ, টেলিভিশন বিশ্লেষণ, আন্তর্জাতিক মিডিয়া উপস্থিতি এবং অফিশিয়াল প্রেস কিট।'
                : 'Explore television interviews, editorial opinions, and official press releases published across Bangladesh and international business wires.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. NATIONAL MEDIA AFFILIATIONS                                           */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center sm:text-left">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            {lang === 'bn' ? 'শীর্ষ জাতীয় ও আন্তর্জাতিক গণমাধ্যম সংযোগ' : 'Tier-1 National & International Media Network'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {mediaLogos.map((m, idx) => (
            <div
              key={idx}
              className="h-16 sm:h-20 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] p-3 flex items-center justify-center shadow-xs"
              title={m.name}
            >
              <img
                src={m.logo}
                alt={m.name}
                className="max-h-8 max-w-[110px] object-contain filter contrast-110"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. CATEGORY FILTER TABS                                                  */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-3 border-b border-slate-200 dark:border-white/10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              type="button"
              className={`shrink-0 px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all cursor-pointer rounded-none ${
                activeCategory === c.key
                  ? 'bg-[#A302FF] text-white shadow-lg shadow-purple-900/30'
                  : 'bg-white dark:bg-[#141720] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E2330] border border-slate-200 dark:border-white/5'
              }`}
            >
              {lang === 'bn' ? c.bn : c.en}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. MEDIA COVERAGE STORIES LISTING                                        */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] hover:border-[#A302FF] dark:hover:border-[#B833FF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold">
                    {getSourceIcon(item.sourceType)}
                    <span>{item.outlet}</span>
                  </span>
                  <span>•</span>
                  <span>{item.date}</span>
                  <span className="px-2 py-0.5 rounded-none bg-slate-100 dark:bg-[#202534] text-[10px] uppercase font-bold text-slate-700 dark:text-slate-300">
                    {item.category.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors leading-snug">
                  {item.title[lang]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {item.summary[lang]}
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0">
                <a
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto px-5 py-2.5 bg-slate-100 dark:bg-[#202534] hover:bg-[#A302FF] text-slate-900 dark:text-white hover:text-white dark:hover:bg-[#A302FF] text-xs font-bold uppercase tracking-wider transition-all rounded-none inline-flex items-center justify-center gap-2 group/link"
                >
                  <span>{lang === 'bn' ? 'সংবাদটি দেখুন' : 'Read Coverage'}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. OFFICIAL PRESS KIT & MEDIA ENQUIRIES                                  */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Press Kit Download */}
          <div className="p-8 sm:p-10 bg-slate-900 dark:bg-[#07090D] border border-slate-800 text-white space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-[#A302FF]/20 text-[#B833FF] flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {lang === 'bn' ? 'অফিসিয়াল প্রেস কিট ও লোগো' : 'Official Press Kit & Assets'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'বার্লো কমিউনিকেশন্সের উচ্চমানের ভেক্টর লোগো, প্রাতিষ্ঠানিক ফ্যাক্ট শিট এবং সিনিয়র নেতৃত্ব দলের অফিসিয়াল প্রেস পোর্ট্রেট ডাউনলোড করুন।'
                : 'Download high-resolution corporate vector logos, executive portraits, and official company fact sheets for editorial publishing.'}
            </p>
            <div className="pt-2">
              <a
                href="/images/berlo/about-image.jpg"
                download
                className="px-6 py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none inline-flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'প্রেস কিট ডাউনলোড (ZIP)' : 'Download Media Kit (ZIP)'}</span>
              </a>
            </div>
          </div>

          {/* Media Enquiries */}
          <div className="p-8 sm:p-10 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? 'সাংবাদিক ও গণমাধ্যম অনুসন্ধান' : 'Press Desk & Media Contacts'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'সাংবাদিক, সম্পাদক ও গণমাধ্যমকর্মীরা যেকোনো আনুষ্ঠানিক মন্তব্য, সাক্ষাৎকার বা প্রেস তথ্যের জন্য আমাদের মিডিয়া ডেস্কে সরাসরি যোগাযোগ করতে পারেন।'
                : 'Accredited journalists and broadcast producers seeking official agency statements or expert C-suite commentary may contact our press desk.'}
            </p>
            <div className="pt-2 space-y-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A302FF]" />
                <a href="mailto:contact@berlocommunications.com" className="hover:underline">
                  contact@berlocommunications.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#11813C]" />
                <a href="tel:+8801711268479" className="hover:underline">
                  +880 1711 268 479 (24/7 Media Desk)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

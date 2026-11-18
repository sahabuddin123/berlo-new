import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { projectsData, CaseStudy } from '../../data/projectsData';
import { getPublicProjects } from '../../services/publicApi';
import { Seo } from '../../components/common/Seo';
import { Award } from 'lucide-react';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';

export const WorkListingPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [projects, setProjects] = useState<CaseStudy[]>(projectsData);

  useEffect(() => {
    let isMounted = true;
    getPublicProjects().then((data) => {
      if (isMounted && data && data.length > 0) {
        setProjects(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { key: 'all', en: 'All Case Studies', bn: 'সকল কেস স্টাডি' },
    { key: 'corporate', en: 'Corporate PR & Authority', bn: 'কর্পোরেট পিআর ও অবস্থান' },
    { key: 'crisis', en: 'Crisis & Newsroom', bn: 'সংকট প্রশমন ও নিউজরুম' },
    { key: 'events', en: 'Events & Trade Pavilions', bn: 'বাণিজ্য মেলা ও ইভেন্ট' },
    { key: 'brand', en: 'Consumer Campaigns', bn: 'ভোক্তা ও ব্র্যান্ড ক্যাম্পেইন' },
  ];

  // Map authentic imagery to project items
  const projectImages: Record<string, string> = {
    'bangladesh-leather-footwear-expo-iccb': '/images/berlo/projects/iccb-expo-confucius-stage.jpg',
    'centerpoint-autumn-cultural-activation': '/images/berlo/projects/centerpoint-atrium-musical-stage.jpg',
    'city-bank-amex-ultramarine-activation': '/images/berlo/projects/amex-ultramarine-lounge-activation.jpg',
    'fintech-reputation-elevation': '/images/berlo/media_1794917571021_869ec669.png',
    'telecom-5g-launch': '/images/berlo/media_1794917667301_ec42fff0.jpg',
    'pharmaceutical-product-recall-crisis': '/images/berlo/media_1794918294861_9ae416c9.jpg',
    'international-energy-conclave': '/images/berlo/media_1794918355610_368cfda3.jpg',
    'fmcg-rural-sustainability-drive': '/images/berlo/media_1794919204515_5e4809fa.jpg',
    'bank-merger-change-management': '/images/berlo/media_1794919525086_daefc098.jpg',
  };

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const featured = filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const gridProjects = filteredProjects.filter((p) => p.id !== featured?.id);

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'কেস স্টাডিজ ও বাস্তবায়িত প্রকল্পসমূহ — বার্লো' : 'Case Studies & Featured Campaigns — Berlo Communications'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের বাস্তবায়িত কৌশলগত ক্যাম্পেইন, ক্রাইসিস নিরসন ও সাফল্যের কেস স্টাডিজ।'
            : 'Explore documented public relations case studies, crisis turnarounds, and brand activations by Berlo Communications.'
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
              {lang === 'bn' ? 'কেস স্টাডিজ' : 'Case Studies'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-5 text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'প্রামাণ্য ফলাফল ও কেস স্টাডি' : 'Demonstrated Enterprise Impact'}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>
                  বাস্তবায়িত প্রকল্প ও <span className="b-border">সাফল্যের কেস স্টাডিজ</span>
                </>
              ) : (
                <>
                  Featured Projects & <span className="b-border">Case Studies</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'বাংলাদেশের শীর্ষস্থানীয় ব্যাংক, টেলিকম, বহুজাতিক প্রতিষ্ঠান ও এনার্জি খাতের জটিল চ্যালেঞ্জ কীভাবে আমরা কৌশলগতভাবে সমাধান করেছি তার প্রামাণ্য বিশ্লেষণ।'
                : 'Explore real-world case studies detailing how Berlo engineered high-trust narratives, neutralized high-stakes crises, and amplified market valuation for industry pioneers.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. CATEGORY FILTER TABS                                                  */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-3 border-b border-slate-200 dark:border-white/10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              type="button"
              className={`shrink-0 px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all cursor-pointer rounded-none ${
                selectedCategory === c.key
                  ? 'bg-[#A302FF] text-white shadow-lg shadow-purple-900/30 ring-1 ring-purple-400/30'
                  : 'bg-white dark:bg-[#141720] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E2330] border border-slate-200 dark:border-white/5'
              }`}
            >
              {lang === 'bn' ? c.bn : c.en}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. FEATURED HERO SHOWCASE PROJECT                                        */}
      {/* ========================================================================= */}
      {featured && (
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white dark:bg-[#0E1118] border border-slate-200 dark:border-[#222736] overflow-hidden shadow-xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Media Visual */}
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] overflow-hidden bg-slate-900">
                <img
                  src={projectImages[featured.id] || '/images/berlo/media_1794917571021_869ec669.png'}
                  alt={featured.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1 bg-[#A302FF] text-white text-[11px] font-extrabold uppercase tracking-widest shadow-md">
                    {lang === 'bn' ? 'নির্বাচিত কেস স্টাডি' : 'Featured Case Study'}
                  </span>
                </div>
              </div>

              {/* Text & Metrics Column */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="text-[#11813C] dark:text-[#22C55E] uppercase tracking-wider font-bold">
                      {featured.industry[lang]}
                    </span>
                    <span>{featured.timeline}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors">
                    {featured.title[lang]}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {featured.overview[lang]}
                  </p>
                </div>

                {/* Hero Metrics Row */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                  {featured.heroMetrics.map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xl sm:text-2xl font-black text-[#A302FF] dark:text-[#B833FF]">
                        {m.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold line-clamp-1">
                        {m.label[lang]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Action Link */}
                <div className="pt-2">
                  <Link
                    to={formatRoute(`work/${featured.slug}`)}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-[#A302FF] dark:bg-white dark:text-slate-950 dark:hover:bg-[#A302FF] dark:hover:text-white text-white text-xs font-bold uppercase tracking-widest transition-all rounded-none inline-flex items-center justify-center gap-2 group/btn"
                  >
                    <span>{lang === 'bn' ? 'সম্পূর্ণ কেস স্টাডি দেখুন' : 'Explore Full Case Study'}</span>
                    <FaArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 04. REMAINING PROJECTS GRID                                               */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center lg:text-left">
          <h3 className="section-main-title text-slate-900 dark:text-white">
            {lang === 'bn' ? (
              <>অন্যান্য কৌশলগত <span className="b-border">সফলতা ও অর্জন</span></>
            ) : (
              <>Strategic Campaign <span className="b-border">Portfolio</span></>
            )}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridProjects.map((project) => {
            const projectImg =
              projectImages[project.id] ||
              '/images/berlo/media_1794917667301_ec42fff0.jpg';

            return (
              <div
                key={project.id}
                className="bg-white dark:bg-[#12151D] border border-slate-200 dark:border-[#222736] hover:border-[#A302FF] dark:hover:border-[#B833FF] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Photo Visual */}
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <img
                      src={projectImg}
                      alt={project.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                        {project.clientName}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      <span className="text-[#11813C] dark:text-[#22C55E] uppercase tracking-wider">
                        {project.industry[lang]}
                      </span>
                      <span>{project.timeline}</span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors line-clamp-2">
                      {project.title[lang]}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {project.overview[lang]}
                    </p>
                  </div>
                </div>

                {/* Metrics & Action Link */}
                <div className="p-6 pt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-white/5">
                    {project.heroMetrics.slice(0, 2).map((m, idx) => (
                      <div key={idx}>
                        <div className="text-base font-extrabold text-[#A302FF] dark:text-[#B833FF]">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-500 font-semibold line-clamp-1">
                          {m.label[lang]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={formatRoute(`work/${project.slug}`)}
                    className="w-full py-2.5 bg-slate-100 dark:bg-[#1A1F2B] hover:bg-[#A302FF] text-slate-900 dark:text-white hover:text-white dark:hover:bg-[#A302FF] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded-none group/link"
                  >
                    <span>{lang === 'bn' ? 'কেস স্টাডি দেখুন' : 'View Impact'}</span>
                    <FaArrowRight className="w-3 h-3 group-link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
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
                ? 'আপনার প্রতিষ্ঠানের জন্য একটি বাস্তবমুখী পিআর কেস স্টাডি তৈরি করতে চান?'
                : 'Ready to Engineer Your Brand’s Next Defining Case Study?'}
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
            <span>{lang === 'bn' ? 'বিনামূল্যে পরামর্শ নিন' : 'Book Strategic Briefing'}</span>
            <FaArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

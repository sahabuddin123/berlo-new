import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { testimonialsData } from '../../data/clientsData';
import { Seo } from '../../components/common/Seo';
import { getPublicClients } from '../../services/publicApi';
import { Award, Star, Quote } from 'lucide-react';
import { FaArrowRight, FaChevronRight, FaTimes } from 'react-icons/fa';

export const ClientsPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [dynamicClients, setDynamicClients] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    getPublicClients().then((data) => {
      if (isMounted && data && data.length > 0) {
        setDynamicClients(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Real enterprise client logos from public/images/berlo/clients/
  const clientLogos = [
    { name: 'British American Tobacco', logo: '/images/berlo/clients/bat.jpg', category: 'fmcg', industry: { en: 'FMCG & Multinational', bn: 'এফএমসিজি ও বহুজাতিক' }, years: '5+' },
    { name: 'Borak Real Estate', logo: '/images/berlo/clients/borak.jpg', category: 'infrastructure', industry: { en: 'Real Estate & Infrastructure', bn: 'রিয়েল এস্টেট ও অবকাঠামো' }, years: '4+' },
    { name: 'Lazz Pharma Ltd.', logo: '/images/berlo/clients/lazzpharma.jpg', category: 'healthcare', industry: { en: 'Healthcare & Retail Pharmacy', bn: 'স্বাস্থ্যসেবা ও ফার্মাসিউটিক্যালস' }, years: '6+' },
    { name: 'Rahimafrooz', logo: '/images/berlo/clients/rahimafrooz.jpg', category: 'energy', industry: { en: 'Automotive & Energy Storage', bn: 'অটোমোবাইল ও জ্বালানি' }, years: '4+' },
    { name: 'Rupayan Group', logo: '/images/berlo/clients/rupayan.jpg', category: 'infrastructure', industry: { en: 'Conglomerate & Real Estate', bn: 'কংগ্লোমারেট ও রিয়েল এস্টেট' }, years: '5+' },
    { name: 'UCEP Bangladesh', logo: '/images/berlo/clients/ucep.jpg', category: 'development', industry: { en: 'Vocational Education & NGO', bn: 'কারিগরি শিক্ষা ও উন্নয়ন সংস্থা' }, years: '3+' },
    { name: 'Radiant Pharmaceuticals', logo: '/images/berlo/clients/radiant.jpg', category: 'healthcare', industry: { en: 'Pharmaceuticals & Life Sciences', bn: 'ফার্মাসিউটিক্যালস ও হেলথকেয়ার' }, years: '4+' },
    { name: 'Unique Hotel & Resorts', logo: '/images/berlo/clients/unique.jpg', category: 'hospitality', industry: { en: 'Luxury Hospitality & Tourism', bn: 'হসপিটালিটি ও পর্যটন' }, years: '5+' },
    { name: 'Motul Bangladesh', logo: '/images/berlo/clients/motul.jpg', category: 'fmcg', industry: { en: 'Premium Lubricants & Auto', bn: 'লুব্রিকেন্ট ও অটোমোবাইল' }, years: '3+' },
    { name: 'Netcom Technologies', logo: '/images/berlo/clients/netcom.jpg', category: 'tech', industry: { en: 'ICT Infrastructure & Cloud', bn: 'আইসিটি ও ক্লাউড অবকাঠামো' }, years: '4+' },
    { name: 'Rajasthan Group', logo: '/images/berlo/clients/rajasthan.jpg', category: 'hospitality', industry: { en: 'Culinary Brands & Hospitality', bn: 'খাদ্য ও রেস্টুরেন্ট ব্র্যান্ড' }, years: '3+' },
    { name: 'Beacon Pharmaceuticals', logo: '/images/berlo/clients/beacon.jpg', category: 'healthcare', industry: { en: 'Oncology & Biotech Pharma', bn: 'বায়োটেক ও অনকোলজি ফার্মা' }, years: '4+' },
    { name: 'ATN Bangla Network', logo: '/images/berlo/clients/atn.jpg', category: 'media', industry: { en: 'National Broadcast Media', bn: 'জাতীয় সম্প্রচার গণমাধ্যম' }, years: '6+' },
  ];

  // Authentic Video Testimonials
  const videoTestimonials = [
    {
      id: 'video-1',
      title: lang === 'bn' ? 'কর্পোরেট পিআর সফলতার দীর্ঘস্থায়ী যাত্রা' : 'The Great Journey of Delivering PR Excellence',
      thumbnail: '/images/berlo/testimonials/stock-testimonial-1.jpg',
      youtubeId: 'r92J1K0zNn0',
      client: 'Aungoshree Group',
    },
    {
      id: 'video-2',
      title: lang === 'bn' ? 'অঙ্গশ্রী ও বার্লো স্ট্র্যাটেজিক গ্রোথ পার্টনারশিপ' : 'Aungoshree X Berlo Strategic Growth',
      thumbnail: '/images/berlo/testimonials/stock-testimonial-2.jpg',
      youtubeId: 'uO-1o14gUfU',
      client: 'Corporate Partner',
    },
    {
      id: 'video-3',
      title: lang === 'bn' ? 'সন্তুষ্ট ক্লায়েন্ট ও দীর্ঘস্থায়ী অংশীদারিত্ব' : 'Happy Clients & Enduring Enterprise Trust',
      thumbnail: '/images/berlo/testimonials/stock-testimonial-3.jpg',
      youtubeId: 'dY8_N0B7H0w',
      client: 'National Conglomerate',
    },
  ];

  const categories = [
    { key: 'all', en: 'All Partners', bn: 'সকল পার্টনার' },
    { key: 'fmcg', en: 'FMCG & Consumer', bn: 'ভোক্তা পণ্য ও এফএমসিজি' },
    { key: 'healthcare', en: 'Healthcare & Pharma', bn: 'স্বাস্থ্যসেবা ও ফার্মা' },
    { key: 'infrastructure', en: 'Real Estate & Infrastructure', bn: 'রিয়েল এস্টেট ও অবকাঠামো' },
    { key: 'energy', en: 'Energy & Tech', bn: 'জ্বালানি ও প্রযুক্তি' },
    { key: 'development', en: 'Development & Trade', bn: 'উন্নয়ন ও আন্তর্জাতিক' },
  ];

  const mergedLogos = [
    ...dynamicClients.map((c) => ({
      name: c.name,
      logo: c.logo || '/images/berlo/clients/bat.jpg',
      category: c.category || 'fmcg',
      industry: typeof c.industry === 'object' ? c.industry : { en: c.industry || 'Corporate Partner', bn: c.industry || 'করপোরেট অংশীদার' },
      years: `${c.partnershipYears || 4}+`,
    })),
    ...clientLogos.filter(
      (sc) => !dynamicClients.some((dc) => dc.name.toLowerCase() === sc.name.toLowerCase())
    ),
  ];

  const filteredLogos =
    activeCategory === 'all'
      ? mergedLogos
      : mergedLogos.filter(
          (c) =>
            c.category === activeCategory ||
            (activeCategory === 'energy' && (c.category === 'energy' || c.category === 'tech'))
        );

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'আমাদের ক্লায়েন্ট ও রিভিউ — বার্লো কমিউনিকেশন্স' : 'Our Valued Clients & Reviews — Berlo Communications'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের সম্মানিত করপোরেট ক্লায়েন্ট, ভিডিও টেস্টিমোনিয়াল ও অংশীদারিত্ব।'
            : 'Explore leading corporations, financial institutions, and global brands partnered with Berlo Communications Ltd.'
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
              {lang === 'bn' ? 'ক্লায়েন্টস' : 'Clients'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-5 text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সম্মানিত ক্লায়েন্ট ও দীর্ঘস্থায়ী অংশীদারিত্ব' : 'Enterprise Partnerships & Trust'}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>
                  শীর্ষ প্রতিষ্ঠানের আস্থা ও <span className="b-border">সফলতার গল্প</span>
                </>
              ) : (
                <>
                  Trusted by Market Pioneers & <span className="b-border">Industry Leaders</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'বাংলাদেশের শীর্ষস্থানীয় কর্পোরেট গ্রুপ, বহুজাতিক প্রতিষ্ঠান ও উন্নয়ন সহযোগী সংস্থাগুলো তাদের সুনাম বিনির্মাণ ও সংকট ব্যবস্থাপনায় বার্লোর ওপর আস্থা রেখেছে।'
                : 'From Fortune 500 multinationals to premier domestic conglomerates, discover why leading enterprises choose Berlo as their strategic communications counsel.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. CLIENT LOGOS GRID WITH FILTER TABS                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-4 border-b border-slate-200 dark:border-white/10 text-center sm:text-left">
          <div>
            <h2 className="section-main-title text-slate-900 dark:text-white">
              {lang === 'bn' ? (
                <>সম্মানিত করপোরেট <span className="b-border">অংশীদারবৃন্দ</span></>
              ) : (
                <>Our Enterprise <span className="b-border">Client Alliances</span></>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'bn'
                ? 'বাংলাদেশের অর্থনীতিতে নেতৃত্ব দানকারী শীর্ষ সংস্থাসমূহ'
                : 'Premier brands steering Bangladesh’s economic transformation'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                type="button"
                className={`shrink-0 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none ${
                  activeCategory === c.key
                    ? 'bg-[#A302FF] text-white shadow-md shadow-purple-900/30'
                    : 'bg-white dark:bg-[#141720] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5'
                }`}
              >
                {lang === 'bn' ? c.bn : c.en}
              </button>
            ))}
          </div>
        </div>

        {/* Logo Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {filteredLogos.map((client, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] hover:border-[#A302FF] dark:hover:border-[#B833FF] p-5 sm:p-6 flex flex-col items-center justify-between text-center transition-all duration-300 shadow-xs hover:shadow-lg group"
            >
              <div className="w-full h-16 sm:h-20 flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-12 max-w-[120px] object-contain filter contrast-105 group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 w-full space-y-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {client.name}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {client.industry[lang]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. VIDEO TESTIMONIALS (Authentic Video Cards Matching Home Page)          */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#07090D] border-y border-slate-200 dark:border-[#1F1F1F] text-slate-900 dark:text-white transition-colors duration-200">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] text-xs font-bold uppercase tracking-wider">
              {lang === 'bn' ? 'ভিডিও প্রতিক্রিয়া' : 'Video Case Testimonials'}
            </div>
            <h2 className="section-main-title text-slate-900 dark:text-white text-center">
              {lang === 'bn' ? (
                <>ক্লায়েন্টদের মুখে <span className="b-border">সরাসরি অভিজ্ঞতা ও মতামত</span></>
              ) : (
                <>Hear Directly from <span className="b-border">Our Enterprise Clients</span></>
              )}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {lang === 'bn'
                ? 'বার্লোর কৌশলগত পিআর সেবা নিয়ে শীর্ষ করপোরেট ক্লায়েন্টদের ভাবনা ও অভিজ্ঞতা।'
                : 'Watch corporate leaders share their real-world experience working with Berlo on brand expansion, media relations, and crisis management.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {videoTestimonials.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveVideoId(item.youtubeId)}
                className="group relative aspect-video bg-slate-900 dark:bg-[#0A0A0A] border border-slate-200 dark:border-[#222222] hover:border-[#A302FF] overflow-hidden cursor-pointer shadow-lg dark:shadow-xl transition-all duration-300"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-10 sm:w-16 sm:h-11 rounded-xl bg-[#F61C0D] group-hover:scale-115 group-hover:shadow-[0_0_25px_rgba(246,28,13,0.7)] flex items-center justify-center transition-all duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. WRITTEN REVIEWS & TESTIMONIALS                                        */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] text-xs font-bold uppercase tracking-wider">
            {lang === 'bn' ? 'লিখিত প্রশংসাপত্র' : 'Endorsements'}
          </div>
          <h2 className="section-main-title text-slate-900 dark:text-white text-center">
            {lang === 'bn' ? (
              <>সি-সুইট এক্সিকিউটিভদের <span className="b-border">মন্তব্য ও স্বীকৃতি</span></>
            ) : (
              <>Executive Testimonials & <span className="b-border">Endorsements</span></>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((test) => (
            <div
              key={test.id}
              className="bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] p-8 shadow-sm hover:shadow-xl hover:border-[#A302FF] dark:hover:border-[#B833FF] transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#A302FF]/30" />

                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{test.quote[lang]}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white text-base">
                  {test.author}
                </div>
                <div className="text-xs text-[#11813C] dark:text-[#22C55E] font-semibold">
                  {test.designation[lang]}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {test.company}
                </div>
              </div>
            </div>
          ))}
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
                ? 'আপনার প্রতিষ্ঠানের জন্য দীর্ঘমেয়াদী পিআর পার্টনারশিপ শুরু করতে চান?'
                : 'Ready to Join Bangladesh’s Most Respected Brands?'}
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

      {/* ========================================================================= */}
      {/* YOUTUBE VIDEO MODAL PLAYER                                                */}
      {/* ========================================================================= */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#A302FF] transition-colors p-2 text-xl"
              aria-label="Close modal"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title="Client Testimonial Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

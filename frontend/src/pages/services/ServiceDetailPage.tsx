import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { servicesData } from '../../data/servicesData';
import { Seo } from '../../components/common/Seo';
import { CheckCircle2, Award } from 'lucide-react';
import { FaArrowRight, FaChevronRight, FaArrowLeft } from 'react-icons/fa';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, formatRoute } = useLanguage();

  const normalizedSlug = (slug || '').toLowerCase().trim();
  const service = servicesData.find(
    (s) =>
      s.slug.toLowerCase() === normalizedSlug ||
      s.id.toLowerCase() === normalizedSlug ||
      s.aliases?.some((a) => a.toLowerCase() === normalizedSlug)
  );

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="section-main-title text-slate-900 dark:text-white">
          {lang === 'bn' ? 'সেবা পাওয়া যায়নি' : 'Service Not Found'}
        </h1>
        <Link
          to={formatRoute('services')}
          className="px-6 py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none inline-flex items-center gap-2"
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>{lang === 'bn' ? 'সকল সেবাসমূহে ফিরে যান' : 'Back to Services'}</span>
        </Link>
      </div>
    );
  }

  // Other complementary services
  const otherServices = servicesData.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={`${service.title[lang]} — Berlo Communications`}
        description={service.shortDesc[lang]}
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
            <Link to={formatRoute('services')} className="hover:text-[#A302FF] transition-colors">
              {lang === 'bn' ? 'সেবাসমূহ' : 'Services'}
            </Link>
            <FaChevronRight className="w-2.5 h-2.5 text-slate-400" />
            <span className="text-[#A302FF] dark:text-[#B833FF] truncate max-w-[200px] sm:max-w-none">
              {service.title[lang]}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'কৌশলগত সক্ষমতা' : 'Enterprise Capability'}</span>
              </div>

              <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
                {service.title[lang]}
              </h1>

              <p className="text-base sm:text-xl text-[#A302FF] dark:text-[#B833FF] font-semibold leading-relaxed">
                {service.tagline[lang]}
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                {service.overview[lang]}
              </p>

              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to={formatRoute('contact')}
                  className="px-6 py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold tracking-widest uppercase transition-all shadow-lg shadow-purple-900/20 rounded-none inline-flex items-center gap-2"
                >
                  <span>{lang === 'bn' ? 'এই সেবার জন্য পরামর্শ নিন' : 'Inquire For This Capability'}</span>
                  <FaArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  to={formatRoute('services')}
                  className="btn-berlo-outline"
                >
                  <span>{lang === 'bn' ? 'সকল সেবা দেখুন' : 'View All Services'}</span>
                </Link>
              </div>
            </div>

            {/* Key Metrics Banner */}
            <div className="lg:col-span-4 space-y-4">
              {service.keyMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-md flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
                      {m.label[lang]}
                    </div>
                    <div className="text-3xl font-black text-[#A302FF] dark:text-[#B833FF] mt-1">
                      {m.value}
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#11813C]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. STRATEGIC APPROACH & METHODOLOGY                                      */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-slate-50 dark:bg-[#12141C] border border-slate-200 dark:border-[#222530] p-8 sm:p-12 lg:p-14 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] text-xs font-bold uppercase tracking-wider">
            {lang === 'bn' ? 'কৌশলগত দৃষ্টিভঙ্গি' : 'Strategic Methodology'}
          </div>

          <h2 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
            {lang === 'bn' ? (
              <>আমরা কীভাবে সর্বোচ্চ <span className="b-border">ফলাফল নিশ্চিত করি</span></>
            ) : (
              <>How We Engineer <span className="b-border">Decisive Outcomes</span></>
            )}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl">
            {service.strategicApproach[lang]}
          </p>
        </div>

        {/* Detailed Capabilities Grid */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h3 className="section-main-title text-slate-900 dark:text-white">
              {lang === 'bn' ? (
                <>সুনির্দিষ্ট কারিগরি <span className="b-border">সক্ষমতাসমূহ</span></>
              ) : (
                <>Granular Capability <span className="b-border">Modules</span></>
              )}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {service.capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-8 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] hover:border-[#A302FF] dark:hover:border-[#B833FF] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 group relative"
              >
                <div className="w-10 h-10 rounded-full bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] flex items-center justify-center font-bold text-sm">
                  0{i + 1}
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors">
                  {cap.title[lang]}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {cap.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Business Benefits */}
        <div className="p-8 sm:p-14 bg-slate-900 dark:bg-[#07090D] border border-slate-800 dark:border-[#1F1F1F] text-white space-y-8 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11813C]/20 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
              {lang === 'bn' ? 'ব্যবসায়িক অর্জন' : 'Business Value'}
            </div>
            <h3 className="section-main-title text-white">
              {lang === 'bn' ? (
                <>এই সেবার মূল বাণিজ্যিক <span className="b-border">সুবিধাসমূহ</span></>
              ) : (
                <>Quantifiable Strategic <span className="b-border">Benefits</span></>
              )}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 bg-[#0E1118] border border-slate-800"
              >
                <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                  {b[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. OTHER COMPLEMENTARY SERVICES                                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 text-center sm:text-left">
          <h3 className="section-main-title text-slate-900 dark:text-white">
            {lang === 'bn' ? (
              <>অন্যান্য পরিপূরক <span className="b-border">সেবাসমূহ</span></>
            ) : (
              <>Complementary <span className="b-border">Capabilities</span></>
            )}
          </h3>
          <Link
            to={formatRoute('services')}
            className="btn-berlo-outline self-center sm:self-auto"
          >
            <span>{lang === 'bn' ? 'সকল সেবা' : 'All Services'}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherServices.map((os) => (
            <Link
              key={os.id}
              to={formatRoute(`services/${os.slug}`)}
              className="p-6 sm:p-8 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] hover:border-[#A302FF] dark:hover:border-[#B833FF] transition-all group block shadow-xs"
            >
              <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] text-lg mb-2">
                {os.title[lang]}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {os.shortDesc[lang]}
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#A302FF] dark:text-[#B833FF]">
                <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Capability'}</span>
                <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. BOTTOM INQUIRY CTA                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 bg-gradient-to-r from-[#1A305A] via-[#152340] to-[#0D182E] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? `আপনার প্রতিষ্ঠানের জন্য ${service.title[lang]} সেবা গ্রহণ করতে চান?`
                : `Ready to Deploy ${service.title[lang]} for Your Enterprise?`}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {lang === 'bn'
                ? 'আমাদের সিনিয়র পরিচালকদের সাথে একটি গোপনীয় প্রাথমিক আলোচনার জন্য আজই যোগাযোগ করুন।'
                : 'Connect with our leadership council for a bespoke advisory proposal aligned with your enterprise milestones.'}
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

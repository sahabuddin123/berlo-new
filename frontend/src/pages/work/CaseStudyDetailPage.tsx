import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { projectsData, CaseStudy } from '../../data/projectsData';
import { getPublicProjectBySlug, getPublicProjects } from '../../services/publicApi';
import { Seo } from '../../components/common/Seo';
import { CheckCircle2, Quote, Award } from 'lucide-react';
import { FaArrowRight, FaChevronRight, FaArrowLeft } from 'react-icons/fa';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, formatRoute } = useLanguage();

  const fallbackProject = projectsData.find((p) => p.slug === slug || p.id === slug);
  const [project, setProject] = useState<CaseStudy | undefined>(fallbackProject);
  const [allProjects, setAllProjects] = useState<CaseStudy[]>(projectsData);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      getPublicProjectBySlug(slug).then((data) => {
        if (isMounted && data) {
          setProject(data);
        }
      });
      getPublicProjects().then((data) => {
        if (isMounted && data && data.length > 0) {
          setAllProjects(data);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const projectImages: Record<string, string> = {
    'fintech-reputation-elevation': '/images/berlo/media_1794917571021_869ec669.png',
    'telecom-5g-launch': '/images/berlo/media_1794917667301_ec42fff0.jpg',
    'pharmaceutical-product-recall-crisis': '/images/berlo/media_1794918294861_9ae416c9.jpg',
    'international-energy-conclave': '/images/berlo/media_1794918355610_368cfda3.jpg',
    'fmcg-rural-sustainability-drive': '/images/berlo/media_1794919204515_5e4809fa.jpg',
    'bank-merger-change-management': '/images/berlo/media_1794919525086_daefc098.jpg',
  };

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="section-main-title text-slate-900 dark:text-white">
          {lang === 'bn' ? 'কেস স্টাডি পাওয়া যায়নি' : 'Case Study Not Found'}
        </h1>
        <Link
          to={formatRoute('work')}
          className="px-6 py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none inline-flex items-center gap-2"
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>{lang === 'bn' ? 'সকল কেস স্টাডিজে ফিরে যান' : 'Back to Case Studies'}</span>
        </Link>
      </div>
    );
  }

  const otherProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 3);
  const heroImage =
    projectImages[project.id] ||
    '/images/berlo/media_1794917571021_869ec669.png';

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={`${project.title[lang]} — Case Study | Berlo Communications`}
        description={project.overview[lang]}
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
            <Link to={formatRoute('work')} className="hover:text-[#A302FF] transition-colors">
              {lang === 'bn' ? 'কেস স্টাডিজ' : 'Case Studies'}
            </Link>
            <FaChevronRight className="w-2.5 h-2.5 text-slate-400" />
            <span className="text-[#A302FF] dark:text-[#B833FF] truncate max-w-[200px] sm:max-w-none">
              {project.clientName}
            </span>
          </nav>

          <div className="max-w-4xl space-y-5 text-center lg:text-left mx-auto lg:mx-0">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="px-3 py-1 bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] text-xs font-bold uppercase tracking-wider">
                {project.industry[lang]}
              </span>
              <span className="text-xs font-semibold text-[#11813C] dark:text-[#22C55E] uppercase tracking-wider">
                {project.clientName}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                • {project.timeline}
              </span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left leading-tight">
              {project.title[lang]}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {project.overview[lang]}
            </p>
          </div>

          {/* Hero Metrics Row */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.heroMetrics.map((m, idx) => (
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
      </section>

      {/* ========================================================================= */}
      {/* 02. FULL-WIDTH CAMPAIGN FEATURE IMAGE                                     */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] rounded-none overflow-hidden bg-slate-900 shadow-2xl border border-slate-200 dark:border-[#222736]">
          <img
            src={heroImage}
            alt={project.title[lang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#A302FF] dark:text-[#B833FF] font-bold">
                {lang === 'bn' ? 'বাস্তবায়িত ক্যাম্পেইন পোর্টফোলিও' : 'Active Campaign Deployment'}
              </div>
              <div className="text-xl sm:text-2xl font-bold mt-1">
                {project.clientName}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.servicesProvided.map((s, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/20 text-white text-[11px] font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. DEEP-DIVE STRATEGIC BREAKDOWN                                         */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* The Challenge */}
            <div className="p-8 sm:p-10 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A302FF] dark:text-[#B833FF]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A302FF]" />
                <span>{lang === 'bn' ? 'কৌশলগত চ্যালেঞ্জ' : 'The Strategic Challenge'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {lang === 'bn' ? 'প্রাতিষ্ঠানিক প্রতিবন্ধকতা ও প্রেক্ষাপট' : 'Navigating High-Stakes Public Skepticism'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {project.challenge[lang]}
              </p>
            </div>

            {/* The Strategy */}
            <div className="p-8 sm:p-10 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#11813C] dark:text-[#22C55E]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#11813C]" />
                <span>{lang === 'bn' ? 'বার্লোর কৌশলগত সমাধান' : 'The Berlo Strategic Architecture'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {lang === 'bn' ? 'প্রামাণ্য ন্যারেটিভ ও অংশীজন সম্পৃক্ততা' : 'Evidence-Based Narrative Engineering'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {project.strategy[lang]}
              </p>
            </div>

            {/* Execution */}
            <div className="p-8 sm:p-10 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A305A] dark:text-[#60A5FA]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1A305A]" />
                <span>{lang === 'bn' ? 'মাঠপর্যায়ে বাস্তবায়ন' : 'Multi-Channel Tactical Execution'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {lang === 'bn' ? 'সমন্বিত কার্যক্রম ও মিডিয়া সক্রিয়করণ' : 'Synchronized Media & Policy Deployment'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {project.execution[lang]}
              </p>
            </div>

            {/* Results Checklist */}
            <div className="p-8 sm:p-10 bg-slate-900 dark:bg-[#07090D] border border-slate-800 dark:border-[#1F1F1F] text-white space-y-6 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#22C55E]">
                <Award className="w-4 h-4" />
                <span>{lang === 'bn' ? 'পরিমাপযোগ্য ফলাফল' : 'Verified Commercial Outcomes'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {lang === 'bn' ? 'ক্যাম্পেইনের চূড়ান্ত সাফল্য ও প্রভাব' : 'Demonstrable Business Impact'}
              </h3>

              <div className="space-y-3.5">
                {project.results[lang].map((res, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#0E1118] border border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200 leading-relaxed font-normal">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Quote Callout */}
            {project.quote && (
              <div className="p-8 sm:p-10 bg-slate-50 dark:bg-[#12141C] border-l-4 border-[#A302FF] border-y border-r border-slate-200 dark:border-[#222530] space-y-4">
                <Quote className="w-8 h-8 text-[#A302FF]/40" />
                <p className="text-base sm:text-lg italic font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  "{project.quote.text[lang]}"
                </p>
                <div className="pt-2">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {project.quote.author}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {project.quote.designation[lang]} • {project.clientName}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            {/* Project Quick Facts Card */}
            <div className="p-6 sm:p-8 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-md space-y-6">
              <h4 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-white/10">
                {lang === 'bn' ? 'প্রকল্প সারসংক্ষেপ' : 'Case Study Brief'}
              </h4>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 uppercase tracking-wider block font-semibold mb-1">
                    {lang === 'bn' ? 'ক্লায়েন্ট:' : 'Enterprise Client:'}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {project.clientName}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 uppercase tracking-wider block font-semibold mb-1">
                    {lang === 'bn' ? 'শিল্প খাত:' : 'Industry Sector:'}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {project.industry[lang]}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 uppercase tracking-wider block font-semibold mb-1">
                    {lang === 'bn' ? 'সময়সীমা:' : 'Campaign Duration:'}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {project.timeline}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 uppercase tracking-wider block font-semibold mb-1">
                    {lang === 'bn' ? 'প্রযুক্ত সেবাসমূহ:' : 'Capabilities Deployed:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {project.servicesProvided.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-[#202534] text-slate-700 dark:text-slate-300 font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/10">
                <Link
                  to={formatRoute('contact')}
                  className="w-full py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                >
                  <span>{lang === 'bn' ? 'অনুরূপ পরামর্শ নিন' : 'Request Case Briefing'}</span>
                  <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. OTHER CASE STUDIES                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 text-center sm:text-left">
          <h3 className="section-main-title text-slate-900 dark:text-white">
            {lang === 'bn' ? (
              <>অন্যান্য নির্বাচিত <span className="b-border">কেস স্টাডিজ</span></>
            ) : (
              <>Explore More <span className="b-border">Case Studies</span></>
            )}
          </h3>
          <Link
            to={formatRoute('work')}
            className="btn-berlo-outline self-center sm:self-auto"
          >
            <span>{lang === 'bn' ? 'সকল প্রকল্প' : 'All Projects'}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherProjects.map((p) => {
            const pImg =
              projectImages[p.id] ||
              '/images/berlo/media_1794917667301_ec42fff0.jpg';

            return (
              <Link
                key={p.id}
                to={formatRoute(`work/${p.slug}`)}
                className="bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] hover:border-[#A302FF] dark:hover:border-[#B833FF] transition-all group block shadow-xs overflow-hidden"
              >
                <div className="aspect-video overflow-hidden bg-slate-900 relative">
                  <img
                    src={pImg}
                    alt={p.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase">
                      {p.clientName}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-[11px] font-bold text-[#11813C] dark:text-[#22C55E] uppercase tracking-wider">
                    {p.industry[lang]}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] text-base leading-snug line-clamp-2">
                    {p.title[lang]}
                  </h4>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#A302FF] dark:text-[#B833FF]">
                    <span>{lang === 'bn' ? 'কেস স্টাডি দেখুন' : 'View Impact'}</span>
                    <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
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
                ? 'আপনার প্রতিষ্ঠানের সুনাম ও অবস্থানকে নতুন উচ্চতায় নিতে চান?'
                : 'Ready to Accelerate Your Enterprise Reputation?'}
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

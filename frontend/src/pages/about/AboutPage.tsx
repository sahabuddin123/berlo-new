import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { BRAND } from '../../config/brand';
import { Seo } from '../../components/common/Seo';
import {
  Compass,
  Target,
  ShieldCheck,
  Eye,
  Sparkles,
  Zap,
  CheckCircle2,
  Award,
  TrendingUp,
} from 'lucide-react';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';

export const AboutPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'আমাদের সম্পর্কে — বার্লো কমিউনিকেশন্স' : 'About Us & Corporate Heritage — Berlo Communications'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের ইতিহাস, ভিশন, মিশন ও মূলনীতিসমূহ। বাংলাদেশের শীর্ষস্থানীয় কর্পোরেট জনসংযোগ ও কৌশলগত যোগাযোগ সংস্থা।'
            : 'Explore Berlo Communications Ltd. history, vision, mission, and strategic corporate communications philosophy in Bangladesh.'
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
              {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A305A]/10 dark:bg-[#1A305A]/30 border border-[#1A305A]/20 dark:border-[#25427C] text-xs font-bold uppercase tracking-wider text-[#1A305A] dark:text-[#93C5FD]">
                <Award className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'কর্পোরেট জনসংযোগ ও কৌশলগত যোগাযোগ' : 'Strategic Corporate PR Agency'}</span>
              </div>

              {/* Title with .b-border */}
              <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
                {lang === 'bn' ? (
                  <>
                    সুনাম বিনির্মাণ ও কৌশলগত <span className="b-border">যোগাযোগের বিশ্বস্ত অংশীদার</span>
                  </>
                ) : (
                  <>
                    Engineering Enduring Reputation & <span className="b-border">Strategic Authority</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                {lang === 'bn'
                  ? 'বার্লো কমিউনিকেশন্স লিমিটেড বাংলাদেশের শীর্ষস্থানীয় কর্পোরেট জনসংযোগ ও স্ট্র্যাটেজিক কমিউনিকেশন এজেন্সি। উদ্ভাবনী ধারণা, সম্পাদকীয় অন্তর্দৃষ্টি ও ফলপ্রসূ অ্যাক্সেসের মাধ্যমে আমরা শীর্ষ প্রতিষ্ঠানের টেকসই সুনাম রক্ষা করি।'
                  : 'Berlo Communications Ltd. is one of Bangladesh’s premier corporate PR agencies, combining newsroom narrative engineering with executive-level strategic access to protect, shape, and accelerate corporate reputation.'}
              </p>

              {/* CTAs */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to={formatRoute('contact')}
                  className="px-6 py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold tracking-widest uppercase transition-all shadow-lg shadow-purple-900/20 rounded-none inline-flex items-center gap-2"
                >
                  <span>{lang === 'bn' ? 'পরামর্শ বুক করুন' : 'Book Free Consultation'}</span>
                  <FaArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  to={formatRoute('leadership')}
                  className="btn-berlo-outline"
                >
                  <span>{lang === 'bn' ? 'নেতৃত্ব দল দেখুন' : 'Meet Leadership'}</span>
                </Link>
              </div>
            </div>

            {/* Quick Metrics Badge Card */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="p-6 bg-white dark:bg-[#12141C] border border-slate-200 dark:border-[#222530] text-center shadow-md">
                <div className="text-3xl sm:text-4xl font-black text-[#A302FF] dark:text-[#B833FF]">2018</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-2">
                  {lang === 'bn' ? 'প্রতিষ্ঠার বছর' : 'Year Founded'}
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-[#12141C] border border-slate-200 dark:border-[#222530] text-center shadow-md">
                <div className="text-3xl sm:text-4xl font-black text-[#11813C] dark:text-[#22C55E]">250+</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-2">
                  {lang === 'bn' ? 'সফল ক্যাম্পেইন' : 'Campaigns'}
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-[#12141C] border border-slate-200 dark:border-[#222530] text-center shadow-md">
                <div className="text-3xl sm:text-4xl font-black text-[#1A305A] dark:text-[#60A5FA]">100+</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-2">
                  {lang === 'bn' ? 'মিডিয়া কানেক্ট' : 'Newsrooms'}
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-[#12141C] border border-slate-200 dark:border-[#222530] text-center shadow-md">
                <div className="text-3xl sm:text-4xl font-black text-[#00A896] dark:text-[#14B8A6]">98.7%</div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-2">
                  {lang === 'bn' ? 'ক্লায়েন্ট সন্তুষ্টি' : 'Retention Rate'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. AGENCY STORY & PHOTOGRAPHY                                            */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Ambient Glow and Offset Frame */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group max-w-[500px] mx-auto lg:mx-0">
              {/* Ambient Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#1A305A]/30 via-[#A302FF]/30 to-[#11813C]/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Offset Accent */}
              <div className="absolute -bottom-3 -left-3 w-full h-full rounded-2xl bg-gradient-to-br from-[#A302FF]/40 to-[#11813C]/40 pointer-events-none opacity-80" />

              {/* Main Photo */}
              <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 bg-white dark:bg-[#12141C] shadow-2xl">
                <img
                  src="/images/berlo/about-image.jpg"
                  alt="Berlo Communications Agency Team"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs uppercase tracking-wider text-[#A302FF] dark:text-[#B833FF] font-bold">
                    {lang === 'bn' ? 'কর্পোরেট প্রধান কার্যালয়' : 'Corporate Headquarters'}
                  </div>
                  <div className="text-sm font-semibold mt-1">
                    {lang === 'bn'
                      ? 'অ্যাপার্টমেন্ট বি৩, বাড়ি ৩২/৩৪, রোড ০৭, নিকেতন, গুলশান-১, ঢাকা'
                      : 'Apartment B3, House 32/34, Road 07, Niketon, Gulshan-1, Dhaka'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story Text */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] text-xs font-bold uppercase tracking-wider">
              {lang === 'bn' ? 'আমাদের ইতিহাস ও অগ্রযাত্রা' : 'Our Story & Heritage'}
            </div>

            <h2 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>
                  বাংলাদেশের দ্রুততম বর্ধনশীল অর্থনীতির <span className="b-border">নির্ভরযোগ্য কণ্ঠস্বর</span>
                </>
              ) : (
                <>
                  The Trusted Strategic PR Voice Behind <span className="b-border">Market Pioneers</span>
                </>
              )}
            </h2>

            <div className="space-y-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              <p>
                {lang === 'bn'
                  ? '২০১৮ সালে প্রতিষ্ঠিত বার্লো কমিউনিকেশন্স লিমিটেড বাংলাদেশের করপোরেট সংস্কৃতিতে আধুনিক ও দায়িত্বশীল জনসংযোগের নতুন দিগন্ত উন্মোচন করেছে। গতানুগতিক প্রেস বিজ্ঞপ্তি বিতরণের সীমানা পেরিয়ে আমরা সি-সুইট এক্সিকিউটিভদের চিন্তাভাবনা ও প্রাতিষ্ঠানিক লক্ষ্যকে জাতীয় পর্যায়ে রূপদান করি।'
                  : 'Founded in 2018, Berlo Communications Ltd. emerged to redefine enterprise narrative engineering in Bangladesh. Transcending superficial PR clippings, we embed deeply into executive decision-rooms, synchronizing communications architecture directly with commercial milestones.'}
              </p>
              <p>
                {lang === 'bn'
                  ? 'আমরা দৃঢ়ভাবে বিশ্বাস করি যে টেকসই করপোরেট সুনাম শুধুমাত্র কোনো ইভেন্টের মধ্যে সীমাবদ্ধ নয়; বরং এটি দীর্ঘমেয়াদী গবেষণা, নৈতিক সাংবাদিকতা চর্চা এবং সঠিক সময়ে সঠিক বার্তা পৌঁছে দেওয়ার এক সমন্বিত শিল্প।'
                  : 'We operate on a singular conviction: institutional reputation is not built through occasional press releases, but through rigorous data-backed narrative strategy, deep editorial respect, and decisive crisis readiness.'}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to={formatRoute('leadership')}
                className="btn-berlo-outline"
              >
                <span>{lang === 'bn' ? 'আমাদের নেতৃত্ব দলের সাথে পরিচিত হোন' : 'Meet Our Leadership Team'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. VISION & MISSION (Exact Corner Border Accents)                        */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card with Top-Left Accent */}
          <div className="service-eq-card relative top-left-border-accent">
            <div className="relative z-10 bg-white dark:bg-[#161616] p-8 sm:p-12 border border-slate-200 dark:border-[#242424] shadow-md hover:border-[#A302FF] dark:hover:border-[#B833FF] transition-all duration-300 h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#1A305A] text-white flex items-center justify-center shadow-lg shadow-[#1A305A]/30">
                  <Compass className="w-7 h-7" />
                </div>
                <div className="text-xs uppercase tracking-wider font-bold text-[#A302FF] dark:text-[#B833FF]">
                  {lang === 'bn' ? 'আমাদের দূরদর্শিতা' : 'Our Vision'}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {lang === 'bn' ? 'বৈশ্বিক মানদণ্ডে দেশীয় সুনাম রক্ষা' : 'Setting Global Benchmarks in Corporate Reputation'}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {lang === 'bn'
                    ? 'দক্ষিণ এশিয়ার অন্যতম শীর্ষস্থানীয় স্ট্র্যাটেজিক কমিউনিকেশন সংস্থা হিসেবে প্রতিষ্ঠিত হওয়া, যা নীতিগত সততা, উদ্ভাবনী চিন্তা এবং সর্বোচ্চ প্রামাণ্য ফলাফলের মাধ্যমে ক্লায়েন্টের প্রাতিষ্ঠানিক মর্যাদা ও মূল্য বৃদ্ধি করে।'
                    : 'To stand as South Asia’s foremost strategic communications counsel, revered for transformative narrative engineering, crisis fortitude, and demonstrable enterprise value creation.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-2 text-xs font-semibold text-[#1A305A] dark:text-[#60A5FA]">
                <TrendingUp className="w-4 h-4" />
                <span>{lang === 'bn' ? 'দূরদর্শী দৃষ্টিভঙ্গি ও দীর্ঘমেয়াদী প্রাতিষ্ঠানিক লক্ষ্য' : 'Forward-looking, multi-decade strategic outlook'}</span>
              </div>
            </div>
          </div>

          {/* Mission Card with Bottom-Left Accent */}
          <div className="service-eq-card relative bottom-left-border-accent">
            <div className="relative z-10 bg-white dark:bg-[#161616] p-8 sm:p-12 border border-slate-200 dark:border-[#242424] shadow-md hover:border-[#11813C] dark:hover:border-[#22C55E] transition-all duration-300 h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#11813C] text-white flex items-center justify-center shadow-lg shadow-green-600/30">
                  <Target className="w-7 h-7" />
                </div>
                <div className="text-xs uppercase tracking-wider font-bold text-[#11813C] dark:text-[#22C55E]">
                  {lang === 'bn' ? 'আমাদের মূল মিশন' : 'Our Mission'}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {lang === 'bn' ? 'কৌশলগত সংযোগ ও প্রামাণ্য সমাধান' : 'Delivering Measurable PR Power & High-Trust Narrative'}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {lang === 'bn'
                    ? 'শীর্ষস্থানীয় প্রতিষ্ঠানসমূহকে সর্বোচ্চ মানের পিআর কৌশল, গণমাধ্যম সংযোগ, সংকটকালীন সুরক্ষা এবং বিশ্লেষণধর্মী সেবা প্রদান করা—যাতে তারা সমাজে প্রভাবশালী অবস্থান বজায় রেখে নিরাপদ অগ্রযাত্রা নিশ্চিত করতে পারে।'
                    : 'To empower forward-thinking corporations with elite media intelligence, bulletproof crisis defense, and compelling brand storytelling that commands authority and shapes public sentiment.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-2 text-xs font-semibold text-[#11813C] dark:text-[#22C55E]">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'bn' ? 'নিখুঁত বাস্তবায়ন ও সর্বোচ্চ পেশাদারিত্ব' : 'Precision execution with zero compromise on ethics'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. CORE VALUES                                                           */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] text-xs font-bold uppercase tracking-wider">
            {lang === 'bn' ? 'আমাদের মূলনীতি' : 'Foundational Ethics'}
          </div>
          <h2 className="section-main-title text-slate-900 dark:text-white text-center">
            {lang === 'bn' ? (
              <>বার্লোর পরিচালনাগত <span className="b-border">মূল আদর্শ ও নীতি</span></>
            ) : (
              <>The Guiding Principles of <span className="b-border">Berlo Excellence</span></>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {lang === 'bn'
              ? 'আমরা প্রতিটি ক্লায়েন্ট সম্পর্কের ক্ষেত্রে সততা, পেশাদারিত্ব ও প্রামাণ্য ফলাফলের ওপর আপসহীন গুরুত্ব দিই।'
              : 'Our operational standards are shaped by rigorous ethical boundaries, uncompromising research, and strategic transparency.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              color: 'text-[#A302FF]',
              bg: 'bg-[#A302FF]/10',
              title: lang === 'bn' ? 'নৈতিক সততা' : 'Uncompromising Integrity',
              desc: lang === 'bn' ? 'সাংবাদিকতার নীতি ও সত্যনিষ্ঠ তথ্যের ভিত্তিতে স্বচ্ছ ও গ্রহণযোগ্য যোগাযোগ।' : 'Truth-grounded storytelling adhering strictly to ethical newsroom codes and client trust.',
            },
            {
              icon: Eye,
              color: 'text-[#11813C]',
              bg: 'bg-[#11813C]/10',
              title: lang === 'bn' ? 'কৌশলগত দূরদর্শিতা' : 'Strategic Foresight',
              desc: lang === 'bn' ? 'সম্ভাব্য সংকট ও সামাজিক প্রতিক্রিয়া আগে থেকেই বিশ্লেষণ করে প্রতিরক্ষামূলক পরিকল্পনা।' : 'Predictive sentiment modeling that preempts public vulnerability before it escalates.',
            },
            {
              icon: Sparkles,
              color: 'text-[#1A305A] dark:text-[#60A5FA]',
              bg: 'bg-[#1A305A]/10 dark:bg-[#1A305A]/30',
              title: lang === 'bn' ? 'উদ্ভাবনী উৎকর্ষ' : 'Innovative Distinction',
              desc: lang === 'bn' ? 'সৃজনশীল ন্যারেটিভ ও মাল্টিমিডিয়া উপাদানের মাধ্যমে ব্র্যান্ডকে শীর্ষে উপস্থাপন।' : 'Creative narrative architecture and multimedia packaging that breaks through corporate clutter.',
            },
            {
              icon: Zap,
              color: 'text-[#00A896]',
              bg: 'bg-[#00A896]/10',
              title: lang === 'bn' ? 'দ্রুত কার্যকরীকরণ' : 'Decisive Speed',
              desc: lang === 'bn' ? 'যেকোনো জাতীয় ইস্যু বা সংকটে ৬০ মিনিটের মধ্যে ওয়ার-রুম সক্রিয় করার সক্ষমতা।' : '60-minute crisis war-room activation with prime-time syndication reach across Bangladesh.',
            },
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] p-6 sm:p-8 hover:border-[#A302FF] dark:hover:border-[#B833FF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. STRATEGIC PILLARS (Modern Agency Scrim Container)                     */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-900 dark:bg-[#07090D] border-y border-slate-800 dark:border-[#1F1F1F] text-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11813C]/20 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
              {lang === 'bn' ? 'কৌশলগত ভিত্তি' : 'Core Agency Pillars'}
            </div>
            <h2 className="section-main-title text-white text-center">
              {lang === 'bn' ? (
                <>বার্লোর ৪টি অবিচ্ছেদ্য <span className="b-border">সক্ষমতা স্তম্ভ</span></>
              ) : (
                <>The Four Pillars of <span className="b-border">Berlo Communications</span></>
              )}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              {lang === 'bn'
                ? 'আমাদের প্রতিটি কার্যক্রম এই চারটি মৌলিক স্তম্ভের ওপর দাঁড়িয়ে যা প্রাতিষ্ঠানিক লক্ষ্য অর্জনে নিশ্চিত ফল দেয়।'
                : 'Every campaign, crisis deployment, and brand narrative rests upon these foundational capabilities.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {BRAND.pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                className="p-8 sm:p-10 bg-[#0E1118] border border-slate-800 hover:border-[#A302FF] transition-all duration-300 space-y-4 group"
              >
                <div className="text-xs font-mono font-bold text-[#A302FF] dark:text-[#B833FF] uppercase tracking-wider">
                  0{idx + 1}. PILLAR
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#B833FF] transition-colors">
                  {pillar.title[lang]}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {pillar.description[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. THE BERLO STANDARD (Why Partner With Us)                              */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-[#12141C] border border-slate-200 dark:border-[#222530] p-8 sm:p-14 lg:p-16 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] text-xs font-bold uppercase tracking-wider">
                {lang === 'bn' ? 'পার্থক্য যেখানে' : 'The Berlo Standard'}
              </div>

              <h2 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
                {lang === 'bn' ? (
                  <>আমরা কেন নিছক পিআর এজেন্সি নই, <span className="b-border">কৌশলগত অংশীদার</span></>
                ) : (
                  <>Why Leading Enterprises Partner With Us as <span className="b-border">Strategic Counsel</span></>
                )}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {lang === 'bn'
                  ? 'গতানুগতিক জনসংযোগ সংস্থাগুলো শুধুমাত্র ইভেন্ট আয়োজন কিংবা বিজ্ঞপ্তি বিলি করে দায়িত্ব শেষ মনে করে। বার্লো আপনার সি-সুইটের সাথে এক টেবিলে বসে দীর্ঘমেয়াদী ব্যবসায়িক লক্ষ্য, বাজারের গতিবিধি ও বিনিয়োগকারী আস্থার সমন্বয়ে গল্প তৈরি করে।'
                  : 'Transactional PR agencies blast releases and count vanity clippings. Berlo sits inside your leadership room, aligning narrative engineering directly with market capitalization, investor confidence, and consumer loyalty.'}
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <Link
                  to={formatRoute('contact')}
                  className="px-6 py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold tracking-widest uppercase transition-all shadow-lg shadow-purple-900/20 rounded-none inline-flex items-center gap-2"
                >
                  <span>{lang === 'bn' ? 'পরামর্শ সেশন বুক করুন' : 'Schedule Strategy Session'}</span>
                  <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              {[
                {
                  title: lang === 'bn' ? 'সরাসরি পার্টনার তদারকি' : 'Direct Senior Director Involvement',
                  desc: lang === 'bn' ? 'কোনো শিক্ষানবিশের ওপর দায়িত্ব অর্পণ নয়; আমাদের অভিজ্ঞ ডিরেক্টররাই প্রতিটি অ্যাকাউন্টের সার্বক্ষণিক তদারকি করেন।' : 'No junior account hand-offs; senior agency directors lead strategy on every account.',
                },
                {
                  title: lang === 'bn' ? 'নিরপেক্ষ সাংবাদিকতার গভীর শ্রদ্ধা' : 'Uncompromising Newsroom Respect',
                  desc: lang === 'bn' ? 'জাতীয় সম্পাদকদের সাথে নীতিগত সম্পর্ক যা বিশ্বাসযোগ্য ও প্রভাবশালী সংবাদ কাভারেজ নিশ্চিত করে।' : 'Deep, ethical credibility with national editors ensuring high-prestige editorial pickup.',
                },
                {
                  title: lang === 'bn' ? 'পরিমাপযোগ্য ব্যবসায়িক ফলাফল' : 'Data-Backed Business ROI',
                  desc: lang === 'bn' ? 'প্রতিটি ক্যাম্পেইনের ফলাফল স্বাধীন পরিসংখ্যান, সেন্টিমেন্ট স্কোর ও ব্যবসায়িক লক্ষ্যের সাথে পরিমাপ করা হয়।' : 'Every campaign is measured against real commercial outcomes and verified sentiment metrics.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 bg-white dark:bg-[#161922] border border-slate-200 dark:border-[#262B38] flex items-start gap-4 shadow-xs"
                >
                  <div className="w-9 h-9 rounded-full bg-[#11813C]/10 text-[#11813C] dark:bg-[#11813C]/25 dark:text-[#22C55E] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. BOTTOM CTA CALLOUT                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 bg-gradient-to-r from-[#1A305A] via-[#152340] to-[#0D182E] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'আপনার প্রতিষ্ঠানের জন্য একটি কৌশলগত পিআর পরিকল্পনা চান?'
                : 'Ready to Architect an Enduring Corporate Reputation?'}
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

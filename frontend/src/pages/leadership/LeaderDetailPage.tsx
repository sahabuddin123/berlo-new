import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { teamData } from '../../data/teamData';
import { Seo } from '../../components/common/Seo';
import { LinkedInIcon } from '../../components/common/SocialIcons';
import { Mail, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { FaArrowRight, FaChevronRight, FaArrowLeft } from 'react-icons/fa';

export const LeaderDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, formatRoute } = useLanguage();

  const leader = teamData.find((m) => m.slug === slug);

  const memberImages: Record<string, string> = {
    'shakhawat-ullah': '/images/berlo/media_1794919816651_536d2857.jpg',
    'md-kabir-hossain': '/images/berlo/media_1794919910744_ebc54319.jpg',
    'akm-zamshed-uddin': '/images/berlo/media_1794919261279_75e33998.jpg',
    'ashiqur-rahman': '/images/berlo/media_1794914012084_4405045d.jpg',
    'tahmina-akter': '/images/berlo/media_1794915460700_983f5d15.jpg',
    'farhana-yasmin': '/images/berlo/media_1794919525086_daefc098.jpg',
  };

  if (!leader) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="section-main-title text-slate-900 dark:text-white">
          {lang === 'bn' ? 'প্রোফাইল পাওয়া যায়নি' : 'Leader Profile Not Found'}
        </h1>
        <Link
          to={formatRoute('leadership')}
          className="px-6 py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none inline-flex items-center gap-2"
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>{lang === 'bn' ? 'নেতৃত্ব তালিকায় ফিরে যান' : 'Back to Leadership'}</span>
        </Link>
      </div>
    );
  }

  const portrait =
    memberImages[leader.slug] ||
    '/images/berlo/media_1794919816651_536d2857.jpg';

  const otherLeaders = teamData.filter((m) => m.id !== leader.id && m.isLeadership).slice(0, 2);

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={`${leader.name[lang]} — ${leader.role[lang]} | Berlo Communications`}
        description={leader.bio[lang]}
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
            <Link to={formatRoute('leadership')} className="hover:text-[#A302FF] transition-colors">
              {lang === 'bn' ? 'নেতৃত্ব' : 'Leadership'}
            </Link>
            <FaChevronRight className="w-2.5 h-2.5 text-slate-400" />
            <span className="text-[#A302FF] dark:text-[#B833FF]">
              {leader.name[lang]}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Portrait Visual */}
            <div className="lg:col-span-5">
              <div className="relative group max-w-[420px] mx-auto lg:mx-0">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#1A305A]/30 via-[#A302FF]/30 to-[#11813C]/30 blur-2xl opacity-75 pointer-events-none" />
                <div className="relative z-10 aspect-[3/3.8] overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl">
                  <img
                    src={portrait}
                    alt={leader.name[lang]}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="px-3 py-1 bg-[#A302FF] text-white text-[10px] font-bold uppercase tracking-wider">
                      {leader.experienceYears}+ {lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}
                    </span>
                    <h2 className="text-2xl font-bold mt-2">{leader.name[lang]}</h2>
                    <p className="text-xs text-slate-200 font-semibold">{leader.role[lang]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Core Info */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'সিনিয়র কাউন্সিল প্রোফাইল' : 'Leadership Council Profile'}</span>
              </div>

              <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
                {leader.name[lang]}
              </h1>

              <p className="text-lg font-bold text-[#A302FF] dark:text-[#B833FF]">
                {leader.role[lang]}
              </p>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {leader.bio[lang]}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                {leader.social.email && (
                  <a
                    href={`mailto:${leader.social.email}`}
                    className="px-6 py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none inline-flex items-center gap-2 shadow-lg shadow-purple-900/20"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'সরাসরি ইমেইল পাঠান' : 'Direct Email'}</span>
                  </a>
                )}
                {leader.social.linkedin && (
                  <a
                    href={leader.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-berlo-outline inline-flex items-center gap-2"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 text-[#0077B5]" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. FULL BIOGRAPHY & EXPERTISE                                            */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="p-8 sm:p-12 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-white/10">
                {lang === 'bn' ? 'পূর্ণাঙ্গ পরিচিতি ও ভূমিকা' : 'Executive Biography & Strategic Stewardship'}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {leader.fullBio[lang]}
              </p>
            </div>

            <div className="p-8 sm:p-12 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-white/10">
                {lang === 'bn' ? 'বিশেষজ্ঞতা ও সক্ষমতা' : 'Core Strategic Specializations'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {leader.expertise.map((exp, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-[#202534] border border-slate-100 dark:border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#11813C] dark:text-[#22C55E] shrink-0" />
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{exp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-6">
              <h4 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-white/10">
                {lang === 'bn' ? 'একাডেমিক পটভূমি' : 'Academic Credentials'}
              </h4>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1A305A]/10 text-[#1A305A] dark:bg-[#1A305A]/30 dark:text-[#93C5FD] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {leader.education[lang]}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {lang === 'bn' ? 'উচ্চশিক্ষা ও পেশাদার প্রশিক্ষণ' : 'Post-Graduate Academic Foundation'}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-900 dark:bg-[#0E1118] border border-slate-800 text-white space-y-4">
              <h4 className="text-base font-bold text-white uppercase tracking-wider">
                {lang === 'bn' ? 'সরাসরি পরামর্শ চান?' : 'Direct Advisory'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'bn'
                  ? 'আপনার প্রতিষ্ঠানের কৌশলগত পরিকল্পনা বা সংকট মোকাবিলায় সরাসরি আমাদের সাথে যোগাযোগ করুন।'
                  : 'Schedule an executive strategic brief with our senior counsel.'}
              </p>
              <Link
                to={formatRoute('contact')}
                className="w-full py-3 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-2"
              >
                <span>{lang === 'bn' ? 'পরামর্শ বুক করুন' : 'Book Strategic Session'}</span>
                <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. OTHER LEADERS                                                         */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 text-center sm:text-left">
          <h3 className="section-main-title text-slate-900 dark:text-white">
            {lang === 'bn' ? (
              <>অন্যান্য সিনিয়র <span className="b-border">কাউন্সিল সদস্য</span></>
            ) : (
              <>Other Executive <span className="b-border">Directors</span></>
            )}
          </h3>
          <Link
            to={formatRoute('leadership')}
            className="btn-berlo-outline self-center sm:self-auto"
          >
            <span>{lang === 'bn' ? 'সকল নেতৃত্ব' : 'All Leadership'}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherLeaders.map((ol) => {
            const olImg =
              memberImages[ol.slug] ||
              '/images/berlo/media_1794919816651_536d2857.jpg';

            return (
              <Link
                key={ol.id}
                to={formatRoute(`leadership/${ol.slug}`)}
                className="p-6 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] hover:border-[#A302FF] dark:hover:border-[#B833FF] transition-all flex items-center gap-6 group"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-900 shrink-0 border border-slate-200 dark:border-white/10">
                  <img
                    src={olImg}
                    alt={ol.name[lang]}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#11813C] dark:text-[#22C55E] uppercase tracking-wider">
                    {ol.experienceYears}+ Yrs Exp
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors">
                    {ol.name[lang]}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {ol.role[lang]}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

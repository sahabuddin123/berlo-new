import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { teamData, TeamMember } from '../../data/teamData';
import { getPublicLeadership } from '../../services/publicApi';
import { Seo } from '../../components/common/Seo';
import { Award, ShieldCheck } from 'lucide-react';
import { FaArrowRight, FaChevronRight, FaEnvelope } from 'react-icons/fa';

export const LeadershipPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();
  const [activeDepartment, setActiveDepartment] = useState<string>('all');
  const [leadershipList, setLeadershipList] = useState<TeamMember[]>(
    teamData.filter((m) => m.isLeadership)
  );

  useEffect(() => {
    let isMounted = true;
    getPublicLeadership().then((data) => {
      if (isMounted && data && data.length > 0) {
        setLeadershipList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Real team portraits from public/images/berlo/
  const memberImages: Record<string, string> = {
    'shakhawat-ullah': '/images/berlo/media_1794919816651_536d2857.jpg',
    'md-kabir-hossain': '/images/berlo/media_1794919910744_ebc54319.jpg',
    'akm-zamshed-uddin': '/images/berlo/media_1794919261279_75e33998.jpg',
    'ashiqur-rahman': '/images/berlo/media_1794914012084_4405045d.jpg',
    'tahmina-akter': '/images/berlo/media_1794915460700_983f5d15.jpg',
    'farhana-yasmin': '/images/berlo/media_1794919525086_daefc098.jpg',
  };

  const departments = [
    { key: 'all', en: 'All Leadership', bn: 'সকল নেতৃত্ব' },
    { key: 'strategy', en: 'Strategic Planning & Advisory', bn: 'কৌশলগত পরিকল্পনা' },
    { key: 'pr', en: 'National Media PR', bn: 'ন্যাশনাল মিডিয়া পিআর' },
    { key: 'events', en: 'Events & Activation', bn: 'ইভেন্ট ও অ্যাক্টিভেশন' },
  ];

  const leaders = leadershipList.filter(
    (m) =>
      m.isLeadership &&
      (activeDepartment === 'all' || m.department === activeDepartment)
  );

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'আমাদের নেতৃত্ব দল — বার্লো কমিউনিকেশন্স' : 'Executive Leadership Council — Berlo Communications'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের সিনিয়র এক্সিকিউটিভ কাউন্সিল ও পরিচালনা পর্ষদ।'
            : 'Meet the executive leadership council steering Berlo Communications Ltd.'
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
              {lang === 'bn' ? 'নেতৃত্ব' : 'Leadership'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-5 text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A305A]/10 text-[#1A305A] dark:text-[#93C5FD] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সিনিয়র এক্সিকিউটিভ কাউন্সিল' : 'Executive Leadership Council'}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>
                  অভিজ্ঞ নীতিনির্ধারক ও <span className="b-border">কৌশলগত নেতৃত্ব</span>
                </>
              ) : (
                <>
                  Seasoned Strategists Driving <span className="b-border">Client Success</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'আমাদের নেতৃত্ব কাউন্সিল গণমাধ্যম, কর্পোরেট কমিউনিকেশন ও সংকট ব্যবস্থাপনায় দীর্ঘ দেড় দশকের অভিজ্ঞতাসম্পন্ন। আমরা সরাসরি প্রতিটি ক্লায়েন্টের কৌশলগত পরিকল্পনা ও বাস্তবায়নে যুক্ত থাকি।'
                : 'At Berlo, senior directors personally steer each corporate account. Meet the veterans shaping national narrative architecture and boardroom reputation across Bangladesh.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. DEPARTMENT FILTER TABS                                                */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-3 border-b border-slate-200 dark:border-white/10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {departments.map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDepartment(d.key)}
              type="button"
              className={`shrink-0 px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all cursor-pointer rounded-none ${
                activeDepartment === d.key
                  ? 'bg-[#A302FF] text-white shadow-lg shadow-purple-900/30 ring-1 ring-purple-400/30'
                  : 'bg-white dark:bg-[#141720] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E2330] border border-slate-200 dark:border-white/5'
              }`}
            >
              {lang === 'bn' ? d.bn : d.en}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. EDITORIAL PORTRAIT CARDS GRID (Matching Home Page)                     */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {leaders.map((leader) => {
            const portrait =
              memberImages[leader.slug] ||
              '/images/berlo/media_1794919816651_536d2857.jpg';

            return (
              <div
                key={leader.id}
                className="bg-white dark:bg-[#0D0F14] border border-slate-200 dark:border-[#1F232D] hover:border-[#A302FF] transition-all duration-500 overflow-hidden shadow-lg dark:shadow-2xl group flex flex-col justify-between relative"
              >
                {/* Portrait Visual: Aspect 3:3.8 */}
                <div className="relative aspect-[3/3.8] overflow-hidden bg-slate-900 dark:bg-[#0A0C10]">
                  <img
                    src={portrait}
                    alt={leader.name[lang]}
                    className="w-full h-full object-cover object-top filter grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="absolute bottom-4 inset-x-5 z-10 space-y-1">
                    <Link
                      to={formatRoute(`leadership/${leader.slug}`)}
                      className="text-[22px] font-bold text-white group-hover:text-[#B833FF] transition-colors tracking-tight block"
                    >
                      {leader.name[lang]}
                    </Link>
                    <div className="text-xs font-semibold text-slate-200 tracking-wide">
                      {leader.role[lang]}
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="p-4 px-5 bg-white dark:bg-[#0D0F14] border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {leader.experienceYears}+ {lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Yrs Exp'}
                  </span>

                  <div className="flex items-center gap-2">
                    {leader.social.email && (
                      <a
                        href={`mailto:${leader.social.email}`}
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#181B23] border border-slate-200 dark:border-white/10 hover:border-[#A302FF] hover:bg-[#A302FF] text-slate-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all"
                        aria-label={`Email ${leader.name[lang]}`}
                        title={`Email ${leader.name[lang]}`}
                      >
                        <FaEnvelope className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <Link
                      to={formatRoute(`leadership/${leader.slug}`)}
                      className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#181B23] border border-slate-200 dark:border-white/10 hover:border-[#A302FF] hover:bg-[#A302FF] text-slate-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all"
                      aria-label="View Bio"
                      title="View Bio"
                    >
                      <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. GOVERNANCE PLEDGE CALLOUT                                             */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 bg-slate-900 dark:bg-[#0E1118] border border-slate-800 text-white space-y-6 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A302FF]/20 text-[#B833FF] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'নেতৃত্বের প্রতিশ্রুতি' : 'Governance & Accountability Pledge'}</span>
          </div>

          <h3 className="section-main-title text-white">
            {lang === 'bn' ? (
              <>সরাসরি সিনিয়র কাউন্সিল তদারকি: <span className="b-border">কোনো জুনিয়র হ্যান্ড-অফ নেই</span></>
            ) : (
              <>Direct Senior Counsel: <span className="b-border">The Directors You Meet Lead Your Account</span></>
            )}
          </h3>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-normal">
            {lang === 'bn'
              ? 'বার্লোতে আমরা সেই গতানুগতিক এজেন্সি মডেল প্রত্যাখ্যান করি যেখানে পিচিং করেন অভিজ্ঞ ব্যক্তিরা কিন্তু বাস্তবায়নে নামিয়ে দেওয়া হয় শিক্ষানবিশদের। আমাদের প্রতিটি করপোরেট ক্লায়েন্ট, মিডিয়া যুদ্ধ ও সংকটকালীন ওয়ার-রুম সিনিয়র পার্টনাররা ব্যক্তিগতভাবে তদারকি করেন।'
              : 'At Berlo, we categorically reject the agency model of pitching with veteran partners and delegating execution to junior novices. Every corporate campaign, crisis war-room, and media announcement is guided personally by our leadership council.'}
          </p>
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
                ? 'আমাদের সিনিয়র পরিচালকদের সাথে একটি প্রাথমিক আলোচনা চান?'
                : 'Request an Executive Strategic Advisory Briefing'}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {lang === 'bn'
                ? 'আপনার প্রতিষ্ঠানের লক্ষ্য ও সম্ভাব্য পিআর কার্যক্রম নিয়ে আজই সরাসরি কথা বলুন।'
                : 'Connect directly with our leadership council for a confidential briefing tailored to your organization.'}
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

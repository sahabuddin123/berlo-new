import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { teamData, TeamMember } from '../../data/teamData';
import { getPublicTeam } from '../../services/publicApi';
import { Seo } from '../../components/common/Seo';
import { Award } from 'lucide-react';
import { FaArrowRight, FaChevronRight, FaEnvelope } from 'react-icons/fa';

export const TeamPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();
  const [activeDepartment, setActiveDepartment] = useState<string>('all');
  const [team, setTeam] = useState<TeamMember[]>(teamData);

  useEffect(() => {
    let isMounted = true;
    getPublicTeam().then((data) => {
      if (isMounted && data && data.length > 0) {
        setTeam(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const memberImages: Record<string, string> = {
    'shakhawat-ullah': '/images/berlo/media_1794919816651_536d2857.jpg',
    'md-kabir-hossain': '/images/berlo/media_1794919910744_ebc54319.jpg',
    'akm-zamshed-uddin': '/images/berlo/media_1794919261279_75e33998.jpg',
    'ashiqur-rahman': '/images/berlo/media_1794914012084_4405045d.jpg',
    'tahmina-akter': '/images/berlo/media_1794915460700_983f5d15.jpg',
    'farhana-yasmin': '/images/berlo/media_1794919525086_daefc098.jpg',
  };

  const departments = [
    { key: 'all', en: 'All Team Members', bn: 'সকল সদস্য' },
    { key: 'strategy', en: 'Strategic Planning & Advisory', bn: 'কৌশলগত পরিকল্পনা' },
    { key: 'pr', en: 'National Media PR', bn: 'ন্যাশনাল মিডিয়া পিআর' },
    { key: 'events', en: 'Events & Activation', bn: 'ইভেন্ট ও অ্যাক্টিভেশন' },
    { key: 'creative', en: 'Creative & Visual Art', bn: 'ভিজ্যুয়াল ক্রিয়েটিভ' },
  ];

  const filteredTeam = team.filter(
    (m) => activeDepartment === 'all' || m.department === activeDepartment
  );

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'আমাদের কৌশলগত টিম — বার্লো কমিউনিকেশন্স' : 'Our Strategic Team — Berlo Communications'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের জনসংযোগ, কৌশল ও ক্রিয়েটিভ বিশেষজ্ঞ দল।'
            : 'Meet the interdisciplinary PR practitioners, narrative strategists, and creative designers at Berlo Communications.'
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
              {lang === 'bn' ? 'আমাদের টিম' : 'Our Team'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-5 text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'কৌশলগত ও সৃজনশীল টিম' : 'Strategic & Creative Specialists'}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>
                  দক্ষ বিশেষজ্ঞ ও নিবেদিত <span className="b-border">কমিউনিকেটরস</span>
                </>
              ) : (
                <>
                  The Multidisciplinary Minds Behind <span className="b-border">Every Campaign</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'গবেষণা, গণমাধ্যম সম্পর্ক, সংকট নিরসন এবং ভিজ্যুয়াল আর্টের সমন্বয়ে গঠিত আমাদের দক্ষ দল আপনার ব্র্যান্ডকে বাজারে এক অনন্য মর্যাদায় পৌঁছে দিতে নিরলস কাজ করে।'
                : 'Combining newsroom seasoned journalists, policy researchers, and visual designers into an agile operational force dedicated to your enterprise.'}
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
      {/* 03. EDITORIAL TEAM PORTRAITS GRID                                         */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTeam.map((member) => {
            const portrait =
              memberImages[member.slug] ||
              '/images/berlo/media_1794919816651_536d2857.jpg';

            return (
              <div
                key={member.id}
                className="bg-white dark:bg-[#0D0F14] border border-slate-200 dark:border-[#1F232D] hover:border-[#A302FF] transition-all duration-500 overflow-hidden shadow-lg dark:shadow-2xl group flex flex-col justify-between relative"
              >
                {/* Portrait Visual: Aspect 3:3.8 */}
                <div className="relative aspect-[3/3.8] overflow-hidden bg-slate-900 dark:bg-[#0A0C10]">
                  <img
                    src={portrait}
                    alt={member.name[lang]}
                    className="w-full h-full object-cover object-top filter grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="absolute bottom-4 inset-x-5 z-10 space-y-1">
                    <h3 className="text-[22px] font-bold text-white group-hover:text-[#B833FF] transition-colors tracking-tight">
                      {member.name[lang]}
                    </h3>
                    <div className="text-xs font-semibold text-slate-200 tracking-wide">
                      {member.role[lang]}
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="p-4 px-5 bg-white dark:bg-[#0D0F14] border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {member.experienceYears}+ {lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Yrs Exp'}
                  </span>

                  <div className="flex items-center gap-2">
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#181B23] border border-slate-200 dark:border-white/10 hover:border-[#A302FF] hover:bg-[#A302FF] text-slate-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all"
                        aria-label={`Email ${member.name[lang]}`}
                        title={`Email ${member.name[lang]}`}
                      >
                        <FaEnvelope className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <Link
                      to={formatRoute(`leadership/${member.slug}`)}
                      className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#181B23] border border-slate-200 dark:border-white/10 hover:border-[#A302FF] hover:bg-[#A302FF] text-slate-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all"
                      aria-label="View Details"
                      title="View Details"
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
      {/* 04. BOTTOM CTA                                                            */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 bg-gradient-to-r from-[#1A305A] via-[#152340] to-[#0D182E] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'আমাদের টিমের সাথে যুক্ত হতে চান বা ক্যারিয়ার গড়তে চান?'
                : 'Join Bangladesh’s Premier Strategic Communications Agency'}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {lang === 'bn'
                ? 'আমরা সবসময় প্রতিভাবান ও নিষ্ঠাবান জনসংযোগ বিশেষজ্ঞদের স্বাগত জানাই।'
                : 'Explore high-impact career opportunities in enterprise communications, crisis advisory, and media relations.'}
            </p>
          </div>
          <Link
            to={formatRoute('contact')}
            className="px-7 py-3.5 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none shrink-0 shadow-lg shadow-purple-900/30 inline-flex items-center gap-2"
          >
            <span>{lang === 'bn' ? 'যোগাযোগ করুন' : 'Get In Touch'}</span>
            <FaArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

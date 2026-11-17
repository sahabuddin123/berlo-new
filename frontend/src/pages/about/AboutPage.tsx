import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BRAND } from '../../config/brand';
import { Seo } from '../../components/common/Seo';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { SectionHeader } from '../../components/common/SectionHeader';
import {
  Compass,
  Target,
  ShieldCheck,
  Eye,
  Sparkles,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { lang, formatRoute, t } = useLanguage();

  const valueIcons = [ShieldCheck, Eye, Sparkles, Zap];

  return (
    <div className="space-y-24 lg:space-y-32 pb-24">
      <Seo
        title={lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us & Company Story'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের ইতিহাস, ভিশন, মিশন ও মূলনীতিসমূহ।'
            : 'Explore Berlo Communications Ltd. history, vision, mission, and strategic communications philosophy.'
        }
      />

      {/* 01. HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <Badge variant="navy">{t('about.heroBadge')}</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              {t('about.heroTitle')}
            </h1>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {t('about.heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* 02. AGENCY STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="purple">{lang === 'bn' ? 'আমাদের ঐতিহ্য' : 'Our Heritage'}</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {t('about.storyHeading')}
            </h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>{t('about.storyP1')}</p>
              <p>{t('about.storyP2')}</p>
              <p>{t('about.storyP3')}</p>
            </div>
            <div className="pt-2">
              <Button to={formatRoute('leadership')} variant="primary" size="md">
                {lang === 'bn' ? 'আমাদের নেতৃত্ব দলের সাথে পরিচিত হোন' : 'Meet Our Leadership Team'}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#1A305A] text-white shadow-xl space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#93C5FD]">
                {lang === 'bn' ? 'প্রতিষ্ঠানের অবস্থান' : 'Institutional Standing'}
              </div>
              <div className="text-2xl font-bold leading-snug">
                {lang === 'bn'
                  ? 'বাংলাদেশের দ্রুততম বর্ধনশীল অর্থনীতির বিশ্বস্ত পিআর কণ্ঠস্বর।'
                  : 'The trusted PR voice behind Bangladesh’s most transformative corporate leaders.'}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'bn'
                  ? 'ঢাকা-ভিত্তিক প্রধান কার্যালয় থেকে দেশীয় ও আন্তর্জাতিক পরিমণ্ডলে সুসংগঠিত সেবা।'
                  : 'Headquartered in Niketon, Gulshan-1, operating with international benchmarks and deep local newsroom insight.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-3xl font-black text-[#11813C] dark:text-[#22C55E]">2018</div>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  {lang === 'bn' ? 'প্রতিষ্ঠার বছর' : 'Year Founded'}
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-3xl font-black text-[#A302FF] dark:text-[#C966FF]">180+</div>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  {lang === 'bn' ? 'সফল ক্যাম্পেইন' : 'Campaigns Executed'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. VISION & MISSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1A305A]/10 text-[#1A305A] dark:bg-[#1A305A]/30 dark:text-[#93C5FD] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('about.visionTitle')}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {t('about.visionDesc')}
            </p>
          </div>

          {/* Mission Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#11813C]/10 text-[#11813C] dark:bg-[#11813C]/30 dark:text-[#22C55E] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('about.missionTitle')}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {t('about.missionDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* 04. CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge={lang === 'bn' ? 'আমাদের মূলনীতি' : 'Foundational Ethics'}
          badgeVariant="purple"
          title={t('about.valuesHeading')}
          subtitle={
            lang === 'bn'
              ? 'আমরা প্রতিটি ক্লায়েন্ট সম্পর্কের ক্ষেত্রে সততা, পেশাদারিত্ব ও প্রামাণ্য ফলাফলের ওপর গুরুত্ব দিই।'
              : 'Our operational standards are shaped by rigorous ethical boundaries, uncompromising research, and strategic transparency.'
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t('about.values') &&
            Array.isArray(t('about.values')) &&
            // @ts-expect-error JSON translation array
            t('about.values').map((val: { title: string; desc: string }, i: number) => {
              const IconComp = valueIcons[i % valueIcons.length];
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#A302FF]/10 text-[#A302FF] dark:bg-[#A302FF]/20 dark:text-[#C966FF] flex items-center justify-center">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{val.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
        </div>
      </section>

      {/* 05. STRATEGIC PILLARS */}
      <section className="bg-slate-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            badge={lang === 'bn' ? 'কৌশলগত ভিত্তি' : 'Core Agency Pillars'}
            badgeVariant="green"
            title={lang === 'bn' ? 'বার্লোর ৪টি অবিচ্ছেদ্য সক্ষমতা স্তম্ভ' : 'The Four Pillars of Berlo Strategic Communications'}
            className="text-white [&_h2]:text-white [&_p]:text-slate-300"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BRAND.pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3"
              >
                <div className="text-xs font-mono text-[#4ADE80]">0{idx + 1}.</div>
                <h3 className="text-xl font-bold text-white">{pillar.title[lang]}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{pillar.description[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. WHY WORK WITH BERLO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800/50 border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="teal">{lang === 'bn' ? 'পার্থক্য যেখানে' : 'The Berlo Standard'}</Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {lang === 'bn'
                  ? 'আমরা কেন নিছক প্রেস রিলিজ প্রেরক নই, আমরা আপনার কৌশলগত পরামর্শক'
                  : 'Why Leading Enterprises Partner With Us as Strategic Counsel'}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'bn'
                  ? 'গতানুগতিক জনসংযোগ সংস্থাগুলো শুধু ইভেন্ট আয়োজন করে কিংবা বিজ্ঞপ্তি বিতরণ করে দায়িত্ব শেষ করে। বার্লো আপনার সি-সুইটের সাথে বসে দীর্ঘমেয়াদী প্রাতিষ্ঠানিক লক্ষ্য নির্ধারণ করে।'
                  : 'Transactional PR agencies blast releases and count vanity clippings. Berlo sits inside your leadership room, aligning narrative engineering directly with market capitalization, investor confidence, and consumer loyalty.'}
              </p>
              <div className="pt-2">
                <Button to={formatRoute('contact')} variant="purple" size="md">
                  {t('common.scheduleCall')}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: lang === 'bn' ? 'সরাসরি পার্টনার তদারকি' : 'Direct Senior Director Involvement',
                  desc: lang === 'bn' ? 'কোনো জুনিয়র হ্যান্ড-অফ নেই; আমাদের সিনিয়র ডিরেক্টররাই প্রতিটি অ্যাকাউন্টের নেতৃত্ব দেন।' : 'No junior account hand-offs; senior agency directors lead strategy on every account.',
                },
                {
                  title: lang === 'bn' ? 'নিরপেক্ষ সাংবাদিকতার গভীর শ্রদ্ধা' : 'Uncompromising Newsroom Respect',
                  desc: lang === 'bn' ? 'জাতীয় সম্পাদকদের সাথে নীতিগত সম্পর্ক যা বিশ্বাসযোগ্য সংবাদ কাভারেজ নিশ্চিত করে।' : 'Deep, ethical credibility with national editors ensuring high-prestige editorial pickup.',
                },
                {
                  title: lang === 'bn' ? 'পরিমাপযোগ্য ফলাফল' : 'Data-Backed Business ROI',
                  desc: lang === 'bn' ? 'প্রতিটি ক্যাম্পেইনের ফলাফল স্বাধীন পরিসংখ্যান ও ব্যবসায়িক লক্ষ্যের সাথে পরিমাপ করা হয়।' : 'Every campaign is measured against real commercial outcomes and verified sentiment metrics.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#11813C]/10 text-[#11813C] dark:bg-[#11813C]/20 dark:text-[#22C55E] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

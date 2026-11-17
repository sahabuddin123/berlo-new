import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Seo } from '../../components/common/Seo';
import { FaShieldAlt, FaLock, FaUserSecret, FaFileContract } from 'react-icons/fa';

export const PrivacyPolicyPage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-white dark:bg-[#07090D] min-h-screen text-slate-900 dark:text-white transition-colors duration-200">
      <Seo
        title={t('legal.privacyTitle')}
        description="Privacy policy and data governance practices at Berlo Communications Ltd."
      />

      {/* Hero Header */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-[#1F1F1F] bg-slate-50 dark:bg-[#0B0E14]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] border border-[#A302FF]/20 text-xs font-bold tracking-wider uppercase">
              <FaShieldAlt className="w-3.5 h-3.5" />
              <span>{t('common.privacyPolicy')}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center">
              {lang === 'bn' ? (
                <>গোপনীয়তা <span className="b-border">নীতিমালা</span></>
              ) : (
                <>Privacy <span className="b-border">Policy</span></>
              )}
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-wider">
              {t('legal.privacyLastUpdated')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <section className="bg-white dark:bg-[#11141D] p-6 sm:p-8 border border-slate-200 dark:border-[#1F2432] space-y-4 top-left-border-accent shadow-sm">
          <div className="flex items-center gap-3 text-[#A302FF] dark:text-[#B833FF]">
            <FaLock className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? '১. তথ্যের গোপনীয়তা ও প্রাতিষ্ঠানিক নীতি' : '1. Information Collection & Institutional Principles'}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'bn'
              ? 'বার্লো কমিউনিকেশন্স লিমিটেড ক্লায়েন্ট এবং জনসাধারণের ব্যক্তিগত ও করপোরেট তথ্যের সর্বোচ্চ নিরাপত্তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ। আমাদের ওয়েবসাইট পরিদর্শন কিংবা পরামর্শ গ্রহণের ফরম পূরণের মাধ্যমে সংগৃহীত তথ্যাবলি কঠোর নীতিমালার অধীনে সংরক্ষিত থাকে।'
              : 'Berlo Communications Ltd. is committed to upholding strict confidentiality standards regarding corporate briefs, executive inquiries, and user communications submitted through this website.'}
          </p>
        </section>

        <section className="bg-white dark:bg-[#11141D] p-6 sm:p-8 border border-slate-200 dark:border-[#1F2432] space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-[#11813C] dark:text-[#16A34A]">
            <FaUserSecret className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? '২. সংগৃহীত তথ্যের ব্যবহার' : '2. Use of Inquired Information'}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'bn'
              ? 'আমরা আপনার প্রেরিত নাম, প্রাতিষ্ঠানিক ইমেইল, পদবি এবং ক্যাম্পেইন ব্রিফ কেবলমাত্র কৌশলগত যোগাযোগ ও পরামর্শ প্রদানের উদ্দেশ্যে ব্যবহার করি। আমরা কখনোই তৃতীয় কোনো পক্ষের কাছে এই তথ্য বিক্রি বা হস্তান্তর করি না।'
              : 'We collect corporate contact credentials solely to respond to formal service inquiries, coordinate executive consultations, and distribute our strategic executive newsletter where opted in.'}
          </p>
        </section>

        <section className="bg-white dark:bg-[#11141D] p-6 sm:p-8 border border-slate-200 dark:border-[#1F2432] space-y-4 bottom-left-border-accent shadow-sm">
          <div className="flex items-center gap-3 text-[#1A305A] dark:text-[#93C5FD]">
            <FaFileContract className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? '৩. নন-ডিসক্লোজার এবং নিরাপত্তা' : '3. Non-Disclosure & Enterprise Security'}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'bn'
              ? 'যেকোনো আনুষ্ঠানিক চুক্তি স্বাক্ষরের পূর্বেই আমাদের ওয়েবসাইটে জমাকৃত প্রতিটি তথ্য নন-ডিসক্লোজার এগ্রিমেন্ট (এনডিএ) এর নীতি অনুযায়ী গোপনীয় হিসেবে বিবেচিত হয়।'
              : 'All communications submitted through our digital intake channels are governed by agency non-disclosure protocols, ensuring competitive discretion for all corporate clients.'}
          </p>
        </section>
      </div>
    </div>
  );
};

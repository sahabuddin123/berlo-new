import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Seo } from '../../components/common/Seo';
import { FaFileContract, FaCheckCircle, FaCopyright, FaExclamationTriangle } from 'react-icons/fa';

export const TermsConditionsPage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-white dark:bg-[#07090D] min-h-screen text-slate-900 dark:text-white transition-colors duration-200">
      <Seo
        title={t('legal.termsTitle')}
        description="Terms and conditions governing the use of Berlo Communications Ltd. website and advisory services."
      />

      {/* Hero Header */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-[#1F1F1F] bg-slate-50 dark:bg-[#0B0E14]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11813C]/10 text-[#11813C] dark:text-[#16A34A] border border-[#11813C]/20 text-xs font-bold tracking-wider uppercase">
              <FaFileContract className="w-3.5 h-3.5" />
              <span>{t('common.termsConditions')}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center">
              {lang === 'bn' ? (
                <>সেবার <span className="b-border">শর্তাবলি</span></>
              ) : (
                <>Terms & <span className="b-border">Conditions</span></>
              )}
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-wider">
              {t('legal.termsLastUpdated')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <section className="bg-white dark:bg-[#11141D] p-6 sm:p-8 border border-slate-200 dark:border-[#1F2432] space-y-4 top-left-border-accent shadow-sm">
          <div className="flex items-center gap-3 text-[#11813C] dark:text-[#16A34A]">
            <FaCheckCircle className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? '১. সেবার শর্তাবলির গ্রহণযোগ্যতা' : '1. Acceptance of Terms'}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'bn'
              ? 'বার্লো কমিউনিকেশন্স লিমিটেডের ওয়েবসাইট ও ডিজিটাল রিসোর্স ব্যবহারের মাধ্যমে আপনি এই সকল শর্তাবলি মেনে নিতে সম্মতি প্রকাশ করছেন।'
              : 'By accessing the website and digital resources of Berlo Communications Ltd., you acknowledge and agree to adhere to these terms and conditions of use.'}
          </p>
        </section>

        <section className="bg-white dark:bg-[#11141D] p-6 sm:p-8 border border-slate-200 dark:border-[#1F2432] space-y-4 shadow-sm">
          <div className="flex items-center gap-3 text-[#A302FF] dark:text-[#B833FF]">
            <FaCopyright className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? '২. বৌদ্ধিক সম্পত্তি ও কপিরাইট' : '2. Intellectual Property Rights'}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'bn'
              ? 'এই ওয়েবসাইটে প্রকাশিত সকল নিবন্ধ, কেস স্টাডি বিশ্লেষণ, গ্রাফিক্স এবং লোগো বার্লো কমিউনিকেশন্স লিমিটেডের নিজস্ব সম্পদ এবং কপিরাইট আইনের আওতাভুক্ত।'
              : 'All editorial publications, proprietary research reports, design assets, and logos displayed on this website are the intellectual property of Berlo Communications Ltd.'}
          </p>
        </section>

        <section className="bg-white dark:bg-[#11141D] p-6 sm:p-8 border border-slate-200 dark:border-[#1F2432] space-y-4 bottom-left-border-accent shadow-sm">
          <div className="flex items-center gap-3 text-amber-500 dark:text-amber-400">
            <FaExclamationTriangle className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? '৩. পেশাদার পরামর্শ ও দায়বদ্ধতা' : '3. Advisory Disclaimer'}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'bn'
              ? 'ওয়েবসাইটে প্রকাশিত ইনসাইটস এবং নিবন্ধগুলো সাধারণ পেশাদার ধারণার জন্য প্রণীত। সুনির্দিষ্ট আইনি বা করপোরেট সংকটের ক্ষেত্রে আনুষ্ঠানিক চুক্তিভিত্তিক পরামর্শ অপরিহার্য।'
              : 'The thought leadership articles published herein are for strategic informational purposes and do not constitute formal legal or transactional communications counsel without a bilateral retainer contract.'}
          </p>
        </section>
      </div>
    </div>
  );
};

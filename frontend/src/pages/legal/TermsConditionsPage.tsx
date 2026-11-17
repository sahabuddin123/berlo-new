import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Seo } from '../../components/common/Seo';
import { Badge } from '../../components/common/Badge';

export const TermsConditionsPage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-12">
      <Seo
        title={t('legal.termsTitle')}
        description="Terms and conditions governing the use of Berlo Communications Ltd. website and advisory services."
      />

      <div className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <Badge variant="navy">{t('common.termsConditions')}</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t('legal.termsTitle')}
        </h1>
        <p className="text-xs text-slate-400 font-mono">{t('legal.termsLastUpdated')}</p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'bn' ? '১. সেবার শর্তাবলির গ্রহণযোগ্যতা' : '1. Acceptance of Terms'}
          </h2>
          <p>
            {lang === 'bn'
              ? 'বার্লো কমিউনিকেশন্স লিমিটেডের ওয়েবসাইট ও ডিজিটাল রিসোর্স ব্যবহারের মাধ্যমে আপনি এই সকল শর্তাবলি মেনে নিতে সম্মতি প্রকাশ করছেন।'
              : 'By accessing the website and digital resources of Berlo Communications Ltd., you acknowledge and agree to adhere to these terms and conditions of use.'}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'bn' ? '২. বৌদ্ধিক সম্পত্তি ও কপিরাইট' : '2. Intellectual Property Rights'}
          </h2>
          <p>
            {lang === 'bn'
              ? 'এই ওয়েবসাইটে প্রকাশিত সকল নিবন্ধ, কেস স্টাডি বিশ্লেষণ, গ্রাফিক্স এবং লোগো বার্লো কমিউনিকেশন্স লিমিটেডের নিজস্ব সম্পদ এবং কপিরাইট আইনের আওতাভুক্ত।'
              : 'All editorial publications, proprietary research reports, design assets, and logos displayed on this website are the intellectual property of Berlo Communications Ltd.'}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'bn' ? '৩. পেশাদার পরামর্শ ও দায়বদ্ধতা' : '3. Advisory Disclaimer'}
          </h2>
          <p>
            {lang === 'bn'
              ? 'ওয়েবসাইটে প্রকাশিত ইনসাইটস এবং নিবন্ধগুলো সাধারণ পেশাদার ধারণার জন্য প্রণীত। সুনির্দিষ্ট আইনি বা করপোরেট সংকটের ক্ষেত্রে আনুষ্ঠানিক চুক্তিভিত্তিক পরামর্শ অপরিহার্য।'
              : 'The thought leadership articles published herein are for strategic informational purposes and do not constitute formal legal or transactional communications counsel without a bilateral retainer contract.'}
          </p>
        </section>
      </div>
    </div>
  );
};


import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Seo } from '../../components/common/Seo';
import { Badge } from '../../components/common/Badge';

export const PrivacyPolicyPage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-12">
      <Seo
        title={t('legal.privacyTitle')}
        description="Privacy policy and data governance practices at Berlo Communications Ltd."
      />

      <div className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <Badge variant="navy">{t('common.privacyPolicy')}</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t('legal.privacyTitle')}
        </h1>
        <p className="text-xs text-slate-400 font-mono">{t('legal.privacyLastUpdated')}</p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'bn' ? '১. তথ্যের গোপনীয়তা ও প্রাতিষ্ঠানিক নীতি' : '1. Information Collection & Institutional Principles'}
          </h2>
          <p>
            {lang === 'bn'
              ? 'বার্লো কমিউনিকেশন্স লিমিটেড ক্লায়েন্ট এবং জনসাধারণের ব্যক্তিগত ও করপোরেট তথ্যের সর্বোচ্চ নিরাপত্তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ। আমাদের ওয়েবসাইট পরিদর্শন কিংবা পরামর্শ গ্রহণের ফরম পূরণের মাধ্যমে সংগৃহীত তথ্যাবলি কঠোর নীতিমালার অধীনে সংরক্ষিত থাকে।'
              : 'Berlo Communications Ltd. is committed to upholding strict confidentiality standards regarding corporate briefs, executive inquiries, and user communications submitted through this website.'}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'bn' ? '২. সংগৃহীত তথ্যের ব্যবহার' : '2. Use of Inquired Information'}
          </h2>
          <p>
            {lang === 'bn'
              ? 'আমরা আপনার প্রেরিত নাম, প্রাতিষ্ঠানিক ইমেইল, পদবি এবং ক্যাম্পেইন ব্রিফ কেবলমাত্র কৌশলগত যোগাযোগ ও পরামর্শ প্রদানের উদ্দেশ্যে ব্যবহার করি। আমরা কখনোই তৃতীয় কোনো পক্ষের কাছে এই তথ্য বিক্রি বা হস্তান্তর করি না।'
              : 'We collect corporate contact credentials solely to respond to formal service inquiries, coordinate executive consultations, and distribute our strategic executive newsletter where opted in.'}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'bn' ? '৩. নন-ডিসক্লোজার এবং নিরাপত্তা' : '3. Non-Disclosure & Enterprise Security'}
          </h2>
          <p>
            {lang === 'bn'
              ? 'যেকোনো আনুষ্ঠানিক চুক্তি স্বাক্ষরের পূর্বেই আমাদের ওয়েবসাইটে জমাকৃত প্রতিটি তথ্য নন-ডিসক্লোজার এগ্রিমেন্ট (এনডিএ) এর নীতি অনুযায়ী গোপনীয় হিসেবে বিবেচিত হয়।'
              : 'All communications submitted through our digital intake channels are governed by agency non-disclosure protocols, ensuring competitive discretion for all corporate clients.'}
          </p>
        </section>
      </div>
    </div>
  );
};


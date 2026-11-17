import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Seo } from '../../components/common/Seo';
import { FaCompass, FaArrowLeft, FaEnvelope } from 'react-icons/fa';

export const NotFoundPage: React.FC = () => {
  const { lang, formatRoute, t } = useLanguage();

  return (
    <div className="bg-white dark:bg-[#07090D] min-h-[80vh] flex items-center justify-center text-slate-900 dark:text-white transition-colors duration-200 py-20 px-4 sm:px-6 lg:px-8">
      <Seo title={t('notFound.title')} />

      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="w-20 h-20 bg-[#A302FF]/10 border border-[#A302FF]/30 text-[#A302FF] flex items-center justify-center mx-auto">
          <FaCompass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-4">
          <div className="inline-block px-3 py-1 bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] border border-[#A302FF]/20 text-xs font-bold uppercase tracking-wider">
            {t('notFound.badge')}
          </div>

          <h1 className="section-main-title text-slate-900 dark:text-white text-center">
            {lang === 'bn' ? (
              <>পৃষ্ঠাটি <span className="b-border">পাওয়া যায়নি</span></>
            ) : (
              <>Page <span className="b-border">Not Found</span></>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            {t('notFound.desc')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to={formatRoute('')}
            className="btn-berlo-primary inline-flex items-center gap-2"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>{t('notFound.backBtn')}</span>
          </Link>

          <Link
            to={formatRoute('contact')}
            className="btn-berlo-outline inline-flex items-center gap-2"
          >
            <FaEnvelope className="w-4 h-4 text-[#A302FF]" />
            <span>{t('notFound.contactBtn')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

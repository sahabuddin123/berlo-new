import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Seo } from '../../components/common/Seo';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { formatRoute, t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center space-y-8">
      <Seo title={t('notFound.title')} />

      <div className="w-16 h-16 rounded-3xl bg-[#A302FF]/10 text-[#A302FF] flex items-center justify-center mx-auto">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <Badge variant="purple">{t('notFound.badge')}</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          {t('notFound.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          {t('notFound.desc')}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Button to={formatRoute('')} variant="primary" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
          {t('notFound.backBtn')}
        </Button>
        <Button to={formatRoute('contact')} variant="outline">
          {t('notFound.contactBtn')}
        </Button>
      </div>
    </div>
  );
};


import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { ServiceItem } from '../../data/servicesData';
import { ShieldCheck, Newspaper, AlertTriangle, Sparkles, FileText, Globe, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  const { lang, formatRoute } = useLanguage();

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#1A305A] dark:text-[#93C5FD]" />;
      case 'Newspaper':
        return <Newspaper className="w-6 h-6 text-[#11813C] dark:text-[#22C55E]" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-6 h-6 text-[#A302FF] dark:text-[#C966FF]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#00A896] dark:text-[#2DD4BF]" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-[#1A305A] dark:text-[#93C5FD]" />;
      default:
        return <Globe className="w-6 h-6 text-[#A302FF] dark:text-[#C966FF]" />;
    }
  };

  return (
    <div
      className={`group relative rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between border ${
        featured
          ? 'bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/80 border-[#A302FF]/30 shadow-xl shadow-[#A302FF]/5'
          : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-xl'
      }`}
    >
      <div>
        {/* Card Header & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-transform group-hover:scale-110">
            {getIcon(service.iconName)}
          </div>
          <span className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500">
            #{service.slug}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors leading-snug">
          {service.title[lang]}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {service.shortDesc[lang]}
        </p>

        {/* Capabilities Pills */}
        <div className="space-y-2 mb-6">
          {service.capabilities.slice(0, 3).map((cap, idx) => (
            <div
              key={idx}
              className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#11813C] dark:bg-[#22C55E]" />
              <span className="line-clamp-1">{cap.title[lang]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / CTA Link */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#1A305A] dark:text-[#93C5FD]">
          {service.keyMetrics[0].value} {service.keyMetrics[0].label[lang]}
        </span>
        <Link
          to={formatRoute(`services/${service.slug}`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A302FF] dark:text-[#C966FF] hover:underline"
        >
          <span>{lang === 'bn' ? 'বিস্তারিত' : 'Learn More'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};


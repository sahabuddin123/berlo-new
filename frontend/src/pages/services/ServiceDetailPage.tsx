import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { servicesData } from '../../data/servicesData';
import { projectsData } from '../../data/projectsData';
import { Seo } from '../../components/common/Seo';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, formatRoute, t } = useLanguage();

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-bold">{lang === 'bn' ? 'সেবা পাওয়া যায়নি' : 'Service Not Found'}</h1>
        <Button to={formatRoute('services')} variant="primary">
          {t('common.backToServices')}
        </Button>
      </div>
    );
  }

  // Related projects that used this service
  const relatedProjects = projectsData.filter((p) =>
    p.servicesProvided.some(
      (sp) => sp.toLowerCase().includes(service.slug.replace('-', ' ')) || p.category === 'corporate'
    )
  ).slice(0, 2);

  // Other complementary services
  const otherServices = servicesData.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      <Seo
        title={`${service.title[lang]} — Capabilities`}
        description={service.shortDesc[lang]}
      />

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to={formatRoute('services')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#A302FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('common.backToServices')}</span>
        </Link>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="green">{lang === 'bn' ? 'কৌশলগত সক্ষমতা' : 'Strategic Capability'}</Badge>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.12]">
              {service.title[lang]}
            </h1>
            <p className="text-base sm:text-xl text-[#11813C] dark:text-[#22C55E] font-medium leading-relaxed">
              {service.tagline[lang]}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
              {service.overview[lang]}
            </p>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            {service.keyMetrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl sm:text-3xl font-black text-[#A302FF] dark:text-[#C966FF] mb-1">
                  {m.value}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  {m.label[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Approach & Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Approach Statement */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="purple">{lang === 'bn' ? 'কৌশলগত দৃষ্টিভঙ্গি' : 'Strategic Methodology'}</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {lang === 'bn' ? 'আমরা কীভাবে সর্বোচ্চ ফলাফল অর্জন করি' : 'How We Engineer Decisive Outcomes'}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {service.strategicApproach[lang]}
          </p>
        </div>

        {/* Detailed Capabilities Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {lang === 'bn' ? 'সুনির্দিষ্ট কারিগরি সক্ষমতাসমূহ' : 'Granular Service Capabilities'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1A305A]/10 text-[#1A305A] dark:bg-[#1A305A]/30 dark:text-[#93C5FD] flex items-center justify-center font-bold text-sm">
                  0{i + 1}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{cap.title[lang]}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {cap.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Business Benefits */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white space-y-8">
          <div className="space-y-2">
            <Badge variant="green">{lang === 'bn' ? 'ব্যবসায়িক অর্জন' : 'Business Value'}</Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              {lang === 'bn' ? 'এই সেবার মূল বাণিজ্যিক সুবিধাসমূহ' : 'Quantifiable Strategic Benefits'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200 font-medium">{b[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('common.relatedProjects')}
            </h3>
            <Link
              to={formatRoute('work')}
              className="text-xs font-bold text-[#A302FF] dark:text-[#C966FF] hover:underline"
            >
              {t('common.viewAll')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Other Complementary Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {t('common.relatedServices')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherServices.map((os) => (
            <Link
              key={os.id}
              to={formatRoute(`services/${os.slug}`)}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#A302FF] transition-all group block"
            >
              <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] text-base mb-2">
                {os.title[lang]}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">{os.shortDesc[lang]}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#11813C] dark:text-[#22C55E]">
                <span>{lang === 'bn' ? 'বিস্তারিত' : 'Learn More'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white max-w-xl mx-auto">
            {lang === 'bn'
              ? `আপনার প্রতিষ্ঠানের জন্য ${service.title[lang]} সেবা গ্রহণ করতে চান?`
              : `Ready to Deploy ${service.title[lang]} for Your Enterprise?`}
          </h3>
          <Button to={formatRoute('contact')} variant="purple" size="lg">
            {t('common.scheduleCall')}
          </Button>
        </div>
      </section>
    </div>
  );
};

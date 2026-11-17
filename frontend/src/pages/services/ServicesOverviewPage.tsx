import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { servicesData } from '../../data/servicesData';
import { Seo } from '../../components/common/Seo';
import { SectionHeader } from '../../components/common/SectionHeader';
import { ServiceCard } from '../../components/ui/ServiceCard';
import { Button } from '../../components/common/Button';

export const ServicesOverviewPage: React.FC = () => {
  const { lang, formatRoute, t } = useLanguage();

  return (
    <div className="space-y-20 lg:space-y-28 pb-24">
      <Seo
        title={lang === 'bn' ? 'সকল সেবাসমূহ' : 'Strategic Communications Services'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের পূর্ণাঙ্গ পিআর, মিডিয়া রিলেশনস, ক্রাইসিস ম্যানেজমেন্ট ও ইভেন্ট সেবাসমূহ।'
            : 'Explore full-spectrum PR, media relations, crisis mitigation, and brand activations by Berlo Communications.'
        }
      />

      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('services.badge')}
            badgeVariant="green"
            title={t('services.title')}
            subtitle={t('services.subtitle')}
          />
        </div>
      </section>

      {/* All 6 Services Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} featured={index === 0} />
          ))}
        </div>
      </section>

      {/* Strategic Methodology Section */}
      <section className="bg-slate-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeader
            badge={lang === 'bn' ? 'আমাদের কর্মপদ্ধতি' : 'The Berlo Process'}
            badgeVariant="purple"
            title={t('services.processHeading')}
            align="center"
            className="text-white [&_h2]:text-white [&_p]:text-slate-300"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t('services.processSteps') &&
              Array.isArray(t('services.processSteps')) &&
              // @ts-expect-error JSON translation array
              t('services.processSteps').map((step: { step: string; title: string; desc: string }, i: number) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4 hover:border-[#11813C] transition-colors"
                >
                  <div className="text-3xl font-black text-[#11813C] dark:text-[#22C55E]">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#1A305A] via-[#132444] to-[#0D1B36] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              {lang === 'bn' ? 'নির্দিষ্ট কোনো সক্ষমতা নিয়ে আলোচনা করতে চান?' : 'Need a Customized Communications Strategy?'}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {lang === 'bn'
                ? 'আমাদের সিনিয়র পরিচালকদের সাথে একটি গোপনীয় প্রাথমিক আলোচনার জন্য যোগাযোগ করুন।'
                : 'Connect with our leadership council for a tailored proposal aligned with your quarterly milestones.'}
            </p>
          </div>
          <Button to={formatRoute('contact')} variant="purple" size="lg" className="shrink-0">
            {t('common.scheduleCall')}
          </Button>
        </div>
      </section>
    </div>
  );
};

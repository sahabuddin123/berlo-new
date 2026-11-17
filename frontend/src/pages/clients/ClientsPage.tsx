import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { clientsData, testimonialsData } from '../../data/clientsData';
import { Seo } from '../../components/common/Seo';
import { SectionHeader } from '../../components/common/SectionHeader';
import { TestimonialCard } from '../../components/ui/TestimonialCard';
import { Button } from '../../components/common/Button';
import { Building2 } from 'lucide-react';

export const ClientsPage: React.FC = () => {
  const { lang, formatRoute, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredClients =
    activeCategory === 'all'
      ? clientsData
      : clientsData.filter((c) => c.category === activeCategory);

  const categories = [
    { key: 'all', label: t('common.filterAll') },
    { key: 'banking', label: lang === 'bn' ? 'ব্যাংকিং ও ফাইন্যান্স' : 'Banking & Finance' },
    { key: 'telecom', label: lang === 'bn' ? 'টেলিকম ও প্রযুক্তি' : 'Telecom & Tech' },
    { key: 'fmcg', label: lang === 'bn' ? 'ভোক্তা পণ্য (FMCG)' : 'FMCG & Retail' },
    { key: 'energy', label: lang === 'bn' ? 'জ্বালানি ও ভারী শিল্প' : 'Energy & Industry' },
    { key: 'healthcare', label: lang === 'bn' ? 'স্বাস্থ্যসেবা' : 'Healthcare' },
    { key: 'development', label: lang === 'bn' ? 'উন্নয়ন ও আন্তর্জাতিক' : 'Development & Trade' },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      <Seo
        title={lang === 'bn' ? 'আমাদের ক্লায়েন্টসমূহ' : 'Our Valued Clients & Alliances'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের সম্মানিত করপোরেট ক্লায়েন্ট ও অংশীদারিত্ব।'
            : 'Explore leading corporations, financial institutions, and global brands partnered with Berlo.'
        }
      />

      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('clients.badge')}
            badgeVariant="green"
            title={t('clients.title')}
            subtitle={t('clients.subtitle')}
          />
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === c.key
                  ? 'bg-[#11813C] text-white shadow-md shadow-[#11813C]/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Clients Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#1A305A] dark:text-[#93C5FD] mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {client.name}
                </h3>
                <div className="text-xs font-semibold text-[#11813C] dark:text-[#22C55E] mb-3">
                  {client.industry[lang]}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {client.highlight[lang]}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{client.partnershipYears}+ {lang === 'bn' ? 'বছর যাবত অংশীদার' : 'Yrs Partnership'}</span>
                <span className="w-2 h-2 rounded-full bg-[#11813C]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge={lang === 'bn' ? 'মতামত' : 'Executive Feedback'}
          badgeVariant="purple"
          title={t('clients.testimonialHeading')}
          subtitle={
            lang === 'bn'
              ? 'আমাদের দীর্ঘমেয়াদী ক্লায়েন্টরা কেন বার্লোকে তাদের অপরিহার্য অংশীদার মনে করেন।'
              : 'Direct reflections from board members and marketing directors across Bangladesh.'
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </section>

      {/* Partnership Ethics Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold">
              {lang === 'bn' ? 'স্বার্থের সংঘাতমুক্ত ও গোপনীয় সেবা' : 'Conflict-Free & Strictly Confidential'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'আমরা কঠোর স্বার্থের সংঘাত নীতি এবং নন-ডিসক্লোজার এগ্রিমেন্ট (এনডিএ) মেনে চলি।'
                : 'Berlo enforces a strict anti-conflict protocol, never representing direct industry rivals simultaneously without express bilateral disclosures.'}
            </p>
          </div>
          <Button to={formatRoute('contact')} variant="purple" size="md" className="shrink-0">
            {t('common.scheduleCall')}
          </Button>
        </div>
      </section>
    </div>
  );
};

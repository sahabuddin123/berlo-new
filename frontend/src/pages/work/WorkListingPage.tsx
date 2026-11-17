import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { projectsData } from '../../data/projectsData';
import { Seo } from '../../components/common/Seo';
import { SectionHeader } from '../../components/common/SectionHeader';
import { ProjectCard } from '../../components/ui/ProjectCard';

export const WorkListingPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects =
    selectedCategory === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  const categories = [
    { key: 'all', label: t('common.filterAll') },
    { key: 'corporate', label: lang === 'bn' ? 'করপোরেট পিআর' : 'Corporate PR' },
    { key: 'crisis', label: lang === 'bn' ? 'সংকট প্রশমন' : 'Crisis Advisory' },
    { key: 'events', label: lang === 'bn' ? 'ইভেন্ট ও অ্যাক্টিভেশন' : 'Events & Activations' },
    { key: 'brand', label: lang === 'bn' ? 'ভোক্তা ক্যাম্পেইন' : 'Consumer Campaigns' },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      <Seo
        title={lang === 'bn' ? 'কেস স্টাডিজ ও সাফল্য' : 'Case Studies & Featured Campaigns'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের বাস্তবায়িত কৌশলগত ক্যাম্পেইন ও সাফল্যের কেস স্টাডিজ।'
            : 'Explore documented public relations case studies, crisis turnarounds, and brand activations by Berlo.'
        }
      />

      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('work.badge')}
            badgeVariant="purple"
            title={t('work.title')}
            subtitle={t('work.subtitle')}
          />
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === c.key
                  ? 'bg-[#A302FF] text-white shadow-md shadow-[#A302FF]/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} featuredLayout={idx % 2 === 0} />
          ))}
        </div>
      </section>
    </div>
  );
};

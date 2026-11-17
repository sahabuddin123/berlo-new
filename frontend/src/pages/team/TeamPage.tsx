import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { teamData } from '../../data/teamData';
import { Seo } from '../../components/common/Seo';
import { SectionHeader } from '../../components/common/SectionHeader';
import { TeamCard } from '../../components/ui/TeamCard';
import { Button } from '../../components/common/Button';

export const TeamPage: React.FC = () => {
  const { lang, formatRoute, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredTeam =
    activeFilter === 'all'
      ? teamData
      : teamData.filter((m) => m.department === activeFilter);

  const filters = [
    { key: 'all', label: t('team.filterAll') },
    { key: 'strategy', label: t('team.filterStrategy') },
    { key: 'pr', label: t('team.filterPR') },
    { key: 'events', label: t('team.filterEvents') },
    { key: 'creative', label: t('team.filterCreative') },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      <Seo
        title={lang === 'bn' ? 'আমাদের টিম' : 'Our Creative & Strategic Team'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের জনসংযোগ, কৌশল ও ক্রিয়েটিভ বিশেষজ্ঞ দল।'
            : 'Meet the interdisciplinary PR practitioners and creative visual designers at Berlo Communications Ltd.'
        }
      />

      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('team.badge')}
            badgeVariant="green"
            title={t('team.title')}
            subtitle={t('team.subtitle')}
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-[#1A305A] text-white dark:bg-[#25427C]'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeam.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Join the Agency Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? 'আমাদের সাথে কাজ করতে চান?' : 'Interested in Joining Our Agency?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {lang === 'bn'
                ? 'আমরা প্রতিভাবান পিআর স্ট্র্যাটেজিস্ট, কন্টেন্ট ক্রিয়েটর ও ইভেন্ট কোঅর্ডিনেটর খুঁজছি।'
                : 'We are always looking for ambitious PR strategists, journalists, and visual artists to join our Dhaka office.'}
            </p>
          </div>
          <Button to={formatRoute('contact')} variant="purple" size="md">
            {lang === 'bn' ? 'জীবনবৃত্তান্ত পাঠান' : 'Submit Career Profile'}
          </Button>
        </div>
      </section>
    </div>
  );
};

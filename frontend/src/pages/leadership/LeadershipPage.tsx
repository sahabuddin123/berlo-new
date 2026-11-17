import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { teamData } from '../../data/teamData';
import { Seo } from '../../components/common/Seo';
import { Badge } from '../../components/common/Badge';
import { SectionHeader } from '../../components/common/SectionHeader';
import { TeamCard } from '../../components/ui/TeamCard';

export const LeadershipPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const leaders = teamData.filter((m) => m.isLeadership);

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      <Seo
        title={lang === 'bn' ? 'আমাদের নেতৃত্ব দল' : 'Executive Leadership'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের সিনিয়র এক্সিকিউটিভ কাউন্সিল ও পরিচালনা পর্ষদ।'
            : 'Meet the executive leadership council steering Berlo Communications Ltd.'
        }
      />

      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('leadership.badge')}
            badgeVariant="navy"
            title={t('leadership.title')}
            subtitle={t('leadership.subtitle')}
          />
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <TeamCard key={leader.id} member={leader} />
          ))}
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white space-y-4">
          <Badge variant="purple">{lang === 'bn' ? 'নেতৃত্বের প্রতিশ্রুতি' : 'Our Governance Pledge'}</Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            {lang === 'bn'
              ? 'আমরা প্রতিটি ক্লায়েন্টের সুনামকে নিজেদের ব্যক্তিগত মর্যাদার মতোই সুরক্ষা দিই।'
              : 'Direct Senior Counsel: The Directors You Meet Are The Directors Who Execute.'}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'বার্লোতে আমাদের নীতি হলো পূর্ণাঙ্গ জবাবদিহিতা। আমাদের সিনিয়র নেতৃত্ব ক্লায়েন্টের সাথে নিয়মিত সরাসরি যোগাযোগ রাখেন এবং প্রতিটি কৌশলের বাস্তবায়ন ব্যক্তিগতভাবে তদারকি করেন।'
              : 'At Berlo, we reject the agency model of pitching with veteran partners and delegating execution to junior novices. Every corporate campaign, crisis war-room, and media announcement is guided personally by our leadership council.'}
          </p>
        </div>
      </section>
    </div>
  );
};


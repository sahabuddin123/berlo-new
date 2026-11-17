import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { teamData } from '../../data/teamData';
import { Seo } from '../../components/common/Seo';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LinkedInIcon } from '../../components/common/SocialIcons';
import { ArrowLeft, Mail, GraduationCap, Briefcase } from 'lucide-react';

export const LeaderDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, formatRoute, t } = useLanguage();

  const leader = teamData.find((m) => m.slug === slug);

  if (!leader) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-bold">{lang === 'bn' ? 'প্রোফাইল পাওয়া যায়নি' : 'Leader Profile Not Found'}</h1>
        <Button to={formatRoute('leadership')} variant="primary">
          {t('common.backToLeadership')}
        </Button>
      </div>
    );
  }

  const initials = leader.name.en
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="space-y-16 pb-24">
      <Seo
        title={`${leader.name[lang]} — ${leader.role[lang]}`}
        description={leader.bio[lang]}
      />

      {/* Back button */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to={formatRoute('leadership')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#A302FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('common.backToLeadership')}</span>
        </Link>
      </div>

      {/* Main Profile Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-[#1A305A] via-[#11813C] to-[#A302FF] text-white flex items-center justify-center font-bold text-3xl sm:text-4xl shadow-xl shrink-0">
              {initials}
            </div>

            <div className="space-y-3 flex-1">
              <Badge variant="purple">{leader.experienceYears}+ {lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}</Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {leader.name[lang]}
              </h1>
              <p className="text-base font-semibold text-[#11813C] dark:text-[#22C55E]">
                {leader.role[lang]}
              </p>

              <div className="flex items-center gap-3 pt-2">
                {leader.social.linkedin && (
                  <a
                    href={leader.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-medium hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5 text-[#0077B5]" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {leader.social.email && (
                  <a
                    href={`mailto:${leader.social.email}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-medium hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#A302FF]" />
                    <span>{leader.social.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography & Credentials */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'bn' ? 'পেশাদার পরিচিতি' : 'Professional Biography'}
            </h2>
            <div className="text-base text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
              <p>{leader.fullBio[lang]}</p>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                {lang === 'bn' ? 'কৌশলগত দক্ষতার ক্ষেত্রসমূহ' : 'Areas of Strategic Counsel'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {leader.expertise.map((exp, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2.5"
                  >
                    <Briefcase className="w-4 h-4 text-[#A302FF] shrink-0" />
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                {lang === 'bn' ? 'শিক্ষা ও ব্যাকগ্রাউন্ড' : 'Academic Credentials'}
              </h3>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <GraduationCap className="w-5 h-5 text-[#11813C] shrink-0 mt-0.5" />
                <span>{leader.education[lang]}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D1B36] text-white space-y-4">
              <div className="text-xs font-mono uppercase text-[#93C5FD]">
                {lang === 'bn' ? 'পরামর্শ গ্রহণ করুন' : 'Direct Consultation'}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'bn'
                  ? `${leader.name[lang]}-এর সাথে আপনার প্রতিষ্ঠানের যোগাযোগ কৌশল নিয়ে পরামর্শ করুন।`
                  : `Discuss your corporate positioning or crisis readiness directly with ${leader.name[lang]}.`}
              </p>
              <Button to={formatRoute('contact')} variant="purple" size="sm" className="w-full justify-center">
                {t('common.scheduleCall')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { TeamMember } from '../../data/teamData';
import { LinkedInIcon } from '../common/SocialIcons';
import { Mail, ArrowRight } from 'lucide-react';

interface TeamCardProps {
  member: TeamMember;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const { lang, formatRoute } = useLanguage();

  const initials = member.name.en
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="group rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1A305A] via-[#11813C] to-[#A302FF] text-white flex items-center justify-center font-bold text-xl shadow-md transition-transform group-hover:scale-105">
            {initials}
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            {member.experienceYears}+ {lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Yrs Exp'}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors">
          {member.name[lang]}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#11813C] dark:text-[#22C55E] mb-4">
          {member.role[lang]}
        </p>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
          {member.bio[lang]}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {member.expertise.slice(0, 3).map((exp, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
            >
              {exp}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#0077B5] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
          {member.social.email && (
            <a
              href={`mailto:${member.social.email}`}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#A302FF] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>

        <Link
          to={formatRoute(`leadership/${member.slug}`)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#1A305A] dark:text-[#93C5FD] hover:text-[#A302FF] dark:hover:text-[#B833FF] transition-colors"
        >
          <span>{lang === 'bn' ? 'সম্পূর্ণ প্রোফাইল' : 'Full Bio'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

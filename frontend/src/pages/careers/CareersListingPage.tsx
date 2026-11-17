import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Seo } from '../../components/common/Seo';
import { getPublicJobPostings, PublicJobPosting } from '../../services/publicApi';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
  Compass,
  Calendar,
  Filter,
} from 'lucide-react';

export const CareersListingPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();
  const [jobs, setJobs] = useState<PublicJobPosting[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      const res = await getPublicJobPostings({
        department: selectedDept !== 'all' ? selectedDept : undefined,
        workplace_type: selectedWorkplace !== 'all' ? selectedWorkplace : undefined,
      });
      setJobs(res.jobs);
      if (res.departments && res.departments.length > 0) {
        setDepartments(res.departments);
      }
      setLoading(false);
    }
    loadJobs();
  }, [selectedDept, selectedWorkplace]);

  const workplaceLabel = (type: string) => {
    switch (type) {
      case 'on_site':
        return lang === 'bn' ? 'অন-সাইট (গুলশান-১)' : 'On-Site (Gulshan-1)';
      case 'hybrid':
        return lang === 'bn' ? 'হাইব্রিড' : 'Hybrid';
      case 'remote':
        return lang === 'bn' ? 'রিমোট' : 'Remote';
      default:
        return type;
    }
  };

  const employmentTypeLabel = (type: string) => {
    switch (type) {
      case 'full_time':
        return lang === 'bn' ? 'ফুল-টাইম' : 'Full-Time';
      case 'part_time':
        return lang === 'bn' ? 'পার্ট-টাইম' : 'Part-Time';
      case 'contract':
        return lang === 'bn' ? 'কন্ট্রাক্ট' : 'Contract';
      case 'internship':
        return lang === 'bn' ? 'ফেলোশিপ / ইন্টার্ন' : 'Fellowship';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'ক্যারিয়ার ও পেশাগত সুযোগ — বার্লো' : 'Careers & Executive Openings — Berlo Communications'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্সে যোগ দিন। বাংলাদেশের শীর্ষ করপোরেট প্রতিষ্ঠান ও বহুজাতিক ব্র্যান্ডের কৌশলগত জনসংযোগ, ক্রাইসিস ও ন্যারেটিভ ইঞ্জিনিয়ারিংয়ে অংশ নিন।'
            : 'Join Berlo Communications. Shape public discourse, lead high-stakes corporate PR, and build resilient reputations across South Asia.'
        }
      />

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-slate-900 via-slate-900/90 to-transparent border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A302FF]/10 border border-[#A302FF]/30 text-xs font-bold text-[#A302FF] dark:text-[#B833FF] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ক্যারিয়ার ও সুযোগ' : 'Executive Careers & Talent Desk'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {lang === 'bn' ? (
                <>
                  প্রভাব ও জনমতের রূপকার হন। <span className="text-[#A302FF] dark:text-[#B833FF]">বার্লোতে যোগ দিন</span>
                </>
              ) : (
                <>
                  Architect Influence. <span className="text-[#A302FF] dark:text-[#B833FF]">Shape Perceptions.</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'বার্লো কমিউনিকেশন্স শুধুমাত্র একটি এজেন্সি নয়—এটি দেশের সবচেয়ে বিচক্ষণ সি-স্যুট নির্বাহি, মিডিয়া লিডার ও পলিসি মেকারদের বিশ্বস্ত স্ট্র্যাটেজিক কাউন্সিল। আমাদের সাথে গড়ে তুলুন আপনার শীর্ষ ক্যারিয়ার।'
                : 'Berlo Communications is South Asia’s premier strategic PR, narrative engineering, and crisis management practice. We seek exceptional communicators, investigative thinkers, and corporate strategists.'}
            </p>
          </div>
        </div>
      </section>

      {/* Culture & Perks Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'bn' ? 'হাই-স্টেক্স ক্রাইসিস প্রভাব' : 'High-Stakes Impact'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'জাতীয় সংকট ও কর্পোরেট রূপান্তরের গুরুত্বপূর্ণ মুহূর্তে সরাসরি সিদ্ধান্ত গ্রহণের অভিজ্ঞতা।'
                : 'Direct war-room involvement in reputation-defining corporate transitions and emergency risk containment.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'bn' ? 'সি-লেভেল এক্সপোজার' : 'C-Suite Access'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'শীর্ষস্থানীয় ব্যবসায়ী নেতা, বোর্ড চেয়ারম্যান ও সম্পাদকীয় পর্ষদের সাথে সরাসরি সমন্বয়।'
                : 'Collaborate closely with conglomerate chairs, CEOs, editorial directors, and policy luminaries.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'bn' ? 'শীর্ষ পারিতোষিক ও বোনাস' : 'Executive Compensation'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'বাজারের সেরা বেতন কাঠামো, ডিসক্রিশনারি প্রফিট বোনাস ও সার্বিক মেডিকেল ইনস্যুরেন্স কাভারেজ।'
                : 'Top-tier corporate compensation, comprehensive medical packages, and discretionary success bonuses.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'bn' ? 'গ্লোবাল রিসার্চ ও নেটওয়ার্ক' : 'Global PR Standards'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'আন্তর্জাতিক রিসার্চ ডাটাবেজ, পেশাগত প্রশিক্ষণ এবং আন্তর্জাতিক কনফারেন্স স্পনসরশিপ।'
                : 'Access to leading global intelligence databases, masterclasses, and international summit representation.'}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar & Open Roles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {lang === 'bn' ? 'বর্তমান কর্মসংস্থান ও শূন্যপদ' : 'Open Positions & Appointments'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {lang === 'bn'
                ? `মোট ${jobs.length}টি সক্রিয় পদে আবেদন গ্রহণ চলছে`
                : `Currently reviewing applications for ${jobs.length} strategic positions`}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ফিল্টার:' : 'Filter:'}</span>
            </div>

            {/* Department Dropdown */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#A302FF]"
            >
              <option value="all">{lang === 'bn' ? 'সকল বিভাগ' : 'All Departments'}</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Workplace Dropdown */}
            <select
              value={selectedWorkplace}
              onChange={(e) => setSelectedWorkplace(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#A302FF]"
            >
              <option value="all">{lang === 'bn' ? 'সকল কাজের ধরণ' : 'All Workplace'}</option>
              <option value="on_site">{lang === 'bn' ? 'অন-সাইট (গুলশান-১)' : 'On-Site'}</option>
              <option value="hybrid">{lang === 'bn' ? 'হাইব্রিড' : 'Hybrid'}</option>
              <option value="remote">{lang === 'bn' ? 'রিমোট' : 'Remote'}</option>
            </select>
          </div>
        </div>

        {/* Roles Listing */}
        {loading ? (
          <div className="py-20 text-center text-sm text-slate-400">
            {lang === 'bn' ? 'ক্যারিয়ার তথ্য লোড হচ্ছে...' : 'Loading career opportunities...'}
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-[#161616] rounded-2xl border border-slate-200 dark:border-[#242424] p-12 space-y-3">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              {lang === 'bn' ? 'নির্বাচিত ফিল্টারে কোনো শূন্যপদ পাওয়া যায়নি' : 'No Open Positions Match Your Filters'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {lang === 'bn'
                ? 'অনুগ্রহ করে ফিল্টার পরিবর্তন করুন অথবা আমাদের কাছে আপনার উন্মুক্ত আবেদনপত্র পাঠান।'
                : 'Try adjusting your filters, or send a general executive portfolio submission below.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => {
              const title = lang === 'bn' ? job.title_bn : job.title_en;
              const dept = lang === 'bn' ? job.department_bn : job.department_en;
              const location = lang === 'bn' ? job.location_bn : job.location_en;
              const desc = lang === 'bn' ? job.short_desc_bn : job.short_desc_en;
              const exp = lang === 'bn' ? job.experience_level_bn : job.experience_level_en;

              return (
                <div
                  key={job.id}
                  className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] hover:border-[#A302FF]/60 transition-all shadow-sm hover:shadow-md space-y-4 group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] border border-[#A302FF]/20">
                        {dept}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {employmentTypeLabel(job.employment_type)}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {workplaceLabel(job.workplace_type)}
                      </span>
                    </div>

                    {job.deadline && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lang === 'bn' ? `আবেদনের শেষ তারিখ: ${job.deadline}` : `Deadline: ${job.deadline}`}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Link
                      to={formatRoute(`careers/${job.slug}`)}
                      className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors inline-block"
                    >
                      {title}
                    </Link>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
                      {desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                    <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{location}</span>
                      </div>
                      {exp && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp}</span>
                        </div>
                      )}
                    </div>

                    <Link
                      to={formatRoute(`careers/${job.slug}`)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A302FF] hover:bg-[#8D00DE] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-purple-900/20 group-hover:scale-105"
                    >
                      <span>{lang === 'bn' ? 'বিস্তারিত ও আবেদন করুন' : 'View Role & Apply'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Spontaneous Application CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-[#A302FF]/30 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-2xl font-black tracking-tight">
              {lang === 'bn'
                ? 'আপনার যোগ্যতার সাথে মানানসই পদ খুঁজে পাচ্ছেন না?'
                : 'Seeking a Leadership Role Not Listed Above?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'আমরা সর্বদা প্রতিভাবান জনসংযোগ বিশেষজ্ঞ, সাংবাদিক, পলিসি অ্যাডভাইজার ও মিডিয়া পরিচালকদের সাথে কথা বলতে আগ্রহী। আপনার পোর্টফোলিও পাঠিয়ে রাখুন।'
                : 'We continuously maintain discreet discussions with senior journalists, reputation consultants, and PR strategists. Submit an executive dossier for future confidential appointments.'}
            </p>
          </div>

          <Link
            to={formatRoute('contact')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-white/10"
          >
            {lang === 'bn' ? 'সরাসরি পোর্টফোলিও পাঠান' : 'Submit Executive Brief'}
          </Link>
        </div>
      </section>
    </div>
  );
};

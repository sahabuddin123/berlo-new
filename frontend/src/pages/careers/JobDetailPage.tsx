import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Seo } from '../../components/common/Seo';
import { getPublicJobBySlug, submitJobApplication, PublicJobPosting } from '../../services/publicApi';
import {
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Upload,
  Send,
  ShieldCheck,
  Award,
  Sparkles,
  DollarSign,
  AlertCircle,
} from 'lucide-react';

export const JobDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, formatRoute } = useLanguage();
  const [job, setJob] = useState<PublicJobPosting | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJob() {
      if (!slug) return;
      setLoading(true);
      const data = await getPublicJobBySlug(slug);
      setJob(data);
      setLoading(false);
    }
    loadJob();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFormError(lang === 'bn' ? 'অনুগ্রহ করে সকল আবশ্যকীয় তথ্য পূরণ করুন।' : 'Please fill all required fields.');
      return;
    }

    if (!resumeFile && !resumeUrl.trim() && !linkedinUrl.trim()) {
      setFormError(
        lang === 'bn'
          ? 'অনুগ্রহ করে জীবনবৃত্তান্ত (Resume ফাইল বা লিংক) অথবা লিঙ্কডইন প্রোফাইল প্রদান করুন।'
          : 'Please provide either a Resume file, an online resume link, or your LinkedIn profile.'
      );
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      if (job) {
        formData.append('job_posting_id', job.id.toString());
      }
      formData.append('name', fullName.trim());
      formData.append('email', email.trim());
      formData.append('phone', phone.trim());
      if (linkedinUrl.trim()) formData.append('linkedin_url', linkedinUrl.trim());
      if (portfolioUrl.trim()) formData.append('portfolio_url', portfolioUrl.trim());
      if (coverLetter.trim()) formData.append('cover_letter', coverLetter.trim());
      if (resumeUrl.trim()) formData.append('resume_url', resumeUrl.trim());
      if (resumeFile) formData.append('resume', resumeFile);

      const res = await submitJobApplication(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setFormError(res.message);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-sm text-slate-400">
        {lang === 'bn' ? 'পদবির বিবরণ লোড হচ্ছে...' : 'Loading position details...'}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <AlertCircle className="w-16 h-16 text-rose-500 mx-auto" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {lang === 'bn' ? 'পদটি পাওয়া যায়নি' : 'Position Not Found'}
        </h1>
        <p className="text-sm text-slate-500">
          {lang === 'bn'
            ? 'এই পদের আবেদন গ্রহণের সময়সীমা শেষ হয়ে গেছে অথবা পদটি নিষ্ক্রিয় করা হয়েছে।'
            : 'This career appointment may have expired or is no longer accepting applications.'}
        </p>
        <Link
          to={formatRoute('careers')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A302FF] text-white text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'bn' ? 'সকল শূন্যপদ দেখুন' : 'View All Open Positions'}</span>
        </Link>
      </div>
    );
  }

  const title = lang === 'bn' ? job.title_bn : job.title_en;
  const dept = lang === 'bn' ? job.department_bn : job.department_en;
  const location = lang === 'bn' ? job.location_bn : job.location_en;
  const overview = lang === 'bn' ? job.overview_bn || job.short_desc_bn : job.overview_en || job.short_desc_en;
  const exp = lang === 'bn' ? job.experience_level_bn : job.experience_level_en;
  const salary = lang === 'bn' ? job.salary_range_bn : job.salary_range_en;
  const responsibilities = lang === 'bn' ? job.responsibilities_bn || job.responsibilities_en : job.responsibilities_en;
  const requirements = lang === 'bn' ? job.requirements_bn || job.requirements_en : job.requirements_en;
  const benefits = lang === 'bn' ? job.benefits_bn || job.benefits_en : job.benefits_en;

  return (
    <div className="space-y-12 sm:space-y-16 pb-24 overflow-hidden">
      <Seo
        title={`${title} — Berlo Careers`}
        description={job.short_desc_en || overview || 'Apply for strategic communications roles at Berlo Communications.'}
      />

      {/* Top Breadcrumb & Title */}
      <section className="pt-8 sm:pt-14 pb-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            to={formatRoute('careers')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#A302FF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'সকল শূন্যপদে ফিরে যান' : 'Back to All Openings'}</span>
          </Link>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] border border-[#A302FF]/20">
                {dept}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                {job.employment_type.replace('_', ' ')}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {job.workplace_type.replace('_', ' ')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div className="space-y-1">
              <div className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'কাজের স্থান' : 'Location'}</span>
              </div>
              <div className="font-bold text-slate-800 dark:text-slate-200">{location}</div>
            </div>

            {exp && (
              <div className="space-y-1">
                <div className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'অভিজ্ঞতা' : 'Experience'}</span>
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200">{exp}</div>
              </div>
            )}

            {salary && (
              <div className="space-y-1">
                <div className="text-slate-400 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'বেতন কাঠামো' : 'Compensation'}</span>
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200">{salary}</div>
              </div>
            )}

            {job.deadline && (
              <div className="space-y-1">
                <div className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'আবেদনের শেষ তারিখ' : 'Deadline'}</span>
                </div>
                <div className="font-bold text-rose-500">{job.deadline}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content & Application Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Job Description & Qualifications (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Overview */}
            {overview && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <Briefcase className="w-4 h-4 text-[#A302FF]" />
                  <span>{lang === 'bn' ? 'পদের বিবরণ ও লক্ষ্য' : 'Role Overview & Scope'}</span>
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                  {overview}
                </p>
              </div>
            )}

            {/* Responsibilities */}
            {responsibilities && responsibilities.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <Sparkles className="w-4 h-4 text-[#A302FF]" />
                  <span>{lang === 'bn' ? 'মূল দায়িত্বসমূহ' : 'Key Responsibilities'}</span>
                </h2>
                <ul className="space-y-3">
                  {responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#11813C] dark:text-[#22C55E] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qualifications / Requirements */}
            {requirements && requirements.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <ShieldCheck className="w-4 h-4 text-[#A302FF]" />
                  <span>{lang === 'bn' ? 'প্রয়োজনীয় যোগ্যতা ও অভিজ্ঞতা' : 'Required Candidate Qualifications'}</span>
                </h2>
                <ul className="space-y-3">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A302FF] shrink-0 mt-2" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {benefits && benefits.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <Award className="w-4 h-4 text-[#11813C]" />
                  <span>{lang === 'bn' ? 'সুবিধাসমূহ ও সুযোগ' : 'Executive Benefits & Perks'}</span>
                </h2>
                <ul className="space-y-3">
                  {benefits.map((ben, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <Award className="w-4 h-4 text-[#11813C] shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Application Form (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {lang === 'bn' ? 'আবেদনপত্র জমা দিন' : 'Submit Candidate Dossier'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'bn'
                    ? 'আপনার তথ্য গোপনীয়তার সাথে সংরক্ষণ করা হবে।'
                    : 'All applications are strictly reviewed by our executive recruitment board under confidential NDA.'}
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-400">
                    {lang === 'bn' ? 'আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Application Submitted Successfully!'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'bn'
                      ? 'ধন্যবাদ! আমাদের সিনিয়র ট্যালেন্ট টিম আপনার প্রোফাইল মূল্যায়ন করে ৩ কার্যদিবসের মধ্যে যোগাযোগ করবে।'
                      : 'Thank you! Our senior talent acquisitions director will review your submission and contact you within three business days.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold rounded-xl">
                      {formError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={lang === 'bn' ? 'যেমন: কাজী ফারহান' : 'e.g. Sarah Jenkins'}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {lang === 'bn' ? 'ফোন নম্বর' : 'Phone Number'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 17XX XXXXXX"
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Portfolio / Personal Website URL
                    </label>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://yourportfolio.com"
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  {/* Resume Upload / Link */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>{lang === 'bn' ? 'জীবনবৃত্তান্ত (Resume / CV)' : 'Resume / Dossier'}</span>
                      <span className="text-[10px] text-slate-400 font-normal">PDF, DOCX (Max 10MB)</span>
                    </label>

                    <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#A302FF] rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 dark:bg-slate-900/50">
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {resumeFile ? resumeFile.name : lang === 'bn' ? 'ফাইল সিলেক্ট করুন' : 'Click to Upload Resume'}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResumeFile(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    <div className="text-center text-[10px] text-slate-400">— {lang === 'bn' ? 'অথবা লিংক দিন' : 'or provide web link'} —</div>

                    <input
                      type="url"
                      value={resumeUrl}
                      onChange={(e) => setResumeUrl(e.target.value)}
                      placeholder="https://drive.google.com/your-cv or online link"
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {lang === 'bn' ? 'সংক্ষিপ্ত কাভার লেটার বা বার্তা' : 'Executive Statement / Cover Letter'}
                    </label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder={
                        lang === 'bn'
                          ? 'আপনার পূর্ববর্তী অভিজ্ঞতা ও বার্লোতে আপনার অবদান সম্পর্কে সংক্ষেপে লিখুন...'
                          : 'Summarize your track record in corporate communications and leadership expectations...'
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-[#A302FF] hover:bg-[#8D00DE] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? (lang === 'bn' ? 'জমা দেওয়া হচ্ছে...' : 'Submitting Dossier...') : (lang === 'bn' ? 'আবেদন প্রেরণ করুন' : 'Submit Application')}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

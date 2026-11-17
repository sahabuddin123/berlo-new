import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BRAND } from '../../config/brand';
import { servicesData } from '../../data/servicesData';
import { Seo } from '../../components/common/Seo';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Button } from '../../components/common/Button';
import { MapPin, Phone, Clock, ShieldCheck, CheckCircle2, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { lang, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate consultation submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });
    }, 1200);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-24">
      <Seo
        title={lang === 'bn' ? 'যোগাযোগ ও কৌশলগত পরামর্শ' : 'Contact & Strategic Consultation'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের সাথে যোগাযোগ করুন। প্রধান কার্যালয়: নিকেতন, গুলশান-১, ঢাকা।'
            : 'Initiate a strategic briefing with Berlo Communications Ltd. Headquarters in Niketon, Gulshan-1, Dhaka.'
        }
      />

      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t('contact.badge')}
            badgeVariant="purple"
            title={t('contact.title')}
            subtitle={t('contact.subtitle')}
          />
        </div>
      </section>

      {/* Main Grid: Form & Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {t('contact.formHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-8">
              {lang === 'bn'
                ? 'অনুগ্রহ করে নিচের তথ্যগুলো পূরণ করুন। আমাদের সিনিয়র ডিরেক্টর দ্রুত যোগাযোগ করবেন।'
                : 'Please complete the strategic brief below. All inquiries are covered by standard NDA protocols.'}
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#11813C]/10 border border-[#11813C]/30 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#11813C] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t('contact.successTitle')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                  {t('contact.successMessage')}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-[#11813C] dark:text-[#22C55E] hover:underline"
                  >
                    {lang === 'bn' ? 'আরেকটি অনুরোধ পাঠান' : 'Submit Another Inquiry'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t('contact.nameLabel')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('contact.namePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF] focus:ring-1 focus:ring-[#A302FF]"
                    />
                  </div>

                  {/* Corporate Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t('contact.emailLabel')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contact.emailPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF] focus:ring-1 focus:ring-[#A302FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t('contact.phoneLabel')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('contact.phonePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF] focus:ring-1 focus:ring-[#A302FF]"
                    />
                  </div>

                  {/* Organization */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t('contact.companyLabel')}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t('contact.companyPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF] focus:ring-1 focus:ring-[#A302FF]"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t('contact.serviceLabel')}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#A302FF] focus:ring-1 focus:ring-[#A302FF]"
                  >
                    <option value="">{t('contact.serviceSelect')}</option>
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t('contact.messageLabel')} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF] focus:ring-1 focus:ring-[#A302FF]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="purple"
                  size="lg"
                  isLoading={isSubmitting}
                  icon={<Send className="w-4 h-4" />}
                  className="w-full justify-center"
                >
                  {isSubmitting ? t('contact.submitting') : t('contact.submitBtn')}
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: Verified Office & Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A302FF]">
                <MapPin className="w-4 h-4" />
                <span>{t('contact.officeHeading')}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Berlo Communications Ltd.
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {BRAND.contact.address[lang]}
              </p>
            </div>

            {/* Direct Lines */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#11813C]">
                <Phone className="w-4 h-4" />
                <span>{t('contact.directLineHeading')}</span>
              </div>
              <div className="space-y-2">
                {BRAND.contact.phones.map((phone) => (
                  <div key={phone} className="text-sm font-bold text-slate-900 dark:text-white">
                    <a href={`tel:${phone}`} className="hover:text-[#11813C] transition-colors">
                      {phone}
                    </a>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
                {BRAND.contact.emails.map((email) => (
                  <div key={email} className="text-xs text-slate-600 dark:text-slate-400">
                    <a href={`mailto:${email}`} className="hover:text-[#A302FF] transition-colors">
                      {email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{t('contact.businessHoursHeading')}</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {BRAND.contact.workingHours[lang]}
              </p>
              <p className="text-[11px] text-slate-400">
                {lang === 'bn'
                  ? 'জরুরি সংকটের ক্ষেত্রে আমাদের ওয়ার-রুম ২৪/৭ সক্রিয় থাকে।'
                  : 'Crisis management retainers maintain 24/7 emergency dispatch.'}
              </p>
            </div>

            {/* Confidentiality & Security Guarantee */}
            <div className="p-6 rounded-2xl bg-[#1A305A] text-white flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#4ADE80] shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-slate-200">
                <strong className="text-white block mb-0.5">
                  {lang === 'bn' ? 'গোপনীয়তা ও এনডিএ নিশ্চয়তা' : 'Strict Non-Disclosure Guarantee'}
                </strong>
                {lang === 'bn'
                  ? 'আপনার প্রেরিত সকল বাণিজ্যিক ও প্রাতিষ্ঠানিক তথ্য সর্বোচ্চ গোপনীয়তার সাথে সংরক্ষিত থাকবে।'
                  : 'All materials submitted through this form are treated with executive non-disclosure discretion.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md h-80 sm:h-96 relative">
          <iframe
            src={BRAND.contact.mapEmbedUrl}
            title="Berlo Communications Location"
            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

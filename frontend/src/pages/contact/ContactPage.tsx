import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { BRAND } from '../../config/brand';
import { servicesData } from '../../data/servicesData';
import { Seo } from '../../components/common/Seo';
import { MapPin, Phone, Clock, ShieldCheck, CheckCircle2, Award, Mail } from 'lucide-react';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';

export const ContactPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();

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
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'যোগাযোগ ও কৌশলগত পরামর্শ — বার্লো' : 'Contact & Strategic Consultation — Berlo Communications'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের সাথে যোগাযোগ করুন। প্রধান কার্যালয়: নিকেতন, গুলশান-১, ঢাকা।'
            : 'Initiate a strategic briefing with Berlo Communications Ltd. Headquarters in Niketon, Gulshan-1, Dhaka.'
        }
      />

      {/* ========================================================================= */}
      {/* 01. PAGE HERO BANNER                                                      */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 bg-slate-50 dark:bg-[#07090D] border-b border-slate-200 dark:border-[#1F1F1F] transition-colors duration-200">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-wider">
            <Link to={formatRoute('')} className="hover:text-[#A302FF] transition-colors">
              {lang === 'bn' ? 'হোম' : 'Home'}
            </Link>
            <FaChevronRight className="w-2.5 h-2.5 text-slate-400" />
            <span className="text-[#A302FF] dark:text-[#B833FF]">
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-5 text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A305A]/10 text-[#1A305A] dark:text-[#93C5FD] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'কৌশলগত পরামর্শ ও প্রাথমিক আলোচনা' : 'Strategic Advisory & Briefing'}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>
                  আমাদের সাথে সরাসরি <span className="b-border">যোগাযোগ করুন</span>
                </>
              ) : (
                <>
                  Connect With Our <span className="b-border">Executive Council</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'আপনার প্রতিষ্ঠানের সুনাম রক্ষা, মিডিয়া ক্যাম্পেইন কিংবা সংকট নিরসনে একটি সুনির্দিষ্ট রূপরেখা তৈরি করতে আজই আমাদের সাথে কথা বলুন।'
                : 'Initiate a confidential strategic consultation with our senior communications council at our Gulshan-1 headquarters.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. DIRECT ADVISORY CONTACT CHANNELS (4 Metrics Cards)                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase font-bold text-slate-400">
              {lang === 'bn' ? 'সরাসরি হটলাইন' : 'Advisory Hotline'}
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-white">
              <a href="tel:+8801711268479" className="hover:text-[#A302FF] transition-colors">
                +880 1711 268 479
              </a>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase font-bold text-slate-400">
              {lang === 'bn' ? 'অফিসিয়াল ইমেইল' : 'Corporate Email'}
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-white truncate">
              <a href="mailto:contact@berlocommunications.com" className="hover:text-[#A302FF] transition-colors">
                contact@berlo...
              </a>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1A305A]/10 text-[#1A305A] dark:text-[#60A5FA] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase font-bold text-slate-400">
              {lang === 'bn' ? 'কার্যদিবস ও সময়' : 'Working Hours'}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {lang === 'bn' ? 'রবি - বৃহঃ ৯:০০ - ১৮:৩০' : 'Sun - Thu: 9 AM - 6:30 PM'}
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F61C0D]/10 text-[#F61C0D] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase font-bold text-slate-400">
              {lang === 'bn' ? 'সংকটকালীন ওয়ার-রুম' : 'Emergency Crisis'}
            </div>
            <div className="text-sm font-bold text-[#F61C0D]">
              {lang === 'bn' ? '২৪/৭ সার্বক্ষণিক সক্রিয়' : '24/7 Rapid Activation'}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. FORM & CORPORATE HEADQUARTERS GRID                                     */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] p-8 sm:p-12 shadow-xl">
            <div className="space-y-2 mb-8">
              <h2 className="section-main-title text-slate-900 dark:text-white">
                {lang === 'bn' ? (
                  <>পরামর্শের জন্য <span className="b-border">তথ্য পাঠান</span></>
                ) : (
                  <>Submit a Strategic <span className="b-border">Briefing Request</span></>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {lang === 'bn'
                  ? 'অনুগ্রহ করে নিচের তথ্যগুলো পূরণ করুন। আমাদের সিনিয়র ডিরেক্টর দ্রুত যোগাযোগ করবেন।'
                  : 'Complete the inquiry below. All briefings are strictly protected by standard corporate NDA protocols.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#11813C]/10 border border-[#11813C]/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#11813C] text-white flex items-center justify-center mx-auto shadow-lg shadow-green-600/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {lang === 'bn' ? 'আপনার অনুরোধ সফলভাবে গৃহীত হয়েছে' : 'Inquiry Received Successfully'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  {lang === 'bn'
                    ? 'ধন্যবাদ! আমাদের সিনিয়র কমিউনিকেশনস কাউন্সিল পরবর্তী ৪ ঘণ্টার মধ্যে আপনার সাথে সরাসরি যোগাযোগ করবেন।'
                    : 'Thank you! Our senior communications director will review your brief and contact you within four business hours.'}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-[#A302FF] dark:text-[#B833FF] uppercase tracking-wider hover:underline cursor-pointer"
                  >
                    {lang === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Submit Another Request'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'bn' ? 'যেমন: মোহাম্মদ রহমান' : 'e.g. Johnathan Vance'}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1F232D] border border-slate-200 dark:border-[#2C3240] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF] rounded-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {lang === 'bn' ? 'প্রাতিষ্ঠানিক ইমেইল' : 'Corporate Email'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="corporate@company.com"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1F232D] border border-slate-200 dark:border-[#2C3240] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF] rounded-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {lang === 'bn' ? 'সরাসরি ফোন নম্বর' : 'Phone Number'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 17XX XXXXXX"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1F232D] border border-slate-200 dark:border-[#2C3240] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF] rounded-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {lang === 'bn' ? 'প্রতিষ্ঠানের নাম' : 'Organization Name'}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={lang === 'bn' ? 'যেমন: প্রাইম হোল্ডিংস লিমিটেড' : 'e.g. Apex Holdings PLC'}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1F232D] border border-slate-200 dark:border-[#2C3240] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF] rounded-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {lang === 'bn' ? 'আগ্রহী সক্ষমতা বা সেবা' : 'Capability of Interest'}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1F232D] border border-slate-200 dark:border-[#2C3240] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#A302FF] rounded-none"
                  >
                    <option value="">{lang === 'bn' ? 'সেবা নির্বাচন করুন...' : 'Select a capability...'}</option>
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {lang === 'bn' ? 'আপনার বার্তা বা ব্রিফিং' : 'Briefing Details'} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'bn' ? 'আপনার প্রতিষ্ঠানের লক্ষ্য বা সংকট সম্পর্কিত সংক্ষেপ বিবরণ...' : 'Summarize your corporate narrative, campaign objectives, or emergency brief...'}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1F232D] border border-slate-200 dark:border-[#2C3240] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A302FF] rounded-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? (lang === 'bn' ? 'প্রেরণ করা হচ্ছে...' : 'Submitting Brief...') : (lang === 'bn' ? 'পরামর্শ অনুরোধ প্রেরণ করুন' : 'Submit Consultation Request')}</span>
                  <FaArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Office Card & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] shadow-md space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A302FF] dark:text-[#B833FF]">
                <MapPin className="w-4 h-4" />
                <span>{lang === 'bn' ? 'কর্পোরেট প্রধান কার্যালয়' : 'Corporate Headquarters'}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Berlo Communications Ltd.
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {BRAND.contact.address[lang]}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-[#11813C]" />
                  <span>+880 1711 268 479</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                  <Mail className="w-3.5 h-3.5 text-[#A302FF]" />
                  <span>contact@berlocommunications.com</span>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="overflow-hidden border border-slate-200 dark:border-[#242424] shadow-md h-72 relative bg-slate-900">
              <iframe
                src={BRAND.contact.mapEmbedUrl}
                title="Berlo Communications Location"
                className="w-full h-full border-0 filter contrast-105"
                loading="lazy"
              />
            </div>

            {/* Non-Disclosure Assurance */}
            <div className="p-6 bg-slate-900 text-white flex items-start gap-4 shadow-md">
              <ShieldCheck className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white block mb-0.5 font-bold">
                  {lang === 'bn' ? 'গোপনীয়তা ও এনডিএ নিশ্চয়তা' : 'Strict Non-Disclosure Guarantee'}
                </strong>
                {lang === 'bn'
                  ? 'আপনার প্রেরিত সকল বাণিজ্যিক ও প্রাতিষ্ঠানিক তথ্য সর্বোচ্চ আন্তর্জাতিক প্রটোকল অনুযায়ী গোপন রাখা হবে।'
                  : 'All materials submitted through this form are protected by executive non-disclosure discretion.'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

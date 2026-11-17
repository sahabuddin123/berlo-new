import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Seo } from '../../components/common/Seo';
import { getPublicServices } from '../../services/publicApi';
import { ServiceItem } from '../../data/servicesData';
import {
  FaBullhorn,
  FaShieldAlt,
  FaBuilding,
  FaGlobeAmericas,
  FaMicrophoneAlt,
  FaHashtag,
  FaNewspaper,
  FaChartLine,
  FaHandshake,
  FaArrowRight,
  FaChevronRight,
} from 'react-icons/fa';
import { Award, CheckCircle2, HelpCircle } from 'lucide-react';

export const ServicesOverviewPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();
  const [dynamicServices, setDynamicServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    getPublicServices().then((data) => {
      if (isMounted && data && data.length > 0) {
        setDynamicServices(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const getServiceIcon = (name?: string) => {
    switch (name?.toLowerCase()) {
      case 'shieldcheck':
      case 'shield':
        return FaShieldAlt;
      case 'building':
        return FaBuilding;
      case 'globe':
        return FaGlobeAmericas;
      case 'mic':
      case 'microphone':
        return FaMicrophoneAlt;
      case 'hashtag':
        return FaHashtag;
      case 'newspaper':
        return FaNewspaper;
      case 'chart':
      case 'chartline':
        return FaChartLine;
      case 'handshake':
        return FaHandshake;
      default:
        return FaBullhorn;
    }
  };

  const servicesList = [
    {
      id: 'media-relations',
      link: '/services/media-relations',
      icon: FaBullhorn,
      isTopLeft: true,
      title: lang === 'bn' ? 'কৌশলগত গণমাধ্যম সংযোগ' : 'Strategic Media Relations',
      desc:
        lang === 'bn'
          ? 'শীর্ষ ১০০+ জাতীয় দৈনিক, প্রাইম-টাইম টেলিভিশন ও অনলাইন সংবাদমাধ্যমে সর্বোচ্চ প্রভাব সৃষ্টিকারী সম্পাদকীয় কাভারেজ।'
          : 'Elevate your corporate voice across 100+ national dailies, prime-time television broadcasts, and premier business bureaus with high-impact media placements.',
    },
    {
      id: 'crisis-management',
      link: '/services/crisis-management',
      icon: FaShieldAlt,
      title: lang === 'bn' ? 'সংকট ব্যবস্থাপনা ও প্রাতিষ্ঠানিক সুরক্ষা' : 'Crisis & Reputation Management',
      desc:
        lang === 'bn'
          ? '২৪/৭ ওয়ার-রুম সক্রিয়করণ, ভুল তথ্য দ্রুত প্রতিরোধ এবং জরুরি মুহূর্তে ব্র্যান্ডের বিশ্বাসযোগ্যতা রক্ষা।'
          : 'Rapid-response 24/7 war-room mobilization within 60 minutes to neutralize reputational vulnerabilities, counter misinformation, and restore stakeholder trust.',
    },
    {
      id: 'events-activations',
      link: '/services/events-activations',
      icon: FaBuilding,
      title: lang === 'bn' ? 'কর্পোরেট গালা ও ব্র্যান্ড কনক্লেভ' : 'Corporate Event & Brand Conclave',
      desc:
        lang === 'bn'
          ? 'উচ্চপর্যায়ের ব্যবসায়িক সামিট, স্টেকহোল্ডার গালা এবং ন্যাশনাল মিডিয়া কনক্লেভের পূর্ণাঙ্গ পরিকল্পনা ও নিখুঁত বাস্তবায়ন।'
          : 'Full-spectrum end-to-end orchestration of executive conferences, national gala ceremonies, and high-visibility media press conferences.',
    },
    {
      id: 'trade-fair',
      link: '/services/strategic-pr',
      icon: FaGlobeAmericas,
      title: lang === 'bn' ? 'আন্তর্জাতিক বাণিজ্য মেলা ও প্যাভিলিয়ন' : 'Trade Fair & International Pavilion PR',
      desc:
        lang === 'bn'
          ? 'ঢাকা আন্তর্জাতিক বাণিজ্য মেলাসহ বৈশ্বিক বাণিজ্য প্রদর্শনীতে প্যাভিলিয়ন ব্র্যান্ডিং, ভিআইপি প্রেস সফর ও ব্যাপক কাভারেজ।'
          : 'Dedicated communications strategies, high-profile ministerial press tours, and widespread media coverage for premier trade expos and corporate pavilions.',
    },
    {
      id: 'thought-leadership',
      link: '/services/thought-leadership',
      icon: FaMicrophoneAlt,
      title: lang === 'bn' ? 'সি-সুইট এক্সিকিউটিভ ও স্পিকার পজিশনিং' : 'Executive Speaker & C-Suite Positioning',
      desc:
        lang === 'bn'
          ? 'শীর্ষস্থানীয় নীতিনির্ধারক ও সিইওদের জাতীয় ফোরাম ও গণমাধ্যমে চিন্তাশীল নেতা হিসেবে প্রতিষ্ঠিত করা।'
          : 'Positioning chairpersons, managing directors, and industry pioneers as authoritative thought leaders across televised debates and leadership summits.',
    },
    {
      id: 'digital-pr',
      link: '/services/digital-pr',
      icon: FaHashtag,
      title: lang === 'bn' ? 'ডিজিটাল পিআর ও সোশ্যাল সেন্টিনেল' : 'Digital PR & Social Sentiment Newsroom',
      desc:
        lang === 'bn'
          ? 'ডিজিটাল প্ল্যাটফর্মে রিয়েল-টাইম জনমত পর্যবেক্ষণ, প্রভাবশালী ইনফ্লুয়েন্সার কোলাবরেশন ও ব্র্যান্ড ক্যাম্পেইন।'
          : 'Real-time social sentiment monitoring, proactive viral narrative steering, and high-authority digital syndication across premium online channels.',
    },
    {
      id: 'corporate-publishing',
      link: '/services/corporate-communications',
      icon: FaNewspaper,
      isBottomLeft: true,
      title: lang === 'bn' ? 'কর্পোরেট পাবলিশিং ও বার্ষিক প্রতিবেদন' : 'Corporate Publishing & Annual Reports',
      desc:
        lang === 'bn'
          ? 'বিনিয়োগকারী ও স্টেকহোল্ডারদের জন্য দৃষ্টিনন্দন বার্ষিক প্রতিবেদন, সিএসআর বুকলেট ও প্রাতিষ্ঠানিক ম্যাগাজিন প্রণয়ন।'
          : 'Editorial-grade narrative structuring, ESG impact reporting, and premium publication design for corporate annual reports and investor dossiers.',
    },
    {
      id: 'media-monitoring',
      link: '/services/media-relations',
      icon: FaChartLine,
      title: lang === 'bn' ? 'মিডিয়া মনিটরিং ও সেন্টিমেন্ট অ্যানালাইসিস' : 'Media Monitoring & Sentiment Analysis',
      desc:
        lang === 'bn'
          ? 'জাতীয় প্রিন্ট, অনলাইন ও সম্প্রচার মাধ্যমের সার্বক্ষণিক ট্র্যাকিং এবং বিশ্লেষণধর্মী এসওভি ও সেন্টিমেন্ট স্কোর প্রদান।'
          : 'Round-the-clock media surveillance, Share of Voice (SOV) metrics, and qualitative sentiment intelligence delivered directly to your boardroom.',
    },
    {
      id: 'advocacy',
      link: '/services/government-advocacy',
      icon: FaHandshake,
      title: lang === 'bn' ? 'পলিসি অ্যাডভোকেসি ও অংশীজন সম্পর্ক' : 'Advocacy & Public Affairs',
      desc:
        lang === 'bn'
          ? 'নিয়ন্ত্রক সংস্থা, ট্রেড বডি ও নীতি-নির্ধারকদের সাথে দ্বিপাক্ষিক আলোচনা ও ইতিবাচক শিল্প পরিবেশ তৈরির প্রচেষ্টা।'
          : 'Constructive dialogue facilitation with regulatory commissions, industry trade bodies, and government stakeholders to foster a favorable business ecosystem.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'সকল সেবাসমূহ — বার্লো কমিউনিকেশন্স' : 'Strategic Communications Services — Berlo Communications'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেডের পূর্ণাঙ্গ পিআর, মিডিয়া রিলেশনস, ক্রাইসিস ম্যানেজমেন্ট ও ইভেন্ট সেবাসমূহ।'
            : 'Explore full-spectrum PR, media relations, crisis mitigation, and brand activations by Berlo Communications Ltd.'
        }
        faqs={[
          {
            question: lang === 'bn' ? 'বার্লোর সাথে যোগাযোগের কত সময়ের মধ্যে কাজ শুরু হয়?' : 'How quickly can Berlo deploy a strategic PR campaign?',
            answer: lang === 'bn' ? 'প্রাথমিক পরামর্শ সেশনের পর ২৪ থেকে ৪৮ ঘণ্টার মধ্যে আমরা সামগ্রিক কৌশল পরিকল্পনা জমা দিই। সংকটকালীন ক্ষেত্রে ৬০ মিনিটের মধ্যে ওয়ার-রুম সক্রিয় হয়।' : 'Standard campaign blueprints are submitted within 24-48 hours post-briefing. In crisis scenarios, our emergency war-room activates within 60 minutes.',
          },
          {
            question: lang === 'bn' ? 'আপনারা কি নির্দিষ্ট কোনো খাতেই সীমাবদ্ধ?' : 'Do you specialize in specific industry sectors?',
            answer: lang === 'bn' ? 'আমরা ব্যাংকিং, ফাইন্যান্স, টেলিকম, এফএমসিজি, এনার্জি, স্বাস্থ্যসেবা ও আন্তর্জাতিক উন্নয়ন খাতের শীর্ষ প্রতিষ্ঠানের সাথে কাজ করি।' : 'We serve tier-1 leaders across Banking, Telecommunications, FMCG, Pharmaceuticals, Heavy Industry, and Development agencies.',
          },
          {
            question: lang === 'bn' ? 'মিডিয়া কাভারেজের নিশ্চয়তা কীভাবে পরিমাপ করা হয়?' : 'How is media success quantified and reported?',
            answer: lang === 'bn' ? 'আমরা স্বাধীন অডিট রিপোর্ট, শেয়ার অব ভয়েস (SOV) শতাংশ, পজিটিভ সেন্টিমেন্ট ট্র্যাকিং ও বিজ্ঞাপনী সমতুল্য মূল্য (AVE) দিয়ে ফলাফল পরিমাপ করি।' : 'All deliverables are tracked through independent editorial clippings, sentiment scoring, Share of Voice metrics, and executive board presentations.',
          },
          {
            question: lang === 'bn' ? 'গোপনীয়তার নিশ্চয়তা কীভাবে নিশ্চিত করেন?' : 'How do you safeguard client confidentiality?',
            answer: lang === 'bn' ? 'আমাদের প্রতিটি প্রকল্প আন্তর্জাতিক মানদণ্ডের নন-ডিসক্লোজার এগ্রিমেন্ট (NDA) প্রটোকল দ্বারা সুরক্ষিত।' : 'Every engagement is bound by stringent Non-Disclosure Agreements (NDAs), ensuring complete boardroom privacy and strategic discretion.',
          },
        ]}
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
              {lang === 'bn' ? 'সেবাসমূহ' : 'Services'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-5 text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'কৌশলগত জনসংযোগ সক্ষমতা' : 'Full-Spectrum Agency Capabilities'}</span>
            </div>

            <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>
                  উদ্ভাবনী কৌশল ও ফলাফলনির্ভর <span className="b-border">পিআর সমাধান</span>
                </>
              ) : (
                <>
                  Strategic PR & Communications <span className="b-border">Capabilities</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'বার্লো কমিউনিকেশন্স আধুনিক কর্পোরেট জগতের জটিল চ্যালেঞ্জ মোকাবিলায় পূর্ণাঙ্গ ও প্রামাণ্য সেবা প্রদান করে। মিডিয়া সম্পর্ক থেকে সংকট ব্যবস্থাপনা—প্রতিটি ক্ষেত্রে আমরা নিশ্চিত করি সর্বোচ্চ প্রভাব।'
                : 'From high-impact tier-1 national media placement to 60-minute crisis war-room protocols, explore our full suite of enterprise public relations capabilities.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. ALL 9 SERVICES (Exact 3x3 Grid, IMBD Mobile Style Centered)           */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(dynamicServices.length > 0
            ? dynamicServices.map((s, idx) => ({
                id: s.slug || s.id,
                link: `/services/${s.slug}`,
                icon: getServiceIcon(s.iconName),
                isTopLeft: idx === 0,
                isBottomLeft: idx === dynamicServices.length - 3,
                title: s.title[lang] || s.title.en,
                desc: s.shortDesc[lang] || s.shortDesc.en,
              }))
            : servicesList
          ).map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`service-eq-card relative ${
                  service.isTopLeft ? 'top-left-border-accent' : ''
                } ${service.isBottomLeft ? 'bottom-left-border-accent' : ''}`}
              >
                <Link
                  to={formatRoute(service.link.replace(/^\//, ''))}
                  className="relative z-10 flex flex-col justify-between bg-white dark:bg-[#161616] p-6 sm:p-8 lg:p-10 border border-slate-200 dark:border-[#242424] min-h-[270px] sm:min-h-[340px] shadow-sm hover:border-[#A302FF] dark:hover:border-[#B833FF] hover:shadow-xl transition-all duration-300 h-full group text-center md:text-left items-center md:items-start"
                >
                  <div className="flex flex-col items-center md:items-start w-full">
                    {/* Circular Icon with Signature Brand Purple */}
                    <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-full bg-[#A302FF] flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform duration-300 mx-auto md:mx-0">
                      <Icon className="w-7 h-7 sm:w-6 sm:h-6 text-white" />
                    </div>

                    {/* Title: Centered on Mobile */}
                    <h3 className="text-[19px] sm:text-[21px] lg:text-[22px] font-bold text-slate-900 dark:text-white mt-5 sm:mt-6 group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors leading-snug text-center md:text-left">
                      {service.title}
                    </h3>

                    {/* Description: Centered on Mobile */}
                    <p className="text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#A0A0A0] text-center md:text-left mt-3 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Bottom explore link */}
                  <div className="hidden md:flex mt-5 sm:mt-6 pt-4 border-t border-slate-200 dark:border-[#262626] items-center justify-between text-xs font-semibold text-slate-600 dark:text-[#7A7A7A] group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors w-full">
                    <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Capability'}</span>
                    <FaArrowRight className="w-3.5 h-3.5 text-[#A302FF] dark:text-[#B833FF] transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. STRATEGIC METHODOLOGY & WORKFLOW                                      */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-900 dark:bg-[#07090D] border-y border-slate-800 dark:border-[#1F1F1F] text-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A302FF]/20 text-[#B833FF] text-xs font-bold uppercase tracking-wider">
              {lang === 'bn' ? 'আমাদের কর্মপদ্ধতি' : 'The Berlo Process'}
            </div>
            <h2 className="section-main-title text-white text-center">
              {lang === 'bn' ? (
                <>৪ ধাপে নিখুঁত ফলাফল অর্জনের <span className="b-border">কৌশলগত প্রক্রিয়া</span></>
              ) : (
                <>Our Proven 4-Stage <span className="b-border">Strategic Execution</span></>
              )}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              {lang === 'bn'
                ? 'গবেষণা থেকে শুরু করে জাতীয় গণমাধ্যমে সম্প্রচার ও ফলাফল বিশ্লেষণ—প্রতিটি ধাপে থাকে নির্ভুল পেশাদারিত্ব।'
                : 'From diagnostic sentiment audits to national broadcast dissemination, every phase is engineered for maximum commercial resonance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: lang === 'bn' ? 'কৌশলগত নিরীক্ষা ও ন্যারেটিভ ম্যাপিং' : 'Strategic Audit & Narrative Mapping',
                desc:
                  lang === 'bn'
                    ? 'প্রতিষ্ঠানের অভ্যন্তরীণ শক্তি, বাজারের গতিপথ ও প্রধান অংশীজনদের মনোভাব পুঙ্খানুপুঙ্খ বিশ্লেষণ।'
                    : 'Deep organizational diagnosis, sentiment mapping, and executive narrative architecture tailored to business milestones.',
              },
              {
                step: '02',
                title: lang === 'bn' ? 'ওয়ার-রুম ও সম্পাদকীয় ফ্রেমওয়ার্ক' : 'War-Room & Newsroom Framing',
                desc:
                  lang === 'bn'
                    ? 'শীর্ষ সম্পাদক ও নীতিনির্ধারকদের মনোযোগ আকর্ষণকারী প্রামাণ্য প্রেস প্যাকেজ ও কি-মেসেজ তৈরি।'
                    : 'Crafting authoritative press dossiers, executive soundbites, and multi-channel editorial briefs that journalists value.',
              },
              {
                step: '03',
                title: lang === 'bn' ? 'মাল্টি-চ্যানেল মিডিয়া অ্যামপ্লিফিকেশন' : 'Tier-1 Media Amplification',
                desc:
                  lang === 'bn'
                    ? 'প্রিন্ট, টেলিভিশন, ডিজিটাল ও সি-সুইট ফোরামে একযোগে সমন্বিত বার্তার শক্তিশালী সম্প্রচার।'
                    : 'Simultaneous deployment across 100+ national dailies, prime-time television channels, and executive digital platforms.',
              },
              {
                step: '04',
                title: lang === 'bn' ? 'সেন্টিমেন্ট ট্র্যাকিং ও এসওভি রিপোর্ট' : 'Sentiment Tracking & SOV Intelligence',
                desc:
                  lang === 'bn'
                    ? 'রিয়েল-টাইম গণমাধ্যম পর্যবেক্ষণ, শেয়ার অব ভয়েস (SOV) ও বাণিজ্যিক প্রভাবের স্বাধীন বিশ্লেষণ।'
                    : 'Continuous broadcast monitoring, qualitative sentiment scoring, and executive SOV analytics delivered to leadership.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#0E1118] border border-slate-800 hover:border-[#A302FF] transition-all duration-300 space-y-4 group relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl font-black text-[#A302FF] dark:text-[#B833FF] mb-3 group-hover:scale-110 transition-transform origin-left">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#B833FF] transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-3">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-[#11813C] dark:text-[#22C55E] font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'প্রমাণিত কর্মপদ্ধতি' : 'Standardized Protocol'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. FREQUENTLY ASKED QUESTIONS (FAQ)                                      */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A305A]/10 text-[#1A305A] dark:text-[#93C5FD] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'Common Questions'}</span>
          </div>
          <h2 className="section-main-title text-slate-900 dark:text-white text-center">
            {lang === 'bn' ? (
              <>আমাদের সেবা সম্পর্কিত <span className="b-border">সাধারণ প্রশ্নোত্তর</span></>
            ) : (
              <>Frequently Asked <span className="b-border">Questions</span></>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              q: lang === 'bn' ? 'বার্লোর সাথে যোগাযোগের কত সময়ের মধ্যে কাজ শুরু হয়?' : 'How quickly can Berlo deploy a strategic PR campaign?',
              a: lang === 'bn' ? 'প্রাথমিক পরামর্শ সেশনের পর ২৪ থেকে ৪৮ ঘণ্টার মধ্যে আমরা সামগ্রিক কৌশল পরিকল্পনা জমা দিই। সংকটকালীন ক্ষেত্রে ৬০ মিনিটের মধ্যে ওয়ার-রুম সক্রিয় হয়।' : 'Standard campaign blueprints are submitted within 24-48 hours post-briefing. In crisis scenarios, our emergency war-room activates within 60 minutes.',
            },
            {
              q: lang === 'bn' ? 'আপনারা কি নির্দিষ্ট কোনো খাতেই সীমাবদ্ধ?' : 'Do you specialize in specific industry sectors?',
              a: lang === 'bn' ? 'আমরা ব্যাংকিং, ফাইন্যান্স, টেলিকম, এফএমসিজি, এনার্জি, স্বাস্থ্যসেবা ও আন্তর্জাতিক উন্নয়ন খাতের শীর্ষ প্রতিষ্ঠানের সাথে কাজ করি।' : 'We serve tier-1 leaders across Banking, Telecommunications, FMCG, Pharmaceuticals, Heavy Industry, and Development agencies.',
            },
            {
              q: lang === 'bn' ? 'মিডিয়া কাভারেজের নিশ্চয়তা কীভাবে পরিমাপ করা হয়?' : 'How is media success quantified and reported?',
              a: lang === 'bn' ? 'আমরা স্বাধীন অডিট রিপোর্ট, শেয়ার অব ভয়েস (SOV) শতাংশ, পজিটিভ সেন্টিমেন্ট ট্র্যাকিং ও বিজ্ঞাপনী সমতুল্য মূল্য (AVE) দিয়ে ফলাফল পরিমাপ করি।' : 'All deliverables are tracked through independent editorial clippings, sentiment scoring, Share of Voice metrics, and executive board presentations.',
            },
            {
              q: lang === 'bn' ? 'গোপনীয়তার নিশ্চয়তা কীভাবে নিশ্চিত করেন?' : 'How do you safeguard client confidentiality?',
              a: lang === 'bn' ? 'আমাদের প্রতিটি প্রকল্প আন্তর্জাতিক মানদণ্ডের নন-ডিসক্লোজার এগ্রিমেন্ট (NDA) প্রটোকল দ্বারা সুরক্ষিত।' : 'Every engagement is bound by stringent Non-Disclosure Agreements (NDAs), ensuring complete boardroom privacy and strategic discretion.',
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#242424] p-6 sm:p-8 shadow-xs space-y-3"
            >
              <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {faq.q}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. BOTTOM CTA                                                            */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 bg-gradient-to-r from-[#1A305A] via-[#152340] to-[#0D182E] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'আপনার প্রতিষ্ঠানের জন্য একটি কাস্টমাইজড পিআর প্রস্তাব চান?'
                : 'Need a Customized Strategic Communications Proposal?'}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {lang === 'bn'
                ? 'আমাদের সিনিয়র পরিচালকদের সাথে একটি গোপনীয় প্রাথমিক আলোচনার জন্য আজই যোগাযোগ করুন।'
                : 'Connect with our leadership council for a bespoke advisory proposal aligned with your enterprise milestones.'}
            </p>
          </div>
          <Link
            to={formatRoute('contact')}
            className="px-7 py-3.5 bg-[#A302FF] text-white hover:bg-[#8D00DE] text-xs font-bold uppercase tracking-widest transition-all rounded-none shrink-0 shadow-lg shadow-purple-900/30 inline-flex items-center gap-2"
          >
            <span>{lang === 'bn' ? 'বিনামূল্যে পরামর্শ নিন' : 'Book Strategic Briefing'}</span>
            <FaArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

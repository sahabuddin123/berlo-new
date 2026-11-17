import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { insightsData } from '../../data/insightsData';
import { Seo } from '../../components/common/Seo';
import {
  Calendar,
  Play,
  CheckCircle2,
  ShieldAlert,
  Newspaper,
  Building2,
  Target,
  Scale,
  Radio,
  Sparkles,
  UserCheck,
  Globe,
  Clock,
  Send,
  ChevronRight,
  TrendingUp,
  Award,
  ArrowRight,
} from 'lucide-react';

const articleImages: Record<string, string> = {
  'art-1': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  'art-2': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
  'art-3': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
};

const categoryLabels: Record<string, { en: string; bn: string }> = {
  crisis: { en: 'Crisis PR', bn: 'সংকট জনসংযোগ' },
  reputation: { en: 'Reputation', bn: 'সুনাম ব্যবস্থাপনা' },
  media: { en: 'Media Relations', bn: 'গণমাধ্যম কৌশল' },
  digital: { en: 'Digital PR', bn: 'ডিজিটাল পিআর' },
  trends: { en: 'Industry Trends', bn: 'শিল্প প্রবণতা' },
};

export const HomePage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();

  // Consultation form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Strategic Media Relations',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Active Video Modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Hero interactive slider & typewriter state matching IMBD reference
  const heroSlides = [
    {
      id: 1,
      tag: lang === 'bn' ? 'কর্পোরেট সুনাম সুরক্ষা' : 'Reputation Architecture',
      text:
        lang === 'bn'
          ? 'কর্পোরেট সুনাম সুরক্ষা ও সি-সুইট এক্সিকিউটিভ ব্র্যান্ডিং।'
          : 'Architecting enduring corporate reputation and C-suite authority.',
      metric: lang === 'bn' ? '+৩২০% ইতিবাচক জনমত' : '+320% Positive Sentiment',
      submetric: lang === 'bn' ? '১০০+ শীর্ষ নিউজডেস্ক সংযোগ' : '100+ Tier-1 Newsdesks Engaged',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'text-[#A302FF] dark:text-[#B833FF]',
      borderColor: 'border-[#A302FF]',
    },
    {
      id: 2,
      tag: lang === 'bn' ? '২৪/৭ ক্রাইসিস ওয়ার-রুম' : '24/7 Crisis War-Room',
      text:
        lang === 'bn'
          ? '২৪/৭ দ্রুত সংকট ব্যবস্থাপনা: সুনামহানি প্রতিরোধে নির্ভরযোগ্য প্রটোকল।'
          : '24/7 Rapid Crisis War-Room: De-escalating reputational risks within 60 minutes.',
      metric: lang === 'bn' ? '৬০ মিনিট প্রতিক্রিয়া গতি' : '60-Minute Rapid Response',
      submetric: lang === 'bn' ? '১০০% এনডিএ নিশ্চয়তা' : '100% Boardroom NDA Protocol',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'text-[#11813C] dark:text-[#16A34A]',
      borderColor: 'border-[#11813C]',
    },
    {
      id: 3,
      tag: lang === 'bn' ? 'জাতীয় গণমাধ্যম সংযোগ' : 'Tier-1 Media Access',
      text:
        lang === 'bn'
          ? 'জাতীয় শীর্ষ দৈনিক ও টেলিভিশন নেটওয়ার্কে সরাসরি সম্পাদকীয় সংযোগ।'
          : 'Securing prime-time broadcast and national front-page editorial coverage.',
      metric: lang === 'bn' ? '৯৮.৭% কভারেজ সাফল্য' : '98.7% Media Placement Success',
      submetric: lang === 'bn' ? '২৫০+ সফল ক্যাম্পেইন' : '250+ Corporate Campaigns',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      badgeColor: 'text-[#00A896] dark:text-[#14B8A6]',
      borderColor: 'border-[#00A896]',
    },
  ];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  // Typewriter effect matching simulateTyping() from reference website
  useEffect(() => {
    const currentTargetText = heroSlides[activeSlideIndex].text;
    let charIndex = 0;
    setTypedText('');

    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedText(currentTargetText.substring(0, charIndex));
      if (charIndex >= currentTargetText.length) {
        clearInterval(typeInterval);
      }
    }, 45);

    const slideTimer = setTimeout(() => {
      setActiveSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 7500);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(slideTimer);
    };
  }, [activeSlideIndex, lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', service: 'Strategic Media Relations' });
    }, 6000);
  };

  // 9 PR Services in exact 3x3 layout matching the reference cards
  const servicesList = [
    {
      id: 'media-relations',
      icon: Newspaper,
      title: lang === 'bn' ? 'জাতীয় মিডিয়া সম্পর্ক ও প্রেস কনফারেন্স' : 'Strategic Media Relations',
      desc:
        lang === 'bn'
          ? '১০০+ শীর্ষ জাতীয় দৈনিক, টেলিভিশন নেটওয়ার্ক ও বিজনেস ব্যুরোর সাথে সরাসরি সংযোগ স্থাপনের মাধ্যমে আপনার ব্র্যান্ড ন্যারেটিভকে জাতীয় আলোচনার শীর্ষে রাখুন।'
          : 'Elevate your corporate voice across 100+ national dailies, prime-time television broadcasts, and premier business bureaus with high-impact media placements.',
      link: '/services/strategic-media-relations',
      isTopLeft: true,
      isBottomLeft: false,
    },
    {
      id: 'crisis-management',
      icon: ShieldAlert,
      title: lang === 'bn' ? 'সংকট ব্যবস্থাপনা ও সুনাম সুরক্ষা' : 'Crisis & Reputation Management',
      desc:
        lang === 'bn'
          ? 'সুনামের যেকোনো হুমকি চিহ্নিত হওয়ার পর তাৎক্ষণিক ওয়ার-রুম কার্যকরীকরণ এবং দ্রুত প্রেস ব্রিফিংয়ের মাধ্যমে নেতিবাচক জনমত প্রশমন ও নিয়ন্ত্রণ।'
          : 'Rapid-response 24/7 war-room mobilization within 60 minutes to neutralize reputational vulnerabilities, de-escalate misinformation, and restore stakeholder trust.',
      link: '/services/crisis-reputation-management',
      isTopLeft: false,
      isBottomLeft: false,
    },
    {
      id: 'corporate-comms',
      icon: Building2,
      title: lang === 'bn' ? 'কর্পোরেট যোগাযোগ ও উপদেষ্টা' : 'Corporate Comms & Advisory',
      desc:
        lang === 'bn'
          ? 'সি-সুইট এক্সিকিউটিভ বার্তা, অংশীজন সমন্বয় এবং আধুনিক সুশাসনকেন্দ্রিক বার্ষিক প্রতিবেদন ও প্রেস রিলিজের মাধ্যমে করপোরেট গ্রহণযোগ্যতা বৃদ্ধি।'
          : 'Executive messaging, board-level stakeholder alignment, and governance communications engineered to reinforce leadership authority and market valuation.',
      link: '/services/corporate-communications',
      isTopLeft: false,
      isBottomLeft: false,
    },
    {
      id: 'brand-positioning',
      icon: Target,
      title: lang === 'bn' ? 'কৌশলগত ব্র্যান্ড ও মার্কেট পিআর' : 'Strategic Brand PR Positioning',
      desc:
        lang === 'bn'
          ? 'বাজারে দীর্ঘস্থায়ী সুনাম প্রতিষ্ঠা, নতুন পণ্য উন্মোচন এবং গবেষণা ও বিশ্লেষণভিত্তিক যোগাযোগের মাধ্যমে আপনার ব্র্যান্ডকে অন্যদের চেয়ে অনন্যভাবে উপস্থাপন।'
          : 'Differentiating corporate identity, architecting brand equity, and executing disruptive product launch narratives that capture measurable market leadership.',
      link: '/services/content-storytelling',
      isTopLeft: false,
      isBottomLeft: false,
    },
    {
      id: 'gov-advocacy',
      icon: Scale,
      title: lang === 'bn' ? 'পাবলিক পলিসি ও রেগুলেটরি সম্পর্ক' : 'Government Affairs & Advocacy',
      desc:
        lang === 'bn'
          ? 'নীতিগত সংলাপ, নিয়ন্ত্রক সংস্থার সাথে স্বচ্ছ আলোচনা ও শিল্পবান্ধব নীতি সংস্কারে অংশীজনদের যুক্ত করার মাধ্যমে গঠনমূলক সমাধান নিশ্চিতকরণ।'
          : 'Facilitating transparent dialogue with policy makers, regulatory bodies, and industry chambers to advance ethical public-private partnerships.',
      link: '/services/government-advocacy',
      isTopLeft: false,
      isBottomLeft: false,
    },
    {
      id: 'digital-pr',
      icon: Radio,
      title: lang === 'bn' ? 'ডিজিটাল পিআর ও জনমত বিশ্লেষণ' : 'Digital PR & Social Sentiment',
      desc:
        lang === 'bn'
          ? 'রিয়েল-টাইম অনলাইন মিডিয়া পর্যবেক্ষণ, ডিজিটাল সেন্টিমেন্ট রিকভারি এবং শীর্ষ ইনফ্লুয়েন্সার ও অনলাইন প্ল্যাটফর্মে সক্রিয় ব্র্যান্ড দৃশ্যমানতা।'
          : 'AI-driven social listening, digital sentiment management, search authority building, and trusted influencer collaborations that amplify credibility.',
      link: '/services/digital-pr-influencers',
      isTopLeft: false,
      isBottomLeft: false,
    },
    {
      id: 'events-conclaves',
      icon: Sparkles,
      title: lang === 'bn' ? 'উচ্চ-প্রভাবশালী ইভেন্ট ও কনক্লেভ' : 'High-Impact Events & Conclaves',
      desc:
        lang === 'bn'
          ? 'জাতীয় প্রেস কনফারেন্স, মিডিয়া রাউন্ডটেবিল ও বহুজাতিক কর্পোরেট সম্মেলনের নিখুঁত রূপায়ণ, যা নিশ্চিত করে ব্যাপক প্রচার ও অংশীজনদের সক্রিয় অংশগ্রহণ।'
          : 'Flawless orchestration of high-profile press conferences, CEO roundtables, national industry symposiums, and brand activations with guaranteed media turnout.',
      link: '/services/events-brand-activations',
      isTopLeft: false,
      isBottomLeft: true,
    },
    {
      id: 'thought-leadership',
      icon: UserCheck,
      title: lang === 'bn' ? 'সি-সুইট এক্সিকিউটিভ ব্র্যান্ডিং' : 'Executive Thought Leadership',
      desc:
        lang === 'bn'
          ? 'শীর্ষ করপোরেট ব্যক্তিত্বের অপ-এড রচনা, কিনোট বক্তৃতা প্রস্তুতি ও শিল্প বিশেষজ্ঞ হিসেবে জাতীয় গণমাধ্যমে জোরালো উপস্থিতি প্রতিষ্ঠা।'
          : 'Op-ed ghostwriting, keynote speechcrafting, and proactive media profiling that positions C-suite executives as foremost industry authorities.',
      link: '/services/strategic-pr-reputation',
      isTopLeft: false,
      isBottomLeft: false,
    },
    {
      id: 'csr-comms',
      icon: Globe,
      title: lang === 'bn' ? 'টেকসই উন্নয়ন ও সিএসআর পিআর' : 'CSR & Sustainability Comms',
      desc:
        lang === 'bn'
          ? 'ইএসজি প্রতিশ্রুতি প্রচার, সামাজিক দায়িত্বশীলতার ফলাফল প্রকাশ এবং ইতিবাচক সমাজ বিনির্মাণমূলক উদ্যোগসমূহের কার্যকর জনসংযোগ।'
          : 'Communicating ESG metrics, social investment milestones, and donor-funded community initiatives to inspire genuine stakeholder and public trust.',
      link: '/services/corporate-communications',
      isTopLeft: false,
      isBottomLeft: false,
    },
  ];

  // 12 Top enterprise clients in continuous marquee
  const clientLogos = [
    { name: 'bKash', category: lang === 'bn' ? 'ফিনটেক' : 'FinTech' },
    { name: 'Grameenphone', category: lang === 'bn' ? 'টেলিকম' : 'Telecom' },
    { name: 'Walton', category: lang === 'bn' ? 'কনজিউমার টেক' : 'Consumer Tech' },
    { name: 'PRAN-RFL', category: lang === 'bn' ? 'এফএমসিজি কনগ্লোমারেট' : 'FMCG Conglomerate' },
    { name: 'Summit Group', category: lang === 'bn' ? 'বিদ্যুৎ ও অবকাঠামো' : 'Power & Infra' },
    { name: 'Square Pharma', category: lang === 'bn' ? 'স্বাস্থ্যসেবা ও ফার্মা' : 'Healthcare' },
    { name: 'BRAC Bank', category: lang === 'bn' ? 'ব্যাংকিং' : 'Banking' },
    { name: 'Beximco', category: lang === 'bn' ? 'কনগ্লোমারেট' : 'Conglomerate' },
    { name: 'Unilever Bangladesh', category: lang === 'bn' ? 'গ্লোবাল এফএমসিজি' : 'FMCG Global' },
    { name: 'Standard Chartered', category: lang === 'bn' ? 'আন্তর্জাতিক ব্যাংকিং' : 'Banking' },
    { name: 'City Bank', category: lang === 'bn' ? 'আর্থিক প্রতিষ্ঠান' : 'Financial' },
    { name: 'Robi Axiata', category: lang === 'bn' ? 'টেলিকম' : 'Telecom' },
  ];

  // 3 Video Testimonials
  const videoTestimonials = [
    {
      id: 1,
      name: lang === 'bn' ? 'সৈয়দ মাহবুবুর রহমান' : 'Syed Mahbubur Rahman',
      title: lang === 'bn' ? 'ব্যবস্থাপনা পরিচালক ও সিইও' : 'Managing Director & CEO',
      company: lang === 'bn' ? 'মিউচুয়াল ট্রাস্ট ব্যাংক' : 'Mutual Trust Bank PLC',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
      quote:
        lang === 'bn'
          ? 'আমাদের রি-ব্র্যান্ডিং এবং জাতীয় আর্থিক প্রতিবেদন প্রচারে বার্লোর কৌশলগত নির্দেশনা ছিল প্রশংসনীয়। তাদের মিডিয়া সংযোগ অতুলনীয়।'
          : 'Berlo’s strategic counsel during our nationwide brand repositioning was flawless. Their media access and crisis instincts are truly unmatched.',
    },
    {
      id: 2,
      name: lang === 'bn' ? 'তানিয়া শারমিন' : 'Tania Sharmin',
      title: lang === 'bn' ? 'প্রধান, করপোরেট অ্যাফেয়ার্স' : 'Head of Corporate Affairs',
      company: lang === 'bn' ? 'শীর্ষ বহুজাতিক কনগ্লোমারেট' : 'Leading Multiconglomerate',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      quote:
        lang === 'bn'
          ? 'সংবেদনশীল কর্পোরেট পরিস্থিতিতে বার্লো সর্বোচ্চ গোপনীয়তা ও অবিশ্বাস্য ক্ষিপ্রতায় সঠিক ফলাফল নিশ্চিত করে।'
          : 'In high-stakes corporate situations, Berlo delivers with pinpoint precision, boardroom confidentiality, and extraordinary speed.',
    },
    {
      id: 3,
      name: lang === 'bn' ? 'কাজী আশরাফুল ইসলাম' : 'Kazi Ashraful Islam',
      title: lang === 'bn' ? 'পরিচালক, এক্সটার্নাল কমিউনিকেশন্স' : 'Director of External Comms',
      company: lang === 'bn' ? 'শীর্ষ ফিনটেক প্রতিষ্ঠান' : 'National FinTech Leader',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
      quote:
        lang === 'bn'
          ? 'প্রেস কনক্লেভ থেকে শুরু করে পলিসি অ্যাডভোকেসি পর্যন্ত, বার্লো সবসময় আমাদের সবচেয়ে নির্ভরযোগ্য পিআর পার্টনার।'
          : 'From press conclaves to regulatory advocacy, Berlo has consistently proven to be our most dependable communications ally.',
    },
  ];

  // 12 Photos for "Memories & Moments" mosaic
  const momentPhotos = [
    {
      title: lang === 'bn' ? 'জাতীয় টেক সম্মেলন ও প্রেস ব্রিফিং' : 'National Tech Summit Press Briefing',
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: lang === 'bn' ? 'শীর্ষ মিডিয়া এডিটরস রাউন্ডটেবিল' : 'Chief Editors Media Roundtable',
      url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: lang === 'bn' ? 'কর্পোরেট রি-ব্র্যান্ডিং গালা উদ্বোধন' : 'Corporate Rebranding Gala Launch',
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: lang === 'bn' ? 'কৌশলগত ক্রাইসিস ওয়ার-রুম বিশ্লেষণ' : 'Crisis War-Room Strategic Session',
      url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: lang === 'bn' ? 'টেলিভিশন স্টুডিও সাক্ষাৎকার পরিচালনা' : 'Broadcast Studio Interview Coordination',
      url: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: lang === 'bn' ? 'কর্পোরেট অংশীদারিত্ব চুক্তি স্বাক্ষর' : 'Strategic Corporate Partnership Signing',
      url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: lang === 'bn' ? 'বার্ষিক জনসংযোগ এক্সিলেন্স অ্যাওয়ার্ড' : 'Annual PR Excellence Recognition',
      url: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: lang === 'bn' ? 'সি-সুইট পলিসি কনক্লেভ' : 'C-Suite Policy Dialogue Conclave',
      url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: lang === 'bn' ? 'ফিনটেক লিডারশিপ সাংবাদিক সম্মেলন' : 'FinTech Leadership Press Conference',
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: lang === 'bn' ? 'বার্লো স্ট্র্যাটেজি অ্যান্ড প্ল্যানিং টিম' : 'Berlo Strategy & Planning Team',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: lang === 'bn' ? 'সিএসআর ফ্ল্যাগশিপ প্রজেক্ট উদ্বোধন' : 'CSR Flagship Project Inauguration',
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: lang === 'bn' ? 'আন্তর্জাতিক ডেলিগেটস রিসেপশন' : 'International Media Delegates Reception',
      url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const currentSlide = heroSlides[activeSlideIndex];

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#000000] text-slate-900 dark:text-[#FFFFFF] transition-colors duration-200">
      <Seo />

      {/* ========================================================================= */}
      {/* 01. HERO SECTION (Exact Same to Same layout, typography and animations)   */}
      {/* ========================================================================= */}
      <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: 55px Headline, 19px Description, Buttons, Affiliations */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Exact 55px Hero Headline in Berlo Brand Logo Colors */}
              <h1 className="hero-quote-title font-semibold tracking-normal text-[#1A305A] dark:text-[#FFFFFF]">
                <span className="font-serif text-[#A302FF] dark:text-[#B833FF]">“</span>
                {lang === 'bn' ? (
                  <>
                    কর্পোরেট{' '}
                    <span className="text-[#A302FF] dark:text-[#B833FF] font-extrabold">সাফল্যের</span>{' '}
                    অনন্য কৌশলগত{' '}
                    <span className="text-[#11813C] dark:text-[#16A34A] font-extrabold">পিআর</span>{' '}
                    পার্টনার।
                  </>
                ) : (
                  <>
                    Your{' '}
                    <span className="text-[#A302FF] dark:text-[#B833FF] font-extrabold">Strategic</span>{' '}
                    PR{' '}
                    <span className="text-[#11813C] dark:text-[#16A34A] font-extrabold">partner</span>{' '}
                    for corporate{' '}
                    <span className="text-[#A302FF] dark:text-[#B833FF] font-extrabold">success</span>.
                  </>
                )}
                <span className="font-serif text-[#A302FF] dark:text-[#B833FF]">”</span>
              </h1>

              {/* Exact 19px Description in #7A7A7A / justified */}
              <p className="text-[17px] sm:text-[19px] text-[#475569] dark:text-[#7A7A7A] leading-[1.65] text-justify font-normal">
                {lang === 'bn'
                  ? 'বার্লো কমিউনিকেশন্সে আপনাকে স্বাগতম—বাংলাদেশের অন্যতম শীর্ষস্থানীয় করপোরেট পিআর ও কৌশলগত যোগাযোগ সংস্থা। আমাদের উদ্ভাবনী কৌশল ও ফলমুখী দৃষ্টিভঙ্গির মাধ্যমে আমরা শীর্ষ প্রতিষ্ঠান ও বহুজাতিক ব্র্যান্ডের দীর্ঘমেয়াদী সুনাম বিনির্মাণ ও সংকট ব্যবস্থাপনা পরিচালনা করি।'
                  : 'Welcome to Berlo Communications Ltd., one of the premier Public Relations and strategic corporate communications agencies in Bangladesh. With our innovative narrative engineering and results-oriented media access, we help enterprises protect reputation, command authority, and accelerate sustainable growth.'}
              </p>

              {/* Buttons: Rectangular, 0px border-radius, Berlo brand colors */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#consultancy"
                  className="btn-berlo-primary"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{lang === 'bn' ? 'পরামর্শ সেশন বুক করুন' : 'Book Free Consultation'}</span>
                </a>
                <a
                  href="#services"
                  className="btn-berlo-outline"
                >
                  <span>{lang === 'bn' ? 'আমাদের সেবাসমূহ' : 'Working scope with you'}</span>
                </a>
              </div>

              {/* Affiliations row under buttons */}
              <div className="pt-6 border-t border-slate-200 dark:border-[#1F1F1F]">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#7A7A7A] mb-3">
                  {lang === 'bn' ? 'স্বীকৃত সংস্থা ও সদস্যপদ:' : 'Recognized Member & Affiliations:'}
                </div>
                <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <div className="flex items-center gap-2 hover:text-[#A302FF] transition-colors">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A302FF]" />
                    <span>BASIS</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-[#11813C] transition-colors">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#11813C]" />
                    <span>BAPRO</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-[#A302FF] transition-colors">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A302FF]" />
                    <span>PRCA Member</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-[#00A896] transition-colors">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00A896]" />
                    <span>e-CAB</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Slider with Exact Typewriter Animation & Floating Elements */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96 flex items-center justify-center">
                
                {/* Circular Gradient Backdrop using Berlo Logo Colors (Purple to Navy to Green) */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1A305A] via-[#A302FF] to-[#11813C] shadow-2xl shadow-purple-600/30 animate-pulse-subtle" />

                {/* Inner Graphic / Image Slide */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-88 lg:h-88 rounded-full overflow-hidden border-4 border-white/20 bg-[#111111]">
                  <img
                    key={currentSlide.id}
                    src={currentSlide.image}
                    alt="Berlo Senior PR Strategist"
                    className="w-full h-full object-cover object-top transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Floating Typewriter Box matching .type_area from IMBD reference website */}
                <div className="absolute -top-6 -right-2 sm:-right-8 bg-white/95 dark:bg-[#111111]/95 text-slate-900 dark:text-white p-4 rounded-none border border-slate-200 dark:border-[#262626] shadow-2xl backdrop-blur-md w-64 sm:w-72 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#11813C] animate-ping" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#11813C] dark:text-[#16A34A]">
                      {currentSlide.tag}
                    </span>
                  </div>
                  
                  {/* Dynamic typewriter text with blinking cursor */}
                  <div className="text-[13px] font-semibold leading-relaxed text-slate-800 dark:text-slate-200 min-h-[42px] typing-cursor">
                    {typedText}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#A302FF] dark:text-[#B833FF] flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {currentSlide.metric}
                    </span>
                    <span className="text-slate-500 dark:text-[#7A7A7A] text-[10px]">
                      {currentSlide.submetric}
                    </span>
                  </div>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute -bottom-3 -left-2 sm:-left-6 bg-white dark:bg-[#191919] text-slate-900 dark:text-white px-4 py-2.5 border border-slate-200 dark:border-[#262626] shadow-xl flex items-center gap-2 text-xs font-bold">
                  <Award className="w-4 h-4 text-[#A302FF] dark:text-[#B833FF]" />
                  <span>{lang === 'bn' ? '১২+ বছরের শ্রেষ্ঠত্ব' : '12+ Years PR Excellence'}</span>
                </div>

                {/* Slide indicator dots */}
                <div className="absolute -bottom-10 flex gap-2">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      type="button"
                      className={`h-1.5 transition-all duration-300 ${
                        activeSlideIndex === idx
                          ? 'w-6 bg-[#A302FF] dark:bg-[#B833FF]'
                          : 'w-2 bg-slate-300 dark:bg-slate-700'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. IN THE SPOTLIGHT (Exact Heading with .b-border)                       */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50 dark:bg-[#111111] border-b border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Section Title with .b-border highlighter */}
            <h2 className="section-main-title text-slate-900 dark:text-white shrink-0">
              {lang === 'bn' ? (
                <>মিডিয়ার <span className="b-border">স্পটলাইট</span></>
              ) : (
                <>In the <span className="b-border">Spotlight</span></>
              )}
            </h2>

            {/* Media Publication Marks */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8 items-center w-full md:w-auto text-center">
              <div className="text-slate-800 dark:text-slate-300 font-serif font-black text-sm hover:text-[#A302FF] dark:hover:text-[#B833FF] transition-colors cursor-pointer">
                The Business Standard
              </div>
              <div className="text-slate-800 dark:text-slate-300 font-bold text-sm hover:text-[#A302FF] dark:hover:text-[#B833FF] transition-colors cursor-pointer">
                প্রথম আলো
              </div>
              <div className="text-slate-800 dark:text-slate-300 font-serif font-bold text-sm hover:text-[#A302FF] dark:hover:text-[#B833FF] transition-colors cursor-pointer">
                The Daily Star
              </div>
              <div className="text-slate-800 dark:text-slate-300 font-sans font-extrabold text-sm hover:text-[#A302FF] dark:hover:text-[#B833FF] transition-colors cursor-pointer">
                DHAKA TRIBUNE
              </div>
              <div className="text-slate-800 dark:text-slate-300 font-serif text-sm italic hover:text-[#A302FF] dark:hover:text-[#B833FF] transition-colors cursor-pointer">
                Financial Express
              </div>
              <div className="text-slate-800 dark:text-slate-300 font-mono font-bold text-sm hover:text-[#A302FF] dark:hover:text-[#B833FF] transition-colors cursor-pointer">
                REUTERS
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. CINEMATIC VIDEO & WORKSPACE BANNER (Exact reference styling)          */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/8] sm:aspect-[21/9] border border-slate-200 dark:border-[#262626] shadow-2xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
            alt="Berlo PR Strategy Room"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Central Play Reel Button with brand purple glow */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <button
              onClick={() => setVideoModalOpen(true)}
              type="button"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#A302FF] hover:bg-[#8B00DC] text-white flex items-center justify-center shadow-2xl shadow-purple-600/50 hover:scale-110 transition-all duration-300 cursor-pointer"
              aria-label="Play agency video reel"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
            </button>
            <div className="mt-4 text-white font-semibold text-sm sm:text-base tracking-wide flex items-center gap-2">
              <span>{lang === 'bn' ? 'সংস্থার রিল দেখুন' : 'Watch Agency Reel'}</span>
              <span className="text-xs px-2 py-0.5 bg-white/20">2:45</span>
            </div>
          </div>

          {/* Bottom Tag */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 bg-black/70 px-3.5 py-1.5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#11813C]" />
            <span>
              {lang === 'bn'
                ? 'বার্লো স্ট্র্যাটেজিক নিউজরুম ও ক্রাইসিস কমান্ড সেন্টার — ঢাকা'
                : 'Berlo Strategic Newsroom & Crisis Command Center — Dhaka'}
            </span>
          </div>
        </div>

        {/* Video Modal Placeholder */}
        {videoModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setVideoModalOpen(false)}
          >
            <div
              className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#262626] p-6 max-w-2xl w-full text-slate-900 dark:text-white text-center space-y-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold">
                {lang === 'bn' ? 'বার্লো করপোরেট পিআর শোরিল' : 'Berlo Corporate PR Showreel'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#7A7A7A]">
                {lang === 'bn'
                  ? 'বার্লো কমিউনিকেশন্স কীভাবে সফল ব্র্যান্ড ন্যারেটিভ তৈরি করে, শীর্ষ মিডিয়া সংযোগ নিশ্চিত করে এবং সংকট মোকাবিলা করে তা দেখুন।'
                  : 'Discover how Berlo Communications architects narratives, commands Tier-1 newsroom access, and resolves high-stakes crisis response.'}
              </p>
              <div className="aspect-video bg-black rounded-none flex items-center justify-center border border-slate-200 dark:border-[#262626]">
                <Play className="w-12 h-12 text-[#A302FF]" />
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="btn-berlo-primary"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close Preview'}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 04. OUR SERVICES (Exact 3x3 Grid, 350px min-height, .b-border, corners)   */}
      {/* ========================================================================= */}
      <section id="services" className="py-16 lg:py-24 border-t border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row: Our <span class="b-border">Services</span> + VIEW ALL button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="section-main-title text-slate-900 dark:text-white">
                {lang === 'bn' ? (
                  <>আমাদের <span className="b-border">সেবাসমূহ</span></>
                ) : (
                  <>Our <span className="b-border">Services</span></>
                )}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-[#7A7A7A] mt-2 max-w-xl">
                {lang === 'bn'
                  ? 'আমাদের লক্ষ্য ক্লায়েন্টদের সাফল্য ও সম্মানকে নতুন উচ্চতায় পৌঁছে দেওয়া।'
                  : 'Focused on results we seek to raise the level of our corporate customers.'}
              </p>
            </div>
            <div>
              <Link
                to={formatRoute('services')}
                className="btn-berlo-outline"
              >
                <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'VIEW ALL'}</span>
              </Link>
            </div>
          </div>

          {/* 3x3 Card Grid (9 services) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {servicesList.map((service) => {
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
                    className="relative z-10 flex flex-col justify-between bg-white dark:bg-[#191919] p-8 sm:p-10 border border-slate-200 dark:border-[#262626] min-h-[350px] shadow-sm hover:border-[#A302FF] dark:hover:border-[#B833FF] hover:shadow-xl transition-all duration-300 h-full group"
                  >
                    <div>
                      {/* Circular Gradient Icon using Berlo Brand Purple & Navy */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#A302FF] to-[#1A305A] flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Title: 22px, font-weight 600 */}
                      <h3 className="text-[21px] sm:text-[22px] font-semibold text-slate-900 dark:text-white mt-6 group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors leading-snug">
                        {service.title}
                      </h3>

                      {/* Description: 15px, text-justify */}
                      <p className="text-[14px] sm:text-[15px] text-[#475569] dark:text-[#7A7A7A] text-justify mt-3.5 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#262626] flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-[#7A7A7A] group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors">
                      <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Capability'}</span>
                      <ArrowRight className="w-4 h-4 text-[#A302FF] dark:text-[#B833FF] transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. BOOK A FREE CONSULTANCY (Exact split card layout)                     */}
      {/* ========================================================================= */}
      <section id="consultancy" className="py-12 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-[#191919] border border-slate-200 dark:border-[#262626] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative">
          
          {/* Left Column: Consultant Image */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
              alt="Berlo PR Strategic Consultation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <div className="text-xs uppercase font-bold tracking-wider text-[#A302FF] dark:text-[#B833FF]">
                {lang === 'bn' ? 'গোপনীয় সি-সুইট অ্যাডভাইজরি' : 'Confidential C-Suite Advisory'}
              </div>
              <div className="text-sm font-medium text-slate-200">
                {lang === 'bn'
                  ? 'সিনিয়র এজেন্সি পার্টনার ও ক্রাইসিস অ্যাডভাইজারদের সাথে সরাসরি আলোচনা।'
                  : 'Direct engagement with senior agency partners and crisis advisors.'}
              </div>
            </div>
          </div>

          {/* Right Column: Book a Free Consultancy Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 text-slate-900 dark:text-white space-y-6">
            <div>
              <h2 className="section-main-title text-slate-900 dark:text-white">
                {lang === 'bn' ? (
                  <>ফ্রি <span className="b-border">পরামর্শ গ্রহণ</span></>
                ) : (
                  <>Book a Free <span className="b-border">Consultancy</span></>
                )}
              </h2>
              <p className="text-sm text-slate-600 dark:text-[#7A7A7A] mt-2">
                {lang === 'bn'
                  ? 'আমাদের সিনিয়র পিআর বিশেষজ্ঞদের সাথে একটি গোপনীয় কৌশলগত আলোচনার সময় নির্ধারণ করুন।'
                  : 'Schedule a confidential strategy session with our senior PR leads.'}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-950/60 border border-emerald-700/60 text-emerald-200 text-sm font-medium flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  {lang === 'bn'
                    ? 'আপনার পরামর্শ অনুরোধ গৃহীত হয়েছে! আমাদের সিনিয়র পিআর বিশেষজ্ঞ ২ ঘণ্টার মধ্যে যোগাযোগ করবেন।'
                    : 'Consultation request received! A Senior PR Strategist will contact you within 2 business hours.'}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'bn' ? 'আপনার নাম / প্রতিষ্ঠানের নাম' : 'Your Name / Corporate Entity'}
                    className="w-full py-3 bg-transparent border-b-2 border-slate-300 dark:border-[#333333] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#7A7A7A] focus:outline-none focus:border-[#A302FF] text-[16px] transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={lang === 'bn' ? 'ফোন নম্বর বা বিজনেস ইমেইল' : 'Phone Number or Business Email'}
                    className="w-full py-3 bg-transparent border-b-2 border-slate-300 dark:border-[#333333] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#7A7A7A] focus:outline-none focus:border-[#A302FF] text-[16px] transition-colors"
                  />
                </div>

                <div>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full py-3 bg-transparent border-b-2 border-slate-300 dark:border-[#333333] text-slate-900 dark:text-white focus:outline-none focus:border-[#A302FF] text-[16px] transition-colors"
                  >
                    <option value="Strategic Media Relations" className="bg-white dark:bg-[#191919]">
                      {lang === 'bn' ? 'জাতীয় মিডিয়া সম্পর্ক ও প্রেস কনফারেন্স' : 'Strategic Media Relations & Press'}
                    </option>
                    <option value="Crisis & Reputation Management" className="bg-white dark:bg-[#191919]">
                      {lang === 'bn' ? 'সংকট ব্যবস্থাপনা ও সুনাম সুরক্ষা' : 'Crisis & Reputation Architecture'}
                    </option>
                    <option value="Corporate Communications" className="bg-white dark:bg-[#191919]">
                      {lang === 'bn' ? 'কর্পোরেট যোগাযোগ ও উপদেষ্টা' : 'Corporate Communications & Advisory'}
                    </option>
                    <option value="Brand Positioning" className="bg-white dark:bg-[#191919]">
                      {lang === 'bn' ? 'কৌশলগত ব্র্যান্ড ও মার্কেট পিআর' : 'Strategic Brand PR Positioning'}
                    </option>
                    <option value="Government Affairs" className="bg-white dark:bg-[#191919]">
                      {lang === 'bn' ? 'পাবলিক পলিসি ও রেগুলেটরি সম্পর্ক' : 'Government Affairs & Policy Advocacy'}
                    </option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-berlo-primary w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>{lang === 'bn' ? 'অনুরোধ পাঠান' : 'Submit Request'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Bottom Accent Line */}
            <div className="h-1 w-24 bg-[#A302FF] dark:bg-[#B833FF]" />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. EXPLORE CLIENT RATINGS SHOWCASE (Laurel Wreath Banner)                */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50 dark:bg-[#111111] border-y border-slate-200 dark:border-[#1F1F1F] text-center">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            {/* Laurel Wreath Left SVG */}
            <svg className="w-8 sm:w-12 h-12 sm:h-16 text-[#A302FF] dark:text-[#B833FF]" viewBox="0 0 24 36" fill="currentColor">
              <path d="M11 2C7 6 4 12 4 18c0 7 4 13 8 16-1-3-2-7-2-10 0-6 3-11 5-15-2 0-3-1-4-3zm-6 9c-2 3-3 7-3 10 0 5 3 9 6 12-1-3-2-6-2-9 0-5 2-9 4-12-2 0-4-1-5-1z" />
            </svg>

            <div>
              <h2 className="section-main-title text-slate-900 dark:text-white uppercase tracking-tight">
                {lang === 'bn' ? (
                  <>ক্লায়েন্টদের <span className="b-border">রেটিং ও সাফল্য</span></>
                ) : (
                  <>Explore <span className="b-border">Client Ratings </span> Showcase</>
                )}
              </h2>
            </div>

            {/* Laurel Wreath Right SVG */}
            <svg className="w-8 sm:w-12 h-12 sm:h-16 text-[#A302FF] dark:text-[#B833FF] transform scale-x-[-1]" viewBox="0 0 24 36" fill="currentColor">
              <path d="M11 2C7 6 4 12 4 18c0 7 4 13 8 16-1-3-2-7-2-10 0-6 3-11 5-15-2 0-3-1-4-3zm-6 9c-2 3-3 7-3 10 0 5 3 9 6 12-1-3-2-6-2-9 0-5 2-9 4-12-2 0-4-1-5-1z" />
            </svg>
          </div>

          {/* 4 Metric Blocks */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
              <div className="text-3xl font-extrabold text-[#A302FF] dark:text-[#B833FF]">250+</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-[#7A7A7A] mt-1">
                {lang === 'bn' ? 'সফল করপোরেট ক্যাম্পেইন' : 'Corporate Campaigns'}
              </div>
            </div>
            <div className="p-5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
              <div className="text-3xl font-extrabold text-[#11813C] dark:text-[#16A34A]">100%</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-[#7A7A7A] mt-1">
                {lang === 'bn' ? 'গোপনীয়তা রক্ষা নিশ্চয়তা' : 'NDA Confidentiality'}
              </div>
            </div>
            <div className="p-5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
              <div className="text-3xl font-extrabold text-[#00A896] dark:text-[#14B8A6]">60 Min</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-[#7A7A7A] mt-1">
                {lang === 'bn' ? 'ক্রাইসিস ওয়ার-রুম গতি' : 'Crisis War-Room Speed'}
              </div>
            </div>
            <div className="p-5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
              <div className="text-3xl font-extrabold text-[#1A305A] dark:text-[#60A5FA]">12+ Yrs</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-[#7A7A7A] mt-1">
                {lang === 'bn' ? 'জাতীয় গণমাধ্যম সংযোগ' : 'Media Ecosystem Legacy'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. DISCOVER THE BENEFITS WITH US (Exact 2-column layout)                 */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 5 Benefits */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="section-main-title text-slate-900 dark:text-white">
              {lang === 'bn' ? (
                <>আমাদের সাথে কাজ করার <span className="b-border">সুবিধাসমূহ</span></>
              ) : (
                <>Discover the <span className="b-border">Benefits</span> with Us</>
              )}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#7A7A7A]">
              {lang === 'bn'
                ? 'বাংলাদেশের শীর্ষস্থানীয় প্রতিষ্ঠান ও বহুজাতিক ব্র্যান্ডসমূহ কেন বার্লো কমিউনিকেশন্সের ওপর আস্থা রাখে'
                : 'Why leading enterprises, financial institutions, and global brands partner with Berlo Communications.'}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
                <div className="w-8 h-8 rounded-full bg-[#A302FF] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-md shadow-purple-600/30">
                  1
                </div>
                <div>
                  <h4 className="text-[17px] font-semibold text-slate-900 dark:text-white">
                    {lang === 'bn' ? 'শীর্ষ গণমাধ্যমে সরাসরি সংযোগ' : 'Unmatched Tier-1 Media Access'}
                  </h4>
                  <p className="text-[14px] text-slate-600 dark:text-[#7A7A7A] mt-0.5">
                    {lang === 'bn'
                      ? 'প্রধান সম্পাদক, অনুসন্ধানী সাংবাদিক এবং জাতীয় টেলিভিশন নেটওয়ার্কের সাথে সরাসরি পেশাদার সম্পর্ক।'
                      : 'Direct access to national chief editors, investigative reporters, and prime-time broadcast directors across Bangladesh.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
                <div className="w-8 h-8 rounded-full bg-[#11813C] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-md shadow-green-600/30">
                  2
                </div>
                <div>
                  <h4 className="text-[17px] font-semibold text-slate-900 dark:text-white">
                    {lang === 'bn' ? '২৪/৭ দ্রুত সংকট মোকাবিলা প্রটোকল' : 'Rapid 24/7 Crisis Protocol'}
                  </h4>
                  <p className="text-[14px] text-slate-600 dark:text-[#7A7A7A] mt-0.5">
                    {lang === 'bn'
                      ? 'সুনামের যেকোনো হুমকি প্রশমনে এবং ব্র্যান্ডের সম্মান রক্ষার্থে ৬০ মিনিটের মধ্যে ওয়ার-রুম কার্যকরীকরণ।'
                      : 'Immediate war-room activation within 60 minutes to neutralize reputational vulnerability and protect brand equity.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
                <div className="w-8 h-8 rounded-full bg-[#00A896] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-md shadow-teal-600/30">
                  3
                </div>
                <div>
                  <h4 className="text-[17px] font-semibold text-slate-900 dark:text-white">
                    {lang === 'bn' ? 'তথ্য ও বিশ্লেষণনির্ভর সেন্টিনেল ইন্টেলিজেন্স' : 'Data-Driven Sentiment Intelligence'}
                  </h4>
                  <p className="text-[14px] text-slate-600 dark:text-[#7A7A7A] mt-0.5">
                    {lang === 'bn'
                      ? 'রিয়েল-টাইম মিডিয়া মনিটরিং, জনমত গতিপথ বিশ্লেষণ এবং প্রিন্ট ও ডিজিটালে শেয়ার অফ ভয়েস ট্র্যাকিং।'
                      : 'Real-time media tracking, predictive sentiment trajectory modeling, and comprehensive Share of Voice (SOV) metrics.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
                <div className="w-8 h-8 rounded-full bg-[#1A305A] dark:bg-[#25427C] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-md">
                  4
                </div>
                <div>
                  <h4 className="text-[17px] font-semibold text-slate-900 dark:text-white">
                    {lang === 'bn' ? 'সারাদেশে কার্যক্রম পরিচালনার সক্ষমতা' : 'Pan-Bangladesh Operational Reach'}
                  </h4>
                  <p className="text-[14px] text-slate-600 dark:text-[#7A7A7A] mt-0.5">
                    {lang === 'bn'
                      ? 'ঢাকা, চট্টগ্রাম, সিলেটসহ সকল বিভাগে সফল প্রেস কনফারেন্স, গোলটেবিল ও ব্র্যান্ড অ্যাক্টিভেশন বাস্তবায়ন।'
                      : 'Seamless nationwide execution of press conferences, roundtables, and high-impact activations across all 8 divisions.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
                <div className="w-8 h-8 rounded-full bg-[#A302FF] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-md shadow-purple-600/30">
                  5
                </div>
                <div>
                  <h4 className="text-[17px] font-semibold text-slate-900 dark:text-white">
                    {lang === 'bn' ? 'বোর্ডরুমের পূর্ণ গোপনীয়তা ও বিশ্বস্ততা' : 'Absolute Boardroom Confidentiality'}
                  </h4>
                  <p className="text-[14px] text-slate-600 dark:text-[#7A7A7A] mt-0.5">
                    {lang === 'bn'
                      ? 'সংবেদনশীল কর্পোরেট চুক্তি, পুনর্গঠন ও শীর্ষ নেতৃত্বের পরিবর্তনের সুরক্ষায় সর্বোচ্চ প্রাতিষ্ঠানিক এনডিএ নিশ্চয়তা।'
                      : 'Institutional-grade non-disclosure agreements safeguarding sensitive corporate transactions, restructuring, and leadership shifts.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Office Photo */}
          <div className="lg:col-span-5 relative">
            <div className="border border-slate-200 dark:border-[#262626] shadow-2xl aspect-[4/5] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Berlo Agency Conference Room"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs uppercase tracking-wider text-[#A302FF] dark:text-[#B833FF] font-bold">
                  {lang === 'bn' ? 'কর্পোরেট হেডকোয়ার্টার্স' : 'Corporate Headquarters'}
                </div>
                <div className="text-base font-bold mt-1">
                  {lang === 'bn'
                    ? 'অ্যাপার্টমেন্ট বি৩, বাড়ি ৩২/৩৪, রোড ০৭, নিকেতন, গুলশান-১, ঢাকা'
                    : 'Apartment B3, House 32/34, Road 07, Niketon, Gulshan-1, Dhaka'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. INNOVATING SUCCESS TOGETHER (Continuous Infinite Marquee Motion)      */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50 dark:bg-[#111111] border-y border-slate-200 dark:border-[#1F1F1F] overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 mb-8">
          <div>
            <h2 className="section-main-title text-slate-900 dark:text-white">
              {lang === 'bn' ? (
                <>একসাথে উদ্ভাবনী <span className="b-border">সাফল্য</span></>
              ) : (
                <>Innovating <span className="b-border">Success</span> Together</>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#7A7A7A] mt-2">
              {lang === 'bn'
                ? 'শীর্ষস্থানীয় মার্কেট লিডার ও বহুজাতিক ব্র্যান্ডের বিশ্বস্ত কৌশলগত অংশীদার'
                : 'Trusted by visionary market leaders, tech innovators, and multinational enterprises'}
            </p>
          </div>
        </div>

        {/* Continuous Infinite Marquee Motion */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex gap-6">
            {[...clientLogos, ...clientLogos].map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="shrink-0 w-44 sm:w-52 p-5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-[#262626] flex flex-col items-center justify-center min-h-[95px] shadow-sm hover:border-[#A302FF] dark:hover:border-[#B833FF] transition-all duration-300 group cursor-pointer"
              >
                <div className="text-base font-black text-slate-800 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors">
                  {client.name}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-[#7A7A7A] font-medium uppercase tracking-wider mt-1">
                  {client.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09. CLIENTS SAYS (Video Testimonial Cards)                                */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="section-main-title text-slate-900 dark:text-white">
            {lang === 'bn' ? (
              <>ক্লায়েন্টদের <span className="b-border">প্রশংসাপত্র</span></>
            ) : (
              <>Clients <span className="b-border">Says</span></>
            )}
          </h2>
          <Link
            to={formatRoute('clients')}
            className="btn-berlo-outline"
          >
            <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'VIEW ALL'}</span>
          </Link>
        </div>

        {/* 3 Video Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {videoTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#191919] border border-slate-200 dark:border-[#262626] overflow-hidden shadow-sm flex flex-col justify-between group"
            >
              {/* Video Thumbnail with Centered Purple Play Button */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#A302FF] hover:bg-[#8B00DC] text-white flex items-center justify-center shadow-lg shadow-purple-600/40 group-hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Play client video review"
                >
                  <Play className="w-5 h-5 fill-white translate-x-0.5" />
                </button>
              </div>

              {/* Quote & Speaker Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-[14px] text-slate-600 dark:text-[#7A7A7A] italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="pt-3 border-t border-slate-200 dark:border-[#262626]">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-[#7A7A7A]">
                    {item.title} —{' '}
                    <span className="text-[#A302FF] dark:text-[#B833FF] font-semibold">{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. MEMORIES & MOMENTS (Dense Photo Mosaic Grid)                          */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-[#111111] border-t border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-left space-y-2">
            <h2 className="section-main-title text-slate-900 dark:text-white">
              {lang === 'bn' ? (
                <>স্মৃতি ও <span className="b-border">মুহূর্তসমূহ</span></>
              ) : (
                <>Memories & <span className="b-border">Moments</span></>
              )}
            </h2>
          </div>

          {/* 12-Card High-Density Photo Mosaic (Monochrome to Color on Hover) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {momentPhotos.map((photo, idx) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden border border-slate-200 dark:border-[#262626] shadow-sm cursor-pointer"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <span className="text-[11px] font-bold text-white leading-tight">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. LATEST BLOGS (3 Editorial Cards)                                      */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="section-main-title text-slate-900 dark:text-white">
            {lang === 'bn' ? (
              <>সাম্প্রতিক <span className="b-border">ব্লগ ও ইনসাইটস</span></>
            ) : (
              <>Latest <span className="b-border">Blogs</span></>
            )}
          </h2>
          <Link
            to={formatRoute('insights')}
            className="btn-berlo-outline"
          >
            <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'VIEW ALL'}</span>
          </Link>
        </div>

        {/* 3 Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {insightsData.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              to={formatRoute(`insights/${article.slug}`)}
              className="bg-white dark:bg-[#191919] border border-slate-200 dark:border-[#262626] overflow-hidden shadow-sm hover:border-[#A302FF] dark:hover:border-[#B833FF] transition-colors duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={articleImages[article.id] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'}
                    alt={article.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#A302FF] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                    {categoryLabels[article.category]?.[lang] || article.category}
                  </div>
                </div>

                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-[#7A7A7A] font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTimeMinutes} min read</span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                  </div>

                  <h3 className="text-[18px] font-semibold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors line-clamp-2">
                    {article.title[lang]}
                  </h3>

                  <p className="text-[14px] text-slate-600 dark:text-[#7A7A7A] line-clamp-2 leading-relaxed">
                    {article.excerpt[lang]}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-[#A302FF] dark:text-[#B833FF]">
                <span>{lang === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read Article'}</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand accent line before footer */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#A302FF] to-transparent w-full" />
    </div>
  );
};

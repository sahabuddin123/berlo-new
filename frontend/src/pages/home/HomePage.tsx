import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { insightsData } from '../../data/insightsData';
import { Seo } from '../../components/common/Seo';
import {
  FaPlay,
  FaXmark,
  FaArrowRight,
  FaEnvelope,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaShieldHalved,
  FaBuilding,
  FaBullseye,
  FaMicrophone,
  FaChartLine,
  FaLandmark,
  FaAward,
  FaBullhorn,
  FaHandshakeAngle,
  FaCalendarCheck,
  FaNetworkWired,
  FaTowerBroadcast,
} from 'react-icons/fa6';

const articleImages: Record<string, string> = {
  'art-1': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  'art-2': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
  'art-3': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
};

export const HomePage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();

  // Consultation form multi-step wizard state matching exact IMBD reference
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    name: '',
    company: '',
    designation: '',
    mobile: '',
    email: '',
    service: 'Strategic Media Relations',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(1);
      setWizardData({
        name: '',
        company: '',
        designation: '',
        mobile: '',
        email: '',
        service: 'Strategic Media Relations',
        message: '',
      });
    }, 6000);
  };

  // Active Video Lightbox Modal state
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Active Gallery Image Lightbox Modal state (Memories & Moments)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);

  // Modern UI/UX Interactive Filters for Projects and Team
  const [activeProjectFilter, setActiveProjectFilter] = useState<'all' | 'trade' | 'events' | 'crisis' | 'speaker'>('all');
  const [activeTeamFilter, setActiveTeamFilter] = useState<'all' | 'planning' | 'media' | 'events' | 'creative'>('all');

  // Background Video Mouse Follow State matching IMBD reference
  const [videoMousePos, setVideoMousePos] = useState({ x: 0, y: 0 });
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  const handleVideoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoSectionRef.current) return;
    const rect = videoSectionRef.current.getBoundingClientRect();
    setVideoMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 3D Logo Flip State for "Innovating Success Together"
  const [flipSlots, setFlipSlots] = useState([
    { front: '/images/berlo/clients/unique.jpg', back: '/images/berlo/clients/radiant.jpg', isFlipped: false },
    { front: '/images/berlo/clients/rahimafrooz.jpg', back: '/images/berlo/clients/ucep.jpg', isFlipped: false },
    { front: '/images/berlo/clients/rupayan.jpg', back: '/images/berlo/clients/netcom.jpg', isFlipped: false },
    { front: '/images/berlo/clients/rajasthan.jpg', back: '/images/berlo/clients/idcol.jpg', isFlipped: false },
  ]);

  useEffect(() => {
    const FLIP_POOL = [
      '/images/berlo/clients/unique.jpg',
      '/images/berlo/clients/rahimafrooz.jpg',
      '/images/berlo/clients/rupayan.jpg',
      '/images/berlo/clients/rajasthan.jpg',
      '/images/berlo/clients/ucep.jpg',
      '/images/berlo/clients/radiant.jpg',
      '/images/berlo/clients/netcom.jpg',
      '/images/berlo/clients/idcol.jpg',
      '/images/berlo/clients/stynova.jpg',
      '/images/berlo/clients/uap.jpg',
    ];

    let queueIdx = 4;
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    const flipSlot = (idx: number) => {
      setFlipSlots((prev) => {
        const next = [...prev];
        const current = next[idx];
        if (!current) return prev;
        next[idx] = { ...current, isFlipped: !current.isFlipped };
        return next;
      });

      const swapTimer = setTimeout(() => {
        setFlipSlots((prev) => {
          const next = [...prev];
          const current = next[idx];
          if (!current) return prev;
          const nextImg = FLIP_POOL[queueIdx % FLIP_POOL.length];
          queueIdx++;
          if (current.isFlipped) {
            next[idx] = { ...current, front: nextImg };
          } else {
            next[idx] = { ...current, back: nextImg };
          }
          return next;
        });
      }, 750);
      timers.push(swapTimer);

      const nextDelay = 3500 + Math.random() * 1500;
      const loopTimer = setTimeout(() => flipSlot(idx), nextDelay);
      timers.push(loopTimer);
    };

    [0, 1, 2, 3].forEach((slotIdx) => {
      const initialDelay = (slotIdx + 1) * 900 + Math.random() * 300;
      const startTimer = setTimeout(() => flipSlot(slotIdx), initialDelay);
      timers.push(startTimer);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Keyboard navigation for image and video lightboxes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeGalleryIndex !== null) {
        if (e.key === 'Escape') setActiveGalleryIndex(null);
        if (e.key === 'ArrowLeft') {
          setActiveGalleryIndex((prev) => (prev! > 0 ? prev! - 1 : momentPhotos.length - 1));
        }
        if (e.key === 'ArrowRight') {
          setActiveGalleryIndex((prev) => (prev! < momentPhotos.length - 1 ? prev! + 1 : 0));
        }
      }
      if (activeVideoId !== null) {
        if (e.key === 'Escape') setActiveVideoId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGalleryIndex, activeVideoId]);

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
      image: '/images/berlo/hero-3d-1.png',
      badgeColor: 'text-[#A302FF] dark:text-[#B833FF]',
      borderColor: 'border-[#A302FF]',
      blobGradient: 'from-[#5B028F] via-[#A302FF] to-[#1A305A]',
      iconType: 'network',
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
      image: '/images/berlo/hero-3d-2.png',
      badgeColor: 'text-[#11813C] dark:text-[#16A34A]',
      borderColor: 'border-[#11813C]',
      blobGradient: 'from-[#0A4B20] via-[#11813C] to-[#0A2540]',
      iconType: 'shield',
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
      image: '/images/berlo/hero-3d-3.png',
      badgeColor: 'text-[#00A896] dark:text-[#14B8A6]',
      borderColor: 'border-[#00A896]',
      blobGradient: 'from-[#0A2540] via-[#1A305A] to-[#A302FF]',
      iconType: 'broadcast',
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

  // 9 PR Services in exact 3x3 layout matching the reference cards
  const servicesList = [
    {
      id: 'media-relations',
      icon: FaBullhorn,
      title: lang === 'bn' ? 'জাতীয় মিডিয়া সম্পর্ক ও প্রেস কনফারেন্স' : 'Strategic Media Relations',
      desc:
        lang === 'bn'
          ? '১০০+ শীর্ষ জাতীয় দৈনিক, টেলিভিশন নেটওয়ার্ক ও বিজনেস ব্যুরোর সাথে সরাসরি সংযোগ স্থাপনের মাধ্যমে আপনার ব্র্যান্ড ন্যারেটিভকে জাতীয় আলোচনার শীর্ষে রাখুন।'
          : 'Elevate your corporate voice across 100+ national dailies, prime-time television broadcasts, and premier business bureaus with high-impact media placements.',
      link: '/services/media-relations',
      isTopLeft: true,
      isBottomLeft: false,
    },
    {
      id: 'crisis-management',
      icon: FaShieldHalved,
      title: lang === 'bn' ? 'সংকট ব্যবস্থাপনা ও সুনাম সুরক্ষা' : 'Crisis & Reputation Management',
      desc:
        lang === 'bn'
          ? 'সুনামের যেকোনো হুমকি চিহ্নিত হওয়ার পর তাৎক্ষণিক ওয়ার-রুম কার্যকরীকরণ এবং দ্রুত প্রেস ব্রিফিংয়ের মাধ্যমে নেতিবাচক জনমত প্রশমন ও নিয়ন্ত্রণ।'
          : 'Rapid-response 24/7 war-room mobilization within 60 minutes to neutralize reputational vulnerabilities, de-escalate misinformation, and restore stakeholder trust.',
      link: '/services/crisis-management',
      isTopLeft: false,
      isBottomLeft: false,
    },
    {
      id: 'corporate-comms',
      icon: FaBuilding,
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
      icon: FaBullseye,
      title: lang === 'bn' ? 'কৌশলগত ব্র্যান্ড ও মার্কেট পিআর' : 'Strategic Brand PR Positioning',
      desc:
        lang === 'bn'
          ? 'বাজারে দীর্ঘস্থায়ী সুনাম প্রতিষ্ঠা, নতুন পণ্য উন্মোচন এবং গবেষণা ও বিশ্লেষণভিত্তিক যোগাযোগের মাধ্যমে আপনার ব্র্যান্ডকে অন্যদের চেয়ে অনন্যভাবে উপস্থাপন।'
          : 'Differentiating corporate identity, architecting brand equity, and executing disruptive product launch narratives that capture measurable market leadership.',
      link: '/services/strategic-pr',
      isTopLeft: false,
      isBottomLeft: false,
    },
    {
      id: 'gov-advocacy',
      icon: FaLandmark,
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
      icon: FaChartLine,
      title: lang === 'bn' ? 'ডিজিটাল পিআর ও জনমত বিশ্লেষণ' : 'Digital PR & Social Sentiment',
      desc:
        lang === 'bn'
          ? 'রিয়েল-টাইম অনলাইন মিডিয়া পর্যবেক্ষণ, ডিজিটাল সেন্টিমেন্ট রিকভারি এবং শীর্ষ ইনফ্লুয়েন্সার ও অনলাইন প্ল্যাটফর্মে সক্রিয় ব্র্যান্ড দৃশ্যমানতা।'
          : 'AI-driven social listening, digital sentiment management, search authority building, and trusted influencer collaborations that amplify credibility.',
      link: '/services/digital-pr',
      isTopLeft: false,
      isBottomLeft: false,
    },
    {
      id: 'events-conclaves',
      icon: FaAward,
      title: lang === 'bn' ? 'উচ্চ-প্রভাবশালী ইভেন্ট ও কনক্লেভ' : 'High-Impact Events & Conclaves',
      desc:
        lang === 'bn'
          ? 'জাতীয় প্রেস কনফারেন্স, মিডিয়া রাউন্ডটেবিল ও বহুজাতিক কর্পোরেট সম্মেলনের নিখুঁত রূপায়ণ, যা নিশ্চিত করে ব্যাপক প্রচার ও অংশীজনদের সক্রিয় অংশগ্রহণ।'
          : 'Flawless orchestration of high-profile press conferences, CEO roundtables, national industry symposiums, and brand activations with guaranteed media turnout.',
      link: '/services/events-activations',
      isTopLeft: false,
      isBottomLeft: true,
    },
    {
      id: 'thought-leadership',
      icon: FaMicrophone,
      title: lang === 'bn' ? 'সি-সুইট এক্সিকিউটিভ ব্র্যান্ডিং' : 'Executive Thought Leadership',
      desc:
        lang === 'bn'
          ? 'শীর্ষ করপোরেট ব্যক্তিত্বের অপ-এড রচনা, কিনোট বক্তৃতা প্রস্তুতি ও শিল্প বিশেষজ্ঞ হিসেবে জাতীয় গণমাধ্যমে জোরালো উপস্থিতি প্রতিষ্ঠা।'
          : 'Op-ed ghostwriting, keynote speechcrafting, and proactive media profiling that positions C-suite executives as foremost industry authorities.',
      link: '/services/thought-leadership',
      isTopLeft: false,
      isBottomLeft: false,
    },
    {
      id: 'csr-comms',
      icon: FaHandshakeAngle,
      title: lang === 'bn' ? 'টেকসই উন্নয়ন ও সিএসআর পিআর' : 'CSR & Sustainability Comms',
      desc:
        lang === 'bn'
          ? 'ইএসজি প্রতিশ্রুতি প্রচার, সামাজিক দায়িত্বশীলতার ফলাফল প্রকাশ এবং ইতিবাচক সমাজ বিনির্মাণমূলক উদ্যোগসমূহের কার্যকর জনসংযোগ।'
          : 'Communicating ESG metrics, social investment milestones, and donor-funded community initiatives to inspire genuine stakeholder and public trust.',
      link: '/services/content-storytelling',
      isTopLeft: false,
      isBottomLeft: false,
    },
  ];

  // 4 Featured Recent Projects from live Berlo portfolio with rich strategic attributes
  const featuredProjects = [
    {
      id: 'dhaka-trade-fair',
      categoryType: 'trade',
      title: lang === 'bn' ? 'ঢাকা আন্তর্জাতিক বাণিজ্য মেলা (DITF) প্যাভিলিয়ন পিআর' : 'Dhaka International Trade Fair (DITF) Pavilion PR',
      category: lang === 'bn' ? 'আন্তর্জাতিক বাণিজ্য ও এক্সপো' : 'Trade Fair & Pavilion PR',
      metric: lang === 'bn' ? '৫০+ আন্তর্জাতিক গণমাধ্যম' : '50+ Global Media Outlets',
      submetric: lang === 'bn' ? '২৫ লক্ষ+ দর্শনার্থী সংযোগ' : '2.5M+ On-Ground Reach',
      deliverables: lang === 'bn' ? 'ভিআইপি প্রেস ব্রিফিং • মন্ত্রী পর্যায়ের প্রটোকল • লাইভ ব্রডকাস্ট' : 'VIP Press Briefing • Ministerial Protocol • Live Broadcast',
      desc: lang === 'bn'
        ? 'রপ্তানি উন্নয়ন ব্যুরোর (EPB) সাথে সমন্বয়ে আন্তর্জাতিক বাণিজ্য মেলার প্রধান প্যাভিলিয়নসমূহে গণমাধ্যম প্রতিনিধি ব্যবস্থাপনা, ভিআইপি প্রটোকল ও দেশব্যাপী প্রেস ব্রিফিং পরিচালনা।'
        : 'Comprehensive pavilion PR, VIP protocol, and high-impact press briefings in partnership with Export Promotion Bureau (EPB) during the national trade expo.',
      image: '/images/berlo/projects/dhaka-trade-fair_cover.jpg',
      link: '/work/dhaka-trade-fair',
      client: 'Export Promotion Bureau (EPB)',
      year: '2025–2026',
      tag: '#PavilionPR',
    },
    {
      id: 'event-management',
      categoryType: 'events',
      title: lang === 'bn' ? 'সিনোভা হেলথকেয়ার কর্পোরেট গালা ও ব্র্যান্ড অ্যাক্টিভেশন' : 'Synova Healthcare National Conclave & Brand Launch',
      category: lang === 'bn' ? 'কর্পোরেট ইভেন্ট ও কনক্লেভ' : 'Corporate Event & Brand Conclave',
      metric: lang === 'bn' ? '১০০% ভিআইপি ও মিডিয়া' : '100% C-Suite & Media Turnout',
      submetric: lang === 'bn' ? '৮০+ জাতীয় সংবাদপত্রে কভার' : '80+ National Newspapers Lead',
      deliverables: lang === 'bn' ? 'সায়েন্টিফিক সিম্পোজিয়াম • গালা নাইট • লাইভ স্ট্রিমিং' : 'Scientific Symposium • Gala Night • Broadcast Streaming',
      desc: lang === 'bn'
        ? 'শীর্ষস্থানীয় ফার্মা ও হেলথকেয়ার ব্র্যান্ড সিনোভার দেশব্যাপী রি-ব্র্যান্ডিং এবং জাতীয় চিকিৎসকদের অংশগ্রহণে বর্ণাঢ্য বৈজ্ঞানিক সম্মেলন ও প্রেস ব্রিফিং রূপায়ণ।'
        : 'Flawless orchestration of nationwide corporate healthcare gala, medical symposiums, and prime-time broadcast coverage for Synova Healthcare.',
      image: '/images/berlo/projects/event-management_synova.jpg',
      link: '/work/event-management',
      client: 'Synova Healthcare PLC',
      year: '2025',
      tag: '#HealthcarePR',
    },
    {
      id: 'production-crisis',
      categoryType: 'crisis',
      title: lang === 'bn' ? 'মাল্টিমিডিয়া ভিডিও নিউজরুম ও জরুরি সংকট ব্যবস্থাপনা' : 'Multimedia Video Newsroom & 24/7 Crisis Resolution',
      category: lang === 'bn' ? 'সংকট ব্যবস্থাপনা ও নিউজরুম' : 'Crisis Management & Newsroom',
      metric: lang === 'bn' ? '৬০ মিনিট ওয়ার-রুম' : '60-Minute War-Room Response',
      submetric: lang === 'bn' ? '৯৫% নেতিবাচক সেন্টিমেন্ট হ্রাস' : '95% Sentiment De-escalation',
      deliverables: lang === 'bn' ? 'ডিজিটাল ফ্যাক্ট-চেক • ২৪/৭ নিউজরুম • সেন্টিমেন্ট অডিট' : 'Fact-Check Rapid Response • 24/7 War Room • Media Audit',
      desc: lang === 'bn'
        ? 'সংবেদনশীল প্রাতিষ্ঠানিক পরিস্থিতিতে তাৎক্ষণিক ওয়ার-রুম সক্রিয়করণ, নেতিবাচক জনমত নিরসন এবং অনুসন্ধানী সাংবাদিকদের সাথে স্বচ্ছ তথ্য আদান-প্রদান।'
        : 'Rapid mobilization of crisis war-rooms to de-escalate sensitive corporate issues, counter misinformation, and restore stakeholder trust.',
      image: '/images/berlo/projects/production-crisis_cover-1.jpg',
      link: '/work/production-crisis',
      client: 'National Conglomerate Client',
      year: '2025',
      tag: '#CrisisWarRoom',
    },
    {
      id: 'speaker-program',
      categoryType: 'speaker',
      title: lang === 'bn' ? 'এক্সিকিউটিভ স্পিকার প্রোগ্রাম ও সি-সুইট প্রেস কনক্লেভ' : 'Executive Speaker Program & C-Suite Press Conclave',
      category: lang === 'bn' ? 'এক্সিকিউটিভ থট লিডারশিপ' : 'Executive Thought Leadership',
      metric: lang === 'bn' ? '১০০+ শীর্ষ নিউজডেস্ক' : '100+ Prime-Time Broadcasts',
      submetric: lang === 'bn' ? '১২টি জাতীয় নীতি সংলাপ' : '12 National Policy Panels',
      deliverables: lang === 'bn' ? 'টেলিভিশন সাক্ষাৎকার • সি-সুইট মিডিয়া কোচিং • অপ-এড' : 'TV Panels • C-Suite Media Training • Policy Op-Eds',
      desc: lang === 'bn'
        ? 'শীর্ষ করপোরেট ও নীতিনির্ধারকদের সরাসরি টেলিভিশন সাক্ষাৎকার, গোলটেবিল পলিসি সংলাপ এবং জাতীয় নীতি সংস্কারে কার্যকর জনমত গঠন।'
        : 'Positioning corporate leaders at the forefront of national economic dialogue through live broadcast panels and policy roundtables.',
      image: '/images/berlo/projects/speaker-program_whatsapp-image-2025-07-31-at-195434-56b4a48d.jpg',
      link: '/work/speaker-program',
      client: 'Industry Chamber of Commerce',
      year: '2025',
      tag: '#ThoughtLeadership',
    },
  ];

  // 6 Real Strategic Team Members from live Berlo site with department categorization
  const teamMembers = [
    {
      id: 'shakhawat-ullah',
      department: 'planning',
      name: lang === 'bn' ? 'সাখাওয়াত উল্লাহ' : 'Shakhawat Ullah',
      role: lang === 'bn' ? 'পরিকল্পনা ও যোগাযোগ প্রধান' : 'Planning & Communication Lead',
      departmentLabel: lang === 'bn' ? 'কৌশলগত পরিকল্পনা' : 'Strategic Planning',
      image: '/images/berlo/team/shakwat-ullah-01.jpg',
      bio: lang === 'bn'
        ? 'বার্লোর কৌশলগত পজিশনিং ফ্রেমওয়ার্কের মূল রূপকার, করপোরেট ন্যারেটিভ ও অংশীজন ব্যবস্থাপনার পথপ্রদর্শক।'
        : 'Strategic mastermind behind Berlo’s corporate positioning frameworks, guiding C-suite narrative architecture.',
      experience: '14+ Yrs Exp',
      email: 'contact@berlocommunications.com',
    },
    {
      id: 'md-kabir-hossain',
      department: 'media',
      name: lang === 'bn' ? 'মোঃ কবির হোসেন' : 'Md. Kabir Hossain',
      role: lang === 'bn' ? 'সিনিয়র ম্যানেজার, পাবলিক রিলেশনস' : 'Senior Manager, Public Relations',
      departmentLabel: lang === 'bn' ? 'ন্যাশনাল মিডিয়া পিআর' : 'National Media PR',
      image: '/images/berlo/team/img-20260301-wa0001.jpg',
      bio: lang === 'bn'
        ? 'জাতীয় নিউজ রুম, সম্পাদকীয় পর্ষদ এবং শীর্ষ টেলিভিশন নেটওয়ার্কের সাথে সুদৃঢ় ও বিশ্বস্ত সংযোগসম্পন্ন সিনিয়র পিআর স্ট্র্যাটেজিস্ট।'
        : 'Senior PR strategist with comprehensive relationships across national newsrooms, editorial boards, and broadcast networks.',
      experience: '12+ Yrs Exp',
      email: 'contact@berlocommunications.com',
    },
    {
      id: 'akm-zamshed-uddin',
      department: 'events',
      name: lang === 'bn' ? 'এ কে এম জামশেদ উদ্দিন' : 'A K M Zamshed Uddin',
      role: lang === 'bn' ? 'ইভেন্ট ও অ্যাক্টিভেশন প্রধান' : 'Events & Activation Lead',
      departmentLabel: lang === 'bn' ? 'ইভেন্ট ও সামিট' : 'Events & Summit Lead',
      image: '/images/berlo/team/zamshed.png',
      bio: lang === 'bn'
        ? 'মন্ত্রী পর্যায়ের আন্তর্জাতিক সামিট, বাণিজ্য মেলা ও আলোড়ন সৃষ্টিকারী পণ্য উন্মোচন ইভেন্ট পরিচালনায় অভিজ্ঞ।'
        : 'Veteran event producer orchestrating high-profile ministerial summits, trade pavilions, and brand roadshows.',
      experience: '11+ Yrs Exp',
      email: 'contact@berlocommunications.com',
    },
    {
      id: 'kabery-azad',
      department: 'creative',
      name: lang === 'bn' ? 'কাকেরী আজাদ' : 'Kabery Azad',
      role: lang === 'bn' ? 'শিল্প ও ভিজ্যুয়াল ডিজাইন পরামর্শক' : 'Consultant of Arts & Visual Design',
      departmentLabel: lang === 'bn' ? 'ভিজ্যুয়াল ক্রিয়েটিভ' : 'Creative & Visual Art',
      image: '/images/berlo/team/shakhwat-ullah-1.png',
      bio: lang === 'bn'
        ? 'করপোরেট মাইলফলককে চিত্তাকর্ষক ভিজ্যুয়াল ন্যারেটিভ, প্রাতিষ্ঠানিক প্রামাণ্যচিত্র ও প্রকাশনায় রূপান্তরকারী।'
        : 'Creative visionary transforming corporate milestones into captivating visual narratives and publications.',
      experience: '10+ Yrs Exp',
      email: 'contact@berlocommunications.com',
    },
    {
      id: 'rajin-shaleh',
      department: 'media',
      name: lang === 'bn' ? 'রাজিন সালেহ' : 'Rajin Shaleh',
      role: lang === 'bn' ? 'জুনিয়র এক্সিকিউটিভ অফিসার' : 'Jr. Executive Officer',
      departmentLabel: lang === 'bn' ? 'নিউজ রুম কো-অর্ডিনেশন' : 'Newsroom Coordination',
      image: '/images/berlo/team/team-tut.jpg',
      bio: lang === 'bn'
        ? 'দৈনন্দিন মিডিয়া লিয়াজোঁ, প্রেস রিলিজ মনিটরিং ও ফিল্ড ক্যাম্পেইন সমন্বয়ক।'
        : 'Driving proactive newsroom coordination, press release monitoring, and field campaign logistics.',
      experience: '4+ Yrs Exp',
      email: 'contact@berlocommunications.com',
    },
    {
      id: 'tahsin-al-jawad',
      department: 'planning',
      name: lang === 'bn' ? 'তাহসিন আল জাওয়াদ' : 'Tahsin Al Jawad',
      role: lang === 'bn' ? 'এক্সিকিউটিভ অফিসার' : 'Executive Officer',
      departmentLabel: lang === 'bn' ? 'ক্লায়েন্ট এনগেজমেন্ট' : 'Client Engagement',
      image: '/images/berlo/team/jawad.jpg',
      bio: lang === 'bn'
        ? 'ক্যাম্পেইন রোডম্যাপিং, ক্লায়েন্ট এনগেজমেন্ট ও ডিজিটাল সেন্টিমেন্ট ট্র্যাকিং সমন্বয়ক।'
        : 'Facilitating seamless campaign roadmapping, client communications, and real-time sentiment tracking.',
      experience: '5+ Yrs Exp',
      email: 'contact@berlocommunications.com',
    },
  ];

  // 3 Video Testimonials with Clean Corporate Stock Thumbnails & Videos (No IMBD content)
  const videoTestimonials = [
    {
      id: 1,
      title: lang === 'bn' ? 'কর্পোরেট সুনাম বৃদ্ধি ও ব্র্যান্ড প্রতিষ্ঠা — ক্লায়েন্ট রিভিউ' : 'Enterprise Reputation & Brand Scaling — Client Review',
      subtitle: lang === 'bn' ? 'কমিউনিকেশনস অ্যান্ড স্ট্র্যাটেজিক পিআর' : 'Strategic Corporate PR & Media Advisory',
      thumbnail: '/images/berlo/testimonials/stock-testimonial-1.jpg',
      youtubeId: 'FHnfg223H60',
    },
    {
      id: 2,
      title: lang === 'bn' ? 'জাতীয় মিডিয়া রিচ ও ব্যবসায়িক বিস্তার' : 'Nationwide Media Reach & Commercial Expansion',
      subtitle: lang === 'bn' ? 'ব্র্যান্ড দৃশ্যমানতা ও লিডারশিপ প্রটোকল' : 'Brand Visibility & Strategic Growth',
      thumbnail: '/images/berlo/testimonials/stock-testimonial-2.jpg',
      youtubeId: 'OTClukQmiEw',
    },
    {
      id: 3,
      title: lang === 'bn' ? 'ক্লায়েন্ট সন্তুষ্টি ও দীর্ঘমেয়াদী আস্থা' : 'Enduring Enterprise Trust & Crisis Shield',
      subtitle: lang === 'bn' ? 'বোর্ডরুম অ্যাডভাইজরি ও পিআর পার্টনারশিপ' : 'Boardroom Advisory & PR Partnership',
      thumbnail: '/images/berlo/testimonials/stock-testimonial-3.jpg',
      youtubeId: 'osL5z5nCE8M',
    },
  ];

  // Media Outlet Original Logos for Spotlight Right-to-Left Moving Carousel
  const spotlightMediaLogos = [
    { name: 'The Business Standard', logo: '/images/berlo/media/tbs.svg' },
    { name: 'প্রথম আলো', logo: '/images/berlo/media/prothom-alo.svg' },
    { name: 'The Daily Star', logo: '/images/berlo/media/the-daily-star.svg' },
    { name: 'Dhaka Tribune', logo: '/images/berlo/media/dhaka-tribune.svg' },
    { name: 'The Financial Express', logo: '/images/berlo/media/financial-express.png' },
    { name: 'Reuters', logo: '/images/berlo/media/reuters.svg' },
    { name: 'Bloomberg', logo: '/images/berlo/media/bloomberg.svg' },
    { name: 'ATN News', logo: '/images/berlo/clients/atn.jpg' },
  ];

  // Marquee Client Logos with authentic white logo cards
  const marqueeLogos = [
    { name: 'Unique Group', logo: '/images/berlo/clients/unique.jpg' },
    { name: 'Rahimafrooz', logo: '/images/berlo/clients/rahimafrooz.jpg' },
    { name: 'Rupayan Group', logo: '/images/berlo/clients/rupayan.jpg' },
    { name: 'Rajasthan', logo: '/images/berlo/clients/rajasthan.jpg' },
    { name: 'ATN News', logo: '/images/berlo/clients/atn.jpg' },
    { name: 'BAT Bangladesh', logo: '/images/berlo/clients/bat.jpg' },
    { name: 'Beacon Pharma', logo: '/images/berlo/clients/beacon.jpg' },
    { name: 'Borak Real Estate', logo: '/images/berlo/clients/borak.jpg' },
    { name: 'Lazz Pharma', logo: '/images/berlo/clients/lazzpharma.jpg' },
    { name: 'Motul BD', logo: '/images/berlo/clients/motul.jpg' },
    { name: 'IDCOL', logo: '/images/berlo/clients/idcol.jpg' },
    { name: 'Synova Pharma', logo: '/images/berlo/clients/stynova.jpg' },
    { name: 'Ministry of Agriculture', logo: '/images/berlo/clients/agery-calture.jpg' },
    { name: 'Univ. of Asia Pacific', logo: '/images/berlo/clients/uap.jpg' },
    { name: 'BUBT University', logo: '/images/berlo/clients/bubt.jpg' },
    { name: 'Export Promotion Bureau', logo: '/images/berlo/clients/epbb.jpg' },
  ];

  // 12 Photos for "Memories & Moments" mosaic with REAL images from live Berlo website galleries
  const momentPhotos = [
    {
      title: lang === 'bn' ? 'ঢাকা আন্তর্জাতিক বাণিজ্য মেলা প্যাভিলিয়ন' : 'Dhaka International Trade Fair Pavilion',
      url: '/images/berlo/projects/dhaka-trade-fair_3-1.jpg',
    },
    {
      title: lang === 'bn' ? 'সিনোভা হেলথকেয়ার কর্পোরেট গালা' : 'Synova Healthcare Corporate Gala',
      url: '/images/berlo/projects/event-management_synova.jpg',
    },
    {
      title: lang === 'bn' ? 'জাতীয় গণমাধ্যম প্রেস কনফারেন্স পরিচালনা' : 'National Broadcast Press Conference',
      url: '/images/berlo/projects/production-crisis_1.jpg',
    },
    {
      title: lang === 'bn' ? 'সি-সুইট এক্সিকিউটিভ স্পিকার প্রোগ্রাম' : 'Executive C-Suite Speaker Program',
      url: '/images/berlo/projects/speaker-program_whatsapp-image-2025-07-31-at-195434-56b4a48d.jpg',
    },
    {
      title: lang === 'bn' ? 'বাণিজ্য মেলা উদ্বোধনী প্রেস ব্রিফিং' : 'Trade Fair Opening Press Briefing',
      url: '/images/berlo/projects/dhaka-trade-fair_1-1.jpg',
    },
    {
      title: lang === 'bn' ? 'কর্পোরেট অংশীদারিত্ব চুক্তি স্বাক্ষর' : 'Corporate Partnership Agreement Gala',
      url: '/images/berlo/projects/event-management_8-1.jpg',
    },
    {
      title: lang === 'bn' ? 'জরুরি ক্রাইসিস ওয়ার-রুম বিশ্লেষণ' : 'Crisis War-Room Strategic Analysis',
      url: '/images/berlo/projects/production-crisis_2.jpg',
    },
    {
      title: lang === 'bn' ? 'টেলিভিশন স্টুডিও সরাসরি সম্প্রচার' : 'Prime-Time Broadcast Coordination',
      url: '/images/berlo/projects/speaker-program_whatsapp-image-2025-07-31-at-195433-b8e9e550.jpg',
    },
    {
      title: lang === 'bn' ? 'আন্তর্জাতিক বাণিজ্য ডেলিগেশন অভ্যর্থনা' : 'International Delegation Reception',
      url: '/images/berlo/projects/dhaka-trade-fair_2-1.jpg',
    },
    {
      title: lang === 'bn' ? 'বার্ষিক ব্র্যান্ড এক্সিলেন্স অ্যাওয়ার্ড' : 'Annual Brand Excellence Recognition',
      url: '/images/berlo/projects/event-management_7-1.jpg',
    },
    {
      title: lang === 'bn' ? 'গণমাধ্যম সম্পাদকীয় রাউন্ডটেবিল' : 'Editorial Leaders Media Roundtable',
      url: '/images/berlo/projects/production-crisis_3.jpg',
    },
    {
      title: lang === 'bn' ? 'বার্লো স্ট্র্যাটেজিক কনফারেন্স টিম' : 'Berlo Strategic Conference Team',
      url: '/images/berlo/about-3.jpg',
    },
  ];

  const currentSlide = heroSlides[activeSlideIndex];

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#000000] text-slate-900 dark:text-[#FFFFFF] transition-colors duration-200">
      <Seo
        title={
          lang === 'bn'
            ? 'কৌশলগত জনসংযোগ ও করপোরেট পিআর এজেন্সি'
            : 'Premier Strategic PR & Corporate Communications Agency'
        }
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশন্স লিমিটেড — বাংলাদেশের শীর্ষস্থানীয় করপোরেট পিআর ও কৌশলগত যোগাযোগ সংস্থা। ১০০+ জাতীয় মিডিয়া এক্সেস, ২৪/৭ ক্রাইসিস ওয়ার-রুম ও এক্সিকিউটিভ ব্র্যান্ডিং।'
            : 'Berlo Communications Ltd. is Bangladesh’s leading strategic PR and corporate communications agency, delivering tier-1 media access, 24/7 crisis war-room mobilization, and executive thought leadership.'
        }
        keywords={[
          'PR Agency Bangladesh',
          'Corporate PR Dhaka',
          'Strategic Communications Firm',
          'Crisis Management Agency Bangladesh',
          'Top PR Firms in Dhaka',
          'Media Relations Bangladesh',
          'Executive Thought Leadership Dhaka',
          'Berlo Communications',
          'বার্লো কমিউনিকেশন্স',
        ]}
        faqs={[
          {
            question:
              lang === 'bn'
                ? 'বার্লো কমিউনিকেশন্স লিমিটেড কী ধরনের সেবা প্রদান করে?'
                : 'What core services does Berlo Communications provide?',
            answer:
              lang === 'bn'
                ? 'বার্লো কৌশলগত জনসংযোগ, শীর্ষ জাতীয় গণমাধ্যম সম্পর্ক, ২৪/৭ ক্রাইসিস ম্যানেজমেন্ট ওয়ার-রুম, সি-সুইট এক্সিকিউটিভ ব্র্যান্ডিং, সরকারি নীতি পরামর্শ ও ব্র্যান্ড অ্যাক্টিভেশন সেবা প্রদান করে।'
                : 'Berlo Communications provides strategic public relations, tier-1 national media relations, 24/7 crisis war-room mobilization, C-suite thought leadership profiling, government policy advocacy, and high-impact brand activations.',
          },
          {
            question:
              lang === 'bn'
                ? 'বার্লো কীভাবে সংকটকালীন জনসংযোগ (Crisis PR) পরিচালনা করে?'
                : 'How quickly does Berlo respond to corporate crises?',
            answer:
              lang === 'bn'
                ? 'বার্লোর জরুরি ক্রাইসিস টিম ৬০ মিনিটের মধ্যে সক্রিয় ওয়ার-রুম প্রতিষ্ঠা করে তথ্যভিত্তিক প্রেস ব্রিফিং ও ফ্যাক্ট-চেক পোর্টালের মাধ্যমে দ্রুত নেতিবাচক জনমত প্রশমন করে।'
                : 'Berlo deploys an emergency crisis war-room within 60 minutes, utilizing rapid fact-checking portals, vetted spokesperson coaching, and tier-1 media coordination to neutralize misinformation.',
          },
          {
            question:
              lang === 'bn'
                ? 'বার্লো কোন কোন প্রধান শিল্পখাতের সাথে কাজ করে?'
                : 'Which enterprise sectors does Berlo Communications serve?',
            answer:
              lang === 'bn'
                ? 'বার্লো প্রধানত ব্যাংকিং, বহুজাতিক করপোরেট প্রতিষ্ঠান, ওষুধ শিল্প, টেলিকম, রিয়েল এস্টেট, ভারী শিল্প এবং আন্তর্জাতিক উন্নয়ন সংস্থার সাথে কাজ করে।'
                : 'Berlo serves tier-1 leaders across banking and finance, multinational FMCG, pharmaceuticals, real estate conglomerates, telecommunications, and international development agencies.',
          },
        ]}
      />

      {/* ========================================================================= */}
      {/* 01. HERO SECTION (Exact Same to Same layout, typography and animations)   */}
      {/* ========================================================================= */}
      <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Headline, Description, Action Buttons */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left order-2 lg:order-1 mt-6 lg:mt-0">
              
              {/* Responsive Hero Headline */}
              <h1 className="hero-quote-title font-semibold tracking-tight text-[#1A305A] dark:text-[#FFFFFF]">
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

              {/* Responsive Description with clean word alignment on mobile */}
              <p className="text-[15px] sm:text-[17px] lg:text-[19px] text-[#475569] dark:text-[#7A7A7A] leading-[1.65] text-left sm:text-justify font-normal">
                {lang === 'bn'
                  ? 'বার্লো কমিউনিকেশন্সে আপনাকে স্বাগতম—বাংলাদেশের অন্যতম শীর্ষস্থানীয় করপোরেট পিআর ও কৌশলগত যোগাযোগ সংস্থা। আমাদের উদ্ভাবনী কৌশল ও ফলমুখী দৃষ্টিভঙ্গির মাধ্যমে আমরা শীর্ষ প্রতিষ্ঠান ও বহুজাতিক ব্র্যান্ডের দীর্ঘমেয়াদী সুনাম বিনির্মাণ ও সংকট ব্যবস্থাপনা পরিচালনা করি।'
                  : 'Welcome to Berlo Communications Ltd., one of the premier Public Relations and strategic corporate communications agencies in Bangladesh. With our innovative narrative engineering and results-oriented media access, we help enterprises protect reputation, command authority, and accelerate sustainable growth.'}
              </p>

              {/* Action Buttons: Stack on small phones, inline on tablets/desktop */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <a
                  href="#consultancy"
                  className="btn-berlo-primary text-center justify-center"
                >
                  <FaCalendarCheck className="w-4 h-4 mr-2" />
                  <span>{lang === 'bn' ? 'পরামর্শ সেশন বুক করুন' : 'Book Free Consultation'}</span>
                </a>
                <a
                  href="#services"
                  className="btn-berlo-outline text-center justify-center"
                >
                  <span>{lang === 'bn' ? 'আমাদের সেবাসমূহ' : 'Working scope with you'}</span>
                </a>
              </div>

            </div>

            {/* Right Column: Hero Organic Illustrated Stage matching IMBD Agency Reference */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end relative mb-6 sm:mb-8 lg:mb-0 order-1 lg:order-2">
              <div className="relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center justify-center select-none">
                
                {/* Ambient Radial Glow */}
                <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full bg-gradient-to-tr from-[#A302FF]/25 via-[#1A305A]/20 to-[#11813C]/25 blur-3xl pointer-events-none" />

                {/* Organic Fluid Backdrop Blob */}
                <div
                  className={`absolute left-2 sm:left-6 top-3 sm:top-2 w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[390px] lg:h-[390px] bg-gradient-to-tr ${currentSlide.blobGradient} opacity-95 transition-all duration-700 shadow-2xl shadow-purple-950/40`}
                  style={{
                    borderRadius: '42% 58% 68% 32% / 45% 45% 55% 55%',
                  }}
                />

                {/* Vector Character Illustration */}
                <div className="relative z-10 w-full flex justify-start pl-1 sm:pl-4">
                  <img
                    key={currentSlide.id}
                    src={currentSlide.image}
                    alt="Berlo PR Strategic Character"
                    className="h-[310px] sm:h-[400px] lg:h-[460px] w-auto max-w-[75%] sm:max-w-[70%] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] transition-all duration-700 hover:scale-[1.02]"
                  />
                </div>

                {/* Floating Glass Card 1 (Top-Right Typewriter Message) */}
                <div className="absolute -top-4 sm:-top-2 -right-1 sm:-right-3 lg:-right-4 z-20 w-[220px] sm:w-[260px] lg:w-[290px] bg-slate-950/80 dark:bg-[#0A0D14]/90 backdrop-blur-xl border border-white/20 dark:border-white/15 rounded-2xl p-3 sm:p-4 shadow-2xl text-white transition-all duration-500">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                      {currentSlide.tag}
                    </span>
                  </div>
                  <div className="text-[11.5px] sm:text-[12.5px] font-medium leading-relaxed text-slate-100 min-h-[42px] sm:min-h-[46px] typing-cursor">
                    {typedText}
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold">
                    <span className="text-purple-300 flex items-center gap-1">
                      <FaChartLine className="w-3 h-3 text-purple-400" />
                      {currentSlide.metric}
                    </span>
                    <span className="text-slate-400 text-[9.5px] sm:text-[10px]">
                      {currentSlide.submetric}
                    </span>
                  </div>
                </div>

                {/* Floating Glass Card 2 (Middle-Right 3D / Glass Icon Badge) */}
                <div className="absolute top-[44%] sm:top-[42%] -right-1 sm:right-0 lg:right-2 z-20 bg-slate-900/80 dark:bg-[#0F1420]/90 backdrop-blur-xl border border-white/25 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex items-center gap-2.5 transition-all duration-500 hover:scale-105">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#A302FF] to-[#11813C] flex items-center justify-center text-white shadow-md shadow-purple-500/30">
                    {currentSlide.iconType === 'shield' ? (
                      <FaShieldHalved className="w-4 h-4" />
                    ) : currentSlide.iconType === 'broadcast' ? (
                      <FaTowerBroadcast className="w-4 h-4" />
                    ) : (
                      <FaNetworkWired className="w-4 h-4" />
                    )}
                  </div>
                  <div className="text-left pr-1">
                    <div className="text-[10.5px] sm:text-[11.5px] font-bold text-white leading-tight">
                      {currentSlide.id === 1 ? 'PR Network' : currentSlide.id === 2 ? 'Crisis Shield' : 'Prime-Time'}
                    </div>
                    <div className="text-[9px] text-emerald-400 font-semibold">
                      Active & Monitored
                    </div>
                  </div>
                </div>

                {/* Slide indicator dots */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      type="button"
                      className="p-2 cursor-pointer group flex items-center justify-center focus:outline-none"
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      <span
                        className={`h-1.5 transition-all duration-300 rounded-full block pointer-events-none ${
                          activeSlideIndex === idx
                            ? 'w-7 bg-[#A302FF] dark:bg-[#B833FF]'
                            : 'w-2 bg-slate-300 dark:bg-slate-700 group-hover:bg-purple-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. IN THE SPOTLIGHT (Continuous Right-to-Left Carousel with Original Logos)*/}
      {/* ========================================================================= */}
      <section className="py-7 sm:py-10 bg-slate-50 dark:bg-[#111111] border-b border-slate-200 dark:border-[#1F1F1F] overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            
            {/* Section Title with .b-border highlighter */}
            <h2 className="section-main-title text-slate-900 dark:text-white shrink-0 text-center lg:text-left whitespace-nowrap">
              {lang === 'bn' ? (
                <>মিডিয়ার <span className="b-border">স্পটলাইট</span></>
              ) : (
                <>In the <span className="b-border">Spotlight</span></>
              )}
            </h2>

            {/* Continuous Right-to-Left Infinite Moving Carousel with Original Media Logos */}
            <div className="relative w-full overflow-hidden flex-1 min-w-0">
              {/* Fade gradients on left and right for seamless edge blending */}
              <div className="absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-slate-50 dark:from-[#111111] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-slate-50 dark:from-[#111111] to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee flex items-center gap-4 sm:gap-6 py-1">
                {[...spotlightMediaLogos, ...spotlightMediaLogos].map((media, idx) => (
                  <div
                    key={`${media.name}-${idx}`}
                    className="shrink-0 h-12 sm:h-14 px-5 sm:px-6 bg-white dark:bg-white border border-slate-200/90 rounded-sm flex items-center justify-center shadow-xs hover:border-[#A302FF] hover:shadow-md hover:scale-105 transition-all duration-300 group cursor-pointer"
                    title={media.name}
                  >
                    <img
                      src={media.logo}
                      alt={media.name}
                      className="max-h-7 sm:max-h-8 max-w-[110px] sm:max-w-[135px] object-contain filter contrast-105 group-hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. FULL-WIDTH CINEMATIC BACKGROUND VIDEO (Exact match with IMBD reference)*/}
      {/* ========================================================================= */}
      <section
        id="playVideo"
        ref={videoSectionRef}
        onMouseMove={handleVideoMouseMove}
        onMouseEnter={() => setIsVideoHovered(true)}
        onMouseLeave={() => setIsVideoHovered(false)}
        onClick={() => setActiveVideoId('8nees6k5oNk')}
        className="relative w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-[650px] bg-black overflow-hidden border-y border-slate-800 dark:border-[#1F1F1F] cursor-pointer select-none group"
      >
        {/* Continuous Autoplay Background Video (Muted Endless Loop - 3D Illustration & Motion Reel) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <iframe
            src="https://www.youtube-nocookie.com/embed/8nees6k5oNk?autoplay=1&mute=1&controls=0&loop=1&playlist=8nees6k5oNk&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1"
            title="Berlo 3D Strategic Motion & Agency Reel"
            className="w-[160%] h-[160%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none filter contrast-110 brightness-95"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Ambient Dark Gradient Overlays & Organic Edge Masking matching screenshot media_1794918294861_9ae416c9.jpg */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
        
        {/* Jagged / Brush Splatter Edge Overlay matching IMBD reference */}
        <div className="absolute right-0 inset-y-0 w-24 sm:w-48 lg:w-72 pointer-events-none z-10 overflow-hidden">
          <svg className="w-full h-full text-black fill-current opacity-90" viewBox="0 0 100 600" preserveAspectRatio="none">
            <path d="M100,0 L100,600 L65,600 Q45,550 55,500 T40,400 Q60,350 45,300 T58,200 Q35,150 50,100 T30,0 Z" />
          </svg>
        </div>
        <div className="absolute right-0 inset-y-0 w-28 sm:w-56 lg:w-80 bg-gradient-to-l from-black via-black/85 to-transparent pointer-events-none z-10" />
        <div className="absolute left-0 inset-y-0 w-20 sm:w-44 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-10" />

        {/* Official Agency Brand Logo in Top-Right Corner (Exact match with IMBD reference) */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 pointer-events-none">
          <img
            src="/brand/logo.png"
            alt="Berlo Communications"
            className="h-7 sm:h-11 w-auto object-contain filter drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] brightness-110"
          />
        </div>

        {/* Live Operational Newsroom Tag on Bottom-Left */}
        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-20 pointer-events-none max-w-[85%] sm:max-w-none">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/85 backdrop-blur-md border border-white/10 text-white text-[10.5px] sm:text-sm font-semibold shadow-2xl">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">
              {lang === 'bn'
                ? 'বার্লো স্ট্র্যাটেজিক নিউজরুম ও এজেন্সী রিল — ঢাকা'
                : 'Berlo Strategic Operations & Agency Reel — Dhaka'}
            </span>
          </div>
        </div>

        {/* Desktop Smooth Mouse-Following Magnetic "Play" Badge (Exact IMBD behavior) */}
        <div
          className={`hidden md:flex pointer-events-none absolute z-30 items-center justify-center w-20 h-20 rounded-full bg-[#A302FF] text-white shadow-[0_0_35px_rgba(163,2,255,0.6)] transition-opacity duration-300 ${
            isVideoHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            left: videoMousePos.x,
            top: videoMousePos.y,
            transform: 'translate(-50%, -50%)',
            transition: 'transform 0.08s ease-out, opacity 0.25s ease',
          }}
        >
          <div className="flex flex-col items-center justify-center select-none">
            <FaPlay className="w-5 h-5 text-white translate-x-0.5 mb-1" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest">
              {lang === 'bn' ? 'প্লে করুন' : 'Play'}
            </span>
          </div>
        </div>

        {/* Mobile / Fallback Centered Play Circle */}
        <div className="md:hidden absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#A302FF] text-white flex flex-col items-center justify-center shadow-2xl pointer-events-none z-20 animate-pulse-subtle">
          <FaPlay className="w-4 h-4 sm:w-5 sm:h-5 text-white translate-x-0.5 mb-0.5" />
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">
            {lang === 'bn' ? 'প্লে' : 'Play'}
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. OUR SERVICES (Exact 3x3 Grid, 350px min-height, .b-border, corners)   */}
      {/* ========================================================================= */}
      <section id="services" className="py-12 sm:py-16 lg:py-24 border-t border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row: Our <span class="b-border">Services</span> + Subtitle (Mobile) + VIEW ALL button */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 mb-8 sm:mb-12 text-center md:text-left">
            <div className="w-full md:w-auto">
              <h2 className="section-main-title text-slate-900 dark:text-white text-center md:text-left">
                {lang === 'bn' ? (
                  <>আমাদের <span className="b-border">সেবাসমূহ</span></>
                ) : (
                  <>Our <span className="b-border">Services</span></>
                )}
              </h2>
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-end mt-2 md:mt-0">
              <Link
                to={formatRoute('services')}
                className="btn-berlo-outline"
              >
                <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'VIEW ALL'}</span>
              </Link>
            </div>
          </div>

          {/* 3x3 Card Grid (9 services) - Centered on Mobile matching IMBD */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
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
                    className="relative z-10 flex flex-col justify-between bg-white dark:bg-[#161616] p-6 sm:p-8 lg:p-10 border border-slate-200 dark:border-[#242424] min-h-[260px] sm:min-h-[340px] shadow-sm hover:border-[#A302FF] dark:hover:border-[#B833FF] hover:shadow-xl transition-all duration-300 h-full group text-center md:text-left items-center md:items-start"
                  >
                    <div className="flex flex-col items-center md:items-start w-full">
                      {/* Circular Icon with Signature Brand Purple - Centered on Mobile matching IMBD */}
                      <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-full bg-[#A302FF] flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform duration-300 mx-auto md:mx-0">
                        <Icon className="w-7 h-7 sm:w-6 sm:h-6 text-white" />
                      </div>

                      {/* Title: Centered on Mobile matching IMBD */}
                      <h3 className="text-[19px] sm:text-[21px] lg:text-[22px] font-bold text-slate-900 dark:text-white mt-5 sm:mt-6 group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors leading-snug text-center md:text-left">
                        {service.title}
                      </h3>

                      {/* Description: Centered on Mobile matching IMBD */}
                      <p className="text-[13.5px] sm:text-[14.5px] text-[#475569] dark:text-[#A0A0A0] text-center md:text-left mt-3 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    {/* Bottom explore link: Hidden on mobile for clean IMBD style, visible on desktop */}
                    <div className="hidden md:flex mt-5 sm:mt-6 pt-4 border-t border-slate-200 dark:border-[#262626] items-center justify-between text-xs font-semibold text-slate-600 dark:text-[#7A7A7A] group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors w-full">
                      <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Capability'}</span>
                      <FaArrowRight className="w-3.5 h-3.5 text-[#A302FF] dark:text-[#B833FF] transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. BOOK A FREE CONSULTANCY (Exact Same to Same from reference screenshot) */}
      {/* ========================================================================= */}
      <section id="consultancy" className="py-16 lg:py-24 bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white border-y border-slate-200 dark:border-[#1F1F1F] transition-colors duration-200">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Berlo Strategic Team Photo with Ambient Color Glow Effect (Centered on Mobile, Shifted Left on Desktop) */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-start relative ml-0 lg:-ml-6">
              <div className="relative group w-full max-w-[530px] mx-auto lg:mx-0">
                
                {/* Ambient Multi-Layer Color Glow behind the image */}
                <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-tr from-[#1A305A]/25 dark:from-[#1A305A]/90 via-[#A302FF]/30 dark:via-[#A302FF]/40 to-[#11813C]/25 dark:to-[#11813C]/35 blur-2xl opacity-80 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

                {/* Stylish Offset Brand Accent Backplate */}
                <div className="absolute -bottom-2.5 -left-2.5 w-full h-full rounded-2xl bg-gradient-to-br from-[#A302FF]/50 dark:from-[#A302FF]/60 via-[#1A305A]/30 dark:via-[#1A305A]/40 to-[#11813C]/40 dark:to-[#11813C]/50 pointer-events-none opacity-85 blur-[1px]" />

                {/* Main Photo Card with clean rounded border and subtle sheen */}
                <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/20 bg-white dark:bg-[#12141C] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                  <img
                    src="/images/berlo/team-consultancy.jpg"
                    alt="Berlo PR Strategic Advisory Team"
                    className="w-full h-auto object-cover filter contrast-105 brightness-100 group-hover:scale-102 transition-transform duration-700"
                  />
                  {/* Subtle inner vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 dark:from-black/45 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            </div>

            {/* Right Column: Exact Stepper Form (Personal Info, Contact Info, Message) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <h2 className="text-[32px] sm:text-[40px] font-bold text-slate-900 dark:text-white tracking-tight">
                  {lang === 'bn' ? (
                    <>ফ্রি <span className="b-border">পরামর্শ গ্রহণ</span></>
                  ) : (
                    <>Book a Free <span className="b-border">Consultancy</span></>
                  )}
                </h2>
              </div>

              {/* 3-Step Indicator Bar matching reference image */}
              <div className="flex items-center justify-between relative max-w-md pt-2 pb-4">
                {/* Connecting Line */}
                <div className="absolute top-6 left-6 right-6 h-[1px] bg-slate-300 dark:bg-[#333333] -z-0" />

                {/* Step 1: Personal Info */}
                <div
                  className="flex flex-col items-center relative z-10 cursor-pointer"
                  onClick={() => setCurrentStep(1)}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === 1
                        ? 'bg-[#A302FF] text-white ring-4 ring-[#A302FF]/30 shadow-lg shadow-purple-600/40'
                        : currentStep > 1
                        ? 'bg-[#11813C] text-white'
                        : 'bg-white dark:bg-[#191919] border border-slate-300 dark:border-[#444444] text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {currentStep > 1 ? '✓' : '1'}
                  </div>
                  <span className={`text-[11px] sm:text-[12px] font-semibold mt-2 tracking-tight ${currentStep === 1 ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-[#7A7A7A]'}`}>
                    {lang === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Info'}
                  </span>
                </div>

                {/* Step 2: Contact Info */}
                <div
                  className="flex flex-col items-center relative z-10 cursor-pointer"
                  onClick={() => {
                    if (wizardData.name) setCurrentStep(2);
                  }}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === 2
                        ? 'bg-[#A302FF] text-white ring-4 ring-[#A302FF]/30 shadow-lg shadow-purple-600/40'
                        : currentStep > 2
                        ? 'bg-[#11813C] text-white'
                        : 'bg-white dark:bg-[#191919] border border-slate-300 dark:border-[#444444] text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {currentStep > 2 ? '✓' : '2'}
                  </div>
                  <span className={`text-[11px] sm:text-[12px] font-semibold mt-2 tracking-tight ${currentStep === 2 ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-[#7A7A7A]'}`}>
                    {lang === 'bn' ? 'যোগাযোগ তথ্য' : 'Contact Info'}
                  </span>
                </div>

                {/* Step 3: Message */}
                <div
                  className="flex flex-col items-center relative z-10 cursor-pointer"
                  onClick={() => {
                    if (wizardData.name && wizardData.mobile) setCurrentStep(3);
                  }}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === 3
                        ? 'bg-[#A302FF] text-white ring-4 ring-[#A302FF]/30 shadow-lg shadow-purple-600/40'
                        : 'bg-white dark:bg-[#191919] border border-slate-300 dark:border-[#444444] text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    3
                  </div>
                  <span className={`text-[11px] sm:text-[12px] font-semibold mt-2 tracking-tight ${currentStep === 3 ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-[#7A7A7A]'}`}>
                    {lang === 'bn' ? 'বার্তা' : 'Message'}
                  </span>
                </div>
              </div>

              {/* Form Content / Success Alert */}
              {isSubmitted ? (
                <div className="p-6 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 text-sm font-medium flex items-start gap-3 shadow-md dark:shadow-2xl">
                  <FaCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white mb-1">
                      {lang === 'bn' ? 'অনুরোধ সফলভাবে গৃহীত হয়েছে!' : 'Consultation Request Submitted!'}
                    </div>
                    <div>
                      {lang === 'bn'
                        ? 'আমাদের সিনিয়র পিআর স্ট্র্যাটেজিস্ট ২ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবেন।'
                        : 'A Senior PR Strategist will contact you within 2 business hours.'}
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleWizardSubmit} className="space-y-4 pt-1">
                  
                  {/* Step 1: Personal Info (Exact match with reference image) */}
                  {currentStep === 1 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <input
                          type="text"
                          required
                          value={wizardData.name}
                          onChange={(e) => setWizardData({ ...wizardData, name: e.target.value })}
                          placeholder={lang === 'bn' ? 'নাম' : 'Name'}
                          className="w-full py-3.5 px-4 bg-white dark:bg-[#141414] border border-slate-300 dark:border-[#2b2b2b] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#7A7A7A] focus:outline-none focus:border-[#A302FF] text-[15px] transition-colors rounded-none shadow-sm dark:shadow-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={wizardData.company}
                          onChange={(e) => setWizardData({ ...wizardData, company: e.target.value })}
                          placeholder={lang === 'bn' ? 'প্রতিষ্ঠানের নাম' : 'Company Name'}
                          className="w-full py-3.5 px-4 bg-white dark:bg-[#141414] border border-slate-300 dark:border-[#2b2b2b] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#7A7A7A] focus:outline-none focus:border-[#A302FF] text-[15px] transition-colors rounded-none shadow-sm dark:shadow-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={wizardData.designation}
                          onChange={(e) => setWizardData({ ...wizardData, designation: e.target.value })}
                          placeholder={lang === 'bn' ? 'পদবি' : 'Designation'}
                          className="w-full py-3.5 px-4 bg-white dark:bg-[#141414] border border-slate-300 dark:border-[#2b2b2b] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#7A7A7A] focus:outline-none focus:border-[#A302FF] text-[15px] transition-colors rounded-none shadow-sm dark:shadow-none"
                        />
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!wizardData.name.trim()) return;
                            setCurrentStep(2);
                          }}
                          className="w-full py-3.5 px-6 border border-[#A302FF] bg-transparent hover:bg-[#A302FF] text-[#A302FF] hover:text-white font-bold text-[15px] tracking-wide transition-all rounded-none text-center cursor-pointer"
                        >
                          {lang === 'bn' ? 'পরবর্তী' : 'Next'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Contact Info */}
                  {currentStep === 2 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <input
                          type="tel"
                          required
                          value={wizardData.mobile}
                          onChange={(e) => setWizardData({ ...wizardData, mobile: e.target.value })}
                          placeholder={lang === 'bn' ? 'মোবাইল নম্বর' : 'Mobile No'}
                          className="w-full py-3.5 px-4 bg-white dark:bg-[#141414] border border-slate-300 dark:border-[#2b2b2b] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#7A7A7A] focus:outline-none focus:border-[#A302FF] text-[15px] transition-colors rounded-none shadow-sm dark:shadow-none"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          value={wizardData.email}
                          onChange={(e) => setWizardData({ ...wizardData, email: e.target.value })}
                          placeholder={lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
                          className="w-full py-3.5 px-4 bg-white dark:bg-[#141414] border border-slate-300 dark:border-[#2b2b2b] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#7A7A7A] focus:outline-none focus:border-[#A302FF] text-[15px] transition-colors rounded-none shadow-sm dark:shadow-none"
                        />
                      </div>
                      <div>
                        <select
                          value={wizardData.service}
                          onChange={(e) => setWizardData({ ...wizardData, service: e.target.value })}
                          className="w-full py-3.5 px-4 bg-white dark:bg-[#141414] border border-slate-300 dark:border-[#2b2b2b] text-slate-900 dark:text-white focus:outline-none focus:border-[#A302FF] text-[15px] transition-colors rounded-none shadow-sm dark:shadow-none"
                        >
                          <option value="Strategic Media Relations" className="bg-white dark:bg-[#191919] text-slate-900 dark:text-white">
                            {lang === 'bn' ? 'জাতীয় মিডিয়া সম্পর্ক ও প্রেস কনফারেন্স' : 'Strategic Media Relations & Press'}
                          </option>
                          <option value="Crisis & Reputation Management" className="bg-white dark:bg-[#191919] text-slate-900 dark:text-white">
                            {lang === 'bn' ? 'সংকট ব্যবস্থাপনা ও সুনাম সুরক্ষা' : 'Crisis & Reputation Architecture'}
                          </option>
                          <option value="Corporate Communications" className="bg-white dark:bg-[#191919] text-slate-900 dark:text-white">
                            {lang === 'bn' ? 'কর্পোরেট যোগাযোগ ও উপদেষ্টা' : 'Corporate Communications & Advisory'}
                          </option>
                          <option value="Brand Positioning" className="bg-white dark:bg-[#191919] text-slate-900 dark:text-white">
                            {lang === 'bn' ? 'কৌশলগত ব্র্যান্ড ও মার্কেট পিআর' : 'Strategic Brand PR Positioning'}
                          </option>
                          <option value="Government Affairs" className="bg-white dark:bg-[#191919] text-slate-900 dark:text-white">
                            {lang === 'bn' ? 'পাবলিক পলিসি ও রেগুলেটরি সম্পর্ক' : 'Government Affairs & Policy Advocacy'}
                          </option>
                        </select>
                      </div>
                      <div className="pt-2 flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="w-1/2 py-3.5 px-6 border border-slate-300 dark:border-[#444444] bg-transparent text-slate-700 dark:text-slate-300 hover:border-slate-500 dark:hover:border-slate-200 font-bold text-[15px] transition-all rounded-none text-center cursor-pointer"
                        >
                          {lang === 'bn' ? 'পূর্ববর্তী' : 'Previous'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!wizardData.mobile.trim() && !wizardData.email.trim()) return;
                            setCurrentStep(3);
                          }}
                          className="w-1/2 py-3.5 px-6 border border-[#A302FF] bg-transparent hover:bg-[#A302FF] text-[#A302FF] hover:text-white font-bold text-[15px] tracking-wide transition-all rounded-none text-center cursor-pointer"
                        >
                          {lang === 'bn' ? 'পরবর্তী' : 'Next'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Message */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <textarea
                          rows={4}
                          value={wizardData.message}
                          onChange={(e) => setWizardData({ ...wizardData, message: e.target.value })}
                          placeholder={lang === 'bn' ? 'সমস্যার সংক্ষিপ্ত বিবরণ লিখুন' : 'Describe the Issues'}
                          className="w-full py-3.5 px-4 bg-white dark:bg-[#141414] border border-slate-300 dark:border-[#2b2b2b] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#7A7A7A] focus:outline-none focus:border-[#A302FF] text-[15px] transition-colors rounded-none resize-none shadow-sm dark:shadow-none"
                        />
                      </div>
                      <div className="pt-2 flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="w-1/2 py-3.5 px-6 border border-slate-300 dark:border-[#444444] bg-transparent text-slate-700 dark:text-slate-300 hover:border-slate-500 dark:hover:border-slate-200 font-bold text-[15px] transition-all rounded-none text-center cursor-pointer"
                        >
                          {lang === 'bn' ? 'পূর্ববর্তী' : 'Previous'}
                        </button>
                        <button
                          type="submit"
                          className="w-1/2 py-3.5 px-6 bg-[#A302FF] hover:bg-[#8800D6] text-white font-bold text-[15px] tracking-wide transition-all rounded-none text-center cursor-pointer shadow-lg shadow-purple-600/30"
                        >
                          {lang === 'bn' ? 'অনুরোধ পাঠান' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  )}

                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. EXPLORE CLIENT RATINGS SHOWCASE (Laurel Wreath Banner)                */}
      {/* ========================================================================= */}
      <section className="py-10 sm:py-12 bg-slate-50 dark:bg-[#111111] border-y border-slate-200 dark:border-[#1F1F1F] text-center">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-8">
            {/* Laurel Wreath Left SVG */}
            <svg className="w-6 sm:w-10 lg:w-12 h-10 sm:h-14 lg:h-16 text-[#A302FF] dark:text-[#B833FF] shrink-0" viewBox="0 0 24 36" fill="currentColor">
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
            <svg className="w-6 sm:w-10 lg:w-12 h-10 sm:h-14 lg:h-16 text-[#A302FF] dark:text-[#B833FF] shrink-0 transform scale-x-[-1]" viewBox="0 0 24 36" fill="currentColor">
              <path d="M11 2C7 6 4 12 4 18c0 7 4 13 8 16-1-3-2-7-2-10 0-6 3-11 5-15-2 0-3-1-4-3zm-6 9c-2 3-3 7-3 10 0 5 3 9 6 12-1-3-2-6-2-9 0-5 2-9 4-12-2 0-4-1-5-1z" />
            </svg>
          </div>

          {/* 4 Metric Blocks */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            <div className="p-3.5 sm:p-5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#A302FF] dark:text-[#B833FF]">250+</div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-[#7A7A7A] mt-1">
                {lang === 'bn' ? 'সফল করপোরেট ক্যাম্পেইন' : 'Corporate Campaigns'}
              </div>
            </div>
            <div className="p-3.5 sm:p-5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#11813C] dark:text-[#16A34A]">100%</div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-[#7A7A7A] mt-1">
                {lang === 'bn' ? 'গোপনীয়তা রক্ষা নিশ্চয়তা' : 'NDA Confidentiality'}
              </div>
            </div>
            <div className="p-3.5 sm:p-5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00A896] dark:text-[#14B8A6]">60 Min</div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-[#7A7A7A] mt-1">
                {lang === 'bn' ? 'ক্রাইসিস ওয়ার-রুম গতি' : 'Crisis War-Room Speed'}
              </div>
            </div>
            <div className="p-3.5 sm:p-5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-[#262626]">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1A305A] dark:text-[#60A5FA]">12+ Yrs</div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-[#7A7A7A] mt-1">
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
            <h2 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>আমাদের সাথে কাজ করার <span className="b-border">সুবিধাসমূহ</span></>
              ) : (
                <>Discover the <span className="b-border">Benefits</span> with Us</>
              )}
            </h2>

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
      {/* 08. INNOVATING SUCCESS TOGETHER (3D Logo Flip Showcase + Logo Marquee)    */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-[#07090D] border-y border-slate-200 dark:border-[#1F1F1F] overflow-hidden text-slate-900 dark:text-white transition-colors duration-200">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>একসাথে উদ্ভাবনী <span className="b-border">সাফল্য</span></>
              ) : (
                <>Innovating <span className="b-border">Success</span> Together</>
              )}
            </h2>
          </div>

          {/* Framed Container matching reference screenshot */}
          <div className="bg-white dark:bg-[#050608] border border-slate-200 dark:border-[#1C2029] p-4 sm:p-6 space-y-6 shadow-md dark:shadow-2xl transition-colors duration-200">
            
            {/* Row 1: 4 Large 3D Flip Logo Slots (Exact match with IMBD reference) */}
            <div className="logo-flip-showcase">
              {flipSlots.map((slot, idx) => (
                <div key={idx} className="logo-flip-slot">
                  <div className={`logo-flip-inner ${slot.isFlipped ? 'is-flipped' : ''}`}>
                    {/* Front Face */}
                    <div className="logo-flip-face logo-flip-front p-4 bg-white border border-slate-100 dark:border-white/10">
                      <img
                        src={slot.front}
                        alt={`Enterprise Partner ${idx + 1}`}
                        className="w-full h-full object-contain filter contrast-105"
                      />
                    </div>
                    {/* Back Face */}
                    <div className="logo-flip-face logo-flip-back p-4 bg-white border border-slate-100 dark:border-white/10">
                      <img
                        src={slot.back}
                        alt={`Enterprise Partner ${idx + 1}`}
                        className="w-full h-full object-contain filter contrast-105"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Continuous Marquee of White Logo Cards */}
            <div className="relative w-full overflow-hidden pt-2">
              <div className="animate-marquee flex gap-4">
                {[...marqueeLogos, ...marqueeLogos].map((client, idx) => (
                  <div
                    key={`${client.name}-${idx}`}
                    className="shrink-0 w-36 sm:w-44 h-16 sm:h-20 bg-white border border-slate-200 rounded-sm p-3 flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-12 max-w-[120px] object-contain filter contrast-110"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09. CLIENTS SAYS (Video Testimonial Cards matching reference screenshot)   */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#000000] text-slate-900 dark:text-white border-b border-slate-200 dark:border-[#1F1F1F] transition-colors duration-200">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Row: Clients Says + VIEW ALL button on right */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 text-center sm:text-left">
            <h2 className="section-main-title text-slate-900 dark:text-white text-center sm:text-left">
              {lang === 'bn' ? (
                <>ক্লায়েন্টদের <span className="b-border">মন্তব্য ও রিভিউ</span></>
              ) : (
                <>Clients <span className="b-border">Says</span></>
              )}
            </h2>
            <Link
              to={formatRoute('clients')}
              className="px-5 py-2 border border-[#A302FF] text-[#A302FF] dark:text-white hover:bg-[#A302FF] hover:text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-none self-center sm:self-auto"
            >
              <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'VIEW ALL'}</span>
            </Link>
          </div>

          {/* 3 Video Cards matching exact 16:9 thumbnail + play button */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTestimonials.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveVideoId(item.youtubeId)}
                className="group relative aspect-video bg-slate-900 dark:bg-[#0A0A0A] border border-slate-200 dark:border-[#222222] hover:border-[#A302FF] overflow-hidden cursor-pointer shadow-lg dark:shadow-xl transition-all duration-300"
              >
                {/* Thumbnail Image: Grayscale 100% to Color on hover */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Authentic Red YouTube / Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-10 sm:w-16 sm:h-11 rounded-xl bg-[#F61C0D] group-hover:scale-115 group-hover:shadow-[0_0_25px_rgba(246,28,13,0.7)] flex items-center justify-center transition-all duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Title badge overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. RECENT PROJECTS / CASE STUDIES (Modern Editorial Portfolio Showcase)   */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-[#07090D] text-slate-900 dark:text-white border-b border-slate-200 dark:border-[#1F1F1F] transition-colors duration-200">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row: Clean Title + View All */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
            <div className="space-y-3 w-full md:w-auto">
              <h2 className="section-main-title text-slate-900 dark:text-white text-center md:text-left">
                {lang === 'bn' ? (
                  <>সাম্প্রতিক <span className="b-border">প্রকল্পসমূহ</span></>
                ) : (
                  <>Recent <span className="b-border">Projects</span></>
                )}
              </h2>
            </div>
            
            <Link
              to={formatRoute('work')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#A302FF] text-[#A302FF] dark:text-white hover:bg-[#A302FF] hover:text-white text-xs font-bold uppercase tracking-widest transition-all rounded-none self-center md:self-auto group"
            >
              <span>{lang === 'bn' ? 'সকল প্রকল্প দেখুন' : 'VIEW ALL WORK'}</span>
              <FaArrowRight className="w-3.5 h-3.5 text-[#B833FF] group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Interactive Filter Pills (Horizontal Swipe on Mobile & Tablet, Clean Wrap on Desktop) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-2.5 border-b border-slate-200 dark:border-white/10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {[
              { id: 'all', en: 'All Projects', bn: 'সকল প্রকল্প' },
              { id: 'trade', en: 'Trade Expos & Pavilions', bn: 'আন্তর্জাতিক বাণিজ্য মেলা ও প্যাভিলিয়ন' },
              { id: 'events', en: 'Corporate Galas & Events', bn: 'কর্পোরেট গালা ও কনক্লেভ' },
              { id: 'crisis', en: 'Crisis PR & Newsroom', bn: 'সংকট ব্যবস্থাপনা ও নিউজরুম' },
              { id: 'speaker', en: 'Executive Thought Leadership', bn: 'সি-সুইট স্পিকার প্রোগ্রাম' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveProjectFilter(tab.id as any)}
                type="button"
                className={`shrink-0 px-3.5 sm:px-4 py-2 text-xs font-semibold tracking-wide transition-all cursor-pointer rounded-none ${
                  activeProjectFilter === tab.id
                    ? 'bg-[#A302FF] text-white shadow-lg shadow-purple-900/30 ring-1 ring-purple-400/30'
                    : 'bg-white dark:bg-[#141720] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E2330] border border-slate-200 dark:border-white/5'
                }`}
              >
                {lang === 'bn' ? tab.bn : tab.en}
              </button>
            ))}
          </div>

          {/* Featured Hero Showcase Card (Active when 'all' or 'trade' is selected) */}
          {(activeProjectFilter === 'all' || activeProjectFilter === 'trade') && (
            <div className="bg-white dark:bg-[#11141D] border border-slate-200 dark:border-[#232838] hover:border-[#A302FF] transition-all duration-500 overflow-hidden shadow-lg dark:shadow-2xl group">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Visual Left: Cinematic Photo without Clutter Badges */}
                <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] overflow-hidden bg-black">
                  <img
                    src={featuredProjects[0].image}
                    alt={featuredProjects[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/90 dark:lg:to-[#11141D]" />
                </div>

                {/* Content Right */}
                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="text-xs uppercase tracking-widest text-[#A302FF] dark:text-[#B833FF] font-bold">
                      {featuredProjects[0].client}
                    </div>
                    
                    <h3 className="text-[24px] sm:text-[28px] font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors leading-tight">
                      {featuredProjects[0].title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed">
                      {featuredProjects[0].desc}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 bg-slate-50 dark:bg-[#171B26] border border-slate-200 dark:border-white/5">
                        <div className="text-lg font-black text-slate-900 dark:text-white">50+ Tier-1</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                          {lang === 'bn' ? 'জাতীয় ও আন্তর্জাতিক মিডিয়া' : 'Global Media Outlets'}
                        </div>
                      </div>
                      <div className="p-3.5 bg-slate-50 dark:bg-[#171B26] border border-slate-200 dark:border-white/5">
                        <div className="text-lg font-black text-[#11813C]">2.5M+</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                          {lang === 'bn' ? 'দর্শনার্থী সংযোগ' : 'On-Ground Footfall'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-end">
                    <Link
                      to={formatRoute('work')}
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors"
                    >
                      <span>{lang === 'bn' ? 'সম্পূর্ণ কেস স্টাডি দেখুন' : 'Explore Case Study'}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1A1F2C] border border-slate-300 dark:border-[#A302FF]/40 group-hover:bg-[#A302FF] group-hover:border-[#A302FF] text-slate-700 dark:text-white group-hover:text-white flex items-center justify-center transition-all">
                        <FaArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Grid of Remaining/Filtered Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects
              .filter((p) => activeProjectFilter === 'all' ? p.id !== 'dhaka-trade-fair' : p.categoryType === activeProjectFilter)
              .map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-[#11141D] border border-slate-200 dark:border-[#202533] hover:border-[#A302FF] transition-all duration-500 overflow-hidden shadow-md dark:shadow-xl group flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Aspect Ratio - Clean without clutter badges */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-black">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content: Title Only */}
                    <div className="p-6">
                      <h4 className="text-[18px] sm:text-[19px] font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors leading-snug line-clamp-2">
                        {project.title}
                      </h4>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0E1017] flex items-center justify-end">
                    <Link
                      to={formatRoute('work')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors"
                    >
                      <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Impact'}</span>
                      <FaArrowRight className="w-3 h-3 text-[#A302FF] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. OUR STRATEGIC LEADERSHIP & TEAM (Clean Editorial Executive Portraits)  */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#07090D] text-slate-900 dark:text-white border-b border-slate-200 dark:border-[#1F1F1F] transition-colors duration-200">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Row: Title + View Full Team */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
            <div className="space-y-3 w-full md:w-auto">
              <h2 className="section-main-title text-slate-900 dark:text-white text-center md:text-left">
                {lang === 'bn' ? (
                  <>আমাদের কৌশলগত <span className="b-border">নেতৃত্ব ও টিম</span></>
                ) : (
                  <>Our Strategic <span className="b-border">Leadership & Team</span></>
                )}
              </h2>
            </div>

            <Link
              to={formatRoute('leadership')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#A302FF] text-[#A302FF] dark:text-white hover:bg-[#A302FF] hover:text-white text-xs font-bold uppercase tracking-widest transition-all rounded-none self-center md:self-auto group"
            >
              <span>{lang === 'bn' ? 'সকল সদস্য দেখুন' : 'VIEW FULL TEAM'}</span>
              <FaArrowRight className="w-3.5 h-3.5 text-[#B833FF] group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Interactive Department Filter Pills (Horizontal Swipe on Mobile & Tablet, Clean Wrap on Desktop) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-2.5 border-b border-slate-200 dark:border-white/10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {[
              { id: 'all', en: 'All Leadership', bn: 'সকল নেতৃত্ব' },
              { id: 'planning', en: 'Strategic Planning & Advisory', bn: 'কৌশলগত পরিকল্পনা ও উপদেষ্টা' },
              { id: 'media', en: 'National Media PR', bn: 'ন্যাশনাল মিডিয়া পিআর' },
              { id: 'events', en: 'Events & Activation', bn: 'ইভেন্ট ও অ্যাক্টিভেশন' },
              { id: 'creative', en: 'Creative & Visual Art', bn: 'ভিজ্যুয়াল ক্রিয়েটিভ' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTeamFilter(tab.id as any)}
                type="button"
                className={`shrink-0 px-3.5 sm:px-4 py-2 text-xs font-semibold tracking-wide transition-all cursor-pointer rounded-none ${
                  activeTeamFilter === tab.id
                    ? 'bg-[#A302FF] text-white shadow-lg shadow-purple-900/30 ring-1 ring-purple-400/30'
                    : 'bg-slate-100 dark:bg-[#141720] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#1E2330] border border-slate-200 dark:border-white/5'
                }`}
              >
                {lang === 'bn' ? tab.bn : tab.en}
              </button>
            ))}
          </div>

          {/* Clean Editorial Portrait Cards in 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers
              .filter((m) => activeTeamFilter === 'all' || m.department === activeTeamFilter)
              .map((member) => (
                <div
                  key={member.id}
                  className="bg-white dark:bg-[#0D0F14] border border-slate-200 dark:border-[#1F232D] hover:border-[#A302FF] transition-all duration-500 overflow-hidden shadow-lg dark:shadow-2xl group flex flex-col justify-between relative"
                >
                  {/* Portrait Visual: Aspect 3:3.8 - Clean without forehead badges */}
                  <div className="relative aspect-[3/3.8] overflow-hidden bg-slate-900 dark:bg-[#0A0C10]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top filter grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    
                    {/* Multi-stop gradient scrim so white typography pops cleanly in both modes */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                    {/* Bottom Info inside visual */}
                    <div className="absolute bottom-4 inset-x-5 z-10 space-y-1">
                      <h3 className="text-[22px] font-bold text-white group-hover:text-[#B833FF] transition-colors tracking-tight">
                        {member.name}
                      </h3>
                      <div className="text-xs font-semibold text-slate-200 tracking-wide">
                        {member.role}
                      </div>
                    </div>
                  </div>

                  {/* Clean Footer Row */}
                  <div className="p-4 px-5 bg-white dark:bg-[#0D0F14] border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {member.departmentLabel}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${member.email}`}
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#181B23] border border-slate-200 dark:border-white/10 hover:border-[#A302FF] hover:bg-[#A302FF] text-slate-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all"
                        aria-label={`Email ${member.name}`}
                        title={`Email ${member.name}`}
                      >
                        <FaEnvelope className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="#consultancy"
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#181B23] border border-slate-200 dark:border-white/10 hover:border-[#A302FF] hover:bg-[#A302FF] text-slate-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all"
                        aria-label="Book Advisory"
                        title="Book Advisory"
                      >
                        <FaArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 10. MEMORIES & MOMENTS (Dense Photo Mosaic Grid)                          */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-[#111111] border-t border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center lg:text-left space-y-2">
            <h2 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
              {lang === 'bn' ? (
                <>স্মৃতি ও <span className="b-border">মুহূর্তসমূহ</span></>
              ) : (
                <>Memories & <span className="b-border">Moments</span></>
              )}
            </h2>
          </div>

          {/* 12-Card High-Density Photo Mosaic (3-col mobile, 4-col tablet, 6-col desktop) */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3.5">
            {momentPhotos.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveGalleryIndex(idx)}
                className="group relative aspect-square overflow-hidden border border-slate-200 dark:border-[#262626] shadow-sm cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#A302FF]"
                aria-label={`View ${photo.title}`}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-2.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-white leading-tight line-clamp-2">
                    {photo.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. LATEST BLOGS (3 Editorial Cards)                                      */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 mb-8 sm:mb-12 text-center sm:text-left">
          <h2 className="section-main-title text-slate-900 dark:text-white text-center sm:text-left">
            {lang === 'bn' ? (
              <>সাম্প্রতিক <span className="b-border">ব্লগ ও ইনসাইটস</span></>
            ) : (
              <>Latest <span className="b-border">Blogs</span></>
            )}
          </h2>
          <Link
            to={formatRoute('insights')}
            className="btn-berlo-outline self-center sm:self-auto"
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
                </div>

                <div className="p-6">
                  <h3 className="text-[18px] font-semibold text-slate-900 dark:text-white group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors line-clamp-2 leading-snug">
                    {article.title[lang]}
                  </h3>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-[#A302FF] dark:text-[#B833FF]">
                <span>{lang === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read Article'}</span>
                <FaChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Gallery Lightbox Modal for Memories & Moments */}
      {activeGalleryIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveGalleryIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveGalleryIndex(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#A302FF] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xl"
            aria-label="Close image preview"
          >
            <FaXmark className="w-5 h-5" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveGalleryIndex((prev) => (prev! > 0 ? prev! - 1 : momentPhotos.length - 1));
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#A302FF] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xl"
            aria-label="Previous photo"
          >
            <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveGalleryIndex((prev) => (prev! < momentPhotos.length - 1 ? prev! + 1 : 0));
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#A302FF] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xl"
            aria-label="Next photo"
          >
            <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Image & Caption Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={momentPhotos[activeGalleryIndex].url}
              alt={momentPhotos[activeGalleryIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-md shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center">
              <h4 className="text-white text-base sm:text-lg font-bold">
                {momentPhotos[activeGalleryIndex].title}
              </h4>
              <p className="text-slate-400 text-xs mt-1">
                {lang === 'bn'
                  ? `ছবি ${activeGalleryIndex + 1} / ${momentPhotos.length}`
                  : `Photo ${activeGalleryIndex + 1} of ${momentPhotos.length}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video Lightbox Modal for YouTube reviews */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-[#A302FF] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
              aria-label="Close video"
            >
              <FaXmark className="w-4 h-4" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
              title="Client Testimonial Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Brand accent line before footer */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#A302FF] to-transparent w-full" />
    </div>
  );
};

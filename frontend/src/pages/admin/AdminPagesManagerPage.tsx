import React, { useState, useEffect } from 'react';
import { adminApi, PageSection, MediaAsset } from '../../services/adminApi';
import {
  Layers,
  Sparkles,
  Save,
  Globe,
  Sliders,
  Image as ImageIcon,
  Video,
  BarChart3,
  Shield,
  Briefcase,
  HelpCircle,
  FileText,
  Rocket,
  FolderOpen,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Tv,
  Users,
  Camera,
  MessageSquare,
  Plus,
  Trash2,
  Film,
  Eye,
  EyeOff,
  Check,
  ArrowUp,
  ArrowDown,
  X,
} from 'lucide-react';

interface SlideConfig {
  id: number;
  image: string;
  tag_en: string;
  tag_bn: string;
  text_en: string;
  text_bn: string;
  metric_en: string;
  metric_bn: string;
  submetric_en: string;
  submetric_bn: string;
  badge_title_en: string;
  badge_title_bn: string;
  badge_status_en: string;
  badge_status_bn: string;
  icon_type: 'network' | 'shield' | 'broadcast';
  blob_gradient?: string;
}

const defaultServiceCatalog = [
  { id: 1, slug: 'strategic-pr', title_en: 'Strategic PR & Corporate Communications', title_bn: 'কৌশলগত জনসংযোগ ও করপোরেট যোগাযোগ' },
  { id: 2, slug: 'media-relations', title_en: 'Media Relations & Press Management', title_bn: 'মিডিয়া সংযোগ ও প্রেস ব্যবস্থাপনা' },
  { id: 3, slug: 'crisis-management', title_en: 'Crisis Communication & Reputation Risk', title_bn: 'সংকট ও ঝুঁকি ব্যবস্থাপনা' },
  { id: 4, slug: 'events-activations', title_en: 'Experiential Events & Brand Activations', title_bn: 'ইভেন্ট ও ব্র্যান্ড অ্যাক্টিভেশন' },
  { id: 5, slug: 'digital-pr', title_en: 'Digital PR & Social Media Management', title_bn: 'ডিজিটাল পিআর ও সোশ্যাল মিডিয়া' },
  { id: 6, slug: 'content-storytelling', title_en: 'Visual Storytelling & Media Production', title_bn: 'ভিজ্যুয়াল স্টোরিটেলিং ও মিডিয়া প্রোডাকশন' },
  { id: 7, slug: 'brand-strategy', title_en: 'Brand Strategy & Identity Design', title_bn: 'ব্র্যান্ড স্ট্র্যাটেজি ও আইডেন্টিটি ডিজাইন' },
  { id: 8, slug: 'advocacy-pr', title_en: 'Public Affairs & Government Advocacy', title_bn: 'পাবলিক অ্যাফেয়ার্স ও সরকারি সম্পর্ক' },
  { id: 9, slug: 'monitoring-analytics', title_en: 'Media Intelligence & Sentiment Analytics', title_bn: 'মিডিয়া মনিটরিং ও অ্যানালিটিক্স' },
];

const defaultMarqueeLogos = [
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

const defaultVideoTestimonials = [
  { id: 1, title: 'Enterprise Reputation & Brand Scaling', subtitle: 'Strategic PR', thumbnail: '/images/berlo/testimonials/stock-testimonial-1.jpg', youtubeId: 'FHnfg223H60' },
  { id: 2, title: 'Nationwide Media Reach & Expansion', subtitle: 'Media Access', thumbnail: '/images/berlo/testimonials/stock-testimonial-2.jpg', youtubeId: 'OTClukQmiEw' },
  { id: 3, title: 'Enduring Enterprise Trust & Crisis Shield', subtitle: 'Crisis PR', thumbnail: '/images/berlo/testimonials/stock-testimonial-3.jpg', youtubeId: 'osL5z5nCE8M' },
];

const defaultProjectsCatalog = [
  {
    id: 1,
    slug: 'epb-diaspora-summit',
    title_en: 'Global Trade & Diaspora Investment Summit',
    title_bn: 'গ্লোবাল ট্রেড ও ডায়াসপোরা ইনভেস্টমেন্ট সামিট',
    client_name: 'Ministry of Commerce & Export Promotion Bureau (EPB)',
    industry: 'trade',
    cover_image: '/images/berlo/portfolio/epb-1.png',
  },
  {
    id: 2,
    slug: 'unique-group-crisis',
    title_en: 'Corporate Reputation Shield & Narrative Reclamation',
    title_bn: 'কর্পোরেট সুনাম সুরক্ষা ও ক্রাইসিস প্রতিরক্ষা',
    client_name: 'Unique Group & The Westin Dhaka',
    industry: 'crisis',
    cover_image: '/images/berlo/portfolio/westin-1.png',
  },
  {
    id: 3,
    slug: 'icab-national-awards',
    title_en: 'ICAB National Corporate Governance & Transparency Awards',
    title_bn: 'আইসিএবি জাতীয় সুশাসন ও ট্রান্সপারেন্সি অ্যাওয়ার্ডস',
    client_name: 'Institute of Chartered Accountants of Bangladesh (ICAB)',
    industry: 'events',
    cover_image: '/images/berlo/portfolio/icab-1.png',
  },
  {
    id: 4,
    slug: 'apex-footwear-sustainability',
    title_en: 'Corporate ESG & Green Manufacturing Global Debut',
    title_bn: 'কর্পোরেট ইএসজি ও গ্রিন ম্যানুফ্যাকচারিং আত্মপ্রকাশ',
    client_name: 'Apex Footwear Limited',
    industry: 'speaker',
    cover_image: '/images/berlo/portfolio/apex-1.png',
  },
  {
    id: 5,
    slug: 'dhaka-trade-fair',
    title_en: 'Dhaka International Trade Fair (DITF) Pavilion PR',
    title_bn: 'ঢাকা আন্তর্জাতিক বাণিজ্য মেলা (DITF) প্যাভিলিয়ন পিআর',
    client_name: 'Export Promotion Bureau (EPB)',
    industry: 'trade',
    cover_image: '/images/berlo/projects/dhaka-trade-fair_cover.jpg',
  },
  {
    id: 6,
    slug: 'production-crisis',
    title_en: 'Multimedia Video Newsroom & 24/7 Crisis Resolution',
    title_bn: 'মাল্টিমিডিয়া ভিডিও নিউজরুম ও জরুরি সংকট ব্যবস্থাপনা',
    client_name: 'National Conglomerate Client',
    industry: 'crisis',
    cover_image: '/images/berlo/projects/production-crisis_cover-1.jpg',
  },
  {
    id: 7,
    slug: 'speaker-program',
    title_en: 'Executive Speaker Program & C-Suite Press Conclave',
    title_bn: 'এক্সিকিউটিভ স্পিকার প্রোগ্রাম ও সি-সুইট প্রেস কনক্লেভ',
    client_name: 'Industry Chamber of Commerce',
    industry: 'speaker',
    cover_image: '/images/berlo/projects/speaker-program_whatsapp-image-2025-07-31-at-195434-56b4a48d.jpg',
  },
  {
    id: 8,
    slug: 'event-management',
    title_en: 'Synova Global Healthcare Strategic Milestone Launch',
    title_bn: 'সিনোভা গ্লোবাল হেলথকেয়ার স্ট্র্যাটেজিক মাইলফলক উন্মোচন',
    client_name: 'Synova Healthcare Limited',
    industry: 'events',
    cover_image: '/images/berlo/projects/event-management_synova.jpg',
  },
];

const defaultTeamCatalog = [
  {
    id: 1,
    slug: 'shakhwat-ullah',
    name_en: 'Shakhwat Ullah',
    name_bn: 'সাখাওয়াত উল্লাহ',
    role_en: 'Chief Executive Officer & Lead Strategist',
    role_bn: 'প্রধান নির্বাহী কর্মকর্তা ও প্রধান কৌশলবিদ',
    division_en: 'planning',
    photo: '/images/berlo/team/shakwat-ullah-01.jpg',
  },
  {
    id: 2,
    slug: 'shatarupa-mitra',
    name_en: 'Shatarupa Mitra',
    name_bn: 'শতরূপা মিত্র',
    role_en: 'Director of Strategy & Operations',
    role_bn: 'পরিচালক, কৌশল ও পরিচালনা',
    division_en: 'planning',
    photo: '/images/berlo/team/shatarupa.jpg',
  },
  {
    id: 3,
    slug: 'arifur-rahman',
    name_en: 'Arifur Rahman',
    name_bn: 'আরিফুর রহমান',
    role_en: 'Head of Media Relations',
    role_bn: 'মিডিয়া রিলেশনস প্রধান',
    division_en: 'media',
    photo: '/images/berlo/team/arifur-rahman.jpg',
  },
  {
    id: 4,
    slug: 'kabery-azad',
    name_en: 'Kabery Azad',
    name_bn: 'কাকেরী আজাদ',
    role_en: 'Consultant of Arts & Visual Design',
    role_bn: 'শিল্প ও ভিজ্যুয়াল ডিজাইন পরামর্শক',
    division_en: 'creative',
    photo: '/images/berlo/team/shakhwat-ullah-1.png',
  },
  {
    id: 5,
    slug: 'rajin-shaleh',
    name_en: 'Rajin Shaleh',
    name_bn: 'রাজিন সালেহ',
    role_en: 'Jr. Executive Officer',
    role_bn: 'জুনিয়র এক্সিকিউটিভ অফিসার',
    division_en: 'media',
    photo: '/images/berlo/team/team-tut.jpg',
  },
  {
    id: 6,
    slug: 'tahsin-al-jawad',
    name_en: 'Tahsin Al Jawad',
    name_bn: 'তাহসিন আল জাওয়াদ',
    role_en: 'Executive Officer',
    role_bn: 'এক্সিকিউটিভ অফিসার',
    division_en: 'planning',
    photo: '/images/berlo/team/jawad.jpg',
  },
  {
    id: 7,
    slug: 'md-kabir-hossain',
    name_en: 'Md. Kabir Hossain',
    name_bn: 'মোঃ কবির হোসেন',
    role_en: 'Senior Manager, Public Relations',
    role_bn: 'সিনিয়র ম্যানেজার, পাবলিক রিলেশনস',
    division_en: 'media',
    photo: '/images/berlo/team/img-20260301-wa0001.jpg',
  },
  {
    id: 8,
    slug: 'akm-zamshed-uddin',
    name_en: 'A K M Zamshed Uddin',
    name_bn: 'এ কে এম জামশেদ উদ্দিন',
    role_en: 'Events & Activation Lead',
    role_bn: 'ইভেন্ট ও অ্যাক্টিভেশন প্রধান',
    division_en: 'events',
    photo: '/images/berlo/team/zamshed.png',
  },
];

export const AdminPagesManagerPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [sections, setSections] = useState<PageSection[]>([]);
  const [activeSectionKey, setActiveSectionKey] = useState<string>('hero');
  const [heroSubTab, setHeroSubTab] = useState<'left_column' | 'slide_1' | 'slide_2' | 'slide_3' | 'hotline'>('slide_1');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Media Library Picker Modal
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaTargetCallback, setMediaTargetCallback] = useState<((url: string) => void) | null>(null);

  // Available Services from Backend (for Homepage Service Selector)
  const [availableServices, setAvailableServices] = useState<any[]>([]);
  // Available Projects from Backend (for Homepage Case Studies Selector)
  const [availableProjects, setAvailableProjects] = useState<any[]>([]);
  // Available Team Members from Backend (for Homepage Team Selector)
  const [availableTeam, setAvailableTeam] = useState<any[]>([]);

  useEffect(() => {
    adminApi
      .getServices()
      .then((res: any) => {
        const data = res?.data || res || [];
        if (Array.isArray(data) && data.length > 0) {
          setAvailableServices(data);
        }
      })
      .catch(() => {});

    adminApi
      .getProjects()
      .then((res: any) => {
        const data = res?.data || res || [];
        if (Array.isArray(data) && data.length > 0) {
          setAvailableProjects(data);
        }
      })
      .catch(() => {});

    adminApi
      .getTeam()
      .then((res: any) => {
        const data = res?.data || res || [];
        if (Array.isArray(data) && data.length > 0) {
          setAvailableTeam(data);
        }
      })
      .catch(() => {});
  }, []);

  const fetchSections = async (slug: string) => {
    setIsLoading(true);
    try {
      const res = await adminApi.getPageSections(slug);
      if (res?.sections && res.sections.length > 0) {
        setSections(res.sections);
        if (!res.sections.some((s) => s.section_key === activeSectionKey)) {
          setActiveSectionKey(res.sections[0].section_key);
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSections(selectedPage);
  }, [selectedPage]);

  const openMediaPicker = async (onSelect: (url: string) => void) => {
    setMediaTargetCallback(() => onSelect);
    setMediaPickerOpen(true);
    setMediaLoading(true);
    try {
      const res = await adminApi.getMediaAssets({ page: 1 });
      if (res?.data?.data) {
        setMediaAssets(res.data.data);
      }
    } catch {
      // Handled
    } finally {
      setMediaLoading(false);
    }
  };

  const currentSection = sections.find((s) => s.section_key === activeSectionKey);

  const updateCurrentSectionField = (field: keyof PageSection, value: any) => {
    if (!currentSection) return;
    setSections((prev) =>
      prev.map((s) => (s.section_key === activeSectionKey ? { ...s, [field]: value } : s))
    );
  };

  const updateCurrentSectionMetadata = (updater: (meta: Record<string, any>) => Record<string, any>) => {
    if (!currentSection) return;
    const currentMeta = currentSection.metadata || {};
    const newMeta = updater({ ...currentMeta });
    updateCurrentSectionField('metadata', newMeta);
  };

  // Hero Slide Helpers
  const getHeroSlides = (): SlideConfig[] => {
    const meta = currentSection?.metadata || {};
    if (meta.slides && Array.isArray(meta.slides) && meta.slides.length > 0) {
      return meta.slides;
    }
    return [
      {
        id: 1,
        image: '/images/berlo/hero-3d-1.png',
        tag_en: 'Reputation Architecture',
        tag_bn: 'কর্পোরেট সুনাম সুরক্ষা',
        text_en: 'Architecting enduring corporate reputation and C-suite authority.',
        text_bn: 'কর্পোরেট সুনাম সুরক্ষা ও সি-সুইট এক্সিকিউটিভ ব্র্যান্ডিং।',
        metric_en: '+320% Positive Sentiment',
        metric_bn: '+৩২০% ইতিবাচক জনমত',
        submetric_en: '100+ Tier-1 Newsdesks Engaged',
        submetric_bn: '১০০+ শীর্ষ নিউজডেস্ক সংযোগ',
        badge_title_en: 'PR Network',
        badge_title_bn: 'পিআর নেটওয়ার্ক',
        badge_status_en: 'Active & Monitored',
        badge_status_bn: 'সক্রিয় ও পর্যবেক্ষণাধীন',
        icon_type: 'network',
        blob_gradient: 'from-[#5B028F] via-[#A302FF] to-[#1A305A]',
      },
      {
        id: 2,
        image: '/images/berlo/hero-3d-2.png',
        tag_en: '24/7 Crisis War-Room',
        tag_bn: '২৪/৭ ক্রাইসিস ওয়ার-রুম',
        text_en: '24/7 Rapid Crisis War-Room: De-escalating reputational risks within 60 minutes.',
        text_bn: '২৪/৭ দ্রুত সংকট ব্যবস্থাপনা: সুনামহানি প্রতিরোধে নির্ভরযোগ্য প্রটোকল।',
        metric_en: '60-Minute Rapid Response',
        metric_bn: '৬০ মিনিট প্রতিক্রিয়া গতি',
        submetric_en: '100% Boardroom NDA Protocol',
        submetric_bn: '১০০% এনডিএ নিশ্চয়তা',
        badge_title_en: 'Crisis Shield',
        badge_title_bn: 'ক্রাইসিস শিল্ড',
        badge_status_en: 'Active & Monitored',
        badge_status_bn: 'সক্রিয় ও পর্যবেক্ষণাধীন',
        icon_type: 'shield',
        blob_gradient: 'from-[#0A4B20] via-[#11813C] to-[#0A2540]',
      },
      {
        id: 3,
        image: '/images/berlo/hero-3d-3.png',
        tag_en: 'Tier-1 Media Access',
        tag_bn: 'জাতীয় গণমাধ্যম সংযোগ',
        text_en: 'Securing prime-time broadcast and national front-page editorial coverage.',
        text_bn: 'জাতীয় শীর্ষ দৈনিক ও টেলিভিশন নেটওয়ার্কে সরাসরি সম্পাদকীয় সংযোগ।',
        metric_en: '98.7% Media Placement Success',
        metric_bn: '৯৮.৭% কভারেজ সাফল্য',
        submetric_en: '250+ Corporate Campaigns',
        submetric_bn: '২৫০+ সফল ক্যাম্পেইন',
        badge_title_en: 'Prime-Time',
        badge_title_bn: 'প্রাইম-টাইম',
        badge_status_en: 'Active & Monitored',
        badge_status_bn: 'সক্রিয় ও পর্যবেক্ষণাধীন',
        icon_type: 'broadcast',
        blob_gradient: 'from-[#0A2540] via-[#1A305A] to-[#A302FF]',
      },
    ];
  };

  const updateHeroSlide = (slideIndex: number, field: keyof SlideConfig, value: any) => {
    const slides = [...getHeroSlides()];
    if (slides[slideIndex]) {
      slides[slideIndex] = { ...slides[slideIndex], [field]: value };
      updateCurrentSectionMetadata((meta) => ({ ...meta, slides }));
    }
  };

  const handleSaveCurrentSection = async () => {
    if (!currentSection) return;
    setIsSaving(true);
    setFeedback(null);

    try {
      await adminApi.updatePageSection(selectedPage, currentSection.section_key, currentSection);
      const isEnabled = currentSection.is_active !== false;
      setFeedback({
        type: 'success',
        message: `Section "${currentSection.section_key}" (${isEnabled ? 'Enabled & Live' : 'Disabled & Hidden'}) saved and published successfully!`,
      });
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to save section.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Section items configuration for Navigator list (14 blocks in homepage order)
  const sectionMetaList: { key: string; name: string; icon: any; desc: string; badge: string }[] = [
    {
      key: 'hero',
      name: '01. Hero Interactive Slider',
      icon: Sparkles,
      desc: '3 Slides, 3D Character Images, Tags, Headlines & Buttons',
      badge: 'Interactive',
    },
    {
      key: 'spotlight',
      name: '02. In the Spotlight',
      icon: Tv,
      desc: 'Tier-1 National Media Outlets Logo Carousel',
      badge: 'Media',
    },
    {
      key: 'video_showcase',
      name: '03. Cinematic Video Showcase',
      icon: Video,
      desc: 'Agency Reel, YouTube Embed, Newsroom Tag & Poster',
      badge: 'Video',
    },
    {
      key: 'services_header',
      name: '04. Our Services Grid',
      icon: Briefcase,
      desc: 'Services Display Count, Header Badge & Narrative',
      badge: 'Services',
    },
    {
      key: 'consultancy_header',
      name: '05. Free Consultation Wizard',
      icon: HelpCircle,
      desc: 'Advisory Team Photo, Form Header & Narrative',
      badge: 'Form',
    },
    {
      key: 'stats',
      name: '06. Measurable Impact & Stats',
      icon: BarChart3,
      desc: '4 Impact Metric Counters (98%, 150+, 14+, 24/7)',
      badge: 'Metrics',
    },
    {
      key: 'why_us',
      name: '07. Why Choose Us (Pillars)',
      icon: Shield,
      desc: '4 Strategic Strength Pillars (Confidentiality, Media, etc.)',
      badge: 'Pillars',
    },
    {
      key: 'clients_showcase',
      name: '08. Innovating Success Together',
      icon: Layers,
      desc: '4 3D Flip Card Slots & Marquee Client Logos',
      badge: 'Clients',
    },
    {
      key: 'testimonials_header',
      name: '09. Clients Says (Video Reviews)',
      icon: MessageSquare,
      desc: '3 Client Video Testimonials & YouTube IDs',
      badge: 'Reviews',
    },
    {
      key: 'case_studies_header',
      name: '10. Recent Projects & Case Studies',
      icon: FileText,
      desc: 'Case Studies Display Count & Portfolio Header',
      badge: 'Portfolio',
    },
    {
      key: 'leadership_header',
      name: '11. Strategic Leadership & Team',
      icon: Users,
      desc: 'Team Members Display Count & Executive Header',
      badge: 'Team',
    },
    {
      key: 'gallery_header',
      name: '12. Memories & Moments Gallery',
      icon: Camera,
      desc: 'Gallery Photos Display Count & Archival Header',
      badge: 'Gallery',
    },
    {
      key: 'insights_header',
      name: '13. Latest Blogs & Insights',
      icon: Globe,
      desc: 'Articles Display Count & Thought Leadership Header',
      badge: 'Blog',
    },
    {
      key: 'cta',
      name: '14. Final Call-to-Action (CTA)',
      icon: Rocket,
      desc: 'High-Stakes Crisis Consultation Schedule Banner',
      badge: 'Conversion',
    },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Elementor Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 rounded-2xl bg-[#0f121d] border border-[#212738] shadow-lg">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#3b82f6] text-white shadow-md shadow-purple-600/30">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Elementor-Style Visual Page Builder
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  PostgreSQL Live
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Full modular control over every slide image, headline, typewriter narrative, metric, and CTA button.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Page Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-[#141826] border border-[#232b3e] text-xs">
            <button
              type="button"
              onClick={() => setSelectedPage('home')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedPage === 'home'
                  ? 'bg-[#7c3aed] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Home Page
            </button>
            <button
              type="button"
              onClick={() => setSelectedPage('about')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedPage === 'about'
                  ? 'bg-[#7c3aed] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              About Agency
            </button>
          </div>

          {/* Live Preview Button */}
          <a
            href={`/${selectedPage === 'home' ? 'en' : 'en/' + selectedPage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-slate-200 border border-white/10 text-xs font-medium transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Preview Public Site</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center justify-between transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="font-medium">{feedback.message}</span>
          </div>
          <button type="button" onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Main Two-Column Elementor Builder Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Section Navigator (WPBakery / Elementor Widget Tree) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-3.5 rounded-2xl bg-[#0f121d] border border-[#212738] space-y-2">
            <div className="flex items-center justify-between px-2 pb-1 border-b border-[#1b2030]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#7c3aed]" /> Page Sections Tree
              </span>
              <span className="text-[11px] font-mono text-purple-400 font-semibold">
                {sections.length} Active Blocks
              </span>
            </div>

            <div className="space-y-1.5">
              {sectionMetaList.map((meta) => {
                const Icon = meta.icon;
                const isActive = activeSectionKey === meta.key;
                const secItem = sections.find((s) => s.section_key === meta.key);
                const isSecEnabled = secItem ? secItem.is_active !== false : true;

                return (
                  <button
                    key={meta.key}
                    type="button"
                    onClick={() => setActiveSectionKey(meta.key)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? 'bg-gradient-to-r from-[#7c3aed]/20 to-[#4f46e5]/10 border-[#7c3aed] text-white shadow-md'
                        : isSecEnabled
                        ? 'bg-[#131724]/70 hover:bg-[#181d2e] border-[#212738] text-slate-300'
                        : 'bg-[#131724]/40 hover:bg-[#181d2e] border-rose-950/40 text-slate-400 opacity-80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-[#7c3aed] text-white'
                            : isSecEnabled
                            ? 'bg-white/[0.04] text-slate-400 group-hover:text-purple-300'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate group-hover:text-white flex items-center gap-1.5">
                          <span>{meta.name}</span>
                          {!isSecEnabled && (
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" title="Hidden on public site" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {meta.desc}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {!isSecEnabled && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Hidden
                        </span>
                      )}
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#7c3aed]/30 text-purple-300 border border-purple-500/30'
                            : 'bg-white/[0.04] text-slate-500'
                        }`}
                      >
                        {meta.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Elementor Block Canvas & Inspector */}
        <div className="lg:col-span-8">
          {isLoading ? (
            <div className="p-16 rounded-2xl bg-[#0f121d] border border-[#212738] text-center text-slate-400 space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#7c3aed]" />
              <div className="text-xs font-semibold">Loading Section Workspace...</div>
            </div>
          ) : !currentSection ? (
            <div className="p-16 rounded-2xl bg-[#0f121d] border border-[#212738] text-center text-slate-400 text-xs">
              Section not found. Please select a section from the navigator.
            </div>
          ) : (
            <div className="rounded-2xl bg-[#0f121d] border border-[#212738] shadow-xl overflow-hidden">
              {/* Block Header Bar */}
              <div className="p-5 border-b border-[#212738] bg-[#121624] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#a855f7]">
                    Section Inspector
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white capitalize mt-0.5">
                    {currentSection.section_key.replace('_', ' ')} Configuration
                  </h2>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Database Key: {currentSection.page_slug}.{currentSection.section_key}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Enable / Disable Button Toggle (User requested red box location) */}
                  <button
                    type="button"
                    onClick={() =>
                      updateCurrentSectionField(
                        'is_active',
                        currentSection.is_active === false ? true : false
                      )
                    }
                    className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none active:scale-95 ${
                      currentSection.is_active !== false
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 shadow-sm shadow-emerald-950/30'
                        : 'bg-rose-500/15 border-rose-500/40 text-rose-300 hover:bg-rose-500/25 shadow-sm shadow-rose-950/30'
                    }`}
                    title={
                      currentSection.is_active !== false
                        ? 'Section is currently ENABLED. Click to disable.'
                        : 'Section is currently DISABLED. Click to enable.'
                    }
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          currentSection.is_active !== false ? 'bg-emerald-400' : 'bg-rose-400'
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                          currentSection.is_active !== false ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                    </span>

                    <span className="tracking-wide flex items-center gap-1.5">
                      {currentSection.is_active !== false ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                      <span>{currentSection.is_active !== false ? 'Section Enabled' : 'Section Disabled'}</span>
                    </span>

                    {/* Visual Toggle Pill Switch */}
                    <div
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors flex items-center ${
                        currentSection.is_active !== false
                          ? 'bg-emerald-600 justify-end'
                          : 'bg-[#28324a] justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveCurrentSection}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#3b82f6] hover:from-[#6d28d9] hover:to-[#2563eb] text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                  >
                    {isSaving ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{isSaving ? 'Updating PostgreSQL...' : 'Publish Section Changes'}</span>
                  </button>
                </div>
              </div>

              {/* ================================================================= */}
              {/* 01. SPECIALIZED HERO BUILDER (With 3 Slides, Images, & Badges)    */}
              {/* ================================================================= */}
              {currentSection.section_key === 'hero' ? (
                <div className="p-6 space-y-6">
                  {/* Hero Sub-Tabs Navigation */}
                  <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#141826] border border-[#232b3e] text-xs overflow-x-auto">
                    {[
                      { key: 'left_column', label: 'Left Column: Headlines & CTA' },
                      { key: 'slide_1', label: 'Slide 1: Reputation 3D' },
                      { key: 'slide_2', label: 'Slide 2: Crisis War-Room' },
                      { key: 'slide_3', label: 'Slide 3: Tier-1 Media' },
                      { key: 'hotline', label: 'Hotlines & Side Info' },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setHeroSubTab(tab.key as any)}
                        className={`px-3.5 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          heroSubTab === tab.key
                            ? 'bg-[#7c3aed] text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* TAB 1: Left Column Headline, Paragraph & Buttons */}
                  {heroSubTab === 'left_column' && (
                    <div className="space-y-5 animate-in fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1.5">
                          <label className="text-slate-300 font-semibold">Hero Main Headline (English)</label>
                          <input
                            type="text"
                            value={currentSection.title_en || ''}
                            onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white focus:outline-none focus:border-[#7c3aed]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-slate-300 font-semibold">Hero Main Headline (Bangla)</label>
                          <input
                            type="text"
                            value={currentSection.title_bn || ''}
                            onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla focus:outline-none focus:border-[#7c3aed]"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-slate-300 font-semibold">Hero Narrative Paragraph (English)</label>
                          <textarea
                            rows={3}
                            value={currentSection.subtitle_en || ''}
                            onChange={(e) => updateCurrentSectionField('subtitle_en', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white focus:outline-none focus:border-[#7c3aed]"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-slate-300 font-semibold">Hero Narrative Paragraph (Bangla)</label>
                          <textarea
                            rows={3}
                            value={currentSection.subtitle_bn || ''}
                            onChange={(e) => updateCurrentSectionField('subtitle_bn', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla focus:outline-none focus:border-[#7c3aed]"
                          />
                        </div>

                        {/* Primary Button */}
                        <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] space-y-3">
                          <span className="text-xs font-bold text-purple-400 block">Primary Action Button</span>
                          <div className="space-y-2">
                            <div>
                              <span className="text-[11px] text-slate-400">Button Label (EN):</span>
                              <input
                                type="text"
                                value={currentSection.cta_text_en || ''}
                                onChange={(e) => updateCurrentSectionField('cta_text_en', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white text-xs mt-1"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] text-slate-400">Button Label (BN):</span>
                              <input
                                type="text"
                                value={currentSection.cta_text_bn || ''}
                                onChange={(e) => updateCurrentSectionField('cta_text_bn', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white font-bangla text-xs mt-1"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] text-slate-400">Target Link:</span>
                              <input
                                type="text"
                                value={currentSection.cta_link || ''}
                                onChange={(e) => updateCurrentSectionField('cta_link', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white font-mono text-xs mt-1"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Secondary Button */}
                        <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] space-y-3">
                          <span className="text-xs font-bold text-emerald-400 block">Secondary Action Button</span>
                          <div className="space-y-2">
                            <div>
                              <span className="text-[11px] text-slate-400">Button Label (EN):</span>
                              <input
                                type="text"
                                value={currentSection.metadata?.secondary_cta_text_en || 'Working scope with you'}
                                onChange={(e) =>
                                  updateCurrentSectionMetadata((m) => ({
                                    ...m,
                                    secondary_cta_text_en: e.target.value,
                                  }))
                                }
                                className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white text-xs mt-1"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] text-slate-400">Button Label (BN):</span>
                              <input
                                type="text"
                                value={currentSection.metadata?.secondary_cta_text_bn || 'আমাদের সেবাসমূহ'}
                                onChange={(e) =>
                                  updateCurrentSectionMetadata((m) => ({
                                    ...m,
                                    secondary_cta_text_bn: e.target.value,
                                  }))
                                }
                                className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white font-bangla text-xs mt-1"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] text-slate-400">Target Link:</span>
                              <input
                                type="text"
                                value={currentSection.metadata?.secondary_cta_link || '#services'}
                                onChange={(e) =>
                                  updateCurrentSectionMetadata((m) => ({
                                    ...m,
                                    secondary_cta_link: e.target.value,
                                  }))
                                }
                                className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white font-mono text-xs mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TABS 2, 3, 4: Hero Slides 1, 2, 3 */}
                  {(heroSubTab === 'slide_1' || heroSubTab === 'slide_2' || heroSubTab === 'slide_3') && (
                    <div className="space-y-6 animate-in fade-in">
                      {(() => {
                        const slideIdx = heroSubTab === 'slide_1' ? 0 : heroSubTab === 'slide_2' ? 1 : 2;
                        const slides = getHeroSlides();
                        const slide = slides[slideIdx];
                        if (!slide) return null;

                        return (
                          <div className="space-y-6">
                            {/* Slide Character Image Box */}
                            <div className="p-4 sm:p-5 rounded-2xl bg-[#141826] border border-[#232b3e] space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white flex items-center gap-2">
                                  <ImageIcon className="w-4 h-4 text-purple-400" />
                                  3D Character Graphic for Slide {slideIdx + 1}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  Resolution recommendation: 800x800 PNG with transparency
                                </span>
                              </div>

                              <div className="flex flex-col sm:flex-row items-center gap-5">
                                {/* Visual Image Preview */}
                                <div className="w-28 h-28 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg relative group">
                                  {slide.image ? (
                                    <img
                                      src={slide.image}
                                      alt={`Hero Slide ${slideIdx + 1}`}
                                      className="w-full h-full object-contain filter drop-shadow-md"
                                      onError={(e) => {
                                        (e.currentTarget as any).src = '/hero_character_crisis.png';
                                      }}
                                    />
                                  ) : (
                                    <ImageIcon className="w-8 h-8 text-slate-500" />
                                  )}
                                </div>

                                <div className="space-y-2 flex-1 w-full text-xs">
                                  <label className="text-slate-300 font-medium">Image File Path or URL:</label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={slide.image || ''}
                                      onChange={(e) => updateHeroSlide(slideIdx, 'image', e.target.value)}
                                      placeholder="/images/berlo/hero-3d-1.png"
                                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white font-mono focus:outline-none focus:border-[#7c3aed]"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        openMediaPicker((selectedUrl) => {
                                          updateHeroSlide(slideIdx, 'image', selectedUrl);
                                        })
                                      }
                                      className="px-3.5 py-2 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold transition-all flex items-center gap-1.5 shrink-0"
                                    >
                                      <FolderOpen className="w-3.5 h-3.5" />
                                      <span>Browse Media</span>
                                    </button>
                                  </div>

                                  {/* Quick Presets */}
                                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                                    <span>Quick Presets:</span>
                                    {['/images/berlo/hero-3d-1.png', '/images/berlo/hero-3d-2.png', '/images/berlo/hero-3d-3.png'].map(
                                      (presetPath, i) => (
                                        <button
                                          key={presetPath}
                                          type="button"
                                          onClick={() => updateHeroSlide(slideIdx, 'image', presetPath)}
                                          className="px-2 py-0.5 rounded-md bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 font-mono transition-colors"
                                        >
                                          Preset {i + 1}
                                        </button>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Slide Content Controls */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              {/* Slide Tagline */}
                              <div className="space-y-1.5">
                                <label className="text-slate-300 font-semibold">Slide Tagline (English)</label>
                                <input
                                  type="text"
                                  value={slide.tag_en || ''}
                                  onChange={(e) => updateHeroSlide(slideIdx, 'tag_en', e.target.value)}
                                  placeholder="e.g. Reputation Architecture"
                                  className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white focus:outline-none focus:border-[#7c3aed]"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-slate-300 font-semibold">Slide Tagline (Bangla)</label>
                                <input
                                  type="text"
                                  value={slide.tag_bn || ''}
                                  onChange={(e) => updateHeroSlide(slideIdx, 'tag_bn', e.target.value)}
                                  placeholder="e.g. কর্পোরেট সুনাম সুরক্ষা"
                                  className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla focus:outline-none focus:border-[#7c3aed]"
                                />
                              </div>

                              {/* Typewriter text */}
                              <div className="space-y-1.5 md:col-span-2">
                                <label className="text-slate-300 font-semibold">
                                  Slide Typewriter Narrative (English)
                                </label>
                                <input
                                  type="text"
                                  value={slide.text_en || ''}
                                  onChange={(e) => updateHeroSlide(slideIdx, 'text_en', e.target.value)}
                                  className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white focus:outline-none focus:border-[#7c3aed]"
                                />
                              </div>

                              <div className="space-y-1.5 md:col-span-2">
                                <label className="text-slate-300 font-semibold">
                                  Slide Typewriter Narrative (Bangla)
                                </label>
                                <input
                                  type="text"
                                  value={slide.text_bn || ''}
                                  onChange={(e) => updateHeroSlide(slideIdx, 'text_bn', e.target.value)}
                                  className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla focus:outline-none focus:border-[#7c3aed]"
                                />
                              </div>

                              {/* Metrics */}
                              <div className="p-3.5 rounded-xl bg-[#141826] border border-[#232b3e] space-y-2">
                                <span className="text-[11px] font-bold text-purple-300 block">Metric Counter Badge</span>
                                <div>
                                  <span className="text-[10px] text-slate-400">English Value:</span>
                                  <input
                                    type="text"
                                    value={slide.metric_en || ''}
                                    onChange={(e) => updateHeroSlide(slideIdx, 'metric_en', e.target.value)}
                                    placeholder="+320% Positive Sentiment"
                                    className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white text-xs mt-1"
                                  />
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400">Bangla Value:</span>
                                  <input
                                    type="text"
                                    value={slide.metric_bn || ''}
                                    onChange={(e) => updateHeroSlide(slideIdx, 'metric_bn', e.target.value)}
                                    placeholder="+৩২০% ইতিবাচক জনমত"
                                    className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white font-bangla text-xs mt-1"
                                  />
                                </div>
                              </div>

                              {/* Submetric */}
                              <div className="p-3.5 rounded-xl bg-[#141826] border border-[#232b3e] space-y-2">
                                <span className="text-[11px] font-bold text-blue-300 block">Submetric / Proof Badge</span>
                                <div>
                                  <span className="text-[10px] text-slate-400">English Description:</span>
                                  <input
                                    type="text"
                                    value={slide.submetric_en || ''}
                                    onChange={(e) => updateHeroSlide(slideIdx, 'submetric_en', e.target.value)}
                                    placeholder="100+ Tier-1 Newsdesks Engaged"
                                    className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white text-xs mt-1"
                                  />
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400">Bangla Description:</span>
                                  <input
                                    type="text"
                                    value={slide.submetric_bn || ''}
                                    onChange={(e) => updateHeroSlide(slideIdx, 'submetric_bn', e.target.value)}
                                    placeholder="১০০+ শীর্ষ নিউজডেস্ক সংযোগ"
                                    className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white font-bangla text-xs mt-1"
                                  />
                                </div>
                              </div>

                              {/* Side Floating 3D Badge */}
                              <div className="p-3.5 rounded-xl bg-[#141826] border border-[#232b3e] space-y-2 md:col-span-2">
                                <span className="text-[11px] font-bold text-emerald-400 block">
                                  Side Floating 3D Badge (Middle-Right of Slide)
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div>
                                    <span className="text-[10px] text-slate-400">Badge Title (EN):</span>
                                    <input
                                      type="text"
                                      value={slide.badge_title_en || ''}
                                      onChange={(e) => updateHeroSlide(slideIdx, 'badge_title_en', e.target.value)}
                                      placeholder="PR Network"
                                      className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white text-xs mt-1"
                                    />
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-slate-400">Badge Title (BN):</span>
                                    <input
                                      type="text"
                                      value={slide.badge_title_bn || ''}
                                      onChange={(e) => updateHeroSlide(slideIdx, 'badge_title_bn', e.target.value)}
                                      placeholder="পিআর নেটওয়ার্ক"
                                      className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white font-bangla text-xs mt-1"
                                    />
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-slate-400">Icon Type:</span>
                                    <select
                                      value={slide.icon_type || 'network'}
                                      onChange={(e) => updateHeroSlide(slideIdx, 'icon_type', e.target.value)}
                                      className="w-full px-3 py-1.5 rounded-lg bg-[#0f121d] border border-[#212738] text-white text-xs mt-1"
                                    >
                                      <option value="network">Network Wired (PR)</option>
                                      <option value="shield">Shield (Crisis)</option>
                                      <option value="broadcast">Tower Broadcast (Media)</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* TAB 5: Hotline & Address Info */}
                  {heroSubTab === 'hotline' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-in fade-in">
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Direct Hotline</label>
                        <input
                          type="text"
                          value={currentSection.metadata?.direct_hotline || '+880 1711 268 479'}
                          onChange={(e) =>
                            updateCurrentSectionMetadata((m) => ({
                              ...m,
                              direct_hotline: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Headquarters Summary</label>
                        <input
                          type="text"
                          value={currentSection.metadata?.address_summary || 'Niketon, Gulshan-1, Dhaka'}
                          onChange={(e) =>
                            updateCurrentSectionMetadata((m) => ({
                              ...m,
                              address_summary: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                        />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-slate-300 font-semibold">Operating Working Hours</label>
                        <input
                          type="text"
                          value={currentSection.metadata?.working_hours || 'Sunday - Thursday: 9:00 AM - 6:30 PM (BST)'}
                          onChange={(e) =>
                            updateCurrentSectionMetadata((m) => ({
                              ...m,
                              working_hours: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : currentSection.section_key === 'spotlight' ? (
                /* ================================================================= */
                /* 02. IN THE SPOTLIGHT (MEDIA OUTLET LOGOS)                         */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        placeholder="In the Spotlight"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        placeholder="মিডিয়ার স্পটলাইট"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>

                  {/* Media Logos Grid & Manager */}
                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Tv className="w-4 h-4 text-purple-400" />
                        National & Global Media Logos (Spotlight Marquee)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const currentList = currentSection.metadata?.media_logos || [
                            { name: 'The Business Standard', logo: '/images/berlo/media/tbs.svg' },
                            { name: 'প্রথম আলো', logo: '/images/berlo/media/prothom-alo.svg' },
                            { name: 'The Daily Star', logo: '/images/berlo/media/the-daily-star.svg' },
                            { name: 'Dhaka Tribune', logo: '/images/berlo/media/dhaka-tribune.svg' },
                          ];
                          updateCurrentSectionMetadata((m) => ({
                            ...m,
                            media_logos: [...currentList, { name: 'New Media Outlet', logo: '/images/berlo/clients/atn.jpg' }],
                          }));
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#7c3aed] text-white text-[11px] font-semibold hover:bg-[#6d28d9]"
                      >
                        <Plus className="w-3 h-3" /> Add Media Logo
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      {(
                        currentSection.metadata?.media_logos || [
                          { name: 'The Business Standard', logo: '/images/berlo/media/tbs.svg' },
                          { name: 'প্রথম আলো', logo: '/images/berlo/media/prothom-alo.svg' },
                          { name: 'The Daily Star', logo: '/images/berlo/media/the-daily-star.svg' },
                          { name: 'Dhaka Tribune', logo: '/images/berlo/media/dhaka-tribune.svg' },
                          { name: 'The Financial Express', logo: '/images/berlo/media/financial-express.png' },
                          { name: 'Reuters', logo: '/images/berlo/media/reuters.svg' },
                        ]
                      ).map((media: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#0f121d] border border-[#212738] space-y-2 relative group">
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...(currentSection.metadata?.media_logos || [])];
                              list.splice(idx, 1);
                              updateCurrentSectionMetadata((m) => ({ ...m, media_logos: list }));
                            }}
                            className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-400"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-full h-12 rounded-lg bg-white p-2 flex items-center justify-center">
                            <img src={media.logo} alt={media.name} className="max-h-8 max-w-[100px] object-contain" />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400">Media Name:</span>
                            <input
                              type="text"
                              value={media.name || ''}
                              onChange={(e) => {
                                const list = [...(currentSection.metadata?.media_logos || [])];
                                list[idx] = { ...list[idx], name: e.target.value };
                                updateCurrentSectionMetadata((m) => ({ ...m, media_logos: list }));
                              }}
                              className="w-full px-2.5 py-1 rounded bg-[#141826] border border-[#232b3e] text-white text-xs mt-1"
                            />
                          </div>
                          <div className="flex gap-1.5 items-center">
                            <input
                              type="text"
                              value={media.logo || ''}
                              onChange={(e) => {
                                const list = [...(currentSection.metadata?.media_logos || [])];
                                list[idx] = { ...list[idx], logo: e.target.value };
                                updateCurrentSectionMetadata((m) => ({ ...m, media_logos: list }));
                              }}
                              className="flex-1 px-2 py-1 rounded bg-[#141826] border border-[#232b3e] text-white text-[11px] font-mono"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                openMediaPicker((url) => {
                                  const list = [...(currentSection.metadata?.media_logos || [])];
                                  list[idx] = { ...list[idx], logo: url };
                                  updateCurrentSectionMetadata((m) => ({ ...m, media_logos: list }));
                                })
                              }
                              className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white"
                              title="Media Library"
                            >
                              <FolderOpen className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : currentSection.section_key === 'video_showcase' ? (
                /* ================================================================= */
                /* 02. VIDEO SHOWCASE BUILDER                                        */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] space-y-3">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Tv className="w-4 h-4 text-purple-400" />
                      Continuous Autoplay Video Stream
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">YouTube Embed URL or Video Link:</label>
                        <input
                          type="text"
                          value={currentSection.video_url || 'https://www.youtube.com/embed/8nees6k5oNk'}
                          onChange={(e) => updateCurrentSectionField('video_url', e.target.value)}
                          placeholder="https://www.youtube.com/embed/..."
                          className="w-full px-3.5 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Poster / Thumbnail Fallback Image:</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={currentSection.image_url || ''}
                            onChange={(e) => updateCurrentSectionField('image_url', e.target.value)}
                            placeholder="/images/berlo/gallery/moment-3.jpg"
                            className="flex-1 px-3.5 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white font-mono"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              openMediaPicker((url) => {
                                updateCurrentSectionField('image_url', url);
                              })
                            }
                            className="px-3 py-2 rounded-xl bg-[#7c3aed] text-white font-semibold flex items-center gap-1 shrink-0"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Live Video Preview Box */}
                    {currentSection.video_url && (
                      <div className="pt-2">
                        <span className="text-[11px] text-slate-400 block mb-1">Live Video Frame:</span>
                        <div className="w-full h-44 rounded-xl overflow-hidden bg-black border border-white/10 shadow-lg">
                          <iframe
                            src={currentSection.video_url}
                            title="Video Preview"
                            className="w-full h-full object-cover"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Newsroom Live Tag (English)</label>
                      <input
                        type="text"
                        value={currentSection.badge_en || 'Berlo Strategic Operations & Agency Reel — Dhaka'}
                        onChange={(e) => updateCurrentSectionField('badge_en', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Newsroom Live Tag (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.badge_bn || 'বার্লো স্ট্র্যাটেজিক নিউজরুম ও এজেন্সী রিল — ঢাকা'}
                        onChange={(e) => updateCurrentSectionField('badge_bn', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>
                </div>
              ) : currentSection.section_key === 'stats' ? (
                /* ================================================================= */
                /* 03. STATS BUILDER                                                 */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>

                  {/* 4 Stats Cards */}
                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] space-y-4">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-purple-400" />
                      4 Impact Metric Counter Cards
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      {(
                        currentSection.metadata?.stats_list || [
                          { value: '98%', label_en: 'Crisis Resolution Rate', label_bn: 'সংকট নিরসন হার' },
                          { value: '150+', label_en: 'Corporate Clients Advised', label_bn: 'পরামর্শপ্রাপ্ত কর্পোরেট প্রতিষ্ঠান' },
                          { value: '14+', label_en: 'Industry Awards', label_bn: 'শিল্প পদক ও সম্মাননা' },
                          { value: '24/7', label_en: 'Emergency Response Protocol', label_bn: 'জরুরি রেসপন্স প্রোটোকল' },
                        ]
                      ).map((stat: any, idx: number) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#0f121d] border border-[#212738] space-y-2">
                          <span className="text-[11px] font-bold text-purple-300 block">Metric #{idx + 1}</span>
                          <div>
                            <span className="text-[10px] text-slate-400">Value (e.g. 98%, 150+):</span>
                            <input
                              type="text"
                              value={stat.value || ''}
                              onChange={(e) => {
                                const list = [...(currentSection.metadata?.stats_list || [])];
                                list[idx] = { ...list[idx], value: e.target.value };
                                updateCurrentSectionMetadata((m) => ({ ...m, stats_list: list }));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-[#141826] border border-[#232b3e] text-white font-mono text-xs mt-1"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400">Label (EN):</span>
                            <input
                              type="text"
                              value={stat.label_en || ''}
                              onChange={(e) => {
                                const list = [...(currentSection.metadata?.stats_list || [])];
                                list[idx] = { ...list[idx], label_en: e.target.value };
                                updateCurrentSectionMetadata((m) => ({ ...m, stats_list: list }));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-[#141826] border border-[#232b3e] text-white text-xs mt-1"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400">Label (BN):</span>
                            <input
                              type="text"
                              value={stat.label_bn || ''}
                              onChange={(e) => {
                                const list = [...(currentSection.metadata?.stats_list || [])];
                                list[idx] = { ...list[idx], label_bn: e.target.value };
                                updateCurrentSectionMetadata((m) => ({ ...m, stats_list: list }));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-[#141826] border border-[#232b3e] text-white font-bangla text-xs mt-1"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : currentSection.section_key === 'why_us' ? (
                /* ================================================================= */
                /* 04. WHY US PILLARS BUILDER                                        */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] space-y-4">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      4 Strategic Strength Pillars
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {(
                        currentSection.metadata?.pillars || [
                          { title_en: 'Strict Confidentiality', title_bn: 'কঠোর গোপনীয়তা', desc_en: 'Ironclad NDA protocols.', desc_bn: 'আইনি এনডিএ প্রোটোকল।' },
                          { title_en: 'Direct Media Access', title_bn: 'সরাসরি মিডিয়া সংযোগ', desc_en: 'Tier-1 editorial access.', desc_bn: 'জাতীয় সম্পাদকদের সাথে সংযোগ।' },
                          { title_en: 'Decisive Speed & Precision', title_bn: 'গতি ও নির্ভুল সিদ্ধান্ত', desc_en: 'Rapid crisis response.', desc_bn: 'দ্রুত ক্রাইসিস রেসপন্স।' },
                          { title_en: 'Multi-Industry Acumen', title_bn: 'বহু-শিল্প অভিজ্ঞতা', desc_en: 'Banking, Telecom, FMCG.', desc_bn: 'ব্যাংকিং, টেলিকম ও বহুজাতিক।' },
                        ]
                      ).map((pillar: any, idx: number) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#0f121d] border border-[#212738] space-y-2">
                          <span className="text-[11px] font-bold text-emerald-300 block">Pillar #{idx + 1}</span>
                          <div>
                            <span className="text-[10px] text-slate-400">Title (EN):</span>
                            <input
                              type="text"
                              value={pillar.title_en || ''}
                              onChange={(e) => {
                                const list = [...(currentSection.metadata?.pillars || [])];
                                list[idx] = { ...list[idx], title_en: e.target.value };
                                updateCurrentSectionMetadata((m) => ({ ...m, pillars: list }));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-[#141826] border border-[#232b3e] text-white text-xs mt-1"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400">Title (BN):</span>
                            <input
                              type="text"
                              value={pillar.title_bn || ''}
                              onChange={(e) => {
                                const list = [...(currentSection.metadata?.pillars || [])];
                                list[idx] = { ...list[idx], title_bn: e.target.value };
                                updateCurrentSectionMetadata((m) => ({ ...m, pillars: list }));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-[#141826] border border-[#232b3e] text-white font-bangla text-xs mt-1"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400">Description (EN):</span>
                            <textarea
                              rows={2}
                              value={pillar.desc_en || ''}
                              onChange={(e) => {
                                const list = [...(currentSection.metadata?.pillars || [])];
                                list[idx] = { ...list[idx], desc_en: e.target.value };
                                updateCurrentSectionMetadata((m) => ({ ...m, pillars: list }));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-[#141826] border border-[#232b3e] text-white text-xs mt-1"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400">Description (BN):</span>
                            <textarea
                              rows={2}
                              value={pillar.desc_bn || ''}
                              onChange={(e) => {
                                const list = [...(currentSection.metadata?.pillars || [])];
                                list[idx] = { ...list[idx], desc_bn: e.target.value };
                                updateCurrentSectionMetadata((m) => ({ ...m, pillars: list }));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-[#141826] border border-[#232b3e] text-white font-bangla text-xs mt-1"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Corporate Office Photo & Location Card Editor */}
                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] space-y-4">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-purple-400" />
                      Corporate Office Card & Address
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Office Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={currentSection.image_url || ''}
                            onChange={(e) => updateCurrentSectionField('image_url', e.target.value)}
                            placeholder="https://... or /images/..."
                            className="w-full px-3.5 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              openMediaPicker((url) => updateCurrentSectionField('image_url', url))
                            }
                            className="px-3 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold whitespace-nowrap cursor-pointer"
                          >
                            Browse
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Office Badge Tag (EN / BN)</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={currentSection.metadata?.office_tag_en || ''}
                            onChange={(e) =>
                              updateCurrentSectionMetadata((m) => ({ ...m, office_tag_en: e.target.value }))
                            }
                            placeholder="Corporate Headquarters"
                            className="w-full px-3 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white"
                          />
                          <input
                            type="text"
                            value={currentSection.metadata?.office_tag_bn || ''}
                            onChange={(e) =>
                              updateCurrentSectionMetadata((m) => ({ ...m, office_tag_bn: e.target.value }))
                            }
                            placeholder="কর্পোরেট হেডকোয়ার্টার্স"
                            className="w-full px-3 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white font-bangla"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Address (English)</label>
                        <input
                          type="text"
                          value={currentSection.metadata?.address_en || ''}
                          onChange={(e) =>
                            updateCurrentSectionMetadata((m) => ({ ...m, address_en: e.target.value }))
                          }
                          placeholder="Apartment B3, House 32/34, Road 07, Niketon, Gulshan-1, Dhaka"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Address (Bangla)</label>
                        <input
                          type="text"
                          value={currentSection.metadata?.address_bn || ''}
                          onChange={(e) =>
                            updateCurrentSectionMetadata((m) => ({ ...m, address_bn: e.target.value }))
                          }
                          placeholder="অ্যাপার্টমেন্ট বি৩, বাড়ি ৩২/৩৪, রোড ০৭, নিকেতন, গুলশান-১, ঢাকা"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white font-bangla"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentSection.section_key === 'services_header' ? (
                /* ================================================================= */
                /* 04. OUR SERVICES GRID & DISPLAY CONTROLS                          */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-white block">Services Display Count on Homepage:</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Control how many active services appear in the 3-column grid.</p>
                    </div>
                    <select
                      value={currentSection.metadata?.display_count || 9}
                      onChange={(e) =>
                        updateCurrentSectionMetadata((m) => ({
                          ...m,
                          display_count: Number(e.target.value),
                        }))
                      }
                      className="px-3.5 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white text-xs font-semibold"
                    >
                      <option value={3}>3 Services (1 Row)</option>
                      <option value={6}>6 Services (2 Rows)</option>
                      <option value={9}>9 Services (Standard 3x3)</option>
                      <option value={12}>12 Services (Full Catalog)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Top Pill Badge (English)</label>
                      <input
                        type="text"
                        value={currentSection.badge_en || ''}
                        onChange={(e) => updateCurrentSectionField('badge_en', e.target.value)}
                        placeholder="PR Services"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Top Pill Badge (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.badge_bn || ''}
                        onChange={(e) => updateCurrentSectionField('badge_bn', e.target.value)}
                        placeholder="জনসংযোগ সেবাসমূহ"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        placeholder="Our Services"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        placeholder="আমাদের সেবাসমূহ"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-slate-300 font-semibold">Section Subtitle / Narrative (English)</label>
                      <textarea
                        rows={2}
                        value={currentSection.subtitle_en || ''}
                        onChange={(e) => updateCurrentSectionField('subtitle_en', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-slate-300 font-semibold">Section Subtitle / Narrative (Bangla)</label>
                      <textarea
                        rows={2}
                        value={currentSection.subtitle_bn || ''}
                        onChange={(e) => updateCurrentSectionField('subtitle_bn', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>

                  {/* ================================================================= */}
                  {/* Select Which Services Show on Homepage (User Requested Option)     */}
                  {/* ================================================================= */}
                  {(() => {
                    const servicesListToUse =
                      availableServices.length > 0 ? availableServices : defaultServiceCatalog;
                    const allSlugs = servicesListToUse.map((s) => s.slug || String(s.id));
                    const selectedSlugs: string[] =
                      currentSection.metadata?.selected_service_slugs || [];
                    const isAllSelected =
                      selectedSlugs.length === 0 || selectedSlugs.length === servicesListToUse.length;

                    const toggleService = (slug: string) => {
                      let next: string[];
                      if (selectedSlugs.length === 0) {
                        // Was defaulting to all: uncheck this one
                        next = allSlugs.filter((s) => s !== slug);
                      } else if (selectedSlugs.includes(slug)) {
                        next = selectedSlugs.filter((s) => s !== slug);
                      } else {
                        next = [...selectedSlugs, slug];
                      }
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_service_slugs: next,
                      }));
                    };

                    const moveService = (slug: string, dir: 'up' | 'down') => {
                      const list =
                        selectedSlugs.length > 0 ? [...selectedSlugs] : [...allSlugs];
                      const idx = list.indexOf(slug);
                      if (idx === -1) return;
                      if (dir === 'up' && idx > 0) {
                        const tmp = list[idx - 1];
                        list[idx - 1] = list[idx];
                        list[idx] = tmp;
                      } else if (dir === 'down' && idx < list.length - 1) {
                        const tmp = list[idx + 1];
                        list[idx + 1] = list[idx];
                        list[idx] = tmp;
                      }
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_service_slugs: list,
                      }));
                    };

                    const selectAll = () => {
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_service_slugs: allSlugs,
                      }));
                    };

                    const resetDefault = () => {
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_service_slugs: [],
                      }));
                    };

                    const activeCount =
                      selectedSlugs.length === 0
                        ? servicesListToUse.length
                        : selectedSlugs.length;

                    return (
                      <div className="p-5 rounded-2xl bg-[#0d101a] border border-[#20273c] space-y-4 shadow-xl">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1b2234]">
                          <div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-[#A302FF]" />
                              <span className="text-sm font-bold text-white tracking-wide">
                                Choose Services to Showcase on Homepage
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                {isAllSelected
                                  ? `All ${servicesListToUse.length} Services Selected`
                                  : `${activeCount} of ${servicesListToUse.length} Selected`}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">
                              হোমপেজের ৩×৩ গ্রিডে কোন কোন সার্ভিস প্রদর্শিত হবে তা এখান থেকে টিক দিয়ে নির্বাচন করুন। যেগুলোতে টিক থাকবে শুধুমাত্র সেগুলোই হোমপেজে শো করবে।
                            </p>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={selectAll}
                              className="px-3 py-1.5 rounded-lg bg-[#1a2032] hover:bg-[#252d47] text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold transition-all cursor-pointer"
                            >
                              Select All
                            </button>
                            <button
                              type="button"
                              onClick={resetDefault}
                              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all cursor-pointer"
                            >
                              Reset
                            </button>
                          </div>
                        </div>

                        {/* Selected Order Sequence Bar */}
                        {selectedSlugs.length > 0 && (
                          <div className="p-3 rounded-xl bg-[#141826] border border-[#232b3e] space-y-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              Homepage Display Sequence (Use arrows to reorder):
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedSlugs.map((slug, idx) => {
                                const svc = servicesListToUse.find(
                                  (s) => s.slug === slug || String(s.id) === slug
                                );
                                return (
                                  <div
                                    key={slug}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1c2235] border border-purple-500/40 text-white text-xs font-semibold shadow-sm"
                                  >
                                    <span className="w-4 h-4 rounded-full bg-[#7c3aed] text-[10px] flex items-center justify-center font-bold">
                                      {idx + 1}
                                    </span>
                                    <span className="truncate max-w-[140px] text-[11px]">
                                      {svc?.title_en || svc?.title?.en || slug}
                                    </span>
                                    <div className="flex items-center gap-0.5 ml-1">
                                      <button
                                        type="button"
                                        disabled={idx === 0}
                                        onClick={() => moveService(slug, 'up')}
                                        className="p-0.5 hover:text-purple-300 disabled:opacity-30 disabled:hover:text-inherit cursor-pointer"
                                        title="Move earlier"
                                      >
                                        <ArrowUp className="w-3 h-3" />
                                      </button>
                                      <button
                                        type="button"
                                        disabled={idx === selectedSlugs.length - 1}
                                        onClick={() => moveService(slug, 'down')}
                                        className="p-0.5 hover:text-purple-300 disabled:opacity-30 disabled:hover:text-inherit cursor-pointer"
                                        title="Move later"
                                      >
                                        <ArrowDown className="w-3 h-3" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => toggleService(slug)}
                                        className="p-0.5 hover:text-rose-400 ml-0.5 cursor-pointer"
                                        title="Remove from homepage"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Interactive Grid of Services */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {servicesListToUse.map((svc) => {
                            const slug = svc.slug || String(svc.id);
                            const isSelected =
                              selectedSlugs.length === 0 || selectedSlugs.includes(slug);
                            const orderNum =
                              selectedSlugs.length > 0 ? selectedSlugs.indexOf(slug) + 1 : null;

                            return (
                              <div
                                key={slug}
                                onClick={() => toggleService(slug)}
                                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 group relative ${
                                  isSelected
                                    ? 'bg-gradient-to-br from-[#1a1e2f] to-[#121624] border-purple-500/60 shadow-lg shadow-purple-950/20'
                                    : 'bg-[#121522]/50 border-[#1f2638] text-slate-500 opacity-60 hover:opacity-100 hover:border-slate-600'
                                }`}
                              >
                                {/* Checkbox Pill */}
                                <div className="mt-0.5 shrink-0">
                                  <div
                                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                                      isSelected
                                        ? 'bg-[#7c3aed] text-white shadow-sm shadow-purple-600/40 ring-1 ring-purple-400/50'
                                        : 'border border-slate-600 bg-black/40 text-transparent'
                                    }`}
                                  >
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                </div>

                                {/* Service Content */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1.5">
                                    <span
                                      className={`text-xs font-bold truncate ${
                                        isSelected ? 'text-white' : 'text-slate-400'
                                      }`}
                                    >
                                      {svc.title_en || svc.title?.en}
                                    </span>
                                    {orderNum !== null && (
                                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 shrink-0 font-mono">
                                        #{orderNum}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-400 font-bangla truncate mt-0.5">
                                    {svc.title_bn || svc.title?.bn}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : currentSection.section_key === 'consultancy_header' ? (
                /* ================================================================= */
                /* 05. CONSULTATION WIZARD & ADVISORY PHOTO                          */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        placeholder="Book a Free Consultancy"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        placeholder="ফ্রি পরামর্শ গ্রহণ"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] space-y-3">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-purple-400" />
                      Advisory Team Photo (Left Column Image)
                    </span>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-32 h-24 rounded-lg bg-black border border-white/10 overflow-hidden shrink-0">
                        <img
                          src={currentSection.image_url || '/images/berlo/team-consultancy.jpg'}
                          alt="Consultancy Team"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 w-full space-y-2 text-xs">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={currentSection.image_url || ''}
                            onChange={(e) => updateCurrentSectionField('image_url', e.target.value)}
                            placeholder="/images/berlo/team-consultancy.jpg"
                            className="flex-1 px-3 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => openMediaPicker((url) => updateCurrentSectionField('image_url', url))}
                            className="px-3.5 py-2 rounded-xl bg-[#7c3aed] text-white font-semibold flex items-center gap-1.5 shrink-0"
                          >
                            <FolderOpen className="w-3.5 h-3.5" /> Select Media
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Displays with an ambient multi-layer glow backplate on the homepage next to the 3-step form.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentSection.section_key === 'clients_showcase' ? (
                /* ================================================================= */
                /* 08. INNOVATING SUCCESS TOGETHER & 3D FLIP CARDS                   */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        placeholder="Innovating Success Together"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        placeholder="একসাথে উদ্ভাবনী সাফল্য"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>

                  {/* 4 3D Flip Slots */}
                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] space-y-4">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-400" />
                      4 Large 3D Flip Card Slots (Top Row)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      {[0, 1, 2, 3].map((slotIdx) => {
                        const slots = currentSection.metadata?.flip_slots || [
                          { front: '/images/berlo/clients/unique.jpg', back: '/images/berlo/clients/radiant.jpg' },
                          { front: '/images/berlo/clients/rahimafrooz.jpg', back: '/images/berlo/clients/ucep.jpg' },
                          { front: '/images/berlo/clients/rupayan.jpg', back: '/images/berlo/clients/netcom.jpg' },
                          { front: '/images/berlo/clients/rajasthan.jpg', back: '/images/berlo/clients/idcol.jpg' },
                        ];
                        const slot = slots[slotIdx] || { front: '', back: '' };
                        return (
                          <div key={slotIdx} className="p-3.5 rounded-xl bg-[#0f121d] border border-[#212738] space-y-3">
                            <span className="text-[11px] font-bold text-purple-300 block">Flip Slot #{slotIdx + 1}</span>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-[10px] text-slate-400">Front Logo:</span>
                                <div className="flex gap-1.5 mt-1">
                                  <input
                                    type="text"
                                    value={slot.front || ''}
                                    onChange={(e) => {
                                      const next = [...slots];
                                      next[slotIdx] = { ...next[slotIdx], front: e.target.value };
                                      updateCurrentSectionMetadata((m) => ({ ...m, flip_slots: next }));
                                    }}
                                    className="flex-1 px-2 py-1 rounded bg-[#141826] border border-[#232b3e] text-white text-[11px] font-mono"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openMediaPicker((url) => {
                                        const next = [...slots];
                                        next[slotIdx] = { ...next[slotIdx], front: url };
                                        updateCurrentSectionMetadata((m) => ({ ...m, flip_slots: next }));
                                      })
                                    }
                                    className="p-1 rounded bg-white/10 text-white"
                                  >
                                    <FolderOpen className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-400">Back Logo:</span>
                                <div className="flex gap-1.5 mt-1">
                                  <input
                                    type="text"
                                    value={slot.back || ''}
                                    onChange={(e) => {
                                      const next = [...slots];
                                      next[slotIdx] = { ...next[slotIdx], back: e.target.value };
                                      updateCurrentSectionMetadata((m) => ({ ...m, flip_slots: next }));
                                    }}
                                    className="flex-1 px-2 py-1 rounded bg-[#141826] border border-[#232b3e] text-white text-[11px] font-mono"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openMediaPicker((url) => {
                                        const next = [...slots];
                                        next[slotIdx] = { ...next[slotIdx], back: url };
                                        updateCurrentSectionMetadata((m) => ({ ...m, flip_slots: next }));
                                      })
                                    }
                                    className="p-1 rounded bg-white/10 text-white"
                                  >
                                    <FolderOpen className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ================================================================= */}
                  {/* Client Logos Marquee Carousel (Bottom Row - User Requested)       */}
                  {/* ================================================================= */}
                  {(() => {
                    const logos: Array<{ name: string; logo: string }> =
                      currentSection.metadata?.marquee_logos || defaultMarqueeLogos;

                    const updateLogos = (newLogos: Array<{ name: string; logo: string }>) => {
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        marquee_logos: newLogos,
                      }));
                    };

                    const addLogo = () => {
                      const next = [...logos, { name: 'New Client Partner', logo: '/images/berlo/clients/unique.jpg' }];
                      updateLogos(next);
                    };

                    const removeLogo = (idx: number) => {
                      const next = logos.filter((_, i) => i !== idx);
                      updateLogos(next);
                    };

                    const updateLogoField = (idx: number, field: 'name' | 'logo', val: string) => {
                      const next = [...logos];
                      next[idx] = { ...next[idx], [field]: val };
                      updateLogos(next);
                    };

                    const moveLogo = (idx: number, dir: 'up' | 'down') => {
                      if (dir === 'up' && idx > 0) {
                        const next = [...logos];
                        const tmp = next[idx - 1];
                        next[idx - 1] = next[idx];
                        next[idx] = tmp;
                        updateLogos(next);
                      } else if (dir === 'down' && idx < logos.length - 1) {
                        const next = [...logos];
                        const tmp = next[idx + 1];
                        next[idx + 1] = next[idx];
                        next[idx] = tmp;
                        updateLogos(next);
                      }
                    };

                    const resetToDefaults = () => {
                      updateLogos(defaultMarqueeLogos);
                    };

                    return (
                      <div className="p-5 rounded-2xl bg-[#0d101a] border border-[#20273c] space-y-4 shadow-xl">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1b2234]">
                          <div>
                            <div className="flex items-center gap-2">
                              <ImageIcon className="w-4 h-4 text-purple-400" />
                              <span className="text-sm font-bold text-white tracking-wide">
                                Client Logos Marquee Carousel (Bottom Row)
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                {logos.length} Logos in Carousel
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">
                              হোমপেজের ৩ডি ফ্লিপ কার্ডের নিচে যে স্ক্রলিং ক্লায়েন্ট লোগো ক্যারোসেল রয়েছে, তার লোগো এবং নাম এখান থেকে অ্যাড, পরিবর্তন বা ডিলিট করুন।
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={addLogo}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-900/30 transition-all cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Client Logo</span>
                            </button>
                            <button
                              type="button"
                              onClick={resetToDefaults}
                              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-xs transition-colors cursor-pointer"
                              title="Reset to 16 default brand logos"
                            >
                              Reset Default 16
                            </button>
                          </div>
                        </div>

                        {/* Live Visual Marquee Preview Strip */}
                        <div className="p-3 rounded-xl bg-[#141826] border border-[#232b3e] space-y-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Carousel Real-Time Preview ({logos.length} active logos):
                          </span>
                          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                            {logos.map((item, idx) => (
                              <div
                                key={idx}
                                className="shrink-0 w-28 h-12 bg-white rounded-lg p-2 border border-slate-200 flex items-center justify-center shadow-sm relative group"
                                title={item.name}
                              >
                                <img
                                  src={item.logo}
                                  alt={item.name}
                                  className="max-h-8 max-w-[80px] object-contain filter contrast-110"
                                  onError={(e: any) => {
                                    e.target.src = '/images/berlo/clients/unique.jpg';
                                  }}
                                />
                                <span className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-[#7c3aed] text-white text-[9px] font-bold flex items-center justify-center shadow">
                                  {idx + 1}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Editable Grid of Client Logos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[500px] overflow-y-auto pr-1">
                          {logos.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-[#141826] border border-[#222a3d] hover:border-purple-500/50 transition-all space-y-2.5 shadow-sm group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1.5">
                                  <span className="w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[9px] font-mono flex items-center justify-center">
                                    {idx + 1}
                                  </span>
                                  <span>Client #{idx + 1}</span>
                                </span>

                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => moveLogo(idx, 'up')}
                                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                                    title="Move earlier"
                                  >
                                    <ArrowUp className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={idx === logos.length - 1}
                                    onClick={() => moveLogo(idx, 'down')}
                                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                                    title="Move later"
                                  >
                                    <ArrowDown className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeLogo(idx)}
                                    className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 hover:text-rose-300 transition-colors ml-1 cursor-pointer"
                                    title="Delete this client logo"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              <div className="flex items-center gap-2.5">
                                {/* Thumbnail Preview */}
                                <div className="w-14 h-12 bg-white rounded-lg p-1.5 border border-slate-300 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                                  <img
                                    src={item.logo}
                                    alt={item.name}
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e: any) => {
                                      e.target.src = '/images/berlo/clients/unique.jpg';
                                    }}
                                  />
                                </div>

                                <div className="flex-1 space-y-1.5 min-w-0">
                                  <input
                                    type="text"
                                    value={item.name || ''}
                                    onChange={(e) => updateLogoField(idx, 'name', e.target.value)}
                                    placeholder="Client Brand Name"
                                    className="w-full px-2 py-1 rounded-lg bg-[#0e121d] border border-[#232b3e] text-white text-xs font-semibold"
                                  />
                                  <div className="flex gap-1">
                                    <input
                                      type="text"
                                      value={item.logo || ''}
                                      onChange={(e) => updateLogoField(idx, 'logo', e.target.value)}
                                      placeholder="Logo image URL"
                                      className="flex-1 px-2 py-1 rounded-lg bg-[#0e121d] border border-[#232b3e] text-white text-[10px] font-mono"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        openMediaPicker((url) => {
                                          updateLogoField(idx, 'logo', url);
                                        })
                                      }
                                      className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                                      title="Select from Media Library"
                                    >
                                      <FolderOpen className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : currentSection.section_key === 'testimonials_header' ? (
                /* ================================================================= */
                /* 09. CLIENTS SAYS & VIDEO TESTIMONIALS                             */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        placeholder="Clients Says"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        placeholder="ক্লায়েন্টদের মন্তব্য ও রিভিউ"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>

                  {/* Client Video Reviews Carousel (User Requested Multiple Support) */}
                  {(() => {
                    const vList: Array<{ id?: any; title: string; subtitle?: string; thumbnail: string; youtubeId: string }> =
                      currentSection.metadata?.video_testimonials || defaultVideoTestimonials;

                    const updateReviews = (newList: Array<{ id?: any; title: string; subtitle?: string; thumbnail: string; youtubeId: string }>) => {
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        video_testimonials: newList,
                      }));
                    };

                    const addVideoReview = () => {
                      const next = [
                        ...vList,
                        {
                          id: Date.now(),
                          title: 'Corporate Leadership & Brand Trust',
                          subtitle: 'Client Review',
                          thumbnail: '/images/berlo/testimonials/stock-testimonial-1.jpg',
                          youtubeId: 'FHnfg223H60',
                        },
                      ];
                      updateReviews(next);
                    };

                    const removeVideoReview = (idx: number) => {
                      const next = vList.filter((_, i) => i !== idx);
                      updateReviews(next);
                    };

                    const updateVideoField = (idx: number, field: string, val: string) => {
                      const next = [...vList];
                      let cleanVal = val;
                      if (field === 'youtubeId') {
                        const match = val.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
                        cleanVal = match ? match[1] : val.trim();
                      }
                      next[idx] = { ...next[idx], [field]: cleanVal };
                      updateReviews(next);
                    };

                    const moveVideoReview = (idx: number, dir: 'up' | 'down') => {
                      if (dir === 'up' && idx > 0) {
                        const next = [...vList];
                        const tmp = next[idx - 1];
                        next[idx - 1] = next[idx];
                        next[idx] = tmp;
                        updateReviews(next);
                      } else if (dir === 'down' && idx < vList.length - 1) {
                        const next = [...vList];
                        const tmp = next[idx + 1];
                        next[idx + 1] = next[idx];
                        next[idx] = tmp;
                        updateReviews(next);
                      }
                    };

                    const resetToDefaults = () => {
                      updateReviews(defaultVideoTestimonials);
                    };

                    return (
                      <div className="p-5 rounded-2xl bg-[#0d101a] border border-[#20273c] space-y-4 shadow-xl">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1b2234]">
                          <div>
                            <div className="flex items-center gap-2">
                              <Film className="w-4 h-4 text-rose-400" />
                              <span className="text-sm font-bold text-white tracking-wide">
                                Client Video Reviews (Carousel Slider)
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                {vList.length} Video Reviews in Carousel
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">
                              হোমপেজের ভিডিও টেস্টিমোনিয়াল ক্যারোসেলে যতখুশি ভিডিও রিভিউ যোগ করুন। কার্ডের YouTube আইডি ও থাম্বনেইল এখান থেকে সহজেই কন্ট্রোল করা যায়।
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={addVideoReview}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-rose-950/40 transition-all cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Video Review</span>
                            </button>
                            <button
                              type="button"
                              onClick={resetToDefaults}
                              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-xs transition-colors cursor-pointer"
                              title="Reset to 3 default video reviews"
                            >
                              Reset Default 3
                            </button>
                          </div>
                        </div>

                        {/* Editable Grid of Video Reviews */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {vList.map((item, vIdx) => (
                            <div
                              key={vIdx}
                              className="p-4 rounded-xl bg-[#141826] border border-[#212738] hover:border-rose-500/50 transition-all space-y-3 shadow-md group relative"
                            >
                              {/* Card Header with Sequence & Reorder */}
                              <div className="flex items-center justify-between pb-2 border-b border-[#1b2234]">
                                <span className="text-[11px] font-bold text-rose-300 flex items-center gap-1.5">
                                  <span className="w-4 h-4 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[9px] font-mono flex items-center justify-center">
                                    {vIdx + 1}
                                  </span>
                                  <span>Video Review #{vIdx + 1}</span>
                                </span>

                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    disabled={vIdx === 0}
                                    onClick={() => moveVideoReview(vIdx, 'up')}
                                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                                    title="Move earlier in carousel"
                                  >
                                    <ArrowUp className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={vIdx === vList.length - 1}
                                    onClick={() => moveVideoReview(vIdx, 'down')}
                                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                                    title="Move later in carousel"
                                  >
                                    <ArrowDown className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeVideoReview(vIdx)}
                                    className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 hover:text-rose-300 transition-colors ml-1 cursor-pointer"
                                    title="Delete video review"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              {/* 16:9 Thumbnail Preview */}
                              <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-[#232b3e]">
                                <img
                                  src={item.thumbnail}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                  onError={(e: any) => {
                                    e.target.src = '/images/berlo/testimonials/stock-testimonial-1.jpg';
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                  <div className="w-8 h-6 rounded-md bg-[#F61C0D] flex items-center justify-center shadow">
                                    <svg className="w-3 h-3 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                  </div>
                                </div>
                                <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-slate-300">
                                  {item.youtubeId || 'No ID'}
                                </span>
                              </div>

                              {/* Form Fields */}
                              <div className="space-y-2 text-xs">
                                <div>
                                  <span className="text-[10px] text-slate-400 font-semibold">Card Title / Client Name:</span>
                                  <input
                                    type="text"
                                    value={item.title || ''}
                                    onChange={(e) => updateVideoField(vIdx, 'title', e.target.value)}
                                    placeholder="e.g. Enterprise Reputation & Brand Scaling"
                                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e121d] border border-[#232b3e] text-white text-xs mt-0.5"
                                  />
                                </div>

                                <div>
                                  <span className="text-[10px] text-slate-400 font-semibold">Category / Subtitle:</span>
                                  <input
                                    type="text"
                                    value={item.subtitle || ''}
                                    onChange={(e) => updateVideoField(vIdx, 'subtitle', e.target.value)}
                                    placeholder="e.g. Strategic PR / Crisis Management"
                                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e121d] border border-[#232b3e] text-white text-xs mt-0.5"
                                  />
                                </div>

                                <div>
                                  <span className="text-[10px] text-slate-400 font-semibold">YouTube Video ID (or URL):</span>
                                  <input
                                    type="text"
                                    value={item.youtubeId || (item as any).youtube_id || ''}
                                    onChange={(e) => updateVideoField(vIdx, 'youtubeId', e.target.value)}
                                    placeholder="FHnfg223H60 or https://youtu.be/..."
                                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e121d] border border-[#232b3e] text-white font-mono text-xs mt-0.5"
                                  />
                                </div>

                                <div>
                                  <span className="text-[10px] text-slate-400 font-semibold">Thumbnail Image URL:</span>
                                  <div className="flex gap-1.5 mt-0.5">
                                    <input
                                      type="text"
                                      value={item.thumbnail || ''}
                                      onChange={(e) => updateVideoField(vIdx, 'thumbnail', e.target.value)}
                                      placeholder="/images/berlo/testimonials/..."
                                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#0e121d] border border-[#232b3e] text-white text-[11px] font-mono"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        openMediaPicker((url) => {
                                          updateVideoField(vIdx, 'thumbnail', url);
                                        })
                                      }
                                      className="px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                                      title="Select from Media Library"
                                    >
                                      <FolderOpen className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : currentSection.section_key === 'case_studies_header' ? (
                /* ================================================================= */
                /* 10. RECENT PROJECTS & CASE STUDIES CONTROLS                       */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-white block">Case Studies Display Count:</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Control how many featured projects show on the homepage.</p>
                    </div>
                    <select
                      value={currentSection.metadata?.display_count || 4}
                      onChange={(e) =>
                        updateCurrentSectionMetadata((m) => ({
                          ...m,
                          display_count: Number(e.target.value),
                        }))
                      }
                      className="px-3.5 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white text-xs font-semibold"
                    >
                      <option value={3}>3 Case Studies</option>
                      <option value={4}>4 Case Studies (1 Large Hero + 3 Cards)</option>
                      <option value={6}>6 Case Studies</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        placeholder="Recent Projects"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        placeholder="সাম্প্রতিক প্রকল্পসমূহ"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>

                  {/* ================================================================= */}
                  {/* Select Which Case Studies / Projects Show on Homepage             */}
                  {/* ================================================================= */}
                  {(() => {
                    const projectsListToUse =
                      availableProjects.length > 0 ? availableProjects : defaultProjectsCatalog;
                    const allSlugs = projectsListToUse.map((p) => p.slug || String(p.id));
                    const selectedSlugs: string[] =
                      currentSection.metadata?.selected_project_slugs || [];
                    const isAllSelected =
                      selectedSlugs.length === 0 || selectedSlugs.length === projectsListToUse.length;

                    const toggleProject = (slug: string) => {
                      let next: string[];
                      if (selectedSlugs.length === 0) {
                        next = allSlugs.filter((s) => s !== slug);
                      } else if (selectedSlugs.includes(slug)) {
                        next = selectedSlugs.filter((s) => s !== slug);
                      } else {
                        next = [...selectedSlugs, slug];
                      }
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_project_slugs: next,
                      }));
                    };

                    const moveProject = (slug: string, dir: 'up' | 'down') => {
                      const list =
                        selectedSlugs.length > 0 ? [...selectedSlugs] : [...allSlugs];
                      const idx = list.indexOf(slug);
                      if (idx === -1) return;
                      if (dir === 'up' && idx > 0) {
                        const tmp = list[idx - 1];
                        list[idx - 1] = list[idx];
                        list[idx] = tmp;
                      } else if (dir === 'down' && idx < list.length - 1) {
                        const tmp = list[idx + 1];
                        list[idx + 1] = list[idx];
                        list[idx] = tmp;
                      }
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_project_slugs: list,
                      }));
                    };

                    const selectAll = () => {
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_project_slugs: allSlugs,
                      }));
                    };

                    const resetDefault = () => {
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_project_slugs: [],
                      }));
                    };

                    const activeCount =
                      selectedSlugs.length === 0
                        ? projectsListToUse.length
                        : selectedSlugs.length;

                    return (
                      <div className="p-5 rounded-2xl bg-[#0d101a] border border-[#20273c] space-y-4 shadow-xl">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1b2234]">
                          <div>
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#A302FF]" />
                              <span className="text-sm font-bold text-white tracking-wide">
                                Choose Case Studies to Showcase on Homepage
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                {isAllSelected
                                  ? `All ${projectsListToUse.length} Projects Selected`
                                  : `${activeCount} of ${projectsListToUse.length} Selected`}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">
                              হোমপেজের সাম্প্রতিক প্রকল্প ও কেস স্টাডি সেকশনে কোন কোন কাজ প্রদর্শিত হবে তা নির্বাচন করুন। প্রথম ক্রমান্বয়ের (#১) প্রজেক্টটি হোমপেজে মূল লার্জ হিরো ফিচার্ড কার্ড হিসেবে শো করবে।
                            </p>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={selectAll}
                              className="px-3 py-1.5 rounded-lg bg-[#1a2032] hover:bg-[#252d47] text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold transition-all cursor-pointer"
                            >
                              Select All
                            </button>
                            <button
                              type="button"
                              onClick={resetDefault}
                              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all cursor-pointer"
                            >
                              Reset
                            </button>
                          </div>
                        </div>

                        {/* Selected Order Sequence Bar */}
                        {selectedSlugs.length > 0 && (
                          <div className="p-3 rounded-xl bg-[#141826] border border-[#232b3e] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                Homepage Display Sequence (#1 is Featured Hero):
                              </span>
                              <span className="text-[10px] text-purple-300 font-medium">
                                Use arrows to reorder
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              {selectedSlugs.map((slug, idx) => {
                                const prj =
                                  projectsListToUse.find((p) => (p.slug || String(p.id)) === slug) || {
                                    title_en: slug,
                                  };
                                const isHero = idx === 0;
                                return (
                                  <div
                                    key={slug}
                                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs ${
                                      isHero
                                        ? 'bg-purple-900/30 border-purple-500/50 text-purple-200 ring-1 ring-purple-500/40'
                                        : 'bg-[#0f121d] border-[#252d43] text-slate-300'
                                    }`}
                                  >
                                    <span
                                      className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                                        isHero
                                          ? 'bg-[#A302FF] text-white'
                                          : 'bg-[#1e2538] text-purple-300'
                                      }`}
                                    >
                                      {isHero ? '#1 HERO' : `#${idx + 1}`}
                                    </span>
                                    <span className="font-semibold truncate max-w-[140px]">
                                      {prj.title_en || prj.title || slug}
                                    </span>
                                    <div className="flex items-center ml-1">
                                      <button
                                        type="button"
                                        disabled={idx === 0}
                                        onClick={() => moveProject(slug, 'up')}
                                        className="p-1 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                        title="Move earlier"
                                      >
                                        <ArrowUp className="w-3 h-3" />
                                      </button>
                                      <button
                                        type="button"
                                        disabled={idx === selectedSlugs.length - 1}
                                        onClick={() => moveProject(slug, 'down')}
                                        className="p-1 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                        title="Move later"
                                      >
                                        <ArrowDown className="w-3 h-3" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => toggleProject(slug)}
                                        className="p-1 hover:text-rose-400 ml-0.5 cursor-pointer"
                                        title="Remove from homepage"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Projects Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                          {projectsListToUse.map((project, pIdx) => {
                            const slug = project.slug || String(project.id);
                            const isSelected =
                              selectedSlugs.length === 0
                                ? true
                                : selectedSlugs.includes(slug);
                            const orderIndex = selectedSlugs.indexOf(slug);
                            const isHero = orderIndex === 0;

                            return (
                              <div
                                key={slug || pIdx}
                                onClick={() => toggleProject(slug)}
                                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 select-none ${
                                  isSelected
                                    ? isHero
                                      ? 'bg-purple-950/20 border-purple-500/60 ring-1 ring-purple-500/40 shadow-lg shadow-purple-950/40'
                                      : 'bg-[#141827] border-purple-500/40'
                                    : 'bg-[#0f121d]/60 border-[#1d2335] opacity-50 hover:opacity-75'
                                }`}
                              >
                                {/* Checkbox */}
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                                    isSelected
                                      ? 'bg-[#A302FF] text-white'
                                      : 'border border-slate-600 bg-black/40'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>

                                {/* Thumbnail Preview */}
                                <div className="w-14 h-11 rounded-lg overflow-hidden bg-black/50 shrink-0 border border-white/5 relative">
                                  <img
                                    src={
                                      project.cover_image ||
                                      project.image ||
                                      project.image_url ||
                                      '/images/berlo/portfolio/epb-1.png'
                                    }
                                    alt={project.title_en || project.title || 'Project'}
                                    className="w-full h-full object-cover"
                                    onError={(e: any) => {
                                      e.target.src = '/images/berlo/portfolio/epb-1.png';
                                    }}
                                  />
                                </div>

                                {/* Details */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    {project.client_name && (
                                      <span className="text-[10px] font-bold text-slate-400 truncate max-w-[180px]">
                                        {project.client_name}
                                      </span>
                                    )}
                                    {isSelected && (
                                      <span
                                        className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ml-auto ${
                                          isHero
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-purple-500/20 text-purple-300'
                                        }`}
                                      >
                                        {isHero
                                          ? '★ #1 HERO'
                                          : orderIndex !== -1
                                          ? `#${orderIndex + 1}`
                                          : 'ACTIVE'}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs font-bold text-white truncate mt-0.5">
                                    {project.title_en || project.title}
                                  </div>
                                  <div className="text-[11px] text-slate-400 font-bangla truncate">
                                    {project.title_bn || ''}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : currentSection.section_key === 'leadership_header' ? (
                /* ================================================================= */
                /* 11. STRATEGIC LEADERSHIP & TEAM CONTROLS                          */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-white block">Team Members Display Count:</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Control how many strategic leaders appear on the homepage.</p>
                    </div>
                    <select
                      value={currentSection.metadata?.display_count || 6}
                      onChange={(e) =>
                        updateCurrentSectionMetadata((m) => ({
                          ...m,
                          display_count: Number(e.target.value),
                        }))
                      }
                      className="px-3.5 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white text-xs font-semibold"
                    >
                      <option value={3}>3 Members (1 Row)</option>
                      <option value={6}>6 Members (2 Rows x 3)</option>
                      <option value={9}>9 Members</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        placeholder="Our Strategic Leadership & Team"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        placeholder="আমাদের কৌশলগত নেতৃত্ব ও টিম"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>

                  {/* ================================================================= */}
                  {/* Select Which Team Members Show on Homepage & Control Ordering     */}
                  {/* ================================================================= */}
                  {(() => {
                    const teamListToUse =
                      availableTeam.length > 0 ? availableTeam : defaultTeamCatalog;
                    const allSlugs = teamListToUse.map((m) => m.slug || String(m.id));
                    const selectedSlugs: string[] =
                      currentSection.metadata?.selected_team_slugs || [];
                    const isAllSelected =
                      selectedSlugs.length === 0 || selectedSlugs.length === teamListToUse.length;

                    const toggleTeamMember = (slug: string) => {
                      let next: string[];
                      if (selectedSlugs.length === 0) {
                        next = allSlugs.filter((s) => s !== slug);
                      } else if (selectedSlugs.includes(slug)) {
                        next = selectedSlugs.filter((s) => s !== slug);
                      } else {
                        next = [...selectedSlugs, slug];
                      }
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_team_slugs: next,
                      }));
                    };

                    const moveTeamMember = (slug: string, dir: 'up' | 'down') => {
                      const list =
                        selectedSlugs.length > 0 ? [...selectedSlugs] : [...allSlugs];
                      const idx = list.indexOf(slug);
                      if (idx === -1) return;
                      if (dir === 'up' && idx > 0) {
                        const tmp = list[idx - 1];
                        list[idx - 1] = list[idx];
                        list[idx] = tmp;
                      } else if (dir === 'down' && idx < list.length - 1) {
                        const tmp = list[idx + 1];
                        list[idx + 1] = list[idx];
                        list[idx] = tmp;
                      }
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_team_slugs: list,
                      }));
                    };

                    const selectAll = () => {
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_team_slugs: allSlugs,
                      }));
                    };

                    const resetDefault = () => {
                      updateCurrentSectionMetadata((m) => ({
                        ...m,
                        selected_team_slugs: [],
                      }));
                    };

                    const activeCount =
                      selectedSlugs.length === 0
                        ? teamListToUse.length
                        : selectedSlugs.length;

                    return (
                      <div className="p-5 rounded-2xl bg-[#0d101a] border border-[#20273c] space-y-4 shadow-xl">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1b2234]">
                          <div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-[#A302FF]" />
                              <span className="text-sm font-bold text-white tracking-wide">
                                Choose Team Members to Showcase on Homepage
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                {isAllSelected
                                  ? `All ${teamListToUse.length} Members Selected`
                                  : `${activeCount} of ${teamListToUse.length} Selected`}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">
                              হোমপেজের টিম সেকশনে কোন কোন সদস্যকে দেখাবেন এবং কার পজিশন আগে বা পরে হবে তা এখান থেকে সম্পূর্ণ নিয়ন্ত্রণ করুন।
                            </p>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={selectAll}
                              className="px-3 py-1.5 rounded-lg bg-[#1a2032] hover:bg-[#252d47] text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold transition-all cursor-pointer"
                            >
                              Select All
                            </button>
                            <button
                              type="button"
                              onClick={resetDefault}
                              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all cursor-pointer"
                            >
                              Reset
                            </button>
                          </div>
                        </div>

                        {/* Selected Order Sequence Bar */}
                        {selectedSlugs.length > 0 && (
                          <div className="p-3 rounded-xl bg-[#141826] border border-[#232b3e] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                Homepage Display Sequence (Whose position comes first):
                              </span>
                              <span className="text-[10px] text-purple-300 font-medium">
                                Use arrows to reorder
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              {selectedSlugs.map((slug, idx) => {
                                const member =
                                  teamListToUse.find((m) => (m.slug || String(m.id)) === slug) || {
                                    name_en: slug,
                                  };
                                return (
                                  <div
                                    key={slug}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs bg-[#0f121d] border-[#252d43] text-slate-300"
                                  >
                                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#1e2538] text-purple-300">
                                      #{idx + 1}
                                    </span>
                                    <span className="font-semibold truncate max-w-[140px]">
                                      {member.name_en || member.name || slug}
                                    </span>
                                    <div className="flex items-center ml-1">
                                      <button
                                        type="button"
                                        disabled={idx === 0}
                                        onClick={() => moveTeamMember(slug, 'up')}
                                        className="p-1 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                        title="Move earlier"
                                      >
                                        <ArrowUp className="w-3 h-3" />
                                      </button>
                                      <button
                                        type="button"
                                        disabled={idx === selectedSlugs.length - 1}
                                        onClick={() => moveTeamMember(slug, 'down')}
                                        className="p-1 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                        title="Move later"
                                      >
                                        <ArrowDown className="w-3 h-3" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => toggleTeamMember(slug)}
                                        className="p-1 hover:text-rose-400 ml-0.5 cursor-pointer"
                                        title="Remove from homepage"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Team Members Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                          {teamListToUse.map((member, mIdx) => {
                            const slug = member.slug || String(member.id);
                            const isSelected =
                              selectedSlugs.length === 0
                                ? true
                                : selectedSlugs.includes(slug);
                            const orderIndex = selectedSlugs.indexOf(slug);

                            return (
                              <div
                                key={slug || mIdx}
                                onClick={() => toggleTeamMember(slug)}
                                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 select-none ${
                                  isSelected
                                    ? 'bg-[#141827] border-purple-500/50 shadow-md shadow-purple-950/20'
                                    : 'bg-[#0f121d]/60 border-[#1d2335] opacity-50 hover:opacity-75'
                                }`}
                              >
                                {/* Checkbox */}
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                                    isSelected
                                      ? 'bg-[#A302FF] text-white'
                                      : 'border border-slate-600 bg-black/40'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>

                                {/* Avatar Thumbnail Preview */}
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-black/50 shrink-0 border border-white/10 relative">
                                  <img
                                    src={
                                      member.photo ||
                                      member.image ||
                                      '/images/berlo/team/shakwat-ullah-01.jpg'
                                    }
                                    alt={member.name_en || member.name || 'Team'}
                                    className="w-full h-full object-cover"
                                    onError={(e: any) => {
                                      e.target.src = '/images/berlo/team/shakwat-ullah-01.jpg';
                                    }}
                                  />
                                </div>

                                {/* Details */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-xs font-bold text-white truncate">
                                      {member.name_en || member.name}
                                    </span>
                                    {isSelected && (
                                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded ml-auto bg-purple-500/20 text-purple-300">
                                        {orderIndex !== -1 ? `#${orderIndex + 1}` : 'ACTIVE'}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-purple-300 truncate">
                                    {member.role_en || member.role}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-bangla truncate">
                                    {member.name_bn || ''} {member.role_bn ? `• ${member.role_bn}` : ''}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : currentSection.section_key === 'gallery_header' ? (
                /* ================================================================= */
                /* 12. MEMORIES & MOMENTS GALLERY CONTROLS                           */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-white block">Gallery Photos Display Count:</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Control how many moment photos appear in the high-density mosaic.</p>
                    </div>
                    <select
                      value={currentSection.metadata?.display_count || 12}
                      onChange={(e) =>
                        updateCurrentSectionMetadata((m) => ({
                          ...m,
                          display_count: Number(e.target.value),
                        }))
                      }
                      className="px-3.5 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white text-xs font-semibold"
                    >
                      <option value={6}>6 Photos</option>
                      <option value={12}>12 Photos (Full 6-Col Mosaic)</option>
                      <option value={18}>18 Photos</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        placeholder="Memories & Moments"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        placeholder="স্মৃতি ও মুহূর্তসমূহ"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>
                </div>
              ) : currentSection.section_key === 'insights_header' ? (
                /* ================================================================= */
                /* 13. LATEST BLOGS & INSIGHTS CONTROLS                              */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="p-4 rounded-xl bg-[#141826] border border-[#232b3e] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-white block">Articles Display Count:</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Control how many blog cards appear on the homepage.</p>
                    </div>
                    <select
                      value={currentSection.metadata?.display_count || 3}
                      onChange={(e) =>
                        updateCurrentSectionMetadata((m) => ({
                          ...m,
                          display_count: Number(e.target.value),
                        }))
                      }
                      className="px-3.5 py-2 rounded-xl bg-[#0f121d] border border-[#212738] text-white text-xs font-semibold"
                    >
                      <option value={3}>3 Articles (1 Row)</option>
                      <option value={6}>6 Articles (2 Rows)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        placeholder="Latest Blogs"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        placeholder="সাম্প্রতিক ব্লগ ও ইনসাইটস"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>
                </div>
              ) : currentSection.section_key === 'cta' ? (
                /* ================================================================= */
                /* 05. CALL TO ACTION BUILDER                                        */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Banner Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Banner Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-slate-300 font-semibold">Banner Subtitle (English)</label>
                      <textarea
                        rows={2}
                        value={currentSection.subtitle_en || ''}
                        onChange={(e) => updateCurrentSectionField('subtitle_en', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-slate-300 font-semibold">Banner Subtitle (Bangla)</label>
                      <textarea
                        rows={2}
                        value={currentSection.subtitle_bn || ''}
                        onChange={(e) => updateCurrentSectionField('subtitle_bn', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Button Label (EN)</label>
                      <input
                        type="text"
                        value={currentSection.cta_text_en || ''}
                        onChange={(e) => updateCurrentSectionField('cta_text_en', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Button Label (BN)</label>
                      <input
                        type="text"
                        value={currentSection.cta_text_bn || ''}
                        onChange={(e) => updateCurrentSectionField('cta_text_bn', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-slate-300 font-semibold">Button Target Link</label>
                      <input
                        type="text"
                        value={currentSection.cta_link || ''}
                        onChange={(e) => updateCurrentSectionField('cta_link', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* ================================================================= */
                /* 06. GENERIC SECTION HEADER BUILDER (Services, Consultancy, etc.)  */
                /* ================================================================= */
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Top Pill Badge (English)</label>
                      <input
                        type="text"
                        value={currentSection.badge_en || ''}
                        onChange={(e) => updateCurrentSectionField('badge_en', e.target.value)}
                        placeholder="e.g. Specialized Practices"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Top Pill Badge (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.badge_bn || ''}
                        onChange={(e) => updateCurrentSectionField('badge_bn', e.target.value)}
                        placeholder="e.g. বিশেষায়িত সেবাসমূহ"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (English)</label>
                      <input
                        type="text"
                        value={currentSection.title_en || ''}
                        onChange={(e) => updateCurrentSectionField('title_en', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Section Headline (Bangla)</label>
                      <input
                        type="text"
                        value={currentSection.title_bn || ''}
                        onChange={(e) => updateCurrentSectionField('title_bn', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-slate-300 font-semibold">Section Subtitle / Narrative (English)</label>
                      <textarea
                        rows={3}
                        value={currentSection.subtitle_en || ''}
                        onChange={(e) => updateCurrentSectionField('subtitle_en', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-slate-300 font-semibold">Section Subtitle / Narrative (Bangla)</label>
                      <textarea
                        rows={3}
                        value={currentSection.subtitle_bn || ''}
                        onChange={(e) => updateCurrentSectionField('subtitle_bn', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#141826] border border-[#232b3e] text-white font-bangla"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sticky Footer Action Bar */}
              <div className="p-4 border-t border-[#212738] bg-[#121624] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      updateCurrentSectionField(
                        'is_active',
                        currentSection.is_active === false ? true : false
                      )
                    }
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                      currentSection.is_active !== false
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25'
                        : 'bg-rose-500/15 border-rose-500/30 text-rose-300 hover:bg-rose-500/25'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        currentSection.is_active !== false ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                    <span>{currentSection.is_active !== false ? 'Active on Homepage' : 'Hidden from Homepage'}</span>
                  </button>
                  <span className="text-xs text-slate-400">
                    Changes will be published live to public website immediately after saving.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSaveCurrentSection}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] hover:from-[#6d28d9] hover:to-[#2563eb] text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{isSaving ? 'Saving...' : 'Save & Publish'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MEDIA LIBRARY PICKER MODAL                                                */}
      {/* ========================================================================= */}
      {mediaPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-3xl rounded-2xl bg-[#0f121d] border border-[#212738] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-[#212738] flex items-center justify-between bg-[#141826]">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Select Graphic from Media Library</h3>
              </div>
              <button
                type="button"
                onClick={() => setMediaPickerOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {mediaLoading ? (
                <div className="py-12 text-center text-slate-400 text-xs">Loading media assets...</div>
              ) : mediaAssets.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No uploaded assets found. You can upload media in the Media Library tab.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {mediaAssets.map((asset) => (
                    <div
                      key={asset.id}
                      onClick={() => {
                        if (mediaTargetCallback) {
                          mediaTargetCallback(asset.url);
                        }
                        setMediaPickerOpen(false);
                      }}
                      className="group relative rounded-xl border border-[#212738] bg-[#141826] p-2 hover:border-[#7c3aed] cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <div className="w-full h-24 rounded-lg bg-black/40 flex items-center justify-center overflow-hidden mb-2">
                        <img
                          src={asset.url}
                          alt={asset.name}
                          className="w-full h-full object-contain filter group-hover:brightness-110"
                        />
                      </div>
                      <div className="text-[11px] font-semibold text-white truncate">{asset.name}</div>
                      <div className="text-[9px] text-slate-400 truncate">{asset.folder || 'general'}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-[#212738] bg-[#141826] flex justify-end">
              <button
                type="button"
                onClick={() => setMediaPickerOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

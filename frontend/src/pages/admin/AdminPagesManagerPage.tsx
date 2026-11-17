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
      setFeedback({
        type: 'success',
        message: `Section "${currentSection.section_key}" updated and published successfully to database!`,
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

  // Section items configuration for Navigator list
  const sectionMetaList: { key: string; name: string; icon: any; desc: string; badge: string }[] = [
    {
      key: 'hero',
      name: '01. Hero Interactive Slider',
      icon: Sparkles,
      desc: '3 Slides, 3D Character Images, Tags, Headlines & Buttons',
      badge: 'Interactive',
    },
    {
      key: 'video_showcase',
      name: '02. Cinematic Video Showcase',
      icon: Video,
      desc: 'Agency Reel, YouTube Embed, Newsroom Tag & Poster',
      badge: 'Media',
    },
    {
      key: 'services_header',
      name: '03. Services Showcase Header',
      icon: Briefcase,
      desc: 'Pill Badge, Main Headline & Narrative Subtitle',
      badge: 'Content',
    },
    {
      key: 'consultancy_header',
      name: '04. Consultation Wizard Header',
      icon: HelpCircle,
      desc: 'Interactive Consultation Form Header & Subtitle',
      badge: 'Form',
    },
    {
      key: 'stats',
      name: '05. Measurable Impact & Stats',
      icon: BarChart3,
      desc: '4 Impact Metric Counters (98%, 150+, 14+, 24/7)',
      badge: 'Numbers',
    },
    {
      key: 'why_us',
      name: '06. Why Choose Us (Pillars)',
      icon: Shield,
      desc: '4 Strategic Strength Pillars (Confidentiality, Media, etc.)',
      badge: 'Cards',
    },
    {
      key: 'case_studies_header',
      name: '07. Case Studies Header',
      icon: FileText,
      desc: 'Featured Projects & De-escalation Milestones Header',
      badge: 'Header',
    },
    {
      key: 'gallery_header',
      name: '08. Memories & Moments Gallery',
      icon: Camera,
      desc: 'Press Delegations & National Media Archive Header',
      badge: 'Header',
    },
    {
      key: 'leadership_header',
      name: '09. Executive Leadership Header',
      icon: Users,
      desc: 'Senior Partners & Strategic Advisors Header',
      badge: 'Header',
    },
    {
      key: 'insights_header',
      name: '10. Strategic Insights Header',
      icon: MessageSquare,
      desc: 'Articles, Editorials & Industry Analysis Header',
      badge: 'Header',
    },
    {
      key: 'cta',
      name: '11. Call-to-Action (CTA) Banner',
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
                return (
                  <button
                    key={meta.key}
                    type="button"
                    onClick={() => setActiveSectionKey(meta.key)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? 'bg-gradient-to-r from-[#7c3aed]/20 to-[#4f46e5]/10 border-[#7c3aed] text-white shadow-md'
                        : 'bg-[#131724]/70 hover:bg-[#181d2e] border-[#212738] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-[#7c3aed] text-white'
                            : 'bg-white/[0.04] text-slate-400 group-hover:text-purple-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate group-hover:text-white">
                          {meta.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {meta.desc}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                        isActive
                          ? 'bg-[#7c3aed]/30 text-purple-300 border border-purple-500/30'
                          : 'bg-white/[0.04] text-slate-500'
                      }`}
                    >
                      {meta.badge}
                    </span>
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

                <div className="flex items-center gap-3">
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
              <div className="p-4 border-t border-[#212738] bg-[#121624] flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Changes will be published live to public website immediately after saving.
                </span>
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

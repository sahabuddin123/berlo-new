import React, { useState, useEffect } from 'react';
import { adminApi, PageSection } from '../../services/adminApi';
import {
  Save,
  Check,
  Globe,
  FileEdit,
} from 'lucide-react';

export const AdminPagesManagerPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [sections, setSections] = useState<PageSection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchSections = async (slug: string) => {
    setIsLoading(true);
    try {
      const res = await adminApi.getPageSections(slug);
      if (res?.sections) {
        setSections(res.sections);
      }
    } catch {
      // Fallback default sections
      if (slug === 'home') {
        setSections([
          {
            id: 1,
            page_slug: 'home',
            section_key: 'hero',
            title_en: 'Strategic PR, Corporate Communications & Powerful Brand Narratives',
            title_bn: 'কৌশলগত জনসংযোগ, প্রাতিষ্ঠানিক যোগাযোগ ও প্রভাবশালী ব্র্যান্ড আখ্যান',
            subtitle_en: 'We protect reputations, navigate high-stakes crises, and architect influential corporate narratives.',
            subtitle_bn: 'আমরা শীর্ষ ব্র্যান্ডসমূহের সুনাম রক্ষা করি, সংকটময় মুহূর্তে কার্যকর সমাধান দিই।',
            badge_en: 'Leading Strategic PR & Crisis Advisory Firm',
            badge_bn: 'শীর্ষস্থানীয় কৌশলগত জনসংযোগ ও ক্রাইসিস অ্যাডভাইজরি ফার্ম',
            image_url: '/hero_character_crisis.png',
            cta_text_en: 'Inquire Now',
            cta_text_bn: 'পরামর্শ নিন',
            cta_link: '/en/contact',
            is_active: true,
            sort_order: 1,
          },
          {
            id: 2,
            page_slug: 'home',
            section_key: 'stats',
            title_en: 'Measurable Impact, Proven Trust',
            title_bn: 'পরিমাপযোগ্য প্রভাব ও প্রতিষ্ঠিত বিশ্বাস',
            subtitle_en: 'Decades of combined senior leadership experience advising boardrooms.',
            subtitle_bn: 'বোর্ডরুম ও বহুজাতিক সংস্থাকে পরামর্শ প্রদানে সিনিয়র নেতৃত্বের বহু বছরের যৌথ অভিজ্ঞতা।',
            is_active: true,
            sort_order: 2,
            metadata: {
              stats_list: [
                { value: '98%', label_en: 'Crisis Resolution Rate', label_bn: 'সংকট নিরসন হার' },
                { value: '150+', label_en: 'Corporate Clients Advised', label_bn: 'পরামর্শপ্রাপ্ত কর্পোরেট প্রতিষ্ঠান' },
                { value: '14+', label_en: 'Industry Awards', label_bn: 'শিল্প পদক ও সম্মাননা' },
                { value: '24/7', label_en: 'Emergency Response Protocol', label_bn: 'জরুরি রেসপন্স প্রোটোকল' },
              ],
            },
          },
          {
            id: 3,
            page_slug: 'home',
            section_key: 'cta',
            title_en: 'Facing a High-Stakes Crisis or Strategic Milestone?',
            title_bn: 'কোনো জরুরি সংকট বা কৌশলগত মাইলফলকের মুখোমুখি?',
            subtitle_en: 'Connect directly with our Managing Advisory Team under strict NDA.',
            subtitle_bn: 'আমাদের ম্যানেজিং পার্টনারদের সাথে সরাসরি যোগাযোগ করুন। কঠোর গোপনীয়তার সাথে তাৎক্ষণিক সমাধান।',
            cta_text_en: 'Schedule Executive Consultation',
            cta_text_bn: 'নির্বাহী পরামর্শ নির্ধারণ করুন',
            cta_link: '/en/contact',
            is_active: true,
            sort_order: 3,
          },
        ]);
      } else {
        setSections([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSections(selectedPage);
  }, [selectedPage]);

  const handleUpdateField = (sectionKey: string, field: keyof PageSection, value: any) => {
    setSections((prev) =>
      prev.map((s) => (s.section_key === sectionKey ? { ...s, [field]: value } : s))
    );
  };

  const handleSaveSection = async (section: PageSection) => {
    setIsSaving(section.section_key);
    try {
      await adminApi.updatePageSection(selectedPage, section.section_key, section);
      setFeedback(`Section "${section.section_key}" saved successfully.`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Save failed');
    } finally {
      setIsSaving(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Flux Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#1b2030]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Page Section & Content Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Edit text, headlines, hero graphics, badges, and CTA links across every public page in real time.
          </p>
        </div>

        {/* View live public page */}
        <a
          href={`/${selectedPage === 'home' ? 'en' : 'en/' + selectedPage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] text-xs font-medium transition-colors self-start sm:self-auto"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>Preview Live Page</span>
        </a>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Page Select Tabs (Flux style) */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#111420] border border-[#212738] overflow-x-auto text-xs">
        {[
          { key: 'home', label: 'Home Page' },
          { key: 'about', label: 'About Agency' },
          { key: 'contact', label: 'Contact & Headquarters' },
        ].map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setSelectedPage(p.key)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedPage === p.key
                ? 'bg-[#7c3aed] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Sections List */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-500 text-xs">Loading page sections...</div>
      ) : sections.length === 0 ? (
        <div className="p-10 rounded-xl bg-[#111420] border border-[#212738] text-center text-slate-400 text-xs">
          No configurable sections initialized for this page.
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.section_key}
              className="rounded-xl bg-[#111420] border border-[#212738] p-6 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#212738]">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#7c3aed]/15 text-[#a855f7] flex items-center justify-center font-bold text-xs">
                    <FileEdit className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm capitalize">
                      {section.section_key.replace('_', ' ')} Section
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">
                      key: {section.page_slug}.{section.section_key}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSaveSection(section)}
                    disabled={isSaving === section.section_key}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#6d28d9] hover:to-[#4f46e5] text-white text-xs font-semibold shadow-md shadow-[#7c3aed]/25 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving === section.section_key ? 'Saving...' : 'Save Section'}</span>
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Title EN */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium">Headline / Title (English)</label>
                  <input
                    type="text"
                    value={section.title_en || ''}
                    onChange={(e) => handleUpdateField(section.section_key, 'title_en', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>

                {/* Title BN */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium">Headline / Title (Bangla)</label>
                  <input
                    type="text"
                    value={section.title_bn || ''}
                    onChange={(e) => handleUpdateField(section.section_key, 'title_bn', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white font-bangla focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>

                {/* Subtitle EN */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium">Subtitle / Narrative (English)</label>
                  <textarea
                    rows={2}
                    value={section.subtitle_en || ''}
                    onChange={(e) => handleUpdateField(section.section_key, 'subtitle_en', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>

                {/* Subtitle BN */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium">Subtitle / Narrative (Bangla)</label>
                  <textarea
                    rows={2}
                    value={section.subtitle_bn || ''}
                    onChange={(e) => handleUpdateField(section.section_key, 'subtitle_bn', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white font-bangla focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>

                {/* Badge Tag */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium">Top Pill Badge (English)</label>
                  <input
                    type="text"
                    value={section.badge_en || ''}
                    onChange={(e) => handleUpdateField(section.section_key, 'badge_en', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium">Top Pill Badge (Bangla)</label>
                  <input
                    type="text"
                    value={section.badge_bn || ''}
                    onChange={(e) => handleUpdateField(section.section_key, 'badge_bn', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white font-bangla focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium">Featured Graphic / Image Path</label>
                  <input
                    type="text"
                    value={section.image_url || ''}
                    onChange={(e) => handleUpdateField(section.section_key, 'image_url', e.target.value)}
                    placeholder="e.g. /hero_character_crisis.png"
                    className="w-full px-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white font-mono focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>

                {/* CTA Link */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium">Call-to-Action Link</label>
                  <input
                    type="text"
                    value={section.cta_link || ''}
                    onChange={(e) => handleUpdateField(section.section_key, 'cta_link', e.target.value)}
                    placeholder="e.g. /en/contact"
                    className="w-full px-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white font-mono focus:outline-none focus:border-[#7c3aed]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

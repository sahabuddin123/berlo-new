import React, { useState, useEffect } from 'react';
import { useSiteSettings, defaultSiteSettings, SiteSettingsMap } from '../../contexts/SiteSettingsContext';
import { adminApi } from '../../services/adminApi';
import {
  Save,
  CheckCircle,
  Globe,
  Palette,
  MapPin,
  Share2,
  BarChart3,
  RefreshCw,
  Image as ImageIcon,
  ExternalLink,
  Phone,
  Mail,
  Sparkles,
  Sliders,
} from 'lucide-react';

type TabKey = 'branding' | 'theme' | 'contact' | 'social' | 'marketing';

export const AdminSettingsPage: React.FC = () => {
  const { settings: liveSettings, reloadSettings } = useSiteSettings();
  const [formData, setFormData] = useState<SiteSettingsMap>(defaultSiteSettings);
  const [activeTab, setActiveTab] = useState<TabKey>('branding');
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (liveSettings) {
      setFormData((prev) => ({
        ...prev,
        ...liveSettings,
      }));
    }
  }, [liveSettings]);

  const handleChange = (key: keyof SiteSettingsMap, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);
    try {
      await adminApi.updateSettings(formData);
      await reloadSettings();
      setFeedback({
        type: 'success',
        message: 'Settings updated successfully! Changes are now live across the website.',
      });
      setTimeout(() => setFeedback(null), 4000);
    } catch {
      setFeedback({
        type: 'error',
        message: 'Failed to update settings. Please check your network and try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'branding', label: 'General & Branding', icon: Globe },
    { key: 'theme', label: 'Theme & Typography', icon: Palette },
    { key: 'contact', label: 'Contact & Location', icon: MapPin },
    { key: 'social', label: 'Social & Chat', icon: Share2 },
    { key: 'marketing', label: 'Marketing & SEO', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#A302FF]" />
            <h1 className="text-2xl font-black text-white tracking-tight">
              Site & Brand Configuration
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Centrally control your public site branding, dynamic colors, typography, SEO metadata, contact coordinates, and marketing scripts.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#A302FF] hover:bg-[#8D00DE] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-900/30 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Saving Changes...' : 'Save All Settings'}</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
          }`}
        >
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-3">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#A302FF] text-white shadow-md shadow-purple-900/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ========================================================================= */}
        {/* TAB 1: GENERAL & BRANDING                                                  */}
        {/* ========================================================================= */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#A302FF]" />
                  <span>Site Titles & Global Identity</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  These texts appear across browser tabs, search engine snippets, and navigation headers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Site Title (English)
                  </label>
                  <input
                    type="text"
                    value={formData.site_title_en}
                    onChange={(e) => handleChange('site_title_en', e.target.value)}
                    placeholder="Berlo Communications — Strategic PR Agency"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <p className="text-[11px] text-slate-500">Default fallback page title in English.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Site Title (Bengali / বাংলা)
                  </label>
                  <input
                    type="text"
                    value={formData.site_title_bn}
                    onChange={(e) => handleChange('site_title_bn', e.target.value)}
                    placeholder="বার্লো কমিউনিকেশন্স — কৌশলগত জনসংযোগ ও যোগাযোগ সংস্থা"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <p className="text-[11px] text-slate-500">Default fallback page title in Bengali.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Official Agency Legal Name
                  </label>
                  <input
                    type="text"
                    value={formData.agency_name}
                    onChange={(e) => handleChange('agency_name', e.target.value)}
                    placeholder="Berlo Communications Ltd."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <p className="text-[11px] text-slate-500">Used in footers, copyright, and formal briefs.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    OpenGraph Share Graphic (Graph Image)
                  </label>
                  <input
                    type="text"
                    value={formData.og_image}
                    onChange={(e) => handleChange('og_image', e.target.value)}
                    placeholder="/brand/logo.png or https://example.com/share-card.jpg"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <p className="text-[11px] text-slate-500">Default social preview card image for Facebook, LinkedIn & Twitter.</p>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Tagline (English)
                  </label>
                  <input
                    type="text"
                    value={formData.site_tagline_en}
                    onChange={(e) => handleChange('site_tagline_en', e.target.value)}
                    placeholder="Architecting Perception. Engineering Influence."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Tagline (Bengali / বাংলা)
                  </label>
                  <input
                    type="text"
                    value={formData.site_tagline_bn}
                    onChange={(e) => handleChange('site_tagline_bn', e.target.value)}
                    placeholder="ধারণার রূপকার। প্রভাবের স্থপতি।"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>
              </div>
            </div>

            {/* Logos & Assets */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#A302FF]" />
                  <span>Logos & Favicon Assets</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Paste the URL or local path to your logo and browser favicon.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Light Logo */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">Header Logo (Light)</label>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Navigation</span>
                  </div>
                  <input
                    type="text"
                    value={formData.logo_light}
                    onChange={(e) => handleChange('logo_light', e.target.value)}
                    placeholder="/brand/logo.png"
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <div className="h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-2">
                    {formData.logo_light ? (
                      <img
                        src={formData.logo_light}
                        alt="Light Logo Preview"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                    ) : (
                      <span className="text-[11px] text-slate-500">No logo url</span>
                    )}
                  </div>
                </div>

                {/* Dark Logo */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">Footer Logo (Dark)</label>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Footer</span>
                  </div>
                  <input
                    type="text"
                    value={formData.logo_dark}
                    onChange={(e) => handleChange('logo_dark', e.target.value)}
                    placeholder="/brand/logo.png"
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <div className="h-16 rounded-lg bg-black border border-white/10 flex items-center justify-center p-2">
                    {formData.logo_dark ? (
                      <img
                        src={formData.logo_dark}
                        alt="Dark Logo Preview"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                    ) : (
                      <span className="text-[11px] text-slate-500">No logo url</span>
                    )}
                  </div>
                </div>

                {/* Favicon */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">Browser Favicon</label>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Browser Tab</span>
                  </div>
                  <input
                    type="text"
                    value={formData.favicon}
                    onChange={(e) => handleChange('favicon', e.target.value)}
                    placeholder="/favicon.ico"
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <div className="h-16 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center p-2 gap-3">
                    {formData.favicon ? (
                      <img
                        src={formData.favicon}
                        alt="Favicon Preview"
                        className="w-8 h-8 object-contain"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                    ) : (
                      <span className="text-[11px] text-slate-500">No favicon</span>
                    )}
                    <span className="text-[11px] text-slate-400">Live tab icon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: THEME, COLORS & TYPOGRAPHY                                          */}
        {/* ========================================================================= */}
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#A302FF]" />
                  <span>Site Colors & Palette</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your primary brand colors. Changes instantly cascade to buttons, borders, highlights, and icons.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Primary Color */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">Primary Brand Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.primary_color || '#A302FF'}
                      onChange={(e) => handleChange('primary_color', e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={formData.primary_color}
                      onChange={(e) => handleChange('primary_color', e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono uppercase"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Used on primary CTA buttons and active headers.</p>
                </div>

                {/* Primary Hover */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">Primary Hover Shade</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.primary_hover || '#8D00DE'}
                      onChange={(e) => handleChange('primary_hover', e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={formData.primary_hover}
                      onChange={(e) => handleChange('primary_hover', e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono uppercase"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Applied when hovering over interactive buttons.</p>
                </div>

                {/* Accent Color */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">Accent Color (Secondary)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.accent_color || '#11813C'}
                      onChange={(e) => handleChange('accent_color', e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={formData.accent_color}
                      onChange={(e) => handleChange('accent_color', e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono uppercase"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Verification badges, green accents, and tags.</p>
                </div>

                {/* Dark Background Color */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">Dark Background Tone</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.dark_bg_color || '#07090D'}
                      onChange={(e) => handleChange('dark_bg_color', e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={formData.dark_bg_color}
                      onChange={(e) => handleChange('dark_bg_color', e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono uppercase"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Base dark background tone for nighttime theme.</p>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A302FF]" />
                  <span>Typography & Font Families</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select clean, corporate typographic fonts for English and Bengali content.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Latin / English Font Family
                  </label>
                  <select
                    value={formData.font_family_latin}
                    onChange={(e) => handleChange('font_family_latin', e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  >
                    <option value="Inter, sans-serif">Inter (Modern, High Legibility)</option>
                    <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans (Executive Corporate)</option>
                    <option value="Outfit, sans-serif">Outfit (Contemporary Geometric)</option>
                    <option value="Montserrat, sans-serif">Montserrat (Bold & Assertive)</option>
                    <option value="'Space Grotesk', sans-serif">Space Grotesk (Tech Editorial)</option>
                    <option value="Roboto, sans-serif">Roboto (Clean Neutral)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Bengali Font Family (বাংলা ফন্ট)
                  </label>
                  <select
                    value={formData.font_family_bengali}
                    onChange={(e) => handleChange('font_family_bengali', e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  >
                    <option value="'Hind Siliguri', sans-serif">Hind Siliguri (Bengali Modern Standard)</option>
                    <option value="'Noto Sans Bengali', sans-serif">Noto Sans Bengali (Google Typography)</option>
                    <option value="'Tiro Bangla', serif">Tiro Bangla (Editorial & Traditional)</option>
                    <option value="'Kalpurush', sans-serif">Kalpurush (Classic Newspaper Form)</option>
                  </select>
                </div>
              </div>

              {/* Live Preview Swatch */}
              <div className="mt-4 p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Live UI Styling Component Preview
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    style={{ backgroundColor: formData.primary_color }}
                    className="px-4 py-2 text-white font-bold text-xs rounded-lg shadow"
                  >
                    Primary Button
                  </button>
                  <button
                    type="button"
                    style={{ backgroundColor: formData.accent_color }}
                    className="px-4 py-2 text-white font-bold text-xs rounded-lg shadow"
                  >
                    Accent Button
                  </button>
                  <span
                    style={{ color: formData.primary_color }}
                    className="text-sm font-extrabold"
                  >
                    Highlighted Brand Text
                  </span>
                  <span
                    style={{ color: formData.accent_color }}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800"
                  >
                    ✓ Status Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CONTACT & LOCATION COORDINATES                                      */}
        {/* ========================================================================= */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#A302FF]" />
                  <span>Phone Lines & Communications Desks</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Executive Advisory Hotline
                  </label>
                  <input
                    type="text"
                    value={formData.hotline_number}
                    onChange={(e) => handleChange('hotline_number', e.target.value)}
                    placeholder="+880 1711 268 479"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <p className="text-[11px] text-slate-500">Displayed in Header topbar and emergency cards.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Primary Phone Line
                  </label>
                  <input
                    type="text"
                    value={formData.primary_phone}
                    onChange={(e) => handleChange('primary_phone', e.target.value)}
                    placeholder="+880 1711 268 479"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Secondary / Support Phone
                  </label>
                  <input
                    type="text"
                    value={formData.secondary_phone}
                    onChange={(e) => handleChange('secondary_phone', e.target.value)}
                    placeholder="+880 1812 336 789"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>
              </div>

              <div className="border-t border-slate-800 pt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#00A896]" />
                  <span>Corporate Emails</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Primary Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => handleChange('contact_email', e.target.value)}
                      placeholder="contact@berlocommunications.com"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Press & Media Relations Email
                    </label>
                    <input
                      type="email"
                      value={formData.press_email}
                      onChange={(e) => handleChange('press_email', e.target.value)}
                      placeholder="media@berlocommunications.com"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Executive Support Email
                    </label>
                    <input
                      type="email"
                      value={formData.support_email}
                      onChange={(e) => handleChange('support_email', e.target.value)}
                      placeholder="shatarupa@berlocommunications.com"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#A302FF]" />
                  <span>Physical Address & Operating Hours</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Office Address (English)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.office_address_en}
                      onChange={(e) => handleChange('office_address_en', e.target.value)}
                      placeholder="Apartment - B3, House - 32/34, Road - 07, Block - C, Niketon, Gulshan-1, Dhaka-1212"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Office Address (Bengali / বাংলা)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.office_address_bn}
                      onChange={(e) => handleChange('office_address_bn', e.target.value)}
                      placeholder="অ্যাপার্টমেন্ট - বি৩, বাড়ি - ৩২/৩৪, রোড - ০৭, ব্লক - সি, নিকেতন, গুলশান-১, ঢাকা-১২১২"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Working Hours (English)
                    </label>
                    <input
                      type="text"
                      value={formData.working_hours_en}
                      onChange={(e) => handleChange('working_hours_en', e.target.value)}
                      placeholder="Sunday - Thursday: 9:00 AM - 6:30 PM (BST)"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Working Hours (Bengali / বাংলা)
                    </label>
                    <input
                      type="text"
                      value={formData.working_hours_bn}
                      onChange={(e) => handleChange('working_hours_bn', e.target.value)}
                      placeholder="রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - সন্ধ্যা ৬:৩০"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Google Maps Configuration */}
              <div className="border-t border-slate-800 pt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#11813C]" />
                    <span>Google Maps Integration</span>
                  </h3>
                  {formData.google_maps_link && (
                    <a
                      href={formData.google_maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#A302FF] flex items-center gap-1 hover:underline"
                    >
                      <span>Test Map Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Google Maps Embed URL (Iframe src)
                  </label>
                  <input
                    type="text"
                    value={formData.google_maps_embed}
                    onChange={(e) => handleChange('google_maps_embed', e.target.value)}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <p className="text-[11px] text-slate-500">
                    In Google Maps, click "Share" → "Embed a map" and copy the <code>src="..."</code> URL.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Google Maps Direct Navigation Link
                  </label>
                  <input
                    type="text"
                    value={formData.google_maps_link}
                    onChange={(e) => handleChange('google_maps_link', e.target.value)}
                    placeholder="https://maps.google.com/?q=Niketon+Gulshan-1+Dhaka"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                {formData.google_maps_embed && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-slate-800 h-48 bg-slate-950">
                    <iframe
                      src={formData.google_maps_embed}
                      title="Google Maps Preview"
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SOCIAL MEDIA & MESSAGING                                            */}
        {/* ========================================================================= */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#A302FF]" />
                  <span>Social Channels & Instant Messaging</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Links to your official social networks. Also powers the floating WhatsApp advisory chatbot.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span>WhatsApp Number (Chatbot Target)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp_number}
                    onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                    placeholder="+8801711268479"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                  <p className="text-[11px] text-slate-500">
                    Include country code without special characters (e.g. <code>8801711268479</code>).
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Facebook Page URL
                  </label>
                  <input
                    type="url"
                    value={formData.social_facebook}
                    onChange={(e) => handleChange('social_facebook', e.target.value)}
                    placeholder="https://facebook.com/berlocommunications"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    LinkedIn Organization URL
                  </label>
                  <input
                    type="url"
                    value={formData.social_linkedin}
                    onChange={(e) => handleChange('social_linkedin', e.target.value)}
                    placeholder="https://linkedin.com/company/berlocommunications"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Instagram Profile URL
                  </label>
                  <input
                    type="url"
                    value={formData.social_instagram}
                    onChange={(e) => handleChange('social_instagram', e.target.value)}
                    placeholder="https://instagram.com/berlocommunications"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Twitter / X Profile URL
                  </label>
                  <input
                    type="url"
                    value={formData.social_twitter}
                    onChange={(e) => handleChange('social_twitter', e.target.value)}
                    placeholder="https://twitter.com/berlopr"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    value={formData.social_youtube}
                    onChange={(e) => handleChange('social_youtube', e.target.value)}
                    placeholder="https://youtube.com/@berlocommunications"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: MARKETING, SEO & TRACKING CODES                                     */}
        {/* ========================================================================= */}
        {activeTab === 'marketing' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#A302FF]" />
                  <span>Search Console & Webmaster Verification</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Authorize your ownership with Google and Microsoft Bing webmaster platforms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Google Search Console Verification
                  </label>
                  <input
                    type="text"
                    value={formData.google_search_console}
                    onChange={(e) => handleChange('google_search_console', e.target.value)}
                    placeholder="google-site-verification=abc123xyz... or token only"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <p className="text-[11px] text-slate-500">
                    Injected as <code>&lt;meta name="google-site-verification" content="..."&gt;</code>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Bing Webmaster Tools Verification
                  </label>
                  <input
                    type="text"
                    value={formData.bing_webmaster_code}
                    onChange={(e) => handleChange('bing_webmaster_code', e.target.value)}
                    placeholder="msvalidate.01 token or tag content"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                  />
                  <p className="text-[11px] text-slate-500">
                    Injected as <code>&lt;meta name="msvalidate.01" content="..."&gt;</code>
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Analytics & Tag Tracking IDs</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Google Analytics 4 (GA4 ID)
                    </label>
                    <input
                      type="text"
                      value={formData.google_analytics_id}
                      onChange={(e) => handleChange('google_analytics_id', e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                    />
                    <p className="text-[11px] text-slate-500">Automatically injects gtag.js script.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Google Tag Manager (GTM ID)
                    </label>
                    <input
                      type="text"
                      value={formData.google_tag_manager_id}
                      onChange={(e) => handleChange('google_tag_manager_id', e.target.value)}
                      placeholder="GTM-XXXXXXX"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                    />
                    <p className="text-[11px] text-slate-500">Container ID for tag management.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Meta / Facebook Pixel ID
                    </label>
                    <input
                      type="text"
                      value={formData.facebook_pixel_id}
                      onChange={(e) => handleChange('facebook_pixel_id', e.target.value)}
                      placeholder="e.g. 123456789012345"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#A302FF]"
                    />
                    <p className="text-[11px] text-slate-500">For conversion and campaign tracking.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Custom Header & Footer Injection Snippets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Custom &lt;head&gt; Scripts / Meta
                    </label>
                    <textarea
                      rows={4}
                      value={formData.custom_head_scripts}
                      onChange={(e) => handleChange('custom_head_scripts', e.target.value)}
                      placeholder="<!-- Custom verification or style tags -->"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Custom &lt;body&gt; Tracking Snippets
                    </label>
                    <textarea
                      rows={4}
                      value={formData.custom_body_scripts}
                      onChange={(e) => handleChange('custom_body_scripts', e.target.value)}
                      placeholder="<!-- Custom chat widget or event tracker -->"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-[#A302FF]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400">
            Unsaved changes will not take effect on the live website until saved.
          </span>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#A302FF] hover:bg-[#8D00DE] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-purple-900/30 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving Changes...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

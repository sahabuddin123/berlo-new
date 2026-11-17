import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BRAND } from '../config/brand';

export interface SiteSettingsMap {
  // General & Branding
  site_title_en: string;
  site_title_bn: string;
  site_tagline_en: string;
  site_tagline_bn: string;
  agency_name: string;
  logo_light: string;
  logo_dark: string;
  logo_mobile: string;
  favicon: string;
  og_image: string;

  // Styling & Theme
  primary_color: string;
  primary_hover: string;
  accent_color: string;
  dark_bg_color: string;
  font_family_latin: string;
  font_family_bengali: string;

  // Contact & Headquarters
  hotline_number: string;
  primary_phone: string;
  secondary_phone: string;
  contact_email: string;
  press_email: string;
  support_email: string;
  office_address_en: string;
  office_address_bn: string;
  working_hours_en: string;
  working_hours_bn: string;
  google_maps_embed: string;
  google_maps_link: string;

  // Social Channels
  whatsapp_number: string;
  social_facebook: string;
  social_linkedin: string;
  social_instagram: string;
  social_twitter: string;
  social_youtube: string;

  // Marketing & Tracking
  google_search_console: string;
  google_analytics_id: string;
  google_tag_manager_id: string;
  bing_webmaster_code: string;
  facebook_pixel_id: string;
  custom_head_scripts: string;
  custom_body_scripts: string;

  [key: string]: string | undefined;
}

export const defaultSiteSettings: SiteSettingsMap = {
  site_title_en: 'Berlo Communications — Strategic PR & Communications Agency',
  site_title_bn: 'বার্লো কমিউনিকেশন্স — কৌশলগত জনসংযোগ ও যোগাযোগ সংস্থা',
  site_tagline_en: BRAND.tagline.en,
  site_tagline_bn: BRAND.tagline.bn,
  agency_name: BRAND.name,
  logo_light: '/brand/logo.png',
  logo_dark: '/brand/logo.png',
  logo_mobile: '/brand/logo.png',
  favicon: '/favicon.ico',
  og_image: '/brand/logo.png',

  primary_color: '#A302FF',
  primary_hover: '#8D00DE',
  accent_color: '#11813C',
  dark_bg_color: '#07090D',
  font_family_latin: 'Inter, sans-serif',
  font_family_bengali: "'Hind Siliguri', sans-serif",

  hotline_number: BRAND.contact.phones[0],
  primary_phone: BRAND.contact.phones[0],
  secondary_phone: BRAND.contact.phones[1] || '+880 1812 336 789',
  contact_email: BRAND.contact.emails[0],
  press_email: 'media@berlocommunications.com',
  support_email: BRAND.contact.emails[1] || 'shatarupa@berlocommunications.com',
  office_address_en: BRAND.contact.address.en,
  office_address_bn: BRAND.contact.address.bn,
  working_hours_en: BRAND.contact.workingHours.en,
  working_hours_bn: BRAND.contact.workingHours.bn,
  google_maps_embed: BRAND.contact.mapEmbedUrl,
  google_maps_link: 'https://maps.google.com/?q=Niketon+Gulshan-1+Dhaka',

  whatsapp_number: '+8801711268479',
  social_facebook: BRAND.social.facebook,
  social_linkedin: BRAND.social.linkedin,
  social_instagram: BRAND.social.instagram,
  social_twitter: BRAND.social.twitter,
  social_youtube: BRAND.social.youtube,

  google_search_console: '',
  google_analytics_id: '',
  google_tag_manager_id: '',
  bing_webmaster_code: '',
  facebook_pixel_id: '',
  custom_head_scripts: '',
  custom_body_scripts: '',
};

interface SiteSettingsContextType {
  settings: SiteSettingsMap;
  isLoading: boolean;
  reloadSettings: () => Promise<void>;
  updateSettingsInMemory: (newSettings: Partial<SiteSettingsMap>) => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSiteSettings,
  isLoading: false,
  reloadSettings: async () => {},
  updateSettingsInMemory: () => {},
});

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : '') ||
  (import.meta.env.DEV ? 'http://localhost:8000/api/v1' : '/api/v1');

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettingsMap>(defaultSiteSettings);
  const [isLoading, setIsLoading] = useState(false);

  const reloadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        const data = json?.data;
        if (data && typeof data === 'object') {
          setSettings((prev) => ({
            ...prev,
            ...data,
          }));
        }
      }
    } catch {
      // Graceful fallback to defaultSiteSettings
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reloadSettings();
  }, [reloadSettings]);

  // Apply dynamic styles, favicon, and tracking scripts to DOM
  useEffect(() => {
    // 1. Dynamic CSS Variables (Colors & Typography)
    const root = document.documentElement;
    if (settings.primary_color) {
      root.style.setProperty('--color-brand-purple', settings.primary_color);
      root.style.setProperty('--color-primary', settings.primary_color);
    }
    if (settings.primary_hover) {
      root.style.setProperty('--color-brand-purple-hover', settings.primary_hover);
    }
    if (settings.accent_color) {
      root.style.setProperty('--color-brand-green', settings.accent_color);
      root.style.setProperty('--color-accent', settings.accent_color);
    }
    if (settings.dark_bg_color) {
      root.style.setProperty('--color-navy-dark', settings.dark_bg_color);
    }
    if (settings.font_family_latin) {
      root.style.setProperty('--font-sans', settings.font_family_latin);
    }

    // 2. Dynamic Favicon
    if (settings.favicon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.head.appendChild(link);
      }
      link.href = settings.favicon;
    }

    // 3. Dynamic Google Search Console Verification
    if (settings.google_search_console) {
      const gscCode = settings.google_search_console.replace(/^google-site-verification=/, '');
      let meta = document.querySelector('meta[name="google-site-verification"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'google-site-verification');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', gscCode);
    }

    // 4. Dynamic Bing Webmaster Tools Verification
    if (settings.bing_webmaster_code) {
      const bingCode = settings.bing_webmaster_code.replace(/^msvalidate\.01=/, '');
      let meta = document.querySelector('meta[name="msvalidate.01"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'msvalidate.01');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', bingCode);
    }

    // 5. Dynamic Google Analytics (GA4) Injection
    if (settings.google_analytics_id && settings.google_analytics_id.startsWith('G-')) {
      if (!document.getElementById('ga4-script')) {
        const gaScript = document.createElement('script');
        gaScript.id = 'ga4-script';
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`;
        document.head.appendChild(gaScript);

        const gaInit = document.createElement('script');
        gaInit.id = 'ga4-init';
        gaInit.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${settings.google_analytics_id}');
        `;
        document.head.appendChild(gaInit);
      }
    }

    // 6. Dynamic Google Tag Manager (GTM)
    if (settings.google_tag_manager_id && settings.google_tag_manager_id.startsWith('GTM-')) {
      if (!document.getElementById('gtm-script')) {
        const gtmScript = document.createElement('script');
        gtmScript.id = 'gtm-script';
        gtmScript.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${settings.google_tag_manager_id}');
        `;
        document.head.appendChild(gtmScript);
      }
    }
  }, [settings]);

  const updateSettingsInMemory = (newSettings: Partial<SiteSettingsMap>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        isLoading,
        reloadSettings,
        updateSettingsInMemory,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);

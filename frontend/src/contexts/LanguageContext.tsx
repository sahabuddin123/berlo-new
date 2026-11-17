import React, { createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Language, translations, getTranslation } from '../i18n';

interface LanguageContextType {
  lang: Language;
  t: (key: string) => string;
  setLang: (lang: Language) => void;
  switchLanguage: () => void;
  formatRoute: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams<{ lang?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine language from URL param first, then fallback to 'en'
  const lang: Language = useMemo(() => {
    if (params.lang === 'bn' || params.lang === 'en') {
      return params.lang;
    }
    const pathSegment = location.pathname.split('/')[1];
    if (pathSegment === 'bn' || pathSegment === 'en') {
      return pathSegment;
    }
    return 'en';
  }, [params.lang, location.pathname]);

  // Synchronize HTML attributes for accessibility and typography
  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === 'bn') {
      document.documentElement.classList.add('font-bangla');
      document.documentElement.classList.remove('font-poppins');
    } else {
      document.documentElement.classList.add('font-poppins');
      document.documentElement.classList.remove('font-bangla');
    }
  }, [lang]);

  // Translation resolver
  const t = useCallback(
    (key: string): string => {
      const currentDict = translations[lang] || translations.en;
      return getTranslation(currentDict as unknown as Record<string, unknown>, key);
    },
    [lang]
  );

  // Formats a path with the current language prefix
  const formatRoute = useCallback(
    (path: string): string => {
      const cleanPath = path.startsWith('/') ? path.substring(1) : path;
      return `/${lang}/${cleanPath}`.replace(/\/+$/, '');
    },
    [lang]
  );

  // Switches language and maintains current sub-path
  const setLang = useCallback(
    (newLang: Language) => {
      if (newLang === lang) return;
      const segments = location.pathname.split('/').filter(Boolean);
      // Remove previous lang segment if present
      if (segments[0] === 'en' || segments[0] === 'bn') {
        segments.shift();
      }
      const newPath = `/${newLang}/${segments.join('/')}${location.search}${location.hash}`;
      navigate(newPath);
    },
    [lang, location, navigate]
  );

  const switchLanguage = useCallback(() => {
    setLang(lang === 'en' ? 'bn' : 'en');
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, switchLanguage, formatRoute }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


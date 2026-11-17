import React, { useState, useEffect, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { SearchModal } from '../common/SearchModal';
import { WhatsAppChatbot } from '../common/WhatsAppChatbot';
import { PageLoader } from '../common/PageLoader';

const InnerLayout: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#000000] text-slate-900 dark:text-[#FFFFFF] transition-colors duration-200">
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <main className="flex-1 pt-16 sm:pt-20 lg:pt-28">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <WhatsAppChatbot />
    </div>
  );
};

export const RootLayout: React.FC = () => {
  return (
    <LanguageProvider>
      <InnerLayout />
    </LanguageProvider>
  );
};

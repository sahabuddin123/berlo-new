import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { navigationItems } from '../../config/navigation';
import { BRAND } from '../../config/brand';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { ThemeToggle } from '../common/ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { Search, Menu, ChevronDown, Mail, Clock } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { lang, formatRoute, t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdowns on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        {/* Top Micro-bar: Corporate Hotline & Operating Hours */}
        <div className="hidden lg:block bg-[#0D1B36] text-slate-300 text-xs py-1.5 px-6 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#11813C] animate-pulse" />
                <span className="font-medium text-slate-200">
                  {lang === 'bn' ? 'সরাসরি পরামর্শ হটলাইন:' : 'Direct Advisory Hotline:'}
                </span>
                <a href={`tel:${BRAND.contact.phones[0]}`} className="hover:text-white transition-colors font-semibold text-[#16A34A]">
                  {BRAND.contact.phones[0]}
                </a>
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href={`mailto:${BRAND.contact.emails[0]}`} className="hover:text-white transition-colors">
                  {BRAND.contact.emails[0]}
                </a>
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{BRAND.contact.workingHours[lang]}</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Niketon, Gulshan-1, Dhaka</span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'glass shadow-lg border-b border-slate-200/80 dark:border-slate-800/80 py-3'
              : 'bg-white/95 dark:bg-[#0B0C10]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/40 py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Official Brand Logo */}
            <Link to={formatRoute('')} className="flex items-center gap-3 shrink-0 group focus:outline-none">
              <img
                src="/brand/logo.png"
                alt="Berlo Communications Logo"
                className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navigationItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isItemActive = location.pathname.includes(`/${item.path}`) && item.path !== '';

                if (hasChildren) {
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        type="button"
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          isItemActive
                            ? 'text-[#A302FF] dark:text-[#B833FF] font-semibold'
                            : 'text-slate-700 dark:text-slate-200 hover:text-[#A302FF] dark:hover:text-[#B833FF]'
                        }`}
                      >
                        <span>{item.label[lang]}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180" />
                      </button>

                      {/* Dropdown Popover */}
                      {activeDropdown === item.id && (
                        <div className="absolute top-full left-0 w-64 pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                          <div className="rounded-2xl p-2 bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-xl">
                            {item.children?.map((child) => (
                              <NavLink
                                key={child.id}
                                to={formatRoute(child.path)}
                                className={({ isActive }) =>
                                  `block px-3.5 py-2.5 rounded-none text-xs sm:text-sm transition-all duration-150 ${
                                    isActive
                                      ? 'bg-[#A302FF]/10 text-[#A302FF] font-semibold'
                                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#A302FF]'
                                  }`
                                }
                              >
                                {child.label[lang]}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.id}
                    to={formatRoute(item.path)}
                    end={item.path === ''}
                    className={({ isActive }) =>
                      `px-3 py-2 text-[15px] font-medium transition-colors ${
                        isActive
                          ? 'text-[#A302FF] font-semibold'
                          : 'text-slate-700 dark:text-slate-200 hover:text-[#A302FF]'
                      }`
                    }
                  >
                    {item.label[lang]}
                  </NavLink>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Search Trigger */}
              <button
                onClick={onOpenSearch}
                type="button"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#A302FF] rounded-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                title={lang === 'bn' ? 'অনুসন্ধান (Ctrl+K)' : 'Search (Ctrl+K)'}
                aria-label="Open search dialog"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Contact Consultation CTA */}
              <div className="hidden sm:block">
                <Link
                  to={formatRoute('contact')}
                  className="btn-berlo-primary !py-2 !px-4 !text-xs"
                >
                  {t('common.inquireNow')}
                </Link>
              </div>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                type="button"
                className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={onOpenSearch}
      />
    </>
  );
};

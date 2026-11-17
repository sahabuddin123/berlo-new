import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { navigationItems as defaultNavItems, NavItem } from '../../config/navigation';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { ThemeToggle } from '../common/ThemeToggle';
import { Button } from '../common/Button';
import { X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { BRAND } from '../../config/brand';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  items?: NavItem[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenSearch, items = defaultNavItems }) => {
  const { lang, formatRoute, t } = useLanguage();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleExpand = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id));
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-sm bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 overflow-y-auto border-l border-slate-200 dark:border-slate-800">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <img src="/brand/logo.png" alt="Berlo Communications" className="h-9 w-auto" />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar Button in Mobile */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/60">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-sm"
          >
            <span>{t('common.searchPlaceholder')}</span>
            <span className="text-xs bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">⌘K</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1">
          {items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItem === item.id;

            return (
              <div key={item.id} className="border-b border-slate-100 dark:border-slate-800/40 pb-1">
                {hasChildren ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full flex items-center justify-between py-3 px-2 text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-[#A302FF] dark:hover:text-[#B833FF]"
                    >
                      <span>{item.label[lang]}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 text-slate-400 ${
                          isExpanded ? 'rotate-180 text-[#A302FF]' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-4 pb-2 space-y-1 animate-in slide-in-from-top-2 duration-150">
                        {item.children?.map((child) => (
                          <NavLink
                            key={child.id}
                            to={formatRoute(child.path)}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `block py-2 px-3 text-sm rounded-lg transition-colors ${
                                isActive
                                  ? 'font-semibold text-[#A302FF] bg-[#A302FF]/5 dark:bg-[#A302FF]/10'
                                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                              }`
                            }
                          >
                            {child.label[lang]}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={formatRoute(item.path)}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block py-3 px-2 text-base font-semibold rounded-lg transition-colors ${
                        isActive
                          ? 'text-[#A302FF] dark:text-[#B833FF]'
                          : 'text-slate-800 dark:text-slate-100 hover:text-[#A302FF]'
                      }`
                    }
                  >
                    {item.label[lang]}
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Contact Details inside Mobile Menu */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {lang === 'bn' ? 'জরুরি যোগাযোগ' : 'Immediate Support'}
          </div>
          <a
            href={`tel:${BRAND.contact.phones[0]}`}
            className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-[#11813C]"
          >
            <Phone className="w-3.5 h-3.5 text-[#11813C]" />
            <span>{BRAND.contact.phones[0]}</span>
          </a>
          <a
            href={`mailto:${BRAND.contact.emails[0]}`}
            className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-[#A302FF]"
          >
            <Mail className="w-3.5 h-3.5 text-[#A302FF]" />
            <span>{BRAND.contact.emails[0]}</span>
          </a>
          <div className="flex items-start gap-2.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>Niketon, Gulshan-1, Dhaka</span>
          </div>

          <div className="pt-2">
            <Button
              to={formatRoute('contact')}
              onClick={onClose}
              variant="purple"
              size="md"
              className="w-full justify-center"
            >
              {t('common.inquireNow')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


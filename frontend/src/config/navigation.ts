/**
 * Centralized Navigation Configuration
 * Supports bilingual navigation, nested items, and active path matching.
 */

export interface NavItem {
  id: string;
  path: string;
  label: {
    en: string;
    bn: string;
  };
  children?: NavItem[];
}

export const navigationItems: NavItem[] = [
  {
    id: 'home',
    path: '',
    label: { en: 'Home', bn: 'হোম' },
  },
  {
    id: 'about',
    path: 'about',
    label: { en: 'About', bn: 'আমাদের সম্পর্কে' },
    children: [
      { id: 'about-us', path: 'about', label: { en: 'Our Story & Values', bn: 'আমাদের গল্প ও মূল্যবোধ' } },
      { id: 'leadership', path: 'leadership', label: { en: 'Leadership Team', bn: 'নেতৃত্ব দল' } },
      { id: 'team', path: 'team', label: { en: 'Creative & PR Team', bn: 'সৃজনশীল ও জনসংযোগ দল' } },
    ],
  },
  {
    id: 'services',
    path: 'services',
    label: { en: 'Services', bn: 'সেবাসমূহ' },
    children: [
      { id: 'services-all', path: 'services', label: { en: 'All Services Overview', bn: 'সকল সেবার সংক্ষিপ্তসার' } },
      { id: 'srv-pr', path: 'services/strategic-pr', label: { en: 'Strategic PR & Reputation', bn: 'কৌশলগত জনসংযোগ ও সুনাম' } },
      { id: 'srv-media', path: 'services/media-relations', label: { en: 'Media Relations & Press', bn: 'মিডিয়া সংযোগ ও প্রেস' } },
      { id: 'srv-crisis', path: 'services/crisis-management', label: { en: 'Crisis & Risk Advisory', bn: 'সংকট ও ঝুঁকি পরামর্শ' } },
      { id: 'srv-events', path: 'services/events-activations', label: { en: 'Events & Activations', bn: 'ইভেন্ট ও অ্যাক্টিভেশন' } },
      { id: 'srv-content', path: 'services/content-storytelling', label: { en: 'Visual & Digital Content', bn: 'ভিজ্যুয়াল ও ডিজিটাল কন্টেন্ট' } },
      { id: 'srv-digital', path: 'services/digital-pr', label: { en: 'Digital PR & Influencers', bn: 'ডিজিটাল পিআর ও ইনফ্লুয়েন্সার' } },
    ],
  },
  {
    id: 'work',
    path: 'work',
    label: { en: 'Case Studies', bn: 'কেস স্টাডি' },
  },
  {
    id: 'clients',
    path: 'clients',
    label: { en: 'Clients', bn: 'ক্লায়েন্টস' },
  },
  {
    id: 'insights',
    path: 'insights',
    label: { en: 'Insights', bn: 'ইনসাইটস' },
    children: [
      { id: 'articles', path: 'insights', label: { en: 'Articles & Industry News', bn: 'আর্টিকেল ও শিল্প সংবাদ' } },
      { id: 'media-coverage', path: 'media', label: { en: 'Media Coverage & Press', bn: 'সংবাদমাধ্যমে কভারেজ' } },
    ],
  },
  {
    id: 'contact',
    path: 'contact',
    label: { en: 'Contact', bn: 'যোগাযোগ' },
  },
];

export const footerNavigation = {
  agency: [
    { path: 'about', label: { en: 'About Berlo', bn: 'বার্লো সম্পর্কে' } },
    { path: 'leadership', label: { en: 'Leadership', bn: 'নেতৃত্ব' } },
    { path: 'team', label: { en: 'Our Team', bn: 'আমাদের টিম' } },
    { path: 'clients', label: { en: 'Clients', bn: 'ক্লায়েন্টসমূহ' } },
  ],
  services: [
    { path: 'services/strategic-pr', label: { en: 'Strategic PR', bn: 'কৌশলগত জনসংযোগ' } },
    { path: 'services/media-relations', label: { en: 'Media Relations', bn: 'মিডিয়া সংযোগ' } },
    { path: 'services/crisis-management', label: { en: 'Crisis Management', bn: 'সংকট ব্যবস্থাপনা' } },
    { path: 'services/events-activations', label: { en: 'Events & Activations', bn: 'ইভেন্ট ও অ্যাক্টিভেশন' } },
    { path: 'services/content-storytelling', label: { en: 'Visual Storytelling', bn: 'ভিজ্যুয়াল স্টোরিটেলিং' } },
  ],
  insights: [
    { path: 'insights', label: { en: 'Industry Insights', bn: 'শিল্প ইনসাইটস' } },
    { path: 'work', label: { en: 'Case Studies', bn: 'কেস স্টাডিজ' } },
    { path: 'media', label: { en: 'Media Coverage', bn: 'মিডিয়া কভারেজ' } },
    { path: 'contact', label: { en: 'Inquire Now', bn: 'অনুসন্ধান করুন' } },
  ],
  legal: [
    { path: 'privacy', label: { en: 'Privacy Policy', bn: 'গোপনীয়তা নীতি' } },
    { path: 'terms', label: { en: 'Terms & Conditions', bn: 'ব্যবহারের শর্তাবলি' } },
  ],
};


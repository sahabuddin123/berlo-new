export interface ClientItem {
  id: string;
  name: string;
  category: 'banking' | 'telecom' | 'fmcg' | 'energy' | 'healthcare' | 'development';
  industry: { en: string; bn: string };
  partnershipYears: number;
  highlight: { en: string; bn: string };
}

export interface Testimonial {
  id: string;
  clientName: string;
  author: string;
  designation: { en: string; bn: string };
  company: string;
  quote: { en: string; bn: string };
  rating: number;
}

export const clientsData: ClientItem[] = [
  {
    id: 'client-1',
    name: 'Apex Holdings Group',
    category: 'banking',
    industry: { en: 'Banking & Financial Conglomerates', bn: 'ব্যাংকিং ও আর্থিক গ্রুপ' },
    partnershipYears: 5,
    highlight: { en: 'Continuous annual PR stewardship and crisis readiness protocol.', bn: 'ধারাবাহিক বার্ষিক জনসংযোগ পরিচালনা ও সংকট প্রস্তুতি সহায়তা।' },
  },
  {
    id: 'client-2',
    name: 'Bengal Telecom & Infrastructure',
    category: 'telecom',
    industry: { en: 'Telecommunications & ICT', bn: 'টেলিযোগাযোগ ও তথ্যপ্রযুক্তি' },
    partnershipYears: 4,
    highlight: { en: 'Full-spectrum media management for next-generation network rollouts.', bn: 'নেটওয়ার্ক সম্প্রসারণে সমন্বিত গণমাধ্যম সংযোগ ও সংবাদ সম্মেলন।' },
  },
  {
    id: 'client-3',
    name: 'CarePlus Healthcare Systems',
    category: 'healthcare',
    industry: { en: 'Healthcare & Life Sciences', bn: 'স্বাস্থ্যসেবা ও ফার্মাসিউটিক্যালস' },
    partnershipYears: 3,
    highlight: { en: 'Scientific breakthroughs PR, medical symposiums, and patient advocacy.', bn: 'চিকিৎসা উদ্ভাবন প্রচার, বৈজ্ঞানিক সম্মেলন ও জনস্বাস্থ্য সংযোগ।' },
  },
  {
    id: 'client-4',
    name: 'Delta Consumer Goods Ltd.',
    category: 'fmcg',
    industry: { en: 'FMCG & Food Processing', bn: 'ভোক্তা পণ্য ও খাদ্য প্রক্রিয়াকরণ' },
    partnershipYears: 6,
    highlight: { en: 'Nationwide consumer brand roadshows and product launch spectacles.', bn: 'দেশব্যাপী ভোক্তা ব্র্যান্ড রোডশো ও বর্ণাঢ্য পণ্য উন্মোচন ইভেন্ট।' },
  },
  {
    id: 'client-5',
    name: 'Renewable Power Bangladesh',
    category: 'energy',
    industry: { en: 'Energy & Heavy Industry', bn: 'জ্বালানি ও ভারী শিল্প' },
    partnershipYears: 3,
    highlight: { en: 'ESG sustainability whitepaper launches and climate diplomacy summits.', bn: 'পরিবেশবান্ধব উদ্যোগের শ্বেতপত্র প্রকাশ ও জলবায়ু নীতি সামিট।' },
  },
  {
    id: 'client-6',
    name: 'South Asian Manufacturing Corp',
    category: 'development',
    industry: { en: 'Export & International Trade', bn: 'রপ্তানি ও আন্তর্জাতিক বাণিজ্য' },
    partnershipYears: 5,
    highlight: { en: 'International buyer communications and compliance reputation defense.', bn: 'আন্তর্জাতিক ক্রেতাদের সাথে প্রাতিষ্ঠানিক যোগাযোগ ও সুনাম সুরক্ষা।' },
  },
  {
    id: 'client-7',
    name: 'Horizon Digital Ventures',
    category: 'telecom',
    industry: { en: 'E-commerce & Digital Platforms', bn: 'ই-কমার্স ও ডিজিটাল সেবা' },
    partnershipYears: 2,
    highlight: { en: 'FinTech investment milestone PR and digital thought leadership.', bn: 'ফিনটেক বিনিয়োগ সংবাদ প্রকাশ ও অনলাইন থট লিডারশিপ প্রতিষ্ঠা।' },
  },
  {
    id: 'client-8',
    name: 'United Development Consortium',
    category: 'development',
    industry: { en: 'NGOs & Multilateral Programs', bn: 'উন্নয়ন সংস্থা ও আন্তর্জাতিক প্রকল্প' },
    partnershipYears: 4,
    highlight: { en: 'Grassroots advocacy narratives and stakeholder impact publications.', bn: 'তৃণমূল উন্নয়ন প্রকল্পের মানবিক গল্প ও অংশীজন প্রতিবেদন।' },
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Apex Holdings Group',
    author: 'Nadeem Chowdhury',
    designation: { en: 'Group Executive Director', bn: 'গ্রুপ এক্সিকিউটিভ ডিরেক্টর' },
    company: 'Apex Holdings Group',
    quote: {
      en: 'In high-stakes corporate PR, integrity and newsroom respect are paramount. Berlo Communications is the only agency in Bangladesh we trust with our most sensitive institutional announcements.',
      bn: 'সংবেদনশীল করপোরেট জনসংযোগে বিশ্বাসযোগ্যতা ও সাংবাদিক মহলের শ্রদ্ধাই মুখ্য। আমাদের সবচেয়ে গুরুত্বপূর্ণ প্রাতিষ্ঠানিক ঘোষণায় বার্লো কমিউনিকেশন্সই আমাদের একমাত্র বিশ্বস্ত সহযোগী।',
    },
    rating: 5,
  },
  {
    id: 'test-2',
    clientName: 'Bengal Telecom & Infrastructure',
    author: 'Farhana Hossain',
    designation: { en: 'Head of Corporate Affairs', bn: 'করপোরেট অ্যাফেয়ার্স প্রধান' },
    company: 'Bengal Telecom & Infrastructure',
    quote: {
      en: 'From the stage production of our nationwide launch to the placement of exclusive front-page interviews, Berlo executes with international discipline. They feel like a natural extension of our leadership team.',
      bn: 'দেশব্যাপী মেগা উদ্বোধনী অনুষ্ঠান পরিচালনা থেকে শুরু করে শীর্ষ জাতীয় দৈনিকে এক্সক্লুসিভ সাক্ষাৎকার প্রকাশ—বার্লো বিশ্বমানের শৃঙ্খলায় কাজ করে। তারা আমাদের টিমেরই অবিচ্ছেদ্য অংশ।',
    },
    rating: 5,
  },
  {
    id: 'test-3',
    clientName: 'South Asian Manufacturing Corp',
    author: 'Engr. M. S. Alam',
    designation: { en: 'Managing Director', bn: 'ব্যবস্থাপনা পরিচালক' },
    company: 'South Asian Manufacturing Corp',
    quote: {
      en: 'When unverified rumors threatened our European export pipeline, Berlo’s rapid crisis triage had our war room operating in 45 minutes. They protected our factory and saved thousands of livelihoods.',
      bn: 'যখন অসত্য তথ্য আমাদের আন্তর্জাতিক রপ্তানিকে ঝুঁকিতে ফেলে দিয়েছিল, তখন বার্লোর ক্রাইসিস টিম ৪৫ মিনিটে সার্বিক পরিস্থিতি নিয়ন্ত্রণে নেয়। তারা আমাদের কারখানা ও হাজারো কর্মীর রুটি-রুজি রক্ষা করেছে।',
    },
    rating: 5,
  },
];


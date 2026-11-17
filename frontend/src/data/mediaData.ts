export interface MediaItem {
  id: string;
  title: { en: string; bn: string };
  outlet: string;
  date: string;
  category: 'interview' | 'press_release' | 'mention' | 'award';
  summary: { en: string; bn: string };
  url?: string;
  sourceType: 'print' | 'broadcast' | 'online';
}

export const mediaData: MediaItem[] = [
  {
    id: 'media-1',
    title: {
      en: 'Berlo Communications Recognized as Top Strategic PR Consultancy at South Asian PR Awards',
      bn: 'দক্ষিণ এশিয়া পিআর অ্যাওয়ার্ডে সেরা কৌশলগত জনসংযোগ সংস্থার স্বীকৃতি পেল বার্লো কমিউনিকেশন্স',
    },
    outlet: 'The Daily Star (Business Edition)',
    date: '2026-09-12',
    category: 'award',
    sourceType: 'print',
    summary: {
      en: 'Dhaka-based communications advisory Berlo Communications Ltd. was commended for its pioneering work in corporate reputation management and crisis mitigation across high-stakes industries.',
      bn: 'সংবেদনশীল শিল্প খাতে সুনামের সুরক্ষা এবং সংকট ব্যবস্থাপনায় বিশেষ অবদানের জন্য মর্যাদাপূর্ণ এই সম্মাননা লাভ করে বার্লো কমিউনিকেশন্স লিমিটেড।',
    },
    url: 'https://example.com/media/berlo-awards',
  },
  {
    id: 'media-2',
    title: {
      en: 'Crisis Management in Volatile Markets: Interview with Shakhawat Ullah',
      bn: 'অস্থিতিশীল বাজারে সংকট ব্যবস্থাপনা: সাখাওয়াত উল্লাহর একান্ত সাক্ষাৎকার',
    },
    outlet: 'The Financial Express',
    date: '2026-08-04',
    category: 'interview',
    sourceType: 'print',
    summary: {
      en: 'Berlo Planning Lead Shakhawat Ullah examines the intersection of digital virality, investigative journalism, and corporate accountability in Bangladesh’s financial sector.',
      bn: 'বার্লোর পরিকল্পনা প্রধান সাখাওয়াত উল্লাহ আর্থিক খাতের সংকট মোকাবিলায় ডিজিটাল গতি, বস্তুনিষ্ঠ সাংবাদিকতা এবং প্রাতিষ্ঠানিক জবাবদিহিতার গুরুত্ব তুলে ধরেন।',
    },
  },
  {
    id: 'media-3',
    title: {
      en: 'Berlo Orchestrates Landmark Next-Gen Telecom Network Summit in Dhaka',
      bn: 'ঢাকায় পরবর্তী প্রজন্মের নেটওয়ার্ক বিষয়ক আন্তর্জাতিক সামিট সফলভাবে সম্পন্ন করল বার্লো',
    },
    outlet: 'Channel 24 Business Desk',
    date: '2026-07-20',
    category: 'press_release',
    sourceType: 'broadcast',
    summary: {
      en: 'A special broadcast report covering the high-tech experiential showcase hosted by Berlo Communications, featuring ministers, international diplomats, and tech titans.',
      bn: 'মন্ত্রী ও কূটনৈতিক প্রতিনিধিদের উপস্থিতিতে বার্লো আয়োজিত প্রযুক্তির মেগা উদ্বোধনী সামিটের ওপর বিশেষ টেলিভিশন প্রতিবেদন।',
    },
  },
  {
    id: 'media-4',
    title: {
      en: 'Public Relations in Bangladesh Is Maturing From Advertising to Boardroom Advisory',
      bn: 'বাংলাদেশে জনসংযোগ এখন আর কেবল বিজ্ঞাপন নয়, এটি এখন নীতি নির্ধারণের অন্যতম স্তম্ভ',
    },
    outlet: 'Prothom Alo (Editorial Feature)',
    date: '2026-05-18',
    category: 'mention',
    sourceType: 'print',
    summary: {
      en: 'Leading daily highlights Berlo Communications’ research into modern stakeholder engagement and how homegrown firms are replacing overseas PR agencies.',
      bn: 'দেশীয় প্রতিষ্ঠানের বিশ্বমানের জনসংযোগ দক্ষতা এবং বোর্ডরুমে স্ট্র্যাটেজিক কমিউনিকেশনের ক্রমবর্ধমান ভূমিকা নিয়ে প্রথম আলোর বিশেষ প্রতিবেদন।',
    },
  },
  {
    id: 'media-5',
    title: {
      en: 'The Ethics of Crisis Communication: Discussion with Md. Kabir Hossain',
      bn: 'জনসংযোগের নৈতিকতা ও সংকট ব্যবস্থাপনা: মোঃ কবির হোসেনের বিশ্লেষণ',
    },
    outlet: 'Dhaka Tribune',
    date: '2026-03-10',
    category: 'interview',
    sourceType: 'print',
    summary: {
      en: 'Senior PR Manager Kabir Hossain discusses why transparency with the press corps is the only durable defense against public misinformation.',
      bn: 'সাংবাদিকদের সাথে সততা ও তথ্যের উন্মুক্ততাই গুজবের বিরুদ্ধে সবচেয়ে স্থায়ী বর্ম—এ বিষয়ে বিস্তারিত মতামত তুলে ধরেন কবির হোসেন।',
    },
  },
];


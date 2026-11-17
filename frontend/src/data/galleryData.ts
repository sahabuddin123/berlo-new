export interface PhotoItem {
  id: string;
  title: {
    en: string;
    bn: string;
  };
  category: {
    en: string;
    bn: string;
  };
  categoryKey: 'events' | 'press' | 'crisis' | 'activation' | 'speaker';
  image: string;
  date: string;
  location: {
    en: string;
    bn: string;
  };
  client?: string;
  description: {
    en: string;
    bn: string;
  };
}

export interface VideoItem {
  id: string;
  title: {
    en: string;
    bn: string;
  };
  category: {
    en: string;
    bn: string;
  };
  categoryKey: 'documentary' | 'press' | 'campaign' | 'keynote';
  youtubeId: string;
  duration: string;
  date: string;
  views: string;
  client: string;
  description: {
    en: string;
    bn: string;
  };
  featured?: boolean;
}

export const photoCategories = [
  { key: 'all', en: 'All Photos', bn: 'সব ছবি' },
  { key: 'events', en: 'Corporate Events & Expos', bn: 'করপোরেট ইভেন্ট ও মেলা' },
  { key: 'press', en: 'Press Conferences & Media', bn: 'প্রেস কনফারেন্স ও মিডিয়া' },
  { key: 'crisis', en: 'Crisis War Rooms', bn: 'ক্রাইসিস ওয়ার রুম' },
  { key: 'activation', en: 'Brand Activations & Galas', bn: 'ব্র্যান্ড অ্যাক্টিভেশন ও গালা' },
  { key: 'speaker', en: 'Speaker Programs & Summits', bn: 'স্পিকার সেশন ও সামিট' },
];

export const photoGalleryItems: PhotoItem[] = [
  {
    id: 'photo-ditf-01',
    title: {
      en: 'Dhaka International Trade Fair — Grand Pavilion Unveiling',
      bn: 'ঢাকা আন্তর্জাতিক বাণিজ্য মেলা — গ্র্যান্ড প্যাভিলিয়ন উদ্বোধন',
    },
    category: {
      en: 'Corporate Events & Expos',
      bn: 'করপোরেট ইভেন্ট ও মেলা',
    },
    categoryKey: 'events',
    image: '/images/berlo/projects/dhaka-trade-fair_1-1.jpg',
    date: 'January 2025',
    location: {
      en: 'Bangabandhu Bangladesh-China Friendship Exhibition Center, Purbachal',
      bn: 'বঙ্গবন্ধু বাংলাদেশ-চীন মৈত্রী প্রদর্শনী কেন্দ্র, পূর্বাচল',
    },
    client: 'Ministry of Commerce & EPB',
    description: {
      en: 'Complete media coverage, dignitary protocol management, and premier PR orchestration for the marquee international pavilion.',
      bn: 'আন্তর্জাতিক প্যাভিলিয়নের জন্য পূর্ণাঙ্গ মিডিয়া কভারেজ, রাষ্ট্রীয় প্রটোকল সমন্বয় এবং কৌশলগত পিআর পরিচালনা।',
    },
  },
  {
    id: 'photo-synova-gala',
    title: {
      en: 'Synova Corporate Excellence Gala & Strategic Launch',
      bn: 'সিনোভা করপোরেট এক্সিলেন্স গালা ও স্ট্র্যাটেজিক লঞ্চ',
    },
    category: {
      en: 'Brand Activations & Galas',
      bn: 'ব্র্যান্ড অ্যাক্টিভেশন ও গালা',
    },
    categoryKey: 'activation',
    image: '/images/berlo/projects/event-management_synova.jpg',
    date: 'November 2024',
    location: {
      en: 'Radisson Blu Dhaka Water Garden, Grand Ballroom',
      bn: 'র‌্যাডিসন ব্লু ঢাকা ওয়াটার গার্ডেন, গ্র্যান্ড বলরুম',
    },
    client: 'Synova Healthcare Group',
    description: {
      en: 'Curated corporate gala, keynote presentations, and high-impact live broadcasting for over 450 industry leaders.',
      bn: '৪৫০+ শীর্ষ শিল্প নেতৃত্বের উপস্থিতিতে সুসংগঠিত করপোরেট গালা ও লাইভ ব্রডকাস্টিং।',
    },
  },
  {
    id: 'photo-crisis-01',
    title: {
      en: 'Industrial Crisis Neutralization — 24/7 Operations War Room',
      bn: 'শিল্প সংকট প্রশমন — ২৪/৭ অপারেশনস ওয়ার রুম',
    },
    category: {
      en: 'Crisis War Rooms',
      bn: 'ক্রাইসিস ওয়ার রুম',
    },
    categoryKey: 'crisis',
    image: '/images/berlo/projects/production-crisis_1.jpg',
    date: 'August 2024',
    location: {
      en: 'Berlo Command Center, Niketon, Dhaka',
      bn: 'বার্লো কমান্ড সেন্টার, নিকেতন, ঢাকা',
    },
    client: 'National Manufacturing Conglomerate',
    description: {
      en: 'Real-time media sentiment tracking, executive messaging alignment, and rapid stakeholder communication response.',
      bn: 'রিয়েল-টাইম মিডিয়া বিশ্লেষণ, নির্বাহী মেসেজিং সমন্বয় ও দ্রুত অংশীজন যোগাযোগ প্রদান।',
    },
  },
  {
    id: 'photo-speaker-01',
    title: {
      en: 'Executive Speaker Series & Economic Policy Dialogue',
      bn: 'এক্সিকিউটিভ স্পিকার সিরিজ ও অর্থনৈতিক পলিসি সংলাপ',
    },
    category: {
      en: 'Speaker Programs & Summits',
      bn: 'স্পিকার সেশন ও সামিট',
    },
    categoryKey: 'speaker',
    image: '/images/berlo/projects/speaker-program_whatsapp-image-2025-07-31-at-195433-b8e9e550.jpg',
    date: 'September 2024',
    location: {
      en: 'InterContinental Dhaka, Crystal Ballroom',
      bn: 'ইন্টারকন্টিনেন্টাল ঢাকা, ক্রিস্টাল বলরুম',
    },
    client: 'Economic Policy Forum',
    description: {
      en: 'Fireside dialogue with senior economists, corporate leaders, and leading broadcast financial journalists.',
      bn: 'অর্থনীতিবিদ, করপোরেট নির্বাহী ও জ্যেষ্ঠ সাংবাদিকদের সমন্বয়ে পলিসি ডায়ালগ অধিবেশন।',
    },
  },
  {
    id: 'photo-ditf-02',
    title: {
      en: 'Trade Pavilion VIP Delegation Walkthrough & Press Meet',
      bn: 'বাণিজ্য প্যাভিলিয়ন ভিআইপি প্রতিনিধি দল পরিদর্শন ও প্রেস মিট',
    },
    category: {
      en: 'Corporate Events & Expos',
      bn: 'করপোরেট ইভেন্ট ও মেলা',
    },
    categoryKey: 'events',
    image: '/images/berlo/projects/dhaka-trade-fair_2-1.jpg',
    date: 'January 2025',
    location: {
      en: 'Purbachal International Convention Centre',
      bn: 'পূর্বাচল আন্তর্জাতিক কনভেনশন সেন্টার',
    },
    client: 'Export Promotion Bureau (EPB)',
    description: {
      en: 'Facilitating international trade delegates, bilateral discussions, and live broadcast interviews.',
      bn: 'আন্তর্জাতিক ব্যবসায়ী প্রতিনিধিদল সমন্বয় ও জাতীয় সম্প্রচারমাধ্যমে সরাসরি সাক্ষাৎকার।',
    },
  },
  {
    id: 'photo-crisis-02',
    title: {
      en: 'Emergency Stakeholder Briefing & Fact-Sheet Distribution',
      bn: 'জরুরি অংশীজন ব্রিফিং ও ফ্যাক্ট-শীট বিতরণ',
    },
    category: {
      en: 'Crisis War Rooms',
      bn: 'ক্রাইসিস ওয়ার রুম',
    },
    categoryKey: 'crisis',
    image: '/images/berlo/projects/production-crisis_2.jpg',
    date: 'August 2024',
    location: {
      en: 'Corporate Headquarters, Motijheel C/A',
      bn: 'করপোরেট সদর দপ্তর, মতিঝিল বা/এ',
    },
    client: 'Industrial Consortium',
    description: {
      en: 'Unified narrative release that contained negative public speculation and preserved market capitalization.',
      bn: 'সঠিক তথ্য পরিবেশনের মাধ্যমে গুজবের অবসান ও প্রাতিষ্ঠানিক সুনাম রক্ষা।',
    },
  },
  {
    id: 'photo-event-07',
    title: {
      en: 'National Brand Leadership Forum & Awards Night',
      bn: 'জাতীয় ব্র্যান্ড লিডারশিপ ফোরাম ও অ্যাওয়ার্ড নাইট',
    },
    category: {
      en: 'Brand Activations & Galas',
      bn: 'ব্র্যান্ড অ্যাক্টিভেশন ও গালা',
    },
    categoryKey: 'activation',
    image: '/images/berlo/projects/event-management_7-1.jpg',
    date: 'December 2024',
    location: {
      en: 'Pan Pacific Sonargaon Dhaka',
      bn: 'প্যান প্যাসিফিক সোনারগাঁও ঢাকা',
    },
    client: 'National Chamber of Commerce',
    description: {
      en: 'Complete end-to-end event conceptualization, stage architecture, VIP protocol, and national media coverage.',
      bn: 'মঞ্চ সজ্জা, ভিআইপি প্রটোকল এবং জাতীয় গণমাধ্যম কভারেজের সমন্বিত বাস্তবায়ন।',
    },
  },
  {
    id: 'photo-speaker-02',
    title: {
      en: 'Future of Corporate Reputation — Keynote Summit',
      bn: 'ফিউচার অব করপোরেট রেপুটেশন — মূল প্রবন্ধ সামিট',
    },
    category: {
      en: 'Speaker Programs & Summits',
      bn: 'স্পিকার সেশন ও সামিট',
    },
    categoryKey: 'speaker',
    image: '/images/berlo/projects/speaker-program_whatsapp-image-2025-07-31-at-195434-56b4a48d.jpg',
    date: 'October 2024',
    location: {
      en: 'Le Méridien Dhaka',
      bn: 'লা মেরিডিয়ান ঢাকা',
    },
    client: 'PR & Corporate Affairs Council',
    description: {
      en: 'Keynote presentation on reputation resilience, AI-era communications, and stakeholder perception engineering.',
      bn: 'কৃত্রিম বুদ্ধিমত্তা যুগে সুনাম সুরক্ষা ও কৌশলগত যোগাযোগ বিষয়ক বিশেষজ্ঞ অধিবেশন।',
    },
  },
  {
    id: 'photo-press-01',
    title: {
      en: 'National Media Roundtable & Press Conference',
      bn: 'জাতীয় গণমাধ্যম গোলটেবিল ও সংবাদ সম্মেলন',
    },
    category: {
      en: 'Press Conferences & Media',
      bn: 'প্রেস কনফারেন্স ও মিডিয়া',
    },
    categoryKey: 'press',
    image: '/images/berlo/consultancy-meeting.png',
    date: 'February 2025',
    location: {
      en: 'National Press Club, VIP Auditorium',
      bn: 'জাতীয় প্রেস ক্লাব, ভিআইপি মিলনায়তন',
    },
    client: 'Fintech Market Disruptor',
    description: {
      en: 'Mobilized accredited journalists from 35 top print and broadcast news outlets for milestone product debut.',
      bn: '৩৫টি শীর্ষস্থানীয় জাতীয় প্রিন্ট ও টেলিভিশন চ্যানেলের সাংবাদিকদের উপস্থিতিতে প্রেস কনফারেন্স।',
    },
  },
  {
    id: 'photo-crisis-05',
    title: {
      en: 'On-Site Factory Floor Risk Assessment & Fact Verification',
      bn: 'কারখানা প্রাঙ্গণে ঝুঁকি নিরীক্ষা ও তথ্য যাচাইকরণ',
    },
    category: {
      en: 'Crisis War Rooms',
      bn: 'ক্রাইসিস ওয়ার রুম',
    },
    categoryKey: 'crisis',
    image: '/images/berlo/projects/production-crisis_5.jpg',
    date: 'September 2024',
    location: {
      en: 'Gazipur Industrial Zone',
      bn: 'গাজীপুর শিল্পাঞ্চল',
    },
    client: 'Heavy Engineering Corporation',
    description: {
      en: 'On-the-ground visual documentation and incident analysis ensuring factual clarity for government authorities.',
      bn: 'সরেজমিনে তথ্য যাচাই, স্বচ্ছ চিত্র ধারণ এবং সংশ্লিষ্ট নিয়ন্ত্রক সংস্থার জন্য রিপোর্ট তৈরি।',
    },
  },
  {
    id: 'photo-ditf-03',
    title: {
      en: 'International Pavilion Technology Showcase',
      bn: 'আন্তর্জাতিক প্যাভিলিয়ন প্রযুক্তি প্রদর্শনী',
    },
    category: {
      en: 'Corporate Events & Expos',
      bn: 'করপোরেট ইভেন্ট ও মেলা',
    },
    categoryKey: 'events',
    image: '/images/berlo/projects/dhaka-trade-fair_3-1.jpg',
    date: 'January 2025',
    location: {
      en: 'Purbachal Pavilion Complex',
      bn: 'পূর্বাচল প্যাভিলিয়ন কমপ্লেক্স',
    },
    client: 'Smart Bangladesh Pavilion Initiative',
    description: {
      en: 'Interactive touch-points, media photo-ops, and live social streaming reaching over 1.2 million digital viewers.',
      bn: 'ইন্টারেক্টিভ টাচপয়েন্ট ও লাইভ ডিজিটাল স্ট্রিমিংয়ের মাধ্যমে ১২ লাখের বেশি দর্শকের কাছে পৌঁছানো।',
    },
  },
  {
    id: 'photo-event-08',
    title: {
      en: 'Celebratory Gala Reception & Stakeholder Networking',
      bn: 'সেলিব্রেটরি গালা রিসেপশন ও অংশীজন নেটওয়ার্কিং',
    },
    category: {
      en: 'Brand Activations & Galas',
      bn: 'ব্র্যান্ড অ্যাক্টিভেশন ও গালা',
    },
    categoryKey: 'activation',
    image: '/images/berlo/projects/event-management_8-1.jpg',
    date: 'December 2024',
    location: {
      en: 'Dhaka Club, Grand Pavilion',
      bn: 'ঢাকা ক্লাব, গ্র্যান্ড প্যাভিলিয়ন',
    },
    client: 'Multinational FMCG Brand',
    description: {
      en: 'Curated evening featuring business luminaries, cultural performances, and strategic corporate networking.',
      bn: 'করপোরেট ব্যক্তিত্ব ও বিশিষ্টজনদের উপস্থিতিতে বর্ণাঢ্য গালা রিসেপশন।',
    },
  },
];

export const videoCategories = [
  { key: 'all', en: 'All Videos', bn: 'সব ভিডিও' },
  { key: 'documentary', en: 'Corporate Documentaries', bn: 'করপোরেট ডকুমেন্টারি' },
  { key: 'press', en: 'Press Briefings & Conferences', bn: 'সংবাদ সম্মেলন ও ব্রিফিং' },
  { key: 'campaign', en: 'Campaign TVCs & Brand Films', bn: 'ক্যাম্পেইন টিভিসি ও ফিল্ম' },
  { key: 'keynote', en: 'Keynote Speeches & Summits', bn: 'কী-নোট বক্তব্য ও সামিট' },
];

export const videoGalleryItems: VideoItem[] = [
  {
    id: 'video-signature-documentary',
    title: {
      en: 'Berlo Communications — Strategic Excellence & Corporate Storytelling',
      bn: 'বার্লো কমিউনিকেশনস — কৌশলগত উৎকর্ষ ও করপোরেট স্টোরিটেলিং',
    },
    category: {
      en: 'Corporate Documentaries',
      bn: 'করপোরেট ডকুমেন্টারি',
    },
    categoryKey: 'documentary',
    youtubeId: '8nees6k5oNk',
    duration: '03:45',
    date: 'October 2024',
    views: '24.5K',
    client: 'Berlo Communications Corporate',
    featured: true,
    description: {
      en: 'A cinematic retrospective highlighting Berlo’s two decades of architecting corporate reputation, navigating high-stakes crises, and elevating brands across Bangladesh.',
      bn: 'বাংলাদেশে দুই দশকের করপোরেট যোগাযোগ, সুনাম বিনির্মাণ ও ক্রাইসিস ম্যানেজমেন্টে বার্লোর অনন্য যাত্রার সিনেমাটিক চিত্রায়ন।',
    },
  },
  {
    id: 'video-press-conference',
    title: {
      en: 'National Press Conference & Media Coverage Broadcast',
      bn: 'জাতীয় সংবাদ সম্মেলন ও টেলিভিশন কভারেজ সম্প্রচার',
    },
    category: {
      en: 'Press Briefings & Conferences',
      bn: 'সংবাদ সম্মেলন ও ব্রিফিং',
    },
    categoryKey: 'press',
    youtubeId: 'FHnfg223H60',
    duration: '04:12',
    date: 'January 2025',
    views: '18.2K',
    client: 'Industrial Conglomerate',
    description: {
      en: 'Full broadcast recording of prime-time television channels covering the strategic investment and expansion announcement.',
      bn: 'কৌশলগত বিনিয়োগ ঘোষণা উপলক্ষে আয়োজিত জাতীয় সংবাদ সম্মেলনের পূর্ণাঙ্গ টেলিভিশন সম্প্রচার।',
    },
  },
  {
    id: 'video-brand-launch',
    title: {
      en: 'Corporate Brand Launch & Stakeholder Gala Summit',
      bn: 'করপোরেট ব্র্যান্ড উন্মোচন ও অংশীজন গালা সামিট',
    },
    category: {
      en: 'Campaign TVCs & Brand Films',
      bn: 'ক্যাম্পেইন টিভিসি ও ফিল্ম',
    },
    categoryKey: 'campaign',
    youtubeId: 'OTClukQmiEw',
    duration: '02:50',
    date: 'November 2024',
    views: '32.1K',
    client: 'Synova Healthcare Group',
    description: {
      en: 'Dynamic audiovisual presentation, grand lighting unveil, and corporate storytelling commemorating new market entry.',
      bn: 'নতুন ব্র্যান্ডের বাজারযাত্রা উপলক্ষে বর্ণাঢ্য উন্মোচন ও ভিজ্যুয়াল স্টোরিটেলিং উপস্থাপনা।',
    },
  },
  {
    id: 'video-crisis-advisory',
    title: {
      en: 'Executive Crisis Advisory & Media Training Workshop',
      bn: 'এক্সিকিউটিভ ক্রাইসিস অ্যাডভাইজরি ও মিডিয়া ট্রেনিং কর্মশালা',
    },
    category: {
      en: 'Keynote Speeches & Summits',
      bn: 'কী-নোট বক্তব্য ও সামিট',
    },
    categoryKey: 'keynote',
    youtubeId: 'osL5z5nCE8M',
    duration: '05:15',
    date: 'September 2024',
    views: '14.8K',
    client: 'Chamber of Commerce Leadership',
    description: {
      en: 'Executive training simulations for corporate spokespersons on handling live media grillings and reputation risk.',
      bn: 'লাইভ ক্যামেরার সামনে করপোরেট মুখপাত্রদের সংকট মোকাবেলা এবং গণমাধ্যম সাক্ষাৎকার বিষয়ক নিবিড় কর্মশালা।',
    },
  },
  {
    id: 'video-trade-fair-activation',
    title: {
      en: 'International Trade Fair & Pavilion Experiential Activation',
      bn: 'আন্তর্জাতিক বাণিজ্য মেলা ও প্যাভিলিয়ন ব্র্যান্ড অভিজ্ঞতা',
    },
    category: {
      en: 'Corporate Documentaries',
      bn: 'করপোরেট ডকুমেন্টারি',
    },
    categoryKey: 'documentary',
    youtubeId: 'r92J1K0zNn0',
    duration: '03:10',
    date: 'February 2025',
    views: '19.4K',
    client: 'Export Promotion Bureau (EPB)',
    description: {
      en: 'Behind-the-scenes and visitor engagement highlights from the largest annual international exhibition in Bangladesh.',
      bn: 'দেশের বৃহত্তম আন্তর্জাতিক বাণিজ্য মেলার প্যাভিলিয়ন ব্যবস্থাপনা ও দর্শনার্থী সম্পৃক্ততার ভিডিও চিত্র।',
    },
  },
  {
    id: 'video-keynote-summit',
    title: {
      en: 'Corporate Leadership Keynote & Annual General Meeting',
      bn: 'করপোরেট লিডারশিপ কী-নোট ও বার্ষিক সাধারণ সভা কভারেজ',
    },
    category: {
      en: 'Keynote Speeches & Summits',
      bn: 'কী-নোট বক্তব্য ও সামিট',
    },
    categoryKey: 'keynote',
    youtubeId: 'uO-1o14gUfU',
    duration: '06:05',
    date: 'December 2024',
    views: '11.3K',
    client: 'Publicly Listed Financial Institution',
    description: {
      en: 'Multi-camera hybrid event broadcast for institutional shareholders, financial analysts, and corporate board members.',
      bn: 'শেয়ারহোল্ডার, আর্থিক বিশ্লেষক ও বোর্ড সদস্যদের অংশগ্রহণে মাল্টি-ক্যামেরা হাইব্রিড ইভেন্ট সম্প্রচার।',
    },
  },
  {
    id: 'video-strategic-campaign',
    title: {
      en: 'Strategic Public Relations Campaign — Vision 2026',
      bn: 'কৌশলগত জনসংযোগ ক্যাম্পেইন — ভিশন ২০২৬',
    },
    category: {
      en: 'Campaign TVCs & Brand Films',
      bn: 'ক্যাম্পেইন টিভিসি ও ফিল্ম',
    },
    categoryKey: 'campaign',
    youtubeId: 'dY8_N0B7H0w',
    duration: '02:35',
    date: 'January 2025',
    views: '28.9K',
    client: 'Renewable Energy Initiative',
    description: {
      en: 'Nationwide advocacy and awareness film demonstrating sustainable infrastructure and clean energy transition.',
      bn: 'টেকসই জ্বালানি রূপান্তর ও পরিবেশবান্ধব অবকাঠামো নিয়ে দেশব্যাপী জনসচেতনতামূলক ক্যাম্পেইন ফিল্ম।',
    },
  },
];

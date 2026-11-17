export interface Article {
  id: string;
  slug: string;
  title: { en: string; bn: string };
  excerpt: { en: string; bn: string };
  category: 'reputation' | 'crisis' | 'media' | 'digital' | 'trends';
  author: { en: string; bn: string };
  authorRole: { en: string; bn: string };
  publishedAt: string;
  readTimeMinutes: number;
  featured: boolean;
  content: {
    en: {
      introduction: string;
      sections: Array<{ heading: string; body: string }>;
      conclusion: string;
      keyTakeaways: string[];
    };
    bn: {
      introduction: string;
      sections: Array<{ heading: string; body: string }>;
      conclusion: string;
      keyTakeaways: string[];
    };
  };
}

export const insightsData: Article[] = [
  {
    id: 'art-1',
    slug: 'navigating-corporate-crises-in-the-hyper-digital-age',
    title: {
      en: 'The First 60 Minutes: Surviving and De-escalating Corporate Crises in South Asia',
      bn: 'প্রথম ৬০ মিনিট: ডিজিটাল যুগে করপোরেট সংকট প্রশমন ও সুনাম সুরক্ষার মূলমন্ত্র',
    },
    excerpt: {
      en: 'How senior leadership teams must adapt their response velocity, factual transparency, and newsroom liaisons when viral misinformation strikes.',
      bn: 'অনলাইনে গুজব বা সংকট সৃষ্টির প্রথম মুহূর্তগুলোতে শীর্ষ নির্বাহীদের প্রতিক্রিয়া গতি ও স্বচ্ছতা কীভাবে সংস্থাকে বিপর্যয় থেকে রক্ষা করে।',
    },
    category: 'crisis',
    author: { en: 'Md. Kabir Hossain', bn: 'মোঃ কবির হোসেন' },
    authorRole: { en: 'Senior Manager, Public Relations', bn: 'সিনিয়র ম্যানেজার, পাবলিক রিলেশনস' },
    publishedAt: '2026-10-15',
    readTimeMinutes: 7,
    featured: true,
    content: {
      en: {
        introduction: 'In the contemporary communications ecosystem of Bangladesh, news no longer travels by the morning paper cycle. It detonates in seconds across WhatsApp groups, social video feeds, and citizen forums. When an operational breakdown, financial allegation, or workplace incident surfaces, the traditional 24-hour response window has shrunk to an unforgiving sixty minutes.',
        sections: [
          {
            heading: '1. The Paralysis of Legal Conservatism',
            body: 'The most fatal mistake corporate boards commit during emerging controversy is "no comment" or silence while corporate legal teams deliberate. In digital communications, silence is never perceived as neutral—it is immediately interpreted by the public and news desks as an admission of culpability. Factual acknowledging statements must be issued immediately.',
          },
          {
            heading: '2. Establishing the Single Source of Truth',
            body: 'When a crisis war-room is activated, internal communications must align before external press encounters occur. Every customer support desk, branch manager, and senior executive must speak from an identical factual briefing deck. Discordant statements from different executives are the primary fuel for investigative journalism.',
          },
          {
            heading: '3. Engaging the Editorial Beat Directly',
            body: 'Responsible journalists do not want to publish unverified sensationalism; they want reliable facts. Direct personal contact with beat reporters and bureau chiefs—providing open, on-the-record access to facilities and data—turns adversarial reporting into fair, objective coverage.',
          },
        ],
        conclusion: 'True corporate resilience is not the absence of trouble; it is the discipline of rapid, honest, and courageous communication when trouble arrives.',
        keyTakeaways: [
          'Acknowledge verified facts within 60 minutes to prevent speculation filling the narrative vacuum.',
          'Never speculate on causes before technical audit confirmation.',
          'Open direct communication channels with senior business editors rather than hiding behind automated press statements.',
        ],
      },
      bn: {
        introduction: 'বর্তমান বাংলাদেশের যোগাযোগ পরিমণ্ডলে খবর আর সকালের পত্রিকার জন্য অপেক্ষা করে না। ফেসবুক, হোয়াটসঅ্যাপ ও অনলাইন পোর্টালে মুহূর্তেই তা ছড়িয়ে পড়ে। কোনো প্রাতিষ্ঠানিক ত্রুটি বা অসত্য তথ্য প্রকাশ পেলে জবাব দেওয়ার চিরাচরিত ২৪ ঘণ্টার সময়সীমা আজ সংকুচিত হয়ে ৬০ মিনিটে নেমে এসেছে।',
        sections: [
          {
            heading: '১. নীরবতার মারাত্মক ঝুঁকি',
            body: 'সংকটের মুহূর্তে করপোরেট বোর্ডগুলোর সবচেয়ে বড় ভুল হলো আইনজীবীদের সাথে ঘণ্টার পর ঘণ্টা পরামর্শ করতে গিয়ে নিশ্চুপ থাকা। ডিজিটাল যোগাযোগে নীরবতাকে কখনোই নিরপেক্ষ মনে করা হয় না; সাধারণ মানুষ ও মিডিয়া একে অপরাধ স্বীকার হিসেবে গণ্য করে। তাই অবিলম্বে প্রাথমিক সত্যনিষ্ঠ বক্তব্য প্রকাশ করা উচিত।',
          },
          {
            heading: '২. তথ্যের একক উৎস নিশ্চিতকরণ',
            body: 'ক্রাইসিস ওয়ার-রুম সক্রিয় হলে সকল বহিরাগত বক্তব্যের ক্ষেত্রে অভ্যন্তরীণ ঐক্য নিশ্চিত করতে হবে। কাস্টমার কেয়ার থেকে শুরু করে সিইও—সকলকে একই সুনির্দিষ্ট তথ্যের ওপর ভিত্তি করে কথা বলতে হবে। পরস্পরবিরোধী বক্তব্যই সংবাদের মূল খোরাক জোগায়।',
          },
          {
            heading: '৩. সাংবাদিকদের সাথে সরাসরি তথ্য আদান-প্রদান',
            body: 'দায়িত্বশীল সাংবাদিকরা কোনো গুজব প্রচার করতে চান না; তাঁরা নির্ভরযোগ্য সত্য চান। শীর্ষ রিপোর্টার ও সম্পাদকদের সাথে দ্রুত যোগাযোগ করে সত্য তুলে ধরলে আক্রমণাত্মক মনোভাব বদলে তথ্যভিত্তিক ও নিরপেক্ষ প্রতিবেদন রচিত হয়।',
          },
        ],
        conclusion: 'প্রকৃত প্রাতিষ্ঠানিক শক্তি সংকটের অনুপস্থিতিতে নয়, বরং সংকটকালে সত্যনিষ্ঠ ও দৃঢ় পদক্ষেপ গ্রহণের সক্ষমতার মধ্যেই নিহিত।',
        keyTakeaways: [
          'অনুমানের অবকাশ বন্ধ করতে ৬০ মিনিটের মধ্যে প্রাথমিক সত্য তথ্য প্রকাশ করুন।',
          'কারিগরি নিরীক্ষা শেষ হওয়ার আগে অনুমানের ওপর ভিত্তি করে কোনো মন্তব্য করবেন না।',
          'প্রেস রিলিজের পেছনে না লুকিয়ে দায়িত্বশীল সাংবাদিকদের সাথে খোলামেলা যোগাযোগ রক্ষা করুন।',
        ],
      },
    },
  },
  {
    id: 'art-2',
    slug: 'the-death-of-generic-press-releases',
    title: {
      en: 'The Death of the Generic Press Release: How Modern Newsrooms Select What Runs',
      bn: 'গতানুগতিক প্রেস রিলিজের সমাপ্তি: আধুনিক নিউজ রুম কীভাবে সংবাদ নির্বাচন করে',
    },
    excerpt: {
      en: 'Why 90% of corporate press releases end up in newsroom recycle bins, and the editorial storytelling techniques that guarantee high-value placement.',
      bn: 'কেন ৯০ শতাংশ করপোরেট প্রেস রিলিজ বাতিল হয়ে যায় এবং সম্পাদকীয় কৌশলে কীভাবে প্রথম সারির প্রকাশনা নিশ্চিত করা যায়।',
    },
    category: 'media',
    author: { en: 'Shakhawat Ullah', bn: 'সাখাওয়াত উল্লাহ' },
    authorRole: { en: 'Planning & Communication Lead', bn: 'পরিকল্পনা ও যোগাযোগ প্রধান' },
    publishedAt: '2026-09-28',
    readTimeMinutes: 5,
    featured: false,
    content: {
      en: {
        introduction: 'Every morning, news editors across national dailies in Dhaka sift through hundreds of unsolicited corporate press releases. The vast majority read like self-congratulatory corporate marketing brochures. Consequently, almost all of them are deleted unread.',
        sections: [
          {
            heading: '1. What Editors Actually Care About',
            body: 'Editors care about macroeconomic relevance, human impact, public interest data, and industry trends. They do not care that a corporation signed an internal agreement or held an internal meeting, unless that event transforms thousands of lives or changes market pricing.',
          },
          {
            heading: '2. Narrative Craftsmanship Over Jargon',
            body: 'Strip away buzzwords like "synergistic", "paradigm shift", and "groundbreaking". Replace them with concrete numbers, real beneficiary quotes, and clear explanations of why this milestone matters to the common citizen.',
          },
        ],
        conclusion: 'When your press releases read like objective journalism written for the public rather than vanity pieces written for your board, newsrooms become your partners.',
        keyTakeaways: [
          'Lead with societal and consumer impact, not internal corporate celebrations.',
          'Provide high-resolution, captioned editorial photography rather than staged ribbon-cuttings.',
          'Respect journalistic editorial deadlines and provide senior executive interview availability.',
        ],
      },
      bn: {
        introduction: 'প্রতিদিন সকালে ঢাকার জাতীয় দৈনিকগুলোর বার্তা সম্পাদকদের ইনবক্সে শত শত করপোরেট প্রেস রিলিজ জমা হয়। যার সিংহভাগই আত্মপ্রচারমূলক বিজ্ঞাপনী বিজ্ঞপ্তির মতো শোনায়। ফলে এর প্রায় সবই না পড়ে ট্র্যাশে ফেলে দেওয়া হয়।',
        sections: [
          {
            heading: '১. সম্পাদকরা আসলে কী চান?',
            body: 'সম্পাদকরা চান জাতীয় অর্থনৈতিক প্রাসঙ্গিকতা, জনস্বার্থের তথ্য, সাধারণ মানুষের ওপর প্রভাব এবং শিল্প খাতের পরিসংখ্যান। কোনো প্রতিষ্ঠানের অভ্যন্তরীণ সমঝোতা স্মারক যদি হাজারো মানুষের জীবনে প্রভাব না ফেলে, তবে তা কোনো জাতীয় সংবাদ হতে পারে না।',
          },
          {
            heading: '২. কঠিন পরিভাষার বদলে সহজ মানবিক ভাষা',
            body: 'অতিরিক্ত ভারি শব্দ এড়িয়ে চলুন। তার বদলে সুনির্দিষ্ট পরিসংখ্যান, প্রত্যক্ষদর্শীর মন্তব্য এবং সাধারণ নাগরিকের কী উপকার হবে তা সহজ ভাষায় বর্ণনা করুন।',
          },
        ],
        conclusion: 'আপনার প্রেস রিলিজ যখন সাধারণ মানুষের স্বার্থে বস্তুনিষ্ঠ সংবাদের মতো লেখা হবে, তখন গণমাধ্যম স্বতঃস্ফূর্তভাবে তা প্রকাশ করবে।',
        keyTakeaways: [
          'প্রতিষ্ঠানের উল্লাসের চেয়ে জনসাধারণের ওপর প্রভাবকে সংবাদের শুরুতে রাখুন।',
          'আনুষ্ঠানিক কাঁচি দিয়ে ফিতা কাটার ছবির বদলে আকর্ষণীয় অ্যাকশন ছবি যুক্ত করুন।',
          'সাংবাদিকদের সময়সীমাকে সম্মান জানিয়ে অবিলম্বে প্রয়োজনীয় তথ্যের নিশ্চয়তা দিন।',
        ],
      },
    },
  },
  {
    id: 'art-3',
    slug: 'esg-sustainability-reporting-bangladesh',
    title: {
      en: 'ESG Beyond Compliance: Transforming Sustainability into Corporate Goodwill',
      bn: 'আইনি বাধ্যবাধকতার ঊর্ধ্বে ইএসজি: পরিবেশবান্ধব উদ্যোগকে করপোরেট সুনামে রূপান্তর',
    },
    excerpt: {
      en: 'Why greenwashing is destroying brand trust and how data-backed environmental transparency creates resilient international enterprise value.',
      bn: 'কেন দায়সারা পরিবেশ সচেতনতা বিশ্বাসযোগ্যতা নষ্ট করে এবং কীভাবে তথ্যভিত্তিক টেকসই উদ্যোগ বৈশ্বিক গ্রহণযোগ্যতা বাড়ায়।',
    },
    category: 'reputation',
    author: { en: 'Kabery Azad', bn: 'কাকেরী আজাদ' },
    authorRole: { en: 'Consultant of Arts & Visual', bn: 'শিল্প ও ভিজ্যুয়াল ডিজাইন পরামর্শক' },
    publishedAt: '2026-08-19',
    readTimeMinutes: 6,
    featured: false,
    content: {
      en: {
        introduction: 'Environmental, Social, and Governance (ESG) frameworks are no longer optional corporate philanthropy in Bangladesh. For export manufacturers, commercial banks, and publicly listed firms, ESG performance is directly linked to borrowing costs and international trade quotas.',
        sections: [
          {
            heading: '1. The Danger of Greenwashing',
            body: 'Consumers and investigative reporters quickly see through token tree-planting ceremonies. Superficial PR stunts that lack verifiable carbon reduction data provoke fierce public cynicism and investigative expose.',
          },
          {
            heading: '2. Publication Design as an Instrument of Truth',
            body: 'An Annual Sustainability Report must not look like an advertising catalogue. It must be structured with international GRI index standards, clear data visualization, and balanced accounts of both progress and remaining challenges.',
          },
        ],
        conclusion: 'Honest sustainability reporting transforms potential compliance vulnerabilities into your most enduring competitive advantage.',
        keyTakeaways: [
          'Tie every sustainability claim to independently auditable metrics.',
          'Highlight ongoing challenges alongside achievements to maintain credibility.',
          'Translate dense environmental data into clear infographics for general audiences.',
        ],
      },
      bn: {
        introduction: 'বাংলাদেশে পরিবেশ, সমাজ ও সুশাসন (ইএসজি) এখন আর নিছক ঐচ্ছিক কোনো দানশীলতা নয়। রপ্তানিমুখী শিল্প, বাণিজ্যিক ব্যাংক এবং তালিকাভুক্ত কোম্পানির ক্ষেত্রে এটি সরাসরি বিনিয়োগ ও আন্তর্জাতিক বাণিজ্যের অপরিহার্য শর্ত।',
        sections: [
          {
            heading: '১. লোকদেখানো পরিবেশবাদিতার বিপদ',
            body: 'দায়সারা বৃক্ষরোপণের ছবি দিয়ে আজ আর কাউকে ভোলানো যায় না। সত্যিকারের কার্বন নিঃসরণ হ্রাসের তথ্য না থাকলে এই ধরণের প্রচার উল্টো প্রতিষ্ঠানের ওপর জনঅসন্তোষ তৈরি করে।',
          },
          {
            heading: '২. সত্য প্রকাশের মাধ্যম হিসেবে ডিজাইন ও প্রকাশনা',
            body: 'একটি টেকসই প্রতিবেদনকে বিজ্ঞাপনী ক্যাটালগের মতো না বানিয়ে আন্তর্জাতিক জিআরআই মানদণ্ড অনুযায়ী সুসংগঠিত করা উচিত, যেখানে সফলতার পাশাপাশি চলমান চ্যালেঞ্জগুলোও সততার সাথে প্রকাশ পাবে।',
          },
        ],
        conclusion: 'স্বচ্ছ ও দায়িত্বশীল ইএসজি রিপোর্ট তৈরি প্রতিষ্ঠানকে আন্তর্জাতিক মহলে সবচেয়ে বিশ্বস্ত অবস্থানে নিয়ে যায়।',
        keyTakeaways: [
          'প্রতিটি দাবির সপক্ষে অডিটযোগ্য পরিসংখ্যান উপস্থাপন করুন।',
          'বিশ্বাসযোগ্যতা রক্ষায় অর্জনের পাশাপাশি চলমান প্রতিবন্ধকতাও তুলে ধরুন।',
          'জটিল পরিবেশগত তথ্যকে সাধারণের জন্য আকর্ষণীয় ইনফোগ্রাফিক্সে উপস্থাপন করুন।',
        ],
      },
    },
  },
];


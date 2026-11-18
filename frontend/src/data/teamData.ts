export interface TeamMember {
  id: string;
  slug: string;
  name: { en: string; bn: string };
  role: { en: string; bn: string };
  department: 'leadership' | 'strategy' | 'pr' | 'events' | 'creative' | 'planning' | 'media';
  departmentLabel?: { en: string; bn: string };
  image?: string;
  isLeadership: boolean;
  order: number;
  experienceYears: number;
  bio: { en: string; bn: string };
  fullBio: { en: string; bn: string };
  expertise: string[];
  education: { en: string; bn: string };
  social: {
    linkedin?: string;
    email?: string;
  };
}

export const teamData: TeamMember[] = [
  {
    id: 'shakhawat-ullah',
    slug: 'shakhawat-ullah',
    name: {
      en: 'Shakhawat Ullah',
      bn: 'সাখাওয়াত উল্লাহ',
    },
    role: {
      en: 'Planning & Communication Lead',
      bn: 'পরিকল্পনা ও যোগাযোগ প্রধান',
    },
    department: 'strategy',
    image: '/images/berlo/team/shakwat-ullah-01.jpg',
    isLeadership: true,
    order: 1,
    experienceYears: 16,
    bio: {
      en: 'Strategic mastermind behind Berlo’s corporate positioning frameworks, guiding C-suite clients through narrative architecture and stakeholder management.',
      bn: 'বার্লোর করপোরেট পজিশনিং ফ্রেমওয়ার্কের মূল রূপকার, যিনি শীর্ষ করপোরেট ক্লায়েন্টদের ন্যারেটিভ আর্কিটেকচার ও অংশীজন ব্যবস্থাপনায় দিকনির্দেশনা দেন।',
    },
    fullBio: {
      en: 'Shakhawat Ullah serves as the Planning & Communication Lead at Berlo Communications Ltd., where he spearheads overall strategic counsel, high-level campaign planning, and corporate reputation initiatives. With over a decade and a half of senior consultancy experience in public affairs and brand communication, Shakhawat has advised multinational corporations, domestic industrial giants, and bilateral trade missions. His methodologies combine rigorous socio-economic analysis with agile narrative engineering.',
      bn: 'সাখাওয়াত উল্লাহ বার্লো কমিউনিকেশন্স লিমিটেডের পরিকল্পনা ও যোগাযোগ প্রধান হিসেবে সামগ্রিক কৌশলগত পরামর্শ, উচ্চপর্যায়ের ক্যাম্পেইন পরিকল্পনা এবং প্রাতিষ্ঠানিক সুনাম সুরক্ষায় নেতৃত্ব দিচ্ছেন। গণসংযোগ ও পাবলিক অ্যাফেয়ার্সে দেড় দশকেরও বেশি অভিজ্ঞতাসম্পন্ন সাখাওয়াত বহুজাতিক প্রতিষ্ঠান, শীর্ষ দেশীয় শিল্প গ্রুপ ও দ্বিপাক্ষিক বাণিজ্য মিশনসমূহে সফলভাবে পরামর্শ প্রদান করেছেন। তাঁর কর্মপদ্ধতি আর্থ-সামাজিক গভীর বিশ্লেষণ এবং ক্ষিপ্র ন্যারেটিভ নির্মাণের এক অনন্য সমন্বয়।',
    },
    expertise: ['Corporate Positioning', 'Reputation Management', 'Stakeholder Engagement', 'Narrative Architecture'],
    education: {
      en: 'M.S. in Mass Communication & Journalism, University of Dhaka',
      bn: 'যোগাযোগ ও সাংবাদিকতায় স্নাতকোত্তর, ঢাকা বিশ্ববিদ্যালয়',
    },
    social: {
      linkedin: 'https://linkedin.com/in/shakhawat-ullah',
      email: 'shakhawat@berlocommunications.com',
    },
  },
  {
    id: 'md-kabir-hossain',
    slug: 'md-kabir-hossain',
    name: {
      en: 'Md. Kabir Hossain',
      bn: 'মোঃ কবির হোসেন',
    },
    role: {
      en: 'Senior Manager, Public Relations',
      bn: 'সিনিয়র ম্যানেজার, পাবলিক রিলেশনস',
    },
    department: 'pr',
    image: '/images/berlo/team/img-20260301-wa0001.jpg',
    isLeadership: true,
    order: 2,
    experienceYears: 14,
    bio: {
      en: 'Senior PR strategist with comprehensive relationships across national newsrooms, editorial boards, and premier broadcast networks.',
      bn: 'জাতীয় নিউজ রুম, সম্পাদকীয় পর্ষদ এবং শীর্ষ টেলিভিশন নেটওয়ার্কের সাথে সুদৃঢ় ও বিশ্বস্ত সংযোগসম্পন্ন অভিজ্ঞ পিআর স্ট্র্যাটেজিস্ট।',
    },
    fullBio: {
      en: 'Md. Kabir Hossain oversees Berlo’s Media Relations, Newsroom Syndication, and Crisis Management operations. Respected across the national press corps for his journalistic integrity and strategic clarity, Kabir ensures that client announcements earn premier editorial placement across Bengali and English dailies, broadcast bulletins, and national wire services. He has successfully navigated dozens of volatile public-interest crises, safeguarding institutional credibility.',
      bn: 'মোঃ কবির হোসেন বার্লোর মিডিয়া রিলেশনস, প্রেস সিন্ডিকেশন এবং ক্রাইসিস ম্যানেজমেন্ট কার্যক্রম পরিচালনা করেন। সাংবাদিক সমাজে তাঁর গ্রহণযোগ্যতা এবং স্বচ্ছ দৃষ্টিভঙ্গির জন্য বিশেষভাবে পরিচিত কবির বাংলা ও ইংরেজি জাতীয় দৈনিক এবং টেলিভিশন বুলেটিনে ক্লায়েন্টদের গুরুত্বপূর্ণ সংবাদ প্রকাশের নিশ্চয়তা প্রদান করেন। তিনি অসংখ্য সংবেদনশীল জনমত সংকটে নেতৃত্ব দিয়ে প্রতিষ্ঠানসমূহের ভাবমূর্তি রক্ষা করেছেন।',
    },
    expertise: ['Media Relations', 'Crisis War-Rooms', 'Press Conferences', 'Investigative Media Tracking'],
    education: {
      en: 'M.A. in Media Studies & Public Relations, Jahangirnagar University',
      bn: 'মিডিয়া স্টাডিজ ও জনসংযোগে এম.এ, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
    },
    social: {
      linkedin: 'https://linkedin.com/in/kabir-hossain-pr',
      email: 'kabir@berlocommunications.com',
    },
  },
  {
    id: 'akm-zamshed-uddin',
    slug: 'akm-zamshed-uddin',
    name: {
      en: 'A K M Zamshed Uddin',
      bn: 'এ কে এম জামশেদ উদ্দিন',
    },
    role: {
      en: 'Events & Activation Lead',
      bn: 'ইভেন্ট ও অ্যাক্টিভেশন প্রধান',
    },
    department: 'events',
    image: '/images/berlo/team/zamshed.png',
    isLeadership: true,
    order: 3,
    experienceYears: 15,
    bio: {
      en: 'Veteran event producer orchestrating high-profile ministerial summits, immersive product unveilings, and countrywide brand roadshows.',
      bn: 'মন্ত্রী পর্যায়ের আন্তর্জাতিক সামিট, আলোড়ন সৃষ্টিকারী পণ্য উন্মোচন এবং দেশব্যাপী রোডশো আয়োজনে দক্ষ ও অভিজ্ঞ ইভেন্ট প্রডিউসার।',
    },
    fullBio: {
      en: 'A K M Zamshed Uddin leads Berlo’s Experiential Activations and Event Production division. Having executed more than 250 large-scale corporate summits, national trade fairs, and minister-level assemblies, Zamshed translates abstract brand concepts into seamless, sensory experiences. His unit is distinguished by flawless timing, uncompromising stagecraft, and integrated media protocol.',
      bn: 'এ কে এম জামশেদ উদ্দিন বার্লোর এক্সপেরিয়েন্সিয়াল অ্যাক্টিভেশন ও ইভেন্ট প্রোডাকশন বিভাগের প্রধান। ২৫০টিরও বেশি বৃহৎ পরিসরের করপোরেট সামিট, বাণিজ্য মেলা এবং মন্ত্রী পর্যায়ের সমাবেশ সফলভাবে পরিচালনার অভিজ্ঞতাসম্পন্ন জামশেদ ব্র্যান্ডের যেকোনো ধারণাকে নিখুঁত ও নান্দনিক বাস্তব রূপ দিতে পারদর্শী। তাঁর বিভাগ সময়নিষ্ঠতা, দৃষ্টিনন্দন মঞ্চ ও মিডিয়া প্রটোকল সমন্বয়ের জন্য সমাদৃত।',
    },
    expertise: ['VIP Protocol Management', 'Mega Stage Production', 'Experiential Marketing', 'Nationwide Activations'],
    education: {
      en: 'B.Sc. in Engineering & Event Infrastructure Management',
      bn: 'ইঞ্জিনিয়ারিং ও ইভেন্ট ইনফ্রাস্ট্রাকচারে বি.এসসি',
    },
    social: {
      linkedin: 'https://linkedin.com/in/zamshed-uddin',
      email: 'zamshed@berlocommunications.com',
    },
  },
  {
    id: 'kabery-azad',
    slug: 'kabery-azad',
    name: {
      en: 'Kabery Azad',
      bn: 'কাকেরী আজাদ',
    },
    role: {
      en: 'Consultant of Arts & Visual Design',
      bn: 'শিল্প ও ভিজ্যুয়াল ডিজাইন পরামর্শক',
    },
    department: 'creative',
    image: '/images/berlo/team/shakhwat-ullah-1.png',
    isLeadership: true,
    order: 4,
    experienceYears: 12,
    bio: {
      en: 'Creative visionary transforming corporate milestones into captivating visual narratives, corporate films, and international publications.',
      bn: 'করপোরেট মাইলফলককে চিত্তাকর্ষক ভিজ্যুয়াল ন্যারেটিভ, প্রাতিষ্ঠানিক প্রামাণ্যচিত্র ও প্রকাশনায় রূপান্তরকারী সৃজনশীল পথপ্রদর্শক।',
    },
    fullBio: {
      en: 'Kabery Azad serves as the Consultant of Arts & Visual at Berlo Communications Ltd., curating the agency’s aesthetic standards, corporate publications, and multimedia documentary productions. An accomplished visual artist and publication designer, Kabery ensures that every Annual Report, ESG sustainability dossier, and brand video communicates elegance, institutional dignity, and emotional resonance.',
      bn: 'কাকেরী আজাদ বার্লো কমিউনিকেশন্স লিমিটেডের শিল্প ও ভিজ্যুয়াল ডিজাইন পরামর্শক হিসেবে এজেন্সির নান্দনিক মানদণ্ড, করপোরেট প্রকাশনা এবং মাল্টিমিডিয়া ডকুমেন্টারি নির্মাণে দিকনির্দেশনা দেন। একজন বিশিষ্ট ভিজ্যুয়াল আর্টিস্ট ও প্রকাশনা ডিজাইনার হিসেবে কাকেরী নিশ্চিত করেন যে প্রতিটি বার্ষিক প্রতিবেদন, ইএসজি প্রকাশনা ও ভিডিও আভিজাত্য, প্রাতিষ্ঠানিক মর্যাদা ও মানবিক অনুভূতির প্রতিফলন ঘটায়।',
    },
    expertise: ['Brand Art Direction', 'Publication Design', 'Corporate Documentaries', 'Visual Identity Architecture'],
    education: {
      en: 'M.F.A. in Graphic Design & Visual Arts, Faculty of Fine Arts, University of Dhaka',
      bn: 'গ্রাফিক ডিজাইন ও ভিজ্যুয়াল আর্টসে এম.এফ.এ, চারুকলা অনুষদ, ঢাকা বিশ্ববিদ্যালয়',
    },
    social: {
      linkedin: 'https://linkedin.com/in/kabery-azad',
      email: 'kabery@berlocommunications.com',
    },
  },
  {
    id: 'tariq-anwar',
    slug: 'tariq-anwar',
    name: {
      en: 'Tariq Anwar',
      bn: 'তারিক আনোয়ার',
    },
    role: {
      en: 'Senior Editorial & Content Strategist',
      bn: 'সিনিয়র এডিটোরিয়াল ও কন্টেন্ট স্ট্র্যাটেজিস্ট',
    },
    department: 'strategy',
    image: '/images/berlo/team/team-tut.jpg',
    isLeadership: false,
    order: 5,
    experienceYears: 10,
    bio: {
      en: 'Former financial journalist authoring high-impact op-eds, white papers, and corporate speechwriting.',
      bn: 'সাবেক বিজনেস জার্নালিস্ট যিনি প্রভাবশালী সম্পাদকীয় প্রবন্ধ, শ্বেতপত্র ও এক্সিকিউটিভ বক্তব্য রচনায় অভিজ্ঞ।',
    },
    fullBio: {
      en: 'Tariq Anwar drives editorial excellence at Berlo, having previously spent seven years as a lead business reporter for a top national daily. His ability to distill complicated market regulations and macroeconomic trends into compelling corporate literature gives Berlo’s clients unmatched editorial authority.',
      bn: 'তারিক আনোয়ার বার্লোর সম্পাদকীয় বিভাগে কাজ করেন। শীর্ষ জাতীয় দৈনিকে সাত বছর বিজনেস রিপোর্টার হিসেবে দায়িত্ব পালনের অভিজ্ঞতা তাঁকে জটিল বাজার নীতি ও অর্থনীতিকে সহজবোধ্য ভাষায় পাঠকের সামনে উপস্থাপনের অনন্য দক্ষতা দিয়েছে।',
    },
    expertise: ['Financial Journalism', 'Corporate Speechwriting', 'White Papers', 'Op-Ed Placement'],
    education: {
      en: 'B.S. in Economics & Public Policy',
      bn: 'অর্থনীতি ও পাবলিক পলিসিতে বি.এস',
    },
    social: {
      linkedin: 'https://linkedin.com/in/tariq-anwar',
      email: 'tariq@berlocommunications.com',
    },
  },
  {
    id: 'shatarupa-das',
    slug: 'shatarupa-das',
    name: {
      en: 'Shatarupa Das',
      bn: 'শতারূপা দাশ',
    },
    role: {
      en: 'Client Engagement & Communications Manager',
      bn: 'ক্লায়েন্ট এনগেজমেন্ট ও যোগাযোগ ব্যবস্থাপক',
    },
    department: 'pr',
    image: '/images/berlo/team/jawad.jpg',
    isLeadership: false,
    order: 6,
    experienceYears: 8,
    bio: {
      en: 'Orchestrating daily stakeholder liaisons, rapid project deliverables, and seamless client communication.',
      bn: 'দৈনন্দিন স্টেকহোল্ডার সমন্বয়, সময়মতো সেবা প্রদান এবং গ্রাহক যোগাযোগে নিবেদিত ব্যবস্থাপক।',
    },
    fullBio: {
      en: 'Shatarupa Das manages client relationships across corporate, telecom, and FMCG accounts. Ensuring frictionless delivery between internal creative teams and client communications directorates, Shatarupa ensures every project milestone is achieved with precision and responsiveness.',
      bn: 'শতারূপা দাশ করপোরেট, টেলিকম ও এফএমসিজি খাতের ক্লায়েন্ট সমন্বয় পরিচালনা করেন। বার্লোর ক্রিয়েটিভ টিমের সাথে ক্লায়েন্টের নিয়মিত যোগাযোগ রক্ষা করে তিনি প্রতিটি প্রকল্পের সার্বিক সাফল্য নিশ্চিত করেন।',
    },
    expertise: ['Account Stewardship', 'Cross-Team Coordination', 'Campaign Roadmapping', 'Client Reporting'],
    education: {
      en: 'B.B.A. in Marketing & Public Relations, North South University',
      bn: 'মার্কেটিং ও পাবলিক রিলেশনসে বি.বি.এ, নর্থ সাউথ বিশ্ববিদ্যালয়',
    },
    social: {
      linkedin: 'https://linkedin.com/in/shatarupa-das',
      email: 'shatarupa@berlocommunications.com',
    },
  },
];


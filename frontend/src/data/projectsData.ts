export interface CaseStudy {
  id: string;
  slug: string;
  title: { en: string; bn: string };
  clientName: string;
  industry: { en: string; bn: string };
  category: 'corporate' | 'crisis' | 'events' | 'digital' | 'brand';
  featured: boolean;
  timeline: string;
  heroMetrics: { value: string; label: { en: string; bn: string } }[];
  overview: { en: string; bn: string };
  challenge: { en: string; bn: string };
  strategy: { en: string; bn: string };
  execution: { en: string; bn: string };
  results: { en: string[]; bn: string[] };
  quote?: {
    text: { en: string; bn: string };
    author: string;
    designation: { en: string; bn: string };
  };
  servicesProvided: string[];
}

export const projectsData: CaseStudy[] = [
  {
    id: 'fintech-reputation-elevation',
    slug: 'fintech-reputation-elevation',
    title: {
      en: 'Nationwide Financial Inclusion Narrative for a Leading Mobile Money Pioneer',
      bn: 'দেশের শীর্ষ মোবাইল আর্থিক সেবাদাতার জন্য দেশব্যাপী আর্থিক অন্তর্ভুক্তি ক্যাম্পেইন',
    },
    clientName: 'Digital Finance Consortium',
    industry: { en: 'FinTech & Banking', bn: 'ফিনটেক ও ব্যাংকিং' },
    category: 'corporate',
    featured: true,
    timeline: '6 Months',
    heroMetrics: [
      { value: '140+', label: { en: 'Front-Page Media Hits', bn: 'প্রথম পাতার সংবাদ প্রকাশ' } },
      { value: '4.8M', label: { en: 'Verified Public Reach', bn: 'প্রত্যক্ষ পাঠক পরিধি' } },
      { value: '92%', label: { en: 'Positive Sentiment Score', bn: 'ইতিবাচক জনমত সূচক' } },
    ],
    overview: {
      en: 'A strategic public relations and thought leadership campaign establishing digital wallets as an engine of rural micro-entrepreneurship and women’s financial independence.',
      bn: 'গ্রামীণ ক্ষুদ্র উদ্যোক্তা ও নারীদের অর্থনৈতিক স্বাবলম্বিতা বৃদ্ধিতে ডিজিটাল ওয়ালেটের গুরুত্ব তুলে ধরতে একটি দেশব্যাপী সমন্বিত জনসংযোগ ও থট লিডারশিপ ক্যাম্পেইন।',
    },
    challenge: {
      en: 'Despite rapid technology rollout, rural consumers harbored skepticism regarding transaction security and hidden fees, while regulatory discussions scrutinized fee structures. The client needed to shift discourse from commercial metrics to grassroots economic empowerment.',
      bn: 'দ্রুত প্রযুক্তি সম্প্রসারণ সত্ত্বেও গ্রামীণ গ্রাহকদের মাঝে নিরাপত্তা ও সার্ভিস চার্জ নিয়ে দ্বিধাদ্বন্দ্ব ছিল এবং নীতিনির্ধারণী পর্যায়ে ফি কাঠামো নিয়ে আলোচনা চলছিল। ক্লায়েন্টের লক্ষ্য ছিল নিছক বাণিজ্যিক হিসেবের বাইরে তৃণমূলের অর্থনৈতিক ক্ষমতায়নকে আলোচনায় নিয়ে আসা।',
    },
    strategy: {
      en: 'Berlo architected an evidence-based storytelling framework centered on "Real Stories of Economic Sovereignty." Rather than broadcasting corporate corporate claims, we partnered with renowned developmental economists to release verifiable data studies, accompanied by human-interest stories in regional daily newspapers.',
      bn: 'বার্লো "অর্থনৈতিক মুক্তির বাস্তব গল্প" থিমে তথ্যভিত্তিক স্টোরিটেলিং ফ্রেমওয়ার্ক তৈরি করে। করপোরেট বিজ্ঞাপনের পরিবর্তে প্রথিতযশা উন্নয়ন অর্থনীতিবিদদের সাথে যৌথ গবেষণার ফলাফল তুলে ধরা হয় এবং আঞ্চলিক ও জাতীয় দৈনিকে বাস্তব জীবনের পরিবর্তন নিয়ে ফিচার প্রকাশ করা হয়।',
    },
    execution: {
      en: 'We convened high-level press roundtables in Dhaka, Chittagong, and Sylhet; placed weekly op-eds in national broadsheets; distributed video micro-documentaries of rural female entrepreneurs across digital platforms; and hosted a minister-level National Financial Inclusion Summit.',
      bn: 'আমরা ঢাকা, চট্টগ্রাম ও সিলেটে সাংবাদিকদের সাথে উচ্চপর্যায়ের পলিসি গোলটেবিল বৈঠক করি; জাতীয় দৈনিকে নিয়মিত অভিমত প্রকাশ করি; সফল নারী উদ্যোক্তাদের ওপর ভিডিও ডকুমেন্টারি প্রকাশ করি এবং মন্ত্রী পর্যায়ের জাতীয় ফিনান্সিয়াল ইনক্লুশন সামিট সফলভাবে সম্পন্ন করি।',
    },
    results: {
      en: [
        'Over 140 dedicated news stories across all major Bengali and English national dailies within six months.',
        'Ministerial commendation in the national parliament acknowledging the sector’s positive contribution to GDP.',
        'Positive brand trust metrics increased by 38% according to third-party brand tracking surveys.',
        'Zero regulatory penalties or hostile policy interventions during the campaign lifecycle.',
      ],
      bn: [
        'ছয় মাসের মধ্যে সকল শীর্ষ বাংলা ও ইংরেজি জাতীয় দৈনিকে ১৪০টিরও বেশি বিশেষ প্রতিবেদন প্রকাশ।',
        'জাতীয় সংসদে জিডিপিতে এই খাতের অবদানের আনুষ্ঠানিক স্বীকৃতি ও প্রশংসা অর্জন।',
        'স্বাধীন জরিপ অনুযায়ী ব্র্যান্ডের ওপর সাধারণ মানুষের আস্থার সূচক ৩৮% বৃদ্ধি।',
        'ক্যাম্পেইন চলাকালীন কোনো ধরনের নীতিগত বা নিয়ন্ত্রণমূলক জটিলতার সম্মুখীন হতে হয়নি।',
      ],
    },
    quote: {
      text: {
        en: 'Berlo’s understanding of the Bangladeshi news ecosystem is unparalleled. They turned complex financial governance into deeply inspiring human stories that shaped national policy discussions.',
        bn: 'বাংলাদেশের গণমাধ্যম জগত সম্পর্কে বার্লোর বোঝাপড়া অতুলনীয়। তারা জটিল আর্থিক নীতিকে অত্যন্ত মানবিক ও অনুপ্রেরণাদায়ী গল্পে রূপান্তর করে জাতীয় পর্যায়ে ইতিবাচক দৃষ্টিভঙ্গি তৈরি করেছে।',
      },
      author: 'A. K. Mahmud',
      designation: { en: 'Chief Corporate Affairs Officer', bn: 'চিফ করপোরেট অ্যাফেয়ার্স অফিসার' },
    },
    servicesProvided: ['Strategic PR & Reputation', 'Media Relations', 'Events & Brand Activations', 'Content Storytelling'],
  },
  {
    id: 'telecom-5g-launch',
    slug: 'telecom-5g-launch',
    title: {
      en: 'Next-Generation Network Infrastructure Reveal & Industry Leadership Positioning',
      bn: 'পরবর্তী প্রজন্মের টেলিকম নেটওয়ার্ক উন্মোচন ও শিল্প নেতৃত্ব সুদৃঢ়করণ',
    },
    clientName: 'Apex Telecom Network',
    industry: { en: 'Telecommunications & ICT', bn: 'টেলিযোগাযোগ ও তথ্যপ্রযুক্তি' },
    category: 'events',
    featured: true,
    timeline: '4 Months',
    heroMetrics: [
      { value: '35+', label: { en: 'Television Bulletins Covered', bn: 'টেলিভিশন সংবাদ সম্প্রচার' } },
      { value: '1,200+', label: { en: 'Industry & Diplomatic Guests', bn: 'শিল্প ও কূটনৈতিক অতিথি' } },
      { value: '100%', label: { en: 'Positive Editorial Sentiment', bn: 'শতভাগ ইতিবাচক সম্পাদকীয়' } },
    ],
    overview: {
      en: 'A multi-phase experiential launch and public affairs strategy showcasing next-generation industrial applications, smart port automation, and telemedicine trials to government stakeholders and the public.',
      bn: 'সরকার, শিল্প খাত এবং সাধারণ মানুষের সামনে স্মার্ট পোর্ট অটোমেশন ও টেলিমেডিসিনের কার্যকারিতা প্রদর্শনপূর্বক পরবর্তী প্রজন্মের নেটওয়ার্ক উন্মোচনে সমন্বিত জনসংযোগ পরিকল্পনা।',
    },
    challenge: {
      en: 'Public discussion was bogged down in technical jargon and debates about infrastructure costs. The client needed a captivating reveal that translated abstract gigabit bandwidth into tangible national progress.',
      bn: 'প্রযুক্তিগত জটিল পরিভাষা এবং অবকাঠামো ব্যয়ের বিতর্কে মূল অগ্রগতি ঢাকা পড়ে যাচ্ছিল। ক্লায়েন্টের লক্ষ্য ছিল বিমূর্ত প্রযুক্তিকে সাধারণ মানুষের জীবনমান ও জাতীয় উন্নয়নের সাথে যুক্ত করে তুলে ধরা।',
    },
    strategy: {
      en: 'Berlo developed the concept "Connecting Tomorrow’s Bangladesh Today." We positioned the launch not as a corporate hardware update, but as a sovereign digital milestone essential for international industrial competitiveness.',
      bn: 'বার্লো "ভবিষ্যতের বাংলাদেশের সাথে আজকের সংযোগ" শীর্ষক মূল ভাবনা প্রণয়ন করে। আমরা এই আয়োজনকে নিছক বাণিজ্যিক উদ্বোধন হিসেবে নয়, বরং জাতীয় অর্থনৈতিক প্রতিযোগিতা সক্ষমতা বৃদ্ধির এক ঐতিহাসিক মাইলফলক হিসেবে উপস্থাপন করি।',
    },
    execution: {
      en: 'Staged an immersive experiential summit at a premier international venue in Dhaka, featuring interactive holographic displays, a live robotic surgery demonstration via remote link, and coordinated a simultaneous live broadcast across 6 national TV networks with 75 credentialed journalists in attendance.',
      bn: 'রাজধানীর শীর্ষ আন্তর্জাতিক ভেন্যুতে ইন্টারঅ্যাক্টিভ হলোগ্রাফিক ডিসপ্লে ও দূরবর্তী রোবটিক সার্জারির সরাসরি প্রদর্শনীসহ বর্ণাঢ্য সামিট আয়োজন; ৬টি জাতীয় চ্যানেলে সরাসরি সম্প্রচার এবং ৭৫ জন বিশিষ্ট সাংবাদিকের প্রত্যক্ষ উপস্থিতি নিশ্চিতকরণ।',
    },
    results: {
      en: [
        'Live TV coverage across 14 channels during evening prime-time bulletins.',
        'Front-page color photographs and editorial features in 18 national daily newspapers.',
        'Direct praise from attending ministry officials and international trade commissioners.',
        'Viral social media reach exceeding 12 million impressions across Bangladesh.',
      ],
      bn: [
        'সন্ধ্যার প্রাইম-টাইম বুলেটিনে ১৪টি টেলিভিশন চ্যানেলে সরাসরি এবং প্রধান সংবাদ হিসেবে সম্প্রচার।',
        '১৮টি জাতীয় দৈনিক পত্রিকার প্রথম পাতায় রঙিন ছবিসহ বিশেষ প্রতিবেদন প্রকাশ।',
        'অনুষ্ঠানে উপস্থিত মন্ত্রী ও আন্তর্জাতিক বাণিজ্য প্রতিনিধিদের পক্ষ থেকে ভূয়সী প্রশংসা লাভ।',
        'সোশ্যাল মিডিয়ায় ১ কোটি ২০ লক্ষেরও বেশি মানুষের কাছে ইতিবাচক প্রচার ও ভিডিও ভিউ।',
      ],
    },
    quote: {
      text: {
        en: 'The precision and dignity of the event production matched world-class standards. Berlo made sure our technological leadership was undeniable.',
        bn: 'অনুষ্ঠান ব্যবস্থাপনার নির্ভুলতা এবং আভিজাত্য আন্তর্জাতিক মানকে স্পর্শ করেছে। বার্লো আমাদের প্রযুক্তিগত নেতৃত্বকে প্রশ্নাতীতভাবে তুলে ধরেছে।',
      },
      author: 'Farhana Hossain',
      designation: { en: 'Head of External Communications', bn: 'এক্সটার্নাল কমিউনিকেশনস প্রধান' },
    },
    servicesProvided: ['Events & Brand Activations', 'Media Relations', 'Visual & Digital Storytelling'],
  },
  {
    id: 'industrial-crisis-resolution',
    slug: 'industrial-crisis-resolution',
    title: {
      en: 'High-Stakes Industrial Safety Misinformation Neutralization & Trust Restoration',
      bn: 'শিল্প প্রতিষ্ঠানের নিরাপত্তা সম্পর্কিত অসত্য তথ্য নিরসন ও আস্থা পুনরুদ্ধার',
    },
    clientName: 'South Asian Manufacturing Group',
    industry: { en: 'Manufacturing & Export', bn: 'উৎপাদন ও রপ্তানি শিল্প' },
    category: 'crisis',
    featured: true,
    timeline: '3 Weeks Intensive + 3 Months Recovery',
    heroMetrics: [
      { value: '45m', label: { en: 'Crisis Command Mobilization', bn: 'ওয়ার রুম চালুর সময়' } },
      { value: '100%', label: { en: 'Correction of False Reports', bn: 'অসত্য সংবাদের প্রত্যাহার' } },
      { value: 'Zero', label: { en: 'International Buyer Cancellations', bn: 'আন্তর্জাতিক ক্রয়াদেশ বাতিল প্রতিরোধ' } },
    ],
    overview: {
      en: 'A rapid-response crisis containment operation neutralizing unverified digital rumors regarding workplace safety that threatened multi-million-dollar European export contracts.',
      bn: 'ইউরোপীয় ক্রেতাদের কোটি ডলারের রপ্তানি আদেশ ঝুঁকিতে ফেলে দেওয়া একটি বানোয়াট কারখানা নিরাপত্তা গুজবের বিরুদ্ধে দ্রুত ও কার্যকর ক্রাইসিস রেসপন্স অপারেশন।',
    },
    challenge: {
      en: 'A sensationalized and factually incorrect social media video alleging unsafe working conditions went viral, triggering inquiries from major international apparel brands and labor watchdog associations within 12 hours.',
      bn: 'একটি অপ্রমাণিত সোশ্যাল মিডিয়া ভিডিওতে কারখানার নিরাপত্তা নিয়ে অসত্য তথ্য ছড়িয়ে পড়লে ১২ ঘণ্টার মধ্যে আন্তর্জাতিক ব্র্যান্ড ও শ্রমিক অধিকার সংগঠনগুলো তদন্ত শুরু করে।',
    },
    strategy: {
      en: 'Establish radical factual transparency immediately. Rather than defensive legal statements, Berlo advised the client to open factory doors to a hand-picked delegation of senior investigative labor journalists and international compliance auditors within 24 hours.',
      bn: 'তাৎক্ষণিকভাবে পূর্ণাঙ্গ সত্য প্রকাশের কৌশল গ্রহণ। আত্মরক্ষামূলক আইনি বিবৃতির বদলে বার্লো ২৪ ঘণ্টার মধ্যে শীর্ষ অনুসন্ধানী সাংবাদিক ও আন্তর্জাতিক অডিটরদের সরাসরি কারখানা পরিদর্শনের পরামর্শ দেয়।',
    },
    execution: {
      en: 'Activated an emergency war room in Niketon, produced a timestamped live video walkthrough verified by independent engineers, released a comprehensive factual dossier to European trade desks, and facilitated one-on-one briefings with key editorial heads.',
      bn: 'নিকেতন কার্যালয়ে জরুরি ক্রাইসিস ওয়ার-রুম স্থাপন, নিরপেক্ষ ইঞ্জিনিয়ারদের উপস্থিতিতে লাইভ ভিডিও তৈরি, আন্তর্জাতিক ক্রেতাদের কাছে পূর্ণাঙ্গ নথিপত্র প্রেরণ এবং শীর্ষ সম্পাদকদের সাথে সরাসরি তথ্য বিনিময়।',
    },
    results: {
      en: [
        'False claims retracted by all mainstream news organizations within 48 hours.',
        '100% of international purchase orders maintained without a single cancellation.',
        'European buyer consortium issued a formal statement affirming compliance satisfaction.',
        'Subsequent long-term ESG transparency feature published in leading business periodicals.',
      ],
      bn: [
        '৪৮ ঘণ্টার মধ্যে সকল মূলধারার সংবাদমাধ্যমে অসত্য তথ্যের সংশোধন ও প্রত্যাহার নিশ্চিতকরণ।',
        'একটিও ক্রয়াদেশ বাতিল না হয়ে শতভাগ আন্তর্জাতিক রফতানি অর্ডার সুরক্ষা।',
        'ইউরোপীয় ক্রেতা জোটের পক্ষ থেকে কারখানার কমপ্লায়েন্স ও নিরাপত্তায় সন্তুষ্টি প্রকাশ।',
        'পরবর্তীতে শীর্ষ ব্যবসা সাময়িকীতে প্রতিষ্ঠানের দীর্ঘমেয়াদী পরিবেশ ও কল্যাণমুখী উদ্যোগ নিয়ে প্রশংসাসূচক ফিচার প্রকাশ।',
      ],
    },
    quote: {
      text: {
        en: 'In our darkest corporate hour, Berlo was our anchor. Their calm, ethical, and immediate strategic counsel protected our livelihoods and our international credibility.',
        bn: 'আমাদের চরম সংকটময় মুহূর্তে বার্লো ছিল পরম ভরসা। তাদের শান্ত, সময়োপযোগী ও নৈতিক পরামর্শ আমাদের বৈশ্বিক সুনাম ও হাজারো কর্মীর কর্মসংস্থান রক্ষা করেছে।',
      },
      author: 'Engr. M. S. Alam',
      designation: { en: 'Managing Director', bn: 'ব্যবস্থাপনা পরিচালক' },
    },
    servicesProvided: ['Crisis Communication & Issues Advisory', 'Media Relations', 'Strategic PR'],
  },
  {
    id: 'fmcg-consumer-roadshow',
    slug: 'fmcg-consumer-roadshow',
    title: {
      en: 'Nationwide Healthy Nutrition Advocacy & Experiential Brand Roadshow',
      bn: 'সুস্থ পুষ্টি সচেতনতায় দেশব্যাপী ব্র্যান্ড অ্যাক্টিভেশন ও রোডশো',
    },
    clientName: 'Bengal Dairy & Nutrition Ltd.',
    industry: { en: 'FMCG & Consumer Goods', bn: 'এফএমসিজি ও ভোক্তা পণ্য' },
    category: 'brand',
    featured: false,
    timeline: '3 Months',
    heroMetrics: [
      { value: '8', label: { en: 'Divisional Cities Activated', bn: 'বিভাগীয় শহরে সক্রিয় কর্মসূচি' } },
      { value: '45,000+', label: { en: 'Direct Consumer Samplings', bn: 'সরাসরি পণ্য আস্বাদন' } },
      { value: '62+', label: { en: 'District Media Placements', bn: 'জেলা পর্যায়ের সংবাদ কাভারেজ' } },
    ],
    overview: {
      en: 'An integrated public health advocacy campaign and 8-division consumer roadshow educating mothers on childhood micronutrient density while re-energizing brand perception.',
      bn: 'শিশুদের পুষ্টি নিশ্চিতকরণে মায়েদের সচেতন করতে ৮টি বিভাগীয় শহরে পরিচালিত জনস্বাস্থ্য সচেতনতামূলক ক্যাম্পেইন ও রোডশো।',
    },
    challenge: {
      en: 'The fortified milk category was crowded with misleading claims, resulting in consumer cynicism. The brand needed an educational initiative that built authentic grassroots credibility.',
      bn: 'বাজারে পুষ্টি বিষয়ক অতিরঞ্জিত দাবির কারণে সাধারণ ভোক্তাদের মধ্যে এক ধরণের সংশয় তৈরি হয়েছিল। ব্র্যান্ডটির এমন একটি উদ্যোগের প্রয়োজন ছিল যা চিকিৎসকদের আস্থা অর্জন করতে পারে।',
    },
    strategy: {
      en: 'Collaborate with pediatric nutritionists to create the "Golden Growth Initiative," combining clinical credibility with joyful family community events in municipal centers.',
      bn: 'শিশু পুষ্টিবিদদের সাথে যৌথভাবে "সোনালী বিকাশ উদ্যোগ" গড়ে তোলা, যা বিজ্ঞাপনী প্রচারের পরিবর্তে প্রামাণ্য স্বাস্থ্য পরামর্শ ও পারিবারিক অনুষ্ঠানের রূপ নেয়।',
    },
    execution: {
      en: 'Designed interactive mobile nutrition clinics, hosted free doctor consultations in schools, staged press meets in every divisional capital, and engaged verified medical influencers for digital Q&A sessions.',
      bn: 'ভ্রাম্যমাণ পুষ্টি ক্লিনিক পরিচালনা, স্কুলে বিনামূল্যে চিকিৎসকদের পরামর্শ ক্যাম্প, প্রতিটি বিভাগীয় শহরে স্থানীয় সাংবাদিকদের সাথে মতবিনিময় এবং বিশিষ্ট চিকিৎসকদের অংশগ্রহণে ডিজিটাল প্রশ্নোত্তর পর্ব আয়োজন।',
    },
    results: {
      en: [
        'Engaged over 45,000 mothers directly across 8 divisional hubs.',
        'Over 60 dedicated news stories published in prominent regional and national print media.',
        'Sales volume in suburban test markets surged by 24% over the campaign quarter.',
      ],
      bn: [
        '৮টি বিভাগীয় কেন্দ্রে ৪৫,০০০-এর বেশি মায়ের সাথে সরাসরি স্বাস্থ্য সংলাপ ও সচেতনতা সৃষ্টি।',
        'আঞ্চলিক ও জাতীয় দৈনিকে ৬০টিরও বেশি ইতিবাচক স্বাস্থ্য প্রতিবেদন প্রকাশ।',
        'ক্যাম্পেইন চলাকালীন ত্রৈমাসিকে নির্বাচিত বাজারে পণ্য বিক্রি ২৪% বৃদ্ধি।',
      ],
    },
    servicesProvided: ['Events & Brand Activations', 'Digital PR & Influencers', 'Media Relations'],
  },
  {
    id: 'healthcare-scientific-pr',
    slug: 'healthcare-scientific-pr',
    title: {
      en: 'Oncology Care Breakthrough Announcement & Patient Support Initiative',
      bn: 'ক্যান্সার চিকিৎসায় যুগান্তকারী সেবা উদ্বোধন ও রোগী সহায়তা কর্মসূচি',
    },
    clientName: 'CarePlus Specialty Hospitals',
    industry: { en: 'Healthcare & Life Sciences', bn: 'স্বাস্থ্যসেবা ও ফার্মাসিউটিক্যালস' },
    category: 'corporate',
    featured: false,
    timeline: '2 Months',
    heroMetrics: [
      { value: '28', label: { en: 'Medical Journals & Press Stories', bn: 'চিকিৎসা সাময়িকী ও জাতীয় প্রতিবেদন' } },
      { value: '3.1M', label: { en: 'Digital Awareness Footprint', bn: 'ডিজিটাল সচেতনতা বিস্তার' } },
      { value: '450+', label: { en: 'Initial Patient Inquiries', bn: 'প্রাথমিক পরামর্শ অনুসন্ধান' } },
    ],
    overview: {
      en: 'A compassionate, ethically rigorous communications roll-out introducing advanced precision oncology radiotherapy to Bangladesh, drastically reducing the need for treatment abroad.',
      bn: 'বাংলাদেশে প্রথমবারের মতো সর্বাধুনিক রেডিয়েশন থেরাপি সেবা চালুর আনুষ্ঠানিক ঘোষণা, যা চিকিৎসার জন্য বিদেশে যাওয়ার প্রয়োজনীয়তা হ্রাস করেছে।',
    },
    challenge: {
      en: 'Medical communications in Bangladesh face strict regulatory boundaries regarding commercial promotion, while public anxiety about cancer treatment costs remains acute.',
      bn: 'চিকিৎসা সংক্রান্ত বিজ্ঞাপনে দেশে কঠোর নীতিমালা বিদ্যমান, পাশাপাশি ক্যান্সারের চিকিৎসা ব্যয় নিয়ে সাধারণ মানুষের মধ্যে গভীর উদ্বেগ ও সংশয় কাজ করে।',
    },
    strategy: {
      en: 'Center the campaign on scientific milestone documentation and patient financial accessibility counseling, positioning the hospital as a national healthcare asset.',
      bn: 'বাণিজ্যিক প্রচারণার পরিবর্তে বৈজ্ঞানিক সাফল্য এবং রোগী সহায়তা তহবিলের তথ্য সামনে এনে প্রতিষ্ঠানটিকে দেশের এক অনন্য চিকিৎসালয় হিসেবে তুলে ধরা।',
    },
    execution: {
      en: 'Hosted a scientific symposium with top oncologists and medical beat journalists, published documentary testimonials of survivor journeys, and established a transparent patient advisory helpline.',
      bn: 'শীর্ষ ক্যান্সার বিশেষজ্ঞ ও হেলথ রিপোর্টারদের উপস্থিতিতে বৈজ্ঞানিক সিম্পোজিয়াম আয়োজন, ক্যান্সারজয়ীদের সত্য গল্প নিয়ে তথ্যচিত্র নির্মাণ এবং ডেডিকেটেড হেল্পলাইন প্রতিষ্ঠা।',
    },
    results: {
      en: [
        'Wide coverage across all major medical journalists’ network.',
        'Established hospital as the premier oncology referral destination in Bangladesh.',
        'Substantially shifted narrative from foreign medical dependency to domestic excellence.',
      ],
      bn: [
        'দেশের সকল শীর্ষ স্বাস্থ্য সাংবাদিকদের মাধ্যমে বিস্তারিত ও নির্ভরযোগ্য সংবাদ প্রকাশ।',
        'প্রতিষ্ঠানটিকে দেশের শীর্ষস্থানীয় ক্যান্সার চিকিৎসাকেন্দ্র হিসেবে সুপ্রতিষ্ঠিত করা।',
        'চিকিৎসার জন্য বিদেশে যাওয়ার প্রবণতা রোধে ইতিবাচক জাতীয় দৃষ্টিভঙ্গি তৈরি।',
      ],
    },
    servicesProvided: ['Strategic PR & Reputation', 'Content Storytelling', 'Media Relations'],
  },
  {
    id: 'esg-sustainability-summit',
    slug: 'esg-sustainability-summit',
    title: {
      en: 'Green Energy Transition Summit & Climate Governance Whitepaper Launch',
      bn: 'সবুজ জ্বালানি রূপান্তর সামিট ও জলবায়ু নীতি শ্বেতপত্র প্রকাশ',
    },
    clientName: 'Renewable Power Bangladesh',
    industry: { en: 'Energy & Infrastructure', bn: 'জ্বালানি ও অবকাঠামো' },
    category: 'corporate',
    featured: false,
    timeline: '5 Months',
    heroMetrics: [
      { value: '450+', label: { en: 'Delegates & Policymakers', bn: 'প্রতিনিধি ও নীতিনির্ধারক' } },
      { value: '18', label: { en: 'Foreign Embassy Missions', bn: 'আন্তর্জাতিক দূতাবাস উপস্থিতি' } },
      { value: '25+', label: { en: 'Policy Recommendations Adopted', bn: 'গৃহীত নীতিগত সুপারিশ' } },
    ],
    overview: {
      en: 'A strategic public affairs and climate diplomacy initiative positioning private sector solar infrastructure as the critical catalyst for achieving national green grid targets.',
      bn: 'জাতীয় নবায়নযোগ্য জ্বালানি লক্ষ্যমাত্রা অর্জনে বেসরকারি সৌর বিদ্যুৎ খাতের গুরুত্বপূর্ণ অবদান তুলে ধরে আয়োজিত বিশেষ পলিসি সামিট।',
    },
    challenge: {
      en: 'Public perception viewed renewable energy as slow and commercially unviable compared to fossil fuels, while policy bottlenecks hindered private grid investments.',
      bn: 'নবায়নযোগ্য শক্তিকে ধীরগতির এবং বাণিজ্যিকভাবে অলাভজনক মনে করা হচ্ছিল, এবং বিভিন্ন নীতিগত জটিলতার কারণে বেসরকারি বিনিয়োগ ব্যাহত হচ্ছিল।',
    },
    strategy: {
      en: 'Publish an empirical economic whitepaper co-authored with international energy economists, demonstrating that every dollar invested in solar saves double in foreign currency reserves.',
      bn: 'আন্তর্জাতিক জ্বালানি অর্থনীতিবিদদের সহযোগিতায় একটি তথ্যবহুল শ্বেতপত্র প্রণয়ন, যা দেখায় যে সৌর বিদ্যুতে প্রতিটি ডলার বিনিয়োগ বৈদেশিক মুদ্রার রিজার্ভ সুরক্ষিত করে।',
    },
    execution: {
      en: 'Convened the National Green Power Assembly at a high-security diplomatic venue in Dhaka, facilitated keynote addresses by climate envoys, and curated an editorial series in leading business dailies.',
      bn: 'ঢাকায় শীর্ষ কূটনৈতিক ভেন্যুতে জাতীয় গ্রিন পাওয়ার অ্যাসেম্বলি আহ্বান, জলবায়ু বিশেষজ্ঞদের বিশেষ সেশন এবং দেশের শীর্ষ ব্যবসায়িক দৈনিকগুলোতে ধারাবাহিক কলাম প্রকাশ।',
    },
    results: {
      en: [
        'Government energy committee incorporated 6 key recommendations into the draft national energy policy.',
        'Over 80 dedicated press articles covering solar grid viability in mainstream national dailies.',
        'Client secured multi-lateral development bank financing based on elevated profile and transparent governance.',
      ],
      bn: [
        'সরকারের জ্বালানি স্থায়ী কমিটি জাতীয় বিদ্যুৎ নীতির খসড়ায় সংস্থার ৬টি মূল সুপারিশ অন্তর্ভুক্ত করে।',
        'মূলধারার জাতীয় দৈনিকে নবায়নযোগ্য জ্বালানির কার্যকারিতা নিয়ে ৮০টিরও বেশি গবেষণামূলক প্রবন্ধ প্রকাশ।',
        'বর্ধিত সুনাম ও স্বচ্ছতার ভিত্তিতে আন্তর্জাতিক উন্নয়ন ব্যাংক থেকে উল্লেখযোগ্য অর্থায়ন প্রাপ্তি।',
      ],
    },
    servicesProvided: ['Strategic PR & Reputation', 'Events & Brand Activations', 'Content Storytelling'],
  },
];


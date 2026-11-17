export interface ServiceItem {
  id: string;
  slug: string;
  iconName: string;
  title: { en: string; bn: string };
  tagline: { en: string; bn: string };
  shortDesc: { en: string; bn: string };
  overview: { en: string; bn: string };
  strategicApproach: { en: string; bn: string };
  capabilities: Array<{
    title: { en: string; bn: string };
    desc: { en: string; bn: string };
  }>;
  benefits: Array<{ en: string; bn: string }>;
  keyMetrics: Array<{
    value: string;
    label: { en: string; bn: string };
  }>;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'strategic-pr',
    slug: 'strategic-pr',
    iconName: 'ShieldCheck',
    title: {
      en: 'Strategic PR & Corporate Reputation',
      bn: 'কৌশলগত জনসংযোগ ও করপোরেট সুনাম',
    },
    tagline: {
      en: 'Shielding corporate credibility and commanding industry authority.',
      bn: 'করপোরেট গ্রহণযোগ্যতা রক্ষা ও শিল্প কর্তৃত্বে সুদৃঢ় অবস্থান।',
    },
    shortDesc: {
      en: 'Comprehensive corporate positioning, executive profile elevation, and stakeholder trust architecture for market leaders.',
      bn: 'বাজারের শীর্ষ প্রতিষ্ঠানের জন্য পূর্ণাঙ্গ করপোরেট পজিশনিং, নির্বাহী প্রোফাইল উন্নয়ন এবং অংশীজনদের আস্থা বিনির্মাণ।',
    },
    overview: {
      en: 'In high-growth competitive landscapes, public perception is a decisive commercial asset. Berlo builds institutional credibility through structured stakeholder engagement, governance communications, and sustained corporate storytelling that aligns with business milestones.',
      bn: 'তীব্র প্রতিযোগিতামূলক বাজারে ইতিবাচক জনমত এক অনন্য বাণিজ্যিক সম্পদ। বার্লো কাঠামোগত অংশীজন সম্পৃক্ততা, সুশাসন যোগাযোগ এবং ব্যবসায়িক মাইলফলকের সাথে সামঞ্জস্যপূর্ণ করপোরেট স্টোরিটেলিংয়ের মাধ্যমে প্রাতিষ্ঠানিক গ্রহণযোগ্যতা প্রতিষ্ঠা করে।',
    },
    strategicApproach: {
      en: 'We dissect organizational DNA, map key decision-makers and influencers, and engineer authoritative narrative frameworks that position your enterprise as an indispensable pioneer in its sector.',
      bn: 'আমরা প্রতিষ্ঠানের অভ্যন্তরীণ শক্তি বিশ্লেষণ করি, মূল নীতিনির্ধারক ও ইনফ্লুয়েন্সারদের চিহ্নিত করি এবং এমন প্রামাণ্য ন্যারেটিভ তৈরি করি যা আপনার সংস্থাকে সংশ্লিষ্ট খাতের অপরিহার্য অগ্রদূত হিসেবে প্রতিষ্ঠিত করে।',
    },
    capabilities: [
      {
        title: { en: 'Corporate Identity & Positioning', bn: 'করপোরেট পরিচিতি ও পজিশনিং' },
        desc: {
          en: 'Articulating corporate vision, ESG milestones, and leadership differentiation for investors and regulatory bodies.',
          bn: 'বিনিয়োগকারী ও নিয়ন্ত্রক সংস্থার জন্য প্রাতিষ্ঠানিক ভিশন, ইএসজি মাইলফলক এবং নেতৃত্বের স্বাতন্ত্র্য তুলে ধরা।',
        },
      },
      {
        title: { en: 'Executive Thought Leadership', bn: 'এক্সিকিউটিভ থট লিডারশিপ' },
        desc: {
          en: 'Bespoke advisory positioning C-suite leaders as authoritative commentators on major industry developments.',
          bn: 'শিল্পের গুরুত্বপূর্ণ অগ্রযাত্রায় সি-সুইট কর্মকর্তাদের প্রামাণ্য বিশ্লেষক হিসেবে প্রতিষ্ঠিত করার কৌশলগত পরামর্শ।',
        },
      },
      {
        title: { en: 'Stakeholder & Investor Relations', bn: 'অংশীজন ও বিনিয়োগকারী যোগাযোগ' },
        desc: {
          en: 'Structured financial disclosures, annual report narratives, and investor conference communications.',
          bn: 'কাঠামোগত আর্থিক তথ্য প্রকাশ, বার্ষিক প্রতিবেদনের গল্প এবং বিনিয়োগকারী সম্মেলন সংক্রান্ত যোগাযোগ।',
        },
      },
      {
        title: { en: 'Internal Culture & Change Communications', bn: 'অভ্যন্তরীণ সংস্কৃতি ও রূপান্তর যোগাযোগ' },
        desc: {
          en: 'Ensuring seamless employee alignment during mergers, leadership transitions, and operational restructuring.',
          bn: 'একীভূতকরণ, নেতৃত্ব পরিবর্তন ও অপারেশনাল রূপান্তরের সময়ে কর্মীদের ঐক্য ও স্বচ্ছতা নিশ্চিতকরণ।',
        },
      },
    ],
    benefits: [
      { en: 'Preemptive protection against competitive and regulatory skepticism', bn: 'প্রতিযোগিতামূলক ও নীতিগত সংশয়ের বিরুদ্ধে পূর্বপ্রস্তুতিমূলক সুরক্ষা' },
      { en: 'Elevated premium valuation and enhanced institutional trust', bn: 'উন্নত মূল্যায়ন এবং বর্ধিত প্রাতিষ্ঠানিক বিশ্বাসযোগ্যতা' },
      { en: 'Direct access to senior policymakers and industry thought leaders', bn: 'নীতিনির্ধারক এবং শিল্প চিন্তাবিদদের সাথে সরাসরি যোগাযোগ' },
      { en: 'Consistent narrative alignment across all public touchpoints', bn: 'সকল যোগাযোগ মাধ্যমে ধারাবাহিক ও সমন্বিত বার্তা' },
    ],
    keyMetrics: [
      { value: '94%', label: { en: 'Positive Sentiment Index', bn: 'ইতিবাচক জনমত সূচক' } },
      { value: '3.4x', label: { en: 'Share of Voice Growth', bn: 'শেয়ার অফ ভয়েস বৃদ্ধি' } },
      { value: '60+', label: { en: 'C-Suite Profiles Elevated', bn: 'উন্নীত সি-সুইট প্রোফাইল' } },
    ],
  },
  {
    id: 'media-relations',
    slug: 'media-relations',
    iconName: 'Newspaper',
    title: {
      en: 'Media Relations & Press Distribution',
      bn: 'মিডিয়া সংযোগ ও প্রেস ডিস্ট্রিবিউশন',
    },
    tagline: {
      en: 'Bridging corporate objectives with editorial integrity across national media.',
      bn: 'জাতীয় গণমাধ্যমে সম্পাদকীয় সুনামের সাথে করপোরেট লক্ষ্যের মেলবন্ধন।',
    },
    shortDesc: {
      en: 'Direct access to top editors, national dailies, television networks, and business journalists for impactful coverage.',
      bn: 'শীর্ষ সম্পাদক, জাতীয় দৈনিক, টেলিভিশন চ্যানেল ও বিজনেস সাংবাদিকদের সাথে সরাসরি সংযোগ ও ফলপ্রসূ সংবাদ প্রকাশ।',
    },
    overview: {
      en: 'True media influence cannot be bought; it must be earned through journalistic credibility, timely newsworthiness, and mutual respect. Berlo maintains close relationships with chief reporters, editorial boards, and bureau chiefs across Bangladesh.',
      bn: 'প্রকৃত মিডিয়া প্রভাব কখনো কেনা যায় না; তা সাংবাদিকতার বিশ্বাসযোগ্যতা, প্রাসঙ্গিকতা এবং পারস্পরিক শ্রদ্ধার মাধ্যমে অর্জন করতে হয়। বার্লো বাংলাদেশের শীর্ষ রিপোর্টার, সম্পাদকীয় পর্ষদ এবং ব্যুরো প্রধানদের সাথে নিবিড় পেশাদার সম্পর্ক রক্ষা করে।',
    },
    strategicApproach: {
      en: 'We do not blast generic press releases. We craft angle-specific pitches tailored to the beat and editorial style of individual news desks, guaranteeing genuine interest and top-tier placement.',
      bn: 'আমরা গতানুগতিক প্রেস রিলিজের পরিবর্তে বিভিন্ন সংবাদ ডেস্কের সম্পাদকীয় দৃষ্টিভঙ্গির সাথে মিলিয়ে সুনির্দিষ্ট ও কাস্টমাইজড পিচ তৈরি করি, যা নিশ্চিত করে সর্বোচ্চ গুরুত্ব ও প্রথম সারির কভারেজ।',
    },
    capabilities: [
      {
        title: { en: 'Press Conferences & Media Briefings', bn: 'সংবাদ সম্মেলন ও মিডিয়া ব্রিফিং' },
        desc: {
          en: 'Flawlessly staged press meets with high attendance of credentialed journalists, TV crews, and print media.',
          bn: 'স্বীকৃত সাংবাদিক, টিভি ক্রু এবং প্রিন্ট মিডিয়ার উপস্থিতিতে সুশৃঙ্খলভাবে আয়োজিত প্রেস কনফারেন্স।',
        },
      },
      {
        title: { en: 'National Press Release Distribution', bn: 'জাতীয় প্রেস রিলিজ বিতরণ' },
        desc: {
          en: 'Targeted distribution across Bengali and English national dailies, news agencies (BSS, UNB), and online portals.',
          bn: 'বাংলা ও ইংরেজি জাতীয় দৈনিক, সংবাদ সংস্থা (বাসস, ইউএনবি) ও শীর্ষ অনলাইন পোর্টালে সুনির্দিষ্ট বিতরণ।',
        },
      },
      {
        title: { en: 'Exclusive Interviews & Feature Op-Eds', bn: 'এক্সক্লুসিভ সাক্ষাৎকার ও সম্পাদকীয় প্রবন্ধ' },
        desc: {
          en: 'Placement of in-depth executive interviews, weekend pullout profiles, and ghostwritten thought pieces.',
          bn: 'শীর্ষ পত্রিকায় বিশদ সাক্ষাৎকার, সাপ্তাহিক বিশেষ ফিচারে প্রোফাইল এবং নীতিভিত্তিক অভিমত প্রকাশ।',
        },
      },
      {
        title: { en: 'Media Intelligence & Sentiment Monitoring', bn: 'মিডিয়া পর্যবেক্ষণ ও বিশ্লেষণ' },
        desc: {
          en: 'Real-time daily media tracking across print, broadcast, and digital news with sentiment quantification.',
          bn: 'প্রিন্ট, টেলিভিশন ও ডিজিটাল মাধ্যমে ২৪ ঘণ্টার সংবাদ পর্যবেক্ষণ এবং মনোভাবভিত্তিক বিশ্লেষণ প্রতিবেদন।',
        },
      },
    ],
    benefits: [
      { en: 'Guaranteed front-page and prime-time broadcast visibility', bn: 'প্রথম পাতা ও প্রাইম-টাইম টেলিভিশন সম্প্রচারের সুযোগ' },
      { en: 'Editorial-grade copy that journalists actively respect and use', bn: 'সম্পাদকীয় মানের কন্টেন্ট যা সাংবাদিকরা সানন্দে গ্রহণ করেন' },
      { en: 'Rapid distribution network covering 100+ credible news outlets', bn: '১০০টিরও বেশি নির্ভরযোগ্য সংবাদ আউটলেটে দ্রুত সংবাদ পৌঁছানো' },
      { en: 'Comprehensive media clippings and analytical ROI reporting', bn: 'পূর্ণাঙ্গ মিডিয়া ক্লিপিংস এবং ফলাফলভিত্তিক বিশ্লেষণ রিপোর্ট' },
    ],
    keyMetrics: [
      { value: '120+', label: { en: 'Active News Desks', bn: 'সক্রিয় নিউজ ডেস্ক সংযোগ' } },
      { value: '98%', label: { en: 'Release Pickup Rate', bn: 'প্রেস রিলিজ প্রকাশের হার' } },
      { value: '450+', label: { en: 'Prime Broadcast Interviews', bn: 'টেলিভিশন সাক্ষাৎকার সম্পন্ন' } },
    ],
  },
  {
    id: 'crisis-management',
    slug: 'crisis-management',
    iconName: 'AlertTriangle',
    title: {
      en: 'Crisis Communication & Issues Advisory',
      bn: 'সংকট ও ঝুঁকি ব্যবস্থাপনা পরামর্শ',
    },
    tagline: {
      en: '24/7 strategic defense to de-escalate volatile threats and protect enterprise integrity.',
      bn: 'সংকট প্রশমন ও প্রাতিষ্ঠানিক সুনাম সুরক্ষায় ২৪/৭ কৌশলগত সেবা।',
    },
    shortDesc: {
      en: 'Rapid-response crisis war-rooms, spokesperson coaching, rumor debunking, and structured reputational recovery.',
      bn: 'জরুরি ক্রাইসিস ওয়ার-রুম, মুখপাত্র প্রশিক্ষণ, বিভ্রান্তি নিরসন এবং নিয়মতান্ত্রিক সুনাম পুনরুদ্ধার সেবা।',
    },
    overview: {
      en: 'Reputational crises strike without warning and multiply at digital speed. Inadequate or delayed responses can inflict irreversible balance-sheet damage. Berlo provides calm, battle-tested counsel to neutralize misinformation and steer narratives back to equilibrium.',
      bn: 'সুনামের সংকট কোনো পূর্বাভাস না দিয়েই ডিজিটাল গতিতে ছড়িয়ে পড়ে। অস্পষ্ট বা বিলম্বিত প্রতিক্রিয়া প্রতিষ্ঠানের অপূরণীয় ক্ষতিসাধন করতে পারে। বার্লো বিভ্রান্তি নিরসন ও জনমত নিয়ন্ত্রণে নির্ভরযোগ্য ও পরীক্ষিত পরামর্শ প্রদান করে।',
    },
    strategicApproach: {
      en: 'We deploy a triage framework within 30 minutes of crisis trigger: establishing a factual narrative command center, training designated spokespersons, engaging key editors, and continuously monitoring public reaction.',
      bn: 'সংকটের ৩০ মিনিটের মধ্যে আমরা ট্রায়াজ ফ্রেমওয়ার্ক চালু করি: তথ্যভিত্তিক কমান্ড সেন্টার প্রতিষ্ঠা, মুখপাত্র প্রস্তুতকরণ, শীর্ষ সম্পাদকদের সাথে সরাসরি তথ্য বিনিময় এবং নিরবচ্ছিন্ন জনমত পর্যবেক্ষণ।',
    },
    capabilities: [
      {
        title: { en: 'Rapid-Response War Room', bn: 'র‍্যাপিড রেসপন্স ওয়ার রুম' },
        desc: {
          en: '24/7 dedicated communications command managing incoming inquiries and outgoing press statements.',
          bn: '২৪/৭ সার্বক্ষণিক যোগাযোগ সেল যা গণমাধ্যমের জিজ্ঞাসা মোকাবিলা ও আনুষ্ঠানিক বক্তব্য প্রদান করে।',
        },
      },
      {
        title: { en: 'Spokesperson Crisis Simulation Training', bn: 'মুখপাত্র সংকট সিমুলেশন প্রশিক্ষণ' },
        desc: {
          en: 'High-pressure mock interview simulations for board members and designated media representatives.',
          bn: 'বোর্ড সদস্য ও মনোনীত প্রতিনিধিদের জন্য বাস্তবমুখী কঠিন প্রশ্নোত্তরের ভিডিও সিমুলেশন মহড়া।',
        },
      },
      {
        title: { en: 'Rumor Containment & Fact Depository', bn: 'গুজব নিরসন ও সত্য তথ্য ব্যাংক' },
        desc: {
          en: 'Digital fact-checking portals and rapid clarification briefings targeting viral misinformation.',
          bn: 'ডিজিটাল ফ্যাক্ট-চেক পোর্টাল এবং দ্রুত ব্যাখ্যামূলক ব্রিফিংয়ের মাধ্যমে অসত্য তথ্য খণ্ডন।',
        },
      },
      {
        title: { en: 'Post-Crisis Reputation Rehabilitation', bn: 'সংকট-পরবর্তী সুনাম পুনরুদ্ধার' },
        desc: {
          en: 'Long-term narrative recovery strategies restoring brand goodwill, customer faith, and investor trust.',
          bn: 'ব্র্যান্ডের ভাবমূর্তি, গ্রাহকের বিশ্বাস ও বিনিয়োগকারীদের আস্থা ফেরাতে দীর্ঘমেয়াদী পরিকল্পনা।',
        },
      },
    ],
    benefits: [
      { en: 'Under-60-minute activation of crisis protocol', bn: '৬০ মিনিটের মধ্যে সংকট প্রটোকল সক্রিয়করণ' },
      { en: 'Minimization of legal exposure and market capitalization erosion', bn: 'আইনি ঝুঁকি হ্রাস ও অর্থনৈতিক ক্ষতির মাত্রা নিয়ন্ত্রণ' },
      { en: 'Pre-vetted response templates and escalation matrices', bn: 'পূর্বপ্রস্তুত রেসপন্স টেমপ্লেট ও জরুরি যোগাযোগ কাঠামো' },
      { en: 'Complete discretion, non-disclosure agreements, and security', bn: 'পূর্ণাঙ্গ গোপনীয়তা, এনডিএ চুক্তি এবং সর্বোচ্চ নিরাপত্তা' },
    ],
    keyMetrics: [
      { value: '<30m', label: { en: 'Average Triage Speed', bn: 'গড় ট্রায়াজ রেসপন্স সময়' } },
      { value: '45+', label: { en: 'High-Stakes Crises Resolved', bn: 'সফলভাবে সমাধানকৃত সংকট' } },
      { value: '100%', label: { en: 'Confidentiality Adherence', bn: 'গোপনীয়তা রক্ষার রেকর্ড' } },
    ],
  },
  {
    id: 'events-activations',
    slug: 'events-activations',
    iconName: 'Sparkles',
    title: {
      en: 'Events & Experiential Brand Activations',
      bn: 'ইভেন্ট ও ব্র্যান্ড অ্যাক্টিভেশন',
    },
    tagline: {
      en: 'Crafting unforgettable corporate moments that command media attention and consumer love.',
      bn: 'অবিস্মরণীয় করপোরেট মুহূর্ত সৃষ্টি যা আকর্ষণ করে গণমাধ্যম ও মানুষের ভালোবাসা।',
    },
    shortDesc: {
      en: 'Turnkey execution of press conferences, international trade summits, grand product launches, and nationwide experiential roadshows.',
      bn: 'প্রেস কনফারেন্স, আন্তর্জাতিক বাণিজ্য সম্মেলন, পণ্য উন্মোচন এবং দেশব্যাপী ব্র্যান্ড অ্যাক্টিভেশনের সার্বিক বাস্তবায়ন।',
    },
    overview: {
      en: 'Live events are the physical embodiment of a brand narrative. Led by veteran production directors, Berlo’s activation unit creates meticulously coordinated, visually breathtaking experiences that seamlessly merge physical attendance with viral digital reach.',
      bn: 'সরাসরি অনুষ্ঠিত ইভেন্ট একটি ব্র্যান্ড ন্যারেটিভের বাস্তব রূপ। অভিজ্ঞ পরিচালকদের নেতৃত্বে বার্লোর অ্যাক্টিভেশন ইউনিট নিখুঁতভাবে সমন্বিত ও দৃষ্টিনন্দন অনুষ্ঠান আয়োজন করে যা বাস্তব উপস্থিতি ও ডিজিটাল কাভারেজের সফল মেলবন্ধন ঘটায়।',
    },
    strategicApproach: {
      en: 'We manage every facet from creative concept and stage architecture to VIP protocol, media credentialing, live broadcasting, and post-event press syndication.',
      bn: 'আমরা কনসেপ্ট ও স্টেজ ডিজাইন থেকে শুরু করে ভিআইপি প্রটোকল, মিডিয়া রেজিস্ট্রেশন, লাইভ সম্প্রচার এবং ইভেন্ট-পরবর্তী সংবাদ প্রচারের প্রতিটি ধাপ নিখুঁতভাবে পরিচালনা করি।',
    },
    capabilities: [
      {
        title: { en: 'Corporate Summits & International Conferences', bn: 'করপোরেট সম্মেলন ও আন্তর্জাতিক সামিট' },
        desc: {
          en: 'Multi-day conferences, minister-level protocol, keynote productions, and simultaneous translation.',
          bn: 'বহুদিনের আন্তর্জাতিক সম্মেলন, মন্ত্রী পর্যায়ের প্রটোকল এবং একযোগে একাধিক ভাষা অনুবাদ ব্যবস্থাপনা।',
        },
      },
      {
        title: { en: 'Product Launches & Brand Unveilings', bn: 'পণ্য উন্মোচন ও ব্র্যান্ড উদ্বোধন' },
        desc: {
          en: 'Immersive reveal spectacles utilizing state-of-the-art projection mapping, stagecraft, and celebrity choreography.',
          bn: 'আধুনিক প্রজেকশন ম্যাপিং, বিশেষ স্টেজ ক্রাফট ও সেলিব্রিটি সমন্বয়ে আকর্ষণীয় লঞ্চিং ইভেন্ট।',
        },
      },
      {
        title: { en: 'Press Meets & Roundtable Discussions', bn: 'প্রেস মিট ও গোলটেবিল আলোচনা' },
        desc: {
          en: 'Intimate editorial roundtables fostering deep engagement between executives and senior journalists.',
          bn: 'নির্বাহী ও শীর্ষ সাংবাদিকদের মাঝে উন্মুক্ত ও গঠনমূলক আলোচনার উপযোগী পলিসি গোলটেবিল বৈঠক।',
        },
      },
      {
        title: { en: 'Nationwide Experiential Roadshows', bn: 'দেশব্যাপী ব্র্যান্ড রোডশো' },
        desc: {
          en: 'Multi-district consumer activations engaging thousands of customers across divisional headquarters.',
          bn: 'বিভাগীয় শহরগুলোতে হাজারো গ্রাহকের প্রত্যক্ষ অংশগ্রহণে পরিচালিত বহু-জেলা অ্যাক্টিভেশন ক্যাম্পেইন।',
        },
      },
    ],
    benefits: [
      { en: 'Single-window turnkey accountability from stage to press', bn: 'মঞ্চ সজ্জা থেকে প্রেস কাভারেজ পর্যন্ত একক ব্যবস্থাপনার নিশ্চয়তা' },
      { en: 'Flawless VIP protocol management and security coordination', bn: 'ভিআইপি ও মন্ত্রী পর্যায়ের নিখুঁত প্রটোকল এবং নিরাপত্তা সমন্বয়' },
      { en: 'High-definition photo/video capture and real-time press distribution', bn: 'উচ্চমানের ছবি/ভিডিও ধারণ এবং অনুষ্ঠান চলাকালীন প্রেস রিলিজ প্রেরণ' },
      { en: 'Post-event media valuation reporting with audience reach data', bn: 'দর্শকদের সংখ্যা ও কভারেজের আর্থিক মূল্যভিত্তিক বিশ্লেষণ রিপোর্ট' },
    ],
    keyMetrics: [
      { value: '250+', label: { en: 'Events Executed', bn: 'সফলভাবে সম্পন্ন ইভেন্ট' } },
      { value: '150k+', label: { en: 'Attendees Engaged', bn: 'প্রত্যক্ষ অংশগ্রহণকারী' } },
      { value: '100%', label: { en: 'On-Time Opening Record', bn: 'নির্ধারিত সময়ে উদ্বোধনের রেকর্ড' } },
    ],
  },
  {
    id: 'content-storytelling',
    slug: 'content-storytelling',
    iconName: 'FileText',
    title: {
      en: 'Visual & Digital Storytelling',
      bn: 'ভিজ্যুয়াল ও ডিজিটাল স্টোরিটেলিং',
    },
    tagline: {
      en: 'Translating complex corporate milestones into magnetic, emotionally compelling stories.',
      bn: 'জটিল প্রাতিষ্ঠানিক মাইলফলককে আকর্ষণীয় ও মনোগ্রাহী মানবীয় গল্পে রূপান্তর।',
    },
    shortDesc: {
      en: 'Bespoke corporate documentaries, annual report design, thought-leadership ghostwriting, and high-impact visual PR assets.',
      bn: 'করপোরেট ডকুমেন্টারি, বার্ষিক প্রতিবেদনের ভিজ্যুয়াল ডিজাইন, থট লিডারশিপ প্রবন্ধ রচনা এবং জনসংযোগ কনটেন্ট।',
    },
    overview: {
      en: 'Modern audiences engage with stories, not corporate press statements. Berlo’s creative studio blends investigative writing standards with cutting-edge visual craft to produce editorial content that captivates audiences across print, web, and social ecosystems.',
      bn: 'বর্তমান দর্শক শুকনো বিজ্ঞপ্তির চেয়ে মানবিক গল্পে বেশি আকৃষ্ট হয়। বার্লোর ক্রিয়েটিভ স্টুডিও সাংবাদিকতার মান এবং আধুনিক ভিজ্যুয়াল শৈলীর সংমিশ্রণে এমন কনটেন্ট তৈরি করে যা প্রিন্ট, ওয়েব ও সোশ্যালের পাঠকদের মুগ্ধ করে।',
    },
    strategicApproach: {
      en: 'We find the human heartbeat inside corporate achievements: whether highlighting factory floor safety, sustainable supply chains, or disruptive tech innovation, we make complex realities inspiring and shareable.',
      bn: 'আমরা করপোরেট অর্জনের অন্তরালে লুকিয়ে থাকা মানবিক আবেগ খুঁজে বের করি: কারখানার নিরাপত্তা, পরিবেশবান্ধব উদ্যোগ কিংবা যুগান্তকারী প্রযুক্তি—প্রতিটি বিষয়কে আমরা অনুপ্রেরণাদায়ী ও শেয়ারযোগ্য করে তুলি।',
    },
    capabilities: [
      {
        title: { en: 'Corporate Documentaries & Video Profiles', bn: 'করপোরেট ডকুমেন্টারি ও ভিডিও প্রোফাইল' },
        desc: {
          en: 'Cinematic company profiles, CSR impact films, and executive interview vignettes filmed in 4K.',
          bn: 'সিনেম্যাটিক প্রাতিষ্ঠানিক প্রোফাইল, সিএসআর প্রভাব চিত্র এবং ৪কে রেজোলিউশনে গৃহীত সাক্ষাৎকার।',
        },
      },
      {
        title: { en: 'Executive Ghostwriting & Op-Eds', bn: 'এক্সিকিউটিভ ঘোস্টরাইটিং ও সম্পাদকীয়' },
        desc: {
          en: 'Thought-provoking essays authored on behalf of chairpersons for leading regional and global publications.',
          bn: 'শীর্ষ পত্রিকার জন্য চেয়ারম্যান ও সিইওদের পক্ষ থেকে সুচিন্তিত নীতিমূলক প্রবন্ধ রচনা।',
        },
      },
      {
        title: { en: 'Annual Reports & ESG Sustainability Books', bn: 'বার্ষিক প্রতিবেদন ও ইএসজি বই প্রকাশ' },
        desc: {
          en: 'Award-caliber publication design, data visualization, infographics, and investor-focused narrative writing.',
          bn: 'আন্তর্জাতিক মানের প্রকাশনা ডিজাইন, ইনফোগ্রাফিক্স, ডেটা ভিজ্যুয়ালাইজেশন এবং আকর্ষণীয় বর্ণনা।',
        },
      },
      {
        title: { en: 'Infographics & Data PR Assets', bn: 'ইনফোগ্রাফিক্স ও ডেটা পিআর অ্যাসেট' },
        desc: {
          en: 'Digestible visual summaries of complex market studies, financial data, and technological breakthroughs.',
          bn: 'জটিল বাজার গবেষণা, আর্থিক পরিসংখ্যান ও উদ্ভাবনের সহজবোধ্য ও আকর্ষণীয় ভিজ্যুয়াল রূপ।',
        },
      },
    ],
    benefits: [
      { en: 'Editorial quality that earns natural pickup across news channels', bn: 'উচ্চমানের সম্পাদকীয় কন্টেন্ট যা গণমাধ্যমে স্বতঃস্ফূর্তভাবে প্রকাশিত হয়' },
      { en: 'Bilingual excellence with native fluency in English and Bangla', bn: 'ইংরেজি ও বাংলা উভয় ভাষায় প্রাঞ্জল ও আন্তর্জাতিক মানের রচনাশৈলী' },
      { en: 'High-retention visual assets designed for boardroom and public use', bn: 'বোর্ডরুম ও জনপরিসর উভয়ের জন্যই উপযোগী আকর্ষণীয় প্রকাশনা' },
      { en: 'Complete asset library delivered with full corporate usage rights', bn: 'সর্বাধিক বাণিজ্যিক ব্যবহারের অধিকারসহ প্রস্তুতকৃত ফাইল লাইব্রেরি' },
    ],
    keyMetrics: [
      { value: '300+', label: { en: 'Editorial Pieces Published', bn: 'প্রকাশিত বিশেষ সম্পাদকীয়' } },
      { value: '45+', label: { en: 'Corporate Films Produced', bn: 'নির্মিত করপোরেট প্রামাণ্যচিত্র' } },
      { value: '2.5M+', label: { en: 'Digital Video Views', bn: 'ডিজিটাল ভিডিও ভিউজ' } },
    ],
  },
  {
    id: 'digital-pr',
    slug: 'digital-pr',
    iconName: 'Globe',
    title: {
      en: 'Digital PR & Influencer Outreach',
      bn: 'ডিজিটাল পিআর ও ইনফ্লুয়েন্সার আউটরিচ',
    },
    tagline: {
      en: 'Amplifying corporate messages through verified digital channels and authoritative creators.',
      bn: 'বিশ্বস্ত ডিজিটাল প্ল্যাটফর্ম ও প্রামাণ্য ব্যক্তিত্বদের মাধ্যমে বার্তার শক্তিশালী বিস্তার।',
    },
    shortDesc: {
      en: 'Strategic social listening, online reputation management (ORM), targeted influencer collaborations, and digital narrative distribution.',
      bn: 'কৌশলগত সোশ্যাল লিসেনিং, অনলাইন সুনাম সুরক্ষা (ওআরএম), ইনফ্লুয়েন্সার পার্টনারশিপ এবং ডিজিটাল প্রচার।',
    },
    overview: {
      en: 'The digital realm is now the primary arena of corporate perception. Berlo’s digital PR division navigates algorithms, social sentiment, and online communities to ensure your brand commands positive share of voice and search prominence.',
      bn: 'ডিজিটাল প্ল্যাটফর্ম এখন করপোরেট সুনামের প্রধান ময়দান। বার্লোর ডিজিটাল পিআর বিভাগ সোশ্যাল সেন্টিমেন্ট ও অনলাইন কমিউনিটি পর্যবেক্ষণ করে আপনার ব্র্যান্ডের ইতিবাচক অবস্থান ও সার্চ রেজাল্ট নিশ্চিত করে।',
    },
    strategicApproach: {
      en: 'We combine Search Engine Optimization (SEO) PR with precision influencer alignment: collaborating only with credentialed sector experts, economists, and trusted voices who bring genuine authority rather than superficial vanity metrics.',
      bn: 'আমরা সার্চ ইঞ্জিন অপটিমাইজেশন (এসইও) পিআর এবং প্রাসঙ্গিক বিশেষজ্ঞ ব্যক্তিত্বদের সমন্বয় করি: কেবল বিশ্বাসযোগ্য অর্থনীতিবিদ, প্রযুক্তিবিদ ও চিন্তাবিদদের সাথেই পার্টনারশিপ গড়ি যা প্রকৃত প্রভাব নিশ্চিত করে।',
    },
    capabilities: [
      {
        title: { en: 'Online Reputation Management (ORM)', bn: 'অনলাইন সুনাম ব্যবস্থাপনা (ওআরএম)' },
        desc: {
          en: 'Suppressing negative search results and populating Google Page 1 with authoritative, positive editorial assets.',
          bn: 'গুগল সার্চের প্রথম পাতায় ইতিবাচক ও প্রামাণ্য সংবাদ নিশ্চিতকরণ এবং অসত্য তথ্যের প্রভাব হ্রাস।',
        },
      },
      {
        title: { en: 'B2B & Niche Influencer Orchestration', bn: 'বি২বি ও বিশেষায়িত ইনফ্লুয়েন্সার পার্টনারশিপ' },
        desc: {
          en: 'Curated partnerships with respected industry professionals, tech analysts, and financial commentators.',
          bn: 'শ্রদ্ধেয় শিল্প গবেষক, প্রযুক্তি বিশ্লেষক ও আর্থিক পর্যালোচকদের সাথে অর্থবহ কোলাবরেশন।',
        },
      },
      {
        title: { en: 'Digital Press Syndication & Backlinks', bn: 'ডিজিটাল প্রেস সিন্ডিকেশন ও ব্যাকলিংক' },
        desc: {
          en: 'High-domain-authority article placements boosting corporate website SEO ranking and referral traffic.',
          bn: 'উচ্চ ডিএ সম্পন্ন পোর্টালে প্রেস কাভারেজ যা প্রতিষ্ঠানের ওয়েবসাইট রেটিং ও ভিজিটর বৃদ্ধি করে।',
        },
      },
      {
        title: { en: 'Real-Time Social Listening & Threat Alerts', bn: 'রিয়েল-টাইম সোশ্যাল লিসেনিং' },
        desc: {
          en: 'AI-assisted monitoring of social media discourse, identifying emerging PR flashpoints before they explode.',
          bn: 'সামাজিক যোগাযোগ মাধ্যমের আলোচনার ওপর স্বয়ংক্রিয় নজরদারি, যাতে যেকোনো অসন্তোষ শুরুতেই সমাধান করা যায়।',
        },
      },
    ],
    benefits: [
      { en: 'Dominance of positive editorial links on Google Search', bn: 'গুগল সার্চে ইতিবাচক সংবাদের শীর্ষ অবস্থান' },
      { en: 'Credible third-party advocacy without the stigma of paid advertising', bn: 'বিজ্ঞাপনের কৃত্রিমতা ছাড়াই তৃতীয় পক্ষের বিশ্বাসযোগ্য প্রশংসা' },
      { en: 'Immediate notification of negative online virality', bn: 'অনলাইনে নেতিবাচক আলোচনার তাৎক্ষণিক নোটিফিকেশন ও সমাধান' },
      { en: 'Measurable website traffic and conversion attribution', bn: 'পরিমাপযোগ্য ওয়েব ট্রাফিক ও ব্র্যান্ড এনগেজমেন্ট' },
    ],
    keyMetrics: [
      { value: '88%', label: { en: 'Top-3 Google Search Share', bn: 'গুগলে ইতিবাচক ফলাফলের অনুপাত' } },
      { value: '4.2x', label: { en: 'Digital Engagement Lift', bn: 'ডিজিটাল এনগেজমেন্ট বৃদ্ধি' } },
      { value: '80+', label: { en: 'Vetted Thought Influencers', bn: 'যাচাইকৃত বিশেষজ্ঞ ইনফ্লুয়েন্সার' } },
    ],
  },
];


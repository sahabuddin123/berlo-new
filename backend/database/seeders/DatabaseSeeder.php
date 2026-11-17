<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\GalleryPhoto;
use App\Models\GalleryVideo;
use App\Models\Inquiry;
use App\Models\Insight;
use App\Models\MediaItem;
use App\Models\NewsletterSubscriber;
use App\Models\Project;
use App\Models\Service;
use App\Models\ServiceCapability;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Roles, Permissions, and Default Users
        $this->call(RoleAndPermissionSeeder::class);

        // 2. Seed Services (All 9 Core Services)
        $services = [
            [
                'slug' => 'strategic-pr',
                'title_en' => 'Strategic PR & Corporate Communications',
                'title_bn' => 'কৌশলগত জনসংযোগ ও করপোরেট যোগাযোগ',
                'short_desc_en' => 'Executive positioning, reputation resilience, and high-impact corporate narratives.',
                'short_desc_bn' => 'নির্বাহী পজিশনিং, প্রাতিষ্ঠানিক সুনাম বিনির্মাণ ও কৌশলগত বার্তা প্রচার।',
                'desc_en' => 'We engineer decisive corporate communications strategies that safeguard corporate valuation, align stakeholder expectations, and position leadership at the forefront of national discourse.',
                'desc_bn' => 'আমরা এমন কৌশলগত করপোরেট যোগাযোগ পরিচালনা করি যা প্রাতিষ্ঠানিক মূল্যায়নকে সুরক্ষিত রাখে এবং জাতীয় পরিমণ্ডলে নেতৃত্বকে সুদৃঢ় করে।',
                'icon' => 'ShieldCheck',
                'stat_number' => '98.5%',
                'stat_label_en' => 'Positive Perception Index',
                'stat_label_bn' => 'ইতিবাচক জনমত সূচক',
                'sort_order' => 1,
                'capabilities' => [
                    [
                        'title_en' => 'Executive Positioning & Thought Leadership',
                        'title_bn' => 'নির্বাহী পজিশনিং ও থট লিডারশিপ',
                        'desc_en' => 'Developing C-suite authority through curated op-eds, international forum keynotes, and industry panels.',
                        'desc_bn' => 'শীর্ষ নির্বাহীদের জন্য বিশেষজ্ঞ মতামত ও আন্তর্জাতিক ফোরামে অংশগ্রহণ নিশ্চিতকরণ।',
                        'deliverables_en' => ['CEO Speechwriting & Op-Eds', 'Quarterly Media Engagement Calendar', 'Executive Bio Kits'],
                        'deliverables_bn' => ['সিইও বক্তব্য ও অপ-এড লিখন', 'ত্রৈমাসিক মিডিয়া ক্যালেন্ডার', 'এক্সিকিউটিভ বায়ো কিট'],
                        'metrics_en' => 'Featured in 40+ Tier-1 national business sections',
                        'metrics_bn' => '৪০+ শীর্ষ জাতীয় বাণিজ্য পাতায় কভারেজ',
                    ],
                    [
                        'title_en' => 'Stakeholder Mapping & ESG Advocacy',
                        'title_bn' => 'অংশীজন ম্যাপিং ও ইএসজি অ্যাডভোকেসি',
                        'desc_en' => 'Structuring dialogue with institutional investors, regulators, and civic leadership.',
                        'desc_bn' => 'নিয়ন্ত্রক সংস্থা ও প্রাতিষ্ঠানিক বিনিয়োগকারীদের সাথে স্বচ্ছ যোগাযোগ।',
                        'deliverables_en' => ['Stakeholder Perception Audits', 'Annual ESG Impact Narrative', 'Regulator Briefing Dossiers'],
                        'deliverables_bn' => ['অংশীজন ধারণা অডিট', 'বার্ষিক ইএসজি ইমপ্যাক্ট ন্যারেটিভ', 'রেগুলেটরি ডসিয়ার'],
                        'metrics_en' => '92% positive sentiment across institutional groups',
                        'metrics_bn' => '৯২% ইতিবাচক প্রাতিষ্ঠানিক স্বীকৃতি',
                    ],
                ],
            ],
            [
                'slug' => 'media-relations',
                'title_en' => 'Media Relations & Press Management',
                'title_bn' => 'মিডিয়া সংযোগ ও প্রেস ব্যবস্থাপনা',
                'short_desc_en' => 'Unrivaled access to national dailies, television networks, and business bureaus.',
                'short_desc_bn' => 'জাতীয় দৈনিক, টেলিভিশন চ্যানেল ও বিজনেস ডেস্কের সাথে গভীর প্রাতিষ্ঠানিক সংযোগ।',
                'desc_en' => 'Connecting your corporate milestones directly with senior editors, bureau chiefs, and broadcast producers for maximum editorial credibility.',
                'desc_bn' => 'শীর্ষস্থানীয় সম্পাদক ও গণমাধ্যম ব্যক্তিত্বদের সাথে সরাসরি যোগাযোগের মাধ্যমে আপনার ব্র্যান্ডের বিশ্বাসযোগ্যতা বৃদ্ধি।',
                'icon' => 'Radio',
                'stat_number' => '100+',
                'stat_label_en' => 'National Media Outlets',
                'stat_label_bn' => 'জাতীয় গণমাধ্যম সংযোগ',
                'sort_order' => 2,
                'capabilities' => [
                    [
                        'title_en' => 'Press Conferences & Media Roundtables',
                        'title_bn' => 'সংবাদ সম্মেলন ও মিডিয়া গোলটেবিল',
                        'desc_en' => 'Turnkey management of accreditation, press kits, moderator coordination, and live television uplinks.',
                        'desc_bn' => 'সাংবাদিক আমন্ত্রণ, প্রেস কিট প্রস্তুত ও লাইভ টেলিভিশন সম্প্রচার ব্যবস্থাপনা।',
                        'deliverables_en' => ['Accreditation Coordination', 'Custom Press Dossiers', 'Post-Event Media Clipping Report'],
                        'deliverables_bn' => ['প্রেস অ্যাক্রিডিটেশন', 'প্রেস ডসিয়ার', 'মিডিয়া ক্লিপিং রিপোর্ট'],
                        'metrics_en' => 'Average 45+ accredited journalists per conference',
                        'metrics_bn' => 'প্রতি কনফারেন্সে গড়ে ৪৫+ সাংবাদিক উপস্থিতি',
                    ],
                ],
            ],
            [
                'slug' => 'crisis-management',
                'title_en' => 'Crisis Communication & Reputation Risk',
                'title_bn' => 'সংকট ও ঝুঁকি ব্যবস্থাপনা',
                'short_desc_en' => '24/7 rapid response war-room mobilization to protect brand equity.',
                'short_desc_bn' => '২৪/৭ তাৎক্ষণিক ওয়ার-রুম সমন্বয় এবং ব্র্যান্ডের সুনাম সুরক্ষা।',
                'desc_en' => 'When regulatory inquiries, operational setbacks, or digital misinformation strike, our battle-tested crisis commanders contain fallout and restore stability within hours.',
                'desc_bn' => 'যেকোনো প্রতিকূল পরিস্থিতি ও বিভ্রান্তিকর তথ্যের বিরুদ্ধে তাৎক্ষণিক সুরক্ষা ও স্থিতিশীলতা আনয়ন।',
                'icon' => 'AlertOctagon',
                'stat_number' => '60 Min',
                'stat_label_en' => 'War-Room Mobilization',
                'stat_label_bn' => 'ওয়ার-রুম প্রস্তুতি সময়',
                'sort_order' => 3,
                'capabilities' => [
                    [
                        'title_en' => '24/7 Misinformation Defense & Fact-Checking',
                        'title_bn' => 'গুজব প্রতিরোধ ও তাৎক্ষণিক তথ্য যাচাই',
                        'desc_en' => 'Rapid algorithmic surveillance of digital forums, television broadcasts, and print channels.',
                        'desc_bn' => 'ডিজিটাল ফোরাম ও গণমাধ্যমে নিবিড় পর্যবেক্ষণ এবং তাৎক্ষণিক ব্যাখ্যা প্রদান।',
                        'deliverables_en' => ['Hourly Crisis Sentiment Dashboard', 'Rapid-Response Fact Sheets', 'Counter-Narrative Broadcast Scripts'],
                        'deliverables_bn' => ['ঘণ্টাভিত্তিক ক্রাইসিস ড্যাশবোর্ড', 'ফ্যাক্ট শিট', 'পাল্টা তথ্য বিবরণী'],
                        'metrics_en' => '85% rumors neutralized within first 180 minutes',
                        'metrics_bn' => '১৮০ মিনিটের মধ্যে ৮৫% গুজব প্রশমন',
                    ],
                ],
            ],
            [
                'slug' => 'events-activations',
                'title_en' => 'Experiential Events & Brand Activations',
                'title_bn' => 'ইভেন্ট ও ব্র্যান্ড অ্যাক্টিভেশন',
                'short_desc_en' => 'Large-scale trade pavilions, corporate galas, and immersive brand experiences.',
                'short_desc_bn' => 'আন্তর্জাতিক বাণিজ্য মেলা, করপোরেট গালা ও অবিস্মরণীয় ব্র্যান্ড এক্সপেরিয়েন্স।',
                'desc_en' => 'From high-profile pavilions at the Dhaka International Trade Fair to multi-stakeholder annual general meetings, we deliver flawless event production with massive media footprint.',
                'desc_bn' => 'আন্তর্জাতিক বাণিজ্য মেলা ও করপোরেট সামিটে সর্বোচ্চ মানের সমন্বিত ইভেন্ট বাস্তবায়ন।',
                'icon' => 'Sparkles',
                'stat_number' => '350+',
                'stat_label_en' => 'Activations Delivered',
                'stat_label_bn' => 'বাস্তবায়িত ইভেন্ট',
                'sort_order' => 4,
            ],
            [
                'slug' => 'digital-pr',
                'title_en' => 'Digital PR & Social Media Management',
                'title_bn' => 'ডিজিটাল পিআর ও সোশ্যাল মিডিয়া',
                'short_desc_en' => 'Omnichannel brand influence, search visibility, and viral narratives.',
                'short_desc_bn' => 'সার্চ অপ্টিমাইজড পিআর এবং সোশ্যাল মিডিয়ায় ব্র্যান্ডের অবস্থান সুদৃঢ়করণ।',
                'desc_en' => 'Integrating organic digital PR with authoritative backlink acquisition, influencer advocacy, and active community sentiment steering.',
                'desc_bn' => 'ডিজিটাল পিআর, ইনফ্লুয়েন্সার নেটওয়ার্ক ও অনলাইন রেপুটেশনের অনন্য সমন্বয়।',
                'icon' => 'Share2',
                'stat_number' => '12M+',
                'stat_label_en' => 'Digital Audience Reach',
                'stat_label_bn' => 'ডিজিটাল পাঠক সংযোগ',
                'sort_order' => 5,
            ],
            [
                'slug' => 'content-storytelling',
                'title_en' => 'Visual Storytelling & Media Production',
                'title_bn' => 'ভিজ্যুয়াল স্টোরিটেলিং ও মিডিয়া প্রোডাকশন',
                'short_desc_en' => 'Cinematic corporate documentaries, campaign TVCs, and graphic design.',
                'short_desc_bn' => 'সিনেমাটিক করপোরেট ডকুমেন্টারি, ক্যাম্পেইন টিভিসি ও গ্রাফিক্স ডিজাইন।',
                'desc_en' => 'We create visually arresting films, investor retrospectives, and branded content that humanize corporations and spark emotional engagement.',
                'desc_bn' => 'আপনার ব্র্যান্ডের অনন্য গল্পকে সিনেমাটিক ভিজ্যুয়াল ও আধুনিক চিত্রনাট্যে রূপদান।',
                'icon' => 'Video',
                'stat_number' => '45+',
                'stat_label_en' => 'Documentaries Produced',
                'stat_label_bn' => 'প্রযোজিত ডকুমেন্টারি',
                'sort_order' => 6,
            ],
            [
                'slug' => 'brand-strategy',
                'title_en' => 'Brand Strategy & Identity Design',
                'title_bn' => 'ব্র্যান্ড স্ট্র্যাটেজি ও আইডেন্টিটি ডিজাইন',
                'short_desc_en' => 'Holistic corporate brand architecture and visual design systems.',
                'short_desc_bn' => 'সম্পূর্ণ করপোরেট ব্র্যান্ড আর্কিটেকচার ও ভিজ্যুয়াল সিস্টেম ডিজাইন।',
                'desc_en' => 'Defining distinct brand positioning, messaging pillars, visual identity guidelines, and tone-of-voice frameworks for market leadership.',
                'desc_bn' => 'প্রতিযোগিতামূলক বাজারে ব্র্যান্ডের স্থায়ী প্রভাব ও প্রাতিষ্ঠানিক স্বকীয়তা প্রতিষ্ঠা।',
                'icon' => 'Compass',
                'stat_number' => '85+',
                'stat_label_en' => 'Brand Identities Built',
                'stat_label_bn' => 'নির্মিত ব্র্যান্ড আইডেন্টিটি',
                'sort_order' => 7,
            ],
            [
                'slug' => 'advocacy-pr',
                'title_en' => 'Public Affairs & Government Advocacy',
                'title_bn' => 'পাবলিক অ্যাফেয়ার্স ও সরকারি সম্পর্ক',
                'short_desc_en' => 'Constructive dialogue with regulatory bodies, trade councils, and policymakers.',
                'short_desc_bn' => 'নীতিনির্ধারক ও সরকারি সংস্থার সাথে ফলপ্রসূ প্রাতিষ্ঠানিক যোগাযোগ।',
                'desc_en' => 'Facilitating evidence-based public policy advocacy, bilateral trade delegation engagements, and regulatory consensus.',
                'desc_bn' => 'নীতিগত সংলাপ ও সরকারি প্রতিষ্ঠানের সাথে সহযোগিতাপূর্ণ সেতুবন্ধন।',
                'icon' => 'Landmark',
                'stat_number' => '25+',
                'stat_label_en' => 'Policy Dialogues Held',
                'stat_label_bn' => 'পলিসি সংলাপ অধিবেশন',
                'sort_order' => 8,
            ],
            [
                'slug' => 'monitoring-analytics',
                'title_en' => 'Media Intelligence & Sentiment Analytics',
                'title_bn' => 'মিডিয়া মনিটরিং ও অ্যানালিটিক্স',
                'short_desc_en' => 'Real-time media intelligence across print, television, and digital platforms.',
                'short_desc_bn' => 'প্রিন্ট, টেলিভিশন ও ডিজিটাল মাধ্যমে সার্বক্ষণিক তথ্য বিশ্লেষণ।',
                'desc_en' => 'Daily media clipping digests, competitive share-of-voice benchmarking, and automated sentiment risk alerts delivered every morning.',
                'desc_bn' => 'প্রতিদিনের সংবাদ বিশ্লেষণ ও বাজার প্রতিযোগী পর্যালোচনার সমন্বিত রিপোর্ট।',
                'icon' => 'BarChart3',
                'stat_number' => '24/7',
                'stat_label_en' => 'Surveillance Coverage',
                'stat_label_bn' => 'সার্বক্ষণিক মনিটরিং',
                'sort_order' => 9,
            ],
        ];

        foreach ($services as $srvData) {
            $capabilities = $srvData['capabilities'] ?? [];
            unset($srvData['capabilities']);

            $service = Service::updateOrCreate(['slug' => $srvData['slug']], $srvData);

            if (!empty($capabilities)) {
                foreach ($capabilities as $idx => $cap) {
                    ServiceCapability::updateOrCreate(
                        ['service_id' => $service->id, 'title_en' => $cap['title_en']],
                        [...$cap, 'sort_order' => $idx + 1]
                    );
                }
            }
        }

        // 3. Seed Projects / Case Studies
        $projects = [
            [
                'slug' => 'dhaka-international-trade-fair',
                'title_en' => 'Dhaka International Trade Fair — High-Impact PR Campaign',
                'title_bn' => 'ঢাকা আন্তর্জাতিক বাণিজ্য মেলা — মেগা পিআর ক্যাম্পেইন',
                'client_name' => 'Ministry of Commerce & EPB',
                'industry' => 'Trade & Government',
                'year' => '2025',
                'overview_en' => 'Turnkey media coordination, national press briefings, and dignitary protocol management for the marquee international trade fair.',
                'overview_bn' => 'আন্তর্জাতিক বাণিজ্য মেলার পূর্ণাঙ্গ মিডিয়া কভারেজ, রাষ্ট্রীয় প্রটোকল সমন্বয় এবং কৌশলগত পিআর পরিচালনা।',
                'challenge_en' => 'Attracting prime-time television and front-page news coverage amidst a crowded national news cycle.',
                'challenge_bn' => 'ব্যস্ত জাতীয় সংবাদ পরিবেশের মাঝে আন্তর্জাতিক প্যাভিলিয়নের জন্য শীর্ষস্থানীয় প্রচার নিশ্চিত করা।',
                'solution_en' => 'Orchestrated specialized journalist walk-throughs, curated press dossiers, and direct broadcast feeds.',
                'solution_bn' => 'সাংবাদিকদের জন্য বিশেষ পরিদর্শন, তথ্যবহুল প্রেস কিট এবং টেলিভিশন চ্যানেলগুলোতে সরাসরি সম্প্রচার।',
                'impact_en' => 'Over 140+ news mentions across 35 national outlets with 100% positive sentiment.',
                'impact_bn' => '৩৫টি জাতীয় গণমাধ্যমে ১৪০টিরও বেশি সংবাদ পরিবেশন এবং ১০০% ইতিবাচক ফলাফল।',
                'stat_number' => '140+',
                'stat_label_en' => 'News Outlets Covered',
                'stat_label_bn' => 'সংবাদমাধ্যম কাভারেজ',
                'cover_image' => '/images/berlo/projects/dhaka-trade-fair_cover.jpg',
                'is_featured' => true,
                'is_published' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'synova-healthcare-crisis',
                'title_en' => 'Industrial Crisis Management & Brand Equity Preservation',
                'title_bn' => 'শিল্প সংকট প্রশমন ও সুনাম রক্ষা',
                'client_name' => 'Synova Healthcare Group',
                'industry' => 'Healthcare & Pharmaceuticals',
                'year' => '2024',
                'overview_en' => 'Rapid-response war room deployment that contained misinformation and safeguarded market valuation within 24 hours.',
                'overview_bn' => '২৪ ঘণ্টার মধ্যে গুজব ও বিভ্রান্তিকর তথ্য প্রতিহত করে প্রাতিষ্ঠানিক সুনাম রক্ষার সফল অভিযান।',
                'challenge_en' => 'Misleading allegations on social channels threatening consumer confidence and regulatory action.',
                'challenge_bn' => 'সামাজিক যোগাযোগ মাধ্যমে বিভ্রান্তিকর তথ্যের কারণে গ্রাহকদের মাঝে তৈরি হওয়া উদ্বেগ প্রশমন।',
                'solution_en' => 'Immediate fact-sheet dissemination, authorized medical board press conference, and social verification.',
                'solution_bn' => 'অনুমোদিত তথ্য বিবরণী প্রকাশ, বিশেষজ্ঞ চিকিৎসকদের মাধ্যমে প্রেস কনফারেন্স ও তথ্য যাচাই।',
                'impact_en' => 'Zero regulatory penalty and 94% customer retention preserved.',
                'impact_bn' => 'কোনো ধরনের নিয়ন্ত্রক জরিমানা ছাড়াই ৯৪% গ্রাহক আস্থা অক্ষুণ্ণ রাখা সম্ভব হয়।',
                'stat_number' => '94%',
                'stat_label_en' => 'Brand Retention Kept',
                'stat_label_bn' => 'গ্রাহক আস্থা সংরক্ষিত',
                'cover_image' => '/images/berlo/projects/production-crisis_1.jpg',
                'is_featured' => true,
                'is_published' => true,
                'sort_order' => 2,
            ],
            [
                'slug' => 'national-speaker-program',
                'title_en' => 'Executive Thought Leadership & Speaker Forum',
                'title_bn' => 'এক্সিকিউটিভ থট লিডারশিপ ও স্পিকার প্রোগ্রাম',
                'client_name' => 'Economic Policy Council',
                'industry' => 'Finance & Think Tanks',
                'year' => '2024',
                'overview_en' => 'Positioning national business leaders at the epicenter of economic reforms through elite roundtables.',
                'overview_bn' => 'জাতীয় অর্থনীতিবিদ ও শিল্পনেতাদের অংশগ্রহণে উচ্চপর্যায়ের পলিসি সংলাপ ও ফোরাম পরিচালনা।',
                'challenge_en' => 'Creating an authoritative non-partisan platform for constructive economic debate.',
                'challenge_bn' => 'অর্থনৈতিক সংস্কারের লক্ষ্যে একটি নিরপেক্ষ ও প্রভাবশালী মুক্ত আলোচনার পরিবেশ সৃষ্টি করা।',
                'solution_en' => 'Curated fireside dialogues with chief economists and nationwide live telecast partnerships.',
                'solution_bn' => 'অর্থনীতিবিদদের সাথে গোলটেবিল বৈঠক এবং জাতীয় সম্প্রচার মাধ্যমে সরাসরি সম্প্রচার।',
                'impact_en' => 'Reformed policy recommendations cited in major national fiscal reports.',
                'impact_bn' => 'জাতীয় অর্থনৈতিক নীতিমালায় ফোরামের বেশ কয়েকটি সুপারিশ অন্তর্ভুক্ত হয়।',
                'stat_number' => '1.5M+',
                'stat_label_en' => 'Live Broadcast Viewers',
                'stat_label_bn' => 'লাইভ সম্প্রচার দর্শক',
                'cover_image' => '/images/berlo/projects/speaker-program_whatsapp-image-2025-07-31-at-195433-b8e9e550.jpg',
                'is_featured' => true,
                'is_published' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($projects as $proj) {
            Project::updateOrCreate(['slug' => $proj['slug']], $proj);
        }

        // 4. Seed Team Members & Leaders
        $team = [
            [
                'slug' => 'shakhwat-ullah',
                'name_en' => 'Shakhwat Ullah',
                'name_bn' => 'সাখাওয়াত উল্লাহ',
                'role_en' => 'Managing Director & Strategic Lead',
                'role_bn' => 'ব্যবস্থাপনা পরিচালক ও স্ট্র্যাটেজিক লিড',
                'division_en' => 'Executive Leadership',
                'division_bn' => 'নির্বাহী নেতৃত্ব',
                'bio_en' => 'With over 20 years of pioneering public relations and communications leadership in Bangladesh, Shakhwat has advised Fortune 500 multinationals and national conglomerates.',
                'bio_bn' => 'বাংলাদেশে দুই দশকেরও বেশি সময় ধরে জনসংযোগ ও কৌশলগত যোগাযোগের পথিকৃৎ হিসেবে সাখাওয়াত বহু বহুজাতিক ও জাতীয় প্রতিষ্ঠানকে নেতৃত্ব দিয়েছেন।',
                'photo' => '/images/berlo/team/shakhwat-ullah-1.png',
                'phone' => '+880 1711 268 479',
                'email' => 'contact@berlocommunications.com',
                'is_leadership' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'shatarupa-hasan',
                'name_en' => 'Shatarupa Hasan',
                'name_bn' => 'শতরূপা হাসান',
                'role_en' => 'Head of Corporate Affairs & Communications',
                'role_bn' => 'হেড অব করপোরেট অ্যাফেয়ার্স অ্যান্ড কমিউনিকেশনস',
                'division_en' => 'Corporate Affairs',
                'division_bn' => 'করপোরেট অ্যাফেয়ার্স',
                'bio_en' => 'Veteran media strategist specializing in brand narratives, stakeholder diplomacy, and high-impact crisis response orchestration.',
                'bio_bn' => 'ব্র্যান্ড ন্যারেটিভ, অংশীজন কূটনীতি এবং সংকট মোকাবেলায় অভিজ্ঞ সিনিয়র স্ট্র্যাটেজিস্ট।',
                'photo' => '/images/berlo/team/zamshed.png',
                'phone' => '+880 1812 336 789',
                'email' => 'shatarupa@berlocommunications.com',
                'is_leadership' => true,
                'sort_order' => 2,
            ],
        ];

        foreach ($team as $member) {
            TeamMember::updateOrCreate(['slug' => $member['slug']], $member);
        }

        // 5. Seed Clients & Testimonials
        $clients = [
            ['name' => 'Ministry of Commerce & EPB', 'industry' => 'Government', 'tier' => 'Government', 'is_featured' => true, 'sort_order' => 1],
            ['name' => 'Synova Healthcare Group', 'industry' => 'Healthcare', 'tier' => 'Enterprise', 'is_featured' => true, 'sort_order' => 2],
            ['name' => 'BRAC Bank Limited', 'industry' => 'Banking & Finance', 'tier' => 'Enterprise', 'is_featured' => true, 'sort_order' => 3],
            ['name' => 'Walton Hi-Tech Industries', 'industry' => 'Consumer Electronics', 'tier' => 'Corporate', 'is_featured' => true, 'sort_order' => 4],
            ['name' => 'Grameenphone Limited', 'industry' => 'Telecommunications', 'tier' => 'Enterprise', 'is_featured' => true, 'sort_order' => 5],
        ];

        foreach ($clients as $c) {
            $client = Client::updateOrCreate(['name' => $c['name']], $c);

            Testimonial::updateOrCreate(
                ['client_id' => $client->id],
                [
                    'author_name_en' => 'Executive Director',
                    'author_name_bn' => 'নির্বাহী পরিচালক',
                    'author_role_en' => "{$client->name} Operations",
                    'author_role_bn' => "অপারেশনস, {$client->name}",
                    'quote_en' => 'Berlo Communications delivers exceptional strategic clarity. When challenges arise, their war-room response is unmatched in Bangladesh.',
                    'quote_bn' => 'বার্লো কমিউনিকেশনসের কৌশলগত দিকনির্দেশনা অতুলনীয়। সংকট মুহূর্তে তাদের তাত্ক্ষণিক পদক্ষেপ আমাদের সুনাম সুরক্ষিত রেখেছে।',
                    'rating' => 5,
                    'is_active' => true,
                ]
            );
        }

        // 6. Seed Insights (Articles)
        $insights = [
            [
                'slug' => 'crisis-management-in-the-ai-era',
                'title_en' => 'Navigating Corporate Crisis in the Age of Generative AI and Viral Misinformation',
                'title_bn' => 'জেনারেটিভ এআই এবং সোশ্যাল মিডিয়ার যুগে করপোরেট সংকট ব্যবস্থাপনা',
                'category' => 'Crisis Advisory',
                'author_en' => 'Shakhwat Ullah',
                'author_bn' => 'সাখাওয়াত উল্লাহ',
                'excerpt_en' => 'How proactive monitoring, unified executive messaging, and 60-minute response protocols protect enterprise valuation in Bangladesh.',
                'excerpt_bn' => 'কীভাবে সক্রিয় মনিটরিং এবং দ্রুত সমন্বিত পদক্ষেপের মাধ্যমে বিভ্রান্তিকর তথ্যের যুগে প্রতিষ্ঠানের সুনাম রক্ষা সম্ভব।',
                'content_en' => 'In today’s hyper-connected communications landscape, a single deepfake or unsubstantiated rumor can erase years of corporate goodwill in minutes. Corporate leaders must implement continuous listening architectures...',
                'content_bn' => 'বর্তমান যুগে বিভ্রান্তিকর তথ্যের ব্যাপক বিস্তারের কারণে কর্পোরেট প্রতিষ্ঠানগুলোর দ্রুততম সময়ে তথ্য যাচাই এবং নির্ভরযোগ্য ব্যাখ্যা দেওয়া অপরিহার্য হয়ে উঠেছে...',
                'featured_image' => '/images/berlo/projects/production-crisis_cover-1.jpg',
                'read_time' => '6 min read',
                'is_featured' => true,
                'status' => 'published',
                'published_at' => now()->subDays(3),
            ],
            [
                'slug' => 'esg-communications-bangladesh',
                'title_en' => 'The New Era of ESG Communications: From Compliance to Strategic Advantage',
                'title_bn' => 'ইএসজি যোগাযোগের নতুন দিগন্ত: বাধ্যবাধকতা থেকে কৌশলগত শক্তিতে রূপান্তর',
                'category' => 'Corporate Affairs',
                'author_en' => 'Shatarupa Hasan',
                'author_bn' => 'শতরূপা হাসান',
                'excerpt_en' => 'Why international buyers and local investors demand verifiable sustainability stories from Bangladeshi manufacturers.',
                'excerpt_bn' => 'কেন আন্তর্জাতিক ক্রেতা ও বিনিয়োগকারীরা টেকসই পরিবেশবান্ধব উদ্যোগের বাস্তব প্রমাণ প্রত্যাশা করছেন।',
                'content_en' => 'Global supply chain compliance is no longer an afterthought. Transparent reporting and impactful storytelling build resilience...',
                'content_bn' => 'আন্তর্জাতিক বাজারে সুনাম ধরে রাখতে পরিবেশ ও সামাজিক দায়বদ্ধতার স্বচ্ছ প্রতিবেদন এখন অত্যন্ত জরুরি...',
                'featured_image' => '/images/berlo/projects/dhaka-trade-fair_cover.jpg',
                'read_time' => '5 min read',
                'is_featured' => true,
                'status' => 'published',
                'published_at' => now()->subDays(7),
            ],
        ];

        foreach ($insights as $art) {
            Insight::updateOrCreate(['slug' => $art['slug']], $art);
        }

        // 7. Seed Photo Gallery
        $photos = [
            [
                'title_en' => 'Dhaka International Trade Fair — Grand Pavilion Unveiling',
                'title_bn' => 'ঢাকা আন্তর্জাতিক বাণিজ্য মেলা — গ্র্যান্ড প্যাভিলিয়ন উদ্বোধন',
                'category_key' => 'events',
                'category_en' => 'Corporate Events & Expos',
                'category_bn' => 'করপোরেট ইভেন্ট ও মেলা',
                'image_url' => '/images/berlo/projects/dhaka-trade-fair_1-1.jpg',
                'event_date' => 'January 2025',
                'location_en' => 'Bangabandhu Exhibition Center, Purbachal',
                'location_bn' => 'বঙ্গবন্ধু প্রদর্শনী কেন্দ্র, পূর্বাচল',
                'client_name' => 'Ministry of Commerce & EPB',
                'sort_order' => 1,
            ],
            [
                'title_en' => 'Synova Corporate Excellence Gala & Strategic Launch',
                'title_bn' => 'সিনোভা করপোরেট এক্সিলেন্স গালা ও স্ট্র্যাটেজিক লঞ্চ',
                'category_key' => 'activation',
                'category_en' => 'Brand Activations & Galas',
                'category_bn' => 'ব্র্যান্ড অ্যাক্টিভেশন ও গালা',
                'image_url' => '/images/berlo/projects/event-management_synova.jpg',
                'event_date' => 'November 2024',
                'location_en' => 'Radisson Blu Dhaka Water Garden',
                'location_bn' => 'র‌্যাডিসন ব্লু ঢাকা ওয়াটার গার্ডেন',
                'client_name' => 'Synova Healthcare Group',
                'sort_order' => 2,
            ],
            [
                'title_en' => 'Industrial Crisis Neutralization — 24/7 Operations War Room',
                'title_bn' => 'শিল্প সংকট প্রশমন — ২৪/৭ অপারেশনস ওয়ার রুম',
                'category_key' => 'crisis',
                'category_en' => 'Crisis War Rooms',
                'category_bn' => 'ক্রাইসিস ওয়ার রুম',
                'image_url' => '/images/berlo/projects/production-crisis_1.jpg',
                'event_date' => 'August 2024',
                'location_en' => 'Berlo Command Center, Niketon, Dhaka',
                'location_bn' => 'বার্লো কমান্ড সেন্টার, নিকেতন, ঢাকা',
                'client_name' => 'National Manufacturing Conglomerate',
                'sort_order' => 3,
            ],
        ];

        foreach ($photos as $p) {
            GalleryPhoto::updateOrCreate(['image_url' => $p['image_url']], $p);
        }

        // 8. Seed Video Gallery
        $videos = [
            [
                'title_en' => 'Berlo Communications — Strategic Excellence & Corporate Storytelling',
                'title_bn' => 'বার্লো কমিউনিকেশনস — কৌশলগত উৎকর্ষ ও করপোরেট স্টোরিটেলিং',
                'category_key' => 'documentary',
                'category_en' => 'Corporate Documentaries',
                'category_bn' => 'করপোরেট ডকুমেন্টারি',
                'youtube_id' => '8nees6k5oNk',
                'duration' => '03:45',
                'views' => '24.5K',
                'release_date' => 'October 2024',
                'client_name' => 'Berlo Communications Corporate',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title_en' => 'National Press Conference & Media Coverage Broadcast',
                'title_bn' => 'জাতীয় সংবাদ সম্মেলন ও টেলিভিশন কভারেজ সম্প্রচার',
                'category_key' => 'press',
                'category_en' => 'Press Briefings & Conferences',
                'category_bn' => 'সংবাদ সম্মেলন ও ব্রিফিং',
                'youtube_id' => 'FHnfg223H60',
                'duration' => '04:12',
                'views' => '18.2K',
                'release_date' => 'January 2025',
                'client_name' => 'Industrial Conglomerate',
                'is_featured' => false,
                'sort_order' => 2,
            ],
        ];

        foreach ($videos as $v) {
            GalleryVideo::updateOrCreate(['youtube_id' => $v['youtube_id']], $v);
        }

        // 9. Seed Comprehensive Enterprise Site Settings
        $settings = [
            // General & Branding
            'site_title_en' => 'Berlo Communications — Strategic PR & Communications Agency',
            'site_title_bn' => 'বার্লো কমিউনিকেশন্স — কৌশলগত জনসংযোগ ও যোগাযোগ সংস্থা',
            'site_tagline_en' => 'Strategic PR, Corporate Communications & Powerful Brand Narratives',
            'site_tagline_bn' => 'কৌশলগত জনসংযোগ, প্রাতিষ্ঠানিক যোগাযোগ ও ব্র্যান্ড ন্যারেটিভ',
            'agency_name' => 'Berlo Communications Ltd.',
            'logo_light' => '/brand/logo.png',
            'logo_dark' => '/brand/logo.png',
            'logo_mobile' => '/brand/logo.png',
            'favicon' => '/favicon.ico',
            'og_image' => '/brand/logo.png',

            // Styling & Theme
            'primary_color' => '#A302FF',
            'primary_hover' => '#8D00DE',
            'accent_color' => '#11813C',
            'dark_bg_color' => '#07090D',
            'font_family_latin' => 'Inter, sans-serif',
            'font_family_bengali' => "'Hind Siliguri', sans-serif",

            // Contact & Headquarters
            'hotline_number' => '+880 1711 268 479',
            'primary_phone' => '+880 1711 268 479',
            'secondary_phone' => '+880 1812 336 789',
            'contact_email' => 'contact@berlocommunications.com',
            'press_email' => 'media@berlocommunications.com',
            'support_email' => 'shatarupa@berlocommunications.com',
            'office_address_en' => 'Apartment - B3, House - 32/34, Road - 07, Block - C, Niketon, Gulshan-1, Dhaka-1212, Bangladesh',
            'office_address_bn' => 'অ্যাপার্টমেন্ট - বি৩, বাড়ি - ৩২/৩৪, রোড - ০৭, ব্লক - সি, নিকেতন, গুলশান-১, ঢাকা-১২১২, বাংলাদেশ',
            'working_hours_en' => 'Sunday - Thursday: 9:00 AM - 6:30 PM (BST)',
            'working_hours_bn' => 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - সন্ধ্যা ৬:৩০ (বিএসটি)',
            'google_maps_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.520448100588!2d90.40798607602324!3d23.76447838823528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7770e53a3eb%3A0x6b803273e04cf5e1!2sNiketon%2C%20Gulshan-1%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd',
            'google_maps_link' => 'https://maps.google.com/?q=Niketon+Gulshan-1+Dhaka',

            // Social Channels
            'whatsapp_number' => '+8801711268479',
            'social_facebook' => 'https://facebook.com/berlocommunications',
            'social_linkedin' => 'https://linkedin.com/company/berlocommunications',
            'social_instagram' => 'https://instagram.com/berlocommunications',
            'social_twitter' => 'https://twitter.com/berlocomms',
            'social_youtube' => 'https://youtube.com/@berlocommunications',

            // Marketing & Tracking Tools
            'google_search_console' => 'google-site-verification=berlo-gsc-token-verification-2026',
            'google_analytics_id' => 'G-BERLOPR2026',
            'google_tag_manager_id' => 'GTM-BERLO01',
            'bing_webmaster_code' => 'msvalidate.01=BERLOBING2026VERIFIED',
            'facebook_pixel_id' => 'FB-PIXEL-BERLO-2026',
            'custom_head_scripts' => '',
            'custom_body_scripts' => '',
        ];

        foreach ($settings as $key => $val) {
            SiteSetting::set($key, $val, 'text', 'general');
        }

        // 10. Seed Demo Inquiry
        Inquiry::updateOrCreate(
            ['email' => 'director@topconglomerate.com'],
            [
                'name' => 'Mahmudur Rahman',
                'phone' => '+880 1712 345 678',
                'organization' => 'Top National Conglomerate',
                'service_interest' => 'Crisis Communication & Reputation Risk',
                'budget_range' => '$10,000 - $25,000',
                'message' => 'We are preparing for a major market restructuring and require senior reputation risk advisory and spokesperson training.',
                'source' => 'contact_form',
                'status' => 'pending',
                'ip_address' => '127.0.0.1',
            ]
        );
    }
}

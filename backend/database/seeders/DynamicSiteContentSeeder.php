<?php

namespace Database\Seeders;

use App\Models\MediaAsset;
use App\Models\MenuItem;
use App\Models\PageSection;
use Illuminate\Database\Seeder;

class DynamicSiteContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Navigation Menus
        $this->seedNavigationMenus();

        // 2. Seed Default Media Assets
        $this->seedMediaAssets();

        // 3. Seed Page Sections
        $this->seedPageSections();
    }

    private function seedNavigationMenus(): void
    {
        MenuItem::query()->delete();

        // Header Menu Items
        $home = MenuItem::create([
            'location' => 'header',
            'title_en' => 'Home',
            'title_bn' => 'হোম',
            'url' => '/en',
            'order' => 1,
            'is_active' => true,
        ]);

        $about = MenuItem::create([
            'location' => 'header',
            'title_en' => 'About',
            'title_bn' => 'আমাদের সম্পর্কে',
            'url' => '/en/about',
            'order' => 2,
            'is_active' => true,
        ]);

        // Submenus under About
        MenuItem::create([
            'location' => 'header',
            'parent_id' => $about->id,
            'title_en' => 'Agency Profile',
            'title_bn' => 'এজেন্সি পরিচিতি',
            'url' => '/en/about',
            'order' => 1,
            'is_active' => true,
        ]);
        MenuItem::create([
            'location' => 'header',
            'parent_id' => $about->id,
            'title_en' => 'Leadership',
            'title_bn' => 'নেতৃত্ব',
            'url' => '/en/leadership',
            'order' => 2,
            'is_active' => true,
        ]);
        MenuItem::create([
            'location' => 'header',
            'parent_id' => $about->id,
            'title_en' => 'Advisory Team',
            'title_bn' => 'উপদেষ্টা পর্ষদ',
            'url' => '/en/team',
            'order' => 3,
            'is_active' => true,
        ]);
        MenuItem::create([
            'location' => 'header',
            'parent_id' => $about->id,
            'title_en' => 'Careers & Openings',
            'title_bn' => 'ক্যারিয়ার ও সুযোগ',
            'url' => '/en/careers',
            'order' => 4,
            'is_active' => true,
        ]);

        MenuItem::create([
            'location' => 'header',
            'title_en' => 'Services',
            'title_bn' => 'সেবাসমূহ',
            'url' => '/en/services',
            'order' => 3,
            'is_active' => true,
        ]);

        MenuItem::create([
            'location' => 'header',
            'title_en' => 'Case Studies',
            'title_bn' => 'কেস স্টাডিজ',
            'url' => '/en/work',
            'order' => 4,
            'is_active' => true,
        ]);

        MenuItem::create([
            'location' => 'header',
            'title_en' => 'Clients',
            'title_bn' => 'ক্লায়েন্টবৃন্দ',
            'url' => '/en/clients',
            'order' => 5,
            'is_active' => true,
        ]);

        MenuItem::create([
            'location' => 'header',
            'title_en' => 'Insights',
            'title_bn' => 'ইনসাইটস',
            'url' => '/en/insights',
            'order' => 6,
            'is_active' => true,
        ]);

        $gallery = MenuItem::create([
            'location' => 'header',
            'title_en' => 'Gallery',
            'title_bn' => 'গ্যালারি',
            'url' => '/en/gallery/photos',
            'order' => 7,
            'is_active' => true,
        ]);

        // Submenus under Gallery
        MenuItem::create([
            'location' => 'header',
            'parent_id' => $gallery->id,
            'title_en' => 'Photo Gallery',
            'title_bn' => 'ফটোগ্যালারি',
            'url' => '/en/gallery/photos',
            'order' => 1,
            'is_active' => true,
        ]);
        MenuItem::create([
            'location' => 'header',
            'parent_id' => $gallery->id,
            'title_en' => 'Video Gallery',
            'title_bn' => 'ভিডিও গ্যালারি',
            'url' => '/en/gallery/videos',
            'order' => 2,
            'is_active' => true,
        ]);

        MenuItem::create([
            'location' => 'header',
            'title_en' => 'Contact',
            'title_bn' => 'যোগাযোগ',
            'url' => '/en/contact',
            'order' => 8,
            'is_active' => true,
        ]);

        // Footer Quick Links
        $footerQuick = [
            ['title_en' => 'About Berlo', 'title_bn' => 'বার্লো সম্পর্কে', 'url' => '/en/about'],
            ['title_en' => 'Executive Leadership', 'title_bn' => 'নির্বাহী নেতৃত্ব', 'url' => '/en/leadership'],
            ['title_en' => 'Advisory Team', 'title_bn' => 'আমাদের দল', 'url' => '/en/team'],
            ['title_en' => 'Careers & Openings', 'title_bn' => 'ক্যারিয়ার', 'url' => '/en/careers'],
            ['title_en' => 'Client Portfolio', 'title_bn' => 'ক্লায়েন্ট তালিকা', 'url' => '/en/clients'],
            ['title_en' => 'Press Media Desk', 'title_bn' => 'মিডিয়া ডেস্ক', 'url' => '/en/media'],
            ['title_en' => 'Contact Headquarters', 'title_bn' => 'যোগাযোগ', 'url' => '/en/contact'],
        ];

        foreach ($footerQuick as $idx => $item) {
            MenuItem::create([
                'location' => 'footer_quick',
                'title_en' => $item['title_en'],
                'title_bn' => $item['title_bn'],
                'url' => $item['url'],
                'order' => $idx + 1,
                'is_active' => true,
            ]);
        }

        // Footer Capabilities Links
        $footerCapabilities = [
            ['title_en' => 'Strategic PR', 'title_bn' => 'কৌশলগত জনসংযোগ', 'url' => '/en/services/strategic-pr'],
            ['title_en' => 'Media Relations', 'title_bn' => 'মিডিয়া সম্পর্ক', 'url' => '/en/services/media-relations'],
            ['title_en' => 'Crisis Management', 'title_bn' => 'সংকট ও সুনাম ব্যবস্থাপনা', 'url' => '/en/services/crisis-reputation-management'],
            ['title_en' => 'Events & Activations', 'title_bn' => 'ইভেন্ট ও ব্র্যান্ড সক্রিয়করণ', 'url' => '/en/services/events-brand-activations'],
            ['title_en' => 'Visual Storytelling', 'title_bn' => 'ভিজ্যুয়াল স্টোরিটেলিং', 'url' => '/en/services/visual-storytelling-design'],
        ];

        foreach ($footerCapabilities as $idx => $item) {
            MenuItem::create([
                'location' => 'footer_capabilities',
                'title_en' => $item['title_en'],
                'title_bn' => $item['title_bn'],
                'url' => $item['url'],
                'order' => $idx + 1,
                'is_active' => true,
            ]);
        }
    }

    private function seedMediaAssets(): void
    {
        MediaAsset::query()->delete();

        $assets = [
            [
                'name' => 'Berlo Primary Logo',
                'file_name' => 'logo.png',
                'file_path' => 'brand/logo.png',
                'url' => '/brand/logo.png',
                'mime_type' => 'image/png',
                'size_bytes' => 45200,
                'dimensions' => '320x96',
                'folder' => 'brand',
                'alt_text' => 'Berlo Communications Logo',
            ],
            [
                'name' => 'Hero 3D Character Illustration',
                'file_name' => 'hero_character_crisis.png',
                'file_path' => 'hero_character_crisis.png',
                'url' => '/hero_character_crisis.png',
                'mime_type' => 'image/png',
                'size_bytes' => 280000,
                'dimensions' => '800x800',
                'folder' => 'general',
                'alt_text' => 'Berlo Crisis Communications Hero Character',
            ],
            [
                'name' => 'Default Staff Avatar',
                'file_name' => 'avatar-placeholder.png',
                'file_path' => 'brand/avatar-placeholder.png',
                'url' => '/brand/avatar-placeholder.png',
                'mime_type' => 'image/png',
                'size_bytes' => 12400,
                'dimensions' => '200x200',
                'folder' => 'team',
                'alt_text' => 'Staff avatar placeholder',
            ],
        ];

        foreach ($assets as $asset) {
            MediaAsset::create($asset);
        }
    }

    private function seedPageSections(): void
    {
        PageSection::query()->delete();

        // 1. Home Page Sections
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'hero',
            'title_en' => 'Your Strategic PR partner for corporate success.',
            'title_bn' => 'কর্পোরেট সাফল্যের অনন্য কৌশলগত পিআর পার্টনার।',
            'subtitle_en' => 'Welcome to Berlo Communications Ltd., one of the premier Public Relations and strategic corporate communications agencies in Bangladesh. With our innovative narrative engineering and results-oriented media access, we help enterprises protect reputation, command authority, and accelerate sustainable growth.',
            'subtitle_bn' => 'বার্লো কমিউনিকেশন্সে আপনাকে স্বাগতম—বাংলাদেশের অন্যতম শীর্ষস্থানীয় করপোরেট পিআর ও কৌশলগত যোগাযোগ সংস্থা। আমাদের উদ্ভাবনী কৌশল ও ফলমুখী দৃষ্টিভঙ্গির মাধ্যমে আমরা শীর্ষ প্রতিষ্ঠান ও বহুজাতিক ব্র্যান্ডের দীর্ঘমেয়াদী সুনাম বিনির্মাণ ও সংকট ব্যবস্থাপনা পরিচালনা করি।',
            'badge_en' => 'Leading Strategic PR & Crisis Advisory Firm',
            'badge_bn' => 'শীর্ষস্থানীয় কৌশলগত জনসংযোগ ও ক্রাইসিস অ্যাডভাইজরি ফার্ম',
            'image_url' => '/images/berlo/hero-3d-1.png',
            'cta_text_en' => 'Book Free Consultation',
            'cta_text_bn' => 'পরামর্শ সেশন বুক করুন',
            'cta_link' => '#consultancy',
            'metadata' => [
                'secondary_cta_text_en' => 'Working scope with you',
                'secondary_cta_text_bn' => 'আমাদের সেবাসমূহ',
                'secondary_cta_link' => '#services',
                'direct_hotline' => '+880 1711 268 479',
                'working_hours' => 'Sunday - Thursday: 9:00 AM - 6:30 PM (BST)',
                'address_summary' => 'Niketon, Gulshan-1, Dhaka',
                'slides' => [
                    [
                        'id' => 1,
                        'image' => '/images/berlo/hero-3d-1.png',
                        'tag_en' => 'Reputation Architecture',
                        'tag_bn' => 'কর্পোরেট সুনাম সুরক্ষা',
                        'text_en' => 'Architecting enduring corporate reputation and C-suite authority.',
                        'text_bn' => 'কর্পোরেট সুনাম সুরক্ষা ও সি-সুইট এক্সিকিউটিভ ব্র্যান্ডিং।',
                        'metric_en' => '+320% Positive Sentiment',
                        'metric_bn' => '+৩২০% ইতিবাচক জনমত',
                        'submetric_en' => '100+ Tier-1 Newsdesks Engaged',
                        'submetric_bn' => '১০০+ শীর্ষ নিউজডেস্ক সংযোগ',
                        'badge_title_en' => 'PR Network',
                        'badge_title_bn' => 'পিআর নেটওয়ার্ক',
                        'badge_status_en' => 'Active & Monitored',
                        'badge_status_bn' => 'সক্রিয় ও পর্যবেক্ষণাধীন',
                        'icon_type' => 'network',
                        'blob_gradient' => 'from-[#5B028F] via-[#A302FF] to-[#1A305A]',
                    ],
                    [
                        'id' => 2,
                        'image' => '/images/berlo/hero-3d-2.png',
                        'tag_en' => '24/7 Crisis War-Room',
                        'tag_bn' => '২৪/৭ ক্রাইসিস ওয়ার-রুম',
                        'text_en' => '24/7 Rapid Crisis War-Room: De-escalating reputational risks within 60 minutes.',
                        'text_bn' => '২৪/৭ দ্রুত সংকট ব্যবস্থাপনা: সুনামহানি প্রতিরোধে নির্ভরযোগ্য প্রটোকল।',
                        'metric_en' => '60-Minute Rapid Response',
                        'metric_bn' => '৬০ মিনিট প্রতিক্রিয়া গতি',
                        'submetric_en' => '100% Boardroom NDA Protocol',
                        'submetric_bn' => '১০০% এনডিএ নিশ্চয়তা',
                        'badge_title_en' => 'Crisis Shield',
                        'badge_title_bn' => 'ক্রাইসিস শিল্ড',
                        'badge_status_en' => 'Active & Monitored',
                        'badge_status_bn' => 'সক্রিয় ও পর্যবেক্ষণাধীন',
                        'icon_type' => 'shield',
                        'blob_gradient' => 'from-[#0A4B20] via-[#11813C] to-[#0A2540]',
                    ],
                    [
                        'id' => 3,
                        'image' => '/images/berlo/hero-3d-3.png',
                        'tag_en' => 'Tier-1 Media Access',
                        'tag_bn' => 'জাতীয় গণমাধ্যম সংযোগ',
                        'text_en' => 'Securing prime-time broadcast and national front-page editorial coverage.',
                        'text_bn' => 'জাতীয় শীর্ষ দৈনিক ও টেলিভিশন নেটওয়ার্কে সরাসরি সম্পাদকীয় সংযোগ।',
                        'metric_en' => '98.7% Media Placement Success',
                        'metric_bn' => '৯৮.৭% কভারেজ সাফল্য',
                        'submetric_en' => '250+ Corporate Campaigns',
                        'submetric_bn' => '২৫০+ সফল ক্যাম্পেইন',
                        'badge_title_en' => 'Prime-Time',
                        'badge_title_bn' => 'প্রাইম-টাইম',
                        'badge_status_en' => 'Active & Monitored',
                        'badge_status_bn' => 'সক্রিয় ও পর্যবেক্ষণাধীন',
                        'icon_type' => 'broadcast',
                        'blob_gradient' => 'from-[#0A2540] via-[#1A305A] to-[#A302FF]',
                    ],
                ],
            ],
            'sort_order' => 1,
            'is_active' => true,
        ]);

        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'stats',
            'title_en' => 'Measurable Impact, Proven Trust',
            'title_bn' => 'পরিমাপযোগ্য প্রভাব ও প্রতিষ্ঠিত বিশ্বাস',
            'subtitle_en' => 'Decades of combined senior leadership experience advising boardrooms and multinational organizations.',
            'subtitle_bn' => 'বোর্ডরুম ও বহুজাতিক সংস্থাকে পরামর্শ প্রদানে সিনিয়র নেতৃত্বের বহু বছরের যৌথ অভিজ্ঞতা।',
            'metadata' => [
                'stats_list' => [
                    ['value' => '98%', 'label_en' => 'Crisis Resolution Rate', 'label_bn' => 'সংকট নিরসন হার', 'icon' => 'ShieldCheck'],
                    ['value' => '150+', 'label_en' => 'Corporate Clients Advised', 'label_bn' => 'পরামর্শপ্রাপ্ত কর্পোরেট প্রতিষ্ঠান', 'icon' => 'Building2'],
                    ['value' => '14+', 'label_en' => 'Industry Awards & Honors', 'label_bn' => 'শিল্প পদক ও সম্মাননা', 'icon' => 'Award'],
                    ['value' => '24/7', 'label_en' => 'Emergency Response Protocol', 'label_bn' => 'জরুরি রেসপন্স প্রোটোকল', 'icon' => 'Clock'],
                ],
            ],
            'sort_order' => 2,
            'is_active' => true,
        ]);

        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'why_us',
            'title_en' => 'Why Leading Enterprises Choose Berlo',
            'title_bn' => 'শীর্ষস্থানীয় কর্পোরেশন কেন বার্লো বেছে নেয়',
            'subtitle_en' => 'When your corporate reputation is on the line, generic PR is not enough. You need seasoned strategists.',
            'subtitle_bn' => 'কর্পোরেট সুনাম যখন ঝুঁকিতে, সাধারণ পিআর যথেষ্ট নয়। আপনার প্রয়োজন অভিজ্ঞ কৌশলবিদ।',
            'metadata' => [
                'pillars' => [
                    [
                        'title_en' => 'Strict Confidentiality',
                        'title_bn' => 'কঠোর গোপনীয়তা',
                        'desc_en' => 'Every boardroom consultation and crisis protocol is protected under ironclad NDAs.',
                        'desc_bn' => 'প্রতিটি পরামর্শ ও ক্রাইসিস ব্যবস্থাপনা সুরক্ষিত থাকে আইনি এনডিএ কাঠামোর অধীনে।',
                        'icon' => 'Lock',
                    ],
                    [
                        'title_en' => 'Direct Media Access',
                        'title_bn' => 'সরাসরি মিডিয়া সংযোগ',
                        'desc_en' => 'First-tier relationships with national editors, broadcast heads, and key digital journalists.',
                        'desc_bn' => 'জাতীয় পর্যায়ের সম্পাদক, সম্প্রচার প্রধান এবং শীর্ষ সাংবাদিকদের সাথে গভীর ও বিশ্বস্ত সম্পর্ক।',
                        'icon' => 'Radio',
                    ],
                    [
                        'title_en' => 'Decisive Speed & Precision',
                        'title_bn' => 'গতি ও নির্ভুল সিদ্ধান্ত',
                        'desc_en' => 'Active response teams deployed within minutes during breaking misinformation or brand attacks.',
                        'desc_bn' => 'গুজব বা আক্রমণ প্রতিরোধে কয়েক মিনিটের মধ্যে কার্যকর রেসপন্স দল সক্রিয় হয়।',
                        'icon' => 'Zap',
                    ],
                    [
                        'title_en' => 'Multi-Industry Acumen',
                        'title_bn' => 'বহু-শিল্প অভিজ্ঞতা',
                        'desc_en' => 'Extensive depth across Banking, Telecommunications, FMCG, Energy, and Government.',
                        'desc_bn' => 'ব্যাংকিং, টেলিকম, এফএমসিজি, জ্বালানি ও সরকারি খাতে বিস্তৃত অভিজ্ঞতা।',
                        'icon' => 'Briefcase',
                    ],
                ],
            ],
            'sort_order' => 3,
            'is_active' => true,
        ]);

        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'cta',
            'title_en' => 'Facing a High-Stakes Crisis or Strategic Milestone?',
            'title_bn' => 'কোনো জরুরি সংকট বা কৌশলগত মাইলফলকের মুখোমুখি?',
            'subtitle_en' => 'Connect directly with our Managing Advisory Team. Immediate response under strict confidentiality.',
            'subtitle_bn' => 'আমাদের ম্যানেজিং পার্টনারদের সাথে সরাসরি যোগাযোগ করুন। কঠোর গোপনীয়তার সাথে তাৎক্ষণিক সমাধান।',
            'cta_text_en' => 'Schedule Executive Consultation',
            'cta_text_bn' => 'নির্বাহী পরামর্শ নির্ধারণ করুন',
            'cta_link' => '/en/contact',
            'sort_order' => 4,
            'is_active' => true,
        ]);

        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'video_showcase',
            'title_en' => 'Experience Strategic Leadership in Motion',
            'title_bn' => 'কৌশলগত নেতৃত্বের দৃশ্যমান গতিশীলতা',
            'subtitle_en' => 'Watch how Berlo navigates high-stakes corporate narratives, manages live broadcast press delegations, and commands national media discourse.',
            'subtitle_bn' => 'দেখুন কীভাবে বার্লো জাতীয় সংকট নিরসন, সরাসরি গণমাধ্যম ব্রিফিং এবং করপোরেট আখ্যান পরিচালনা করে।',
            'badge_en' => 'The Agency in Motion',
            'badge_bn' => 'সক্রিয় জনসংযোগ সংস্থা',
            'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'image_url' => '/images/berlo/gallery/moment-3.jpg',
            'cta_text_en' => 'Watch Full Briefing',
            'cta_text_bn' => 'সম্পূর্ণ ভিডিও দেখুন',
            'cta_link' => '#playVideo',
            'sort_order' => 5,
            'is_active' => true,
        ]);

        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'services_header',
            'title_en' => 'Strategic Capabilities & Core PR Services',
            'title_bn' => 'কৌশলগত সক্ষমতা ও মূল জনসংযোগ সেবাসমূহ',
            'subtitle_en' => 'Precision-engineered communications frameworks built to elevate leadership, protect assets, and drive stakeholder action.',
            'subtitle_bn' => 'নেতৃত্বকে সুদৃঢ় করতে, ব্র্যান্ড মূল্যায়ন রক্ষা করতে এবং অংশীদারদের অনুপ্রাণিত করতে আমাদের সুনির্দিষ্ট সেবা।',
            'badge_en' => 'Specialized Practices',
            'badge_bn' => 'বিশেষায়িত সেবাসমূহ',
            'sort_order' => 6,
            'is_active' => true,
        ]);

        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'consultancy_header',
            'title_en' => 'Direct C-Suite Communications Consultation',
            'title_bn' => 'সি-সুইট নির্বাহীদের জন্য কৌশলগত পরামর্শ',
            'subtitle_en' => 'Select your priority communications challenge to initiate a confidential briefing with our senior partners.',
            'subtitle_bn' => 'আপনার প্রতিষ্ঠানের অগ্রাধিকার নির্বাচন করে আমাদের সিনিয়র পার্টনারদের সাথে কনফিডেনশিয়াল ব্রিফিং শুরু করুন।',
            'badge_en' => 'Confidential Advisory',
            'badge_bn' => 'গোপনীয় পরামর্শ',
            'sort_order' => 7,
            'is_active' => true,
        ]);

        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'case_studies_header',
            'title_en' => 'Featured Case Studies & High-Stakes Milestones',
            'title_bn' => 'নির্বাচিত কেস স্টাডি ও কৌশলগত সাফল্য',
            'subtitle_en' => 'Empirical proof of how we de-escalated hostile narratives and delivered multi-billion stakeholder value.',
            'subtitle_bn' => 'কঠিন পরিস্থিতিতে সুনাম সুরক্ষা এবং শতকোটি টাকার ব্র্যান্ড ভ্যালু বৃদ্ধির প্রামাণ্য মাইলফলক।',
            'badge_en' => 'Proven Results',
            'badge_bn' => 'বাস্তব সাফল্য',
            'sort_order' => 8,
            'is_active' => true,
        ]);

        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'gallery_header',
            'title_en' => 'Moments & National Media Roundtables',
            'title_bn' => 'গণমাধ্যম গোলটেবিল ও জাতীয় মুহূর্তসমূহ',
            'subtitle_en' => 'Live press delegations, television studio appearances, and high-level corporate delegations.',
            'subtitle_bn' => 'জাতীয় প্রেস কনফারেন্স, টেলিভিশন গোলটেবিল এবং সিনিয়র নেতৃত্বের ঐতিহাসিক মুহূর্তসমূহ।',
            'badge_en' => 'Archival Moments',
            'badge_bn' => 'ঐতিহাসিক মুহূর্ত',
            'sort_order' => 9,
            'is_active' => true,
        ]);

        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'leadership_header',
            'title_en' => 'Architects of Influence: Senior Leadership',
            'title_bn' => 'প্রভাব ও আখ্যানের স্থপতি: শীর্ষ নেতৃত্ব',
            'subtitle_en' => 'Led by veteran editors, investigative journalists, and corporate strategists with decades of proven authority.',
            'subtitle_bn' => 'অভিজ্ঞ সম্পাদক, অনুসন্ধানী সাংবাদিক এবং করপোরেট কৌশলবিদদের সমন্বয়ে গঠিত দেশসেরা টিম।',
            'badge_en' => 'Strategic Counsel',
            'badge_bn' => 'কৌশলগত নেতৃত্ব',
            'sort_order' => 10,
            'is_active' => true,
        ]);

        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'insights_header',
            'title_en' => 'Thought Leadership & Industry Intelligence',
            'title_bn' => 'বিশেষজ্ঞ মতামত ও শিল্প বিশ্লেষণ',
            'subtitle_en' => 'Proprietary research, boardroom advisories, and media sentiment trends shaping Bangladesh.',
            'subtitle_bn' => 'বাংলাদেশের নীতিনির্ধারণ ও করপোরেট পরিমণ্ডল পরিচালনাকারী বিশ্লেষণধর্মী প্রবন্ধ ও গবেষণা।',
            'badge_en' => 'Intelligence & Insights',
            'badge_bn' => 'ইনসাইটস ও মতামত',
            'sort_order' => 11,
            'is_active' => true,
        ]);

        // 2. About Page Sections
        PageSection::create([
            'page_slug' => 'about',
            'section_key' => 'hero',
            'title_en' => 'Architecting Narrative Leadership for Bangladesh and Beyond',
            'title_bn' => 'বাংলাদেশের প্রেক্ষিতে দূরদর্শী ও দায়িত্বশীল যোগাযোগ ব্যবস্থার রূপকার',
            'subtitle_en' => 'Berlo Communications is an executive strategic communications and public relations firm advising top-tier corporations, multinationals, and governing entities.',
            'subtitle_bn' => 'বার্লো কমিউনিকেশনস একটি কৌশলগত জনসংযোগ সংস্থা, যা শীর্ষস্থানীয় কর্পোরেট ও বহুজাতিক প্রতিষ্ঠানের সুনাম সুরক্ষায় কাজ করে।',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        // 3. Contact Page Sections
        PageSection::create([
            'page_slug' => 'contact',
            'section_key' => 'info',
            'title_en' => 'Executive Consultation & Headquarters Desk',
            'title_bn' => 'নির্বাহী পরামর্শ ও প্রধান কার্যালয়',
            'subtitle_en' => 'Reach out to our strategic desk for media inquiries, retainer proposals, and confidential crisis management.',
            'subtitle_bn' => 'মিডিয়া সংক্রান্ত তথ্য ও জরুরি পরামর্শের জন্য আমাদের কৌশলগত দলের সাথে যোগাযোগ করুন।',
            'metadata' => [
                'hotline' => '+880 1711 268 479',
                'secondary_phone' => '+880 1812 336 789',
                'email' => 'contact@berlocommunications.com',
                'secondary_email' => 'shatarupa@berlocommunications.com',
                'address' => 'Apartment - B3, House - 32/34, Road - 07, Block - C, Niketon, Gulshan-1, Dhaka, Bangladesh',
                'hours' => 'Sunday - Thursday: 9:00 AM - 6:30 PM (BST)',
                'emergency_support' => '24/7 Crisis Hotline Available for Retainer Clients',
            ],
            'sort_order' => 1,
            'is_active' => true,
        ]);
    }
}

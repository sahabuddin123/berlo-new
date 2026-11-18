<?php

namespace Database\Seeders;

use App\Models\MediaAsset;
use App\Models\MenuItem;
use App\Models\PageSection;
use App\Models\TeamMember;
use App\Models\Client;
use App\Models\Testimonial;
use App\Models\Project;
use App\Models\GalleryPhoto;
use App\Models\Service;
use App\Models\Insight;
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

        // 3. Seed Full Entities (Team, Clients, Projects, Gallery, Testimonials)
        $this->seedEntities();

        // 4. Seed Page Sections (All 14 Sections for Home Page with complete metadata)
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

        // Gallery Menu with Photo & Video Submenus
        $gallery = MenuItem::create([
            'location' => 'header',
            'title_en' => 'Gallery',
            'title_bn' => 'গ্যালারি',
            'url' => '/en/gallery/photos',
            'order' => 7,
            'is_active' => true,
        ]);

        MenuItem::create([
            'location' => 'header',
            'parent_id' => $gallery->id,
            'title_en' => 'Photo Gallery',
            'title_bn' => 'ফটো গ্যালারি',
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
            ['title_en' => 'About Berlo', 'title_bn' => 'বার্লো পরিচিতি', 'url' => '/en/about'],
            ['title_en' => 'Leadership', 'title_bn' => 'নেতৃত্ব', 'url' => '/en/leadership'],
            ['title_en' => 'Advisory Team', 'title_bn' => 'উপদেষ্টা পর্ষদ', 'url' => '/en/team'],
            ['title_en' => 'Case Studies', 'title_bn' => 'কেস স্টাডিজ', 'url' => '/en/work'],
            ['title_en' => 'Clients & Testimonials', 'title_bn' => 'ক্লায়েন্ট ও প্রতিক্রিয়া', 'url' => '/en/clients'],
            ['title_en' => 'Photo Gallery', 'title_bn' => 'ফটো গ্যালারি', 'url' => '/en/gallery/photos'],
            ['title_en' => 'Video Gallery', 'title_bn' => 'ভিডিও গ্যালারি', 'url' => '/en/gallery/videos'],
            ['title_en' => 'Careers', 'title_bn' => 'ক্যারিয়ার', 'url' => '/en/careers'],
            ['title_en' => 'Contact Us', 'title_bn' => 'যোগাযোগ', 'url' => '/en/contact'],
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

        // Footer Capabilities
        $capabilities = [
            ['title_en' => 'Strategic Media Relations', 'title_bn' => 'কৌশলগত মিডিয়া যোগাযোগ', 'url' => '/en/services'],
            ['title_en' => 'Crisis & Reputation Management', 'title_bn' => 'সংকট ও সুনাম ব্যবস্থাপনা', 'url' => '/en/services'],
            ['title_en' => 'Corporate Communications', 'title_bn' => 'কর্পোরেট যোগাযোগ', 'url' => '/en/services'],
            ['title_en' => 'Brand & Visual Identity', 'title_bn' => 'ব্র্যান্ড ও ভিজ্যুয়াল পরিচিতি', 'url' => '/en/services'],
            ['title_en' => 'Digital Sentiment & PR', 'title_bn' => 'ডিজিটাল সেন্টিমেন্ট ও পিআর', 'url' => '/en/services'],
            ['title_en' => 'Media Training & Advisory', 'title_bn' => 'মিডিয়া প্রশিক্ষণ ও পরামর্শ', 'url' => '/en/services'],
        ];

        foreach ($capabilities as $idx => $item) {
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
                'name' => 'Hero 3D Slide 1 Character',
                'file_name' => 'hero-3d-1.png',
                'file_path' => 'images/berlo/hero-3d-1.png',
                'url' => '/images/berlo/hero-3d-1.png',
                'mime_type' => 'image/png',
                'size_bytes' => 320000,
                'dimensions' => '800x800',
                'folder' => 'hero',
                'alt_text' => 'Reputation Architecture 3D Character',
            ],
            [
                'name' => 'Hero 3D Slide 2 Character',
                'file_name' => 'hero-3d-2.png',
                'file_path' => 'images/berlo/hero-3d-2.png',
                'url' => '/images/berlo/hero-3d-2.png',
                'mime_type' => 'image/png',
                'size_bytes' => 310000,
                'dimensions' => '800x800',
                'folder' => 'hero',
                'alt_text' => 'Crisis War-Room 3D Character',
            ],
            [
                'name' => 'Hero 3D Slide 3 Character',
                'file_name' => 'hero-3d-3.png',
                'file_path' => 'images/berlo/hero-3d-3.png',
                'url' => '/images/berlo/hero-3d-3.png',
                'mime_type' => 'image/png',
                'size_bytes' => 330000,
                'dimensions' => '800x800',
                'folder' => 'hero',
                'alt_text' => 'Tier-1 Media Access 3D Character',
            ],
        ];

        foreach ($assets as $asset) {
            MediaAsset::create($asset);
        }
    }

    private function seedEntities(): void
    {
        // 1. Team Members (6 Executives matching Homepage)
        TeamMember::query()->delete();
        $team = [
            [
                'slug' => 'shakhawat-ullah',
                'name_en' => 'Shakhawat Ullah',
                'name_bn' => 'সাখাওয়াত উল্লাহ',
                'role_en' => 'Planning & Communication Lead',
                'role_bn' => 'পরিকল্পনা ও যোগাযোগ প্রধান',
                'division_en' => 'strategy',
                'division_bn' => 'কৌশলগত পরিকল্পনা',
                'photo' => '/images/berlo/team/shakwat-ullah-01.jpg',
                'bio_en' => 'Strategic mastermind behind Berlo’s corporate positioning frameworks, guiding C-suite clients through narrative architecture and stakeholder management.',
                'bio_bn' => 'বার্লোর করপোরেট পজিশনিং ফ্রেমওয়ার্কের মূল রূপকার, যিনি শীর্ষ করপোরেট ক্লায়েন্টদের ন্যারেটিভ আর্কিটেকচার ও অংশীজন ব্যবস্থাপনায় দিকনির্দেশনা দেন।',
                'is_leadership' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'md-kabir-hossain',
                'name_en' => 'Md. Kabir Hossain',
                'name_bn' => 'মোঃ কবির হোসেন',
                'role_en' => 'Senior Manager, Public Relations',
                'role_bn' => 'সিনিয়র ম্যানেজার, পাবলিক রিলেশনস',
                'division_en' => 'pr',
                'division_bn' => 'ন্যাশনাল মিডিয়া পিআর',
                'photo' => '/images/berlo/team/img-20260301-wa0001.jpg',
                'bio_en' => 'Senior PR strategist with comprehensive relationships across national newsrooms, editorial boards, and premier broadcast networks.',
                'bio_bn' => 'জাতীয় নিউজ রুম, সম্পাদকীয় পর্ষদ এবং শীর্ষ টেলিভিশন নেটওয়ার্কের সাথে সুদৃঢ় ও বিশ্বস্ত সংযোগসম্পন্ন অভিজ্ঞ পিআর স্ট্র্যাটেজিস্ট।',
                'is_leadership' => true,
                'sort_order' => 2,
            ],
            [
                'slug' => 'akm-zamshed-uddin',
                'name_en' => 'A K M Zamshed Uddin',
                'name_bn' => 'এ কে এম জামশেদ উদ্দিন',
                'role_en' => 'Events & Activation Lead',
                'role_bn' => 'ইভেন্ট ও অ্যাক্টিভেশন প্রধান',
                'division_en' => 'events',
                'division_bn' => 'ইভেন্ট ও সামিট',
                'photo' => '/images/berlo/team/zamshed.png',
                'bio_en' => 'Veteran event producer orchestrating high-profile ministerial summits, immersive product unveilings, and countrywide brand roadshows.',
                'bio_bn' => 'মন্ত্রী পর্যায়ের আন্তর্জাতিক সামিট, আলোড়ন সৃষ্টিকারী পণ্য উন্মোচন এবং দেশব্যাপী রোডশো আয়োজনে দক্ষ ও অভিজ্ঞ ইভেন্ট প্রডিউসার।',
                'is_leadership' => true,
                'sort_order' => 3,
            ],
            [
                'slug' => 'kabery-azad',
                'name_en' => 'Kabery Azad',
                'name_bn' => 'কাকেরী আজাদ',
                'role_en' => 'Consultant of Arts & Visual Design',
                'role_bn' => 'শিল্প ও ভিজ্যুয়াল ডিজাইন পরামর্শক',
                'division_en' => 'creative',
                'division_bn' => 'ভিজ্যুয়াল ক্রিয়েটিভ',
                'photo' => '/images/berlo/team/shakhwat-ullah-1.png',
                'bio_en' => 'Creative visionary transforming corporate milestones into captivating visual narratives, corporate films, and international publications.',
                'bio_bn' => 'করপোরেট মাইলফলককে চিত্তাকর্ষক ভিজ্যুয়াল ন্যারেটিভ, প্রাতিষ্ঠানিক প্রামাণ্যচিত্র ও প্রকাশনায় রূপান্তরকারী।',
                'is_leadership' => true,
                'sort_order' => 4,
            ],
            [
                'slug' => 'rajin-shaleh',
                'name_en' => 'Rajin Shaleh',
                'name_bn' => 'রাজিন সালেহ',
                'role_en' => 'Jr. Executive Officer',
                'role_bn' => 'জুনিয়র এক্সিকিউটিভ অফিসার',
                'division_en' => 'media',
                'division_bn' => 'নিউজ রুম কো-অর্ডিনেশন',
                'photo' => '/images/berlo/team/team-tut.jpg',
                'bio_en' => 'Driving proactive newsroom coordination, press release monitoring, and field campaign logistics.',
                'bio_bn' => 'দৈনন্দিন মিডিয়া লিয়াজোঁ, প্রেস রিলিজ মনিটরিং ও ফিল্ড ক্যাম্পেইন সমন্বয়ক।',
                'is_leadership' => false,
                'sort_order' => 5,
            ],
            [
                'slug' => 'tahsin-al-jawad',
                'name_en' => 'Tahsin Al Jawad',
                'name_bn' => 'তাহসিন আল জাওয়াদ',
                'role_en' => 'Executive Officer',
                'role_bn' => 'এক্সিকিউটিভ অফিসার',
                'division_en' => 'planning',
                'division_bn' => 'ক্লায়েন্ট এনগেজমেন্ট',
                'photo' => '/images/berlo/team/jawad.jpg',
                'bio_en' => 'Facilitating seamless campaign roadmapping, client communications, and real-time sentiment tracking.',
                'bio_bn' => 'ক্যাম্পেইন রোডম্যাপিং, ক্লায়েন্ট এনগেজমেন্ট ও ডিজিটাল সেন্টিমেন্ট ট্র্যাকিং সমন্বয়ক।',
                'is_leadership' => false,
                'sort_order' => 6,
            ],
        ];
        foreach ($team as $m) {
            TeamMember::create($m);
        }

        // 2. Clients (16 Real Logos matching Homepage)
        Client::query()->delete();
        $clients = [
            ['name' => 'Unique Group', 'logo' => '/images/berlo/clients/unique.jpg', 'industry' => 'Conglomerate', 'tier' => 'Enterprise', 'is_featured' => true, 'sort_order' => 1],
            ['name' => 'Rahimafrooz', 'logo' => '/images/berlo/clients/rahimafrooz.jpg', 'industry' => 'Energy & Automotive', 'tier' => 'Enterprise', 'is_featured' => true, 'sort_order' => 2],
            ['name' => 'Rupayan Group', 'logo' => '/images/berlo/clients/rupayan.jpg', 'industry' => 'Real Estate', 'tier' => 'Enterprise', 'is_featured' => true, 'sort_order' => 3],
            ['name' => 'Rajasthan', 'logo' => '/images/berlo/clients/rajasthan.jpg', 'industry' => 'Hospitality', 'tier' => 'Enterprise', 'is_featured' => true, 'sort_order' => 4],
            ['name' => 'ATN News', 'logo' => '/images/berlo/clients/atn.jpg', 'industry' => 'Broadcast Media', 'tier' => 'Media', 'is_featured' => true, 'sort_order' => 5],
            ['name' => 'BAT Bangladesh', 'logo' => '/images/berlo/clients/bat.jpg', 'industry' => 'Multinational FMCG', 'tier' => 'Enterprise', 'is_featured' => true, 'sort_order' => 6],
            ['name' => 'Beacon Pharma', 'logo' => '/images/berlo/clients/beacon.jpg', 'industry' => 'Pharmaceuticals', 'tier' => 'Enterprise', 'is_featured' => true, 'sort_order' => 7],
            ['name' => 'Borak Real Estate', 'logo' => '/images/berlo/clients/borak.jpg', 'industry' => 'Real Estate', 'tier' => 'Corporate', 'is_featured' => true, 'sort_order' => 8],
            ['name' => 'Lazz Pharma', 'logo' => '/images/berlo/clients/lazzpharma.jpg', 'industry' => 'Healthcare Retail', 'tier' => 'Corporate', 'is_featured' => true, 'sort_order' => 9],
            ['name' => 'Motul BD', 'logo' => '/images/berlo/clients/motul.jpg', 'industry' => 'Automotive Lubricants', 'tier' => 'Corporate', 'is_featured' => true, 'sort_order' => 10],
            ['name' => 'IDCOL', 'logo' => '/images/berlo/clients/idcol.jpg', 'industry' => 'Development Finance', 'tier' => 'Government', 'is_featured' => true, 'sort_order' => 11],
            ['name' => 'Synova Pharma', 'logo' => '/images/berlo/clients/stynova.jpg', 'industry' => 'Healthcare', 'tier' => 'Corporate', 'is_featured' => true, 'sort_order' => 12],
            ['name' => 'Ministry of Agriculture', 'logo' => '/images/berlo/clients/agery-calture.jpg', 'industry' => 'Government', 'tier' => 'Government', 'is_featured' => true, 'sort_order' => 13],
            ['name' => 'Univ. of Asia Pacific', 'logo' => '/images/berlo/clients/uap.jpg', 'industry' => 'Education', 'tier' => 'Institutional', 'is_featured' => true, 'sort_order' => 14],
            ['name' => 'BUBT University', 'logo' => '/images/berlo/clients/bubt.jpg', 'industry' => 'Education', 'tier' => 'Institutional', 'is_featured' => true, 'sort_order' => 15],
            ['name' => 'Export Promotion Bureau', 'logo' => '/images/berlo/clients/epbb.jpg', 'industry' => 'Trade Promotion', 'tier' => 'Government', 'is_featured' => true, 'sort_order' => 16],
        ];
        foreach ($clients as $c) {
            Client::create($c);
        }

        // 3. Testimonials (3 Video Reviews)
        Testimonial::query()->delete();
        $testi = [
            [
                'author_name_en' => 'Enterprise Reputation & Brand Scaling — Client Review',
                'author_name_bn' => 'কর্পোরেট সুনাম বৃদ্ধি ও ব্র্যান্ড প্রতিষ্ঠা — ক্লায়েন্ট রিভিউ',
                'author_role_en' => 'Strategic Corporate PR & Media Advisory',
                'author_role_bn' => 'কমিউনিকেশনস অ্যান্ড স্ট্র্যাটেজিক পিআর',
                'quote_en' => 'Berlo Communications transformed our corporate presence across national broadcast networks.',
                'quote_bn' => 'বার্লো কমিউনিকেশনস জাতীয় সম্প্রচার নেটওয়ার্কে আমাদের অবস্থান আমূল বদলে দিয়েছে।',
                'rating' => 5,
                'avatar' => '/images/berlo/testimonials/stock-testimonial-1.jpg',
                'is_active' => true,
            ],
            [
                'author_name_en' => 'Nationwide Media Reach & Commercial Expansion',
                'author_name_bn' => 'জাতীয় মিডিয়া রিচ ও ব্যবসায়িক বিস্তার',
                'author_role_en' => 'Brand Visibility & Strategic Growth',
                'author_role_bn' => 'ব্র্যান্ড দৃশ্যমানতা ও লিডারশিপ প্রটোকল',
                'quote_en' => 'Their 60-minute response speed and crisis war-room is an unmatched asset for our board.',
                'quote_bn' => 'তাদের ৬০ মিনিটের রেসপন্স গতি এবং ক্রাইসিস ওয়ার-রুম আমাদের বোর্ডের জন্য অতুলনীয় সম্পদ।',
                'rating' => 5,
                'avatar' => '/images/berlo/testimonials/stock-testimonial-2.jpg',
                'is_active' => true,
            ],
            [
                'author_name_en' => 'Enduring Enterprise Trust & Crisis Shield',
                'author_name_bn' => 'ক্লায়েন্ট সন্তুষ্টি ও দীর্ঘমেয়াদী আস্থা',
                'author_role_en' => 'Boardroom Advisory & PR Partnership',
                'author_role_bn' => 'বোর্ডরুম অ্যাডভাইজরি ও পিআর পার্টনারশিপ',
                'quote_en' => 'Absolute boardroom confidentiality and tier-1 media placements every single time.',
                'quote_bn' => 'বোর্ডরুমের পূর্ণ গোপনীয়তা এবং প্রতিবার শীর্ষস্থানীয় মিডিয়া কভারেজ প্রাপ্তি।',
                'rating' => 5,
                'avatar' => '/images/berlo/testimonials/stock-testimonial-3.jpg',
                'is_active' => true,
            ],
        ];
        foreach ($testi as $t) {
            Testimonial::create($t);
        }

        // 4. Projects (4 Featured Projects)
        Project::query()->delete();
        $projects = [
            [
                'slug' => 'epb-diaspora-summit',
                'title_en' => 'Global Trade & Diaspora Investment Summit',
                'title_bn' => 'গ্লোবাল ট্রেড ও ডায়াসপোরা ইনভেস্টমেন্ট সামিট',
                'client_name' => 'Ministry of Commerce & Export Promotion Bureau (EPB)',
                'industry' => 'trade',
                'year' => '2024',
                'overview_en' => 'Comprehensive multi-country media orchestration generating $180M+ committed commercial MoUs and 140+ editorial placements.',
                'overview_bn' => 'বহুদেশীয় আন্তর্জাতিক মিডিয়া ক্যাম্পেইনের মাধ্যমে ১৮ কোটি ডলারের বাণিজ্যিক সমঝোতা এবং ১৪০টির বেশি শীর্ষ সংবাদ কভারেজ।',
                'challenge_en' => 'Engaging global diaspora investors amidst tight international timelines.',
                'challenge_bn' => 'সীমিত সময়ে আন্তর্জাতিক অনাবাসী বিনিয়োগকারীদের আস্থা অর্জন।',
                'solution_en' => 'Broadcast press delegations and tier-1 international news coverage.',
                'solution_bn' => 'সরাসরি টেলিভিশন সম্প্রচার ও আন্তর্জাতিক মিডিয়া নেটওয়ার্কিং।',
                'impact_en' => '+280% Global Buyer Inquiries, 140+ Front-Page Articles',
                'impact_bn' => '+২৮০% আন্তর্জাতিক বিনিয়োগ অনুসন্ধান, ১৪০+ প্রথম পাতার সংবাদ',
                'stat_number' => '$180M+',
                'stat_label_en' => 'Trade Commitments Secured',
                'stat_label_bn' => 'বাণিজ্যিক প্রতিশ্রুতি নিশ্চিত',
                'cover_image' => '/images/berlo/portfolio/epb-1.png',
                'is_featured' => true,
                'is_published' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'unique-group-crisis',
                'title_en' => 'Corporate Reputation Shield & Narrative Reclamation',
                'title_bn' => 'কর্পোরেট সুনাম সুরক্ষা ও ক্রাইসিস প্রতিরক্ষা',
                'client_name' => 'Unique Group & The Westin Dhaka',
                'industry' => 'crisis',
                'year' => '2023',
                'overview_en' => 'Rapid war-room deployment containing viral misinformation within 48 hours across 24 national television networks.',
                'overview_bn' => '৪৮ ঘণ্টার মধ্যে ২৪টি জাতীয় টেলিভিশন নেটওয়ার্কে ভাইরাল গুজবের বিপরীতে সফল প্রাতিষ্ঠানিক তথ্য পুনর্বাসন।',
                'challenge_en' => 'Spreading malicious social media narratives targeting hospitality leadership.',
                'challenge_bn' => 'আতিথেয়তা খাতের নেতৃত্বের বিরুদ্ধে সামাজিক যোগাযোগ মাধ্যমে ছড়ানো বিভ্রান্তিকর প্রচার।',
                'solution_en' => 'Direct editorial delegations, fact-sheet press release distribution, and live broadcast press briefing.',
                'solution_bn' => 'শীর্ষ সম্পাদকদের সাথে সরাসরি বৈঠক, ফ্যাক্ট-শিট রিলিজ ও লাইভ প্রেস ব্রিফিং।',
                'impact_en' => '100% Retraction of False Allegations, Zero Long-Term Brand Damage',
                'impact_bn' => '১০০% ভিত্তিহীন অভিযোগ প্রত্যাহার, ব্র্যান্ডের পূর্ণ সুনাম পুনরুদ্ধার',
                'stat_number' => '48 Hours',
                'stat_label_en' => 'Total Crisis Neutralization Speed',
                'stat_label_bn' => 'সংকট প্রশমনের মোট গতি',
                'cover_image' => '/images/berlo/portfolio/unique-1.png',
                'is_featured' => false,
                'is_published' => true,
                'sort_order' => 2,
            ],
            [
                'slug' => 'icab-global-summit',
                'title_en' => 'National Economic Roundtable & Governance Summit',
                'title_bn' => 'জাতীয় অর্থনৈতিক গোলটেবিল ও সুশাসন সম্মেলন',
                'client_name' => 'Institute of Chartered Accountants of Bangladesh (ICAB)',
                'industry' => 'events',
                'year' => '2024',
                'overview_en' => 'Executing full communications strategy for the high-level policy convention featuring the Governor of Bangladesh Bank.',
                'overview_bn' => 'বাংলাদেশ ব্যাংকের গভর্নর মহোদয়ের উপস্থিতিতে জাতীয় নীতি নির্ধারণী সম্মেলনের পূর্ণাঙ্গ জনসংযোগ পরিচালনা।',
                'challenge_en' => 'Ensuring front-page editorial coverage across all national business desks.',
                'challenge_bn' => 'দেশের সকল প্রথম সারির বিজনেস ডেস্কে শীর্ষ গুরুত্ব নিশ্চিত করা।',
                'solution_en' => 'Curated economic journalist delegations, live broadcast streams, and dedicated media lounge management.',
                'solution_bn' => 'অর্থনৈতিক সাংবাদিকদের বিশেষ ডেসপ্যাচ, লাইভ সম্প্রচার ও এক্সক্লুসিভ মিডিয়া লাউঞ্জ।',
                'impact_en' => '100% Front-Page Business Coverage in 18 National Dailies',
                'impact_bn' => '১৮টি শীর্ষ জাতীয় দৈনিকের বিজনেস পাতায় প্রধান সংবাদ হিসেবে প্রকাশ',
                'stat_number' => '18 Dailies',
                'stat_label_en' => 'Front-Page National Business Coverage',
                'stat_label_bn' => 'প্রথম সারির জাতীয় পত্রিকায় প্রকাশ',
                'cover_image' => '/images/berlo/portfolio/icab-1.png',
                'is_featured' => false,
                'is_published' => true,
                'sort_order' => 3,
            ],
            [
                'slug' => 'apex-footwear-sustainability',
                'title_en' => 'Corporate ESG & Green Manufacturing Global Debut',
                'title_bn' => 'কর্পোরেট ইএসজি ও গ্রিন ম্যানুফ্যাকচারিং আত্মপ্রকাশ',
                'client_name' => 'Apex Footwear Limited',
                'industry' => 'speaker',
                'year' => '2023',
                'overview_en' => 'Positioning Bangladesh’s leather and footwear giant as the global leader in sustainable ethical manufacturing.',
                'overview_bn' => 'পরিবেশবান্ধব ও নৈতিক উৎপাদনে বাংলাদেশের চামড়া ও পাদুকা শিল্পকে বিশ্বমঞ্চে শীর্ষ আসনে অধিষ্ঠিত করা।',
                'challenge_en' => 'Communicating rigorous ESG sustainability data in engaging consumer stories.',
                'challenge_bn' => 'জটিল ইএসজি তথ্য সাধারণ গ্রাহক ও ক্রেতাদের কাছে সহজবোধ্যভাবে উপস্থাপন।',
                'solution_en' => 'Documentary film premier, multi-channel editorial features, and executive keynote speechwriting.',
                'solution_bn' => 'প্রামাণ্যচিত্র প্রদর্শনী, মাল্টি-চ্যানেল ফিচার এবং সিইওদের মূল বক্তব্য লিখন।',
                'impact_en' => '+420% Brand Trust Index, Global Sustainable Brand Award',
                'impact_bn' => '+৪২০% ব্র্যান্ড আস্থার সূচক, আন্তর্জাতিক পরিবেশবান্ধব ব্র্যান্ড পুরস্কার',
                'stat_number' => '+420%',
                'stat_label_en' => 'Brand Trust Index Elevation',
                'stat_label_bn' => 'ব্র্যান্ড আস্থার সূচক বৃদ্ধি',
                'cover_image' => '/images/berlo/portfolio/apex-1.png',
                'is_featured' => false,
                'is_published' => true,
                'sort_order' => 4,
            ],
        ];
        foreach ($projects as $p) {
            Project::create($p);
        }

        // 5. Gallery Photos (12 Mosaic Tiles)
        GalleryPhoto::query()->delete();
        $photos = [
            ['title_en' => 'Live National Press Delegation', 'title_bn' => 'জাতীয় প্রেস কনফারেন্স ব্রিফিং', 'image_url' => '/images/berlo/gallery/moment-1.jpg', 'category_key' => 'press', 'category_en' => 'National Press', 'category_bn' => 'জাতীয় প্রেস', 'sort_order' => 1],
            ['title_en' => 'High-Level Corporate Delegation', 'title_bn' => 'শীর্ষ কর্পোরেট প্রতিনিধিদল', 'image_url' => '/images/berlo/gallery/moment-2.jpg', 'category_key' => 'corporate', 'category_en' => 'Corporate Summit', 'category_bn' => 'কর্পোরেট সম্মেলন', 'sort_order' => 2],
            ['title_en' => 'National Media Delegation', 'title_bn' => 'জাতীয় গণমাধ্যম গোলটেবিল', 'image_url' => '/images/berlo/gallery/moment-3.jpg', 'category_key' => 'media', 'category_en' => 'Media Roundtable', 'category_bn' => 'গণমাধ্যম গোলটেবিল', 'sort_order' => 3],
            ['title_en' => 'Executive Press Briefing', 'title_bn' => 'নির্বাহী প্রেস ব্রিফিং অধিবেশন', 'image_url' => '/images/berlo/gallery/moment-4.jpg', 'category_key' => 'briefing', 'category_en' => 'Press Briefing', 'category_bn' => 'প্রেস ব্রিফিং', 'sort_order' => 4],
            ['title_en' => 'Senior Leadership Roundtables', 'title_bn' => 'সিনিয়র নেতৃত্ব ও নীতিনির্ধারণী ফোরাম', 'image_url' => '/images/berlo/gallery/moment-5.jpg', 'category_key' => 'leadership', 'category_en' => 'Leadership Forum', 'category_bn' => 'নেতৃত্ব ফোরাম', 'sort_order' => 5],
            ['title_en' => 'Corporate Communications Milestone', 'title_bn' => 'কর্পোরেট যোগাযোগ মাইলফলক উদযাপন', 'image_url' => '/images/berlo/gallery/moment-6.jpg', 'category_key' => 'milestone', 'category_en' => 'Milestone', 'category_bn' => 'মাইলফলক', 'sort_order' => 6],
            ['title_en' => 'Stakeholder Media Forum', 'title_bn' => 'স্টেকহোল্ডার মিডিয়া নেটওয়ার্কিং ফোরাম', 'image_url' => '/images/berlo/gallery/moment-7.jpg', 'category_key' => 'forum', 'category_en' => 'Stakeholder Forum', 'category_bn' => 'অংশীদার ফোরাম', 'sort_order' => 7],
            ['title_en' => 'Strategic Media Partnership Signing', 'title_bn' => 'কৌশলগত মিডিয়া পার্টনারশিপ স্বাক্ষর', 'image_url' => '/images/berlo/gallery/moment-8.jpg', 'category_key' => 'partnership', 'category_en' => 'Partnership', 'category_bn' => 'অংশীদারিত্ব', 'sort_order' => 8],
            ['title_en' => 'Investigative Briefing Session', 'title_bn' => 'অনুসন্ধানী তথ্য উপস্থাপন অধিবেশন', 'image_url' => '/images/berlo/gallery/moment-9.jpg', 'category_key' => 'briefing', 'category_en' => 'Special Briefing', 'category_bn' => 'বিশেষ ব্রিফিং', 'sort_order' => 9],
            ['title_en' => 'National Broadcasters Session', 'title_bn' => 'জাতীয় টেলিভিশন সম্প্রচারকদের সাথে ব্রিফিং', 'image_url' => '/images/berlo/gallery/moment-10.jpg', 'category_key' => 'broadcast', 'category_en' => 'Broadcast Forum', 'category_bn' => 'সম্প্রচার ফোরাম', 'sort_order' => 10],
            ['title_en' => 'Annual Corporate Gala Press', 'title_bn' => 'বার্ষিক কর্পোরেট গালা ও মিডিয়া ডেসপ্যাচ', 'image_url' => '/images/berlo/gallery/moment-11.jpg', 'category_key' => 'gala', 'category_en' => 'Annual Gala', 'category_bn' => 'বার্ষিক গালা', 'sort_order' => 11],
            ['title_en' => 'Boardroom Crisis Resolution Protocol', 'title_bn' => 'বোর্ডরুম ক্রাইসিস নিরসন অধিবেশন', 'image_url' => '/images/berlo/gallery/moment-12.jpg', 'category_key' => 'crisis', 'category_en' => 'Crisis War-Room', 'category_bn' => 'ক্রাইসিস ওয়ার-রুম', 'sort_order' => 12],
        ];
        foreach ($photos as $p) {
            GalleryPhoto::create($p);
        }
    }

    private function seedPageSections(): void
    {
        PageSection::query()->delete();

        // ---------------------------------------------------------------------
        // 01. HERO INTERACTIVE SLIDER
        // ---------------------------------------------------------------------
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

        // ---------------------------------------------------------------------
        // 02. IN THE SPOTLIGHT (Continuous Carousel)
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'spotlight',
            'title_en' => 'In the Spotlight',
            'title_bn' => 'স্পটলাইটে অংশীদারবৃন্দ',
            'subtitle_en' => 'Featured across national and international prime-tier media outlets.',
            'subtitle_bn' => 'জাতীয় ও আন্তর্জাতিক শীর্ষ গণমাধ্যমে নিয়মিত ফিচারপ্রাপ্ত।',
            'metadata' => [
                'media_logos' => [
                    ['name' => 'The Business Standard', 'logo' => '/images/berlo/media/tbs.svg'],
                    ['name' => 'প্রথম আলো', 'logo' => '/images/berlo/media/prothom-alo.svg'],
                    ['name' => 'The Daily Star', 'logo' => '/images/berlo/media/the-daily-star.svg'],
                    ['name' => 'Dhaka Tribune', 'logo' => '/images/berlo/media/dhaka-tribune.svg'],
                    ['name' => 'The Financial Express', 'logo' => '/images/berlo/media/financial-express.png'],
                    ['name' => 'Reuters', 'logo' => '/images/berlo/media/reuters.svg'],
                    ['name' => 'Bloomberg', 'logo' => '/images/berlo/media/bloomberg.svg'],
                    ['name' => 'ATN News', 'logo' => '/images/berlo/clients/atn.jpg'],
                ],
            ],
            'sort_order' => 2,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 03. FULL-WIDTH CINEMATIC VIDEO SHOWCASE
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'video_showcase',
            'title_en' => 'Experience Strategic Leadership in Motion',
            'title_bn' => 'কৌশলগত নেতৃত্বের দৃশ্যমান গতিশীলতা',
            'subtitle_en' => 'Watch how Berlo navigates high-stakes corporate narratives, manages live broadcast press delegations, and commands national media discourse.',
            'subtitle_bn' => 'দেখুন কীভাবে বার্লো জাতীয় সংকট নিরসন, সরাসরি গণমাধ্যম ব্রিফিং এবং করপোরেট আখ্যান পরিচালনা করে।',
            'badge_en' => 'Berlo Strategic Operations & Agency Reel — Dhaka',
            'badge_bn' => 'বার্লো স্ট্র্যাটেজিক নিউজরুম ও এজেন্সী রিল — ঢাকা',
            'video_url' => 'https://www.youtube.com/embed/8nees6k5oNk',
            'image_url' => '/images/berlo/gallery/moment-3.jpg',
            'cta_text_en' => 'Watch Full Briefing',
            'cta_text_bn' => 'সম্পূর্ণ ভিডিও দেখুন',
            'cta_link' => '#playVideo',
            'metadata' => [
                'youtube_video_id' => '8nees6k5oNk',
                'brand_logo' => '/brand/logo.png',
            ],
            'sort_order' => 3,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 04. OUR SERVICES (3x3 Grid)
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'services_header',
            'title_en' => 'Our Services',
            'title_bn' => 'আমাদের সেবাসমূহ',
            'subtitle_en' => 'Precision-engineered communications frameworks built to elevate leadership, protect assets, and drive stakeholder action.',
            'subtitle_bn' => 'নেতৃত্বকে সুদৃঢ় করতে, ব্র্যান্ড মূল্যায়ন রক্ষা করতে এবং অংশীদারদের অনুপ্রাণিত করতে আমাদের সুনির্দিষ্ট সেবা।',
            'badge_en' => 'SERVICES',
            'badge_bn' => 'সেবাসমূহ',
            'cta_text_en' => 'VIEW ALL',
            'cta_text_bn' => 'সবগুলো দেখুন',
            'cta_link' => '/en/services',
            'metadata' => [
                'display_count' => 9,
            ],
            'sort_order' => 4,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 05. BOOK A FREE CONSULTATION
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'consultancy_header',
            'title_en' => 'Book a Free Consultation',
            'title_bn' => 'বিনামূল্যে পরামর্শ সেশন বুক করুন',
            'subtitle_en' => 'Select your priority communications challenge to initiate a confidential briefing with our senior partners.',
            'subtitle_bn' => 'আপনার প্রতিষ্ঠানের অগ্রাধিকার নির্বাচন করে আমাদের সিনিয়র পার্টনারদের সাথে কনফিডেনশিয়াল ব্রিফিং শুরু করুন।',
            'badge_en' => 'Executive Briefing',
            'badge_bn' => 'নির্বাহী ব্রিফিং',
            'image_url' => '/images/berlo/gallery/moment-2.jpg',
            'metadata' => [
                'form_steps' => 3,
                'left_card_title_en' => 'Strategic Advisory Desk',
                'left_card_title_bn' => 'কৌশলগত পরামর্শক ডেস্ক',
            ],
            'sort_order' => 5,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 06. EXPLORE CLIENT RATINGS SHOWCASE (Laurel Wreath Banner)
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'stats',
            'title_en' => 'Explore Client Ratings Showcase',
            'title_bn' => 'ক্লায়েন্টদের রেটিং ও সাফল্য',
            'subtitle_en' => 'Decades of combined senior leadership experience advising boardrooms and multinational organizations.',
            'subtitle_bn' => 'বোর্ডরুম ও বহুজাতিক সংস্থাকে পরামর্শ প্রদানে সিনিয়র নেতৃত্বের বহু বছরের যৌথ অভিজ্ঞতা।',
            'metadata' => [
                'stats_list' => [
                    ['value' => '250+', 'label_en' => 'Corporate Campaigns', 'label_bn' => 'সফল করপোরেট ক্যাম্পেইন'],
                    ['value' => '100%', 'label_en' => 'NDA Confidentiality', 'label_bn' => 'গোপনীয়তা রক্ষা নিশ্চয়তা'],
                    ['value' => '60 Min', 'label_en' => 'Crisis War-Room Speed', 'label_bn' => 'ক্রাইসিস ওয়ার-রুম গতি'],
                    ['value' => '12+ Yrs', 'label_en' => 'Media Ecosystem Legacy', 'label_bn' => 'জাতীয় গণমাধ্যম সংযোগ'],
                ],
            ],
            'sort_order' => 6,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 07. DISCOVER THE BENEFITS WITH US
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'why_us',
            'title_en' => 'Discover the Benefits with Us',
            'title_bn' => 'আমাদের সাথে কাজ করার সুবিধাসমূহ',
            'subtitle_en' => 'When your corporate reputation is on the line, generic PR is not enough. You need seasoned strategists.',
            'subtitle_bn' => 'কর্পোরেট সুনাম যখন ঝুঁকিতে, সাধারণ পিআর যথেষ্ট নয়। আপনার প্রয়োজন অভিজ্ঞ কৌশলবিদ।',
            'image_url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
            'metadata' => [
                'office_title_en' => 'Corporate Headquarters',
                'office_title_bn' => 'কর্পোরেট হেডকোয়ার্টার্স',
                'office_address_en' => 'Apartment B3, House 32/34, Road 07, Niketon, Gulshan-1, Dhaka',
                'office_address_bn' => 'অ্যাপার্টমেন্ট বি৩, বাড়ি ৩২/৩৪, রোড ০৭, নিকেতন, গুলশান-১, ঢাকা',
                'pillars' => [
                    [
                        'title_en' => 'Unmatched Tier-1 Media Access',
                        'title_bn' => 'শীর্ষ গণমাধ্যমে সরাসরি সংযোগ',
                        'desc_en' => 'Direct access to national chief editors, investigative reporters, and prime-time broadcast directors across Bangladesh.',
                        'desc_bn' => 'প্রধান সম্পাদক, অনুসন্ধানী সাংবাদিক এবং জাতীয় টেলিভিশন নেটওয়ার্কের সাথে সরাসরি পেশাদার সম্পর্ক।',
                    ],
                    [
                        'title_en' => 'Rapid 24/7 Crisis Protocol',
                        'title_bn' => '২৪/৭ দ্রুত সংকট মোকাবিলা প্রটোকল',
                        'desc_en' => 'Immediate war-room activation within 60 minutes to neutralize reputational vulnerability and protect brand equity.',
                        'desc_bn' => 'সুনামের যেকোনো হুমকি প্রশমনে এবং ব্র্যান্ডের সম্মান রক্ষার্থে ৬০ মিনিটের মধ্যে ওয়ার-রুম কার্যকরীকরণ।',
                    ],
                    [
                        'title_en' => 'Data-Driven Sentiment Intelligence',
                        'title_bn' => 'তথ্য ও বিশ্লেষণনির্ভর সেন্টিনেল ইন্টেলিজেন্স',
                        'desc_en' => 'Real-time media tracking, predictive sentiment trajectory modeling, and comprehensive Share of Voice (SOV) metrics.',
                        'desc_bn' => 'রিয়েল-টাইম মিডিয়া মনিটরিং, জনমত গতিপথ বিশ্লেষণ এবং প্রিন্ট ও ডিজিটালে শেয়ার অফ ভয়েস ট্র্যাকিং।',
                    ],
                    [
                        'title_en' => 'Pan-Bangladesh Operational Reach',
                        'title_bn' => 'সারাদেশে কার্যক্রম পরিচালনার সক্ষমতা',
                        'desc_en' => 'Seamless nationwide execution of press conferences, roundtables, and high-impact activations across all 8 divisions.',
                        'desc_bn' => 'ঢাকা, চট্টগ্রাম, সিলেটসহ সকল বিভাগে সফল প্রেস কনফারেন্স, গোলটেবিল ও ব্র্যান্ড অ্যাক্টিভেশন বাস্তবায়ন।',
                    ],
                    [
                        'title_en' => 'Absolute Boardroom Confidentiality',
                        'title_bn' => 'বোর্ডরুমের পূর্ণ গোপনীয়তা ও বিশ্বস্ততা',
                        'desc_en' => 'Institutional-grade non-disclosure agreements safeguarding sensitive corporate transactions, restructuring, and leadership shifts.',
                        'desc_bn' => 'সংবেদনশীল কর্পোরেট চুক্তি, পুনর্গঠন ও শীর্ষ নেতৃত্বের পরিবর্তনের সুরক্ষায় সর্বোচ্চ প্রাতিষ্ঠানিক এনডিএ নিশ্চয়তা।',
                    ],
                ],
            ],
            'sort_order' => 7,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 08. INNOVATING SUCCESS TOGETHER (3D Logo Flip + Marquee)
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'clients_showcase',
            'title_en' => 'Innovating Success Together',
            'title_bn' => 'একসাথে উদ্ভাবনী সাফল্য',
            'subtitle_en' => 'Trusted by national conglomerates, financial institutions, and multinational brands.',
            'subtitle_bn' => 'জাতীয় শিল্পগ্রুপ, আর্থিক প্রতিষ্ঠান এবং বহুজাতিক ব্র্যান্ডের নির্ভরযোগ্য পিআর পার্টনার।',
            'metadata' => [
                'flip_slots' => [
                    ['front' => '/images/berlo/clients/unique.jpg', 'back' => '/images/berlo/clients/radiant.jpg'],
                    ['front' => '/images/berlo/clients/rahimafrooz.jpg', 'back' => '/images/berlo/clients/ucep.jpg'],
                    ['front' => '/images/berlo/clients/rupayan.jpg', 'back' => '/images/berlo/clients/netcom.jpg'],
                    ['front' => '/images/berlo/clients/rajasthan.jpg', 'back' => '/images/berlo/clients/idcol.jpg'],
                ],
                'display_count' => 16,
            ],
            'sort_order' => 8,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 09. CLIENTS SAYS (Video Testimonial Cards)
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'testimonials_header',
            'title_en' => 'Clients Says',
            'title_bn' => 'ক্লায়েন্টদের প্রতিক্রিয়া',
            'subtitle_en' => 'Hear directly from chairpersons, managing directors, and corporate communications heads.',
            'subtitle_bn' => 'চেয়ারপার্সন, ব্যবস্থাপনা পরিচালক ও শীর্ষ নির্বাহীদের সরাসরি অভিজ্ঞতা।',
            'cta_text_en' => 'VIEW ALL',
            'cta_text_bn' => 'সবগুলো দেখুন',
            'cta_link' => '/en/clients',
            'metadata' => [
                'video_testimonials' => [
                    [
                        'id' => 1,
                        'title_en' => 'Enterprise Reputation & Brand Scaling — Client Review',
                        'title_bn' => 'কর্পোরেট সুনাম বৃদ্ধি ও ব্র্যান্ড প্রতিষ্ঠা — ক্লায়েন্ট রিভিউ',
                        'subtitle_en' => 'Strategic Corporate PR & Media Advisory',
                        'subtitle_bn' => 'কমিউনিকেশনস অ্যান্ড স্ট্র্যাটেজিক পিআর',
                        'thumbnail' => '/images/berlo/testimonials/stock-testimonial-1.jpg',
                        'youtube_id' => 'FHnfg223H60',
                    ],
                    [
                        'id' => 2,
                        'title_en' => 'Nationwide Media Reach & Commercial Expansion',
                        'title_bn' => 'জাতীয় মিডিয়া রিচ ও ব্যবসায়িক বিস্তার',
                        'subtitle_en' => 'Brand Visibility & Strategic Growth',
                        'subtitle_bn' => 'ব্র্যান্ড দৃশ্যমানতা ও লিডারশিপ প্রটোকল',
                        'thumbnail' => '/images/berlo/testimonials/stock-testimonial-2.jpg',
                        'youtube_id' => 'OTClukQmiEw',
                    ],
                    [
                        'id' => 3,
                        'title_en' => 'Enduring Enterprise Trust & Crisis Shield',
                        'title_bn' => 'ক্লায়েন্ট সন্তুষ্টি ও দীর্ঘমেয়াদী আস্থা',
                        'subtitle_en' => 'Boardroom Advisory & PR Partnership',
                        'subtitle_bn' => 'বোর্ডরুম অ্যাডভাইজরি ও পিআর পার্টনারশিপ',
                        'thumbnail' => '/images/berlo/testimonials/stock-testimonial-3.jpg',
                        'youtube_id' => 'osL5z5nCE8M',
                    ],
                ],
            ],
            'sort_order' => 9,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 10. RECENT PROJECTS / CASE STUDIES
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'case_studies_header',
            'title_en' => 'Recent Projects',
            'title_bn' => 'সাম্প্রতিক প্রকল্পসমূহ',
            'subtitle_en' => 'Empirical proof of how we de-escalated hostile narratives and delivered multi-billion stakeholder value.',
            'subtitle_bn' => 'কঠিন পরিস্থিতিতে সুনাম সুরক্ষা এবং শতকোটি টাকার ব্র্যান্ড ভ্যালু বৃদ্ধির প্রামাণ্য মাইলফলক।',
            'badge_en' => 'CASE STUDIES',
            'badge_bn' => 'কেস স্টাডিজ',
            'cta_text_en' => 'VIEW ALL',
            'cta_text_bn' => 'সবগুলো দেখুন',
            'cta_link' => '/en/work',
            'metadata' => [
                'featured_slug' => 'epb-diaspora-summit',
                'display_count' => 4,
            ],
            'sort_order' => 10,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 11. OUR STRATEGIC LEADERSHIP & TEAM
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'leadership_header',
            'title_en' => 'Our Strategic Leadership & Team',
            'title_bn' => 'আমাদের শীর্ষ নেতৃত্ব ও টিম',
            'subtitle_en' => 'Led by veteran editors, investigative journalists, and corporate strategists with decades of proven authority.',
            'subtitle_bn' => 'অভিজ্ঞ সম্পাদক, অনুসন্ধানী সাংবাদিক এবং করপোরেট কৌশলবিদদের সমন্বয়ে গঠিত দেশসেরা টিম।',
            'badge_en' => 'THE ARCHITECTS',
            'badge_bn' => 'কৌশলবিদ টিম',
            'cta_text_en' => 'VIEW ALL',
            'cta_text_bn' => 'সবাইকে দেখুন',
            'cta_link' => '/en/leadership',
            'metadata' => [
                'display_count' => 6,
                'team_order' => [
                    'shakhawat-ullah',
                    'md-kabir-hossain',
                    'akm-zamshed-uddin',
                    'kabery-azad',
                    'rajin-shaleh',
                    'tahsin-al-jawad',
                ],
            ],
            'sort_order' => 11,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 12. MEMORIES & MOMENTS (Photo Mosaic Grid)
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'gallery_header',
            'title_en' => 'Memories & Moments',
            'title_bn' => 'স্মৃতি ও মুহূর্তসমূহ',
            'subtitle_en' => 'Live press delegations, television studio appearances, and high-level corporate delegations.',
            'subtitle_bn' => 'জাতীয় প্রেস কনফারেন্স, টেলিভিশন গোলটেবিল এবং সিনিয়র নেতৃত্বের ঐতিহাসিক মুহূর্তসমূহ।',
            'badge_en' => 'MOMENTS',
            'badge_bn' => 'স্মৃতিগাথা',
            'metadata' => [
                'display_count' => 12,
            ],
            'sort_order' => 12,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 13. LATEST BLOGS (Editorial Cards)
        // ---------------------------------------------------------------------
        PageSection::create([
            'page_slug' => 'home',
            'section_key' => 'insights_header',
            'title_en' => 'Latest Blogs',
            'title_bn' => 'সাম্প্রতিক ব্লগ ও ইনসাইটস',
            'subtitle_en' => 'Proprietary research, boardroom advisories, and media sentiment trends shaping Bangladesh.',
            'subtitle_bn' => 'বাংলাদেশের নীতিনির্ধারণ ও করপোরেট পরিমণ্ডল পরিচালনাকারী বিশ্লেষণধর্মী প্রবন্ধ ও গবেষণা।',
            'badge_en' => 'INSIGHTS',
            'badge_bn' => 'ইনসাইটস',
            'cta_text_en' => 'VIEW ALL',
            'cta_text_bn' => 'সবগুলো দেখুন',
            'cta_link' => '/en/insights',
            'metadata' => [
                'display_count' => 3,
            ],
            'sort_order' => 13,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // 14. CALL TO ACTION (CTA) BANNER
        // ---------------------------------------------------------------------
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
            'sort_order' => 14,
            'is_active' => true,
        ]);

        // ---------------------------------------------------------------------
        // ABOUT PAGE
        // ---------------------------------------------------------------------
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

        // ---------------------------------------------------------------------
        // CONTACT PAGE
        // ---------------------------------------------------------------------
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

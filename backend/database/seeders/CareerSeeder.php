<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Database\Seeder;

class CareerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        JobApplication::query()->delete();
        JobPosting::query()->delete();

        // 1. Senior Strategic Communications Director
        $job1 = JobPosting::create([
            'slug' => 'senior-strategic-communications-director',
            'title_en' => 'Senior Strategic Communications Director',
            'title_bn' => 'সিনিয়র কৌশলগত যোগাযোগ পরিচালক',
            'department_en' => 'Corporate Advisory',
            'department_bn' => 'কর্পোরেট স্ট্র্যাটেজি',
            'employment_type' => 'full_time',
            'workplace_type' => 'hybrid',
            'location_en' => 'Niketon, Gulshan-1, Dhaka',
            'location_bn' => 'নিকেতন, গুলশান-১, ঢাকা',
            'experience_level_en' => '8+ Years in Corporate PR / Agency',
            'experience_level_bn' => '৮+ বছরের সিনিয়র জনসংযোগ অভিজ্ঞতা',
            'salary_range_en' => 'Executive Compensation Package + Performance Bonus',
            'salary_range_bn' => 'আকর্ষণীয় নির্বাহী বেতন কাঠামো ও প্রণোদনা',
            'short_desc_en' => 'Lead high-stakes narrative development, executive media briefings, and corporate reputation initiatives for Tier-1 conglomerates.',
            'short_desc_bn' => 'শীর্ষস্থানীয় শিল্পগ্রুপ ও করপোরেট প্রতিষ্ঠানের জন্য কৌশলগত বার্তা, মিডিয়া ব্রিফিং ও প্রাতিষ্ঠানিক সুনাম বিনির্মাণ নেতৃত্ব দিন।',
            'overview_en' => 'Berlo Communications is seeking a distinguished Senior Strategic Communications Director to architect brand resilience, direct multi-channel stakeholder campaigns, and advise corporate chairs and CEOs across South Asia.',
            'overview_bn' => 'বার্লো কমিউনিকেশন্স শীর্ষস্থানীয় শিল্পগ্রুপের জন্য কৌশলগত যোগাযোগ পরিকল্পনা পরিচালনা এবং সিইও ও বোর্ড চেয়ারম্যানদের সরাসরি পরামর্শ প্রদানের জন্য একজন অভিজ্ঞ সিনিয়র পরিচালক খুঁজছে।',
            'responsibilities_en' => [
                'Lead senior advisory accounts and conceptualize national perception campaigns.',
                'Direct high-level media roundtables, press delegations, and editorial relations.',
                'Provide confidential advisory to C-suite executives during strategic corporate transitions.',
                'Mentor our associate directors, communications analysts, and media liaisons.',
            ],
            'responsibilities_bn' => [
                'কর্পোরেট ক্লায়েন্টদের জন্য কৌশলগত যোগাযোগ প্রচারণা পরিকল্পনা ও পরিচালনা।',
                'জাতীয় গণমাধ্যম সম্পাদকীয় পর্ষদের সাথে শক্তিশালী সম্পর্ক ও মিডিয়া গোলটেবিল পরিচালনা।',
                'ব্যবস্থাপনা পরিচালক ও পরিচালনা পর্ষদকে সরাসরি কৌশলগত পরামর্শ প্রদান।',
                'কমিউনিকেশনস অ্যানালিস্ট এবং মিডিয়া রিলেশনস টিমের পেশাগত দিকনির্দেশনা প্রদান।',
            ],
            'requirements_en' => [
                'Demonstrated track record of 8+ years leading strategic communications or PR accounts.',
                'Master\'s degree in Mass Communication, Public Policy, Journalism, or Business Administration.',
                'Fluent bilingual precision in executive English and Bengali writing and oratory.',
                'Extensive established network with Bangladesh national press editors and bureau chiefs.',
            ],
            'requirements_bn' => [
                'কৌশলগত যোগাযোগ বা জনসংযোগ এজেন্সিতে ন্যূনতম ৮ বছরের সফল কাজের অভিজ্ঞতা।',
                'গণযোগাযোগ, সাংবাদিকতা, পাবলিক পলিসি বা ব্যবসায় প্রশাসনে স্নাতকোত্তর ডিগ্রি।',
                'ইংরেজি ও বাংলায় পেশাদার ও সাবলীল যোগাযোগ দক্ষতা।',
                'বাংলাদেশের শীর্ষস্থানীয় গণমাধ্যম সম্পাদক ও সিনিয়র সাংবাদিকদের সাথে সুদৃঢ় যোগাযোগ।',
            ],
            'benefits_en' => [
                'Executive corporate healthcare and life coverage for director and dependents.',
                'Discretionary annual profit share and high-impact advisory bonuses.',
                'Continuous professional development budget and international summit sponsorship.',
                'Flexible hybrid workflow with designated executive lounge in Gulshan-1.',
            ],
            'benefits_bn' => [
                'পরিচালক ও পরিবারের জন্য কর্পোরেট হেলথ ইনস্যুরেন্স ও লাইফ কাভারেজ।',
                'বাৎসরিক পারফরম্যান্স বোনাস ও প্রফিট শেয়ার সুবিধা।',
                'আন্তর্জাতিক সামিট ও প্রফেশনাল ডেভেলপমেন্ট ফান্ডিং।',
                'হাইব্রিড কাজের সুবিধা ও গুলশান-১ অফিসে নির্বাহি ওয়ার্কস্পেস।',
            ],
            'deadline' => now()->addDays(45)->toDateString(),
            'is_active' => true,
            'sort_order' => 1,
        ]);

        // 2. Crisis Communication & Reputation Risk Specialist
        $job2 = JobPosting::create([
            'slug' => 'crisis-communication-specialist',
            'title_en' => 'Crisis Communication & Reputation Risk Specialist',
            'title_bn' => 'ক্রাইসিস কমিউনিকেশন ও রেপুটেশন রিস্ক স্পেশালিস্ট',
            'department_en' => 'Crisis & War-Room',
            'department_bn' => 'ক্রাইসিস ও ওয়ার-রুম',
            'employment_type' => 'full_time',
            'workplace_type' => 'on_site',
            'location_en' => 'Niketon, Gulshan-1, Dhaka',
            'location_bn' => 'নিকেতন, গুলশান-১, ঢাকা',
            'experience_level_en' => '5+ Years in Crisis Management',
            'experience_level_bn' => '৫+ বছরের ক্রাইসিস ব্যবস্থাপনা অভিজ্ঞতা',
            'salary_range_en' => 'Highly Competitive Industry Standard',
            'salary_range_bn' => 'বাজারের শীর্ষ মান অনুযায়ী প্রতিযোগিতামূলক বেতন',
            'short_desc_en' => 'Operate in 24/7 rapid-response war rooms, monitoring disinformation and neutralizing brand vulnerabilities with surgical precision.',
            'short_desc_bn' => '২৪/৭ সক্রিয় ওয়ার-রুমে সংকট নিরসন, গুজব প্রতিরোধ ও প্রাতিষ্ঠানিক সুনাম রক্ষার জন্য নির্ভরযোগ্য কৌশল প্রণয়ন করুন।',
            'overview_en' => 'Join Berlo\'s prestigious Crisis & Rapid Response Division. You will engineer crisis containment protocols, monitor social narratives, and draft real-time press holding statements.',
            'overview_bn' => 'বার্লোর বিশেষায়িত ক্রাইসিস ও র‍্যাপিড রেসপন্স ইউনিটে যোগ দিন। প্রতিকূল পরিস্থিতিতে দ্রুততম সময়ে সত্য প্রতিষ্ঠা ও সংকট প্রশমনে কার্যকর ভূমিকা রাখুন।',
            'responsibilities_en' => [
                'Deploy 24/7 crisis response frameworks and scenario simulation drills.',
                'Monitor social listening channels and digital sentiment for volatile issues.',
                'Draft decisive press responses, Q&A documents, and fact-sheets under strict deadlines.',
                'Coordinate with legal counsel and corporate risk committees.',
            ],
            'responsibilities_bn' => [
                '২৪/৭ ক্রাইসিস রেসপন্স ফ্রেমওয়ার্ক ও সিমুলেশন ড্রিল পরিচালনা।',
                'ডিজিটাল মিডিয়া ও জনমতের ঝুঁকি পর্যবেক্ষণ এবং তাৎক্ষণিক সমাধান রূপরেখা তৈরি।',
                'জরুরি প্রেস রিলিজ, কিউঅ্যান্ডএ (Q&A) এবং প্রাতিষ্ঠানিক অবস্থানপত্র রচনা।',
                'কর্পোরেট লিগ্যাল টিম ও রিস্ক ম্যানেজমেন্ট কমিটির সাথে সরাসরি সমন্বয়।',
            ],
            'requirements_en' => [
                '5+ years experience in investigative journalism, crisis PR, or corporate litigation support.',
                'Exceptional composure, analytical rigor, and sound judgment under severe pressure.',
                'Mastery of digital disinformation tracking and fact-checking protocols.',
            ],
            'requirements_bn' => [
                'ইনভেস্টিগেটিভ জার্নালিজম, ক্রাইসিস পিআর বা কর্পোরেট রিস্ক ম্যানেজমেন্টে ৫+ বছরের অভিজ্ঞতা।',
                'চরম চাপের মুখে দ্রুত ও নির্ভুল সিদ্ধান্ত গ্রহণের সক্ষমতা।',
                'ডিজিটাল ডিসইনফরমেশন ট্র্যাকিং ও ফ্যাক্ট-চেকিংয়ে পারদর্শিতা।',
            ],
            'benefits_en' => [
                'Competitive compensation with specialized emergency hazard allowances.',
                'Full medical, dental, and optical insurance.',
                'Annual executive wellness stipend.',
            ],
            'benefits_bn' => [
                'আকর্ষণীয় বেতন ও স্পেশাল ক্রাইসিস অ্যালাউন্স।',
                'সম্পূর্ণ মেডিকেল ও হেলথ ইনস্যুরেন্স সুবিধা।',
                'বার্ষিক ওয়েলনেস ও ফিটনেস ভাতা।',
            ],
            'deadline' => now()->addDays(30)->toDateString(),
            'is_active' => true,
            'sort_order' => 2,
        ]);

        // 3. Media Relations & Press Bureau Liaison
        $job3 = JobPosting::create([
            'slug' => 'media-relations-press-liaison',
            'title_en' => 'Media Relations & Press Bureau Liaison',
            'title_bn' => 'মিডিয়া রিলেশনস ও প্রেস লিয়াজোঁ অফিসার',
            'department_en' => 'Media Relations',
            'department_bn' => 'মিডিয়া রিলেশনস',
            'employment_type' => 'full_time',
            'workplace_type' => 'hybrid',
            'location_en' => 'Niketon, Gulshan-1, Dhaka',
            'location_bn' => 'নিকেতন, গুলশান-১, ঢাকা',
            'experience_level_en' => '3+ Years Media Experience',
            'experience_level_bn' => '৩+ বছরের গণমাধ্যম সমন্বয় অভিজ্ঞতা',
            'salary_range_en' => 'Competitive + Field Allowances',
            'salary_range_bn' => 'প্রতিযোগিতামূলক বেতন + ফিল্ড অ্যালাউন্স',
            'short_desc_en' => 'Maintain daily bridges with leading national dailies, television networks, and business journalists across Bangladesh.',
            'short_desc_bn' => 'জাতীয় দৈনিক, টেলিভিশন চ্যানেল ও বিজনেস সাংবাদিকদের সাথে সৌহার্দ্যপূর্ণ পেশাগত সম্পর্ক বজায় রাখুন ও প্রেস কভারেজ নিশ্চিত করুন।',
            'overview_en' => 'Our Media Desk is looking for an articulate, well-networked media professional to handle media distributions, press conferences, and feature story pitching.',
            'overview_bn' => 'আমাদের মিডিয়া ডেস্কের জন্য জাতীয় গণমাধ্যমে প্রেস রিলিজ বিতরণ, প্রেস কনফারেন্স এবং ফিচার স্টোরি সমন্বয়ে দক্ষ প্রফেশনাল আবশ্যক।',
            'responsibilities_en' => [
                'Disseminate press releases across print, digital, and broadcast news desks.',
                'Organize press briefings, executive interviews, and media appreciation meets.',
                'Track and compile real-time PR value and media coverage clipping dossiers.',
            ],
            'responsibilities_bn' => [
                'প্রিন্ট, টেলিভিশন ও অনলাইন নিউজ পোর্টালে প্রেস বিজ্ঞপ্তি পাঠানো ও কভারেজ নিশ্চিতকরণ।',
                'প্রেস কনফারেন্স, মিডিয়া ইন্টারভিউ ও মিডিয়া রিলেশনস মিটের সুষ্ঠু আয়োজন।',
                'প্রেস ক্লিপিংস ডসিয়ার ও পিআর ভ্যালু অ্যানালাইসিস রিপোর্ট প্রস্তুতকরণ।',
            ],
            'requirements_en' => [
                'Bachelor’s or Master’s in Journalism, Media Studies, or Public Relations.',
                'Direct working experience with national newspaper and TV journalists in Dhaka.',
                'Strong interpersonal networking and follow-up capabilities.',
            ],
            'requirements_bn' => [
                'সাংবাদিকতা, মিডিয়া স্টাডিজ বা জনসংযোগে স্নাতক বা স্নাতকোত্তর ডিগ্রি।',
                'ঢাকার সিনিয়র রিপোর্টার ও চিফ রিপোর্টারদের সাথে প্রত্যক্ষ কাজের অভিজ্ঞতা।',
                'চমৎকার যোগাযোগ ও সম্পর্ক উন্নয়ন দক্ষতা।',
            ],
            'benefits_en' => [
                'Provident fund and gratuity.',
                'Subsidized transportation allowance for media center visits.',
                'Performance incentives for successful national exclusive features.',
            ],
            'benefits_bn' => [
                'প্রভিডেন্ট ফান্ড এবং গ্র্যাচুইটি সুবিধা।',
                'মিডিয়া ট্রাভেলের জন্য ট্রান্সপোর্টেশন ভাতা।',
                'ন্যাশনাল এক্সক্লুসিভ স্টোরি সফল কভারেজের জন্য ইনসেনটিভ।',
            ],
            'deadline' => now()->addDays(60)->toDateString(),
            'is_active' => true,
            'sort_order' => 3,
        ]);

        // 4. Strategic Narrative & Editorial Content Lead
        $job4 = JobPosting::create([
            'slug' => 'strategic-narrative-editorial-lead',
            'title_en' => 'Strategic Narrative & Editorial Content Lead',
            'title_bn' => 'স্ট্র্যাটেজিক ন্যারেটিভ ও এডিটোরিয়াল কনটেন্ট লিড',
            'department_en' => 'Narrative Engineering',
            'department_bn' => 'ন্যারেটিভ ইঞ্জিনিয়ারিং',
            'employment_type' => 'full_time',
            'workplace_type' => 'hybrid',
            'location_en' => 'Niketon, Gulshan-1, Dhaka',
            'location_bn' => 'নিকেতন, গুলশান-১, ঢাকা',
            'experience_level_en' => '4+ Years in Executive Writing / Journalism',
            'experience_level_bn' => '৪+ বছরের এক্সিকিউটিভ লেখালেখি বা সম্পাদকীয় অভিজ্ঞতা',
            'salary_range_en' => 'Negotiable based on portfolio',
            'salary_range_bn' => 'পোর্টফোলিও ও দক্ষতার ভিত্তিতে সমঝোতাযোগ্য',
            'short_desc_en' => 'Craft visionary speeches, thought leadership articles, and high-impact white papers for top CEOs and industry leaders.',
            'short_desc_bn' => 'শীর্ষ নির্বাহীদের জন্য আন্তর্জাতিক মানের অপ-এড (Op-Ed), বক্তৃতা, ব্র্যান্ড ন্যারেটিভ ও শ্বেতপত্র রচনা করুন।',
            'overview_en' => 'Berlo is seeking a master of corporate persuasion. You will transform complex business concepts and policy matters into compelling narratives that captivate national stakeholders.',
            'overview_bn' => 'জটিল ব্যবসায়িক ও অর্থনৈতিক ধারণাকে সহজ, প্রাঞ্জল ও প্রভাবশালী ন্যারেটিভে রূপান্তরের জন্য প্রতিভাবান লেখক আবশ্যক।',
            'responsibilities_en' => [
                'Author executive ghostwritten thought-pieces for national and global publications.',
                'Develop comprehensive corporate narrative manifestos and brand manifestos.',
                'Collaborate with research and data teams to anchor stories in empirical analytics.',
            ],
            'responsibilities_bn' => [
                'শীর্ষ নির্বাহীদের জন্য জাতীয় দৈনিকে প্রকাশের উদ্দেশ্যে বিশেষজ্ঞ মতামত রচনা।',
                'কর্পোরেট ন্যারেটিভ ম্যানিফেস্টো ও ব্র্যান্ড গাইডলাইন প্রস্তুতকরণ।',
                'ডাটা অ্যানালিটিক্স দলের সাথে সমন্বয় করে গবেষণাধর্মী কনটেন্ট তৈরি।',
            ],
            'requirements_en' => [
                'Superb English & Bengali vocabulary with impeccable grammar and nuance.',
                'Portfolio of published articles in reputable economic journals or broadsheets.',
                'Familiarity with financial reporting, ESG agendas, and capital markets.',
            ],
            'requirements_bn' => [
                'বাংলা ও ইংরেজি ভাষায় গভীর জ্ঞান ও নির্ভুল বাক্য গঠনের অসাধারণ দক্ষতা।',
                'জাতীয় প্রথম সারির গণমাধ্যমে প্রকাশিত লেখার সমৃদ্ধ পোর্টফোলিও।',
                'অর্থনীতি, করপোরেট গভর্ন্যান্স ও শিল্প নীতি সম্পর্কে সম্যক জ্ঞান।',
            ],
            'benefits_en' => [
                'Competitive compensation with byline prestige and bonus per published executive series.',
                'Access to international research databases (Statista, Bloomberg, Reuters).',
                'Hybrid and autonomous creative working arrangements.',
            ],
            'benefits_bn' => [
                'উচ্চমানের সম্মানী ও প্রতিটি প্রকাশিত সিরিজের জন্য বিশেষ বোনাস।',
                'আন্তর্জাতিক রিসার্চ ও ডাটাবেজ অ্যাক্সেস সুবিধা।',
                'সৃজনশীল ও স্বাধীন কাজের পরিবেশ।',
            ],
            'deadline' => now()->addDays(50)->toDateString(),
            'is_active' => true,
            'sort_order' => 4,
        ]);

        // Seed 2 sample applications for admin review
        JobApplication::create([
            'job_posting_id' => $job1->id,
            'name' => 'Kazi Farhan Ahmed',
            'email' => 'farhan.kazi@outlook.com',
            'phone' => '+880 1718 901 234',
            'linkedin_url' => 'https://linkedin.com/in/farhankazi-pr',
            'portfolio_url' => 'https://farhankazi.com',
            'cover_letter' => 'With 9 years directing corporate affairs at multinational telecom and banking sectors, I am deeply eager to champion Berlo\'s corporate advisory practice.',
            'status' => 'shortlisted',
            'admin_notes' => 'Exceptional telecom leadership background. Scheduled preliminary interview for Thursday at 11:30 AM.',
        ]);

        JobApplication::create([
            'job_posting_id' => $job2->id,
            'name' => 'Nusrat Jahan Chowdhury',
            'email' => 'nusrat.jahan@gmail.com',
            'phone' => '+880 1823 456 789',
            'linkedin_url' => 'https://linkedin.com/in/nusratjahan-crisis',
            'cover_letter' => 'Having managed sensitive media situations during my 6 years at a national newsroom, I bring rapid calm and clarity to high-stress scenarios.',
            'status' => 'pending',
            'admin_notes' => 'Strong investigative background. Resume forwarded to senior crisis partner.',
        ]);
    }
}

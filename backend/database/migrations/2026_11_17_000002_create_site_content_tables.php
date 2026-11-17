<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Services table
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_en');
            $table->string('title_bn');
            $table->text('short_desc_en');
            $table->text('short_desc_bn');
            $table->longText('desc_en')->nullable();
            $table->longText('desc_bn')->nullable();
            $table->string('icon')->default('Briefcase');
            $table->string('stat_number')->nullable();
            $table->string('stat_label_en')->nullable();
            $table->string('stat_label_bn')->nullable();
            $table->json('faqs')->nullable();
            $table->json('process_steps')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 2. Service Capabilities table
        Schema::create('service_capabilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->string('title_en');
            $table->string('title_bn');
            $table->text('desc_en');
            $table->text('desc_bn');
            $table->json('deliverables_en')->nullable();
            $table->json('deliverables_bn')->nullable();
            $table->string('metrics_en')->nullable();
            $table->string('metrics_bn')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 3. Projects / Case Studies table
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_en');
            $table->string('title_bn');
            $table->string('client_name');
            $table->string('industry');
            $table->string('year')->default('2024');
            $table->text('overview_en');
            $table->text('overview_bn');
            $table->longText('challenge_en')->nullable();
            $table->longText('challenge_bn')->nullable();
            $table->longText('solution_en')->nullable();
            $table->longText('solution_bn')->nullable();
            $table->longText('impact_en')->nullable();
            $table->longText('impact_bn')->nullable();
            $table->string('stat_number')->nullable();
            $table->string('stat_label_en')->nullable();
            $table->string('stat_label_bn')->nullable();
            $table->string('cover_image')->nullable();
            $table->json('gallery')->nullable();
            $table->json('testimonial')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 4. Team Members table
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name_en');
            $table->string('name_bn');
            $table->string('role_en');
            $table->string('role_bn');
            $table->string('division_en')->default('Strategic Advisory');
            $table->string('division_bn')->default('কৌশলগত পরামর্শ');
            $table->longText('bio_en')->nullable();
            $table->longText('bio_bn')->nullable();
            $table->string('photo')->nullable();
            $table->json('credentials')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('twitter')->nullable();
            $table->boolean('is_leadership')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 5. Clients table
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo')->nullable();
            $table->string('industry')->nullable();
            $table->string('tier')->default('Corporate'); // Enterprise, Government, Corporate
            $table->string('website')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 6. Testimonials table
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->nullable()->constrained()->nullOnDelete();
            $table->string('author_name_en');
            $table->string('author_name_bn');
            $table->string('author_role_en');
            $table->string('author_role_bn');
            $table->text('quote_en');
            $table->text('quote_bn');
            $table->integer('rating')->default(5);
            $table->string('avatar')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 7. Insights / Articles table
        Schema::create('insights', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_en');
            $table->string('title_bn');
            $table->string('category')->default('Crisis PR');
            $table->string('author_en')->default('Berlo Editorial Board');
            $table->string('author_bn')->default('বার্লো সম্পাদকীয় পর্ষদ');
            $table->text('excerpt_en');
            $table->text('excerpt_bn');
            $table->longText('content_en');
            $table->longText('content_bn');
            $table->string('featured_image')->nullable();
            $table->string('read_time')->default('5 min read');
            $table->json('key_takeaways_en')->nullable();
            $table->json('key_takeaways_bn')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->string('status')->default('published'); // draft, published
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        // 8. Gallery Photos table
        Schema::create('gallery_photos', function (Blueprint $table) {
            $table->id();
            $table->string('title_en');
            $table->string('title_bn');
            $table->string('category_key'); // events, press, crisis, activation, speaker
            $table->string('category_en');
            $table->string('category_bn');
            $table->string('image_url');
            $table->string('event_date')->nullable();
            $table->string('location_en')->nullable();
            $table->string('location_bn')->nullable();
            $table->string('client_name')->nullable();
            $table->text('desc_en')->nullable();
            $table->text('desc_bn')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 9. Gallery Videos table
        Schema::create('gallery_videos', function (Blueprint $table) {
            $table->id();
            $table->string('title_en');
            $table->string('title_bn');
            $table->string('category_key'); // documentary, press, campaign, keynote
            $table->string('category_en');
            $table->string('category_bn');
            $table->string('youtube_id');
            $table->string('duration')->default('03:00');
            $table->string('views')->default('10K');
            $table->string('release_date')->nullable();
            $table->string('client_name')->nullable();
            $table->text('desc_en')->nullable();
            $table->text('desc_bn')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 10. Media Items (Press Coverage) table
        Schema::create('media_items', function (Blueprint $table) {
            $table->id();
            $table->string('title_en');
            $table->string('title_bn');
            $table->string('outlet_name');
            $table->string('outlet_logo')->nullable();
            $table->string('media_type')->default('print'); // print, broadcast, online
            $table->string('published_date')->nullable();
            $table->string('url')->nullable();
            $table->text('excerpt_en')->nullable();
            $table->text('excerpt_bn')->nullable();
            $table->timestamps();
        });

        // 11. Inquiries / Leads table
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('organization')->nullable();
            $table->string('service_interest')->nullable();
            $table->string('budget_range')->nullable();
            $table->text('message');
            $table->string('source')->default('contact_form'); // contact_form, chatbot, quick_pill
            $table->string('status')->default('pending'); // pending, in_review, contacted, closed
            $table->text('admin_notes')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();
        });

        // 12. Newsletter Subscribers table
        Schema::create('newsletter_subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('locale')->default('en');
            $table->string('source')->default('website_footer');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 13. Site Settings table
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('text'); // text, json, boolean, number
            $table->string('group')->default('general'); // general, contact, social, seo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('newsletter_subscribers');
        Schema::dropIfExists('inquiries');
        Schema::dropIfExists('media_items');
        Schema::dropIfExists('gallery_videos');
        Schema::dropIfExists('gallery_photos');
        Schema::dropIfExists('insights');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('clients');
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('service_capabilities');
        Schema::dropIfExists('services');
    }
};

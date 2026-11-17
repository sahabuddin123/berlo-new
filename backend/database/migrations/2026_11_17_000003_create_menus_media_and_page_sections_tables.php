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
        // 1. Navigation Menu Items
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('location')->default('header'); // header, footer_quick, footer_capabilities, footer_legal
            $table->foreignId('parent_id')->nullable()->constrained('menu_items')->cascadeOnDelete();
            $table->string('title_en');
            $table->string('title_bn');
            $table->string('url');
            $table->string('target')->default('_self'); // _self, _blank
            $table->string('icon')->nullable();
            $table->string('badge_text')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Media Assets (Media Library)
        Schema::create('media_assets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('url');
            $table->string('mime_type');
            $table->unsignedBigInteger('size_bytes')->default(0);
            $table->string('dimensions')->nullable();
            $table->string('folder')->default('general'); // general, services, articles, gallery, team, clients
            $table->string('alt_text')->nullable();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        // 3. Dynamic Page Sections
        Schema::create('page_sections', function (Blueprint $table) {
            $table->id();
            $table->string('page_slug'); // home, about, contact, legal
            $table->string('section_key'); // hero, stats, why_us, cta, mission, heritage, etc.
            $table->string('title_en')->nullable();
            $table->string('title_bn')->nullable();
            $table->text('subtitle_en')->nullable();
            $table->text('subtitle_bn')->nullable();
            $table->string('badge_en')->nullable();
            $table->string('badge_bn')->nullable();
            $table->longText('content_en')->nullable();
            $table->longText('content_bn')->nullable();
            $table->string('image_url')->nullable();
            $table->string('video_url')->nullable();
            $table->string('cta_text_en')->nullable();
            $table->string('cta_text_bn')->nullable();
            $table->string('cta_link')->nullable();
            $table->json('metadata')->nullable(); // structured extra props
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['page_slug', 'section_key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_sections');
        Schema::dropIfExists('media_assets');
        Schema::dropIfExists('menu_items');
    }
};

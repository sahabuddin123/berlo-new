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
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_en');
            $table->string('title_bn');
            $table->string('department_en')->default('Strategic PR');
            $table->string('department_bn')->default('কৌশলগত জনসংযোগ');
            $table->string('employment_type')->default('full_time'); // full_time, part_time, contract, internship
            $table->string('workplace_type')->default('on_site');   // on_site, hybrid, remote
            $table->string('location_en')->default('Niketon, Gulshan-1, Dhaka');
            $table->string('location_bn')->default('নিকেতন, গুলশান-১, ঢাকা');
            $table->string('experience_level_en')->nullable();
            $table->string('experience_level_bn')->nullable();
            $table->string('salary_range_en')->nullable();
            $table->string('salary_range_bn')->nullable();
            $table->text('short_desc_en')->nullable();
            $table->text('short_desc_bn')->nullable();
            $table->longText('overview_en')->nullable();
            $table->longText('overview_bn')->nullable();
            $table->json('responsibilities_en')->nullable();
            $table->json('responsibilities_bn')->nullable();
            $table->json('requirements_en')->nullable();
            $table->json('requirements_bn')->nullable();
            $table->json('benefits_en')->nullable();
            $table->json('benefits_bn')->nullable();
            $table->date('deadline')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_active', 'sort_order']);
            $table->index('department_en');
        });

        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_posting_id')->nullable()->constrained('job_postings')->nullOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('linkedin_url')->nullable();
            $table->string('portfolio_url')->nullable();
            $table->text('cover_letter')->nullable();
            $table->string('resume_url')->nullable();
            $table->string('resume_path')->nullable();
            $table->string('status')->default('pending'); // pending, reviewed, shortlisted, rejected, hired
            $table->text('admin_notes')->nullable();
            $table->string('ip_address')->nullable();
            $table->timestamps();

            $table->index(['job_posting_id', 'status']);
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
        Schema::dropIfExists('job_postings');
    }
};

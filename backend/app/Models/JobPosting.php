<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class JobPosting extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title_en',
        'title_bn',
        'department_en',
        'department_bn',
        'employment_type',
        'workplace_type',
        'location_en',
        'location_bn',
        'experience_level_en',
        'experience_level_bn',
        'salary_range_en',
        'salary_range_bn',
        'short_desc_en',
        'short_desc_bn',
        'overview_en',
        'overview_bn',
        'responsibilities_en',
        'responsibilities_bn',
        'requirements_en',
        'requirements_bn',
        'benefits_en',
        'benefits_bn',
        'deadline',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'responsibilities_en' => 'array',
        'responsibilities_bn' => 'array',
        'requirements_en' => 'array',
        'requirements_bn' => 'array',
        'benefits_en' => 'array',
        'benefits_bn' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'deadline' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug)) {
                $base = Str::slug($model->title_en ?: 'career-role');
                $slug = $base;
                $counter = 1;
                while (static::where('slug', $slug)->exists()) {
                    $slug = "{$base}-{$counter}";
                    $counter++;
                }
                $model->slug = $slug;
            }
        });
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class, 'job_posting_id');
    }
}

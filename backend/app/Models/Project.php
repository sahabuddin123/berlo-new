<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title_en',
        'title_bn',
        'client_name',
        'industry',
        'year',
        'overview_en',
        'overview_bn',
        'challenge_en',
        'challenge_bn',
        'solution_en',
        'solution_bn',
        'impact_en',
        'impact_bn',
        'stat_number',
        'stat_label_en',
        'stat_label_bn',
        'cover_image',
        'gallery',
        'testimonial',
        'is_featured',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'gallery' => 'array',
        'testimonial' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];
}

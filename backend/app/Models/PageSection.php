<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_slug',
        'section_key',
        'title_en',
        'title_bn',
        'subtitle_en',
        'subtitle_bn',
        'badge_en',
        'badge_bn',
        'content_en',
        'content_bn',
        'image_url',
        'video_url',
        'cta_text_en',
        'cta_text_bn',
        'cta_link',
        'metadata',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'metadata' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}

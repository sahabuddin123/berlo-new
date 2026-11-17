<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insight extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title_en',
        'title_bn',
        'category',
        'author_en',
        'author_bn',
        'excerpt_en',
        'excerpt_bn',
        'content_en',
        'content_bn',
        'featured_image',
        'read_time',
        'key_takeaways_en',
        'key_takeaways_bn',
        'is_featured',
        'status',
        'published_at',
    ];

    protected $casts = [
        'key_takeaways_en' => 'array',
        'key_takeaways_bn' => 'array',
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
    ];
}

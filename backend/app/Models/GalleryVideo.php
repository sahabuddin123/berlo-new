<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_en',
        'title_bn',
        'category_key',
        'category_en',
        'category_bn',
        'youtube_id',
        'duration',
        'views',
        'release_date',
        'client_name',
        'desc_en',
        'desc_bn',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryPhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_en',
        'title_bn',
        'category_key',
        'category_en',
        'category_bn',
        'image_url',
        'event_date',
        'location_en',
        'location_bn',
        'client_name',
        'desc_en',
        'desc_bn',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}

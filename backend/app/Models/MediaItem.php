<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_en',
        'title_bn',
        'outlet_name',
        'outlet_logo',
        'media_type',
        'published_date',
        'url',
        'excerpt_en',
        'excerpt_bn',
    ];
}

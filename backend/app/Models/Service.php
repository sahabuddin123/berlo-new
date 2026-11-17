<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title_en',
        'title_bn',
        'short_desc_en',
        'short_desc_bn',
        'desc_en',
        'desc_bn',
        'icon',
        'stat_number',
        'stat_label_en',
        'stat_label_bn',
        'faqs',
        'process_steps',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'faqs' => 'array',
        'process_steps' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function capabilities(): HasMany
    {
        return $this->hasMany(ServiceCapability::class)->orderBy('sort_order');
    }
}

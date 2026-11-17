<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name_en',
        'name_bn',
        'role_en',
        'role_bn',
        'division_en',
        'division_bn',
        'bio_en',
        'bio_bn',
        'photo',
        'credentials',
        'phone',
        'email',
        'linkedin',
        'twitter',
        'is_leadership',
        'sort_order',
    ];

    protected $casts = [
        'credentials' => 'array',
        'is_leadership' => 'boolean',
        'sort_order' => 'integer',
    ];
}

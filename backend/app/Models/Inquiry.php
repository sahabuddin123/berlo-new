<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'organization',
        'service_interest',
        'budget_range',
        'message',
        'source',
        'status',
        'admin_notes',
        'ip_address',
    ];
}

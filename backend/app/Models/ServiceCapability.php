<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceCapability extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'title_en',
        'title_bn',
        'desc_en',
        'desc_bn',
        'deliverables_en',
        'deliverables_bn',
        'metrics_en',
        'metrics_bn',
        'sort_order',
    ];

    protected $casts = [
        'deliverables_en' => 'array',
        'deliverables_bn' => 'array',
        'sort_order' => 'integer',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}

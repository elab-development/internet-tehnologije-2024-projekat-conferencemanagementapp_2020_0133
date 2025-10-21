<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgendaItem extends Model
{
    /** @use HasFactory<\Database\Factories\AgendaItemFactory> */
    use HasFactory;

    protected $fillable = [
        'conference_id',
        'title',
        'description',
        'speaker_id',
        'type',
        'start_time',
        'end_time',
    ];

    public function conference()
    {
        return $this->belongsTo(Conference::class);
    }

    public function speaker()
    {
        return $this->belongsTo(User::class);
    }
}

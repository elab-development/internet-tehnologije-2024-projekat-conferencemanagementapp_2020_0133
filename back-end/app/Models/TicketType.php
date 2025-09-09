<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketType extends Model
{
    /** @use HasFactory<\Database\Factories\TicketTypeFactory> */
    use HasFactory;
    
    protected $fillable = [
        'conference_id',
        'name',
        'description',
        'price',
        'quantity',
    ];

    public function conference()
    {
        return $this->belongsTo(Conference::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conference extends Model
{
    /** @use HasFactory<\Database\Factories\ConferenceFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'submission_deadline',
        'location',
        'city',
        'country',
        'type',
        'capacity',
        'organization',
        'contact_email',
        'contact_phone',
        'created_by',
    ];
}

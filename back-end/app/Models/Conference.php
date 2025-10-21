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


    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function agendaItems()
    {
        return $this->hasMany(AgendaItem::class);
    }

    public function papers()
    {
        return $this->hasMany(Paper::class);
    }

    public function ticketTypes()
    {
        return $this->hasMany(TicketType::class);
    }

    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'conference_topic');
    }

    public function moderators()
    {
        return $this->belongsToMany(User::class, 'conference_moderator');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'conference_user');
    }
}

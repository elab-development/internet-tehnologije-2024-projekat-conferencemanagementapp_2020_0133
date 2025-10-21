<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = [
        'name',
    ];

    public function papers()
    {
        return $this->hasMany(Paper::class);
    }

    public function conferences()
    {
        return $this->belongsToMany(Conference::class, 'conference_topic');
    }
}

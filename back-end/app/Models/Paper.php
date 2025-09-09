<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paper extends Model
{
    /** @use HasFactory<\Database\Factories\PaperFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'abstract',
        'file_path',
        'submission_date',
        'status',
        'topic_id',
        'main_author_id',
        'co_authors',
    ];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function conference()
    {
        return $this->belongsTo(Conference::class);
    }
    public function mainAuthor()
    {
        return $this->belongsTo(User::class, 'main_author_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}

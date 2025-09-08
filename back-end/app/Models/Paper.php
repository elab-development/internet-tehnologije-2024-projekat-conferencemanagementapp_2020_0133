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
}

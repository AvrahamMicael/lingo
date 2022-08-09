<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'language',
    ];

    public static $availableLanguagesAbbrev = [
        'pt',
        'en',
        'es',
        'la',
    ];
}

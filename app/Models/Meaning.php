<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meaning extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_word',
        'value',
        'isGoogleTranslate',
        'to_language',
    ];

    public $timestamps = false;
}

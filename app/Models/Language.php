<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

    public static $availableAbbrev = [
        'pt',
        'en',
        'es',
        'la',
    ];

    public static function abort_if_not_all_found(string ...$args): void
    {
        abort_if(
            !empty(array_diff($args, self::$availableAbbrev)),
            404,
            'Language not found.',
        );
    }
}

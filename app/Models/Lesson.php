<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'id_user',
        'language',
    ];

    public static function getUserImportedLessons(): Collection
    {
        return DB::table('lessons as l')
            ->select('l.*', 'u.name as username')
            ->rightJoin('users as u', 'u.id', '=', 'l.id_user')
            ->where('u.id', auth()->id())
            ->get();
    }
}

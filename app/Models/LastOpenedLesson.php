<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class LastOpenedLesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'id_lesson',
        'last_opened_at',
    ];

    public $timestamps = false;

    public static function getUserLessons(): Collection
    {
        return DB::table('last_opened_lessons as lol')
            ->select('l.id', 'l.title', 'l.image', 'l.created_at', 'u.name as username')
            ->join('users as u', 'u.id', '=', 'lol.id_user')
            ->leftJoin('lessons as l', 'l.id', '=', 'lol.id_lesson')
            ->where('u.id', auth()->id())
            ->orderBy('last_opened_at', 'desc')
            ->get();
    }
}

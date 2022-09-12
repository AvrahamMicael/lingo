<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Throwable;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'id_user',
        'language',
        'image',
    ];

    public static function getOtherUsersLessons(): Collection
    {
        return DB::table('lessons as l')
        ->select('l.id', 'l.title', 'l.image', 'l.created_at', 'l.language', 'u.name as username')
        ->join('users as u', 'u.id', '=', 'l.id_user')
        ->where('u.id', '!=', auth()->id())
        ->orderBy('created_at', 'desc')
        ->get();
    }

    public static function getUserImportedLessons(): Collection
    {
        return DB::table('lessons as l')
            ->select('l.id', 'l.title', 'l.image', 'l.created_at', 'l.language', 'u.name as username')
            ->join('users as u', 'u.id', '=', 'l.id_user')
            ->where('u.id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public static function storeImageIfExistsAndGetPath(?UploadedFile $image): ?string
    {
        if(!$image) return null;

        try
        {
            $path = $image->store('lessons');
            $path = $path
                ? "storage/$path"
                : null;
        }
        catch(Throwable $_)
        {
            return null;
        }

        return $path;
    }

    public static function getLastOpenedLessonDisplay(int $id_lesson): Collection
    {
        return collect(
            DB::table('last_opened_lessons as lol')
                ->select('l.id', 'l.title', 'l.image', 'l.created_at', 'u.name as username')
                ->join('users as u', 'u.id', '=', 'lol.id_user')
                ->leftJoin('lessons as l', 'l.id', '=', 'lol.id_lesson')
                ->where([
                    ['u.id', auth()->id()],
                    ['l.id', $id_lesson],
                ])
                ->first()
        );
    }

    public function createOrUpdateLastOpenedAt(): void
    {
        $lastOpenedLesson = auth()->user()->lastOpenedLessons()->where('id_lesson', $this->id)->first();
        $data = [
            'id_lesson' => $this->id,
            'last_opened_at' => now(),
        ];
        if($lastOpenedLesson)
        {
            $lastOpenedLesson->update($data);
        }
        else
        {
            auth()->user()->lastOpenedLessons()->create($data);
        }
    }
}

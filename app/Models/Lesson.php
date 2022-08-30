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

    public static function getUserImportedLessons(): Collection
    {
        $lessons = DB::table('lessons as l')
            ->select('l.id', 'l.title', 'l.image', 'l.created_at', 'u.name as username')
            ->rightJoin('users as u', 'u.id', '=', 'l.id_user')
            ->where('u.id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        if($lessons[0]->id == null) return collect();
        return $lessons;
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
}

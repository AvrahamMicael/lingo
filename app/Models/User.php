<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'translation_language',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function getAuthUserData(): array
    {
        return [
            'name' => auth()->user()->name,
            'translation_language' => auth()->user()->translation_language,
            'languages' => Word::getAuthUserWordsWithMeanings(),
        ];
    }

    public function words(): HasMany
    {
        return $this->hasMany(Word::class, 'id_user');
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class, 'id_user');
    }

    public function lastOpenedLessons(): HasMany
    {
        return $this->hasMany(LastOpenedLesson::class, 'id_user');
    }

    public function meanings(): HasManyThrough
    {
        return $this->hasManyThrough(Meaning::class, Word::class, 'id_user', 'id_word');
    }
}

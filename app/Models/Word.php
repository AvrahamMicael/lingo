<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class Word extends Model
{
    use HasFactory;

    protected $fillable = [
        'word',
        'from_language',
        'id_user',
        'level',
    ];

    protected $casts = [
        'level' => 'integer',
    ];

    public $timestamps = false;

    public static function getAuthUserWordsWithMeanings(): Collection
    {
        return collect(
                Word::where('id_user', auth()->id())
                    ->with([
                        'meanings' => function($q) {
                            $q->select('id_word', 'value', 'isGoogleTranslate');
                        },
                    ])
                    ->get()
            )
            ->groupBy('from_language')
            ->map(fn($i) => [
                'words' => $i
            ]);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function meanings(): HasMany
    {
        return $this->hasMany(Meaning::class, 'id_word');
    }
}

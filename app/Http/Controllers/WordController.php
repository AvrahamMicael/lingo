<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Stichoza\GoogleTranslate\GoogleTranslate;

class WordController extends Controller
{
    public function meanings(string $from_language, string $to_language, string $word)
    {
        abort_if(
            !empty(array_diff([$from_language, $to_language], Lesson::$availableLanguagesAbbrev)),
            404,
            'Language not found.',
        );

        return response([
            'meanings' => [
                GoogleTranslate::trans($word, $to_language, $from_language),
                // ...
            ],
        ]);
    }
}

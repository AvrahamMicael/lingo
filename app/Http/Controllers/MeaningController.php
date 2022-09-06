<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;
use Stichoza\GoogleTranslate\GoogleTranslate;

class MeaningController extends Controller
{
    public function wordMeanings(string $from_language, string $to_language, string $word)
    {
        Language::abort_if_not_all_found($from_language, $to_language);
        return response([
            'meanings' => [
                [
                    'value' => GoogleTranslate::trans($word, $to_language, $from_language),
                    'isGoogleTranslate' => true,
                ],
                // ...
            ],
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWordRequest;
use App\Models\Language;
use Stichoza\GoogleTranslate\GoogleTranslate;

class WordController extends Controller
{
    public function meanings(string $from_language, string $to_language, string $word)
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

    public function store(StoreWordRequest $req)
    {
        // add to user's words ...

        $createdWord = [
            'id' => 2,
            'id_user' => 523,
            'to_language' => $req->to_language,
            'from_language' => $req->from_language,
            'word' => $req->word,
            'level' => 1,
        ]; // example

        return response($createdWord, 201);
    }
}

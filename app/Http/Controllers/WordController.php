<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWordRequest;
use App\Models\Language;
use App\Models\Word;
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
        $createdWord = auth()->user()->words()->create($req->all());

        $createdWord->meanings()->create([
            'value' => $req->meaning['value'],
            'isGoogleTranslate' => $req->meaning['isGoogleTranslate'],
            'to_language' => $req->to_language,
        ]);

        $createdWord = [
            'id' => $createdWord->id,
            'id_user' => auth()->id(),
            'to_language' => $req->to_language,
            'from_language' => $req->from_language,
            'word' => $req->word,
            'level' => 1,
        ];

        return response($createdWord, 201);
    }
}

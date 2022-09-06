<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWordRequest;

class WordController extends Controller
{
    public function store(StoreWordRequest $req)
    {
        $createdWord = auth()->user()->words()->create($req->all());

        $id_meaning = $createdWord->meanings()->create([
            'value' => $req->meaning['value'],
            'isGoogleTranslate' => $req->meaning['isGoogleTranslate'],
            'to_language' => $req->to_language,
        ])->id;

        $createdWord = [
            'id' => $createdWord->id,
            'id_user' => auth()->id(),
            'to_language' => $req->to_language,
            'from_language' => $req->from_language,
            'word' => $req->word,
            'level' => 1,
            'id_meaning' => $id_meaning,
        ];

        return response($createdWord, 201);
    }
}

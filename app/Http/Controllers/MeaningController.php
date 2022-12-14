<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddOtherMeaningToWordRequest;
use App\Http\Requests\UpdateMeaningRequest;
use App\Models\Language;
use Stichoza\GoogleTranslate\GoogleTranslate;

class MeaningController extends Controller
{
    public function addOtherToWord(AddOtherMeaningToWordRequest $req)
    {
        $data = $req->only('id_word', 'to_language');
        $data['value'] = $req->meaning['value'];
        $data['isGoogleTranslate'] = $req->meaning['isGoogleTranslate'];
        $meaning = auth()->user()->meanings()->create($data);
        return response($meaning, 201);
    }

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

    public function update(UpdateMeaningRequest $req, int $id)
    {
        $meaning = auth()->user()->meanings()->where('meanings.id', $id);
        if($meaning->exists())
        {
            $meaning->update([
                'value' => $req->newMeaning,
            ]);
        }
        
        return response('');
    }

    public function delete(int $id_meaning)
    {
        $meaning = auth()->user()->meanings()->find($id_meaning);
        $id_word = $meaning->id_word;
        $meaning->delete();

        $wordMeaningsCount = auth()->user()->meanings()->where('id_word', $id_word)->count();
        if($wordMeaningsCount == 0) auth()->user()->words()->where('id', $id_meaning)->update(['level' => -1]);

        return response('', 204);
    }
}

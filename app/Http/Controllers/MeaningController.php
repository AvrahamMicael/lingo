<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMeaningRequest;
use App\Models\Language;
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
}

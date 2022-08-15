<?php

namespace App\Http\Requests;

use App\Models\Language;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;

class StoreWordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $availableLanguagesAbbrev = Arr::join(Language::$availableAbbrev, ',');
        return [
            'word' => 'required|string',
            'meaning' => 'required|array|size:2',
            'meaning.value' => 'required|string',
            'meaning.isGoogleTranslate' => 'required|boolean',
            'from_language' => "required|string|in:$availableLanguagesAbbrev",
            'to_language' => "required|string|in:$availableLanguagesAbbrev",
        ];
    }
}

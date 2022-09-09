<?php

namespace App\Http\Requests;

use App\Models\Language;
use Illuminate\Foundation\Http\FormRequest;

class AddOtherMeaningToWordRequest extends FormRequest
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
        $availableLanguagesAbbrev = Language::getAvailableAbbrevString();
        return [
            'id_word' => 'required|numeric|integer|min:1',
            'meaning' => 'required|array|size:2',
            'meaning.value' => 'required|string',
            'meaning.isGoogleTranslate' => 'required|boolean',
            'to_language' => "required|string|in:$availableLanguagesAbbrev",
        ];
    }
}

<?php

namespace App\Http\Requests;

use App\Models\Language;
use Illuminate\Foundation\Http\FormRequest;

class StoreLessonRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:12000',
            'language' => "required|string|in:$availableLanguagesAbbrev",
            'image' => 'nullable|image|max:5000',
        ];
    }
}

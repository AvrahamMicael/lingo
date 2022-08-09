<?php

namespace App\Http\Requests;

use App\Models\Lesson;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;

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
        $availableLanguagesAbbrev = Arr::join(Lesson::$availableLanguagesAbbrev, ',');
        return [
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:12000',
            'language' => "required|string|in:$availableLanguagesAbbrev",
        ];
    }
}

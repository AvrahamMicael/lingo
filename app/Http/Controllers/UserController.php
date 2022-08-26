<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatchTranslationLanguageRequest;
use App\Models\User;

class UserController extends Controller
{
    public function data()
    {
        return response(User::getAuthUserData());
    }

    public function translationLanguage()
    {
        return inertia('user.language');
    }

    public function changeTranslationLanguage(PatchTranslationLanguageRequest $req)
    {
        auth()->user()->update($req->only('translation_language'));
        return redirect()->route('home');
    }
}

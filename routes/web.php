<?php

use App\Http\Controllers\LessonController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WordController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([
    'middleware' => 'auth'
], function() {

    Route::group([
        'controller' => UserController::class,
        'prefix' => 'user/language',
    ], function() {
        Route::middleware('without-translation-language')
            ->get('', 'translationLanguage')->name('')->name('user.language');

        Route::patch('', 'changeTranslationLanguage');
    });


    Route::group([
        'middleware' => 'with-translation-language'
    ], function() {
        Route::inertia('/', 'home')->name('home');

        Route::get('/user/data', [UserController::class, 'data'])->name('user.data');
        
        Route::resource('lesson', LessonController::class);
        
        Route::get('/word/meanings/{from_language}/{to_language}/{word}', [WordController::class, 'meanings'])->name('word.meanings');
        Route::resource('word', WordController::class);
    });
});

require __DIR__.'/auth.php';

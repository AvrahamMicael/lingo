<?php

namespace App\Http\Controllers;

use App\Models\LastOpenedLesson;
use App\Models\Lesson;

class HomeController extends Controller
{
    public function index()
    {
        $lastOpenedLessons = LastOpenedLesson::getUserLessons();
        $userImportedLessons = Lesson::getUserImportedLessons();
        return inertia('home', compact('lastOpenedLessons', 'userImportedLessons'));
    }
}

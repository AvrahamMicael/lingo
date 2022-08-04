<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function create()
    {
        return inertia('lesson.create');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLessonRequest;
use App\Models\Lesson;

class LessonController extends Controller
{
    public function create()
    {
        return inertia('lesson.create');
    }

    public function store(StoreLessonRequest $req)
    {
        $lesson = Lesson::create($req->all());
        return redirect()->route('lesson.show', $lesson->id);
    }

    public function show(Lesson $lesson)
    {
        return inertia('lesson.show', compact('lesson'));
    }
}

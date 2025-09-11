<?php

namespace App\Http\Controllers;


use App\Models\Paper;
use App\Http\Requests\StorePaperRequest;
use App\Models\Conference;
use App\Services\ModelPreparationService;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PaperController extends Controller
{
    public function store(StorePaperRequest $request)
    {

        $filePath = $request['file']->store('papers', 'public');
        Log::info($request);
        $model = ModelPreparationService::preparePaper($request->validated(), $filePath, Auth::id()) +
            ['status' => 'Submitted'];
        Log::info($model);
        $paper = Paper::create(
            $model
        );

        return response()->json([
            'success' => true,
            'message' => 'Paper submitted successfully.',
            'data' => $paper
        ], 201);
    }


    public function getPapersOfConference(Conference $conference){
        $papers = $conference->papers()->with(['mainAuthor', 'topic'])->get();
        return response()->json([
            'success' => true,
            'message' => 'Founded papers',
            'data' => $papers
        ], 200);
}

}

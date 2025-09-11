<?php

namespace App\Http\Controllers;


use App\Models\Paper;
use App\Http\Requests\StorePaperRequest;
use App\Services\ModelPreparationService;
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
        // $paper->conference()->attach($request['conferenceId']);
        // $paper->mainAuthor()->attach(Auth::id());
        return response()->json([
            'success' => true,
            'message' => 'Paper submitted successfully.',
            'data' => $paper
        ], 201);
    }
}

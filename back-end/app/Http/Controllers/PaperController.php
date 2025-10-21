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

        // Provera da li je korisnik već poslao rad za ovu konferenciju
        $conferenceId = $request->input('conferenceId');
        $userId = Auth::id();
        $alreadySubmitted = Paper::where('conference_id', $conferenceId)
            ->where('main_author_id', $userId)
            ->exists();

        if ($alreadySubmitted) {
            return response()->json([
                'success' => false,
                'message' => 'You can only submit one paper per conference.'
            ], 400);
        }

        // Provera da li je submission deadline prošao
        $conference = Conference::findOrFail($conferenceId);
        if (now()->greaterThan($conference->submission_deadline)) {
            return response()->json([
                'success' => false,
                'message' => 'Submission deadline for this conference has passed.'
            ], 400);
        }

        $originalName = $request->file('file')->getClientOriginalName();
        $uniqueName = time() . '_' . uniqid() . '_' . $originalName;
        $filePath = 'storage/' . $request->file('file')->storeAs('papers', $uniqueName, 'public');

        $model = ModelPreparationService::preparePaper($request->validated(), $filePath, $userId) +
            ['status' => 'Submitted'];

        $paper = Paper::create($model);

        return response()->json([
            'success' => true,
            'message' => 'Paper submitted successfully.',
            'data' => $paper
        ], 201);
    }


    public function getPapersOfConference(Conference $conference){
        $papers = $conference->papers()->with(['mainAuthor', 'topic', 'reviews'])->paginate(12);
        return response()->json($papers, 200);
}
    public function myPapers()
    {
        $userId = Auth::id();
        $papers = Paper::where('main_author_id', $userId)->with(['conference', 'topic'])->get();
        return response()->json($papers);
    }
    public function show(Paper $paper)
    {
        $paper->load(['conference', 'mainAuthor', 'topic', 'reviews']);
        return response()->json($paper, 200);
    }

}

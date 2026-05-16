<?php

namespace App\Http\Controllers;

use App\Models\Conference;
use App\Http\Requests\StoreConferenceRequest;
use App\Http\Requests\UpdateConferenceRequest;
use App\Http\Resources\ConferenceDetailResource;
use App\Http\Resources\ConferencePreviewResource;
use App\Services\ConferenceService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConferenceController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Conference::query()->with('topics')
            ->where('end_date', '>', Carbon::today());
        if ($request->has('country')) {
            $query->whereIn('country', explode(',',$request->input('country')));
        }

        if ($request->has('topic')) {
            $query->whereHas('topics', function ($q) use ($request) {
                $q->whereIn('topics.id',
                        explode(',',$request->input('topic')));
            });
        }

        if($request->has('search')){
            $search = $request->input('search');
            $query->where('title', 'like', "%$search%");
        }

        $query->orderBy('start_date', $request->input('sortBy', 'asc'));

        $rows = $query->paginate($request->input('limit', 20));
        

        return ConferencePreviewResource::collection($rows);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConferenceRequest $request)
    {
        $conference = ConferenceService::createConference($request->validated(), $request->user()->id);
        return new ConferenceDetailResource($conference->load(['topics', 'agendaItems', 'ticketTypes']));
    }

    /**
     * Display the specified resource.
     */
    public function show(Conference $conference)
    {
        $conference->load(['topics', 'agendaItems', 'ticketTypes', 'creator']);
        return response() ->json(new ConferenceDetailResource($conference));
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConferenceRequest $request, Conference $conference)
    {
        $conference = ConferenceService::updateConference($request->all(), $conference);
        return new ConferenceDetailResource($conference->load(['topics', 'agendaItems', 'ticketTypes', 'users']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conference $conference)
    {
        
        if ($conference->created_by !== Auth::id()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $conference->delete();

    }

    public function myConferences(Request $request)
    {
        $user = $request->user();

        // Group owner/moderator conditions so subsequent where() applies to the whole group
        $query = Conference::where(function ($q) use ($user) {
            $q->where('created_by', $user->id)
              ->orWhereHas('moderators', function ($q2) use ($user) {
                  $q2->where('user_id', $user->id);
              });
        })->with(['moderators', 'topics']);

        if ($request->has('search') && $request->filled('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', '%' . $search . '%');
        }

        $conferences = $query->orderBy('start_date', $request->input('sortBy', 'asc'))
                              ->paginate($request->input('limit', 12));

        return ConferenceDetailResource::collection($conferences);
    }
}
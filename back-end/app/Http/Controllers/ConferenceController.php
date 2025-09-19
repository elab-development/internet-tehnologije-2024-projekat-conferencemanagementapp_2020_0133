<?php

namespace App\Http\Controllers;

use App\Models\Conference;
use App\Http\Requests\StoreConferenceRequest;
use App\Http\Requests\UpdateConferenceRequest;
use App\Http\Resources\ConferenceDetailResource;
use App\Http\Resources\ConferencePreviewResource;
use App\Services\ConferenceService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ConferenceController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conferences = Conference::with('topics')
            ->where('end_date', '>', Carbon::today())
            ->orderBy('start_date', 'asc')
            ->paginate(1);

        return ConferencePreviewResource::collection($conferences)
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        $conference->load(['topics', 'agendaItems', 'ticketTypes']);
        return response() ->json(new ConferenceDetailResource($conference));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Conference $conference)
    {
        //
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
}

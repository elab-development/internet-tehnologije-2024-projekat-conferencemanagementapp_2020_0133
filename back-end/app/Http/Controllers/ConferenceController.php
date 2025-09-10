<?php

namespace App\Http\Controllers;

use App\Models\Conference;
use App\Http\Requests\StoreConferenceRequest;
use App\Http\Requests\UpdateConferenceRequest;
use App\Http\Resources\ConferenceDetailResource;
use App\Http\Resources\ConferencePreviewResource;
use Carbon\Carbon;

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
            ->paginate(10);

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Conference $conference)
    {
        $conference->load(['topics', 'agendaItems', 'ticketTypes']);
        return new ConferenceDetailResource($conference);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conference $conference)
    {
        //
    }
}

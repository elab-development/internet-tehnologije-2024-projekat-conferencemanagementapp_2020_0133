<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Conference;
use App\Http\Resources\ConferencePreviewResource;
use Illuminate\Http\Request;

class UserConferencesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($id, Request $request)
    {
        $id = $request->route('id');
        $user = User::findOrFail($id);

    $conferences = Conference::where('created_by', $user->id)->get();

    return ConferencePreviewResource::collection($conferences)
    ->response()
    ->setStatusCode(200);
    }
}

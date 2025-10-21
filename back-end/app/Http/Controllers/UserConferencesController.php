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
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $query = Conference::where('created_by', $user->id);

        if ($request->has('search') && $request->filled('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', '%' . $search . '%');
        }

        $conferences = $query->paginate(12);

        return ConferencePreviewResource::collection($conferences);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Review;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {}



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewRequest $request)
    {
        $review = Review::create($request->validated());
        return new ReviewResource($review);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

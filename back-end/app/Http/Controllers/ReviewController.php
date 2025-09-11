<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Review;

class ReviewController extends Controller
{
    public function __invoke(StoreReviewRequest $request){
        $review = Review::create($request->validated());
        return new ReviewResource($review);
    }
    
}

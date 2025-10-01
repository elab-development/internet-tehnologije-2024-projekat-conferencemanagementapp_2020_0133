<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConferenceController;
use App\Http\Controllers\PaperController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserConferencesController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'forgotPassword']);
    Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);
    Route::get('/user', function (Request $request) {
        return response()->json(new UserResource($request->user()));
    })->middleware('auth:sanctum');
    Route::middleware('auth:sanctum')->post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});
Route::apiResource('conferences', ConferenceController::class)
    ->only(['index', 'show']);
Route::apiResource('/conferences', ConferenceController::class)
    ->middleware(['auth:sanctum', 'role:organizer'])->except(['index', 'show']);
Route::get('/user/{id}/conferences', UserConferencesController::class)
    ->middleware(['auth:sanctum', 'role:organizer']);
Route::post('/reviews', ReviewController::class)->middleware(['auth:sanctum', 'role:moderator']);
Route::post('/papers', [PaperController::class, 'store'])->middleware(['auth:sanctum']);
Route::get('conference/{conference}/papers', [PaperController::class, "getPapersOfConference"])
->middleware(['auth:sanctum', 'role:moderator']);
Route::post('/tickets', [TicketController::class, "purchaseTicket"])->middleware('auth:sanctum');
Route::get('/topics', TopicController::class);
Route::middleware('auth:sanctum')->put('/user', [UserController::class, 'update']);

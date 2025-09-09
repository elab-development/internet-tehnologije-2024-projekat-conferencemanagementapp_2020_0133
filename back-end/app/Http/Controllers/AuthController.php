<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $userData = $request->validatedSnakeCase();
        $userData['password'] = Hash::make($userData['password']);

        $user = User::create($userData);
        $user->assignRole('attender');


        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => new UserResource($user),
            'token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function update(UpdateUserRequest $request)
    {
        $user = $request->user();
        $user->first_name = $request->input('firstName');
        $user->last_name = $request->input('lastName');
        $user->city = $request->input('city');
        $user->country = $request->input('country');
        $user->phone = $request->input('phone');
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully.',
            'data' => $user
        ]);
    }
}

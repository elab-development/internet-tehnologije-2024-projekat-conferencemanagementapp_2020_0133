<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $status = Password::sendResetLink(
            ['email' => $request['email']],
            function ($user, $token) {
                $url =  "http://127.0.0.1:8000". "/reset-password?token=$token&email={$user->email}"; //config('app.frontend_url')
                Mail::to($user->email)->send(new ResetPasswordMail($url));
            }
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['success' => true, 'message' => __($status)])
            : response()->json(['success' => false, 'message' => __($status)], 400);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $credentials = $request->fieldsToArray();

        $status = Password::reset(
            $credentials,
            function (User $user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'success' => true,
                'message' => 'Password has been reset successfully.'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => __($status)
            ], 400);
        }
    }
}

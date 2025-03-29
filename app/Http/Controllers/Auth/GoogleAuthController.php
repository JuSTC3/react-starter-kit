<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\AuthHelper;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class GoogleAuthController extends Controller
{
    /**
     * Redirect to Google OAuth page.
     */
    public function redirect()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    /**
     * Handle Google callback and log in/register user.
     */
    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            if (!AuthHelper::isAllowedEmailDomain($googleUser->getEmail())) {
                return redirect()->route('login')->withErrors([
                    'google' => 'This email domain is not allowed.'
                ]);
            }

            // Find or create user
            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'password' => bcrypt(Str::random(16)), // Random password (not used)
                ]
            );

            // Log in user
            Auth::login($user, true);

            // Generate a Passport token
            $token = $user->createToken('GoogleAuth')->accessToken;

            return redirect()->route('dashboard')->with('token', $token);
        } catch (\Exception $e) {
            return redirect()->route('login')->withErrors([
                'google' => 'This email is not allowed.'
            ]);
        }
    }
}

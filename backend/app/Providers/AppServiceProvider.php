<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 1. Strict Login Brute-force Throttling: 5 attempts per minute
        RateLimiter::for('login', function (Request $request) {
            $key = $request->ip() . '|' . strtolower((string) $request->input('email'));
            return Limit::perMinute(5)->by($key)->response(function () {
                return response()->json([
                    'success' => false,
                    'message' => 'Too many login attempts. Please wait 60 seconds before trying again.',
                ], 429);
            });
        });

        // 2. Strict Forgot & Reset Password Throttling: 3 attempts per 15 minutes
        RateLimiter::for('password-reset', function (Request $request) {
            $key = $request->ip() . '|' . strtolower((string) $request->input('email'));
            return Limit::perMinutes(15, 3)->by($key)->response(function () {
                return response()->json([
                    'success' => false,
                    'message' => 'Too many password reset requests. Please try again after 15 minutes.',
                ], 429);
            });
        });

        // 3. Public Contact Form / Lead Inquiries Throttling: 5 submissions per 10 minutes
        RateLimiter::for('contact-form', function (Request $request) {
            return Limit::perMinutes(10, 5)->by($request->ip())->response(function () {
                return response()->json([
                    'success' => false,
                    'message' => 'Submission rate limit reached. Please wait a few moments before sending another message.',
                ], 429);
            });
        });

        // 4. General Public API Throttling: 60 requests per minute
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}

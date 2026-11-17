<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned the "api" middleware group.
|
*/

// Health-check endpoint with rate limiting protection
Route::middleware('throttle:60,1')->group(function (): void {
    Route::get('/health', fn () => response()->json([
        'status' => 'ok',
        'service' => 'Berlo Communications API',
        'timestamp' => now()->toIso8601String(),
    ]));
});

// All authenticated API routes will be registered here in subsequent phases.
Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function (): void {
    // Phase 02+ authenticated endpoints
});

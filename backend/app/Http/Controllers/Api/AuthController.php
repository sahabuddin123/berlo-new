<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * User Login with Sanctum Token Generation.
     */
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::with(['roles.permissions'])->where('email', strtolower($validated['email']))->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password. Please verify your credentials.',
            ], 401);
        }

        // Generate Sanctum Personal Access Token
        $token = $user->createToken('admin_token')->plainTextToken;

        // Collect all distinct permissions from all assigned roles
        $permissions = $user->roles
            ->flatMap(fn ($role) => $role->permissions->pluck('name'))
            ->unique()
            ->values()
            ->all();

        // Audit Log
        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'login',
            'module' => 'auth',
            'entity_id' => (string) $user->id,
            'payload' => ['email' => $user->email],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name'),
                'is_superadmin' => $user->isSuperAdmin(),
                'permissions' => $permissions,
            ],
        ]);
    }

    /**
     * Get Current Authenticated User & Roles.
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load(['roles.permissions']);

        $permissions = $user->roles
            ->flatMap(fn ($role) => $role->permissions->pluck('name'))
            ->unique()
            ->values()
            ->all();

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name'),
                'is_superadmin' => $user->isSuperAdmin(),
                'permissions' => $permissions,
            ],
        ]);
    }

    /**
     * Logout & Revoke Current Token.
     */
    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();
        if ($user) {
            $user->currentAccessToken()->delete();

            ActivityLog::create([
                'user_id' => $user->id,
                'action' => 'logout',
                'module' => 'auth',
                'entity_id' => (string) $user->id,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

    /**
     * Forgot Password — Generates Secure Password Reset Token.
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
        ]);

        $email = strtolower($validated['email']);
        $user = User::where('email', $email)->first();

        if (!$user) {
            // Return neutral success message to avoid account enumeration
            return response()->json([
                'success' => true,
                'message' => 'If this email is registered, password reset instructions have been issued.',
            ]);
        }

        // Generate 64-character cryptographic token
        $rawToken = Str::random(64);

        // Store hashed token in password_reset_tokens table
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            [
                'token' => Hash::make($rawToken),
                'created_at' => now(),
            ]
        );

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'forgot_password_requested',
            'module' => 'auth',
            'entity_id' => (string) $user->id,
            'payload' => ['email' => $email],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        $response = [
            'success' => true,
            'message' => 'If this email is registered, password reset instructions have been issued.',
        ];

        // Only include reset_token in local non-production environment with debug enabled
        if (app()->environment('local', 'testing') && config('app.debug')) {
            $response['reset_token'] = $rawToken;
            $response['email'] = $email;
        }

        return response()->json($response);
    }

    /**
     * Reset Password — Validates Token and Updates Password.
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'token' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $email = strtolower($validated['email']);
        $resetRecord = DB::table('password_reset_tokens')->where('email', $email)->first();

        if (!$resetRecord) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired password reset request. Please request a new link.',
            ], 400);
        }

        // Check if token expired (valid for 60 minutes)
        if (now()->subMinutes(60)->isAfter($resetRecord->created_at)) {
            DB::table('password_reset_tokens')->where('email', $email)->delete();
            return response()->json([
                'success' => false,
                'message' => 'Password reset token has expired. Please request a new one.',
            ], 400);
        }

        // Verify token match
        if (!Hash::check($validated['token'], $resetRecord->token) && $resetRecord->token !== $validated['token']) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid reset token.',
            ], 400);
        }

        // Update User Password
        $user = User::where('email', $email)->firstOrFail();
        $user->password = Hash::make($validated['password']);
        $user->save();

        // Invalidate reset token & revoke all existing API tokens for security
        DB::table('password_reset_tokens')->where('email', $email)->delete();
        $user->tokens()->delete();

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => 'password_reset_completed',
            'module' => 'auth',
            'entity_id' => (string) $user->id,
            'payload' => ['email' => $email],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password has been reset successfully. You may now log in with your new password.',
        ]);
    }

    /**
     * Update Current User Profile.
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email,' . $user->id],
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully.',
            'user' => $user,
        ]);
    }

    /**
     * Update Current User Password.
     */
    public function updatePassword(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password does not match our records.',
            ], 422);
        }

        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully.',
        ]);
    }
}

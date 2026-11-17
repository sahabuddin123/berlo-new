<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RbacAndAuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\DatabaseSeeder::class);
    }
    /**
     * Test successful login returns token, roles, and permissions.
     */
    public function test_superadmin_can_login_and_receive_token(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'superadmin@berlocommunications.com',
            'password' => 'Berlo@Admin2026!',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonStructure([
                'success',
                'token',
                'user' => [
                    'id',
                    'name',
                    'email',
                    'roles',
                    'is_superadmin',
                    'permissions',
                ],
            ]);

        $this->assertTrue(in_array('superadmin', $response->json('user.roles')));
        $this->assertTrue($response->json('user.is_superadmin'));
    }

    /**
     * Test wrong password returns 401.
     */
    public function test_invalid_login_credentials_rejected(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'superadmin@berlocommunications.com',
            'password' => 'WrongPassword123!',
        ]);

        $response->assertStatus(401)
            ->assertJsonPath('success', false);
    }

    /**
     * Test forgot password generates token.
     */
    public function test_forgot_password_generates_token(): void
    {
        $response = $this->postJson('/api/v1/auth/forgot-password', [
            'email' => 'admin@berlocommunications.com',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonStructure(['success', 'reset_token', 'email']);

        $token = $response->json('reset_token');
        $this->assertNotEmpty($token);

        // Now test resetting password with this token
        $resetResponse = $this->postJson('/api/v1/auth/reset-password', [
            'email' => 'admin@berlocommunications.com',
            'token' => $token,
            'password' => 'NewSecurePassword2026!',
            'password_confirmation' => 'NewSecurePassword2026!',
        ]);

        $resetResponse->assertStatus(200)
            ->assertJsonPath('success', true);

        // Verify login works with new password
        $loginWithNew = $this->postJson('/api/v1/auth/login', [
            'email' => 'admin@berlocommunications.com',
            'password' => 'NewSecurePassword2026!',
        ]);

        $loginWithNew->assertStatus(200)
            ->assertJsonPath('success', true);
    }

    /**
     * Test RBAC: Non-superadmin is forbidden from User Management endpoint.
     */
    public function test_moderator_cannot_access_user_management(): void
    {
        $moderator = User::where('email', 'moderator@berlocommunications.com')->first();
        $token = $moderator->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/admin/users');

        $response->assertStatus(403);
    }

    /**
     * Test RBAC: Superadmin CAN access User Management endpoint.
     */
    public function test_superadmin_can_access_user_management(): void
    {
        $superadmin = User::where('email', 'superadmin@berlocommunications.com')->first();
        $token = $superadmin->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/admin/users');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);
    }

    /**
     * Test Public Content APIs.
     */
    public function test_public_content_apis_return_data(): void
    {
        $services = $this->getJson('/api/v1/services');
        $services->assertStatus(200)->assertJsonPath('success', true);
        $this->assertGreaterThan(0, count($services->json('data')));

        $projects = $this->getJson('/api/v1/projects');
        $projects->assertStatus(200)->assertJsonPath('success', true);

        $team = $this->getJson('/api/v1/team');
        $team->assertStatus(200)->assertJsonPath('success', true);
    }

    /**
     * Test Login Rate Limiting (5 attempts limit).
     */
    public function test_login_rate_limiting_triggers_after_max_attempts(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/v1/auth/login', [
                'email' => 'victim@example.com',
                'password' => 'wrong',
            ]);
        }

        // 6th attempt must be throttled with HTTP 429
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'victim@example.com',
            'password' => 'wrong',
        ]);

        $response->assertStatus(429)
            ->assertJsonPath('success', false);
    }
}

<?php

use App\Http\Controllers\Api\AdminContentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CareerController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\PageAndMenuController;
use App\Http\Controllers\Api\PublicContentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Berlo Communications — Enterprise API Routes (v1)
|--------------------------------------------------------------------------
*/

// Health Check
Route::get('/health', fn () => response()->json([
    'status' => 'ok',
    'service' => 'Berlo Communications API',
    'version' => '1.0.0',
    'timestamp' => now()->toIso8601String(),
]));

// API Version 1 Prefix
Route::prefix('v1')->group(function () {

    // =========================================================================
    // 01. AUTHENTICATION & PASSWORD RECOVERY (RATE-LIMITED)
    // =========================================================================
    Route::prefix('auth')->group(function () {
        // Login throttled to 5 attempts per minute per IP + email
        Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');

        // Forgot password throttled to 3 attempts per 15 minutes
        Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:password-reset');

        // Reset password with token
        Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('throttle:password-reset');

        // Authenticated Auth Endpoints
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/me', [AuthController::class, 'me']);
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::put('/profile', [AuthController::class, 'updateProfile']);
            Route::put('/password', [AuthController::class, 'updatePassword']);
        });
    });

    // =========================================================================
    // 02. PUBLIC CONTENT ENDPOINTS (DYNAMIC DATA CONSUMED BY FRONTEND)
    // =========================================================================
    Route::middleware('throttle:api')->group(function () {
        Route::get('/services', [PublicContentController::class, 'services']);
        Route::get('/services/{slug}', [PublicContentController::class, 'serviceBySlug']);

        Route::get('/projects', [PublicContentController::class, 'projects']);
        Route::get('/projects/{slug}', [PublicContentController::class, 'projectBySlug']);

        Route::get('/team', [PublicContentController::class, 'team']);
        Route::get('/team/leadership', [PublicContentController::class, 'leadership']);

        Route::get('/clients', [PublicContentController::class, 'clients']);

        Route::get('/insights', [PublicContentController::class, 'insights']);
        Route::get('/insights/{slug}', [PublicContentController::class, 'insightBySlug']);

        Route::get('/gallery/photos', [PublicContentController::class, 'photoGallery']);
        Route::get('/gallery/videos', [PublicContentController::class, 'videoGallery']);

        Route::get('/careers', [CareerController::class, 'index']);
        Route::get('/careers/{slug}', [CareerController::class, 'show']);
        Route::post('/careers/apply', [CareerController::class, 'apply'])->middleware('throttle:15,1');

        Route::get('/media', [PublicContentController::class, 'media']);
        Route::get('/settings', [PublicContentController::class, 'settings']);
        Route::get('/menus', [PublicContentController::class, 'menus']);
        Route::get('/pages/{slug}', [PublicContentController::class, 'pageSections']);

        // Public Lead & Newsletter Submissions (Throttled)
        Route::post('/contact', [PublicContentController::class, 'submitInquiry'])->middleware('throttle:contact-form');
        Route::post('/newsletter/subscribe', [PublicContentController::class, 'subscribeNewsletter'])->middleware('throttle:contact-form');
    });

    // =========================================================================
    // 03. PROTECTED ADMIN PORTAL ENDPOINTS (SANCTUM + RBAC)
    // =========================================================================
    Route::prefix('admin')->middleware(['auth:sanctum', 'throttle:120,1'])->group(function () {

        // KPI Dashboard Stats (Accessible by all staff roles)
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

        // --- Inquiries & Leads Management (superadmin, admin, moderator) ---
        Route::middleware('role:superadmin,admin,moderator')->group(function () {
            Route::get('/inquiries', [AdminContentController::class, 'getInquiries']);
            Route::put('/inquiries/{id}', [AdminContentController::class, 'updateInquiryStatus']);
            Route::delete('/inquiries/{id}', [AdminContentController::class, 'deleteInquiry']);
        });

        // --- Services Management (superadmin, admin, moderator, content_writer) ---
        Route::get('/services', [AdminContentController::class, 'getServices']);
        Route::middleware('role:superadmin,admin,content_writer')->group(function () {
            Route::post('/services', [AdminContentController::class, 'storeService']);
            Route::put('/services/{id}', [AdminContentController::class, 'updateService']);
        });
        Route::delete('/services/{id}', [AdminContentController::class, 'deleteService'])->middleware('role:superadmin,admin');

        // --- Projects / Case Studies Management ---
        Route::get('/projects', [AdminContentController::class, 'getProjects']);
        Route::middleware('role:superadmin,admin,content_writer')->group(function () {
            Route::post('/projects', [AdminContentController::class, 'storeProject']);
            Route::put('/projects/{id}', [AdminContentController::class, 'updateProject']);
        });
        Route::delete('/projects/{id}', [AdminContentController::class, 'deleteProject'])->middleware('role:superadmin,admin');

        // --- Insights / Articles Management ---
        Route::get('/insights', [AdminContentController::class, 'getInsights']);
        Route::middleware('role:superadmin,admin,content_writer')->group(function () {
            Route::post('/insights', [AdminContentController::class, 'storeInsight']);
            Route::put('/insights/{id}', [AdminContentController::class, 'updateInsight']);
        });
        Route::delete('/insights/{id}', [AdminContentController::class, 'deleteInsight'])->middleware('role:superadmin,admin');

        // --- Gallery Management ---
        Route::get('/gallery', [AdminContentController::class, 'getGallery']);
        Route::middleware('role:superadmin,admin,content_writer')->group(function () {
            Route::post('/gallery/photos', [AdminContentController::class, 'storePhoto']);
            Route::delete('/gallery/photos/{id}', [AdminContentController::class, 'deletePhoto']);
            Route::post('/gallery/videos', [AdminContentController::class, 'storeVideo']);
            Route::delete('/gallery/videos/{id}', [AdminContentController::class, 'deleteVideo']);
        });

        // --- Team Management ---
        Route::get('/team', [AdminContentController::class, 'getTeam']);
        Route::middleware('role:superadmin,admin,content_writer')->group(function () {
            Route::post('/team', [AdminContentController::class, 'storeTeam']);
            Route::put('/team/{id}', [AdminContentController::class, 'updateTeam']);
        });
        Route::delete('/team/{id}', [AdminContentController::class, 'deleteTeam'])->middleware('role:superadmin,admin');

        // --- Clients Management ---
        Route::get('/clients', [AdminContentController::class, 'getClients']);
        Route::middleware('role:superadmin,admin,content_writer')->group(function () {
            Route::post('/clients', [AdminContentController::class, 'storeClient']);
            Route::put('/clients/{id}', [AdminContentController::class, 'updateClient']);
        });
        Route::delete('/clients/{id}', [AdminContentController::class, 'deleteClient'])->middleware('role:superadmin,admin');

        // --- Media Library (Upload, Browse, Delete) ---
        Route::get('/media-assets', [MediaController::class, 'index']);
        Route::post('/media-assets/upload', [MediaController::class, 'upload'])->middleware('role:superadmin,admin,content_writer');
        Route::put('/media-assets/{id}', [MediaController::class, 'update'])->middleware('role:superadmin,admin,content_writer');
        Route::delete('/media-assets/{id}', [MediaController::class, 'destroy'])->middleware('role:superadmin,admin');

        // --- Dynamic Navigation Menu Management ---
        Route::get('/menus', [PageAndMenuController::class, 'getMenus']);
        Route::middleware('role:superadmin,admin')->group(function () {
            Route::post('/menus', [PageAndMenuController::class, 'storeMenu']);
            Route::put('/menus/{id}', [PageAndMenuController::class, 'updateMenu']);
            Route::delete('/menus/{id}', [PageAndMenuController::class, 'deleteMenu']);
            Route::post('/menus/reorder', [PageAndMenuController::class, 'reorderMenus']);
        });

        // --- Dynamic Page Sections Management ---
        Route::get('/pages', [PageAndMenuController::class, 'getPages']);
        Route::get('/pages/{slug}/sections', [PageAndMenuController::class, 'getPageSections']);
        Route::put('/pages/{slug}/sections/{sectionKey}', [PageAndMenuController::class, 'updatePageSection'])->middleware('role:superadmin,admin,content_writer');

        // --- Careers & Job Openings Management ---
        Route::get('/careers', [CareerController::class, 'adminIndex']);
        Route::middleware('role:superadmin,admin,content_writer')->group(function () {
            Route::post('/careers', [CareerController::class, 'adminStore']);
            Route::put('/careers/{id}', [CareerController::class, 'adminUpdate']);
        });
        Route::delete('/careers/{id}', [CareerController::class, 'adminDestroy'])->middleware('role:superadmin,admin');

        // --- Job Applications Review (superadmin, admin, moderator) ---
        Route::middleware('role:superadmin,admin,moderator')->group(function () {
            Route::get('/job-applications', [CareerController::class, 'applications']);
            Route::put('/job-applications/{id}', [CareerController::class, 'updateApplicationStatus']);
            Route::delete('/job-applications/{id}', [CareerController::class, 'destroyApplication']);
        });

        // --- Site Settings (superadmin, admin) ---
        Route::get('/settings', [AdminContentController::class, 'getSettings']);
        Route::put('/settings', [AdminContentController::class, 'updateSettings'])->middleware('role:superadmin,admin');

        // --- User & RBAC Roles Management (SUPERADMIN ONLY) ---
        Route::middleware('role:superadmin')->group(function () {
            Route::get('/users', [AdminContentController::class, 'getUsers']);
            Route::post('/users', [AdminContentController::class, 'storeUser']);
            Route::put('/users/{id}', [AdminContentController::class, 'updateUser']);
            Route::delete('/users/{id}', [AdminContentController::class, 'deleteUser']);
        });
    });
});

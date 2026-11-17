<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Client;
use App\Models\GalleryPhoto;
use App\Models\GalleryVideo;
use App\Models\Inquiry;
use App\Models\Insight;
use App\Models\NewsletterSubscriber;
use App\Models\Project;
use App\Models\Role;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminContentController extends Controller
{
    // =========================================================================
    // 01. INQUIRIES & LEADS MANAGEMENT
    // =========================================================================
    public function getInquiries(Request $request): JsonResponse
    {
        $query = Inquiry::query()->latest();

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && !empty($request->search)) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                    ->orWhere('email', 'like', "%{$s}%")
                    ->orWhere('organization', 'like', "%{$s}%")
                    ->orWhere('phone', 'like', "%{$s}%");
            });
        }

        return response()->json([
            'success' => true,
            'data' => $query->paginate(20),
        ]);
    }

    public function updateInquiryStatus(Request $request, int $id): JsonResponse
    {
        $inquiry = Inquiry::findOrFail($id);

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,in_review,contacted,closed'],
            'admin_notes' => ['nullable', 'string'],
        ]);

        $inquiry->update($validated);

        ActivityLog::log('updated', 'inquiries', (string) $inquiry->id, ['status' => $inquiry->status]);

        return response()->json([
            'success' => true,
            'message' => 'Inquiry updated successfully.',
            'data' => $inquiry,
        ]);
    }

    public function deleteInquiry(int $id): JsonResponse
    {
        $inquiry = Inquiry::findOrFail($id);
        $inquiry->delete();

        ActivityLog::log('deleted', 'inquiries', (string) $id);

        return response()->json([
            'success' => true,
            'message' => 'Inquiry removed successfully.',
        ]);
    }

    // =========================================================================
    // 02. SERVICES CRUD
    // =========================================================================
    public function getServices(): JsonResponse
    {
        $services = Service::with('capabilities')->orderBy('sort_order')->get();
        return response()->json(['success' => true, 'data' => $services]);
    }

    public function storeService(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'unique:services,slug'],
            'title_en' => ['required', 'string'],
            'title_bn' => ['required', 'string'],
            'short_desc_en' => ['required', 'string'],
            'short_desc_bn' => ['required', 'string'],
            'desc_en' => ['nullable', 'string'],
            'desc_bn' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
            'stat_number' => ['nullable', 'string'],
            'stat_label_en' => ['nullable', 'string'],
            'stat_label_bn' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer'],
        ]);

        $service = Service::create($validated);
        ActivityLog::log('created', 'services', (string) $service->id, ['title' => $service->title_en]);

        return response()->json(['success' => true, 'message' => 'Service created successfully.', 'data' => $service], 201);
    }

    public function updateService(Request $request, int $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'slug' => ['required', 'string', 'unique:services,slug,' . $id],
            'title_en' => ['required', 'string'],
            'title_bn' => ['required', 'string'],
            'short_desc_en' => ['required', 'string'],
            'short_desc_bn' => ['required', 'string'],
            'desc_en' => ['nullable', 'string'],
            'desc_bn' => ['nullable', 'string'],
            'icon' => ['nullable', 'string'],
            'stat_number' => ['nullable', 'string'],
            'stat_label_en' => ['nullable', 'string'],
            'stat_label_bn' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer'],
        ]);

        $service->update($validated);
        ActivityLog::log('updated', 'services', (string) $service->id, ['title' => $service->title_en]);

        return response()->json(['success' => true, 'message' => 'Service updated successfully.', 'data' => $service]);
    }

    public function deleteService(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $service->delete();

        ActivityLog::log('deleted', 'services', (string) $id);

        return response()->json(['success' => true, 'message' => 'Service deleted successfully.']);
    }

    // =========================================================================
    // 03. CASE STUDIES / PROJECTS CRUD
    // =========================================================================
    public function getProjects(): JsonResponse
    {
        $projects = Project::orderBy('sort_order')->get();
        return response()->json(['success' => true, 'data' => $projects]);
    }

    public function storeProject(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'unique:projects,slug'],
            'title_en' => ['required', 'string'],
            'title_bn' => ['required', 'string'],
            'client_name' => ['required', 'string'],
            'industry' => ['required', 'string'],
            'year' => ['required', 'string'],
            'overview_en' => ['required', 'string'],
            'overview_bn' => ['required', 'string'],
            'challenge_en' => ['nullable', 'string'],
            'challenge_bn' => ['nullable', 'string'],
            'solution_en' => ['nullable', 'string'],
            'solution_bn' => ['nullable', 'string'],
            'impact_en' => ['nullable', 'string'],
            'impact_bn' => ['nullable', 'string'],
            'stat_number' => ['nullable', 'string'],
            'stat_label_en' => ['nullable', 'string'],
            'stat_label_bn' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string'],
            'is_featured' => ['boolean'],
            'is_published' => ['boolean'],
        ]);

        $project = Project::create($validated);
        ActivityLog::log('created', 'projects', (string) $project->id, ['title' => $project->title_en]);

        return response()->json(['success' => true, 'message' => 'Project created successfully.', 'data' => $project], 201);
    }

    public function updateProject(Request $request, int $id): JsonResponse
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'slug' => ['required', 'string', 'unique:projects,slug,' . $id],
            'title_en' => ['required', 'string'],
            'title_bn' => ['required', 'string'],
            'client_name' => ['required', 'string'],
            'industry' => ['required', 'string'],
            'year' => ['required', 'string'],
            'overview_en' => ['required', 'string'],
            'overview_bn' => ['required', 'string'],
            'challenge_en' => ['nullable', 'string'],
            'challenge_bn' => ['nullable', 'string'],
            'solution_en' => ['nullable', 'string'],
            'solution_bn' => ['nullable', 'string'],
            'impact_en' => ['nullable', 'string'],
            'impact_bn' => ['nullable', 'string'],
            'stat_number' => ['nullable', 'string'],
            'stat_label_en' => ['nullable', 'string'],
            'stat_label_bn' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string'],
            'is_featured' => ['boolean'],
            'is_published' => ['boolean'],
        ]);

        $project->update($validated);
        ActivityLog::log('updated', 'projects', (string) $project->id, ['title' => $project->title_en]);

        return response()->json(['success' => true, 'message' => 'Project updated successfully.', 'data' => $project]);
    }

    public function deleteProject(int $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $project->delete();

        ActivityLog::log('deleted', 'projects', (string) $id);

        return response()->json(['success' => true, 'message' => 'Project deleted successfully.']);
    }

    // =========================================================================
    // 04. INSIGHTS / ARTICLES CRUD
    // =========================================================================
    public function getInsights(): JsonResponse
    {
        $insights = Insight::latest()->get();
        return response()->json(['success' => true, 'data' => $insights]);
    }

    public function storeInsight(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'unique:insights,slug'],
            'title_en' => ['required', 'string'],
            'title_bn' => ['required', 'string'],
            'category' => ['required', 'string'],
            'author_en' => ['nullable', 'string'],
            'author_bn' => ['nullable', 'string'],
            'excerpt_en' => ['required', 'string'],
            'excerpt_bn' => ['required', 'string'],
            'content_en' => ['required', 'string'],
            'content_bn' => ['required', 'string'],
            'featured_image' => ['nullable', 'string'],
            'read_time' => ['nullable', 'string'],
            'is_featured' => ['boolean'],
            'status' => ['required', 'in:draft,published'],
        ]);

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $insight = Insight::create($validated);
        ActivityLog::log('created', 'insights', (string) $insight->id, ['title' => $insight->title_en]);

        return response()->json(['success' => true, 'message' => 'Article created successfully.', 'data' => $insight], 201);
    }

    public function updateInsight(Request $request, int $id): JsonResponse
    {
        $insight = Insight::findOrFail($id);

        $validated = $request->validate([
            'slug' => ['required', 'string', 'unique:insights,slug,' . $id],
            'title_en' => ['required', 'string'],
            'title_bn' => ['required', 'string'],
            'category' => ['required', 'string'],
            'author_en' => ['nullable', 'string'],
            'author_bn' => ['nullable', 'string'],
            'excerpt_en' => ['required', 'string'],
            'excerpt_bn' => ['required', 'string'],
            'content_en' => ['required', 'string'],
            'content_bn' => ['required', 'string'],
            'featured_image' => ['nullable', 'string'],
            'read_time' => ['nullable', 'string'],
            'is_featured' => ['boolean'],
            'status' => ['required', 'in:draft,published'],
        ]);

        if ($validated['status'] === 'published' && !$insight->published_at) {
            $validated['published_at'] = now();
        }

        $insight->update($validated);
        ActivityLog::log('updated', 'insights', (string) $insight->id, ['title' => $insight->title_en]);

        return response()->json(['success' => true, 'message' => 'Article updated successfully.', 'data' => $insight]);
    }

    public function deleteInsight(int $id): JsonResponse
    {
        $insight = Insight::findOrFail($id);
        $insight->delete();

        ActivityLog::log('deleted', 'insights', (string) $id);

        return response()->json(['success' => true, 'message' => 'Article deleted successfully.']);
    }

    // =========================================================================
    // 05. GALLERY (PHOTOS & VIDEOS) CRUD
    // =========================================================================
    public function getGallery(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'photos' => GalleryPhoto::orderBy('sort_order')->get(),
            'videos' => GalleryVideo::orderBy('sort_order')->get(),
        ]);
    }

    public function storePhoto(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title_en' => ['required', 'string'],
            'title_bn' => ['required', 'string'],
            'category_key' => ['required', 'string'],
            'category_en' => ['required', 'string'],
            'category_bn' => ['required', 'string'],
            'image_url' => ['required', 'string'],
            'event_date' => ['nullable', 'string'],
            'location_en' => ['nullable', 'string'],
            'location_bn' => ['nullable', 'string'],
            'client_name' => ['nullable', 'string'],
            'desc_en' => ['nullable', 'string'],
            'desc_bn' => ['nullable', 'string'],
        ]);

        $photo = GalleryPhoto::create($validated);
        ActivityLog::log('created', 'gallery_photo', (string) $photo->id);

        return response()->json(['success' => true, 'message' => 'Photo added successfully.', 'data' => $photo], 201);
    }

    public function deletePhoto(int $id): JsonResponse
    {
        $photo = GalleryPhoto::findOrFail($id);
        $photo->delete();
        ActivityLog::log('deleted', 'gallery_photo', (string) $id);

        return response()->json(['success' => true, 'message' => 'Photo removed successfully.']);
    }

    public function storeVideo(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title_en' => ['required', 'string'],
            'title_bn' => ['required', 'string'],
            'category_key' => ['required', 'string'],
            'category_en' => ['required', 'string'],
            'category_bn' => ['required', 'string'],
            'youtube_id' => ['required', 'string'],
            'duration' => ['nullable', 'string'],
            'views' => ['nullable', 'string'],
            'release_date' => ['nullable', 'string'],
            'client_name' => ['nullable', 'string'],
            'desc_en' => ['nullable', 'string'],
            'desc_bn' => ['nullable', 'string'],
            'is_featured' => ['boolean'],
        ]);

        $video = GalleryVideo::create($validated);
        ActivityLog::log('created', 'gallery_video', (string) $video->id);

        return response()->json(['success' => true, 'message' => 'Video added successfully.', 'data' => $video], 201);
    }

    public function deleteVideo(int $id): JsonResponse
    {
        $video = GalleryVideo::findOrFail($id);
        $video->delete();
        ActivityLog::log('deleted', 'gallery_video', (string) $id);

        return response()->json(['success' => true, 'message' => 'Video removed successfully.']);
    }

    // =========================================================================
    // 06. USER & RBAC ROLE MANAGEMENT (SUPERADMIN ONLY)
    // =========================================================================
    public function getUsers(): JsonResponse
    {
        $users = User::with('roles')->get();
        $roles = Role::all();

        return response()->json([
            'success' => true,
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function storeUser(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'roles' => ['required', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => strtolower($validated['email']),
            'password' => Hash::make($validated['password']),
        ]);

        $roleIds = Role::whereIn('name', $validated['roles'])->pluck('id');
        $user->roles()->sync($roleIds);

        ActivityLog::log('created', 'users', (string) $user->id, ['roles' => $validated['roles']]);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully.',
            'data' => $user->load('roles'),
        ], 201);
    }

    public function updateUser(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email,' . $id],
            'password' => ['nullable', 'string', 'min:8'],
            'roles' => ['required', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => strtolower($validated['email']),
            ...($validated['password'] ? ['password' => Hash::make($validated['password'])] : []),
        ]);

        $roleIds = Role::whereIn('name', $validated['roles'])->pluck('id');
        $user->roles()->sync($roleIds);

        ActivityLog::log('updated', 'users', (string) $user->id, ['roles' => $validated['roles']]);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully.',
            'data' => $user->load('roles'),
        ]);
    }

    public function deleteUser(int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        // Prevent self deletion
        if ($user->id === auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot delete your own administrative account.',
            ], 422);
        }

        $user->roles()->detach();
        $user->tokens()->delete();
        $user->delete();

        ActivityLog::log('deleted', 'users', (string) $id);

        return response()->json(['success' => true, 'message' => 'User deleted successfully.']);
    }

    // =========================================================================
    // 07. SITE SETTINGS MANAGEMENT
    // =========================================================================
    public function getSettings(): JsonResponse
    {
        $settings = SiteSetting::all();
        return response()->json(['success' => true, 'data' => $settings]);
    }

    public function updateSettings(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'settings' => ['required', 'array'],
        ]);

        foreach ($validated['settings'] as $key => $value) {
            SiteSetting::set($key, $value);
        }

        ActivityLog::log('updated', 'settings');

        return response()->json([
            'success' => true,
            'message' => 'Site settings saved successfully.',
        ]);
    }
}

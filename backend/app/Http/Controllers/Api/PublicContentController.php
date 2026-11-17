<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\GalleryPhoto;
use App\Models\GalleryVideo;
use App\Models\Inquiry;
use App\Models\Insight;
use App\Models\MediaItem;
use App\Models\MenuItem;
use App\Models\NewsletterSubscriber;
use App\Models\PageSection;
use App\Models\Project;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicContentController extends Controller
{
    /**
     * Get all active services.
     */
    public function services(): JsonResponse
    {
        $services = Service::with('capabilities')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services,
        ]);
    }

    /**
     * Get single service by slug.
     */
    public function serviceBySlug(string $slug): JsonResponse
    {
        $service = Service::with('capabilities')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service,
        ]);
    }

    /**
     * Get all case studies / projects.
     */
    public function projects(): JsonResponse
    {
        $projects = Project::where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    /**
     * Get single project by slug.
     */
    public function projectBySlug(string $slug): JsonResponse
    {
        $project = Project::where('slug', $slug)
            ->where('is_published', true)
            ->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $project,
        ]);
    }

    /**
     * Get team members.
     */
    public function team(): JsonResponse
    {
        $team = TeamMember::orderBy('sort_order')->get();

        return response()->json([
            'success' => true,
            'data' => $team,
        ]);
    }

    /**
     * Get leadership team.
     */
    public function leadership(): JsonResponse
    {
        $leadership = TeamMember::where('is_leadership', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $leadership,
        ]);
    }

    /**
     * Get clients & testimonials.
     */
    public function clients(): JsonResponse
    {
        $clients = Client::with('testimonials')
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $clients,
        ]);
    }

    /**
     * Get published articles / insights.
     */
    public function insights(): JsonResponse
    {
        $insights = Insight::where('status', 'published')
            ->latest('published_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $insights,
        ]);
    }

    /**
     * Get single insight by slug.
     */
    public function insightBySlug(string $slug): JsonResponse
    {
        $insight = Insight::where('slug', $slug)
            ->where('status', 'published')
            ->first();

        if (!$insight) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $insight,
        ]);
    }

    /**
     * Get photo gallery.
     */
    public function photoGallery(Request $request): JsonResponse
    {
        $query = GalleryPhoto::query()->orderBy('sort_order');

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category_key', $request->category);
        }

        return response()->json([
            'success' => true,
            'data' => $query->get(),
        ]);
    }

    /**
     * Get video gallery.
     */
    public function videoGallery(Request $request): JsonResponse
    {
        $query = GalleryVideo::query()->orderBy('sort_order');

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category_key', $request->category);
        }

        return response()->json([
            'success' => true,
            'data' => $query->get(),
        ]);
    }

    /**
     * Get media coverage & press mentions.
     */
    public function media(): JsonResponse
    {
        $media = MediaItem::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $media,
        ]);
    }

    /**
     * Get public site settings.
     */
    public function settings(): JsonResponse
    {
        $settings = SiteSetting::all()->pluck('value', 'key');

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * Submit Contact Inquiry / Consultation Request (Rate Limited).
     */
    public function submitInquiry(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'organization' => ['nullable', 'string', 'max:255'],
            'service_interest' => ['nullable', 'string', 'max:150'],
            'budget_range' => ['nullable', 'string', 'max:100'],
            'message' => ['required', 'string', 'max:5000'],
            'source' => ['nullable', 'string', 'max:50'],
        ]);

        $inquiry = Inquiry::create([
            ...$validated,
            'source' => $validated['source'] ?? 'contact_form',
            'status' => 'pending',
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you for contacting Berlo Communications. Our executive advisory team will respond within 24 hours.',
            'id' => $inquiry->id,
        ], 201);
    }

    /**
     * Subscribe to Corporate Newsletter (Rate Limited).
     */
    public function subscribeNewsletter(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'locale' => ['nullable', 'string', 'in:en,bn'],
            'source' => ['nullable', 'string', 'max:50'],
        ]);

        $subscriber = NewsletterSubscriber::updateOrCreate(
            ['email' => strtolower($validated['email'])],
            [
                'locale' => $validated['locale'] ?? 'en',
                'source' => $validated['source'] ?? 'website_footer',
                'is_active' => true,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Successfully subscribed to the Berlo Executive PR Briefing.',
        ]);
    }

    /**
     * Get dynamic navigation menus.
     */
    public function menus(Request $request): JsonResponse
    {
        $location = $request->query('location');
        $query = MenuItem::with(['children' => function ($q) {
            $q->where('is_active', true)->orderBy('order');
        }])
        ->whereNull('parent_id')
        ->where('is_active', true)
        ->orderBy('order');

        if ($location) {
            $query->where('location', $location);
        }

        $items = $query->get();

        // Also group by location for single-request consumption
        $grouped = MenuItem::with(['children' => function ($q) {
            $q->where('is_active', true)->orderBy('order');
        }])
        ->whereNull('parent_id')
        ->where('is_active', true)
        ->orderBy('order')
        ->get()
        ->groupBy('location');

        return response()->json([
            'success' => true,
            'data' => $items,
            'grouped' => $grouped,
        ]);
    }

    /**
     * Get dynamic sections for a specific page.
     */
    public function pageSections(string $slug): JsonResponse
    {
        $sections = PageSection::where('page_slug', $slug)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        $keyed = $sections->keyBy('section_key');

        return response()->json([
            'success' => true,
            'page' => $slug,
            'sections' => $sections,
            'data' => $keyed,
        ]);
    }
}

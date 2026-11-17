<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CareerController extends Controller
{
    // =========================================================================
    // PUBLIC API ENDPOINTS
    // =========================================================================

    public function index(Request $request): JsonResponse
    {
        $query = JobPosting::where('is_active', true);

        if ($request->filled('department')) {
            $query->where('department_en', $request->department);
        }

        if ($request->filled('employment_type')) {
            $query->where('employment_type', $request->employment_type);
        }

        if ($request->filled('workplace_type')) {
            $query->where('workplace_type', $request->workplace_type);
        }

        $jobs = $query->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $jobs,
            'departments' => JobPosting::where('is_active', true)->distinct()->pluck('department_en')->filter()->values(),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $job = JobPosting::where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$job) {
            return response()->json([
                'success' => false,
                'message' => 'The requested career opportunity was not found or is no longer accepting applications.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $job,
        ]);
    }

    public function apply(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'job_posting_id' => ['nullable', 'exists:job_postings,id'],
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'phone' => ['required', 'string', 'max:30'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'portfolio_url' => ['nullable', 'url', 'max:255'],
            'cover_letter' => ['nullable', 'string', 'max:5000'],
            'resume_url' => ['nullable', 'url', 'max:500'],
            'resume' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'], // 10MB max
        ]);

        $resumePath = null;
        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $fileName = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            $resumePath = $file->storeAs('resumes', $fileName, 'public');
        }

        $application = JobApplication::create([
            'job_posting_id' => $validated['job_posting_id'] ?? null,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'linkedin_url' => $validated['linkedin_url'] ?? null,
            'portfolio_url' => $validated['portfolio_url'] ?? null,
            'cover_letter' => $validated['cover_letter'] ?? null,
            'resume_url' => $validated['resume_url'] ?? ($resumePath ? Storage::disk('public')->url($resumePath) : null),
            'resume_path' => $resumePath,
            'status' => 'pending',
            'ip_address' => $request->ip(),
        ]);

        ActivityLog::log('created', 'job_application', (string) $application->id, ['description' => "Application received from {$application->name}"]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your application! Our executive talent acquisitions desk will review your profile.',
            'data' => $application,
        ], 201);
    }

    // =========================================================================
    // ADMIN RBAC ENDPOINTS
    // =========================================================================

    public function adminIndex(): JsonResponse
    {
        $jobs = JobPosting::withCount('applications')
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $jobs,
        ]);
    }

    public function adminStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title_en' => ['required', 'string', 'max:255'],
            'title_bn' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:job_postings,slug'],
            'department_en' => ['required', 'string', 'max:100'],
            'department_bn' => ['required', 'string', 'max:100'],
            'employment_type' => ['required', 'string', 'in:full_time,part_time,contract,internship'],
            'workplace_type' => ['required', 'string', 'in:on_site,hybrid,remote'],
            'location_en' => ['nullable', 'string', 'max:200'],
            'location_bn' => ['nullable', 'string', 'max:200'],
            'experience_level_en' => ['nullable', 'string', 'max:100'],
            'experience_level_bn' => ['nullable', 'string', 'max:100'],
            'salary_range_en' => ['nullable', 'string', 'max:100'],
            'salary_range_bn' => ['nullable', 'string', 'max:100'],
            'short_desc_en' => ['nullable', 'string'],
            'short_desc_bn' => ['nullable', 'string'],
            'overview_en' => ['nullable', 'string'],
            'overview_bn' => ['nullable', 'string'],
            'responsibilities_en' => ['nullable', 'array'],
            'responsibilities_bn' => ['nullable', 'array'],
            'requirements_en' => ['nullable', 'array'],
            'requirements_bn' => ['nullable', 'array'],
            'benefits_en' => ['nullable', 'array'],
            'benefits_bn' => ['nullable', 'array'],
            'deadline' => ['nullable', 'date'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer'],
        ]);

        $job = JobPosting::create($validated);
        ActivityLog::log('created', 'job_posting', (string) $job->id, ['title' => $job->title_en]);

        return response()->json([
            'success' => true,
            'message' => 'Job opening created successfully.',
            'data' => $job,
        ], 201);
    }

    public function adminUpdate(Request $request, int $id): JsonResponse
    {
        $job = JobPosting::findOrFail($id);

        $validated = $request->validate([
            'title_en' => ['required', 'string', 'max:255'],
            'title_bn' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:job_postings,slug,' . $id],
            'department_en' => ['required', 'string', 'max:100'],
            'department_bn' => ['required', 'string', 'max:100'],
            'employment_type' => ['required', 'string', 'in:full_time,part_time,contract,internship'],
            'workplace_type' => ['required', 'string', 'in:on_site,hybrid,remote'],
            'location_en' => ['nullable', 'string', 'max:200'],
            'location_bn' => ['nullable', 'string', 'max:200'],
            'experience_level_en' => ['nullable', 'string', 'max:100'],
            'experience_level_bn' => ['nullable', 'string', 'max:100'],
            'salary_range_en' => ['nullable', 'string', 'max:100'],
            'salary_range_bn' => ['nullable', 'string', 'max:100'],
            'short_desc_en' => ['nullable', 'string'],
            'short_desc_bn' => ['nullable', 'string'],
            'overview_en' => ['nullable', 'string'],
            'overview_bn' => ['nullable', 'string'],
            'responsibilities_en' => ['nullable', 'array'],
            'responsibilities_bn' => ['nullable', 'array'],
            'requirements_en' => ['nullable', 'array'],
            'requirements_bn' => ['nullable', 'array'],
            'benefits_en' => ['nullable', 'array'],
            'benefits_bn' => ['nullable', 'array'],
            'deadline' => ['nullable', 'date'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer'],
        ]);

        $job->update($validated);
        ActivityLog::log('updated', 'job_posting', (string) $job->id, ['title' => $job->title_en]);

        return response()->json([
            'success' => true,
            'message' => 'Job opening updated successfully.',
            'data' => $job,
        ]);
    }

    public function adminDestroy(int $id): JsonResponse
    {
        $job = JobPosting::findOrFail($id);
        $title = $job->title_en;
        $job->delete();

        ActivityLog::log('deleted', 'job_posting', (string) $id, ['title' => $title]);

        return response()->json([
            'success' => true,
            'message' => 'Job opening deleted successfully.',
        ]);
    }

    // --- Job Applications Management ---

    public function applications(Request $request): JsonResponse
    {
        $query = JobApplication::with('jobPosting');

        if ($request->filled('job_id')) {
            $query->where('job_posting_id', $request->job_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $applications = $query->orderBy('created_at', 'desc')->paginate(25);

        return response()->json([
            'success' => true,
            'data' => $applications->items(),
            'total' => $applications->total(),
            'current_page' => $applications->currentPage(),
            'last_page' => $applications->lastPage(),
        ]);
    }

    public function updateApplicationStatus(Request $request, int $id): JsonResponse
    {
        $app = JobApplication::findOrFail($id);

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,reviewed,shortlisted,rejected,hired'],
            'admin_notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $app->update($validated);
        ActivityLog::log('updated', 'job_application', (string) $id, ['status' => $validated['status']]);

        return response()->json([
            'success' => true,
            'message' => 'Applicant status updated successfully.',
            'data' => $app,
        ]);
    }

    public function destroyApplication(int $id): JsonResponse
    {
        $app = JobApplication::findOrFail($id);
        $name = $app->name;

        if ($app->resume_path && Storage::disk('public')->exists($app->resume_path)) {
            Storage::disk('public')->delete($app->resume_path);
        }

        $app->delete();
        ActivityLog::log('deleted', 'job_application', (string) $id, ['name' => $name]);

        return response()->json([
            'success' => true,
            'message' => 'Application removed successfully.',
        ]);
    }
}

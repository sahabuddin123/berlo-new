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
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get Overall Admin Dashboard Statistics and KPIs.
     */
    public function stats(Request $request): JsonResponse
    {
        $stats = [
            'inquiries' => [
                'total' => Inquiry::count(),
                'pending' => Inquiry::where('status', 'pending')->count(),
                'in_review' => Inquiry::where('status', 'in_review')->count(),
                'contacted' => Inquiry::where('status', 'contacted')->count(),
                'closed' => Inquiry::where('status', 'closed')->count(),
            ],
            'subscribers' => [
                'total' => NewsletterSubscriber::where('is_active', true)->count(),
            ],
            'content' => [
                'services' => Service::count(),
                'projects' => Project::count(),
                'articles' => Insight::count(),
                'team' => TeamMember::count(),
                'clients' => Client::count(),
                'photos' => GalleryPhoto::count(),
                'videos' => GalleryVideo::count(),
            ],
            'users' => [
                'total' => User::count(),
            ],
        ];

        // Recent 5 leads
        $recentInquiries = Inquiry::latest()->take(5)->get();

        // Recent 8 activity logs
        $recentLogs = ActivityLog::with('user:id,name,email')
            ->latest()
            ->take(8)
            ->get();

        return response()->json([
            'success' => true,
            'stats' => $stats,
            'recent_inquiries' => $recentInquiries,
            'recent_activity' => $recentLogs,
        ]);
    }
}

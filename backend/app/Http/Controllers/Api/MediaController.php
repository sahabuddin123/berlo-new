<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MediaAsset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    /**
     * Get paginated media assets.
     */
    public function index(Request $request): JsonResponse
    {
        $query = MediaAsset::query()->latest();

        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('file_name', 'like', "%{$search}%")
                  ->orWhere('alt_text', 'like', "%{$search}%");
            });
        }

        if ($request->filled('folder') && $request->query('folder') !== 'all') {
            $query->where('folder', $request->query('folder'));
        }

        if ($request->filled('type') && $request->query('type') !== 'all') {
            $type = $request->query('type');
            if ($type === 'image') {
                $query->where('mime_type', 'like', 'image/%');
            } elseif ($type === 'video') {
                $query->where('mime_type', 'like', 'video/%');
            } elseif ($type === 'document') {
                $query->where('mime_type', 'like', 'application/%');
            }
        }

        $assets = $query->paginate(24);

        // Also fetch available folders
        $folders = MediaAsset::select('folder')
            ->distinct()
            ->pluck('folder')
            ->values();

        return response()->json([
            'success' => true,
            'data' => $assets,
            'folders' => $folders,
        ]);
    }

    /**
     * Upload one or multiple files to media library.
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file' => [
                'required',
                'file',
                'max:25600', // 25MB max
                'mimes:jpg,jpeg,png,webp,svg,gif,mp4,webm,pdf',
            ],
            'folder' => ['nullable', 'string', 'max:50'],
            'alt_text' => ['nullable', 'string', 'max:255'],
        ]);

        $file = $request->file('file');
        
        // 1. Strict Extension Allowlist
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif', 'mp4', 'webm', 'pdf'];
        $extension = strtolower($file->getClientOriginalExtension());
        if (!in_array($extension, $allowedExtensions)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid file extension. Prohibited file type.',
            ], 422);
        }

        // 2. Strict SVG Content Inspection (Prevent Stored XSS via SVG scripts/events)
        if ($extension === 'svg') {
            $svgContent = file_get_contents($file->getRealPath());
            if (preg_match('/<script|javascript:|onload=|onerror=|onclick=|<iframe|<foreignObject/i', $svgContent)) {
                return response()->json([
                    'success' => false,
                    'message' => 'SVG file contains prohibited scripts or executable attributes.',
                ], 422);
            }
        }

        // 3. Strict Folder Sanitization against Directory Traversal (Alphanumeric only)
        $folder = Str::slug($request->input('folder', 'general')) ?: 'general';

        // 4. Create and verify upload destination strictly within public/uploads
        $uploadsRoot = public_path('uploads');
        if (!File::isDirectory($uploadsRoot)) {
            File::makeDirectory($uploadsRoot, 0755, true, true);
        }

        $destinationPath = public_path("uploads/{$folder}");
        if (!File::isDirectory($destinationPath)) {
            File::makeDirectory($destinationPath, 0755, true, true);
        }

        // Canonical directory traversal check
        $realUploads = realpath($uploadsRoot);
        $realDest = realpath($destinationPath);
        if (!$realDest || !str_starts_with($realDest, $realUploads)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid upload destination path.',
            ], 403);
        }

        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFileName = Str::slug($originalName) . '-' . time() . '.' . $extension;

        $file->move($destinationPath, $safeFileName);
        $filePath = "uploads/{$folder}/{$safeFileName}";
        $url = "/{$filePath}";

        // Calculate dimensions if image
        $dimensions = null;
        $mimeType = $file->getClientMimeType() ?: 'application/octet-stream';
        if (str_starts_with($mimeType, 'image/') && file_exists(public_path($filePath))) {
            $imageInfo = @getimagesize(public_path($filePath));
            if ($imageInfo) {
                $dimensions = "{$imageInfo[0]}x{$imageInfo[1]}";
            }
        }

        $asset = MediaAsset::create([
            'name' => $originalName,
            'file_name' => $safeFileName,
            'file_path' => $filePath,
            'url' => $url,
            'mime_type' => $mimeType,
            'size_bytes' => @filesize(public_path($filePath)) ?: 0,
            'dimensions' => $dimensions,
            'folder' => $folder,
            'alt_text' => $request->input('alt_text', $originalName),
            'uploaded_by' => $request->user()?->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Media asset uploaded successfully.',
            'asset' => $asset,
        ], 201);
    }

    /**
     * Update asset metadata.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $asset = MediaAsset::findOrFail($id);

        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'folder' => ['nullable', 'string', 'max:50'],
        ]);

        $asset->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Media asset updated successfully.',
            'asset' => $asset,
        ]);
    }

    /**
     * Delete an asset from disk and database.
     */
    public function destroy(int $id): JsonResponse
    {
        $asset = MediaAsset::findOrFail($id);

        $fullPath = public_path($asset->file_path);
        if (File::exists($fullPath)) {
            File::delete($fullPath);
        }

        $asset->delete();

        return response()->json([
            'success' => true,
            'message' => 'Media asset deleted successfully.',
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\PageSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageAndMenuController extends Controller
{
    // =========================================================================
    // 01. NAVIGATION MENU MANAGEMENT
    // =========================================================================

    /**
     * Get all menu items grouped by location.
     */
    public function getMenus(): JsonResponse
    {
        $items = MenuItem::with('children')
            ->whereNull('parent_id')
            ->orderBy('order')
            ->get();

        $grouped = $items->groupBy('location');

        return response()->json([
            'success' => true,
            'items' => $items,
            'grouped' => $grouped,
        ]);
    }

    /**
     * Store new menu item.
     */
    public function storeMenu(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'location' => ['required', 'string', 'in:header,footer_quick,footer_capabilities,footer_legal'],
            'parent_id' => ['nullable', 'exists:menu_items,id'],
            'title_en' => ['required', 'string', 'max:100'],
            'title_bn' => ['required', 'string', 'max:100'],
            'url' => ['required', 'string', 'max:255'],
            'target' => ['nullable', 'string', 'in:_self,_blank'],
            'icon' => ['nullable', 'string', 'max:50'],
            'badge_text' => ['nullable', 'string', 'max:30'],
            'order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $item = MenuItem::create([
            ...$validated,
            'target' => $validated['target'] ?? '_self',
            'order' => $validated['order'] ?? (MenuItem::where('location', $validated['location'])->count() + 1),
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Menu item created successfully.',
            'item' => $item,
        ], 201);
    }

    /**
     * Update menu item.
     */
    public function updateMenu(Request $request, int $id): JsonResponse
    {
        $item = MenuItem::findOrFail($id);

        $validated = $request->validate([
            'location' => ['sometimes', 'string', 'in:header,footer_quick,footer_capabilities,footer_legal'],
            'parent_id' => ['nullable', 'exists:menu_items,id'],
            'title_en' => ['sometimes', 'string', 'max:100'],
            'title_bn' => ['sometimes', 'string', 'max:100'],
            'url' => ['sometimes', 'string', 'max:255'],
            'target' => ['nullable', 'string', 'in:_self,_blank'],
            'icon' => ['nullable', 'string', 'max:50'],
            'badge_text' => ['nullable', 'string', 'max:30'],
            'order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $item->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Menu item updated successfully.',
            'item' => $item,
        ]);
    }

    /**
     * Delete menu item.
     */
    public function deleteMenu(int $id): JsonResponse
    {
        $item = MenuItem::findOrFail($id);
        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Menu item removed successfully.',
        ]);
    }

    /**
     * Reorder menu items.
     */
    public function reorderMenus(Request $request): JsonResponse
    {
        $request->validate([
            'items' => ['required', 'array'],
            'items.*.id' => ['required', 'exists:menu_items,id'],
            'items.*.order' => ['required', 'integer'],
        ]);

        foreach ($request->input('items') as $orderData) {
            MenuItem::where('id', $orderData['id'])->update(['order' => $orderData['order']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Menu item order updated.',
        ]);
    }

    // =========================================================================
    // 02. DYNAMIC PAGE SECTIONS MANAGEMENT
    // =========================================================================

    /**
     * Get all managed pages.
     */
    public function getPages(): JsonResponse
    {
        $pages = PageSection::select('page_slug')
            ->distinct()
            ->pluck('page_slug')
            ->values();

        return response()->json([
            'success' => true,
            'pages' => $pages,
        ]);
    }

    /**
     * Get all sections for a page.
     */
    public function getPageSections(string $slug): JsonResponse
    {
        $sections = PageSection::where('page_slug', $slug)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'page' => $slug,
            'sections' => $sections,
        ]);
    }

    /**
     * Update or create a page section.
     */
    public function updatePageSection(Request $request, string $slug, string $sectionKey): JsonResponse
    {
        $validated = $request->validate([
            'title_en' => ['nullable', 'string', 'max:255'],
            'title_bn' => ['nullable', 'string', 'max:255'],
            'subtitle_en' => ['nullable', 'string'],
            'subtitle_bn' => ['nullable', 'string'],
            'badge_en' => ['nullable', 'string', 'max:150'],
            'badge_bn' => ['nullable', 'string', 'max:150'],
            'content_en' => ['nullable', 'string'],
            'content_bn' => ['nullable', 'string'],
            'image_url' => ['nullable', 'string'],
            'video_url' => ['nullable', 'string'],
            'cta_text_en' => ['nullable', 'string', 'max:100'],
            'cta_text_bn' => ['nullable', 'string', 'max:100'],
            'cta_link' => ['nullable', 'string', 'max:255'],
            'metadata' => ['nullable', 'array'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $section = PageSection::updateOrCreate(
            [
                'page_slug' => $slug,
                'section_key' => $sectionKey,
            ],
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => "Section {$sectionKey} updated successfully.",
            'section' => $section,
        ]);
    }
}

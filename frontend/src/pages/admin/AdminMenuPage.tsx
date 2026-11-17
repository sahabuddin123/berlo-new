import React, { useState, useEffect } from 'react';
import { adminApi, MenuItem } from '../../services/adminApi';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
} from 'lucide-react';

export const AdminMenuPage: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<'header' | 'footer_quick' | 'footer_capabilities' | 'footer_legal'>('header');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [url, setUrl] = useState('');
  const [target, setTarget] = useState('_self');
  const [parentId, setParentId] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(true);

  const fetchMenus = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getMenus();
      if (res?.items) {
        setMenuItems(res.items);
      }
    } catch {
      // Fallback items
      setMenuItems([
        { id: 1, location: 'header', title_en: 'Home', title_bn: 'হোম', url: '/en', order: 1, is_active: true },
        {
          id: 2,
          location: 'header',
          title_en: 'About',
          title_bn: 'আমাদের সম্পর্কে',
          url: '/en/about',
          order: 2,
          is_active: true,
          children: [
            { id: 10, location: 'header', parent_id: 2, title_en: 'Leadership', title_bn: 'নেতৃত্ব', url: '/en/leadership', order: 1, is_active: true },
            { id: 11, location: 'header', parent_id: 2, title_en: 'Advisory Team', title_bn: 'উপদেষ্টা পর্ষদ', url: '/en/team', order: 2, is_active: true },
          ],
        },
        { id: 3, location: 'header', title_en: 'Services', title_bn: 'সেবাসমূহ', url: '/en/services', order: 3, is_active: true },
        { id: 4, location: 'header', title_en: 'Case Studies', title_bn: 'কেস স্টাডিজ', url: '/en/work', order: 4, is_active: true },
        { id: 5, location: 'header', title_en: 'Clients', title_bn: 'ক্লায়েন্টবৃন্দ', url: '/en/clients', order: 5, is_active: true },
        { id: 6, location: 'header', title_en: 'Insights', title_bn: 'ইনসাইটস', url: '/en/insights', order: 6, is_active: true },
        {
          id: 7,
          location: 'header',
          title_en: 'Gallery',
          title_bn: 'গ্যালারি',
          url: '/en/gallery/photos',
          order: 7,
          is_active: true,
          children: [
            { id: 12, location: 'header', parent_id: 7, title_en: 'Photo Gallery', title_bn: 'ফটোগ্যালারি', url: '/en/gallery/photos', order: 1, is_active: true },
            { id: 13, location: 'header', parent_id: 7, title_en: 'Video Gallery', title_bn: 'ভিডিও গ্যালারি', url: '/en/gallery/videos', order: 2, is_active: true },
          ],
        },
        { id: 8, location: 'header', title_en: 'Contact', title_bn: 'যোগাযোগ', url: '/en/contact', order: 8, is_active: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const openAddModal = (parent?: MenuItem) => {
    setEditingItem(null);
    setTitleEn('');
    setTitleBn('');
    setUrl('');
    setTarget('_self');
    setParentId(parent ? parent.id : null);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setTitleEn(item.title_en);
    setTitleBn(item.title_bn);
    setUrl(item.url);
    setTarget(item.target || '_self');
    setParentId(item.parent_id || null);
    setIsActive(item.is_active);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await adminApi.updateMenu(editingItem.id, {
          title_en: titleEn,
          title_bn: titleBn,
          url,
          target,
          parent_id: parentId,
          is_active: isActive,
        });
        setFeedback('Menu item updated successfully.');
      } else {
        await adminApi.createMenu({
          location: activeLocation,
          title_en: titleEn,
          title_bn: titleBn,
          url,
          target,
          parent_id: parentId,
          is_active: isActive,
        });
        setFeedback('New menu item created.');
      }
      setIsModalOpen(false);
      fetchMenus();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this menu item? Child items will also be removed.')) return;
    try {
      await adminApi.deleteMenu(id);
      fetchMenus();
      setFeedback('Menu item deleted.');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const handleToggleActive = async (item: MenuItem) => {
    try {
      await adminApi.updateMenu(item.id, { is_active: !item.is_active });
      setMenuItems((prev) =>
        prev.map((m) => (m.id === item.id ? { ...m, is_active: !m.is_active } : m))
      );
    } catch {
      // Ignored
    }
  };

  const currentList = menuItems.filter(
    (item) => item.location === activeLocation && (!item.parent_id || item.parent_id === null)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Flux Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#1b2030]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Navigation Menu Builder
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build, nest, and rearrange the dynamic navigation menus across the public website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openAddModal()}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#6d28d9] hover:to-[#4f46e5] text-white text-xs font-semibold shadow-md shadow-[#7c3aed]/25 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Location Selector Tabs (Flux style) */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#111420] border border-[#212738] overflow-x-auto text-xs">
        {[
          { key: 'header', label: 'Primary Header Navigation' },
          { key: 'footer_quick', label: 'Footer Quick Links' },
          { key: 'footer_capabilities', label: 'Footer Capabilities' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveLocation(tab.key as any)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeLocation === tab.key
                ? 'bg-[#7c3aed] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Menu Tree List */}
      <div className="rounded-xl bg-[#111420] border border-[#212738] p-5 space-y-3">
        {isLoading ? (
          <div className="py-12 text-center text-slate-500 text-xs">Loading navigation items...</div>
        ) : currentList.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">No menu items found in this section.</div>
        ) : (
          <div className="space-y-2">
            {currentList.map((item, idx) => (
              <div key={item.id} className="space-y-1.5">
                {/* Parent Row */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#131622] border border-[#212738] hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-md bg-white/[0.06] text-slate-400 flex items-center justify-center font-mono text-[10px]">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-white text-xs flex items-center gap-2">
                        <span>{item.title_en}</span>
                        <span className="text-slate-400 text-[11px] font-bangla font-normal">({item.title_bn})</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{item.url}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Add child submenu button */}
                    {activeLocation === 'header' && (
                      <button
                        type="button"
                        onClick={() => openAddModal(item)}
                        className="px-2 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-[11px] text-slate-300 font-medium transition-colors cursor-pointer"
                        title="Add Dropdown Submenu Item"
                      >
                        + Submenu
                      </button>
                    )}

                    {/* Active toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleActive(item)}
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors cursor-pointer ${
                        item.is_active
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {item.is_active ? 'Active' : 'Hidden'}
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Submenus (Nested Children) */}
                {item.children && item.children.length > 0 && (
                  <div className="pl-8 space-y-1.5 border-l-2 border-[#7c3aed]/40 ml-4 py-1">
                    {item.children.map((child, cIdx) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-[#0c0e17] border border-[#212738]/80 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 font-mono">
                            {idx + 1}.{cIdx + 1}
                          </span>
                          <div>
                            <span className="font-medium text-white">{child.title_en}</span>
                            <span className="text-slate-400 ml-1.5 text-[11px] font-bangla">({child.title_bn})</span>
                            <span className="text-slate-500 ml-2 font-mono text-[10px]">{child.url}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(child)}
                            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.06]"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(child.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111420] rounded-2xl border border-[#212738] p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#212738] pb-4">
              <h3 className="font-bold text-white text-sm">
                {editingItem ? 'Edit Menu Item' : parentId ? 'Add Submenu Item' : 'Add New Menu Item'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-medium">Menu Title (English)</label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Services"
                  className="w-full px-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white focus:outline-none focus:border-[#7c3aed]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-medium">Menu Title (Bangla)</label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  placeholder="যেমনঃ সেবাসমূহ"
                  className="w-full px-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white focus:outline-none focus:border-[#7c3aed] font-bangla"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-medium">Link Destination (URL / Path)</label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g. /en/services or https://..."
                  className="w-full px-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white font-mono focus:outline-none focus:border-[#7c3aed]"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-[#7c3aed] focus:ring-0"
                  />
                  <span>Active & Visible</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#212738]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#6d28d9] hover:to-[#4f46e5] text-white font-semibold shadow-md shadow-[#7c3aed]/25 transition-all"
                >
                  {editingItem ? 'Save Changes' : 'Create Menu Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

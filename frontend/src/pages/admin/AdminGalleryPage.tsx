import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import {
  Images,
  Video,
  Camera,
  Trash2,
  X,
  CheckCircle,
  Film,
} from 'lucide-react';

interface PhotoRecord {
  id: number;
  title_en: string;
  title_bn: string;
  category_key: string;
  category_en: string;
  category_bn: string;
  image_url: string;
  client_name?: string;
  location_en?: string;
  event_date?: string;
  sort_order: number;
}

interface VideoRecord {
  id: number;
  title_en: string;
  title_bn: string;
  category_key: string;
  category_en: string;
  category_bn: string;
  youtube_id: string;
  duration?: string;
  views?: string;
  client_name?: string;
  is_featured: boolean;
  sort_order: number;
}

export const AdminGalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [photos, setPhotos] = useState<PhotoRecord[]>([]);
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modals
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Photo form
  const [photoForm, setPhotoForm] = useState({
    title_en: '',
    title_bn: '',
    category_key: 'press-conferences',
    category_en: 'Press Conferences',
    category_bn: 'সংবাদ সম্মেলন',
    image_url: '',
    client_name: 'Berlo Communications',
    location_en: 'Pan Pacific Sonargaon, Dhaka',
    location_bn: 'প্যান প্যাসিফিক সোনারগাঁও, ঢাকা',
    event_date: '2026',
    sort_order: 1,
  });

  // Video form
  const [videoForm, setVideoForm] = useState({
    title_en: '',
    title_bn: '',
    category_key: 'brand-films',
    category_en: 'Brand Films',
    category_bn: 'ব্র্যান্ড ফিল্ম',
    youtube_id: '',
    duration: '3:45',
    views: '10K',
    client_name: 'Corporate Partner',
    is_featured: true,
    sort_order: 1,
  });

  const loadGallery = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getGallery();
      if (res?.photos) setPhotos(res.photos);
      if (res?.videos) setVideos(res.videos);
    } catch {
      // Handled
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleDeletePhoto = async (id: number, title: string) => {
    if (!window.confirm(`Delete photo "${title}"?`)) return;
    try {
      await adminApi.deletePhoto(id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      setFeedback(`Photo removed successfully.`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete photo.');
    }
  };

  const handleDeleteVideo = async (id: number, title: string) => {
    if (!window.confirm(`Delete video "${title}"?`)) return;
    try {
      await adminApi.deleteVideo(id);
      setVideos((prev) => prev.filter((v) => v.id !== id));
      setFeedback(`Video removed successfully.`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete video.');
    }
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await adminApi.createPhoto(photoForm);
      setPhotos((prev) => [...prev, res.data]);
      setFeedback(`Photo added: ${photoForm.title_en}`);
      setPhotoModalOpen(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to add photo.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await adminApi.createVideo(videoForm);
      setVideos((prev) => [...prev, res.data]);
      setFeedback(`Video added: ${videoForm.title_en}`);
      setVideoModalOpen(false);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to add video.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Images className="w-6 h-6 text-[#A302FF]" />
            <span>Photo & Video Media Gallery</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage high-resolution press event photographs and corporate broadcast video showcases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === 'photos' ? (
            <button
              onClick={() => setPhotoModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#A302FF] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Add Photo</span>
            </button>
          ) : (
            <button
              onClick={() => setVideoModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#A302FF] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Add Video</span>
            </button>
          )}
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('photos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'photos'
              ? 'bg-[#7c3aed] text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Photo Gallery ({photos.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'videos'
              ? 'bg-[#7c3aed] text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Video Gallery ({videos.length})</span>
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="py-24 text-center text-slate-500 text-xs">Loading media assets...</div>
      ) : activeTab === 'photos' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden group hover:border-[#7c3aed] transition-all"
            >
              <div className="h-44 bg-slate-950 relative overflow-hidden">
                <img src={p.image_url} alt={p.title_en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/70 text-white backdrop-blur-sm border border-white/20">
                  {p.category_en}
                </span>
                <button
                  onClick={() => handleDeletePhoto(p.id, p.title_en)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                  title="Delete Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-white text-xs line-clamp-1">{p.title_en}</h3>
                <p className="text-[11px] text-slate-400 line-clamp-1">{p.title_bn}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                  <span>{p.client_name || 'Berlo'}</span>
                  <span>{p.event_date || '2026'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((v) => (
            <div
              key={v.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden group hover:border-[#7c3aed] transition-all"
            >
              <div className="h-48 bg-slate-950 relative overflow-hidden flex items-center justify-center">
                <img
                  src={`https://img.youtube.com/vi/${v.youtube_id}/hqdefault.jpg`}
                  alt={v.title_en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center text-white shadow-xl pointer-events-none">
                  <Film className="w-5 h-5 ml-0.5" />
                </div>
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                  {v.duration || '3:45'}
                </span>
                <button
                  onClick={() => handleDeleteVideo(v.id, v.title_en)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                  title="Delete Video"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-white text-xs line-clamp-1">{v.title_en}</h3>
                <p className="text-[11px] text-slate-400 line-clamp-1">{v.title_bn}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                  <span>YouTube: {v.youtube_id}</span>
                  <span>{v.client_name || 'Berlo Partner'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Photo Modal */}
      {photoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#A302FF]" />
                <span>Add Press Photograph</span>
              </h2>
              <button onClick={() => setPhotoModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSavePhoto} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={photoForm.title_en}
                  onChange={(e) => setPhotoForm({ ...photoForm, title_en: e.target.value })}
                  placeholder="e.g. National Telecom 5G Infrastructure Press Briefing"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">Title (Bengali) *</label>
                <input
                  type="text"
                  required
                  value={photoForm.title_bn}
                  onChange={(e) => setPhotoForm({ ...photoForm, title_bn: e.target.value })}
                  placeholder="e.g. জাতীয় ফাইভ-জি টেলিকম প্রেস ব্রিফিং"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={photoForm.image_url}
                  onChange={(e) => setPhotoForm({ ...photoForm, image_url: e.target.value })}
                  placeholder="/images/gallery/photo1.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Category</label>
                  <select
                    value={photoForm.category_key}
                    onChange={(e) => setPhotoForm({ ...photoForm, category_key: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  >
                    <option value="press-conferences">Press Conferences</option>
                    <option value="brand-activations">Brand Activations</option>
                    <option value="corporate-galas">Corporate Galas</option>
                    <option value="crisis-war-room">Crisis War-Room</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Client Name</label>
                  <input
                    type="text"
                    value={photoForm.client_name}
                    onChange={(e) => setPhotoForm({ ...photoForm, client_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setPhotoModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="px-5 py-2 rounded-xl bg-[#7c3aed] text-white text-xs font-bold uppercase tracking-wider">
                  {isSaving ? 'Saving...' : 'Add Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-[#A302FF]" />
                <span>Add Broadcast Video</span>
              </h2>
              <button onClick={() => setVideoModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveVideo} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={videoForm.title_en}
                  onChange={(e) => setVideoForm({ ...videoForm, title_en: e.target.value })}
                  placeholder="e.g. Bangladesh FinTech Revolution Documentary"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">Title (Bengali) *</label>
                <input
                  type="text"
                  required
                  value={videoForm.title_bn}
                  onChange={(e) => setVideoForm({ ...videoForm, title_bn: e.target.value })}
                  placeholder="e.g. বাংলাদেশ ফিনটেক বিপ্লব প্রামাণ্যচিত্র"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">YouTube Video ID *</label>
                  <input
                    type="text"
                    required
                    value={videoForm.youtube_id}
                    onChange={(e) => setVideoForm({ ...videoForm, youtube_id: e.target.value })}
                    placeholder="e.g. r92J1K0zNn0"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    placeholder="e.g. 4:12"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setVideoModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="px-5 py-2 rounded-xl bg-[#7c3aed] text-white text-xs font-bold uppercase tracking-wider">
                  {isSaving ? 'Saving...' : 'Add Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

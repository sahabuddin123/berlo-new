import React, { useState } from 'react';
import { photoGalleryItems, videoGalleryItems } from '../../data/galleryData';
import { Camera, Video } from 'lucide-react';

export const AdminGalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Photo & Video Gallery Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Curate visual event archives, documentary broadcasts, and TVCs.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'photos' ? 'bg-[#A302FF] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Photos ({photoGalleryItems.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'videos' ? 'bg-[#11813C] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Videos ({videoGalleryItems.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'photos' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photoGalleryItems.map((photo) => (
            <div
              key={photo.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-950">
                <img src={photo.image} alt={photo.title.en} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/70 text-white backdrop-blur-sm">
                  {photo.category.en}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-semibold text-white text-xs line-clamp-1">{photo.title.en}</h4>
                <div className="text-[11px] text-slate-400 truncate">{photo.location.en}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoGalleryItems.map((video) => (
            <div
              key={video.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-950">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title.en}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/70 text-emerald-400 backdrop-blur-sm">
                  {video.category.en}
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono">
                  {video.duration}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-semibold text-white text-xs line-clamp-1">{video.title.en}</h4>
                <div className="text-[11px] text-slate-400 truncate">Client: {video.client}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { adminApi, MediaAsset } from '../../services/adminApi';
import {
  UploadCloud,
  Search,
  Image,
  Video,
  FileText,
  Trash2,
  Copy,
  Check,
  X,
  HardDrive,
} from 'lucide-react';

export const AdminMediaLibraryPage: React.FC = () => {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [folders, setFolders] = useState<string[]>(['general', 'brand', 'services', 'articles', 'gallery', 'team']);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [targetFolder] = useState<string>('general');

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const res = await adminApi.getMediaAssets({
        search,
        folder: selectedFolder,
        type: selectedType,
      });
      if (res?.data?.data) {
        setAssets(res.data.data);
      }
      if (res?.folders && res.folders.length > 0) {
        setFolders(Array.from(new Set([...folders, ...res.folders])));
      }
    } catch {
      // Fallback local media items
      setAssets([
        {
          id: 1,
          name: 'Berlo Primary Logo',
          file_name: 'logo.png',
          file_path: 'brand/logo.png',
          url: '/brand/logo.png',
          mime_type: 'image/png',
          size_bytes: 45200,
          dimensions: '320x96',
          folder: 'brand',
          alt_text: 'Berlo Communications Logo',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Hero 3D Character Illustration',
          file_name: 'hero_character_crisis.png',
          file_path: 'hero_character_crisis.png',
          url: '/hero_character_crisis.png',
          mime_type: 'image/png',
          size_bytes: 280000,
          dimensions: '800x800',
          folder: 'general',
          alt_text: 'Berlo Crisis Communications Hero Character',
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'Default Staff Avatar',
          file_name: 'avatar-placeholder.png',
          file_path: 'brand/avatar-placeholder.png',
          url: '/brand/avatar-placeholder.png',
          mime_type: 'image/png',
          size_bytes: 12400,
          dimensions: '200x200',
          folder: 'team',
          alt_text: 'Staff avatar placeholder',
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [selectedFolder, selectedType]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const file = files[0];
      const res = await adminApi.uploadMediaAsset(file, targetFolder, file.name);
      if (res.asset) {
        setAssets((prev) => [res.asset, ...prev]);
        setFeedback('File uploaded to media library successfully!');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (asset: MediaAsset) => {
    navigator.clipboard.writeText(window.location.origin + asset.url);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this asset from media library?')) return;
    try {
      await adminApi.deleteMediaAsset(id);
      setAssets((prev) => prev.filter((a) => a.id !== id));
      if (previewAsset?.id === id) setPreviewAsset(null);
      setFeedback('Asset deleted.');
      setTimeout(() => setFeedback(null), 2500);
    } catch (err: any) {
      alert(err.message || 'Delete failed.');
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${bytes} B`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Flux Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#1b2030]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Media Library & Digital Assets
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Central repository for brand logos, hero characters, client photography, and media releases.
          </p>
        </div>

        {/* Upload Trigger Button */}
        <div className="flex items-center gap-2">
          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#6d28d9] hover:to-[#4f46e5] text-white text-xs font-semibold shadow-md shadow-[#7c3aed]/25 transition-all cursor-pointer">
            <UploadCloud className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Media Asset'}</span>
            <input
              type="file"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
              accept="image/*,video/mp4,application/pdf"
            />
          </label>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar (Flux style) */}
      <div className="p-4 rounded-xl bg-[#111420] border border-[#212738] flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Left: Type pills & folder select */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center bg-[#131622] p-1 rounded-lg border border-[#212738] text-xs">
            {['all', 'image', 'video', 'document'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 rounded-md font-medium capitalize transition-all cursor-pointer ${
                  selectedType === t
                    ? 'bg-[#7c3aed] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Folder Select */}
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#131622] border border-[#212738] text-white text-xs focus:outline-none focus:border-[#7c3aed] capitalize cursor-pointer"
          >
            <option value="all">All Folders</option>
            {folders.map((f) => (
              <option key={f} value={f}>
                Folder: {f}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchAssets()}
            placeholder="Search assets by name or alt..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#131622] border border-[#212738] text-white text-xs focus:outline-none focus:border-[#7c3aed] placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Assets Grid */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
          <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs">Loading media assets...</span>
        </div>
      ) : assets.length === 0 ? (
        <div className="p-12 rounded-xl bg-[#111420] border border-[#212738] text-center space-y-3">
          <HardDrive className="w-10 h-10 text-slate-600 mx-auto" />
          <div className="text-white font-semibold text-sm">No media assets found</div>
          <p className="text-xs text-slate-400">Upload your first image, video, or document to the library.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {assets.map((asset) => {
            const isImage = asset.mime_type.startsWith('image/');
            const isVideo = asset.mime_type.startsWith('video/');

            return (
              <div
                key={asset.id}
                onClick={() => setPreviewAsset(asset)}
                className="group relative rounded-xl bg-[#111420] border border-[#212738] hover:border-[#7c3aed] transition-all overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Thumbnail Container */}
                <div className="aspect-square bg-[#0c0e17] flex items-center justify-center overflow-hidden relative">
                  {isImage ? (
                    <img
                      src={asset.url}
                      alt={asset.alt_text || asset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : isVideo ? (
                    <Video className="w-10 h-10 text-blue-400/80" />
                  ) : (
                    <FileText className="w-10 h-10 text-slate-500" />
                  )}

                  {/* Hover Overlay with Quick Copy */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(asset);
                      }}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                      title="Copy Public URL"
                    >
                      {copiedId === asset.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(asset.id);
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/40 hover:bg-rose-500/60 text-white transition-colors"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata info */}
                <div className="p-2.5 space-y-1">
                  <div className="font-semibold text-white text-xs truncate group-hover:text-[#a855f7] transition-colors" title={asset.name}>
                    {asset.name}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{formatSize(asset.size_bytes)}</span>
                    <span className="uppercase text-[9px] px-1 py-0.2 rounded bg-white/[0.06] text-slate-300">
                      {asset.folder}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Asset Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#111420] rounded-2xl border border-[#212738] p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#212738] pb-4">
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-[#a855f7]" />
                <h3 className="font-bold text-white text-sm truncate max-w-xs">{previewAsset.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewAsset(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Media Display */}
            <div className="max-h-72 rounded-xl bg-[#0c0e17] border border-[#212738] flex items-center justify-center overflow-hidden p-2">
              {previewAsset.mime_type.startsWith('image/') ? (
                <img
                  src={previewAsset.url}
                  alt={previewAsset.alt_text || previewAsset.name}
                  className="max-h-64 object-contain mx-auto"
                />
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <FileText className="w-12 h-12 mx-auto text-slate-500" />
                  <div className="text-xs font-mono">{previewAsset.file_name}</div>
                </div>
              )}
            </div>

            {/* File Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-[#131622] border border-[#212738]">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Direct URL</span>
                <span className="font-mono text-slate-300 text-[11px] truncate block">{previewAsset.url}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Folder</span>
                <span className="text-white capitalize">{previewAsset.folder}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">File Size</span>
                <span className="font-mono text-slate-300">{formatSize(previewAsset.size_bytes)}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Dimensions</span>
                <span className="font-mono text-slate-300">{previewAsset.dimensions || 'Vector / Dynamic'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleDelete(previewAsset.id)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Asset</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(previewAsset)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:from-[#6d28d9] hover:to-[#4f46e5] text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-[#7c3aed]/25 transition-all cursor-pointer"
                >
                  {copiedId === previewAsset.id ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === previewAsset.id ? 'Copied to Clipboard!' : 'Copy Asset URL'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

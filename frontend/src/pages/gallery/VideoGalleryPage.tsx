import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Seo } from '../../components/common/Seo';
import { videoCategories, videoGalleryItems } from '../../data/galleryData';
import {
  Video,
  Play,
  Building,
  Eye,
  Clock,
  X,
  Camera,
  ArrowRight,
  Filter,
  Sparkles,
} from 'lucide-react';
import { FaChevronRight } from 'react-icons/fa';

export const VideoGalleryPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const featuredVideo = videoGalleryItems.find((v) => v.featured) || videoGalleryItems[0];

  const filteredVideos =
    activeCategory === 'all'
      ? videoGalleryItems
      : videoGalleryItems.filter((item) => item.categoryKey === activeCategory);

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'ভিডিও গ্যালারি — বার্লো কমিউনিকেশনস' : 'Video Gallery & Corporate Broadcasts — Berlo Communications'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশনস প্রযোজিত করপোরেট ডকুমেন্টারি, টেলিভিশন সম্প্রচার, প্রেস কনফারেন্স ও ব্র্যান্ড ক্যাম্পেইন ফিল্মের অফিশিয়াল ভিডিও গ্যালারি।'
            : 'Watch official corporate documentaries, press conference broadcasts, brand campaign films, and executive keynote summits produced and managed by Berlo Communications.'
        }
      />

      {/* ========================================================================= */}
      {/* 01. PAGE HERO BANNER                                                      */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 bg-slate-50 dark:bg-[#07090D] border-b border-slate-200 dark:border-[#1F1F1F] transition-colors duration-200">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-wider">
            <Link to={formatRoute('')} className="hover:text-[#A302FF] transition-colors">
              {lang === 'bn' ? 'হোম' : 'Home'}
            </Link>
            <FaChevronRight className="w-2.5 h-2.5 text-slate-400" />
            <span className="text-slate-400">{lang === 'bn' ? 'গ্যালারি' : 'Gallery'}</span>
            <FaChevronRight className="w-2.5 h-2.5 text-slate-400" />
            <span className="text-[#A302FF] dark:text-[#B833FF]">
              {lang === 'bn' ? 'ভিডিও গ্যালারি' : 'Video Gallery'}
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl space-y-5 text-center lg:text-left mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11813C]/10 text-[#11813C] dark:text-[#22C55E] text-xs font-bold uppercase tracking-wider">
                <Video className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'সিনেমাটিক ফিল্ম ও টেলিভিশন ব্রডকাস্ট' : 'Cinematic Productions & Broadcast Archives'}</span>
              </div>

              <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
                {lang === 'bn' ? (
                  <>
                    করপোরেট স্টোরিটেলিং ও <span className="b-border">ভিডিও গ্যালারি</span>
                  </>
                ) : (
                  <>
                    Moving Narratives: <span className="b-border">Video Gallery</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {lang === 'bn'
                  ? 'জাতীয় প্রেস কনফারেন্সের পূর্ণাঙ্গ সম্প্রচার, ব্র্যান্ড লঞ্চিং ফিল্ম, পলিসি সামিট এবং করপোরেট ডকুমেন্টারির এক্সক্লুসিভ সংগ্রহশালা।'
                  : 'Experience high-impact corporate films, nationwide television broadcasts, executive summits, and crisis simulations directed and managed by Berlo Communications.'}
              </p>
            </div>

            {/* Quick Switch to Photo Gallery Pill */}
            <div className="shrink-0 flex justify-center lg:justify-end">
              <Link
                to={formatRoute('gallery/photos')}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#A302FF] dark:hover:text-[#B833FF] hover:border-[#A302FF]/40 shadow-sm transition-all text-sm font-semibold group"
              >
                <Camera className="w-4 h-4 text-[#11813C] group-hover:scale-110 transition-transform" />
                <span>{lang === 'bn' ? 'ফটো গ্যালারিতে যান' : 'Switch to Photo Gallery'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. FEATURED SPOTLIGHT VIDEO                                              */}
      {/* ========================================================================= */}
      {featuredVideo && (
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Video Player Preview Column */}
              <div className="lg:col-span-7 relative aspect-video bg-black">
                <img
                  src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/maxresdefault.jpg`}
                  alt={featuredVideo.title[lang]}
                  onError={(e) => {
                    // Fallback to hqdefault if maxres isn't available
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${featuredVideo.youtubeId}/hqdefault.jpg`;
                  }}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Big Center Play Button */}
                <button
                  type="button"
                  onClick={() => setActiveVideoId(featuredVideo.youtubeId)}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#A302FF] hover:bg-[#8D02DE] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group cursor-pointer"
                  aria-label="Play Featured Video"
                >
                  <Play className="w-8 h-8 fill-current ml-1 text-white group-hover:scale-110 transition-transform" />
                  <span className="absolute inset-0 rounded-full bg-[#A302FF] animate-ping opacity-30 pointer-events-none" />
                </button>

                {/* Duration Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-black/80 text-white text-xs font-mono font-medium backdrop-blur-md flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>{featuredVideo.duration}</span>
                </div>
              </div>

              {/* Video Details Column */}
              <div className="lg:col-span-5 p-6 sm:p-10 space-y-5 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A302FF]/20 border border-[#A302FF]/40 text-[#B833FF] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'নির্বাচিত ফিচার্ড প্রোডাকশন' : 'Spotlight Production'}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {featuredVideo.title[lang]}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {featuredVideo.description[lang]}
                </p>

                <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-slate-400 border-t border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#A302FF]" />
                    <span className="truncate">{featuredVideo.client}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>{featuredVideo.views} views</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveVideoId(featuredVideo.youtubeId)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A302FF] hover:bg-[#8D02DE] text-white font-semibold text-sm transition-all shadow-lg shadow-[#A302FF]/25 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{lang === 'bn' ? 'ভিডিওটি দেখুন' : 'Watch Broadcast Now'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 03. CATEGORY FILTER TABS                                                  */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#11813C]" />
          <span>{lang === 'bn' ? 'ভিডিও ক্যাটাগরি ফিল্টার' : 'Filter by Video Category'}</span>
          <span className="ml-auto text-slate-400 lowercase font-normal">
            {filteredVideos.length} {lang === 'bn' ? 'টি ভিডিও তালিকাভুক্ত' : 'productions cataloged'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {videoCategories.map((cat) => {
            const isActive = activeCategory === cat.key;
            const count =
              cat.key === 'all'
                ? videoGalleryItems.length
                : videoGalleryItems.filter((v) => v.categoryKey === cat.key).length;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#11813C] text-white shadow-md shadow-[#11813C]/20 font-semibold'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-[#11813C]/50 hover:text-[#11813C]'
                }`}
              >
                <span>{cat[lang]}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. VIDEO GRID                                                            */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideoId(video.youtubeId)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-[#11813C]/40 transition-all duration-300 flex flex-col"
            >
              {/* Video Thumbnail Stage */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title[lang]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 group-hover:from-black/75 transition-all" />

                {/* Category Badge on Top-Left */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-slate-900/90 text-[#11813C] dark:text-[#22C55E] backdrop-blur-md shadow-sm">
                    {video.category[lang]}
                  </span>
                </div>

                {/* Duration Badge on Top-Right */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/70 text-white text-[11px] font-mono backdrop-blur-md flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#22C55E]" />
                  <span>{video.duration}</span>
                </div>

                {/* Center Animated Play Button */}
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#11813C] text-white flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform duration-300">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>

                {/* Views & Date Bar at Bottom */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-white/80 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3 h-3 text-[#22C55E]" />
                    <span>{video.views} views</span>
                  </div>
                  <span className="text-white/60">{video.date}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-[#11813C] dark:group-hover:text-[#22C55E] transition-colors line-clamp-2">
                    {video.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {video.description[lang]}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 truncate">
                    <Building className="w-3.5 h-3.5 text-[#11813C] shrink-0" />
                    <span className="truncate">{video.client}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#11813C] dark:text-[#22C55E] font-semibold shrink-0">
                    <Play className="w-3 h-3 fill-current" />
                    <span>{lang === 'bn' ? 'প্লে করুন' : 'Watch'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. VIDEO EMBED MODAL                                                     */}
      {/* ========================================================================= */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Video className="w-4 h-4 text-[#22C55E]" />
                <span>{lang === 'bn' ? 'ভিডিও ব্রডকাস্ট প্লেয়ার' : 'Berlo Media Player'}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideoId(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Video Player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Iframe Container */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Berlo Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 06. INVITATION & PRODUCTION CTA                                           */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#11813C]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A302FF]/20 border border-[#A302FF]/40 text-[#B833FF] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'করপোরেট ডকুমেন্টারি ও টিভিসি' : 'Corporate Storytelling & TVC'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'bn'
                ? 'আপনার প্রতিষ্ঠানের জন্য বিশ্বমানের অডিওভিজ্যুয়াল কন্টেন্ট তৈরি করুন'
                : 'Produce World-Class Audiovisuals for Your Brand'}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'বার্লোর অভিজ্ঞ ভিডিও প্রডাকশন টিম করপোরেট ডকুমেন্টারি, এক্সিকিউটিভ ইন্টারভিউ ও ক্যাম্পেইন ফিল্ম নির্মাণে সর্বাধুনিক প্রযুক্তি ও চিত্রনাট্য অনুসরণ করে।'
                : 'From cinematic brand documentaries to prime-time television broadcasts, our production specialists deliver strategic narratives that resonate with stakeholders.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to={formatRoute('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#11813C] hover:bg-[#0E6C32] text-white font-semibold text-sm transition-all shadow-lg shadow-[#11813C]/30"
              >
                <span>{lang === 'bn' ? 'প্রোডাকশন প্রস্তাবনার জন্য যোগাযোগ' : 'Request Production Proposal'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={formatRoute('gallery/photos')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all"
              >
                <Camera className="w-4 h-4 text-[#B833FF]" />
                <span>{lang === 'bn' ? 'ফটো গ্যালারি দেখুন' : 'Explore Photo Gallery'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Seo } from '../../components/common/Seo';
import { photoCategories, photoGalleryItems, PhotoItem } from '../../data/galleryData';
import { getPublicPhotos } from '../../services/publicApi';
import {
  Camera,
  MapPin,
  Calendar,
  Building,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Video,
  ArrowRight,
  Filter,
  Sparkles,
} from 'lucide-react';
import { FaChevronRight } from 'react-icons/fa';

export const PhotoGalleryPage: React.FC = () => {
  const { lang, formatRoute } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const [photos, setPhotos] = useState<PhotoItem[]>(photoGalleryItems);

  useEffect(() => {
    let isMounted = true;
    getPublicPhotos().then((data) => {
      if (isMounted && data && data.length > 0) {
        setPhotos(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPhotos =
    activeCategory === 'all'
      ? photos
      : photos.filter((item) => item.categoryKey === activeCategory);

  const currentIndex = selectedPhoto
    ? filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    } else {
      setSelectedPhoto(filteredPhotos[0]);
    }
  }, [currentIndex, filteredPhotos]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    } else {
      setSelectedPhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  }, [currentIndex, filteredPhotos]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') setSelectedPhoto(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, handleNext, handlePrev]);

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      <Seo
        title={lang === 'bn' ? 'ফটো গ্যালারি — বার্লো কমিউনিকেশনস' : 'Photo Gallery — Berlo Communications'}
        description={
          lang === 'bn'
            ? 'বার্লো কমিউনিকেশনস আয়োজিত আন্তর্জাতিক মেলা, করপোরেট গালা, প্রেস কনফারেন্স এবং হাই-প্রোফাইল ইভেন্টের এক্সক্লুসিভ ফটো গ্যালারি।'
            : 'Explore high-resolution visual archives of Berlo Communications’ corporate galas, international trade fair pavilions, press conferences, and strategic PR events.'
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
              {lang === 'bn' ? 'ফটো গ্যালারি' : 'Photo Gallery'}
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl space-y-5 text-center lg:text-left mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A302FF]/10 text-[#A302FF] dark:text-[#B833FF] text-xs font-bold uppercase tracking-wider">
                <Camera className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ভিজ্যুয়াল ক্রনিকলস ও প্রেস অ্যালবাম' : 'Visual Chronicles & Event Archives'}</span>
              </div>

              <h1 className="section-main-title text-slate-900 dark:text-white text-center lg:text-left">
                {lang === 'bn' ? (
                  <>
                    কর্পোরেট ইভেন্ট ও <span className="b-border">ফটো গ্যালারি</span>
                  </>
                ) : (
                  <>
                    Moments in Focus: <span className="b-border">Photo Gallery</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {lang === 'bn'
                  ? 'ঢাকা আন্তর্জাতিক বাণিজ্য মেলা, জাতীয় সংবাদ সম্মেলন, করপোরেট গালা নাইট ও সংকট প্রশমনের নিবিড় ওয়ার রুমের বাস্তব চিত্র।'
                  : 'A curated visual record of landmark trade pavilions, high-stakes press conferences, executive galas, and rapid crisis war rooms orchestrated by Berlo Communications.'}
              </p>
            </div>

            {/* Quick Switch to Video Gallery Pill */}
            <div className="shrink-0 flex justify-center lg:justify-end">
              <Link
                to={formatRoute('gallery/videos')}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#A302FF] dark:hover:text-[#B833FF] hover:border-[#A302FF]/40 shadow-sm transition-all text-sm font-semibold group"
              >
                <Video className="w-4 h-4 text-[#A302FF] group-hover:scale-110 transition-transform" />
                <span>{lang === 'bn' ? 'ভিডিও গ্যালারিতে যান' : 'Switch to Video Gallery'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. CATEGORY FILTER TABS                                                  */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#A302FF]" />
          <span>{lang === 'bn' ? 'বিভাগ অনুযায়ী ফিল্টার করুন' : 'Filter by Domain'}</span>
          <span className="ml-auto text-slate-400 lowercase font-normal">
            {filteredPhotos.length} {lang === 'bn' ? 'টি ছবি প্রদর্শিত' : 'moments captured'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {photoCategories.map((cat) => {
            const isActive = activeCategory === cat.key;
            const count =
              cat.key === 'all'
                ? photoGalleryItems.length
                : photoGalleryItems.filter((p) => p.categoryKey === cat.key).length;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#A302FF] text-white shadow-md shadow-[#A302FF]/20 font-semibold'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-[#A302FF]/50 hover:text-[#A302FF]'
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
      {/* 03. PHOTO GRID                                                            */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-[#A302FF]/40 transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={photo.image}
                  alt={photo.title[lang]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Category Badge on Top-Left */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-slate-900/90 text-[#A302FF] dark:text-[#B833FF] backdrop-blur-md shadow-sm">
                    {photo.category[lang]}
                  </span>
                </div>

                {/* Zoom In Icon on Hover */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Quick Info Bar at Bottom of Image */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-white/90 font-medium">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3 h-3 text-[#22C55E] shrink-0" />
                    <span className="truncate">{photo.location[lang]}</span>
                  </div>
                  <span className="shrink-0 text-white/70 ml-2">{photo.date}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-[#A302FF] dark:group-hover:text-[#B833FF] transition-colors line-clamp-2">
                    {photo.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {photo.description[lang]}
                  </p>
                </div>

                {photo.client && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <Building className="w-3.5 h-3.5 text-[#A302FF] shrink-0" />
                    <span className="truncate">
                      {lang === 'bn' ? 'অংশীজন:' : 'Client:'} <strong className="text-slate-700 dark:text-slate-200">{photo.client}</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. INTERACTIVE LIGHTBOX MODAL                                            */}
      {/* ========================================================================= */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="p-4 sm:px-8 flex items-center justify-between border-b border-white/10 text-white">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#A302FF]/30 text-[#B833FF] border border-[#A302FF]/40">
                {selectedPhoto.category[lang]}
              </span>
              <span className="text-xs text-white/60">
                {currentIndex + 1} / {filteredPhotos.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Body / Image Stage */}
          <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 min-h-0">
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title[lang]}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>

          {/* Modal Footer / Details Bar */}
          <div className="p-4 sm:p-6 bg-black/80 border-t border-white/10 text-white">
            <div className="max-w-4xl mx-auto space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-white">
                {selectedPhoto.title[lang]}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                {selectedPhoto.description[lang]}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white/60">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>{selectedPhoto.location[lang]}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#A302FF]" />
                  <span>{selectedPhoto.date}</span>
                </div>
                {selectedPhoto.client && (
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#00A896]" />
                    <span>
                      {lang === 'bn' ? 'অংশীজন:' : 'Client:'} {selectedPhoto.client}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 05. INVITATION & INQUIRY BANNER                                           */}
      {/* ========================================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#A302FF]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11813C]/20 border border-[#11813C]/40 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ইভেন্ট পিআর ও মিডিয়া কভারেজ' : 'Event PR & Media Production'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'bn'
                ? 'আপনার পরবর্তী করপোরেট ইভেন্টে জাতীয় গণমাধ্যম কভারেজ নিশ্চিত করুন'
                : 'Orchestrate Nationwide Media Visibility for Your Next Event'}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'প্রেস কনফারেন্স, প্রোডাক্ট লঞ্চিং, এক্সিকিউটিভ গালা নাইট এবং জাতীয় প্রদর্শনীতে সমন্বিত পিআর এবং ভিজ্যুয়াল ডকুমেন্টেশন পরিচালনা করে বার্লো।'
                : 'From prime-time broadcast coverage to VIP protocol management and full visual storytelling, Berlo turns corporate events into high-impact media milestones.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to={formatRoute('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A302FF] hover:bg-[#8D02DE] text-white font-semibold text-sm transition-all shadow-lg shadow-[#A302FF]/30"
              >
                <span>{lang === 'bn' ? 'পরামর্শের জন্য যোগাযোগ করুন' : 'Schedule PR Consultation'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={formatRoute('gallery/videos')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all"
              >
                <Video className="w-4 h-4 text-[#22C55E]" />
                <span>{lang === 'bn' ? 'ভিডিও গ্যালারি দেখুন' : 'Explore Video Gallery'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

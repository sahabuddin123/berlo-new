import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Testimonial } from '../../data/clientsData';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { lang } = useLanguage();

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between relative overflow-hidden">
      <Quote className="absolute right-6 top-6 w-12 h-12 text-slate-100 dark:text-slate-800 pointer-events-none -z-0" />
      <div className="relative z-10">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6">
          "{testimonial.quote[lang]}"
        </p>
      </div>

      {/* Author Details */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 relative z-10 flex items-center justify-between">
        <div>
          <div className="font-bold text-slate-900 dark:text-white text-sm">
            {testimonial.author}
          </div>
          <div className="text-xs text-[#11813C] dark:text-[#22C55E] font-medium">
            {testimonial.designation[lang]}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-0.5">
            {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
};


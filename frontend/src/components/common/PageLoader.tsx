import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-3 border-slate-200 dark:border-white/10" />
        <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-[#A302FF] animate-spin" />
      </div>
      <div className="w-20 h-1 bg-slate-200 dark:bg-white/10 overflow-hidden">
        <div className="w-full h-full bg-[#A302FF] animate-pulse" />
      </div>
    </div>
  );
};

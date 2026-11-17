import React from 'react';

interface StatCounterProps {
  value: string;
  label: string;
  subtext?: string;
  variant?: 'navy' | 'green' | 'purple';
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  label,
  subtext,
  variant = 'navy',
}) => {
  const colorMap = {
    navy: 'text-[#1A305A] dark:text-[#93C5FD]',
    green: 'text-[#11813C] dark:text-[#22C55E]',
    purple: 'text-[#A302FF] dark:text-[#C966FF]',
  };

  return (
    <div className="flex flex-col p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm shadow-sm transition-transform hover:-translate-y-1">
      <div className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${colorMap[variant]} mb-2`}>
        {value}
      </div>
      <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">
        {label}
      </div>
      {subtext && <div className="text-xs text-slate-500">{subtext}</div>}
    </div>
  );
};


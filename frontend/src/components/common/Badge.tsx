import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'green' | 'navy' | 'teal' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    purple: 'bg-[#A302FF]/10 text-[#A302FF] dark:bg-[#A302FF]/20 dark:text-[#C966FF] border-[#A302FF]/20',
    green: 'bg-[#11813C]/10 text-[#11813C] dark:bg-[#11813C]/20 dark:text-[#22C55E] border-[#11813C]/20',
    navy: 'bg-[#1A305A]/10 text-[#1A305A] dark:bg-[#25427C]/30 dark:text-[#93C5FD] border-[#1A305A]/20',
    teal: 'bg-[#00A896]/10 text-[#00A896] dark:bg-[#00A896]/20 dark:text-[#2DD4BF] border-[#00A896]/20',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1 font-semibold tracking-wide',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
};


import React from 'react';
import { Badge } from './Badge';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'purple' | 'green' | 'navy' | 'teal' | 'slate';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'purple',
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const alignStyles = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col max-w-3xl ${alignStyles} ${className}`}>
      {badge && (
        <Badge variant={badgeVariant} className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.18]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};


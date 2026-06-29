import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color?: string;
  suffix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  color = '#4f6ef7',
  suffix,
}) => {
  return (
    <div className="card group cursor-default animate-slide-up">
      <div className="flex items-start justify-between mb-3">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <p className="stat-value mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
        {suffix && (
          <span className="text-sm font-normal text-gray-500 ml-1">{suffix}</span>
        )}
      </p>
      <p className="stat-label">{label}</p>
    </div>
  );
};

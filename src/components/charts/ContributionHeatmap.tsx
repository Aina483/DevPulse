import React, { useState } from 'react';
import type { ContributionWeek } from '../../types/github';
import { format } from 'date-fns';

interface ContributionHeatmapProps {
  weeks: ContributionWeek[];
  total: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({ weeks, total }) => {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  // Build month labels from week data
  const monthLabels: { label: string; index: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const day = week.contributionDays[0];
    if (!day) return;
    const m = new Date(day.date).getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ label: MONTHS[m], index: wi });
      lastMonth = m;
    }
  });

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white text-sm">Contribution Activity</h3>
        <span className="text-xs text-gray-500 font-mono">{total.toLocaleString()} contributions this year</span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Month labels */}
          <div className="flex gap-[3px] mb-1 ml-0">
            {weeks.map((_, wi) => {
              const label = monthLabels.find(m => m.index === wi);
              return (
                <div key={wi} className="w-[11px] text-[9px] text-gray-600 text-center">
                  {label?.label ?? ''}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div
            className="flex gap-[3px] relative"
            onMouseLeave={() => setTooltip(null)}
          >
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    className="contribution-cell w-[11px] h-[11px] rounded-sm cursor-pointer"
                    style={{
                      backgroundColor: day.contributionCount === 0
                        ? '#161b22'
                        : day.color || '#4f6ef7',
                      border: day.contributionCount === 0
                        ? '1px solid #21262d'
                        : 'none',
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        text: `${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''} on ${format(new Date(day.date), 'MMM d, yyyy')}`,
                        x: rect.left,
                        y: rect.top,
                      });
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 mt-3 justify-end">
            <span className="text-[10px] text-gray-600">Less</span>
            {['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'].map((c, i) => (
              <div
                key={i}
                className="w-[11px] h-[11px] rounded-sm"
                style={{
                  backgroundColor: c,
                  border: i === 0 ? '1px solid #21262d' : 'none',
                }}
              />
            ))}
            <span className="text-[10px] text-gray-600">More</span>
          </div>
        </div>
      </div>

      {/* Fixed tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2.5 py-1.5 bg-gray-900 border border-gray-700 rounded-md text-xs text-gray-300 pointer-events-none shadow-xl"
          style={{ left: tooltip.x, top: tooltip.y - 36 }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

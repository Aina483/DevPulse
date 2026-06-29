import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { LanguageStat } from '../../types/github';

interface LanguageChartProps {
  languages: LanguageStat[];
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: LanguageStat }> }) => {
  if (active && payload && payload.length) {
    const lang = payload[0].payload;
    return (
      <div className="bg-surface-card border border-surface-border rounded-lg px-3 py-2 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="lang-dot" style={{ backgroundColor: lang.color }} />
          <span className="text-white text-xs font-medium">{lang.name}</span>
        </div>
        <p className="text-gray-500 text-xs mt-0.5">{lang.percentage}% of codebase</p>
      </div>
    );
  }
  return null;
};

export const LanguageChart: React.FC<LanguageChartProps> = ({ languages }) => {
  if (!languages.length) return null;

  return (
    <div className="card animate-slide-up">
      <h3 className="font-semibold text-white text-sm mb-4">Languages</h3>

      <div className="flex items-center gap-4">
        {/* Donut chart */}
        <div className="w-28 h-28 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={languages}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={52}
                paddingAngle={2}
                dataKey="percentage"
              >
                {languages.map((lang) => (
                  <Cell key={lang.name} fill={lang.color || '#8b949e'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Language list */}
        <div className="flex-1 space-y-2">
          {languages.slice(0, 7).map((lang) => (
            <div key={lang.name} className="flex items-center gap-2">
              <span
                className="lang-dot flex-shrink-0"
                style={{ backgroundColor: lang.color || '#8b949e' }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs text-gray-400 truncate">{lang.name}</span>
                  <span className="text-xs text-gray-600 font-mono ml-2">{lang.percentage}%</span>
                </div>
                <div className="h-1 bg-surface-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color || '#8b949e',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

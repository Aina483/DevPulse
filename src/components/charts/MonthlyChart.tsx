import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';

interface MonthlyChartProps {
  data: Array<{ name: string; contributions: number }>;
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-card border border-surface-border rounded-lg px-3 py-2 shadow-xl">
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="text-white text-sm font-semibold font-mono">
          {payload[0].value} contributions
        </p>
      </div>
    );
  }
  return null;
};

export const MonthlyChart: React.FC<MonthlyChartProps> = ({ data }) => {
  return (
    <div className="card animate-slide-up">
      <h3 className="font-semibold text-white text-sm mb-4">Monthly Contributions</h3>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6e7681', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6e7681', fontSize: 11 }}
              width={28}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#21262d' }} />
            <Bar
              dataKey="contributions"
              fill="#4f6ef7"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

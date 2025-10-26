import React from 'react';

interface MetricBarProps {
  label: string;
  current: number;
  max: number;
  unit: string;
}

export const MetricBar: React.FC<MetricBarProps> = ({ label, current, max, unit }) => {
  const percentage = max > 0 ? (current / max) * 100 : 0;

  return (
    <div className="text-center">
      <p className="text-xs text-slate-500 font-semibold mb-1">{label}</p>
      <div className="w-full bg-[#F3DCDC] rounded-full h-2.5">
        <div className="bg-[#C8A8E9] h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-xs text-slate-700 font-medium mt-1">{`${current} / ${max} ${unit}`}</p>
    </div>
  );
};
import React from 'react';

interface SummaryCardProps {
  label: string;
  value: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-xl font-bold text-slate-700">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
};
import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface ControlItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  onChange: (newValue: number) => void;
}

export const ControlItem: React.FC<ControlItemProps> = ({ icon, label, value, unit, onChange }) => {
  return (
    <div className="flex items-center justify-between bg-white/50 p-3 rounded-xl shadow-sm">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-[#F3DCDC] rounded-full flex items-center justify-center mr-3">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-slate-700">{label}</p>
          <p className="text-sm text-slate-500">{`${value} ${unit}`}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onChange(value - 1)}
          disabled={value === 0}
          className="w-8 h-8 rounded-full bg-[#C8A8E9] text-white flex items-center justify-center hover:bg-[#B794E0] transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          <Minus size={16} />
        </button>
        <span className="w-10 text-center font-bold text-lg text-[#C8A8E9]">{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full bg-[#C8A8E9] text-white flex items-center justify-center hover:bg-[#B794E0] transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};
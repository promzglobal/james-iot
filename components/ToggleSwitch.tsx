import React from 'react';

interface ToggleSwitchProps {
  icon: React.ReactNode;
  label: string;
  isOn: boolean;
  onToggle: () => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ icon, label, isOn, onToggle }) => {
  return (
    <div className="flex items-center justify-between bg-white/50 p-3 rounded-xl shadow-sm">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-[#F3DCDC] rounded-full flex items-center justify-center mr-3">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-slate-700">{label}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button 
          onClick={onToggle}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${isOn ? 'bg-[#C8A8E9] text-white' : 'bg-[#F3DCDC] text-slate-600'}`}
        >
          ON
        </button>
        <button 
          onClick={onToggle}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${!isOn ? 'bg-[#C8A8E9] text-white' : 'bg-[#F3DCDC] text-slate-600'}`}
        >
          OFF
        </button>
      </div>
    </div>
  );
};
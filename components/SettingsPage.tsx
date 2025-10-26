import React, { useState } from 'react';
import { Bell, Palette, RefreshCcw, User, FileText, ChevronRight } from 'lucide-react';

interface SettingsToggleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({ icon, label, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between bg-white/50 p-3 rounded-xl shadow-sm">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-[#F3DCDC] rounded-full flex items-center justify-center mr-3">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-slate-700">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
    <label htmlFor={`toggle-${label}`} className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" id={`toggle-${label}`} className="sr-only" checked={enabled} onChange={onToggle} />
        <div className={`block w-12 h-6 rounded-full ${enabled ? 'bg-[#C8A8E9]' : 'bg-slate-300'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${enabled ? 'transform translate-x-6' : ''}`}></div>
      </div>
    </label>
  </div>
);

interface SettingsSelectProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SettingsSelect: React.FC<SettingsSelectProps> = ({ icon, label, description, options, value, onChange }) => (
  <div className="flex items-center justify-between bg-white/50 p-3 rounded-xl shadow-sm">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-[#F3DCDC] rounded-full flex items-center justify-center mr-3">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-slate-700">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-1 bg-white/70 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C8A8E9] focus:outline-none text-sm"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);


interface SettingsLinkProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const SettingsLink: React.FC<SettingsLinkProps> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex items-center justify-between bg-white/50 p-3 rounded-xl shadow-sm w-full text-left">
        <div className="flex items-center">
            <div className="w-10 h-10 bg-[#F3DCDC] rounded-full flex items-center justify-center mr-3">
                {icon}
            </div>
            <p className="font-semibold text-slate-700">{label}</p>
        </div>
        <ChevronRight size={20} className="text-slate-400" />
    </button>
);


const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-1 pt-4 pb-1">{title}</h2>
);

export const SettingsPage: React.FC = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [theme, setTheme] = useState('System');
    const [syncFrequency, setSyncFrequency] = useState('Real-time');

    const iconClass = "w-5 h-5 text-[#A38ABF]";

    return (
        <div className="flex flex-col h-full text-slate-700">
            <h1 className="text-2xl font-bold text-center mb-6">Settings</h1>
            <div className="flex-1 space-y-2 overflow-y-auto">

                <SectionHeader title="General" />
                <SettingsToggle 
                    icon={<Bell className={iconClass} />}
                    label="Notifications"
                    description="Receive alerts and updates"
                    enabled={notificationsEnabled}
                    onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
                />

                <SectionHeader title="Appearance" />
                <SettingsSelect
                    icon={<Palette className={iconClass} />}
                    label="Theme"
                    description="Choose your app theme"
                    options={['Light', 'Dark', 'System']}
                    value={theme}
                    onChange={setTheme}
                />
                
                <SectionHeader title="Data" />
                 <SettingsSelect
                    icon={<RefreshCcw className={iconClass} />}
                    label="Data Sync"
                    description="Sync frequency with devices"
                    options={['Real-time', 'Every 5 mins', 'Manual']}
                    value={syncFrequency}
                    onChange={setSyncFrequency}
                />
                
                <SectionHeader title="Account & More" />
                <SettingsLink 
                    icon={<User className={iconClass} />}
                    label="Manage Account"
                    onClick={() => alert('Navigate to Account Management')}
                />
                <SettingsLink 
                    icon={<FileText className={iconClass} />}
                    label="Privacy Policy"
                    onClick={() => alert('Navigate to Privacy Policy')}
                />

            </div>
        </div>
    );
};

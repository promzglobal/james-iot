import React from 'react';
import { User, Mail, Calendar, LogOut } from 'lucide-react';

const InfoCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-white/50 p-3 rounded-xl shadow-sm">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="font-semibold text-slate-700">{value}</p>
  </div>
);

export const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col h-full text-slate-700">
      <h1 className="text-2xl font-bold text-center mb-6">My Profile</h1>
      
      <div className="flex flex-col items-center space-y-2 mb-6">
        <div className="w-24 h-24 rounded-full bg-[#C8A8E9] flex items-center justify-center shadow-md">
          <User size={48} className="text-white" />
        </div>
        <h2 className="text-xl font-bold">Jane Doe</h2>
        <p className="text-sm text-slate-500 flex items-center">
          <Mail size={14} className="mr-1.5" />
          jane.doe@example.com
        </p>
      </div>

      <div className="space-y-3 flex-1">
        <InfoCard label="Member Since" value="January 1, 2024" />
        <InfoCard label="Subscription" value="Premium Plan" />
        <InfoCard label="Last Login" value={new Date().toLocaleDateString()} />
      </div>

      <button
        onClick={() => alert('Log Out clicked!')}
        className="w-full mt-4 bg-[#F5BCBA] text-white font-bold py-3 rounded-lg flex items-center justify-center transition-all hover:bg-[#F3A9A3] shadow-md hover:shadow-lg"
      >
        <LogOut className="w-5 h-5 mr-2" />
        LOG OUT
      </button>
    </div>
  );
};
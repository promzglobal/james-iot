import React from 'react';
import { Home, UserCircle, AlarmClock, Settings } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  const color = active ? 'text-[#C8A8E9]' : 'text-slate-400';
  return (
    <button className={`flex flex-col items-center space-y-1 ${color} hover:text-[#C8A8E9] transition-colors`} onClick={onClick}>
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

interface BottomNavProps {
    activePage: string;
    onNavChange: (page: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavChange }) => {
    const navItems = [
        { icon: <Home />, label: 'HOME' },
        { icon: <UserCircle />, label: 'PROFILE' },
        { icon: <AlarmClock />, label: 'ALARM' },
        { icon: <Settings />, label: 'SETTINGS' },
    ];

  return (
    <div className="flex justify-around items-center bg-white/50 backdrop-blur-sm p-2 border-t border-white/20">
      {navItems.map(item => (
          <NavItem 
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activePage === item.label}
            onClick={() => onNavChange(item.label)}
          />
      ))}
    </div>
  );
};
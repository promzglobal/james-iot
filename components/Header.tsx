import React from 'react';

interface HeaderProps {
  date: string;
}

export const Header: React.FC<HeaderProps> = ({ date }) => {
  return (
    <div className="bg-[#C3C7F3] p-4 rounded-xl shadow-sm">
      <div className="flex items-baseline justify-center space-x-3">
        <h1 className="text-2xl font-bold text-white tracking-widest">TODAY</h1>
        <p className="text-lg font-semibold text-white tracking-wider">{date.toUpperCase()}</p>
      </div>
    </div>
  );
};
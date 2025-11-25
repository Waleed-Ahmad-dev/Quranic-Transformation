import React from 'react';
import { Home, StickyNote, Download } from 'lucide-react';

interface BottomNavProps {
  activeView: string;
  onChangeView: (view: any) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onChangeView }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'notes', icon: StickyNote, label: 'Notes' },
    { id: 'downloads', icon: Download, label: 'Saved' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto">
      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-emerald-900/10 rounded-full px-2 py-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-emerald-900 text-white shadow-lg shadow-emerald-900/20 scale-105' 
                  : 'text-slate-400 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <span className="absolute -bottom-8 text-[10px] font-bold text-emerald-900 bg-white px-2 py-0.5 rounded-md shadow-sm opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
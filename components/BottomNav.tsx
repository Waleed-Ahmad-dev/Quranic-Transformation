import React from "react";
import { Home, StickyNote, Download } from "lucide-react";

interface BottomNavProps {
  activeView: string;
  onChangeView: (view: any) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onChangeView }) => {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "notes", icon: StickyNote, label: "Notes" },
    { id: "downloads", icon: Download, label: "Saved" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto">
      <div className="flex items-center gap-2 bg-white backdrop-blur-xl border border-emerald-200 shadow-2xl shadow-emerald-500/10 rounded-2xl px-4 py-3">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`relative flex items-center justify-center gap-3 min-h-[60px] min-w-[100px] px-4 rounded-xl transition-all duration-300 border ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 scale-105 border-transparent"
                  : "text-emerald-600 hover:text-emerald-700 bg-white border-emerald-200 hover:border-emerald-500/30 focus:ring-2 focus:ring-emerald-500/50"
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-base font-bold font-display tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/static-components */
"use client";
import React from "react";
import { Home, StickyNote, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeView: string;
  onChangeView: (view: any) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onChangeView }) => {
  const NavItem = ({ id, icon: Icon, label }: any) => {
    const isActive = activeView === id;
    return (
      <button
        onClick={() => onChangeView(id)}
        className={cn(
          "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
          isActive ? "text-emerald-500" : "text-zinc-500 hover:text-zinc-300"
        )}
      >
        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-[10px] font-medium">{label}</span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-zinc-950 border-t border-zinc-800 lg:hidden safe-area-pb">
      <div className="grid grid-cols-3 h-full">
        <NavItem id="home" icon={Home} label="Home" />
        <NavItem id="notes" icon={StickyNote} label="Notes" />
        <NavItem id="downloads" icon={Download} label="Saved" />
      </div>
    </div>
  );
};

export default BottomNav;
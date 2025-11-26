/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/static-components */
"use client";

import React from "react";
import {
  Home,
  StickyNote,
  Download,
  BookOpen,
  X,
  ChevronRight,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  onChangeView: (view: any) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  savedNotesCount: number;
  downloadsCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeView,
  onChangeView,
  activeCategory,
  onSelectCategory,
  savedNotesCount,
  downloadsCount,
}) => {
  const NavItem = ({ id, label, icon: Icon, count }: any) => {
    const isActive = activeView === id;
    return (
      <button
        onClick={() => {
          onChangeView(id);
          onClose(); // Close on mobile click
        }}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
          isActive
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} />
          <span>{label}</span>
        </div>
        {count > 0 && (
          <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-300">
            {count}
          </span>
        )}
      </button>
    );
  };

  const content = (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-zinc-800 w-[280px]">
      {/* Brand */}
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-500">
          <BookOpen className="w-6 h-6" />
          <span className="font-bold text-lg tracking-tight text-zinc-100">
            Quranic<span className="text-emerald-500">Transform</span>
          </span>
        </div>
        <button onClick={onClose} className="lg:hidden text-zinc-500">
          <X size={20} />
        </button>
      </div>

      {/* Main Nav */}
      <div className="p-4 space-y-1">
        <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Menu
        </p>
        <NavItem id="home" label="Syllabus" icon={Home} />
        <NavItem
          id="notes"
          label="Reflections"
          icon={StickyNote}
          count={savedNotesCount}
        />
        <NavItem
          id="downloads"
          label="Offline"
          icon={Download}
          count={downloadsCount}
        />
      </div>

      {/* Categories (Desktop only primarily, handled in header on mobile) */}
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Modules
        </p>
        <div className="space-y-1">
          {CATEGORIES.filter((c) => c !== "All").map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                onChangeView("home");
                onClose();
              }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group",
                activeCategory === cat && activeView === "home"
                  ? "text-zinc-100 bg-zinc-900"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <span>{cat}</span>
              {activeCategory === cat && activeView === "home" && (
                <ChevronRight size={14} className="text-emerald-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800 text-xs text-zinc-600 text-center">
        v3.0 Dark Mode
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar: Always visible on large screens */}
      <div className="hidden lg:block sticky top-0 h-screen overflow-hidden">
        {content}
      </div>

      {/* Mobile Sidebar: Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="absolute left-0 top-0 h-full animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
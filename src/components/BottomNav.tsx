/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Home, StickyNote, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeView: string;
  onChangeView: (view: any) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onChangeView }) => {
  const NavItem = ({ id, icon: Icon, label }: any) => {
    const isActive = activeView === id;

    return (
      <button
        onClick={() => {
          onChangeView(id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={cn(
          "flex flex-col items-center justify-center w-full h-full space-y-1 relative group cursor-pointer active:scale-95 transition-transform duration-100",
          isActive ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
        )}
      >
        {/* Active Background Glow */}
        {isActive && (
          <motion.div
            layoutId="nav-bg"
            className="absolute inset-0 bg-linear-to-t from-emerald-500/10 to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Top Indicator */}
        {isActive && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute top-0 w-12 h-[3px] rounded-b-full bg-emerald-500 shadow-[0_2px_12px_rgba(16,185,129,0.6)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        {/* Icon wrapper for animation */}
        <div className="relative z-10">
          <Icon
            size={24}
            strokeWidth={isActive ? 2.5 : 2}
            className={cn(
              "transition-all duration-300",
              isActive && "drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
            )}
          />
        </div>

        <span
          className={cn(
            "text-[10px] font-medium tracking-tight relative z-10 transition-colors duration-200",
            isActive ? "text-emerald-400 font-semibold" : "text-zinc-500"
          )}
        >
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-18 lg:hidden safe-area-pb">
      {/* Background with advanced blur and border */}
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800/80 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.5)]" />

      <div className="grid grid-cols-3 h-full relative z-10">
        <NavItem id="home" icon={Home} label="Syllabus" />
        <NavItem id="notes" icon={StickyNote} label="Reflections" />
        <NavItem id="downloads" icon={Download} label="Library" />
      </div>
    </div>
  );
};

export default BottomNav;
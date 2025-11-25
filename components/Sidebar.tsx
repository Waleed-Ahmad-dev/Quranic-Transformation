import React from "react";
import {
  Home,
  StickyNote,
  Download,
  Info,
  X,
  User,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import { CATEGORIES, getCategoryTheme } from "../constants";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  onChangeView: (view: string) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
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
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[340px] glass z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col border border-white/10 backdrop-blur-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Profile / Header Section */}
        <div className="glass-dark p-8 pb-8 pt-16 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 text-indigo-300 hover:text-white glass rounded-full border border-white/10 shadow-sm transition-all duration-300 focus:ring-2 focus:ring-indigo-500/50"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 border border-white/10">
              <User size={32} />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl text-white leading-tight tracking-tight">
                Student
              </h2>
              <p className="text-indigo-200 text-base font-semibold">
                Qur'anic Transform
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-8 px-6">
          <div className="mb-10">
            <div className="px-3 text-sm font-bold text-indigo-300 uppercase tracking-widest mb-4">
              Library
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  onChangeView("home");
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                  activeView === "home"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg border-transparent"
                    : "text-indigo-200 hover:text-white glass border-white/10 hover:border-indigo-500/30 focus:ring-2 focus:ring-indigo-500/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Home size={24} strokeWidth={2.5} />
                  <span className="font-display font-bold text-lg tracking-tight">
                    Syllabus
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  onChangeView("notes");
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                  activeView === "notes"
                    ? "bg-amber-500/20 text-amber-300 font-display font-bold border-amber-500/30"
                    : "text-indigo-200 hover:text-white glass border-white/10 hover:border-indigo-500/30 focus:ring-2 focus:ring-indigo-500/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <StickyNote
                    size={24}
                    strokeWidth={2.5}
                    className={activeView === "notes" ? "text-amber-300" : ""}
                  />
                  <span className="font-display font-bold text-lg tracking-tight">
                    My Notes
                  </span>
                </div>
                {savedNotesCount > 0 && (
                  <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-lg text-base font-bold min-w-[28px] text-center border border-amber-500/30">
                    {savedNotesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  onChangeView("downloads");
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
                  activeView === "downloads"
                    ? "bg-blue-500/20 text-blue-300 font-display font-bold border-blue-500/30"
                    : "text-indigo-200 hover:text-white glass border-white/10 hover:border-indigo-500/30 focus:ring-2 focus:ring-indigo-500/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Download
                    size={24}
                    strokeWidth={2.5}
                    className={
                      activeView === "downloads" ? "text-blue-300" : ""
                    }
                  />
                  <span className="font-display font-bold text-lg tracking-tight">
                    Offline
                  </span>
                </div>
                {downloadsCount > 0 && (
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-base font-bold min-w-[28px] text-center border border-blue-500/30">
                    {downloadsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div>
            <div className="px-3 flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-indigo-300 uppercase tracking-widest">
                Modules
              </span>
              <LayoutGrid size={18} className="text-indigo-400" />
            </div>

            <div className="space-y-2">
              {CATEGORIES.map((category) => {
                const theme = getCategoryTheme(category);
                const isActive =
                  activeCategory === category && activeView === "home";

                return (
                  <button
                    key={category}
                    onClick={() => {
                      onSelectCategory(category);
                      onChangeView("home");
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all text-base border group ${
                      isActive
                        ? "bg-indigo-500/20 text-white border-indigo-500/30"
                        : "text-indigo-200 hover:text-white glass border-white/10 hover:border-indigo-500/30 focus:ring-2 focus:ring-indigo-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full transition-all border ${
                          isActive
                            ? theme.accent +
                              " ring-2 ring-offset-2 ring-indigo-500/20 border-white"
                            : "bg-indigo-500/30 border-indigo-400 group-hover:bg-indigo-400"
                        }`}
                      ></div>
                      <span
                        className={`font-display font-semibold tracking-tight ${
                          isActive ? "font-bold" : ""
                        }`}
                      >
                        {category}
                      </span>
                    </div>
                    {isActive && (
                      <ChevronRight size={18} className="text-indigo-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/10 glass-dark shrink-0">
          <div className="flex items-center gap-3 text-indigo-300 text-lg mb-2 font-display font-semibold">
            <Info size={20} />
            <span>About</span>
          </div>
          <p className="text-sm text-indigo-200 font-display font-medium">
            Qur'anic Transform v2.2 • Mobile Edition
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
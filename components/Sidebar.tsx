import React from 'react';
import { Home, StickyNote, Download, Info, X, BookOpen, User, Layers, ChevronRight, LayoutGrid } from 'lucide-react';
import { CATEGORIES, getCategoryTheme } from '../constants';

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
  downloadsCount 
}) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Profile / Header Section */}
        <div className="bg-slate-50 p-6 pb-6 pt-12 border-b border-slate-100">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-full shadow-sm transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <User size={28} />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-800 leading-tight">Student</h2>
              <p className="text-slate-500 text-xs font-medium">Qur'anic Transform</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          
          <div className="mb-8">
             <div className="px-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Library</div>
             <div className="space-y-1">
                <button 
                    onClick={() => { onChangeView('home'); onClose(); }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all ${activeView === 'home' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                    <div className="flex items-center gap-3">
                        <Home size={20} strokeWidth={2.5} />
                        <span className="font-semibold text-sm">Syllabus</span>
                    </div>
                </button>

                <button 
                    onClick={() => { onChangeView('notes'); onClose(); }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all ${activeView === 'notes' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                    <div className="flex items-center gap-3">
                        <StickyNote size={20} strokeWidth={2.5} className={activeView === 'notes' ? "text-amber-700" : ""} />
                        <span className="font-semibold text-sm">My Notes</span>
                    </div>
                    {savedNotesCount > 0 && (
                    <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded-md text-xs font-bold min-w-[24px] text-center">
                        {savedNotesCount}
                    </span>
                    )}
                </button>

                <button 
                    onClick={() => { onChangeView('downloads'); onClose(); }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all ${activeView === 'downloads' ? 'bg-blue-100 text-blue-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                    <div className="flex items-center gap-3">
                        <Download size={20} strokeWidth={2.5} className={activeView === 'downloads' ? "text-blue-700" : ""} />
                        <span className="font-semibold text-sm">Offline</span>
                    </div>
                    {downloadsCount > 0 && (
                    <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-md text-xs font-bold min-w-[24px] text-center">
                        {downloadsCount}
                    </span>
                    )}
                </button>
             </div>
          </div>

          <div>
             <div className="px-2 flex items-center justify-between mb-3">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modules</span>
                 <LayoutGrid size={14} className="text-slate-300" />
             </div>
          
             <div className="space-y-1">
                {CATEGORIES.map(category => {
                    const theme = getCategoryTheme(category);
                    const isActive = activeCategory === category && activeView === 'home';
                    
                    return (
                        <button
                            key={category}
                            onClick={() => { onSelectCategory(category); onChangeView('home'); onClose(); }}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-sm group ${isActive ? 'bg-slate-50 text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full transition-all ${isActive ? theme.accent + ' ring-2 ring-offset-2 ring-slate-100' : 'bg-slate-200 group-hover:bg-slate-300'}`}></div>
                                <span className={`font-medium ${isActive ? 'font-bold' : ''}`}>{category}</span>
                            </div>
                            {isActive && <ChevronRight size={14} className="text-slate-400" />}
                        </button>
                    );
                })}
             </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-white shrink-0">
           <div className="flex items-center gap-2 text-slate-400 text-sm mb-1 font-medium">
             <Info size={16} />
             <span>About</span>
           </div>
           <p className="text-[11px] text-slate-400">
             Qur'anic Transform v2.2 • Mobile Edition
           </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
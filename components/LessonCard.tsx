import React from 'react';
import { Clock, BookOpen, ChevronRight, CheckCircle, StickyNote } from 'lucide-react';
import { Lesson, getCategoryTheme } from '../constants';

interface LessonCardProps {
  lesson: Lesson;
  hasNote: boolean;
  isDownloaded: boolean;
  onClick: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, hasNote, isDownloaded, onClick }) => {
  const theme = getCategoryTheme(lesson.part);

  return (
    <button 
      onClick={onClick}
      className="group relative w-full text-left bg-white rounded-3xl p-1 mb-4 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 ease-out active:scale-[0.98]"
    >
      <div className="flex items-center gap-4 p-4 rounded-[1.25rem] bg-gradient-to-br from-white to-slate-50 border border-slate-100/80">
        
        {/* Gradient Icon Box */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold font-serif text-white shadow-lg bg-gradient-to-br ${theme.gradient} ${theme.shadow} shrink-0`}>
          {lesson.id}
        </div>

        <div className="flex-1 min-w-0 py-1">
          {/* Top Label */}
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${theme.badge}`}>
              {lesson.part}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1.5 truncate pr-2 font-serif">
            {lesson.title}
          </h3>
          
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <BookOpen size={12} className={theme.icon} />
              {lesson.surahName}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>{lesson.hours}h</span>
            
            {(hasNote || isDownloaded) && (
              <div className="flex items-center gap-1 ml-auto">
                {hasNote && <StickyNote size={14} className="text-amber-500 fill-amber-500" />}
                {isDownloaded && <CheckCircle size={14} className="text-emerald-500 fill-emerald-500" />}
              </div>
            )}
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-300 shadow-sm border border-slate-50 group-hover:text-emerald-600 transition-colors">
          <ChevronRight size={16} />
        </div>
      </div>
    </button>
  );
};

export default LessonCard;
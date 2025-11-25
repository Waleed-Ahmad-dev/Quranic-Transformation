import React from "react";
import { BookOpen, ChevronRight, CheckCircle, StickyNote } from "lucide-react";
import { Lesson, getCategoryTheme } from "../constants";

interface LessonCardProps {
  lesson: Lesson;
  hasNote: boolean;
  isDownloaded: boolean;
  onClick: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  hasNote,
  isDownloaded,
  onClick,
}) => {
  const theme = getCategoryTheme(lesson.part);

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left bg-white rounded-2xl p-1 mb-5 border border-emerald-200 hover:border-emerald-500/50 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 ease-out active:scale-[0.98] focus:ring-2 focus:ring-emerald-500/50"
    >
      <div className="flex items-center gap-5 p-5 rounded-xl bg-white">
        {/* Green Gradient Icon Box */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold font-display text-white shadow-lg ${theme.gradient}`}
        >
          {lesson.id}
        </div>

        <div className="flex-1 min-w-0 py-2">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg border ${theme.badge} border-emerald-500/20`}
            >
              {lesson.part}
            </span>
          </div>

          {/* Topic Name */}
          <h3 className="text-xl font-display font-bold text-slate-800 leading-tight mb-2 pr-2 tracking-tight">
            {lesson.topicName}
          </h3>

          {/* Surah Reference */}
          <p className="text-sm text-emerald-700 font-medium mb-2">
            {lesson.surahReference}
          </p>

          <div className="flex items-center gap-4 text-sm text-emerald-600 font-semibold">
            <span className="flex items-center gap-2">
              <BookOpen size={16} className={theme.icon} />
              {lesson.surahName}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500/30"></span>
            <span>{lesson.hours} hours</span>

            {(hasNote || isDownloaded) && (
              <div className="flex items-center gap-2 ml-auto">
                {hasNote && (
                  <StickyNote
                    size={18}
                    className="text-amber-500 fill-amber-500/20"
                  />
                )}
                {isDownloaded && (
                  <CheckCircle
                    size={18}
                    className="text-emerald-500 fill-emerald-500/20"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-200 group-hover:text-emerald-700 group-hover:border-emerald-500/30 transition-all duration-300">
          <ChevronRight size={20} />
        </div>
      </div>
    </button>
  );
};

export default LessonCard;
"use client";
import React from "react";
import { BookOpen, ChevronRight, CheckCircle, StickyNote } from "lucide-react";
import { Lesson, getCategoryTheme } from "@/lib/constants";
// Font Import
import { Gulzar } from "next/font/google";

const gulzar = Gulzar({
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
});

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
      className="group relative w-full text-left bg-white rounded-2xl p-1 mb-3 border border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
    >
      <div className="flex items-center gap-4 p-3 rounded-xl bg-white">
        {/* Green Icon Box */}
        <div
          className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-sm ${theme.gradient}`}
        >
          {lesson.id}
        </div>

        <div className="flex-1 min-w-0 py-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${theme.badge}`}
            >
              {lesson.part}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-800 leading-tight mb-1 pr-2 line-clamp-1">
            {lesson.topicName}
          </h3>

          {/* URDU Text Implementation */}
          <div
            className={`${gulzar.className} text-emerald-700 text-[1.3em] leading-relaxed text-right w-full`}
            dir="rtl"
          >
            {lesson.urduTitle}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-2">
            <span className="flex items-center gap-1">
              <BookOpen size={12} className={theme.icon} />
              {lesson.surahName}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>{lesson.hours}h</span>

            {(hasNote || isDownloaded) && (
              <div className="flex items-center gap-1 ml-auto">
                {hasNote && (
                  <StickyNote
                    size={14}
                    className="text-amber-500 fill-amber-500/20"
                  />
                )}
                {isDownloaded && (
                  <CheckCircle
                    size={14}
                    className="text-emerald-500 fill-emerald-500/20"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-6 h-6 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-200 group-hover:text-emerald-600 group-hover:border-emerald-300 transition-colors">
          <ChevronRight size={14} />
        </div>
      </div>
    </button>
  );
};

export default LessonCard;
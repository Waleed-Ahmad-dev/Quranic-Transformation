import React, { useState } from "react";
import {
  X,
  Clock,
  BookOpen,
  Download,
  Edit3,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Lesson, getCategoryTheme, getDownloadUrl } from "../constants";

interface LessonDetailProps {
  lesson: Lesson;
  hasNote: boolean;
  isDownloaded: boolean;
  onClose: () => void;
  onOpenNote: () => void;
  onDownload: () => void;
  onOpenPdf: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({
  lesson,
  hasNote,
  isDownloaded,
  onClose,
  onOpenNote,
  onDownload,
  onOpenPdf,
}) => {
  const theme = getCategoryTheme(lesson.part);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (isDownloaded || downloading) return;
    setDownloading(true);

    // Trigger download
    const link = document.createElement("a");
    link.href = getDownloadUrl(lesson.pdfLink);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      onDownload();
      setDownloading(false);
    }, 1500);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-50 transform transition-transform animate-in slide-in-from-bottom duration-300 glass rounded-t-[3rem] shadow-[0_-20px_60px_rgba(79,70,229,0.3)] overflow-hidden max-h-[92vh] flex flex-col border border-white/10 backdrop-blur-xl">
        {/* Handle Bar */}
        <div className="flex justify-center pt-4 pb-2" onClick={onClose}>
          <div className="w-20 h-2 bg-white/20 rounded-full"></div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-safe">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <span
                className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider border ${theme.badge} border-indigo-500/20 backdrop-blur-sm`}
              >
                {lesson.part}
              </span>
              <h2 className="text-4xl font-display font-bold text-white mt-4 leading-tight tracking-tight">
                {lesson.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-3 glass rounded-full text-indigo-300 hover:bg-red-500/20 border border-white/10 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
            >
              <X size={28} />
            </button>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-8 mb-8 text-lg font-semibold text-indigo-200 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <BookOpen size={22} className="text-indigo-400" />
              <span>{lesson.surahName}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={22} className="text-indigo-400" />
              <span>{lesson.hours} Hours</span>
            </div>
          </div>

          {/* Urdu Title & Desc */}
          <div className="space-y-8 mb-12">
            <div className="text-right">
              <p className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-3">
                Urdu Title
              </p>
              <h3 className="font-urdu text-4xl text-indigo-200 leading-loose font-bold">
                {lesson.urduTitle}
              </h3>
            </div>

            <div className="glass p-8 rounded-3xl border border-white/10">
              <p className="text-indigo-100 leading-relaxed text-xl font-medium">
                {lesson.description}
              </p>
              <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-sm font-bold text-indigo-300 uppercase tracking-wider">
                <span>Verse Range</span>
                <span>{lesson.verses}</span>
              </div>
            </div>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-2 gap-4 pb-8">
            <button
              onClick={onOpenNote}
              className={`col-span-2 py-5 px-6 rounded-2xl font-display font-bold flex items-center justify-center gap-4 transition-all active:scale-95 shadow-lg border ${
                hasNote
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  : "glass text-indigo-200 border-white/10 hover:border-indigo-500/30 hover:text-white focus:ring-2 focus:ring-indigo-500/50"
              }`}
            >
              <Edit3 size={24} />
              {hasNote ? "Edit Reflection" : "Write Reflection"}
              <span className="text-2xl">✍️</span>
            </button>

            {lesson.pdfLink ? (
              <>
                <button
                  onClick={onOpenPdf}
                  className="py-5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-display font-bold flex flex-col items-center justify-center gap-3 shadow-2xl shadow-indigo-500/30 transition-transform active:scale-95 border border-transparent focus:ring-2 focus:ring-indigo-500/50"
                >
                  <FileText size={28} />
                  <span className="text-lg">Read PDF</span>
                </button>
                <button
                  onClick={handleDownload}
                  className={`py-5 px-6 rounded-2xl border font-display font-bold flex flex-col items-center justify-center gap-3 transition-transform active:scale-95 focus:ring-2 focus:ring-indigo-500/50 ${
                    isDownloaded
                      ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-300"
                      : "glass border-white/10 text-indigo-200 hover:border-indigo-500/30 hover:text-white"
                  }`}
                >
                  {downloading ? (
                    <div className="w-8 h-8 border-3 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : isDownloaded ? (
                    <CheckCircle size={28} />
                  ) : (
                    <Download size={28} />
                  )}
                  <span className="text-lg">
                    {isDownloaded ? "Saved" : "Download"}
                  </span>
                </button>
              </>
            ) : (
              <div className="col-span-2 p-6 text-center text-indigo-300 text-lg italic glass rounded-2xl border border-white/10">
                No PDF Material Available
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonDetail;
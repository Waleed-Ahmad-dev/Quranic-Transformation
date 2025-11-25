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
        className="fixed inset-0 bg-emerald-950/70 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-50 transform transition-transform animate-in slide-in-from-bottom duration-300 bg-white rounded-t-[2.5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.3)] overflow-hidden max-h-[92vh] flex flex-col border-2 border-emerald-200">
        {/* Handle Bar */}
        <div className="flex justify-center pt-4 pb-2" onClick={onClose}>
          <div className="w-20 h-2 bg-slate-300 rounded-full"></div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-safe">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <span
                className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider border-2 ${theme.badge} border-emerald-200`}
              >
                {lesson.part}
              </span>
              <h2 className="text-4xl font-bold text-slate-900 mt-4 leading-tight">
                {lesson.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 border-2 border-slate-200 focus:ring-4 focus:ring-emerald-500/30 transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-8 mb-8 text-lg font-semibold text-slate-600 border-b-2 border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <BookOpen size={22} className="text-emerald-600" />
              <span>{lesson.surahName}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={22} className="text-emerald-600" />
              <span>{lesson.hours} Hours</span>
            </div>
          </div>

          {/* Urdu Title & Desc */}
          <div className="space-y-8 mb-12">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
                Urdu Title
              </p>
              <h3 className="font-urdu text-4xl text-emerald-900 leading-loose font-bold">
                {lesson.urduTitle}
              </h3>
            </div>

            <div className="bg-slate-100 p-8 rounded-3xl border-2 border-slate-200">
              <p className="text-slate-700 leading-relaxed text-xl font-medium">
                {lesson.description}
              </p>
              <div className="mt-6 pt-6 border-t-2 border-slate-300 flex justify-between text-sm font-bold text-slate-500 uppercase tracking-wider">
                <span>Verse Range</span>
                <span>{lesson.verses}</span>
              </div>
            </div>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-2 gap-4 pb-8">
            <button
              onClick={onOpenNote}
              className={`col-span-2 py-5 px-6 rounded-2xl font-bold flex items-center justify-center gap-4 transition-all active:scale-95 shadow-lg border-2 ${
                hasNote
                  ? "bg-amber-100 text-amber-900 border-amber-300"
                  : "bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:text-emerald-800 focus:ring-4 focus:ring-emerald-500/30"
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
                  className="py-5 px-6 rounded-2xl bg-[#064E3B] text-white font-bold flex flex-col items-center justify-center gap-3 shadow-2xl shadow-emerald-900/30 transition-transform active:scale-95 border-2 border-emerald-800 focus:ring-4 focus:ring-emerald-500/30"
                >
                  <FileText size={28} />
                  <span className="text-lg">Read PDF</span>
                </button>
                <button
                  onClick={handleDownload}
                  className={`py-5 px-6 rounded-2xl border-2 font-bold flex flex-col items-center justify-center gap-3 transition-transform active:scale-95 focus:ring-4 focus:ring-emerald-500/30 ${
                    isDownloaded
                      ? "border-emerald-200 bg-emerald-100 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-500"
                  }`}
                >
                  {downloading ? (
                    <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
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
              <div className="col-span-2 p-6 text-center text-slate-500 text-lg italic bg-slate-100 rounded-2xl border-2 border-slate-200">
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
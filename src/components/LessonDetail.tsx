"use client";
import React from "react";
import {
  X,
  Clock,
  Download,
  FileText,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Lesson, getDownloadUrl } from "@/lib/constants";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const handleForceDownload = () => {
    onDownload();
    if (lesson.presentationLink) {
      const link = document.createElement("a");
      link.href = getDownloadUrl(lesson.presentationLink);
      link.download = `${lesson.topicName}.pdf`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      {/* CRITICAL FIX: [&>button]:hidden removes the default Close (X) provided by Radix UI
         This prevents the duplicate "X" button issue.
      */}
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100 max-w-2xl p-0 gap-0 overflow-hidden outline-none [&>button]:hidden shadow-2xl shadow-black/80">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-start bg-zinc-900/30 backdrop-blur-sm">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 rounded-md">
                {lesson.part}
              </Badge>
              <Badge
                variant="outline"
                className="border-zinc-700 text-zinc-400"
              >
                ID: {lesson.id}
              </Badge>
            </div>
            <h2 className="text-xl md:text-2xl font-bold leading-tight pr-4 text-white">
              {lesson.topicName}
            </h2>
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {lesson.hours}h
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span>{lesson.surahName}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all border border-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar bg-zinc-950">
          <div className="bg-linear-to-l from-emerald-950/20 to-zinc-900/20 p-6 rounded-xl border border-zinc-800/50">
            {/* Urdu Title - Prominent */}
            <h3 className="font-gulzar text-3xl md:text-4xl text-right text-emerald-400 mb-6 leading-normal drop-shadow-md">
              {lesson.urduTitle}
            </h3>
            <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent mb-6"></div>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
              {lesson.detailedDescription || lesson.description}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-zinc-900/50 border-t border-zinc-800 flex flex-col sm:flex-row gap-3 backdrop-blur-md">
          <Button
            onClick={onOpenNote}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-900/20 h-11"
          >
            {hasNote ? (
              <span className="flex items-center gap-2">
                <FileText size={16} /> Edit Reflection
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles size={16} /> Add Reflection
              </span>
            )}
          </Button>

          {lesson.presentationLink && (
            <>
              <Button
                onClick={onOpenPdf}
                variant="secondary"
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 h-11"
              >
                <FileText className="mr-2 h-4 w-4" /> Read PDF
              </Button>

              <Button
                onClick={handleForceDownload}
                variant="outline"
                className={`flex-1 border-zinc-700 h-11 ${
                  isDownloaded
                    ? "text-emerald-500 border-emerald-500/50 bg-emerald-500/10"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                }`}
                disabled={isDownloaded}
              >
                {isDownloaded ? (
                  <>
                    {" "}
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Saved{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <Download className="mr-2 h-4 w-4" /> Download{" "}
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonDetail;
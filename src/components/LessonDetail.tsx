"use client";
import React from "react";
import { X, Clock, Download, FileText, CheckCircle2 } from "lucide-react";
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
    // 1. Trigger the logic to update state (mark as downloaded icon)
    onDownload();

    // 2. Force browser download
    if (lesson.presentationLink) {
      const link = document.createElement("a");
      link.href = getDownloadUrl(lesson.presentationLink);
      link.download = `${lesson.topicName}.pdf`; // Suggest filename
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      {/* UI FIX: [&>button]:hidden removes the default Close (X) button provided by 
         shadcn/radix-ui, preventing the "Duplicate X" issue.
      */}
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-2xl p-0 gap-0 overflow-hidden [&>button]:hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-start bg-zinc-900/50">
          <div className="space-y-2">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
              {lesson.part}
            </Badge>
            <h2 className="text-xl font-bold leading-tight pr-4">
              {lesson.topicName}
            </h2>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Clock size={14} /> <span>{lesson.hours}h</span>
              <span>•</span>
              <span>{lesson.surahName}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="bg-zinc-950/50 p-6 rounded-xl border border-zinc-800/50">
            {/* URDU FONT APPLIED HERE */}
            <h3 className="font-gulzar text-3xl text-right text-emerald-400 mb-4 leading-normal">
              {lesson.urduTitle}
            </h3>
            <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
              {lesson.detailedDescription || lesson.description}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onOpenNote}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
          >
            {hasNote ? "Edit Reflection" : "Add Reflection"}
          </Button>

          {lesson.presentationLink && (
            <Button
              onClick={onOpenPdf}
              variant="outline"
              className="flex-1 border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:text-white"
            >
              <FileText className="mr-2 h-4 w-4" /> View PDF
            </Button>
          )}

          {lesson.presentationLink && (
            <Button
              onClick={handleForceDownload}
              variant={isDownloaded ? "secondary" : "outline"}
              className="flex-1 border-zinc-700 text-zinc-200"
              disabled={isDownloaded}
            >
              {isDownloaded ? (
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {isDownloaded ? "Saved" : "Download"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonDetail;
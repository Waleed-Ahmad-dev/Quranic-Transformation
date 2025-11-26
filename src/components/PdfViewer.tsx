"use client";
import React from "react";
import { Download, X } from "lucide-react";
import { Lesson, getEmbedUrl, getDownloadUrl } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PdfViewerProps {
  lesson: Lesson;
  onClose: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ lesson, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-50/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-4xl h-[90vh] bg-white/90 backdrop-blur-lg border-slate-200 shadow-lg shadow-emerald-100/50 rounded-2xl overflow-hidden flex flex-col">
        <CardHeader className="bg-linear-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 border-b border-emerald-500/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white truncate">
              {lesson.topicName}
            </CardTitle>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 bg-white/20 hover:bg-white/30 text-white hover:scale-105 transition-all duration-200 rounded-xl border border-white/20"
                asChild
              >
                <a
                  href={getDownloadUrl(lesson.presentationLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download
                    size={18}
                    className="hover:scale-110 transition-transform"
                  />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-9 w-9 bg-white/20 hover:bg-red-400/30 text-white hover:scale-105 transition-all duration-200 rounded-xl border border-white/20"
              >
                <X size={18} className="hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 bg-linear-to-br from-slate-50 to-emerald-50/30">
          <iframe
            src={getEmbedUrl(lesson.presentationLink)}
            className="w-full h-full border-0"
            title={`PDF Viewer - ${lesson.topicName}`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PdfViewer;
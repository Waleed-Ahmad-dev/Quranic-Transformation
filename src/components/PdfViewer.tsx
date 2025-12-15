"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  ExternalLink,
  Download,
  FileText,
  Loader2,
  Maximize2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Lesson, getEmbedUrl, getDownloadUrl } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface PdfViewerProps {
  lesson: Lesson;
  onClose: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ lesson, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Lock body scroll to prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleOpenExternal = () => {
    window.open(getDownloadUrl(lesson.presentationLink), "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-60 flex flex-col bg-zinc-950/95 backdrop-blur-md"
    >
      {/* --- Toolbar --- */}
      <header className="flex items-center justify-between px-4 py-3 md:px-6 bg-zinc-900 border-b border-zinc-800 shadow-lg z-20">
        {/* Left: Document Info */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-zinc-100 truncate max-w-[150px] md:max-w-md">
                {lesson.topicName}
              </h3>
              <Badge
                variant="secondary"
                className="hidden md:flex h-5 px-1.5 text-[10px] bg-zinc-800 text-zinc-400"
              >
                PDF
              </Badge>
            </div>
            <p className="text-xs text-zinc-500">Presentation Slides</p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800 hidden md:flex"
                  onClick={handleOpenExternal}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download / Open Original</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800 hidden md:flex"
                  onClick={handleOpenExternal}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open in New Tab</TooltipContent>
            </Tooltip>

            <div className="h-6 w-px bg-zinc-800 mx-1 hidden md:block" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-9 w-9 rounded-full text-zinc-400 hover:text-white hover:bg-red-500/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Close Reader</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      {/* --- Viewer Content --- */}
      <div className="flex-1 relative w-full h-full bg-zinc-950 flex flex-col items-center justify-center overflow-hidden p-0 md:p-6 lg:p-8">
        {/* Loader State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-0">
            <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
            <p className="text-sm text-zinc-500 animate-pulse">
              Loading Document...
            </p>
          </div>
        )}

        {/* Iframe Container */}
        <div className="relative w-full h-full md:max-w-6xl md:rounded-xl overflow-hidden bg-white shadow-2xl border border-zinc-800 z-10 transition-opacity duration-500">
          <iframe
            src={getEmbedUrl(lesson.presentationLink)}
            className="w-full h-full border-0 bg-white"
            title={`PDF Viewer - ${lesson.topicName}`}
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Mobile Helper Text (Bottom) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden z-20 pointer-events-none opacity-50">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white flex items-center gap-1 border border-white/10">
            <Maximize2 className="h-3 w-3" /> Pinch to zoom
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PdfViewer;

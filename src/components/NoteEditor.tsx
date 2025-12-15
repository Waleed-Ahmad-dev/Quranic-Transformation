"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  Save,
  Languages,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Lesson } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface NoteEditorProps {
  lesson: Lesson;
  initialContent: string;
  initialIsUrdu: boolean;
  onClose: () => void;
  onSave: (content: string, isUrdu: boolean) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  lesson,
  initialContent,
  initialIsUrdu,
  onClose,
  onSave,
}) => {
  const [content, setContent] = useState(initialContent);
  const [isUrdu, setIsUrdu] = useState(initialIsUrdu);
  const [status, setStatus] = useState<"Saved" | "Saving..." | "Unsaved">("Saved");

  // Auto-save logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content !== initialContent || isUrdu !== initialIsUrdu) {
        setStatus("Saving...");
        onSave(content, isUrdu);
        setTimeout(() => setStatus("Saved"), 800);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [content, isUrdu, initialContent, initialIsUrdu, onSave]);

  const handleDownloadNote = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${lesson.topicName.replace(/\s+/g, "_")}_Reflection.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear your current note?")) {
      setContent("");
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-0 md:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-zinc-950 w-full h-full md:max-w-5xl md:h-[85vh] md:rounded-2xl border border-zinc-800 shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Decorative ambient gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-80" />

        {/* --- Toolbar --- */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-zinc-800 bg-zinc-900/40 backdrop-blur-sm z-10">
          <div className="flex flex-col gap-1">
            <h3 className="text-zinc-100 font-bold text-lg truncate max-w-[200px] md:max-w-md flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              {lesson.topicName}
            </h3>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`text-[10px] font-mono uppercase tracking-wider h-5 px-1.5 border-zinc-800 ${
                  status === "Saving..." ? "text-amber-400 border-amber-500/30" : "text-zinc-500"
                }`}
              >
                {status === "Saving..." ? (
                  <span className="flex items-center gap-1">
                    <Save size={10} className="animate-spin" /> SAVING...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Save size={10} /> SAVED
                  </span>
                )}
              </Badge>
              <span className="text-zinc-700 text-[10px] hidden sm:inline-block">|</span>
              <span className="text-zinc-600 text-[10px] hidden sm:inline-block">
                {content.length} characters
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsUrdu(!isUrdu)}
              className="hidden md:flex bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all h-9"
            >
              <Languages size={15} className="mr-2" />
              {isUrdu ? "English Mode" : "Urdu Mode"}
            </Button>
            
            {/* Mobile Toggle for Language */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsUrdu(!isUrdu)}
              className="md:hidden border-zinc-700 bg-zinc-900 text-zinc-300 h-9 w-9"
            >
              <Languages size={16} />
            </Button>

            <div className="w-px h-6 bg-zinc-800 mx-1 hidden sm:block" />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                   <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClear}
                    className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10 h-9 w-9 hidden sm:flex"
                  >
                    <RotateCcw size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset Note</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownloadNote}
                    className="text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 h-9 w-9"
                  >
                    <Download size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download as .txt</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-9 w-9 ml-1"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* --- Editor Area --- */}
        <div className="flex-1 relative bg-zinc-950/50">
          <textarea
            className={`w-full h-full bg-transparent p-6 md:p-10 resize-none focus:outline-none text-zinc-200 leading-relaxed custom-scrollbar selection:bg-emerald-500/30 transition-all duration-300 ${
              isUrdu
                ? "font-gulzar text-2xl md:text-4xl text-right placeholder:text-zinc-700/50"
                : "font-sans text-base md:text-lg text-left placeholder:text-zinc-700"
            }`}
            placeholder={
              isUrdu
                ? "یہاں اپنی سوچ اور نوٹس لکھیں..."
                : "Start typing your personal reflections here..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            dir={isUrdu ? "rtl" : "ltr"}
            autoFocus
            spellCheck={!isUrdu}
          />
          
          {/* Subtle watermark or indicator */}
          <div className="absolute bottom-4 right-6 pointer-events-none opacity-20 select-none">
             {isUrdu ? (
                <span className="font-gulzar text-4xl text-emerald-500">نوٹس</span>
             ) : (
                <span className="font-sans font-bold text-2xl text-emerald-500">Reflections</span>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
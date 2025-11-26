"use client";
import React, { useState, useEffect } from "react";
import { X, Download, Save } from "lucide-react";
import { Lesson } from "@/lib/constants";
import { Button } from "@/components/ui/button";

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
  const [status, setStatus] = useState("Saved");

  // Auto-save logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content !== initialContent || isUrdu !== initialIsUrdu) {
        setStatus("Saving...");
        onSave(content, isUrdu);
        setTimeout(() => setStatus("Saved"), 500);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [content, isUrdu, initialContent, initialIsUrdu, onSave]);

  const handleDownloadNote = () => {
    // Create a blob from the text content
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${lesson.topicName.replace(/\s+/g, "_")}_Reflection.txt`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 w-full max-w-4xl h-[85vh] rounded-2xl border border-zinc-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900 shrink-0">
          <div className="flex flex-col">
            <h3 className="text-zinc-100 font-medium truncate max-w-[200px] md:max-w-md">
              {lesson.topicName}
            </h3>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              {status === "Saved" ? <Save size={12} /> : null}
              <span>{status}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Note Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownloadNote}
              title="Download Note"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hidden sm:flex"
            >
              <Download size={18} />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsUrdu(!isUrdu)}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs md:text-sm"
            >
              {isUrdu ? "English" : "Urdu"}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="text-zinc-400 hover:text-white ml-2"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Editor Area */}
        <textarea
          className={`flex-1 w-full bg-zinc-950 p-8 resize-none focus:outline-none text-zinc-200 leading-relaxed custom-scrollbar ${
            isUrdu
              ? "font-gulzar text-2xl text-right placeholder:text-right"
              : "font-sans text-base text-left"
          }`}
          placeholder={
            isUrdu ? "یہاں لکھیں..." : "Start typing your reflection here..."
          }
          value={content}
          onChange={(e) => setContent(e.target.value)}
          dir={isUrdu ? "rtl" : "ltr"}
          autoFocus
        />
      </div>
    </div>
  );
};

export default NoteEditor;
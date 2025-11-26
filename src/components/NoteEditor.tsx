/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  Type,
  AlignLeft,
  AlignRight,
  X,
  Download,
  Eye,
  PenTool,
  Save,
  FileText,
} from "lucide-react";
import { Lesson } from "@/lib/constants";

declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

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
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content !== initialContent || isUrdu !== initialIsUrdu) {
        onSave(content, isUrdu);
        setLastSaved(new Date());
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [content, isUrdu, initialContent, initialIsUrdu, onSave]);

  const insertSyntax = (prefix: string, suffix: string = "") => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = textareaRef.current.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);
    const newText =
      prefix === "- " || prefix === "## "
        ? before + prefix + selection + after
        : before + prefix + selection + suffix + after;
    setContent(newText);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const html2canvas = window.html2canvas;
      const { jsPDF } = window.jspdf;

      if (!html2canvas || !jsPDF) {
        alert("PDF libraries not loaded");
        setExporting(false);
        return;
      }

      await document.fonts.ready;
      alert(
        "PDF Export logic runs here. Ensure window.html2canvas is available."
      );
      setExporting(false);
    } catch (error) {
      console.error("PDF Export failed", error);
      setExporting(false);
    }
  };

  const MarkdownRenderer = ({ text, rtl }: { text: string; rtl: boolean }) => {
    const parseFormattedText = (line: string) => {
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-emerald-700">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={i} className="italic text-emerald-600">
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      });
    };

    return (
      <div
        className={`max-w-none ${
          rtl
            ? "font-gulzar text-right text-xl leading-loose"
            : "font-sans text-left leading-relaxed"
        }`}
        dir={rtl ? "rtl" : "ltr"}
      >
        {text.split("\n").map((line, i) => {
          if (!line.trim()) return <div key={i} className="h-4" />;
          if (line.startsWith("## "))
            return (
              <h3
                key={i}
                className="text-2xl font-bold text-slate-800 mt-8 mb-4 border-r-4 border-emerald-500 pr-4 tracking-tight"
              >
                {line.replace("## ", "")}
              </h3>
            );
          if (line.startsWith("- "))
            return (
              <div
                key={i}
                className={`flex gap-3 mb-2 items-start ${
                  rtl ? "flex-row-reverse" : ""
                }`}
              >
                <span className="text-emerald-500 font-bold text-lg leading-none mt-1 shrink-0">
                  •
                </span>
                <span className="text-slate-700">
                  {parseFormattedText(line.replace("- ", ""))}
                </span>
              </div>
            );
          return (
            <p key={i} className="mb-3 text-slate-700">
              {parseFormattedText(line)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-50/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg shadow-emerald-100 border border-slate-200 w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-linear-to-r from-emerald-50 to-teal-50">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-emerald-800 truncate">
              {lesson.topicName}
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <FileText size={16} />
                <span>Notes Editor</span>
              </div>
              {lastSaved && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Save size={14} />
                  <span>Saved {lastSaved.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                exporting
                  ? "bg-slate-100 text-slate-500 border-slate-200"
                  : "bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600 hover:shadow-md hover:scale-[1.02] active:scale-95"
              }`}
            >
              {exporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>Export PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 hover:bg-slate-50 hover:shadow-sm hover:scale-[1.02] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        {activeTab === "write" && (
          <div className="flex items-center gap-4 px-6 py-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
              {[
                { icon: Bold, syntax: ["**", "**"], label: "Bold" },
                { icon: Italic, syntax: ["*", "*"], label: "Italic" },
                { icon: List, syntax: ["- "], label: "List" },
                { icon: Type, syntax: ["## "], label: "Heading" },
              ].map(({ icon: Icon, syntax, label }) => (
                <button
                  key={label}
                  onClick={() => insertSyntax(syntax[0], syntax[1])}
                  className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                  title={label}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-slate-300" />

            <button
              onClick={() => setIsUrdu(!isUrdu)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                isUrdu
                  ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {isUrdu ? <AlignRight size={18} /> : <AlignLeft size={18} />}
              {isUrdu ? "اردو" : "English"}
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-linear-to-br from-slate-50/50 to-emerald-50/30">
          {activeTab === "write" ? (
            <textarea
              ref={textareaRef}
              dir={isUrdu ? "rtl" : "ltr"}
              className={`w-full h-full p-8 resize-none focus:outline-none bg-transparent text-slate-700 leading-relaxed transition-all duration-200 ${
                isUrdu
                  ? "font-gulzar text-xl text-right leading-loose"
                  : "font-sans text-base leading-relaxed"
              } placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/30 rounded-lg`}
              placeholder={
                isUrdu
                  ? "یہاں اپنے نوٹس لکھیں..."
                  : "Start writing your reflections here..."
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
            />
          ) : (
            <div className="w-full h-full p-8 overflow-y-auto">
              {content.trim() ? (
                <MarkdownRenderer text={content} rtl={isUrdu} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <FileText size={48} className="mb-4 opacity-50" />
                  <p className="text-lg italic">
                    {isUrdu
                      ? "ابھی تک کچھ نہیں لکھا گیا"
                      : "Nothing to preview yet"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Tabs */}
        <div className="bg-white/90 backdrop-blur-sm border-t border-slate-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("write")}
              className={`flex-1 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 border-t-2 ${
                activeTab === "write"
                  ? "text-emerald-700 border-emerald-500 bg-emerald-50/50"
                  : "text-slate-600 border-transparent hover:text-emerald-600 hover:bg-slate-50/50"
              } hover:scale-[1.01] active:scale-95`}
            >
              <PenTool size={18} />
              Write Mode
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex-1 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 border-t-2 ${
                activeTab === "preview"
                  ? "text-emerald-700 border-emerald-500 bg-emerald-50/50"
                  : "text-slate-600 border-transparent hover:text-emerald-600 hover:bg-slate-50/50"
              } hover:scale-[1.01] active:scale-95`}
            >
              <Eye size={18} />
              Preview Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
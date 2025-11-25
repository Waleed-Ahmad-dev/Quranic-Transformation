import React, { useState } from 'react';
import { X, Clock, BookOpen, Share, Download, Edit3, FileText, CheckCircle } from 'lucide-react';
import { Lesson, getCategoryTheme, getDownloadUrl } from '../constants';

interface LessonDetailProps {
  lesson: Lesson;
  hasNote: boolean;
  isDownloaded: boolean;
  onClose: () => void;
  onOpenNote: () => void;
  onDownload: () => void;
  onOpenPdf: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, hasNote, isDownloaded, onClose, onOpenNote, onDownload, onOpenPdf }) => {
  const theme = getCategoryTheme(lesson.part);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (isDownloaded || downloading) return;
    setDownloading(true);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = getDownloadUrl(lesson.pdfLink);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
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
        className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-50 transform transition-transform animate-in slide-in-from-bottom duration-300 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-1" onClick={onClose}>
            <div className="w-16 h-1.5 bg-slate-200 rounded-full"></div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-safe">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${theme.badge}`}>
                        {lesson.part}
                    </span>
                    <h2 className="text-3xl font-serif text-slate-900 mt-3 leading-tight">
                        {lesson.title}
                    </h2>
                </div>
                <button onClick={onClose} className="p-2.5 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-6 mb-8 text-sm font-medium text-slate-500 border-b border-slate-100 pb-6">
                 <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-emerald-500" />
                    <span>{lesson.surahName}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock size={18} className="text-emerald-500" />
                    <span>{lesson.hours} Hours</span>
                 </div>
            </div>

            {/* Urdu Title & Desc */}
            <div className="space-y-6 mb-10">
                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Urdu Title</p>
                    <h3 className="font-urdu text-3xl text-emerald-900 leading-loose">{lesson.urduTitle}</h3>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-slate-600 leading-relaxed text-lg">
                        {lesson.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>Verse Range</span>
                        <span>{lesson.verses}</span>
                    </div>
                </div>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-2 gap-3 pb-6">
                 <button 
                    onClick={onOpenNote}
                    className={`col-span-2 py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-sm ${hasNote ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-500 hover:text-emerald-700'}`}
                >
                    <Edit3 size={20} />
                    {hasNote ? 'Edit Reflection' : 'Write Reflection'}
                </button>

                {lesson.pdfLink ? (
                    <>
                        <button 
                            onClick={onOpenPdf}
                            className="py-4 px-6 rounded-2xl bg-[#064E3B] text-white font-bold flex flex-col items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-transform active:scale-95"
                        >
                            <FileText size={24} />
                            <span>Read PDF</span>
                        </button>
                        <button 
                            onClick={handleDownload}
                            className={`py-4 px-6 rounded-2xl border-2 font-bold flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 ${isDownloaded ? 'border-emerald-100 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-600'}`}
                        >
                            {downloading ? (
                                <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : isDownloaded ? (
                                <CheckCircle size={24} />
                            ) : (
                                <Download size={24} />
                            )}
                            <span>{isDownloaded ? 'Saved' : 'Download'}</span>
                        </button>
                    </>
                ) : (
                    <div className="col-span-2 p-4 text-center text-slate-400 text-sm italic bg-slate-50 rounded-2xl">
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
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, FileText, X, Sparkles, Book } from 'lucide-react';
import { SYLLABUS_DATA, CATEGORIES, Note, Lesson, getEmbedUrl, getDownloadUrl, getCategoryTheme } from './constants';
import BottomNav from './components/BottomNav';
import LessonCard from './components/LessonCard';
import LessonDetail from './components/LessonDetail';
import NoteEditor from './components/NoteEditor';

const App = () => {
  const [view, setView] = useState<'home' | 'notes' | 'downloads'>('home');
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState<Record<number, Note>>({});
  const [downloadedIds, setDownloadedIds] = useState<Set<number>>(new Set());
  
  // Modals
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeNoteLesson, setActiveNoteLesson] = useState<Lesson | null>(null);
  const [activePdfLesson, setActivePdfLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('qt_notes_v3');
      if (savedNotes) setNotes(JSON.parse(savedNotes));
      const savedDownloads = localStorage.getItem('qt_downloads');
      if (savedDownloads) setDownloadedIds(new Set(JSON.parse(savedDownloads)));
    } catch (e) {}
  }, []);

  const handleSaveNote = (lessonId: number, content: string, isUrdu: boolean) => {
    const updatedNotes = {
      ...notes,
      [lessonId]: { content, isUrdu, lastModified: new Date().toISOString() }
    };
    setNotes(updatedNotes);
    localStorage.setItem('qt_notes_v3', JSON.stringify(updatedNotes));
  };

  const handleDownload = (lessonId: number) => {
    const newSet = new Set(downloadedIds);
    newSet.add(lessonId);
    setDownloadedIds(newSet);
    localStorage.setItem('qt_downloads', JSON.stringify(Array.from(newSet)));
  };

  const filteredData = useMemo(() => {
    let data = SYLLABUS_DATA;
    if (view === 'notes') data = data.filter(l => notes[l.id] && notes[l.id].content.trim().length > 0);
    else if (view === 'downloads') data = data.filter(l => downloadedIds.has(l.id));
    
    if (view === 'home' && filterCategory !== "All") data = data.filter(l => l.part === filterCategory);
    
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      data = data.filter(l => l.title.toLowerCase().includes(lower) || l.description.toLowerCase().includes(lower));
    }
    return data;
  }, [view, filterCategory, searchTerm, notes, downloadedIds]);

  return (
    <div className="min-h-screen pb-28">
      
      {/* Hero Header */}
      <div className="bg-[#064E3B] text-white pt-safe pb-8 rounded-b-[2.5rem] shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="px-6 relative z-10 pt-4">
           {view === 'home' ? (
             <div className="flex justify-between items-start mb-6">
               <div>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-800/50 border border-emerald-700/50 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <Sparkles size={10} /> v2.2
                    </span>
                 </div>
                 <h1 className="text-3xl font-serif text-white leading-tight">Quranic<br/><span className="text-emerald-200">Transformation</span></h1>
               </div>
               <div className="w-12 h-12 bg-emerald-800/50 rounded-2xl flex items-center justify-center border border-emerald-700/50 backdrop-blur-md">
                   <Book size={24} className="text-emerald-200" />
               </div>
             </div>
           ) : (
             <div className="mb-6 pt-2">
               <h1 className="text-3xl font-serif text-white">
                  {view === 'notes' ? "Reflections" : "Offline Library"}
               </h1>
               <p className="text-emerald-200 text-sm mt-1 opacity-80">
                  {view === 'notes' ? "Your personal thoughts" : "Available without internet"}
               </p>
             </div>
           )}

           {/* Search Bar */}
           <div className="relative">
             <Search className="absolute left-4 top-3.5 text-emerald-700" size={20} />
             <input 
                type="text" 
                placeholder={view === 'notes' ? "Search your notes..." : "Find a lesson..."}
                className="w-full bg-white border-0 rounded-2xl py-3.5 pl-12 pr-4 text-emerald-900 text-base font-medium placeholder:text-emerald-700/50 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 shadow-lg shadow-emerald-900/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-5 -mt-4 relative z-20">
         {/* Category Filters (Home Only) */}
         {view === 'home' && (
             <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 pt-2">
               {CATEGORIES.map(cat => {
                 const theme = getCategoryTheme(cat);
                 const isActive = filterCategory === cat;
                 return (
                   <button
                     key={cat}
                     onClick={() => setFilterCategory(cat)}
                     className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-300 backdrop-blur-md ${
                        isActive 
                        ? 'bg-emerald-900 text-white shadow-lg shadow-emerald-900/20 scale-105 border border-emerald-900' 
                        : 'bg-white/60 text-emerald-900 border border-white/40 hover:bg-white'
                     }`}
                   >
                     {cat}
                   </button>
                 )
               })}
             </div>
           )}

        {filteredData.length === 0 ? (
           <div className="text-center py-20 opacity-60">
             <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center text-emerald-300">
               {view === 'notes' ? <FileText size={32} /> : <Search size={32} />}
             </div>
             <p className="font-serif text-xl text-emerald-800">Nothing found.</p>
           </div>
        ) : (
           <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-2">
             {filteredData.map(lesson => (
               <LessonCard 
                 key={lesson.id} 
                 lesson={lesson}
                 hasNote={!!notes[lesson.id]?.content}
                 isDownloaded={downloadedIds.has(lesson.id)}
                 onClick={() => setSelectedLesson(lesson)}
               />
             ))}
           </div>
        )}
      </main>

      <BottomNav activeView={view} onChangeView={(v) => { setView(v); window.scrollTo(0,0); }} />

      {/* Detail Modal */}
      {selectedLesson && (
        <LessonDetail 
          lesson={selectedLesson}
          hasNote={!!notes[selectedLesson.id]?.content}
          isDownloaded={downloadedIds.has(selectedLesson.id)}
          onClose={() => setSelectedLesson(null)}
          onOpenNote={() => { setSelectedLesson(null); setActiveNoteLesson(selectedLesson); }}
          onOpenPdf={() => { setSelectedLesson(null); setActivePdfLesson(selectedLesson); }}
          onDownload={() => handleDownload(selectedLesson.id)}
        />
      )}

      {/* Note Editor */}
      {activeNoteLesson && (
        <NoteEditor 
          lesson={activeNoteLesson}
          initialContent={notes[activeNoteLesson.id]?.content || ""}
          initialIsUrdu={notes[activeNoteLesson.id]?.isUrdu || false}
          onClose={() => setActiveNoteLesson(null)}
          onSave={(content, isUrdu) => handleSaveNote(activeNoteLesson.id, content, isUrdu)}
        />
      )}

      {/* PDF Viewer */}
      {activePdfLesson && (
        <div className="fixed inset-0 z-50 bg-[#064E3B] flex flex-col animate-in fade-in duration-300">
            <div className="flex items-center justify-between px-4 py-4 bg-[#064E3B] text-white">
                <h3 className="font-serif text-lg truncate pr-4">{activePdfLesson.title}</h3>
                <div className="flex gap-2">
                    <a href={getDownloadUrl(activePdfLesson.pdfLink)} className="p-2 bg-white/10 rounded-full hover:bg-white/20" target="_blank"><Download size={20} /></a>
                    <button onClick={() => setActivePdfLesson(null)} className="p-2 bg-white/10 rounded-full hover:bg-red-500/80 transition-colors"><X size={20} /></button>
                </div>
            </div>
            <iframe src={getEmbedUrl(activePdfLesson.pdfLink)} className="flex-1 w-full border-0 bg-white rounded-t-3xl" title="PDF" />
        </div>
      )}

    </div>
  );
};

export default App;
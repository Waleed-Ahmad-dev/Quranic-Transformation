# Home Page Documentation

## Overview

The Home page is the main landing and application interface for the Quranic Transformation platform. It serves as a dashboard where users can view the syllabus, access lessons, manage personal notes, and view offline content.

## Path

`src/app/page.tsx`

## Type

- **Client Component** (`use client` directive used)

## Key Features

- **Syllabus & Lesson Management**: Displays a list of lessons from `SYLLABUS_DATA`.
- **Filtering & Search**:
  - Filter by categories (e.g., "All", "Module 1").
  - Search by topic, surah, or Urdu title.
- **Personal Notes**:
  - Create, edit, and save notes for each lesson.
  - Notes are persisted in `localStorage`.
- **Download/Offline Mode**:
  - Track "downloaded" lessons.
  - "Offline Library" view showing only downloaded content.
- **Responsive Layout**:
  - Desktop: Sidebar + Main Content Grid.
  - Mobile: Bottom Navigation + Slide-out Sidebar + Category Pills.
- **Modals & Overlays**:
  - `LessonDetail`: Quick view of lesson info.
  - `NoteEditor`: Fullscreen editor for reflection.
  - `PdfViewer`: Fullscreen PDF reading interface.

## Data Flow

1.  **Initialization**:
    - `useEffect` loads `notes` and `downloads` from `localStorage` on mount.
    - Sets `isClient` to true to prevent hydration mismatches.
2.  **User Interaction**:
    - **Search/Filter**: Updates state (`searchTerm`, `filterCategory`), triggering `useMemo` to re-calculate `filteredData`.
    - **Navigation**: Updates `view` state ("home", "notes", "downloads").
    - **Saving Notes**: Updates `notes` state and writes to `localStorage` key `qt_notes_v3`.
    - **Downloads**: Updates `downloadedIds` set and writes to `localStorage` key `qt_downloads`.

## Dependencies

- `react`: `useState`, `useEffect`, `useMemo`.
- `lucide-react`: Icons.
- `@/lib/constants`: Static data sources (`SYLLABUS_DATA`, `CATEGORIES`).
- `@/components`: Custom UI components (`LessonCard`, `Sidebar`, `NoteEditor`, etc.).
- `@/components/ui`: Shadcn/ui components (`Input`, `Button`).

## Error Handling

- **Storage**: `try-catch` block around `localStorage` access to prevent crashes if storage is disabled or corrupted.
- **Hydration**: `if (!isClient) return null` checks ensure consistent initial render.

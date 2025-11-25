<div align="center">
  <h1 align="center">Quranic Transformation</h1>
  <h3 align="center">Digital Quranic Study Companion</h3>
  <p align="center">
    A modern, responsive web application designed to facilitate Quranic study through organized lessons, personal reflections, and offline access.
  </p>
</div>

<br/>

## ✨ Features

### 🔍 Deep Search & Discovery

- **Smart Search**: Instantly find content by topic name, Surah reference, or specific keywords.
- **Tag-based Filtering**: Navigate through content using intelligent tagging (e.g., "Success", "Patience", "Family").
- **Category Navigation**: Browse lessons by major themes like "Foundations", "Iman & Aqeedah", and "Social Life".

### 📚 Comprehensive Lesson Management

- **Rich Content**: Detailed descriptions, Surah references, and duration estimates for every lesson.
- **Integrated Media**: Seamlessly view PDF presentations and study materials directly within the app.
- **Download Manager**: Save lessons and materials for offline access, perfect for on-the-go study.

### 📝 Personal Growth Tools

- **Reflections & Notes**: Capture your thoughts and key takeaways for each lesson.
- **Urdu Support**: Full support for Urdu text input, allowing for native language reflection.
- **Progress Tracking**: Visual indicators for completed notes and downloaded content.

### 🎨 Modern User Experience

- **Beautiful Interface**: A premium, glassmorphism-inspired design with calming Islamic geometric patterns.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Theme System**: Dynamic color themes based on lesson categories for visual distinction.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## � Project Structure

```
Quranic-Transformation/
├── components/          # Reusable UI components
│   ├── BottomNav.tsx    # Mobile navigation bar
│   ├── LessonCard.tsx   # Individual lesson display card
│   ├── LessonDetail.tsx # Modal for detailed lesson view
│   ├── NoteEditor.tsx   # Rich text editor for notes
│   └── Sidebar.tsx      # Desktop sidebar navigation
├── constants.tsx        # Central configuration (Data & Themes)
├── App.tsx             # Main application logic & routing
├── index.html          # Entry point
└── ...config files
```

## ⚙️ Configuration

The application is data-driven and easy to extend.

### Adding New Lessons

All lesson data is stored in `constants.tsx` within the `SYLLABUS_DATA` array. To add a new lesson, simply append a new object:

```typescript
{
  id: 29,
  topicName: "New Lesson Topic",
  detailedDescription: "Description of the lesson...",
  surahReference: "Surah Name (Chapter:Verse)",
  tags: ["Tag1", "Tag2"],
  hours: "2",
  // ... other fields
  part: "Foundations", // Must match a category key
  presentationLink: "GOOGLE_DRIVE_LINK"
}
```

### Customizing Themes

Category themes are defined in the `getCategoryTheme` function in `constants.tsx`. You can modify colors, gradients, and shadows for each category to match your preference.

## �🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v18+ recommended).

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.
2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🤝 Contributing

Contributions are welcome!

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🔍 SEO Keywords

Quran, Tafseer, Islamic Study, Quranic Notes, Digital Quran, Islamic Education, React, Vite, Tailwind CSS, TypeScript, Quran App, Islamic App, Seerah, Quranic Reflections, Offline Quran Study, Islamic Software, Quranic Transformation.

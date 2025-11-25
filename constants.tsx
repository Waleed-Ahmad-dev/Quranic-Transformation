
export interface Lesson {
  id: number;
  title: string;
  hours: string;
  surahNo: string;
  surahName: string;
  verses: string;
  description: string;
  urduTitle: string;
  part: string;
  pdfLink: string;
}

export interface Note {
  content: string;
  isUrdu: boolean;
  lastModified: string;
}

// --- HELPER FUNCTIONS FOR GOOGLE DRIVE ---
export const getDriveFileId = (url: string): string | null => {
  if (!url) return null;
  const match = url.match(/(?:file\/d\/|id=)([-a-zA-Z0-9_]+)/);
  return match ? match[1] : null;
};

export const getEmbedUrl = (url: string): string => {
  const id = getDriveFileId(url);
  if (id) {
    return `https://drive.google.com/file/d/${id}/preview`;
  }
  return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
};

export const getDownloadUrl = (url: string): string => {
  const id = getDriveFileId(url);
  if (id) {
    return `https://drive.google.com/uc?export=download&id=${id}`;
  }
  return url;
};

// --- DATA ---
export const SYLLABUS_DATA: Lesson[] = [
  {
    id: 1,
    title: "Success Keys (Asr)",
    hours: "2",
    surahNo: "103",
    surahName: "Al-'Asr",
    verses: "Complete",
    description: "Essentials of Salvation (Lawaazim-e-Najaat)",
    urduTitle: "لوازم نجات (نجات کی راہ)",
    part: "Foundations",
    pdfLink: "https://drive.google.com/open?id=1LoiyktQmHA7y5zasX9RBfL-HBF7CB7MB&usp=drive_copy"
  },
  {
    id: 2,
    title: "True Piety Defined",
    hours: "2",
    surahNo: "2",
    surahName: "Al-Baqarah",
    verses: "177",
    description: "The Qur'anic Standard of Virtue & Piety",
    urduTitle: "نیکی کی حقیقت اور تقوی کا قرآنی معیار",
    part: "Foundations",
    pdfLink: "https://drive.google.com/open?id=10Iiy-Nt6U3LSrbKRn7xBMKcC0Sk8GsVn&usp=drive_copy"
  },
  {
    id: 3,
    title: "Wisdom in the Qur'an",
    hours: "2",
    surahNo: "31",
    surahName: "Luqman",
    verses: "12-19",
    description: "Foundations of Qur'anic Wisdom (Hikmah)",
    urduTitle: "حکمت قرآنی کی اساسات",
    part: "Foundations",
    pdfLink: "https://drive.google.com/open?id=1OzST56IElREQ7Az-tEkGo-Vl_tg71abM&usp=drive_copy"
  },
  {
    id: 4,
    title: "Steadfast & Win",
    hours: "2",
    surahNo: "41",
    surahName: "Fussilat",
    verses: "30-36",
    description: "The Great Share: Steadfastness & Reward",
    urduTitle: "حظ عظيم",
    part: "Foundations",
    pdfLink: "https://drive.google.com/open?id=1OzST56IElREQ7Az-tEkGo-Vl_tg71abM&usp=drive_copy" 
  },
  {
    id: 5,
    title: "Fatiha: The Framework",
    hours: "8",
    surahNo: "1",
    surahName: "Al-Fatiha",
    verses: "Complete",
    description: "Al-Fatiha: The Complete Ideological Basis",
    urduTitle: "قرآن حکیم کے فلسفہ و حکمت کی اساس کامل",
    part: "Foundations",
    pdfLink: "https://drive.google.com/open?id=1cKeqVYuC_iWMrVyGpsbFyDdGazIWeCzB&usp=drive_copy"
  },
  {
    id: 6,
    title: "Reason Meets Imaan",
    hours: "2",
    surahNo: "3",
    surahName: "Ali 'Imran",
    verses: "190-195",
    description: "Reason, Nature, and the Call to Imaan",
    urduTitle: "عقل، فطرت اور ایمان",
    part: "Iman & Aqeedah",
    pdfLink: "" 
  },
  {
    id: 7,
    title: "Elements of Imaan's Noor",
    hours: "2",
    surahNo: "24",
    surahName: "An-Nur",
    verses: "35-40",
    description: "Elements of Imaan's Light",
    urduTitle: "نور ایمانی کے اجزائے ترکیبی",
    part: "Iman & Aqeedah",
    pdfLink: "https://drive.google.com/open?id=1cwjUCfeqHKOC3wB1IFunR8o-ORKzYnpG&usp=drive_copy"
  },
  {
    id: 8,
    title: "Guidance & Purity Code",
    hours: "2",
    surahNo: "91/92/90",
    surahName: "Ash-Shams / Al-Lail / Al-Balad",
    verses: "Various",
    description: "Pre-Conditions for Guidance & Tazkiyah",
    urduTitle: "تزکیہ نفس",
    part: "Iman & Aqeedah",
    pdfLink: "https://drive.google.com/open?id=1KEq1oBV2HWswQs46Psr-rOi3QCeIEEKN&usp=drive_copy"
  },
  {
    id: 9,
    title: "Imaan: The Benefits",
    hours: "2",
    surahNo: "64",
    surahName: "At-Taghabun",
    verses: "Complete",
    description: "Implications and Outcomes of True Imaan",
    urduTitle: "ایمان اور اس کے ثمرات و مضمرات",
    part: "Iman & Aqeedah",
    pdfLink: "https://drive.google.com/open?id=1HM0KTgYBGKIzBwipvuqv_FV-_3Kzk6j8&usp=drive_copy"
  },
  {
    id: 10,
    title: "Akhirah: The Evidence",
    hours: "2",
    surahNo: "75",
    surahName: "Al-Qiyamah",
    verses: "Complete",
    description: "The Qur'anic Case for the Hereafter",
    urduTitle: "اثبات آخرت کے لیے قرآن کا استدلال",
    part: "Iman & Aqeedah",
    pdfLink: "https://drive.google.com/open?id=1bFHLqUuKlg1a-UqLwsTrnISFlaXdLL9c&usp=drive_copy"
  },
  {
    id: 11,
    title: "Believer's Character",
    hours: "2",
    surahNo: "23/70",
    surahName: "Al-Mu'minun / Al-Ma'arij",
    verses: "1-11 / 19-35",
    description: "Foundations of Character Building",
    urduTitle: "تعمیر سیرت کی اساسات",
    part: "Character Building",
    pdfLink: "https://drive.google.com/open?id=1Aparvjv4XEbKPrUo4h2fVlw4ERWGmOtm&usp=drive_copy"
  },
  {
    id: 12,
    title: "Traits of the Beloved",
    hours: "2",
    surahNo: "25",
    surahName: "Al-Furqan",
    verses: "61-77",
    description: "Defining Traits of the Believer (Ibad-ur-Rahman)",
    urduTitle: "بندہ مومن کی شخصیت کے خدوخال",
    part: "Character Building",
    pdfLink: "https://drive.google.com/open?id=1DF4XKHuK89q1-bHrsGMmfQmdAwbhRkgj&usp=drive_copy"
  },
  {
    id: 13,
    title: "Sacred Family Principles",
    hours: "2",
    surahNo: "66",
    surahName: "At-Tahrim",
    verses: "Complete",
    description: "Fundamental Principles of Family Life",
    urduTitle: "عائلی زندگی کے بنیادی اصول",
    part: "Social Life",
    pdfLink: "https://drive.google.com/open?id=1_6d8sCOPt-Ok-SOrXbzEC9NMYJNFqCV5&usp=drive_copy"
  },
  {
    id: 14,
    title: "Islamic Social Code",
    hours: "2",
    surahNo: "17",
    surahName: "Al-Isra",
    verses: "23-40",
    description: "The Social & Ethical System of Islam",
    urduTitle: "سماجی اور معاشرتی اقدار",
    part: "Social Life",
    pdfLink: "https://drive.google.com/open?id=12eNJdHwDlId1HtcciclYzmxjLAJaTWLN&usp=drive_copy"
  },
  {
    id: 15,
    title: "Political & Social Life",
    hours: "2",
    surahNo: "49",
    surahName: "Al-Hujurat",
    verses: "Complete",
    description: "Political & Organizational Protocol",
    urduTitle: "مسلمانوں کی سیاسی و ملی زندگی",
    part: "Social Life",
    pdfLink: "https://drive.google.com/open?id=1xuMchVnaozPKpv3GAShrZJnpiZpx9N75&usp=drive_copy"
  },
  {
    id: 16,
    title: "Our Testimony (Shahadah)",
    hours: "2",
    surahNo: "22",
    surahName: "Al-Hajj",
    verses: "73-78",
    description: "Shahadah 'Ala An-Nas",
    urduTitle: "شہادت علی الناس",
    part: "Mission & Jihad",
    pdfLink: "https://drive.google.com/open?id=1fFzxq4Kmv7PNjHPn6DTC8gpi-Ww7aYPB&usp=drive_copy"
  },
  {
    id: 17,
    title: "Jihad & Qitaal: Significance",
    hours: "2",
    surahNo: "9",
    surahName: "At-Tawbah",
    verses: "24",
    description: "Jihad Significance & Warning",
    urduTitle: "جہاد فی سبیل اللہ کی اہمیت و فضیلت",
    part: "Mission & Jihad",
    pdfLink: "https://drive.google.com/open?id=1tke7GIvOZmD7lh6vpcJ6K3t3jPZL3yPt&usp=drive_copy"
  },
  {
    id: 18,
    title: "Domination of Deen",
    hours: "2",
    surahNo: "61/62",
    surahName: "As-Saff / Al-Jumu'ah",
    verses: "Complete",
    description: "Izhar-e-Deen & Prophetic Revolution Model",
    urduTitle: "اظہار دین حق",
    part: "Mission & Jihad",
    pdfLink: "https://drive.google.com/open?id=1LGEaydtU_1PveYm9J20Iohim9nXAFRYD&usp=drive_copy"
  },
  {
    id: 19,
    title: "Hypocrisy Exposed",
    hours: "2",
    surahNo: "63",
    surahName: "Al-Munafiqun",
    verses: "Complete",
    description: "Hypocrisy: Penalty for Avoiding Jihad",
    urduTitle: "اعراض عن الجہاد کی سزا نفاق",
    part: "Mission & Jihad",
    pdfLink: "https://drive.google.com/open?id=12QLlQGTjv6D32tH1q45xqYBH1UgWGmcm&usp=drive_copy"
  },
  {
    id: 20,
    title: "Persistence Lecture #1",
    hours: "2",
    surahNo: "29",
    surahName: "Al-Ankaboot / Others",
    verses: "Various",
    description: "Trial & Testing (Ibtila)",
    urduTitle: "اہل ایمان کیلئے ابتلاء و امتحان",
    part: "Seerah & Persistence",
    pdfLink: "https://drive.google.com/open?id=1OV-jWGNDzASV5r0EuJC8Q6ZDpsHRLj93&usp=drive_copy"
  },
  {
    id: 21,
    title: "Persistence Lecture #2",
    hours: "2",
    surahNo: "18",
    surahName: "Al-Kahf / Others",
    verses: "Various",
    description: "Guidance During Trials",
    urduTitle: "ابتلاء و آزمائش میں ہدایات",
    part: "Seerah & Persistence",
    pdfLink: "https://drive.google.com/open?id=1hu-3G52lZuTu4oaRGxjH8WsDpjMle0x2&usp=drive_copy"
  },
  {
    id: 22,
    title: "Battle of Badr",
    hours: "2",
    surahNo: "8",
    surahName: "Al-Anfal",
    verses: "1-10 & 72-75",
    description: "Start of Qital: Battle of Badr",
    urduTitle: "غزوہ بدر",
    part: "Seerah & Persistence",
    pdfLink: "https://drive.google.com/open?id=191LKI5QKDTgSXQ3y93UGmiKbAFMSI_7Y&usp=drive_copy"
  },
  {
    id: 23,
    title: "Battle of Uhud",
    hours: "2",
    surahNo: "3",
    surahName: "Ali 'Imran",
    verses: "121-148",
    description: "Battle of Uhud Analysis",
    urduTitle: "غزوہ احد",
    part: "Seerah & Persistence",
    pdfLink: "https://drive.google.com/open?id=13ibDHlqc-aC2pgEwJ4Q1MwSGIscnJrsl&usp=drive_copy"
  },
  {
    id: 24,
    title: "Battle of Ahzab",
    hours: "2",
    surahNo: "32",
    surahName: "Al-Ahzab",
    verses: "Ruku 2 & 3",
    description: "Climax of Trial: Battle of Ahzab",
    urduTitle: "غزوہ احزاب",
    part: "Seerah & Persistence",
    pdfLink: "https://drive.google.com/open?id=1qji6woZjGrZSNFFqfPM6-02M2wOUAuXp&usp=drive_copy"
  },
  {
    id: 25,
    title: "Hudaibiyah Victory",
    hours: "2",
    surahNo: "48",
    surahName: "Al-Fath",
    verses: "Last Ruku",
    description: "Hudaibiyah: Dawn of Victory",
    urduTitle: "صلح حدیبیہ",
    part: "Seerah & Persistence",
    pdfLink: "https://drive.google.com/open?id=1Wg1D622P4whZjMl3Ksn68hNSW8m-xiYn&usp=drive_copy"
  },
  {
    id: 26,
    title: "Battle of Tabuk",
    hours: "2",
    surahNo: "9",
    surahName: "At-Tawbah",
    verses: "38-52",
    description: "Battle of Tabuk: International Phase",
    urduTitle: "غزوہ تبوک",
    part: "Seerah & Persistence",
    pdfLink: "https://drive.google.com/open?id=1LBvZtILh2f8XnjnVMGAAtIWhqUR6VmMZ&usp=drive_copy"
  },
  {
    id: 27,
    title: "Surah Hadid Charter",
    hours: "4",
    surahNo: "57",
    surahName: "Al-Hadid",
    verses: "Complete",
    description: "Umm Al-Musabbihat: Final Charter",
    urduTitle: "ام المسبحات سورة الحديد",
    part: "Conclusion",
    pdfLink: "https://drive.google.com/open?id=1rxORLsmZ_I64CMld5ebKmrzOQKdAcV-9&usp=drive_copy"
  },
  {
    id: 28,
    title: "Overview of Syllabus",
    hours: "4",
    surahNo: "-",
    surahName: "-",
    verses: "-",
    description: "Complete Course Overview",
    urduTitle: "منتخب نصاب کا اجمالی جائزہ",
    part: "Conclusion",
    pdfLink: "https://drive.google.com/open?id=18Msjy6sdgA-tUFQSPqRj_h6PhAtZELwt&usp=drive_copy"
  }
];

export const CATEGORIES = ["All", ...Array.from(new Set(SYLLABUS_DATA.map(d => d.part)))];

// --- VIBRANT UI HELPERS ---

interface CategoryTheme {
  gradient: string;
  shadow: string;
  text: string;
  icon: string;
  badge: string;
  accent: string;
}

export const getCategoryTheme = (part: string): CategoryTheme => {
  const themes: Record<string, CategoryTheme> = {
    "Foundations": { 
      gradient: "from-teal-400 to-emerald-600",
      shadow: "shadow-emerald-500/20",
      text: "text-emerald-700",
      icon: "text-emerald-500",
      badge: "bg-emerald-50 text-emerald-700",
      accent: "bg-emerald-500"
    },
    "Iman & Aqeedah": { 
      gradient: "from-blue-400 to-indigo-600",
      shadow: "shadow-indigo-500/20",
      text: "text-indigo-700",
      icon: "text-indigo-500",
      badge: "bg-indigo-50 text-indigo-700",
      accent: "bg-indigo-500"
    },
    "Character Building": { 
      gradient: "from-amber-400 to-orange-600",
      shadow: "shadow-orange-500/20",
      text: "text-orange-800",
      icon: "text-orange-500",
      badge: "bg-orange-50 text-orange-800",
      accent: "bg-orange-500"
    },
    "Social Life": { 
      gradient: "from-cyan-400 to-blue-600",
      shadow: "shadow-cyan-500/20",
      text: "text-cyan-700",
      icon: "text-cyan-500",
      badge: "bg-cyan-50 text-cyan-700",
      accent: "bg-cyan-500"
    },
    "Mission & Jihad": { 
      gradient: "from-rose-400 to-red-600",
      shadow: "shadow-rose-500/20",
      text: "text-rose-700",
      icon: "text-rose-500",
      badge: "bg-rose-50 text-rose-700",
      accent: "bg-rose-500"
    },
    "Seerah & Persistence": { 
      gradient: "from-violet-400 to-purple-600",
      shadow: "shadow-purple-500/20",
      text: "text-purple-700",
      icon: "text-purple-500",
      badge: "bg-purple-50 text-purple-700",
      accent: "bg-purple-500"
    },
    "Conclusion": { 
      gradient: "from-slate-400 to-slate-600",
      shadow: "shadow-slate-500/20",
      text: "text-slate-700",
      icon: "text-slate-500",
      badge: "bg-slate-50 text-slate-700",
      accent: "bg-slate-500"
    },
  };
  return themes[part] || themes["Conclusion"];
};

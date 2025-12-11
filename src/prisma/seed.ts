import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Optional: Clean existing lessons to avoid duplicates during dev
  // await prisma.lesson.deleteMany() 
  
  // Data derived from src/lib/constants.tsx
  const syllabusData = [
    {
      part: "Foundations",
      title: "Success Keys (Asr)",
      hours: "2",
      surahNo: "103",
      surahName: "Al-'Asr",
      surahReference: "Surah Al-Asr (103)",
      verses: "Complete",
      presentationLink: "https://drive.google.com/open?id=1LoiyktQmHA7y5zasX9RBfL-HBF7CB7MB&usp=drive_copy",
      description: "Essentials of Salvation (Lawaazim-e-Najaat)",
      detailedDescription: "A comprehensive exploration of the essential requirements for salvation and success in both worlds, focusing on the profound wisdom of Surah Al-Asr and its timeless message for personal transformation.",
      urduTitle: "لوازم نجات (نجات کی راہ)"
    },
    {
      part: "Foundations",
      title: "True Piety Defined",
      hours: "2",
      surahNo: "2",
      surahName: "Al-Baqarah",
      surahReference: "Surah Al-Baqarah (2:177)",
      verses: "177",
      presentationLink: "https://drive.google.com/open?id=10Iiy-Nt6U3LSrbKRn7xBMKcC0Sk8GsVn&usp=drive_copy",
      description: "The Qur'anic Standard of Virtue & Piety",
      detailedDescription: "Understanding the Qur'anic definition of true piety and virtue, examining the comprehensive standards set in Surah Al-Baqarah that go beyond mere rituals to encompass complete spiritual transformation.",
      urduTitle: "نیکی کی حقیقت اور تقوی کا قرآنی معیار"
    },
    {
      part: "Foundations",
      title: "Wisdom in the Qur'an",
      hours: "2",
      surahNo: "31",
      surahName: "Luqman",
      surahReference: "Surah Luqman (31:12-19)",
      verses: "12-19",
      presentationLink: "https://drive.google.com/open?id=1OzST56IElREQ7Az-tEkGo-Vl_tg71abM&usp=drive_copy",
      description: "Foundations of Qur'anic Wisdom (Hikmah)",
      detailedDescription: "Delving into the foundations of Qur'anic wisdom through the teachings of Luqman, understanding practical application in daily life and how to integrate divine guidance into modern challenges.",
      urduTitle: "حکمت قرآنی کی اساسات"
    },
    {
      part: "Foundations",
      title: "Steadfastness & Victory",
      hours: "2",
      surahNo: "41",
      surahName: "Fussilat",
      surahReference: "Surah Fussilat (41:30-36)",
      verses: "30-36",
      presentationLink: "https://drive.google.com/open?id=1OzST56IElREQ7Az-tEkGo-Vl_tg71abM&usp=drive_copy",
      description: "The Great Share: Steadfastness & Reward",
      detailedDescription: "Exploring the concept of steadfastness in faith and its immense rewards as outlined in Surah Fussilat, understanding how perseverance leads to spiritual victory and divine support.",
      urduTitle: "حظ عظيم"
    },
    {
      part: "Foundations",
      title: "Fatiha: The Complete Framework",
      hours: "8",
      surahNo: "1",
      surahName: "Al-Fatiha",
      surahReference: "Surah Al-Fatiha (1)",
      verses: "Complete",
      presentationLink: "https://drive.google.com/open?id=1cKeqVYuC_iWMrVyGpsbFyDdGazIWeCzB&usp=drive_copy",
      description: "Al-Fatiha: The Complete Ideological Basis",
      detailedDescription: "A deep dive into Surah Al-Fatiha as the comprehensive ideological basis of the Qur'an, covering its profound meanings, spiritual implications, and practical applications in daily worship and life.",
      urduTitle: "قرآن حکیم کے فلسفہ و حکمت کی اساس کامل"
    },
    {
      part: "Iman & Aqeedah",
      title: "Reason Meets Faith",
      hours: "2",
      surahNo: "3",
      surahName: "Ali 'Imran",
      surahReference: "Surah Ali 'Imran (3:190-195)",
      verses: "190-195",
      presentationLink: "",
      description: "Reason, Nature, and the Call to Imaan",
      detailedDescription: "Understanding the relationship between rational thought, natural disposition, and divine faith through Qur'anic perspective, demonstrating how Islam harmonizes intellect with revelation.",
      urduTitle: "عقل، فطرت اور ایمان"
    },
    {
      part: "Iman & Aqeedah",
      title: "Elements of Faith's Light",
      hours: "2",
      surahNo: "24",
      surahName: "An-Nur",
      surahReference: "Surah An-Nur (24:35-40)",
      verses: "35-40",
      presentationLink: "https://drive.google.com/open?id=1cwjUCfeqHKOC3wB1IFunR8o-ORKzYnpG&usp=drive_copy",
      description: "Elements of Imaan's Light",
      detailedDescription: "Analyzing the components that constitute the light of faith as described in the Qur'anic parable of light, understanding how to cultivate and maintain spiritual illumination.",
      urduTitle: "نور ایمانی کے اجزائے ترکیبی"
    },
    {
      part: "Iman & Aqeedah",
      title: "Guidance & Purity Code",
      hours: "2",
      surahNo: "91/92/90",
      surahName: "Ash-Shams / Al-Lail / Al-Balad",
      surahReference: "Surah Ash-Shams, Al-Lail, Al-Balad",
      verses: "Various",
      presentationLink: "https://drive.google.com/open?id=1KEq1oBV2HWswQs46Psr-rOi3QCeIEEKN&usp=drive_copy",
      description: "Pre-Conditions for Guidance & Tazkiyah",
      detailedDescription: "Examining the pre-conditions for divine guidance and spiritual purification through multiple Qur'anic chapters, understanding the path to inner transformation and divine acceptance.",
      urduTitle: "تزکیہ نفس"
    },
    {
      part: "Iman & Aqeedah",
      title: "Benefits of True Faith",
      hours: "2",
      surahNo: "64",
      surahName: "At-Taghabun",
      surahReference: "Surah At-Taghabun (64)",
      verses: "Complete",
      presentationLink: "https://drive.google.com/open?id=1HM0KTgYBGKIzBwipvuqv_FV-_3Kzk6j8&usp=drive_copy",
      description: "Implications and Outcomes of True Imaan",
      detailedDescription: "Exploring the practical implications and spiritual outcomes of genuine faith as outlined in Surah At-Taghabun, understanding how true belief transforms individual and collective life.",
      urduTitle: "ایمان اور اس کے ثمرات و مضمرات"
    },
    {
      part: "Iman & Aqeedah",
      title: "Evidence for Afterlife",
      hours: "2",
      surahNo: "75",
      surahName: "Al-Qiyamah",
      surahReference: "Surah Al-Qiyamah (75)",
      verses: "Complete",
      presentationLink: "https://drive.google.com/open?id=1bFHLqUuKlg1a-UqLwsTrnISFlaXdLL9c&usp=drive_copy",
      description: "The Qur'anic Case for the Hereafter",
      detailedDescription: "Understanding the Qur'anic logical arguments and evidence for the reality of the Hereafter, strengthening conviction through rational proofs and spiritual insights.",
      urduTitle: "اثبات آخرت کے لیے قرآن کا استدلال"
    },
    {
      part: "Character Building",
      title: "Believer's Character Foundation",
      hours: "2",
      surahNo: "23/70",
      surahName: "Al-Mu'minun / Al-Ma'arij",
      surahReference: "Surah Al-Mu'minun (23:1-11) & Al-Ma'arij (70:19-35)",
      verses: "1-11 / 19-35",
      presentationLink: "https://drive.google.com/open?id=1Aparvjv4XEbKPrUo4h2fVlw4ERWGmOtm&usp=drive_copy",
      description: "Foundations of Character Building",
      detailedDescription: "Building the foundational qualities of a true believer's character as outlined in the Qur'an, understanding the spiritual and moral prerequisites for divine acceptance.",
      urduTitle: "تعمیر سیرت کی اساسات"
    },
    {
      part: "Character Building",
      title: "Traits of God's Beloved Servants",
      hours: "2",
      surahNo: "25",
      surahName: "Al-Furqan",
      surahReference: "Surah Al-Furqan (25:61-77)",
      verses: "61-77",
      presentationLink: "https://drive.google.com/open?id=1DF4XKHuK89q1-bHrsGMmfQmdAwbhRkgj&usp=drive_copy",
      description: "Defining Traits of the Believer (Ibad-ur-Rahman)",
      detailedDescription: "Exploring the defining characteristics of Ibad-ur-Rahman (Servants of the Most Merciful) and how to cultivate these noble qualities in contemporary life.",
      urduTitle: "بندہ مومن کی شخصیت کے خدوخال"
    },
    {
      part: "Social Life",
      title: "Sacred Family Principles",
      hours: "2",
      surahNo: "66",
      surahName: "At-Tahrim",
      surahReference: "Surah At-Tahrim (66)",
      verses: "Complete",
      presentationLink: "https://drive.google.com/open?id=1_6d8sCOPt-Ok-SOrXbzEC9NMYJNFqCV5&usp=drive_copy",
      description: "Fundamental Principles of Family Life",
      detailedDescription: "Understanding the fundamental Islamic principles governing family life, relationships, and household management based on divine guidance and prophetic example.",
      urduTitle: "عائلی زندگی کے بنیادی اصول"
    },
    {
      part: "Social Life",
      title: "Islamic Social Ethics Code",
      hours: "2",
      surahNo: "17",
      surahName: "Al-Isra",
      surahReference: "Surah Al-Isra (17:23-40)",
      verses: "23-40",
      presentationLink: "https://drive.google.com/open?id=12eNJdHwDlId1HtcciclYzmxjLAJaTWLN&usp=drive_copy",
      description: "The Social & Ethical System of Islam",
      detailedDescription: "Comprehensive study of the social and ethical system of Islam, covering rights, responsibilities, and proper conduct in various social contexts.",
      urduTitle: "سماجی اور معاشرتی اقدار"
    },
    {
      part: "Social Life",
      title: "Political & Organizational Protocol",
      hours: "2",
      surahNo: "49",
      surahName: "Al-Hujurat",
      surahReference: "Surah Al-Hujurat (49)",
      verses: "Complete",
      presentationLink: "https://drive.google.com/open?id=1xuMchVnaozPKpv3GAShrZJnpiZpx9N75&usp=drive_copy",
      description: "Political & Organizational Protocol",
      detailedDescription: "Understanding Islamic guidelines for political life, community organization, and collective decision-making based on mutual consultation and justice.",
      urduTitle: "مسلمانوں کی سیاسی و ملی زندگی"
    },
    {
      part: "Mission & Jihad",
      title: "Our Testimony to Humanity",
      hours: "2",
      surahNo: "22",
      surahName: "Al-Hajj",
      surahReference: "Surah Al-Hajj (22:73-78)",
      verses: "73-78",
      presentationLink: "https://drive.google.com/open?id=1fFzxq4Kmv7PNjHPn6DTC8gpi-Ww7aYPB&usp=drive_copy",
      description: "Shahadah 'Ala An-Nas",
      detailedDescription: "Understanding the concept of Shahadah 'Ala An-Nas - being witnesses to humanity, and the responsibilities that come with this divine trust.",
      urduTitle: "شہادت علی الناس"
    },
    {
      part: "Mission & Jihad",
      title: "Jihad & Struggle: Divine Significance",
      hours: "2",
      surahNo: "9",
      surahName: "At-Tawbah",
      surahReference: "Surah At-Tawbah (9:24)",
      verses: "24",
      presentationLink: "https://drive.google.com/open?id=1tke7GIvOZmD7lh6vpcJ6K3t3jPZL3yPt&usp=drive_copy",
      description: "Jihad Significance & Warning",
      detailedDescription: "Comprehensive understanding of Jihad's significance in Islam, its various forms, and the spiritual dimensions of striving in Allah's path.",
      urduTitle: "جہاد فی سبیل اللہ کی اہمیت و فضیلت"
    },
    {
      part: "Mission & Jihad",
      title: "Establishing Divine System",
      hours: "2",
      surahNo: "61/62",
      surahName: "As-Saff / Al-Jumu'ah",
      surahReference: "Surah As-Saff (61) & Al-Jumu'ah (62)",
      verses: "Complete",
      presentationLink: "https://drive.google.com/open?id=1LGEaydtU_1PveYm9J20Iohim9nXAFRYD&usp=drive_copy",
      description: "Izhar-e-Deen & Prophetic Revolution Model",
      detailedDescription: "Understanding the concept of Izhar-e-Deen and the Prophetic model for establishing Allah's system on earth through peaceful means and divine methodology.",
      urduTitle: "اظہار دین حق"
    },
    {
      part: "Mission & Jihad",
      title: "Hypocrisy: Causes & Consequences",
      hours: "2",
      surahNo: "63",
      surahName: "Al-Munafiqun",
      surahReference: "Surah Al-Munafiqun (63)",
      verses: "Complete",
      presentationLink: "https://drive.google.com/open?id=12QLlQGTjv6D32tH1q45xqYBH1UgWGmcm&usp=drive_copy",
      description: "Hypocrisy: Penalty for Avoiding Jihad",
      detailedDescription: "Analyzing the phenomenon of hypocrisy in Islamic context, its root causes, spiritual consequences, and how to safeguard oneself from this spiritual disease.",
      urduTitle: "اعراض عن الجہاد کی سزا نفاق"
    },
    {
      part: "Seerah & Persistence",
      title: "Divine Tests & Trials",
      hours: "2",
      surahNo: "29",
      surahName: "Al-Ankaboot / Others",
      surahReference: "Surah Al-Ankaboot and related verses",
      verses: "Various",
      presentationLink: "https://drive.google.com/open?id=1OV-jWGNDzASV5r0EuJC8Q6ZDpsHRLj93&usp=drive_copy",
      description: "Trial & Testing (Ibtila)",
      detailedDescription: "Understanding the purpose and wisdom behind trials in believers' lives, learning how to navigate challenges with faith and perseverance.",
      urduTitle: "اہل ایمان کیلئے ابتلاء و امتحان"
    },
    {
      part: "Seerah & Persistence",
      title: "Divine Support During Trials",
      hours: "2",
      surahNo: "18",
      surahName: "Al-Kahf / Others",
      surahReference: "Surah Al-Kahf and related verses",
      verses: "Various",
      presentationLink: "https://drive.google.com/open?id=1hu-3G52lZuTu4oaRGxjH8WsDpjMle0x2&usp=drive_copy",
      description: "Guidance During Trials",
      detailedDescription: "Learning how to seek and recognize divine support during difficult times through Qur'anic examples and Prophetic guidance.",
      urduTitle: "ابتلاء و آزمائش میں ہدایات"
    },
    {
      part: "Seerah & Persistence",
      title: "Battle of Badr: Divine Intervention",
      hours: "2",
      surahNo: "8",
      surahName: "Al-Anfal",
      surahReference: "Surah Al-Anfal (8:1-10, 72-75)",
      verses: "1-10 & 72-75",
      presentationLink: "https://drive.google.com/open?id=191LKI5QKDTgSXQ3y93UGmiKbAFMSI_7Y&usp=drive_copy",
      description: "Start of Qital: Battle of Badr",
      detailedDescription: "Comprehensive analysis of the Battle of Badr, its historical context, strategic lessons, and the manifestation of divine help in critical moments.",
      urduTitle: "غزوہ بدر"
    },
    {
      part: "Seerah & Persistence",
      title: "Battle of Uhud: Lessons in Obedience",
      hours: "2",
      surahNo: "3",
      surahName: "Ali 'Imran",
      surahReference: "Surah Ali 'Imran (3:121-148)",
      verses: "121-148",
      presentationLink: "https://drive.google.com/open?id=13ibDHlqc-aC2pgEwJ4Q1MwSGIscnJrsl&usp=drive_copy",
      description: "Battle of Uhud Analysis",
      detailedDescription: "Critical examination of the Battle of Uhud, understanding the lessons in obedience, discipline, and recovery from setbacks.",
      urduTitle: "غزوہ احد"
    },
    {
      part: "Seerah & Persistence",
      title: "Battle of Ahzab: Ultimate Test",
      hours: "2",
      surahNo: "33",
      surahName: "Al-Ahzab",
      surahReference: "Surah Al-Ahzab (33: Ruku 2 & 3)",
      verses: "Ruku 2 & 3",
      presentationLink: "https://drive.google.com/open?id=1qji6woZjGrZSNFFqfPM6-02M2wOUAuXp&usp=drive_copy",
      description: "Climax of Trial: Battle of Ahzab",
      detailedDescription: "Studying the Battle of Ahzab as the climax of trials faced by early Muslims, and the divine relief that follows intense testing.",
      urduTitle: "غزوہ احزاب"
    },
    {
      part: "Seerah & Persistence",
      title: "Hudaibiyah: Strategic Victory",
      hours: "2",
      surahNo: "48",
      surahName: "Al-Fath",
      surahReference: "Surah Al-Fath (48: Last Ruku)",
      verses: "Last Ruku",
      presentationLink: "https://drive.google.com/open?id=1Wg1D622P4whZjMl3Ksn68hNSW8m-xiYn&usp=drive_copy",
      description: "Hudaibiyah: Dawn of Victory",
      detailedDescription: "Analyzing the Treaty of Hudaibiyah as a strategic masterpiece and turning point in Islamic history, demonstrating wisdom in diplomacy.",
      urduTitle: "صلح حدیبیہ"
    },
    {
      part: "Seerah & Persistence",
      title: "Battle of Tabuk: Global Phase",
      hours: "2",
      surahNo: "9",
      surahName: "At-Tawbah",
      surahReference: "Surah At-Tawbah (9:38-52)",
      verses: "38-52",
      presentationLink: "https://drive.google.com/open?id=1LBvZtILh2f8XnjnVMGAAtIWhqUR6VmMZ&usp=drive_copy",
      description: "Battle of Tabuk: International Phase",
      detailedDescription: "Understanding the Battle of Tabuk as the beginning of Islam's international phase and the test of commitment for the Muslim community.",
      urduTitle: "غزوہ تبوک"
    },
    {
      part: "Conclusion",
      title: "Surah Hadid: Final Charter",
      hours: "4",
      surahNo: "57",
      surahName: "Al-Hadid",
      surahReference: "Surah Al-Hadid (57)",
      verses: "Complete",
      presentationLink: "https://drive.google.com/open?id=1rxORLsmZ_I64CMld5ebKmrzOQKdAcV-9&usp=drive_copy",
      description: "Umm Al-Musabbihat: Final Charter",
      detailedDescription: "Comprehensive study of Surah Al-Hadid as the concluding charter, summarizing the entire Islamic worldview and practical guidance.",
      urduTitle: "ام المسبحات سورة الحديد"
    },
    {
      part: "Conclusion",
      title: "Complete Course Overview",
      hours: "4",
      surahNo: "-",
      surahName: "-",
      surahReference: "Multiple References",
      verses: "-",
      presentationLink: "https://drive.google.com/open?id=18Msjy6sdgA-tUFQSPqRj_h6PhAtZELwt&usp=drive_copy",
      description: "Complete Course Overview",
      detailedDescription: "Comprehensive review and integration of the entire syllabus, connecting all themes and lessons into a unified understanding of Qur'anic transformation.",
      urduTitle: "منتخب نصاب کا اجمالی جائزہ"
    }
  ]

  console.log(`Prepared ${syllabusData.length} lessons. inserting...`)

  for (const lesson of syllabusData) {
    // Check if lesson already exists (update it) or create new (upsert-like logic, or just create if you cleaned db)
    const existing = await prisma.lesson.findFirst({
        where: { title: lesson.title }
    })

    if (existing) {
        await prisma.lesson.update({
            where: { id: existing.id },
            data: {
                title: lesson.title,
                urduTitle: lesson.urduTitle,
                description: lesson.description,
                detailedDescription: lesson.detailedDescription,
                hours: lesson.hours,
                surahNo: lesson.surahNo,
                // fix: seed data has 'surahName' but schema doesn't have it? 
                // Wait, checking schema again. Schema: title, urduTitle, description, detailedDescription, surahReference, surahNo, verses, hours, part, presentationLink, audioUrl.
                // Constants: surahName is there. Schema doesn't have 'surahName'. 
                // I will ignore surahName for now or map it to surahReference if suitable, but surahReference in seed data is 'Surah ...'. 
                // Let's stick to schema fields.
                surahReference: lesson.surahReference,
                verses: lesson.verses,
                part: lesson.part,
                presentationLink: lesson.presentationLink
            }
        })
    } else {
        await prisma.lesson.create({
            data: {
                title: lesson.title,
                urduTitle: lesson.urduTitle,
                description: lesson.description,
                detailedDescription: lesson.detailedDescription,
                hours: lesson.hours,
                surahNo: lesson.surahNo,
                surahReference: lesson.surahReference,
                verses: lesson.verses,
                part: lesson.part,
                presentationLink: lesson.presentationLink
            }
        })
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
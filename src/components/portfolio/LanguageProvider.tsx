'use client';
'use client';
import React, { createContext, useContext, useState } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من أنا',
    'nav.skills': 'مهاراتي',
    'nav.projects': 'مشاريعي',
    'nav.achievements': 'إنجازاتي',
    'nav.contact': 'تواصل معي',

    // Hero Section
    'hero.greeting': 'أهلاً وسهلاً بك في عالمي التقني ✨',
    'hero.name': 'مصطفى جمال',
    'hero.title': 'مهندس برمجيات – Software Engineer',
    'hero.cta.projects': 'استكشف مشاريعي',
    'hero.cta.contact': 'تواصل معي الآن',
    'hero.scroll': 'اكتشف المزيد',
    'hero.years': 'سنوات خبرة',
    'hero.projects': 'مشروع مكتمل',
    'hero.clients': 'عميل سعيد',
    'hero.description': 'مرحباً! أنا مصطفى، مطور شغوف ومؤسس شركة Webnest. أحول الأفكار إلى حلول تقنية مبتكرة باستخدام أحدث التقنيات.',

    // Skills Section
    'skills.title': 'مهاراتي التقنية',
    'skills.subtitle': 'خبرة واسعة في مجالات متعددة من البرمجة والتطوير، مع التركيز على أحدث التقنيات والممارسات الأفضل في الصناعة.',
    'skills.placeholder': 'اختر مهارة لعرض التفاصيل',
    'skills.hover': 'مرر الماوس فوق أي مهارة أعلاه لرؤية الوصف التفصيلي والتقنيات المستخدمة في هذا المجال.',
    'skills.technologies': 'التقنيات والأدوات:',

    // Projects Section
    'projects.title': 'مشاريعي المتميزة',
    'projects.subtitle': 'مجموعة مختارة من أفضل المشاريع التي عملت عليها، كل مشروع يعكس خبرتي في تقنيات مختلفة وحلول مبتكرة تلبي احتياجات العملاء المتنوعة.',
    'projects.all': 'جميع المشاريع',
    'projects.web': 'تطوير الويب',
    'projects.mobile': 'تطبيقات الموبايل',
    'projects.ai': 'الذكاء الاصطناعي',
    'projects.iot': 'إنترنت الأشياء',
    'projects.view': 'عرض المشروع',
    'projects.completed': 'مكتمل',
    'projects.inprogress': 'قيد التطوير',
    'projects.features': 'المميزات الرئيسية:',

    // About Section
    'about.title': 'من أنا',
    'about.subtitle': 'تعرف على خلفيتي ومهاراتي وشغفي في عالم البرمجة والتطوير',
    'about.bio': 'مطور شغوف متخصص في التقنيات الحديثة',
    'about.location': 'الموقع',
    'about.experience': 'سنوات الخبرة',
    'about.education': 'التعليم',
    'about.specialization': 'التخصص',

    // Achievements Section
    'achievements.title': 'إنجازاتي وجوائزي',
    'achievements.subtitle': 'أبرز الإنجازات والجوائز التي حصلت عليها خلال مسيرتي المهنية',
    'achievements.viewDetails': 'عرض التفاصيل',
    'achievements.certificate': 'شهادة',
    'achievements.award': 'جائزة',
    'achievements.recognition': 'تقدير',

    // Contact Section
    'contact.title': 'تواصل معي',
    'contact.subtitle': 'لديك مشروع في ذهنك؟ دعنا نحوله إلى واقع',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.subject': 'الموضوع',
    'contact.message': 'رسالتك',
    'contact.send': 'إرسال الرسالة',
    'contact.sending': 'جارٍ الإرسال...',
    'contact.success': 'تم إرسال رسالتك بنجاح!',
    'contact.error': 'حدث خطأ أثناء إرسال الرسالة',
    'contact.info.email': 'البريد الإلكتروني',
    'contact.info.phone': 'الهاتف',
    'contact.info.location': 'الموقع',
    'contact.info.social': 'وسائل التواصل',

    // Footer Section
    'footer.copyright': 'جميع الحقوق محفوظة',
    'footer.built': 'تم التطوير بـ',
    'footer.love': 'حب',
    'footer.and': 'و',
    'footer.coffee': 'قهوة',

    // Common
    'common.loading': 'جارٍ التحميل...',
    'common.error': 'حدث خطأ',
    'common.retry': 'إعادة المحاولة',
    'common.close': 'إغلاق',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.download': 'تحميل',

    // Dynamic texts from Hero section
    'hero.dynamic.web': 'مطور ويب متقدم 🚀',
    'hero.dynamic.flutter': 'مبرمج Flutter محترف 📱',
    'hero.dynamic.devops': 'خبير DevOps ☁️',
    'hero.dynamic.founder': 'مؤسس Webnest 🏢',
    'hero.dynamic.ai': 'مطور تطبيقات ذكية 🤖',
    'hero.dynamic.solutions': 'مهندس حلول تقنية 💡',

    // Theme and Language
    'theme.light': 'الوضع المضيء',
    'theme.dark': 'الوضع المظلم',
    'lang.arabic': 'العربية',
    'lang.english': 'English'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.achievements': 'Achievements',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.greeting': 'Welcome to my tech world ✨',
    'hero.name': 'Mostafa Gamal',
    'hero.title': 'Software Engineer – مهندس برمجيات',
    'hero.cta.projects': 'Explore My Projects',
    'hero.cta.contact': 'Get In Touch',
    'hero.scroll': 'Discover More',
    'hero.years': 'Years Experience',
    'hero.projects': 'Completed Projects',
    'hero.clients': 'Happy Clients',
    'hero.description': 'Hello! I\'m Mostafa, a passionate developer and founder of Webnest. I transform ideas into innovative tech solutions using the latest technologies.',

    // Skills Section
    'skills.title': 'Technical Skills',
    'skills.subtitle': 'Extensive experience across multiple fields of programming and development, focusing on the latest technologies and industry best practices.',
    'skills.placeholder': 'Select a skill to view details',
    'skills.hover': 'Hover over any skill above to see detailed description and technologies used in this field.',
    'skills.technologies': 'Technologies & Tools:',

    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A curated selection of my best work, each project showcases my expertise in different technologies and innovative solutions that meet diverse client needs.',
    'projects.all': 'All Projects',
    'projects.web': 'Web Development',
    'projects.mobile': 'Mobile Apps',
    'projects.ai': 'Artificial Intelligence',
    'projects.iot': 'Internet of Things',
    'projects.view': 'View Project',
    'projects.completed': 'Completed',
    'projects.inprogress': 'In Progress',
    'projects.features': 'Key Features:',

    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Learn about my background, skills, and passion in programming and development',
    'about.bio': 'Passionate developer specialized in modern technologies',
    'about.location': 'Location',
    'about.experience': 'Years of Experience',
    'about.education': 'Education',
    'about.specialization': 'Specialization',

    // Achievements Section
    'achievements.title': 'My Achievements & Awards',
    'achievements.subtitle': 'Notable achievements and awards earned throughout my professional journey',
    'achievements.viewDetails': 'View Details',
    'achievements.certificate': 'Certificate',
    'achievements.award': 'Award',
    'achievements.recognition': 'Recognition',

    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Have a project in mind? Let\'s turn it into reality',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Your message has been sent successfully!',
    'contact.error': 'An error occurred while sending the message',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.location': 'Location',
    'contact.info.social': 'Social Media',

    // Footer Section
    'footer.copyright': 'All rights reserved',
    'footer.built': 'Built with',
    'footer.love': 'love',
    'footer.and': 'and',
    'footer.coffee': 'coffee',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.download': 'Download',

    // Dynamic texts from Hero section
    'hero.dynamic.web': 'Advanced Web Developer 🚀',
    'hero.dynamic.flutter': 'Professional Flutter Developer 📱',
    'hero.dynamic.devops': 'DevOps Expert ☁️',
    'hero.dynamic.founder': 'Webnest Founder 🏢',
    'hero.dynamic.ai': 'Smart Applications Developer 🤖',
    'hero.dynamic.solutions': 'Technical Solutions Engineer 💡',

    // Theme and Language
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
    'lang.arabic': 'العربية',
    'lang.english': 'English'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('language') as Language;
      return stored || 'ar';
    }
    return 'ar';
  });

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  React.useEffect(() => {
    const isRTL = language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;

    // Handle text direction for specific elements
    const body = document.body;
    if (isRTL) {
      body.classList.add('rtl');
      body.classList.remove('ltr');
    } else {
      body.classList.add('ltr');
      body.classList.remove('rtl');
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
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
    'skills.tapInstruction': 'اضغط على أي مهارة لمعرفة التفاصيل',
    'skills.projects': 'مشروع',
    'skills.experience': 'سنوات الخبرة',
    'skills.projectsCount': 'عدد المشاريع',
    'skills.differentTechnologies': 'تقنية مختلفة',
    'skills.inMultipleFields': 'في مجالات متعددة',
    'skills.yearsExperience': 'سنوات خبرة',
    'skills.inDevelopment': 'في التطوير والبرمجة',
    'skills.completedProjects': 'مشروع مكتمل',
    'skills.acrossTechnologies': 'عبر مختلف التقنيات',

    // Projects Section
    'projects.title': 'مشاريعي المتميزة',
    'projects.subtitle': 'مجموعة مختارة من أفضل المشاريع التي عملت عليها، كل مشروع يعكس خبرتي في تقنيات مختلفة وحلول مبتكرة تلبي احتياجات العملاء المتنوعة.',
    'projects.all': 'جميع المشاريع',
    'projects.web': 'تطوير الويب',
    'projects.mobile': 'تطبيقات الموبايل',
    'projects.ai': 'الذكاء الاصطناعي',
    'projects.bots': 'بوتات',
    'projects.automation': 'الأتمتة',
    'projects.iot': 'إنترنت الأشياء',
    'projects.view': 'عرض المشروع',
    'projects.completed': 'مكتمل',
    'projects.inprogress': 'قيد التطوير',
    'projects.features': 'المميزات الرئيسية:',
    'projects.since': 'من',
    'projects.until': 'حتى',
    'projects.durationNotSpecified': 'غير محدد',
    'projects.today': 'اليوم',
    'projects.cta.title': 'عندك فكرة مشروع؟',
    'projects.cta.subtitle': 'دعني أساعدك في تحويل فكرتك إلى واقع رقمي مميز. أعمل معك من التخطيط حتى التنفيذ النهائي.',
    'projects.cta.button': 'ابدأ مشروعك الآن',
    'projects.prev': 'المشروع السابق',
    'projects.next': 'المشروع التالي',
    'projects.slide': 'انتقل إلى الشريحة',

    // About Section
    'about.title': 'من أنا',
    'about.subtitle': 'اكتشف قصتي ورحلتي في عالم البرمجة من خلال هذه البطاقات التفاعلية. كل بطاقة تحكي جزءاً من رحلتي المهنية والأهداف التي أسعى لتحقيقها.',
    'about.cardInstruction': 'اضغط على أي بطاقة لقراءة التفاصيل',
    'about.flipBack': 'اضغط مرة أخرى للعودة',
    'about.flipToAnswer': 'اضغط للإجابة',
    'about.whyChooseMe': 'لماذا تختار العمل معي؟',
    'about.fastExecution': 'سرعة في التنفيذ',
    'about.fastExecutionDesc': 'تسليم المشاريع في الوقت المحدد مع الحفاظ على أعلى معايير الجودة',
    'about.innovativeSolutions': 'حلول مبتكرة',
    'about.innovativeSolutionsDesc': 'استخدام أحدث التقنيات لتطوير حلول فريدة ومتطورة',
    'about.continuousSupport': 'دعم مستمر',
    'about.continuousSupportDesc': 'متابعة دائمة وصيانة شاملة لضمان استمرارية العمل بكفاءة',
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
    'skills.tapInstruction': 'Tap any skill to view details',
    'skills.projects': 'Projects',
    'skills.experience': 'Years Experience',
    'skills.projectsCount': 'Projects Count',
    'skills.differentTechnologies': 'Different Technologies',
    'skills.inMultipleFields': 'In Multiple Fields',
    'skills.yearsExperience': 'Years Experience',
    'skills.inDevelopment': 'In Development & Programming',
    'skills.completedProjects': 'Completed Projects',
    'skills.acrossTechnologies': 'Across Various Technologies',

    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A curated selection of my best work, each project showcases my expertise in different technologies and innovative solutions that meet diverse client needs.',
    'projects.all': 'All Projects',
    'projects.web': 'Web Development',
    'projects.mobile': 'Mobile Apps',
    'projects.ai': 'Artificial Intelligence',
    'projects.bots': 'Bots',
    'projects.automation': 'Automation',
    'projects.iot': 'Internet of Things',
    'projects.view': 'View Project',
    'projects.completed': 'Completed',
    'projects.inprogress': 'In Progress',
    'projects.features': 'Key Features:',
    'projects.since': 'Since',
    'projects.until': 'Until',
    'projects.durationNotSpecified': 'Duration not specified',
    'projects.today': 'Today',
    'projects.cta.title': 'Have a project idea?',
    'projects.cta.subtitle': 'Let me help you turn your idea into an outstanding digital reality. I work with you from planning to final execution.',
    'projects.cta.button': 'Start Your Project Now',
    'projects.prev': 'Previous Project',
    'projects.next': 'Next Project',
    'projects.slide': 'Go to slide',

    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Discover my story and journey in the programming world through these interactive cards. Each card tells part of my professional journey and the goals I strive to achieve.',
    'about.cardInstruction': 'Tap any card to read details',
    'about.flipBack': 'Tap again to go back',
    'about.flipToAnswer': 'Tap for answer',
    'about.whyChooseMe': 'Why Choose to Work With Me?',
    'about.fastExecution': 'Fast Execution',
    'about.fastExecutionDesc': 'Delivering projects on time while maintaining the highest quality standards',
    'about.innovativeSolutions': 'Innovative Solutions',
    'about.innovativeSolutionsDesc': 'Using the latest technologies to develop unique and advanced solutions',
    'about.continuousSupport': 'Continuous Support',
    'about.continuousSupportDesc': 'Ongoing follow-up and comprehensive maintenance to ensure efficient operation',
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
      // First, check URL parameters for language
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang') as Language;

      if (urlLang && (urlLang === 'en' || urlLang === 'ar')) {
        // If valid language in URL, use it and save to localStorage
        localStorage.setItem('language', urlLang);
        return urlLang;
      }

      // If no URL param, check localStorage
      const stored = localStorage.getItem('language') as Language;
      return stored || 'ar';
    }
    return 'ar';
  });

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;

    // Update URL without reloading the page
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    handleLanguageChange(newLang);
  };

  // Override setLanguage to use our handler
  const setLanguageWithUrl = (newLang: Language) => {
    handleLanguageChange(newLang);
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

  // Listen for URL changes (back/forward browser navigation)
  React.useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang') as Language;

      if (urlLang && (urlLang === 'en' || urlLang === 'ar') && urlLang !== language) {
        setLanguage(urlLang);
        localStorage.setItem('language', urlLang);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageWithUrl, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
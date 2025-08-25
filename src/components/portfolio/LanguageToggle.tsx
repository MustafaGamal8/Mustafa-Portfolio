import { Languages } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg bg-card text-card-foreground border border-border hover:bg-card-hover transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
      aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <Languages size={20} className="text-primary" />
      <span className="text-sm font-medium">
        {language === 'ar' ? 'EN' : 'ع'}
      </span>
    </button>
  );
};

export default LanguageToggle;
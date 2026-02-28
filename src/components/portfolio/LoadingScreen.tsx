'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { usePortfolioLoading } from '@/hooks/usePortfolioLoading';
import { Code2, Sparkles, Zap, Rocket } from 'lucide-react';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const { language } = useLanguage();
  const { isLoading, progress, loadedSections } = usePortfolioLoading();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth progress animation
  useEffect(() => {
    if (!mounted) return;

    const step = progress > displayProgress ? 1 : -1;
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev === progress) {
          clearInterval(timer);
          return prev;
        }
        const next = prev + step;
        return step > 0 ? Math.min(next, progress) : Math.max(next, progress);
      });
    }, 10);

    return () => clearInterval(timer);
  }, [progress, mounted, displayProgress]);

  // Hide loading screen when data is loaded
  useEffect(() => {
    if (!isLoading && progress >= 100 && mounted) {
      const timer = setTimeout(() => setIsVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress, mounted]);

  if (!mounted || !isVisible) return null;

  const sectionMessages = {
    hero: language === 'ar' ? 'تحميل البطاقة الشخصية...' : 'Loading profile...',
    about: language === 'ar' ? 'تحميل نبذة عني...' : 'Loading about section...',
    skills: language === 'ar' ? 'تحميل المهارات...' : 'Loading skills...',
    projects: language === 'ar' ? 'تحميل المشاريع...' : 'Loading projects...',
    achievements: language === 'ar' ? 'تحميل الإنجازات...' : 'Loading achievements...',
    contact: language === 'ar' ? 'تحميل معلومات التواصل...' : 'Loading contact info...',
  };

  const getCurrentMessage = () => {
    if (displayProgress >= 100) return language === 'ar' ? 'مرحباً بك!' : 'Welcome!';
    if (displayProgress >= 83) return sectionMessages.contact;
    if (displayProgress >= 67) return sectionMessages.achievements;
    if (displayProgress >= 50) return sectionMessages.projects;
    if (displayProgress >= 33) return sectionMessages.skills;
    if (displayProgress >= 17) return sectionMessages.about;
    return sectionMessages.hero;
  };

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5 z-[100] flex items-center justify-center transition-all duration-700 ${displayProgress >= 100 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-primary/25 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary/15 rounded-full animate-ping" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}></div>
      </div>

      <div className="text-center relative z-10 px-4">
        {/* Enhanced Logo Animation */}
        <div className="relative mb-12">
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/10"></div>

            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-primary/20"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-primary transition-all duration-300 ease-out"
                strokeDasharray={`${2 * Math.PI * 60}`}
                strokeDashoffset={`${2 * Math.PI * 60 * (1 - displayProgress / 100)}`}
                strokeLinecap="round"
              />
            </svg>

            {/* Spinning accent ring */}
            <div className="absolute inset-2 rounded-full border-2 border-primary/30 border-t-primary animate-spin" style={{ animationDuration: '3s' }}></div>

            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                  MG
                </span>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-primary animate-pulse" />
              </div>
            </div>

            {/* Corner icons */}
            <Code2 className="absolute -top-2 -left-2 w-6 h-6 text-primary/40 animate-bounce" style={{ animationDuration: '2s', animationDelay: '0s' }} />
            <Zap className="absolute -top-2 -right-2 w-6 h-6 text-primary/40 animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
            <Rocket className="absolute -bottom-2 -right-2 w-6 h-6 text-primary/40 animate-bounce" style={{ animationDuration: '2s', animationDelay: '1s' }} />
          </div>
        </div>

        {/* Name with gradient */}
        <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in">
          {language === 'ar' ? 'مصطفى جمال' : 'Mustafa Gamal'}
        </h1>
        <p className="text-lg text-muted-foreground mb-10 flex items-center justify-center gap-2">
          <Code2 className="w-4 h-4" />
          {language === 'ar' ? 'مهندس برمجيات' : 'Software Engineer'}
        </p>

        {/* Enhanced Progress Bar */}
        <div className="w-80 max-w-full mx-auto">
          <div className="flex justify-between text-sm text-muted-foreground mb-3">
            <span className="font-medium">{getCurrentMessage()}</span>
            <span className="font-bold text-primary">{displayProgress}%</span>
          </div>

          <div className="relative w-full bg-muted/50 rounded-full h-2.5 overflow-hidden shadow-inner">
            {/* Animated background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer"></div>

            {/* Progress fill */}
            <div
              className="h-full bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${displayProgress}%` }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          {/* Loaded sections indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {['hero', 'about', 'skills', 'projects', 'achievements', 'contact'].map((section) => (
              <div
                key={section}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${loadedSections.includes(section)
                    ? 'bg-primary scale-110'
                    : 'bg-muted-foreground/20 scale-100'
                  }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Loading status message */}
        <div className="mt-8 h-8">
          <p className="text-sm text-muted-foreground/80 animate-pulse flex items-center justify-center gap-2">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
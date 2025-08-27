'use client';
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 700);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted || !isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-background z-50 flex items-center justify-center transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
              style={{
                transform: `rotate(${progress * 3.6}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">MG</span>
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          مصطفى جمال
        </h1>
        <p className="text-muted-foreground mb-8">Software Engineer</p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>جاري التحميل...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div
              className="h-1 bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Loading Messages */}
        <div className="mt-6 h-6">
          <p className="text-sm text-muted-foreground animate-pulse">
            {progress < 25 && 'تحضير الواجهة...'}
            {progress >= 25 && progress < 50 && 'تحميل المشاريع...'}
            {progress >= 50 && progress < 75 && 'إعداد المهارات...'}
            {progress >= 75 && progress < 100 && 'اللمسات الأخيرة...'}
            {progress >= 100 && 'مرحباً بك!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
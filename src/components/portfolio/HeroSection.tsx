"use client";
import { useState, useEffect } from 'react';

const profileImage = '/assets/profile-image.jpg';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const dynamicTexts = [
    'مطور ويب متقدم',
    'مبرمج Flutter محترف',
    'خبير DevOps',
    'مؤسس Webnest',
    'مطور تطبيقات ذكية'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-card-hover px-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <img
              src={profileImage}
              alt="مصطفى جمال"
              className="w-full h-full object-cover rounded-full shadow-[var(--shadow-hover)] border-4 border-white animate-float"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent"></div>
          </div>
        </div>

        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
            مصطفى جمال
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            مهندس برمجيات – Software Engineer
          </p>

          <div className="h-16 flex items-center justify-center">
            <p className="text-lg md:text-xl text-primary font-medium transition-all duration-500">
              {dynamicTexts[currentText]}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => scrollToSection('projects')}
            className="hero-button-primary"
          >
            مشاريعي
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hero-button-secondary"
          >
            تواصل معي
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
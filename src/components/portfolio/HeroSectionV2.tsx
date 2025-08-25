"use client";

import { useState, useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const profileImage = '/assets/profile-image.jpg';

const HeroSectionV2 = () => {
  const [currentText, setCurrentText] = useState(0);
  const dynamicTexts = [
    'مطور ويب متقدم 🚀',
    'مبرمج Flutter محترف 📱',
    'خبير DevOps ☁️',
    'مؤسس Webnest 🏢',
    'مطور تطبيقات ذكية 🤖',
    'مهندس حلول تقنية 💡'
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
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card-hover to-background px-4 relative overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary-light/5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-light/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="text-center max-w-5xl mx-auto relative z-10">
        <div className="mb-12 animate-fade-in-up">
          <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light rounded-full animate-pulse-glow"></div>
            <img
              src={profileImage}
              alt="مصطفى جمال - مهندس برمجيات"
              className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white animate-float z-10"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 via-transparent to-primary-light/20"></div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce">
              <Sparkles size={16} className="text-primary-foreground" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary-light rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Greeting */}
          <div className="mb-6">
            <span className="inline-block px-6 py-2 bg-primary/10 text-primary rounded-full text-sm md:text-base font-medium border border-primary/20">
              أهلاً وسهلاً بك في عالمي التقني ✨
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
            مصطفى جمال
          </h1>

          <p className="text-xl md:text-3xl text-muted-foreground mb-8 font-medium">
            مهندس برمجيات – Software Engineer
          </p>

          {/* Dynamic Text with Better Animation */}
          <div className="h-20 flex items-center justify-center mb-8">
            <div className="relative">
              <p className="text-lg md:text-2xl text-primary font-semibold transition-all duration-700 transform">
                {dynamicTexts[currentText]}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-12">
            <div className="text-center p-4 bg-card/50 rounded-xl border border-border/50 backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">5+</div>
              <div className="text-xs md:text-sm text-muted-foreground">سنوات خبرة</div>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-xl border border-border/50 backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">100+</div>
              <div className="text-xs md:text-sm text-muted-foreground">مشروع مكتمل</div>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-xl border border-border/50 backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">50+</div>
              <div className="text-xs md:text-sm text-muted-foreground">عميل سعيد</div>
            </div>
          </div>

          {/* Enhanced Description */}
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            مرحباً! أنا مصطفى، مطور شغوف ومؤسس شركة <span className="text-primary font-medium">Webnest</span>.
            أحول الأفكار إلى حلول تقنية مبتكرة باستخدام أحدث التقنيات. من تطوير الويب إلى تطبيقات الموبايل،
            ومن الذكاء الاصطناعي إلى أنظمة DevOps - أقدم حلولاً شاملة تساعد الأعمال على النمو والازدهار.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => scrollToSection('projects')}
            className="hero-button-primary group"
          >
            <span>استكشف مشاريعي</span>
            <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hero-button-secondary"
          >
            تواصل معي الآن
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
          >
            <span className="text-sm">اكتشف المزيد</span>
            <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionV2;
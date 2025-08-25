'use client';
import React, { useEffect, useState } from 'react';
import { ArrowDown, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

const profileImage = '/assets/profile-image.jpg';

const HeroSectionV3 = () => {
  const { t, language } = useLanguage();
  const [currentText, setCurrentText] = useState(0);

  const dynamicTexts = [
    t('hero.dynamic.web'),
    t('hero.dynamic.flutter'),
    t('hero.dynamic.devops'),
    t('hero.dynamic.founder'),
    t('hero.dynamic.ai'),
    t('hero.dynamic.solutions')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  // Enhanced logo component with better design
  const CustomLogo = () => (
    <div
      className={`flex items-center justify-center gap-4 mb-8 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'
        }`}
    >
      {/* Enhanced M8 Logo */}
      <div className="relative group">
        <div className="text-4xl md:text-6xl font-bold text-primary relative transform group-hover:scale-105 transition-transform duration-300">
          <span className="relative inline-block">
            <span className="bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent">M</span>
            <span className="absolute -top-1 -right-1 text-lg md:text-2xl text-primary-light font-light animate-pulse">8</span>
          </span>
        </div>
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Enhanced code brackets with name */}
      <div className="flex flex-col items-center space-y-1">
        <div className="text-sm md:text-lg text-primary-dark font-mono animate-fade-in">&lt;</div>
        <div className="text-xl md:text-3xl font-bold text-foreground px-2 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-lg backdrop-blur-sm">
          {language === 'ar' ? 'مصطفى جمال' : 'Mostafa Gamal'}
        </div>
        <div className="text-sm md:text-lg text-primary-dark font-mono animate-fade-in">/&gt;</div>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
      <div className="absolute top-40 right-16 w-16 h-16 bg-primary-light/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Code symbols background */}
      <div className="absolute inset-0 opacity-5 text-primary text-[200px] font-mono overflow-hidden">
        <div className="absolute top-10 left-10">&lt;</div>
        <div className="absolute top-32 right-20">/&gt;</div>
        <div className="absolute bottom-20 left-32">{ }</div>
        <div className="absolute bottom-40 right-10">8</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Profile Image */}
          <div className="mb-10 animate-fade-in-up">
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light rounded-full animate-pulse opacity-75"></div>
              <img
                src={profileImage}
                alt={language === 'ar' ? 'مصطفى جمال - مهندس برمجيات' : 'Mostafa Gamal - Software Engineer'}
                className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white dark:border-gray-800 animate-float z-10"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 via-transparent to-primary-light/20"></div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce">
                <Sparkles size={12} className="text-primary-foreground" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary-light rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Greeting */}
          <div className="animate-fade-in-up mb-6" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm md:text-base font-medium border border-primary/20">
              {t('hero.greeting')} ✨
            </span>
          </div>

          {/* Custom Logo */}
          <div className="animate-scale-in mb-8" style={{ animationDelay: '0.2s' }}>
            {/* <CustomLogo /> */}
            <h1 className="text-5xl md:text-5xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
              {t('hero.name')}
            </h1>

            <p className="text-xl md:text-3xl text-muted-foreground mb-8 font-medium">
              {t('hero.title')}
            </p>

            {/* Dynamic Text with Better Animation */}
            <div className="h-20 flex items-center justify-center mb-8">
              <div className="relative">
                <p className="text-lg md:text-2xl text-primary font-semibold transition-all duration-700 transform">
                  {dynamicTexts[currentText]}
                </p>
              </div>
            </div>
          </div>



          {/* Description */}
          <div className="animate-fade-in-up mb-12" style={{ animationDelay: '0.6s' }}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up mb-12" style={{ animationDelay: '0.9s' }}>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5+</div>
                <div className="text-sm md:text-base text-muted-foreground">{t('hero.years')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm md:text-base text-muted-foreground">{t('hero.projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm md:text-base text-muted-foreground">{t('hero.clients')}</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up mb-16" style={{ animationDelay: '1.2s' }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#projects"
                className="hero-button-primary group"
              >
                {t('hero.cta.projects')}
                <ArrowDown
                  size={20}
                  className="ml-2 group-hover:translate-y-1 transition-transform duration-300"
                />
              </a>

              <a
                href="#contact"
                className="hero-button-secondary"
              >
                {t('hero.cta.contact')}
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
            <div className="flex flex-col items-center text-muted-foreground">
              <span className="text-sm mb-2">{t('hero.scroll')}</span>
              <ChevronDown size={24} className="animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionV3;
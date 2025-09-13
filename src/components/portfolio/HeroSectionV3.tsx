'use client';
import React, { useEffect, useState } from 'react';
import { ArrowDown, ChevronDown, FileDown, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import renderLucideIcon from '@/lib/frontend/utils/renderLucideIcon';


const HeroSectionV3 = () => {
  const { t, language } = useLanguage();
  const [currentText, setCurrentText] = useState(0);

  // Fetch hero data from API
  const { data: heroData, loading, error, isStaticData } = usePortfolioSection({
    sectionName: 'hero'
  });



  // Use API data if available, otherwise use static data
  const displayData = heroData ?? {};

  const dynamicTexts = displayData.dynamicTexts || [];
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (dynamicTexts.length > 1) {
      intervalId = setInterval(() => {
        setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
      }, 3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [dynamicTexts.length]);
  // Enhanced logo component with better design


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
                src={displayData?.profileImage?.url}
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
              {displayData.name}
            </h1>

            <p className="text-xl md:text-3xl text-muted-foreground mb-8 font-medium">
              {displayData.mainTitle}
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
              {displayData.description}
            </p>

            {/* Data Source Indicator */}
            {(loading || !isStaticData) && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
                <span className="text-xs text-muted-foreground">
                  {loading ? 'Loading from API...' : isStaticData ? 'Static Data' : 'Live Data ✓'}
                </span>
              </div>
            )}
          </div>

          {/* Stats - Now dynamic from API */}

          {/* {displayData.stats && displayData.stats.length > 0 && (
            <div className="animate-fade-in-up mb-12" style={{ animationDelay: '0.9s' }}>
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                {displayData.stats.map((stat: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">

                      <div className="text-3xl md:text-4xl font-bold text-primary">
                        {stat.value}+
                      </div>
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* CTA Buttons */}
          <div className="animate-fade-in-up mb-16" style={{ animationDelay: '1.2s' }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                href="#contact"
                className="hero-button-secondary"
              >
                {displayData.ctaText || t('hero.cta.contact')}
              </a>

              <a
                href="#about"
                className="hero-button-primary group"
              >
                {t('hero.cta.projects')}
                <ArrowDown
                  size={20}
                  className="ml-2 group-hover:translate-y-1 transition-transform duration-300"
                />
              </a>

            
              {displayData?.resume?.url && (
                <a
                  href={displayData.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-button-secondary flex items-center gap-2"
                >
                  {/* <FileDown size={20} /> */}
                  CV
                </a>
              )}
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
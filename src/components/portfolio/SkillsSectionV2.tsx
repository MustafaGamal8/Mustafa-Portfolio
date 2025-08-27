'use client';
import React, { useState } from 'react';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import { useLanguage } from './LanguageProvider';
import renderLucideIcon from '@/lib/frontend/utils/renderLucideIcon';
import { Code } from 'lucide-react';

const SkillsSectionV2 = () => {
  const { language, t } = useLanguage();
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Fetch skill categories data from API
  const { data: skillCategoriesData, loading, error, isStaticData } = usePortfolioSection({
    sectionName: 'skillCategories'
  });

  // Check if mobile on component mount
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  // Transform API data for display
  const skillCategories = skillCategoriesData && skillCategoriesData.length > 0
    ? skillCategoriesData.map((category: any) => ({
      title: category.title,
      icon: category.icon ? renderLucideIcon(category.icon, 24) : <Code size={24} />,
      gradient: category.gradient || 'from-blue-500 to-cyan-600',
      skills: category.skills ?
        (Array.isArray(category.skills) ?
          category.skills.map((skill: any) => typeof skill === 'string' ? skill : skill?.name || skill) :
          []) :
        [],
      description: category.description,
      experience: category.experience,
      projects: category.projectCount || 0
    }))
    : [];

  const handleSkillClick = (index: number) => {
    if (isMobile) {
      setActiveSkill(activeSkill === index ? null : index);
    }
  };

  const handleSkillHover = (index: number) => {
    if (!isMobile) {
      // Clear any existing timeout
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      // Set with small delay for smoother transitions
      const timeout = setTimeout(() => {
        setActiveSkill(index);
      }, 100);
      setHoverTimeout(timeout);
    }
  };

  const handleSkillLeave = () => {
    if (!isMobile) {
      // Clear any existing timeout
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      // Set with small delay for smoother transitions
      const timeout = setTimeout(() => {
        setActiveSkill(null);
      }, 150);
      setHoverTimeout(timeout);
    }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
            {t('skills.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('skills.subtitle')}
          </p>
          <p className="mobile-tap-indicator mt-4">
            {t('skills.tapInstruction')}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category: any, index: number) => (
            <div
              key={index}
              className={`bg-card rounded-2xl p-4 transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 shadow-[var(--shadow-card)] border border-border/50 animate-scale-in ${activeSkill === index
                ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[var(--shadow-hover)]'
                : 'hover:shadow-[var(--shadow-hover)] hover:bg-card-hover'
                }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleSkillClick(index)}
              onMouseEnter={() => handleSkillHover(index)}
              onMouseLeave={handleSkillLeave}
            >
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center shadow-lg ${activeSkill === index
                  ? 'bg-white/20 text-white'
                  : `bg-gradient-to-br ${category.gradient} text-white`
                  }`}>
                  {category.icon}
                </div>
                <h3 className={`text-sm md:text-base font-semibold mb-2 leading-tight ${activeSkill === index ? 'text-white' : 'text-card-foreground'
                  }`}>
                  {category.title}
                </h3>
                <div className={`text-xs ${activeSkill === index ? 'text-white/80' : 'text-muted-foreground'
                  }`}>
                  {category.projects} {t('skills.projects')}
                </div>

                {/* Mobile-only description */}
                <div className="md:hidden mt-3">
                  {activeSkill === index && (
                    <div className="text-xs text-white/90 leading-relaxed">
                      <p className="mb-2">{category.description}</p>
                      <div className="text-xs font-medium mb-1">{t('skills.technologies')}</div>
                      <div className="flex flex-wrap gap-1">
                        {(category.skills || []).slice(0, 3).map((skill: any, skillIndex: number) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-white/20 rounded text-xs"
                          >
                            {typeof skill === 'string' ? skill : skill?.name || skill}
                          </span>
                        ))}
                        {(category.skills || []).length > 3 && (
                          <span className="px-2 py-1 bg-white/20 rounded text-xs">
                            +{(category.skills || []).length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>




        {/* Always Visible Detailed View - Hidden on Mobile */}
        <div className="animate-fade-in-up hidden md:block">
          <div className={`bg-gradient-to-br min-h-[300px] ${activeSkill !== null ? skillCategories[activeSkill]?.gradient || 'from-gray-400 to-gray-500' : 'from-gray-400 to-gray-500'
            } rounded-2xl p-8 md:p-12 text-white shadow-2xl transition-all duration-700 ease-in-out`}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="transition-all duration-500 ease-in-out">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-300">
                    <div className="transition-transform duration-300 ease-in-out">
                      {activeSkill !== null ? React.cloneElement(skillCategories[activeSkill].icon, { size: 32 }) : <Code size={32} />}
                    </div>
                  </div>
                  <div className="transition-all duration-500 ease-in-out">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 transition-all duration-300">
                      {activeSkill !== null ? skillCategories[activeSkill].title : t('skills.placeholder')}
                    </h3>
                    <div className="flex items-center gap-4 text-sm opacity-90 transition-all duration-300">
                      <span>{activeSkill !== null ? skillCategories[activeSkill].experience : t('skills.experience')}</span>
                      <span>•</span>
                      <span>{activeSkill !== null ? `${skillCategories[activeSkill].projects} ${t('skills.projects')}` : t('skills.projectsCount')}</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-6 opacity-90 transition-all duration-500 ease-in-out">
                  {activeSkill !== null ? skillCategories[activeSkill].description : t('skills.hover')}
                </p>
              </div>

              <div className="transition-all duration-500 ease-in-out">
                <h4 className="text-xl font-semibold mb-4 transition-all duration-300">{t('skills.technologies')}</h4>
                <div className="grid grid-cols-2 gap-3">
                  {(activeSkill !== null
                    ? skillCategories[activeSkill]?.skills || []
                    : skillCategories.flatMap((cat: any) => cat.skills || []).slice(0, 4)
                  ).map((skill: any, skillIndex: number) => (
                    <div
                      key={`${activeSkill}-${skillIndex}`}
                      className="flex items-center gap-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${skillIndex * 0.05}s` }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 transition-all duration-200"></div>
                      <span className="text-sm font-medium transition-all duration-200">{typeof skill === 'string' ? skill : skill?.name || skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default SkillsSectionV2;
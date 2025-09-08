'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { ExternalLink, Github, Calendar, Users, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import { useLanguage } from './LanguageProvider';

const projectWebImage = '/assets/project-web.jpg';
const projectChatbotImage = '/assets/project-chatbot.jpg';
const projectDroneImage = '/assets/project-drone.jpg';
const projectFlutterImage = '/assets/project-flutter.jpg';
const projectManagementImage = '/assets/project-management.jpg';
const projectEcommerceImage = '/assets/project-ecommerce.jpg';

const ProjectsSectionV2 = () => {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // Fetch projects data from API
  const { data: projectsData, loading, error, isStaticData } = usePortfolioSection({
    sectionName: 'projects'
  });

  // Use API data if available, otherwise empty array  
  const projects = projectsData && projectsData.length > 0
    ? projectsData.map((project: any) => ({
      ...project,
      image: project.image?.url || getDefaultImage(project.category),
      tags: project.technologies || [],
      features: project.features || []
    }))
    : [];

  function getDefaultImage(category: string) {
    const imageMap: Record<string, string> = {
      'web': projectWebImage,
      'ai': projectChatbotImage,
      'iot': projectDroneImage,
      'mobile': projectFlutterImage
    };
    return imageMap[category] || projectWebImage;
  }

  // ✅ Dynamic categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map((p: any) => p.category)));

    return [
      { id: 'all', name: t('projects.all'), count: projects.length },
      ...uniqueCategories.map((cat) => ({
        id: cat,
        name: t(`projects.${cat}`) || cat,
        count: projects.filter((p: any) => p.category === cat).length
      }))
    ];
  }, [projects, t]);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((project: any) => project.category === selectedCategory);

  // ✅ update itemsPerSlide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth >= 1024) setItemsPerSlide(3);
      else if (window.innerWidth >= 768) setItemsPerSlide(1);
      else setItemsPerSlide(1);
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const totalSlides = Math.ceil(filteredProjects.length / itemsPerSlide);

  // ✅ reset slide when filter changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [filteredProjects]);

  // ✅ use totalSlides instead of recalculating
  const nextSlide = () => {
    if (totalSlides > 0) {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }
  };

  const prevSlide = () => {
    if (totalSlides > 0) {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  return (
    <section id="projects" className="py-20 px-4 bg-card-hover">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
            {t('projects.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            {t('projects.subtitle')}
          </p>

          {/* Data Source Indicator */}
          {(loading || !isStaticData) && (
            <div className="mb-8 flex items-center justify-center gap-2">
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              )}
              <span className="text-xs text-muted-foreground">
                {loading ? 'Loading from API...' : isStaticData ? 'Static Data' : 'Live Data ✓'}
              </span>
            </div>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id as any}
                onClick={() => {
                  setSelectedCategory(category.id as string);
                  setCurrentSlide(0);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-[var(--shadow-soft)]'
                  : 'bg-background text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border'
                  }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid/Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                width: `${totalSlides * 100}%`
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className={`flex w-full ${itemsPerSlide === 1 ? 'justify-center' : 'gap-6'}`}
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  {filteredProjects
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((project: any, index: number) => (
                      <div
                        key={`${project.title}-${slideIndex}-${index}`}
                        className={`project-card animate-scale-in flex flex-col ${itemsPerSlide === 1 ? 'w-full max-w-md' : 'max-w-md flex-1'
                          }`}
                        style={{
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <div className="relative overflow-hidden rounded-t-2xl group">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Project Status Badge */}
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === "COMPLETED"
                              ? 'bg-green-500 text-white'
                              : 'bg-yellow-500 text-white'
                              }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-3 line-clamp-2">
                            {project.title}
                          </h3>

                          <p className="text-muted-foreground text-sm md:text-base mb-4 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>

                          {/* Project Meta */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {project.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              {project.teamSize}
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.slice(0, 4).map((tag: any, tagIndex: number) => (
                              <span
                                key={tagIndex}
                                className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 4 && (
                              <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                +{project.tags.length - 4}
                              </span>
                            )}
                          </div>

                          {/* Key Features */}
                          <div className="mb-6 flex-1">
                            <h4 className="text-sm font-semibold mb-2 text-card-foreground">{t('projects.features')}</h4>
                            <div className="grid grid-cols-2 gap-1">
                              {project.features.slice(0, 4).map((feature: any, featureIndex: number) => (
                                <div key={featureIndex} className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Star size={12} className="text-primary flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons - Always at the bottom */}
                          <div className="mt-auto flex gap-3">
                            {project.projectUrl &&
                              <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary-dark transition-all duration-200 hover:scale-105 flex-1 justify-center"
                              >
                                <ExternalLink size={16} />
                                {t('projects.view')}
                              </a>
                            }

                            {project.github &&
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2.5 border border-border text-card-foreground text-sm font-medium rounded-lg hover:bg-card-hover transition-all duration-200 hover:scale-105"
                              >
                                <Github size={16} />
                              </a>
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-16 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-110 flex items-center justify-center"
                aria-label={t('projects.prev')}
              >
                <ArrowLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-16 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-110 flex items-center justify-center"
                aria-label={t('projects.next')}
              >
                <ArrowRight size={20} />
              </button>
            </>
          )}

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  aria-label={`${t('projects.slide')} ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary to-primary rounded-2xl p-8 md:p-12 text-primary-foreground">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('projects.cta.title')}
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {t('projects.cta.subtitle')}
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-button bg-white text-primary hover:bg-gray-50 hover:scale-105"
            >
              {t('projects.cta.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSectionV2;

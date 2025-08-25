'use client';
import React, { useState } from 'react';
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
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch projects data from API
  const { data: projectsData, loading, error, isStaticData } = usePortfolioSection({
    sectionName: 'projects'
  });

  // Static fallback data
  const staticProjects = [
    {
      title: language === 'ar' ? 'منصة Webnest الشاملة' : 'Comprehensive Webnest Platform',
      description: language === 'ar'
        ? 'موقع شركة متقدم يقدم خدمات تطوير الويب والتطبيقات مع نظام إدارة محتوى متطور ولوحة تحكم شاملة للعملاء والمشاريع.'
        : 'Advanced company website providing web and app development services with advanced content management system and comprehensive control panel for clients and projects.',
      longDescription: language === 'ar'
        ? 'منصة شاملة تضم موقع الشركة، نظام CRM متطور، لوحة تحكم للمشاريع، وسائل الدفع المتعددة، وتقارير تفصيلية. المنصة تدعم عدة لغات ومحسنة للسيو.'
        : 'Comprehensive platform including company website, advanced CRM system, project control panel, multiple payment methods, and detailed reports. The platform supports multiple languages and is SEO optimized.',
      image: projectWebImage,
      tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Laravel API'],
      category: 'web',
      link: 'https://webnest.com.eg',
      github: 'https://github.com/mostafa/webnest',
      status: language === 'ar' ? 'مكتمل' : 'Completed',
      duration: language === 'ar' ? '4 أشهر' : '4 months',
      teamSize: language === 'ar' ? '3 مطورين' : '3 developers',
      features: language === 'ar'
        ? ['نظام إدارة محتوى', 'متعدد اللغات', 'محسن للسيو', 'لوحة تحكم شاملة']
        : ['Content Management System', 'Multi-language', 'SEO Optimized', 'Comprehensive Dashboard']
    },
    {
      title: language === 'ar' ? 'نظام ChatBot AI المتطور' : 'Advanced AI ChatBot System',
      description: language === 'ar'
        ? 'chatbot ذكي للشركات مع معالجة اللغة الطبيعية، تعلم آلي، ودمج مع أنظمة CRM لخدمة عملاء متفوقة على مدار الساعة.'
        : 'Smart chatbot for companies with natural language processing, machine learning, and CRM system integration for superior 24/7 customer service.',
      longDescription: language === 'ar'
        ? 'نظام ذكاء اصطناعي متقدم يدعم المحادثات باللغة العربية والإنجليزية، مع قدرات تعلم مستمر وتحليل للمشاعر، ودمج مع أنظمة الشركة المختلفة.'
        : 'Advanced AI system supporting conversations in Arabic and English, with continuous learning capabilities and sentiment analysis, integrated with various company systems.',
      image: projectChatbotImage,
      tags: ['Python', 'TensorFlow', 'NLP', 'FastAPI', 'Redis'],
      category: 'ai',
      link: 'https://demo.chatbot-ai.com',
      github: 'https://github.com/mostafa/ai-chatbot',
      status: language === 'ar' ? 'مكتمل' : 'Completed',
      duration: language === 'ar' ? '6 أشهر' : '6 months',
      teamSize: language === 'ar' ? '2 مطورين' : '2 developers',
      features: language === 'ar'
        ? ['معالجة اللغة الطبيعية', 'تعلم آلي', 'دعم متعدد اللغات', 'تحليل المشاعر']
        : ['Natural Language Processing', 'Machine Learning', 'Multi-language Support', 'Sentiment Analysis']
    },
    {
      title: language === 'ar' ? 'منصة الزراعة الذكية' : 'Smart Agriculture Platform',
      description: language === 'ar'
        ? 'نظام متكامل لمراقبة المحاصيل باستخدام طائرة DJI Mavic 3M مع معالجة الصور بالذكاء الاصطناعي وتحليل البيانات الزراعية.'
        : 'Integrated system for crop monitoring using DJI Mavic 3M drone with AI image processing and agricultural data analysis.',
      longDescription: language === 'ar'
        ? 'منصة شاملة تجمع بين تقنيات الطائرات المسيرة والذكاء الاصطناعي لمراقبة المحاصيل، تحليل التربة، كشف الآفات، وتوفير توصيات زراعية مخصصة للمزارعين.'
        : 'Comprehensive platform combining drone technology and artificial intelligence for crop monitoring, soil analysis, pest detection, and providing customized agricultural recommendations for farmers.',
      image: projectDroneImage,
      tags: ['Python', 'OpenCV', 'Machine Learning', 'IoT', 'React Dashboard'],
      category: 'iot',
      link: 'https://smart-agriculture.com',
      github: 'https://github.com/mostafa/smart-agriculture',
      status: language === 'ar' ? 'مكتمل' : 'Completed',
      duration: language === 'ar' ? '8 أشهر' : '8 months',
      teamSize: language === 'ar' ? '4 مطورين' : '4 developers',
      features: language === 'ar'
        ? ['تحليل الصور الجوية', 'كشف الآفات', 'تحليل التربة', 'تقارير مفصلة']
        : ['Aerial Image Analysis', 'Pest Detection', 'Soil Analysis', 'Detailed Reports']
    }
  ];

  // Use API data if available, otherwise use static data
  const projects = projectsData && projectsData.length > 0
    ? projectsData.map((project: any) => ({
      ...project,
      image: project.image?.url || getDefaultImage(project.category),
      tags: project.technologies || [],
      features: project.features || []
    }))
    : staticProjects;

  function getDefaultImage(category: string) {
    const imageMap: Record<string, string> = {
      'web': projectWebImage,
      'ai': projectChatbotImage,
      'iot': projectDroneImage,
      'mobile': projectFlutterImage
    };
    return imageMap[category] || projectWebImage;
  }

  const categories = [
    { id: 'all', name: language === 'ar' ? 'جميع المشاريع' : 'All Projects', count: projects.length },
    { id: 'web', name: language === 'ar' ? 'تطوير الويب' : 'Web Development', count: projects.filter((p: any) => p.category === 'web').length },
    { id: 'mobile', name: language === 'ar' ? 'تطبيقات الموبايل' : 'Mobile Apps', count: projects.filter((p: any) => p.category === 'mobile').length },
    { id: 'ai', name: language === 'ar' ? 'الذكاء الاصطناعي' : 'Artificial Intelligence', count: projects.filter((p: any) => p.category === 'ai').length },
    { id: 'iot', name: language === 'ar' ? 'إنترنت الأشياء' : 'IoT', count: projects.filter((p: any) => p.category === 'iot').length }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const nextSlide = () => {
    const maxSlides = Math.ceil(filteredProjects.length / itemsPerSlide);
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    const maxSlides = Math.ceil(filteredProjects.length / itemsPerSlide);
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const [itemsPerSlide, setItemsPerSlide] = React.useState(2);

  React.useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth >= 1024) setItemsPerSlide(2);
      else if (window.innerWidth >= 768) setItemsPerSlide(1);
      else setItemsPerSlide(1);
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const totalSlides = Math.ceil(filteredProjects.length / itemsPerSlide);

  return (
    <section id="projects" className="py-20 px-4 bg-card-hover">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
            {language === 'ar' ? 'مشاريعي المتميزة' : 'My Featured Projects'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            {language === 'ar'
              ? 'مجموعة مختارة من أفضل المشاريع التي عملت عليها، كل مشروع يعكس خبرتي في تقنيات مختلفة وحلول مبتكرة تلبي احتياجات العملاء المتنوعة.'
              : 'A curated selection of the best projects I\'ve worked on, each project reflects my expertise in different technologies and innovative solutions that meet diverse client needs.'
            }
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
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
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
                    .map((project, index) => (
                      <div
                        key={`${project.title}-${slideIndex}-${index}`}
                        className={`project-card animate-scale-in ${itemsPerSlide === 1 ? 'w-full max-w-md' : 'flex-1'
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
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'مكتمل'
                              ? 'bg-green-500 text-white'
                              : 'bg-yellow-500 text-white'
                              }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
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
                            {project.tags.slice(0, 4).map((tag, tagIndex) => (
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
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold mb-2 text-card-foreground">المميزات الرئيسية:</h4>
                            <div className="grid grid-cols-2 gap-1">
                              {project.features.slice(0, 4).map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Star size={12} className="text-primary flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary-dark transition-all duration-200 hover:scale-105 flex-1 justify-center"
                            >
                              <ExternalLink size={16} />
                              عرض المشروع
                            </a>

                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2.5 border border-border text-card-foreground text-sm font-medium rounded-lg hover:bg-card-hover transition-all duration-200 hover:scale-105"
                            >
                              <Github size={16} />
                            </a>
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
                aria-label="المشروع السابق"
              >
                <ArrowLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-16 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-110 flex items-center justify-center"
                aria-label="المشروع التالي"
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
                  aria-label={`انتقل إلى الشريحة ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 md:p-12 text-primary-foreground">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              عندك فكرة مشروع؟
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              دعني أساعدك في تحويل فكرتك إلى واقع رقمي مميز. أعمل معك من التخطيط حتى التنفيذ النهائي.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-button bg-white text-primary hover:bg-gray-50 hover:scale-105"
            >
              ابدأ مشروعك الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSectionV2;
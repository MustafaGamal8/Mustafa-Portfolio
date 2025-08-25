'use client';
'use client';
import React, { useState } from 'react';
import { ExternalLink, Github, Calendar, Users, Star, ArrowLeft, ArrowRight } from 'lucide-react';

const projectWebImage = '/assets/project-web.jpg';
const projectChatbotImage = '/assets/project-chatbot.jpg';
const projectDroneImage = '/assets/project-drone.jpg';
const projectFlutterImage = '/assets/project-flutter.jpg';
const projectManagementImage = '/assets/project-management.jpg';
const projectEcommerceImage = '/assets/project-ecommerce.jpg';

const ProjectsSectionV2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      title: 'منصة Webnest الشاملة',
      description: 'موقع شركة متقدم يقدم خدمات تطوير الويب والتطبيقات مع نظام إدارة محتوى متطور ولوحة تحكم شاملة للعملاء والمشاريع.',
      longDescription: 'منصة شاملة تضم موقع الشركة، نظام CRM متطور، لوحة تحكم للمشاريع، وسائل الدفع المتعددة، وتقارير تفصيلية. المنصة تدعم عدة لغات ومحسنة للسيو.',
      image: projectWebImage,
      tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Laravel API'],
      category: 'web',
      link: 'https://webnest.com.eg',
      github: 'https://github.com/mostafa/webnest',
      status: 'مكتمل',
      duration: '4 أشهر',
      teamSize: '3 مطورين',
      features: ['نظام إدارة محتوى', 'متعدد اللغات', 'محسن للسيو', 'لوحة تحكم شاملة']
    },
    {
      title: 'نظام ChatBot AI المتطور',
      description: 'chatbot ذكي للشركات مع معالجة اللغة الطبيعية، تعلم آلي، ودمج مع أنظمة CRM لخدمة عملاء متفوقة على مدار الساعة.',
      longDescription: 'نظام ذكاء اصطناعي متقدم يدعم المحادثات باللغة العربية والإنجليزية، مع قدرات تعلم مستمر وتحليل للمشاعر، ودمج مع أنظمة الشركة المختلفة.',
      image: projectChatbotImage,
      tags: ['Python', 'TensorFlow', 'NLP', 'FastAPI', 'Redis'],
      category: 'ai',
      link: 'https://demo.chatbot-ai.com',
      github: 'https://github.com/mostafa/ai-chatbot',
      status: 'مكتمل',
      duration: '6 أشهر',
      teamSize: '2 مطورين',
      features: ['معالجة اللغة الطبيعية', 'تعلم آلي', 'دعم متعدد اللغات', 'تحليل المشاعر']
    },
    {
      title: 'منصة الزراعة الذكية',
      description: 'نظام متكامل لمراقبة المحاصيل باستخدام طائرة DJI Mavic 3M مع معالجة الصور بالذكاء الاصطناعي وتحليل البيانات الزراعية.',
      longDescription: 'منصة شاملة تجمع بين تقنيات الطائرات المسيرة والذكاء الاصطناعي لمراقبة المحاصيل، تحليل التربة، كشف الآفات، وتوفير توصيات زراعية مخصصة للمزارعين.',
      image: projectDroneImage,
      tags: ['Python', 'OpenCV', 'Machine Learning', 'IoT', 'React Dashboard'],
      category: 'iot',
      link: 'https://smart-agriculture.com',
      github: 'https://github.com/mostafa/smart-agriculture',
      status: 'مكتمل',
      duration: '8 أشهر',
      teamSize: '4 مطورين',
      features: ['تحليل الصور الجوية', 'كشف الآفات', 'تحليل التربة', 'تقارير مفصلة']
    },
    {
      title: 'تطبيق EcoLife Mobile',
      description: 'تطبيق Flutter متعدد المنصات للحياة الصحية والبيئية مع تتبع الأنشطة، نصائح بيئية، ونظام مكافآت تفاعلي.',
      longDescription: 'تطبيق شامل يساعد المستخدمين على تبني نمط حياة صحي وصديق للبيئة، مع ميزات تتبع الأنشطة، حساب البصمة الكربونية، ومجتمع تفاعلي للمستخدمين.',
      image: projectFlutterImage,
      tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Push Notifications'],
      category: 'mobile',
      link: 'https://apps.apple.com/ecolife',
      github: 'https://github.com/mostafa/ecolife-app',
      status: 'مكتمل',
      duration: '5 أشهر',
      teamSize: '2 مطورين',
      features: ['تتبع الأنشطة', 'حساب البصمة الكربونية', 'نظام مكافآت', 'مجتمع تفاعلي']
    },
    {
      title: 'نظام إدارة المشاريع ProManager',
      description: 'منصة شاملة لإدارة المشاريع والفرق مع تتبع المهام، إدارة الموارد، تقارير تفصيلية، وتكامل مع أدوات التطوير.',
      longDescription: 'نظام متطور لإدارة المشاريع يوفر أدوات شاملة للتخطيط، التنفيذ، والمتابعة مع لوحات تحكم تفاعلية، إشعارات ذكية، وتقارير مفصلة لتحليل الأداء.',
      image: projectManagementImage,
      tags: ['Laravel', 'Vue.js', 'MySQL', 'Redis', 'Websockets'],
      category: 'web',
      link: 'https://promanager-demo.com',
      github: 'https://github.com/mostafa/promanager',
      status: 'مكتمل',
      duration: '7 أشهر',
      teamSize: '5 مطورين',
      features: ['إدارة المهام', 'تتبع الوقت', 'تقارير تفاعلية', 'التعاون الجماعي']
    },
    {
      title: 'متجر TechMart الإلكتروني',
      description: 'منصة تجارة إلكترونية متطورة للأجهزة التقنية مع نظام دفع متعدد، إدارة المخزون، وتجربة تسوق متميزة.',
      longDescription: 'متجر إلكتروني شامل يوفر تجربة تسوق سلسة مع محرك بحث متقدم، توصيات ذكية، نظام مراجعات، وإدارة شاملة للطلبات والشحن.',
      image: projectEcommerceImage,
      tags: ['Next.js', 'Stripe', 'MongoDB', 'Node.js', 'Tailwind CSS'],
      category: 'web',
      link: 'https://techmart-demo.com',
      github: 'https://github.com/mostafa/techmart',
      status: 'قيد التطوير',
      duration: '6 أشهر',
      teamSize: '4 مطورين',
      features: ['نظام دفع متعدد', 'إدارة المخزون', 'توصيات ذكية', 'تتبع الطلبات']
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع المشاريع', count: projects.length },
    { id: 'web', name: 'تطوير الويب', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', name: 'تطبيقات الموبايل', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'ai', name: 'الذكاء الاصطناعي', count: projects.filter(p => p.category === 'ai').length },
    { id: 'iot', name: 'إنترنت الأشياء', count: projects.filter(p => p.category === 'iot').length }
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
            مشاريعي المتميزة
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            مجموعة مختارة من أفضل المشاريع التي عملت عليها، كل مشروع يعكس خبرتي في تقنيات مختلفة
            وحلول مبتكرة تلبي احتياجات العملاء المتنوعة.
          </p>

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
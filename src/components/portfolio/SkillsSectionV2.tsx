'use client';
'use client';
import React, { useState } from 'react';
import { Code, Smartphone, Cloud, Brain, Zap, Database, Palette, Shield } from 'lucide-react';

const SkillsSectionV2 = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on component mount
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skillCategories = [
    {
      title: 'تطوير الويب',
      icon: <Code size={24} />,
      gradient: 'from-blue-500 to-cyan-600',
      skills: ['React.js & Next.js', 'Laravel & PHP', 'Node.js & Express', 'TypeScript', 'Tailwind CSS', 'REST & GraphQL APIs'],
      description: 'بناء مواقع وتطبيقات ويب حديثة وسريعة باستخدام أحدث التقنيات والأطر البرمجية.',
      experience: '5+ سنوات خبرة',
      projects: 15
    },
    {
      title: 'تطوير التطبيقات',
      icon: <Smartphone size={24} />,
      gradient: 'from-green-500 to-emerald-600',
      skills: ['Flutter & Dart', 'React Native', 'iOS & Android Native', 'Firebase Integration', 'State Management', 'Push Notifications'],
      description: 'تطوير تطبيقات موبايل متعددة المنصات بواجهات مستخدم جميلة وأداء عالي.',
      experience: '3+ سنوات خبرة',
      projects: 8
    },
    {
      title: 'DevOps & Cloud',
      icon: <Cloud size={24} />,
      gradient: 'from-purple-500 to-violet-600',
      skills: ['AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Linux Administration', 'Monitoring & Logging', 'Infrastructure as Code'],
      description: 'إدارة وأتمتة البنية التحتية السحابية لضمان الأداء العالي والموثوقية.',
      experience: '3+ سنوات خبرة',
      projects: 10
    },
    {
      title: 'الذكاء الاصطناعي',
      icon: <Brain size={24} />,
      gradient: 'from-orange-500 to-red-600',
      skills: ['Python & TensorFlow', 'Natural Language Processing', 'Computer Vision', 'Machine Learning', 'Data Analysis', 'OpenCV'],
      description: 'تطوير حلول ذكية باستخدام الذكاء الاصطناعي وتعلم الآلة لمعالجة البيانات.',
      experience: '2+ سنوات خبرة',
      projects: 6
    },
    {
      title: 'الأتمتة والبرمجة',
      icon: <Zap size={24} />,
      gradient: 'from-yellow-500 to-orange-600',
      skills: ['Process Automation', 'Web Scraping', 'API Integration', 'Workflow Optimization', 'Task Scheduling', 'Bot Development'],
      description: 'أتمتة العمليات المتكررة وتحسين سير العمل لزيادة الكفاءة والإنتاجية.',
      experience: '4+ سنوات خبرة',
      projects: 12
    },
    {
      title: 'قواعد البيانات',
      icon: <Database size={24} />,
      gradient: 'from-indigo-500 to-blue-600',
      skills: ['MySQL & PostgreSQL', 'MongoDB & Redis', 'Database Design', 'Query Optimization', 'Data Migration', 'Backup Strategies'],
      description: 'تصميم وإدارة قواعد البيانات المحسنة للأداء العالي والأمان.',
      experience: '4+ سنوات خبرة',
      projects: 20
    },
    {
      title: 'UI/UX Design',
      icon: <Palette size={24} />,
      gradient: 'from-pink-500 to-rose-600',
      skills: ['Figma & Adobe XD', 'Responsive Design', 'User Experience', 'Prototyping', 'Design Systems', 'Accessibility'],
      description: 'تصميم واجهات مستخدم جميلة وسهلة الاستخدام مع تجربة مستخدم متميزة.',
      experience: '3+ سنوات خبرة',
      projects: 25
    },
    {
      title: 'الأمان والحماية',
      icon: <Shield size={24} />,
      gradient: 'from-teal-500 to-cyan-600',
      skills: ['Security Auditing', 'Penetration Testing', 'SSL/TLS Setup', 'Authentication Systems', 'Data Protection', 'Security Best Practices'],
      description: 'تأمين التطبيقات والأنظمة ضد التهديدات السيبرانية وحماية البيانات.',
      experience: '2+ سنوات خبرة',
      projects: 8
    }
  ];

  const handleSkillClick = (index: number) => {
    if (isMobile) {
      setActiveSkill(activeSkill === index ? null : index);
    }
  };

  const handleSkillHover = (index: number) => {
    if (!isMobile) {
      setActiveSkill(index);
    }
  };

  const handleSkillLeave = () => {
    if (!isMobile) {
      setActiveSkill(null);
    }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
            مهاراتي التقنية
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            خبرة واسعة في مجالات متعددة من البرمجة والتطوير، مع التركيز على أحدث التقنيات
            والممارسات الأفضل في الصناعة.
          </p>
          <p className="mobile-tap-indicator mt-4">اضغط على أي مهارة لمعرفة التفاصيل</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`bg-card rounded-2xl p-4 transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 shadow-[var(--shadow-card)] border border-border/50 animate-scale-in ${activeSkill === index
                  ? 'bg-gradient-to-br from-primary to-primary-light text-primary-foreground shadow-[var(--shadow-hover)]'
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
                  {category.projects} مشروع
                </div>

                {/* Mobile-only description */}
                <div className="md:hidden mt-3">
                  {activeSkill === index && (
                    <div className="text-xs text-white/90 leading-relaxed">
                      <p className="mb-2">{category.description}</p>
                      <div className="text-xs font-medium mb-1">التقنيات:</div>
                      <div className="flex flex-wrap gap-1">
                        {category.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-white/20 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {category.skills.length > 3 && (
                          <span className="px-2 py-1 bg-white/20 rounded text-xs">
                            +{category.skills.length - 3}
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
          <div className={`bg-gradient-to-br ${activeSkill !== null ? skillCategories[activeSkill].gradient : 'from-gray-400 to-gray-500'
            } rounded-2xl p-8 md:p-12 text-white shadow-2xl transition-all duration-500`}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    {activeSkill !== null ? React.cloneElement(skillCategories[activeSkill].icon, { size: 32 }) : <Code size={32} />}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {activeSkill !== null ? skillCategories[activeSkill].title : 'اختر مهارة لعرض التفاصيل'}
                    </h3>
                    <div className="flex items-center gap-4 text-sm opacity-90">
                      <span>{activeSkill !== null ? skillCategories[activeSkill].experience : 'سنوات الخبرة'}</span>
                      <span>•</span>
                      <span>{activeSkill !== null ? `${skillCategories[activeSkill].projects} مشروع` : 'عدد المشاريع'}</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-6 opacity-90">
                  {activeSkill !== null ? skillCategories[activeSkill].description : 'مرر الماوس فوق أي مهارة أعلاه لرؤية الوصف التفصيلي والتقنيات المستخدمة في هذا المجال.'}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">التقنيات والأدوات:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {(activeSkill !== null ? skillCategories[activeSkill].skills : ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker']).map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center gap-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"
                    >
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-card rounded-2xl shadow-[var(--shadow-card)] border border-border">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-lg font-semibold text-card-foreground mb-1">تقنية مختلفة</div>
            <div className="text-sm text-muted-foreground">في مجالات متعددة</div>
          </div>

          <div className="text-center p-6 bg-card rounded-2xl shadow-[var(--shadow-card)] border border-border">
            <div className="text-4xl font-bold text-primary mb-2">5+</div>
            <div className="text-lg font-semibold text-card-foreground mb-1">سنوات خبرة</div>
            <div className="text-sm text-muted-foreground">في التطوير والبرمجة</div>
          </div>

          <div className="text-center p-6 bg-card rounded-2xl shadow-[var(--shadow-card)] border border-border">
            <div className="text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-lg font-semibold text-card-foreground mb-1">مشروع مكتمل</div>
            <div className="text-sm text-muted-foreground">عبر مختلف التقنيات</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSectionV2;
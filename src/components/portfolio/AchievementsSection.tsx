'use client';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import { useLanguage } from './LanguageProvider';

const AchievementsSection = () => {
  const { language } = useLanguage();

  // Fetch achievements data from API
  const { data: achievementsData, loading, error, isStaticData } = usePortfolioSection({
    sectionName: 'achievements'
  });

  // Static fallback data
  const staticAchievements = [
    {
      icon: '🏅',
      title: language === 'ar' ? '+20 مشروع' : '+20 Projects',
      subtitle: language === 'ar' ? 'مشروع مكتمل' : 'Completed Projects',
      description: language === 'ar'
        ? 'مشاريع متنوعة من مواقع الويب إلى تطبيقات الموبايل'
        : 'Diverse projects from websites to mobile applications',
      value: '+20'
    },
    {
      icon: '🏆',
      title: language === 'ar' ? '+15 عميل سعيد' : '+15 Happy Clients',
      subtitle: language === 'ar' ? 'عميل راضي' : 'Satisfied Clients',
      description: language === 'ar'
        ? 'عملاء من مختلف القطاعات حققوا أهدافهم معنا'
        : 'Clients from various sectors who achieved their goals with us',
      value: '+15'
    },
    {
      icon: '🚀',
      title: language === 'ar' ? '+5 سنوات خبرة' : '+5 Years Experience',
      subtitle: language === 'ar' ? 'في المجال' : 'In the Field',
      description: language === 'ar'
        ? 'خبرة متراكمة في تقنيات البرمجة الحديثة'
        : 'Accumulated experience in modern programming technologies',
      value: '+5'
    },
    {
      icon: '💡',
      title: language === 'ar' ? '3 منتجات مبتكرة' : '3 Innovative Products',
      subtitle: language === 'ar' ? 'حلول فريدة' : 'Unique Solutions',
      description: language === 'ar'
        ? 'أنظمة ذكية ومتطورة تلبي احتياجات السوق'
        : 'Smart and advanced systems that meet market needs',
      value: '3'
    },
    {
      icon: '🎯',
      title: language === 'ar' ? '98% معدل نجاح' : '98% Success Rate',
      subtitle: language === 'ar' ? 'في المشاريع' : 'In Projects',
      description: language === 'ar'
        ? 'التزام بالجودة والمواعيد المحددة'
        : 'Commitment to quality and deadlines',
      value: '98%'
    },
    {
      icon: '🌟',
      title: language === 'ar' ? 'شركة Webnest' : 'Webnest Company',
      subtitle: language === 'ar' ? 'مؤسس الشركة' : 'Company Founder',
      description: language === 'ar'
        ? 'شركة متخصصة في حلول الويب والتطبيقات الذكية'
        : 'Company specialized in web solutions and smart applications',
      value: '1'
    }
  ];

  // Use API data if available, otherwise use static data
  const achievements = achievementsData && achievementsData.length > 0
    ? achievementsData.map((achievement: any, index: number) => ({
      ...achievement,
      icon: getIconByOrder(index)
    }))
    : staticAchievements;

  function getIconByOrder(order: number) {
    const icons = ['🏅', '🏆', '🚀', '💡', '🎯', '🌟'];
    return icons[order % icons.length];
  }

  return (
    <section id="achievements" className="py-20 px-4 bg-card-hover">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {language === 'ar' ? 'إنجازاتي ونجاحاتي' : 'My Achievements & Success'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar'
              ? 'أرقام تحكي قصة النجاح والتطور المستمر في مسيرتي المهنية'
              : 'Numbers that tell the story of success and continuous development in my professional journey'
            }
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement: any, index: number) => (
            <div
              key={index}
              className="achievement-badge animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                  {achievement.icon}
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  {achievement.title}
                </h3>

                <p className="text-sm opacity-90 mb-3">
                  {achievement.subtitle}
                </p>

                <p className="text-sm opacity-80 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
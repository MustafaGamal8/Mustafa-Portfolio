'use client';
const AchievementsSection = () => {
  const achievements = [
    {
      icon: '🏅',
      title: '+20 مشروع',
      subtitle: 'مشروع مكتمل',
      description: 'مشاريع متنوعة من مواقع الويب إلى تطبيقات الموبايل'
    },
    {
      icon: '🏆', 
      title: '+15 عميل سعيد',
      subtitle: 'عميل راضي',
      description: 'عملاء من مختلف القطاعات حققوا أهدافهم معنا'
    },
    {
      icon: '🚀',
      title: '+5 سنوات خبرة',
      subtitle: 'في المجال',
      description: 'خبرة متراكمة في تقنيات البرمجة الحديثة'
    },
    {
      icon: '💡',
      title: '3 منتجات مبتكرة',
      subtitle: 'حلول فريدة',
      description: 'أنظمة ذكية ومتطورة تلبي احتياجات السوق'
    },
    {
      icon: '🎯',
      title: '98% معدل نجاح',
      subtitle: 'في المشاريع',
      description: 'التزام بالجودة والمواعيد المحددة'
    },
    {
      icon: '🌟',
      title: 'شركة Webnest',
      subtitle: 'مؤسس الشركة',
      description: 'شركة متخصصة في حلول الويب والتطبيقات الذكية'
    }
  ];

  return (
    <section id="achievements" className="py-20 px-4 bg-card-hover">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            إنجازاتي ونجاحاتي
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            أرقام تحكي قصة النجاح والتطور المستمر في مسيرتي المهنية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
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
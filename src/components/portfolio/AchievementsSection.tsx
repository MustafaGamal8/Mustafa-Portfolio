'use client';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import { useLanguage } from './LanguageProvider';

const AchievementsSection = () => {
  const { language } = useLanguage();

  // Fetch achievements data from API
  const { data: achievementsData, loading, error, isStaticData } = usePortfolioSection({
    sectionName: 'achievements'
  });

  // No static data - all comes from API

  // Use API data if available, otherwise empty array
  const achievements = achievementsData && achievementsData.length > 0
    ? achievementsData.map((achievement: any, index: number) => ({
      ...achievement,
      icon: achievement.icon || getIconByOrder(index)
    }))
    : [];

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

        <div className=" flex flex-wrap justify-center gap-6">
          {achievements.map((achievement: any, index: number) => (
            <div
              key={index}
              className="achievement-badge animate-scale-in w-[350px]"
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
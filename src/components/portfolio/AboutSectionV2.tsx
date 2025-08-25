'use client';
import { useState } from 'react';
import { Code, Lightbulb, Target, Rocket, Users, Award } from 'lucide-react';
import { usePortfolioSection } from '@/hooks/usePortfolioSection';
import { useLanguage } from './LanguageProvider';

const AboutSectionV2 = () => {
  const { language } = useLanguage();
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Fetch about data from API
  const { data: aboutData, loading, error, isStaticData } = usePortfolioSection({
    sectionName: 'about'
  });


  // Use API data if available, otherwise use static data
  const qaCards = aboutData && aboutData.length > 0
    ? aboutData.map((card: any, index: number) => ({
      icon: getIconByOrder(index),
      question: card.question,
      answer: card.answer,
      gradient: getGradientByOrder(index)
    }))
    : [];

  function getIconByOrder(order: number) {
    const icons = [<Users size={32} />, <Rocket size={32} />, <Code size={32} />, <Lightbulb size={32} />, <Target size={32} />, <Award size={32} />];
    return icons[order % icons.length];
  }

  function getGradientByOrder(order: number) {
    const gradients = [
      "from-blue-500 to-purple-600",
      "from-green-500 to-teal-600",
      "from-orange-500 to-red-600",
      "from-purple-500 to-pink-600",
      "from-indigo-500 to-blue-600",
      "from-yellow-500 to-orange-600"
    ];
    return gradients[order % gradients.length];
  }

  const handleCardClick = (index: number) => {
    const newFlippedCards = new Set(flippedCards);
    if (newFlippedCards.has(index)) {
      newFlippedCards.delete(index);
    } else {
      newFlippedCards.add(index);
    }
    setFlippedCards(newFlippedCards);
  };

  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
            {language === 'ar' ? 'تعرف عليّ أكتر' : 'Get to Know Me More'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'اكتشف قصتي ورحلتي في عالم البرمجة من خلال هذه البطاقات التفاعلية. كل بطاقة تحكي جزءاً من رحلتي المهنية والأهداف التي أسعى لتحقيقها.'
              : 'Discover my story and journey in the programming world through these interactive cards. Each card tells part of my professional journey and the goals I strive to achieve.'
            }
          </p>
          <p className="mobile-tap-indicator mt-4">
            {language === 'ar' ? 'اضغط على أي بطاقة لقراءة التفاصيل' : 'Tap any card to read details'}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {qaCards.map((card: any, index: number) => (
            <div
              key={index}
              className={`flip-card animate-scale-in ${flippedCards.has(index) ? 'flipped' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCardClick(index)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front group">
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {card.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-4">
                      {card.question}
                    </h3>
                    <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4"></div>
                    <p className="text-muted-foreground text-sm">
                      {flippedCards.has(index) ? 'اضغط مرة أخرى للعودة' : 'اضغط للإجابة'}
                    </p>
                  </div>
                </div>

                <div className={`flip-card-back bg-gradient-to-br ${card.gradient}`}>
                  <div className="text-center">
                    <div className="mb-4 text-white/90">
                      {card.icon}
                    </div>
                    <p className="text-sm md:text-base font-medium leading-relaxed text-white">
                      {card.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-8 md:p-12 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              لماذا تختار العمل معي؟
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-lg font-semibold mb-2">سرعة في التنفيذ</h4>
                <p className="text-muted-foreground text-sm">تسليم المشاريع في الوقت المحدد مع الحفاظ على أعلى معايير الجودة</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💡</div>
                <h4 className="text-lg font-semibold mb-2">حلول مبتكرة</h4>
                <p className="text-muted-foreground text-sm">استخدام أحدث التقنيات لتطوير حلول فريدة ومتطورة</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-lg font-semibold mb-2">دعم مستمر</h4>
                <p className="text-muted-foreground text-sm">متابعة دائمة وصيانة شاملة لضمان استمرارية العمل بكفاءة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionV2;
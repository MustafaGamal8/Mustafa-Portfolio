'use client';
import { useState } from 'react';
import { Code, Lightbulb, Target, Rocket, Users, Award } from 'lucide-react';

const AboutSectionV2 = () => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const qaCards = [
    {
      icon: <Users size={32} />,
      question: "مين أنا؟",
      answer: "مهندس برمجيات متخصص في تطوير الحلول التقنية المبتكرة، مؤسس شركة Webnest لحلول الويب والتطبيقات الذكية. أجمع بين الخبرة التقنية والفهم العميق لاحتياجات السوق المحلي والعالمي.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: <Rocket size={32} />,
      question: "بدأت منين؟", 
      answer: "بدأت رحلتي في WE School for Applied Technology حيث تعلمت أساسيات هندسة البرمجيات. ثم طورت مهاراتي من خلال العمل على مشاريع حقيقية ومتنوعة في مجالات مختلفة من تطوير الويب إلى الذكاء الاصطناعي.",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: <Code size={32} />,
      question: "بعمل إيه دلوقتي؟",
      answer: "حالياً طالب في Delta Higher Institute وأعمل كمهندس برمجيات في مشاريع متنوعة. أركز على تطوير تطبيقات الويب بـ React، تطبيقات الموبايل بـ Flutter، وأنظمة DevOps مع خبرة في الذكاء الاصطناعي وتقنيات الطائرات المسيرة.",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: <Lightbulb size={32} />,
      question: "إيه تخصصي؟",
      answer: "متخصص في Full Stack Development مع خبرة عميقة في React.js, Next.js, Laravel, Flutter, وأنظمة DevOps. كما أعمل مع تقنيات الذكاء الاصطناعي، معالجة الصور، وتطوير حلول مبتكرة للشركات والمؤسسات.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <Target size={32} />,
      question: "إيه هدفي؟",
      answer: "هدفي بناء حلول تقنية مبتكرة تساعد الشركات والأفراد على تحقيق أهدافهم وتطوير أعمالهم. أسعى لتوفير تجربة مستخدم استثنائية وحلول تقنية فعالة تواكب التطور التكنولوجي السريع.",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      icon: <Award size={32} />,
      question: "إيه اللي يميزني؟",
      answer: "يميزني الجمع بين الخبرة التقنية العميقة والفهم الواضح لاحتياجات السوق. أركز على كتابة كود نظيف وقابل للصيانة، مع اتباع أفضل الممارسات في التطوير والتصميم لضمان تقديم منتجات عالية الجودة.",
      gradient: "from-yellow-500 to-orange-600"
    }
  ];

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
            تعرف عليّ أكتر
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            اكتشف قصتي ورحلتي في عالم البرمجة من خلال هذه البطاقات التفاعلية. 
            كل بطاقة تحكي جزءاً من رحلتي المهنية والأهداف التي أسعى لتحقيقها.
          </p>
          <p className="mobile-tap-indicator mt-4">اضغط على أي بطاقة لقراءة التفاصيل</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {qaCards.map((card, index) => (
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
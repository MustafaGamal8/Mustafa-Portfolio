const AboutSection = () => {
  const qaCards = [
    {
      question: "مين أنا؟",
      answer: "مبرمج متخصص ومؤسس شركة Webnest لحلول الويب والتطبيقات الذكية"
    },
    {
      question: "بدأت منين؟", 
      answer: "درست في WE School for Applied Technology وتخصصت في هندسة البرمجيات"
    },
    {
      question: "بعمل إيه دلوقتي؟",
      answer: "طالب في Delta Higher Institute وأشتغل كمهندس برمجيات في مشاريع متنوعة"
    },
    {
      question: "إيه تخصصي؟",
      answer: "تطوير الويب بReact، تطبيقات الموبايل بFlutter، وأنظمة DevOps"
    },
    {
      question: "إيه هدفي؟",
      answer: "بناء حلول تقنية مبتكرة تساعد الشركات والأفراد على تحقيق أهدافهم"
    },
    {
      question: "إيه اللي يميزني؟",
      answer: "الجمع بين الخبرة التقنية والفهم العميق لاحتياجات السوق المحلي"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            تعرف عليّ أكتر
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف قصتي ورحلتي في عالم البرمجة من خلال هذه البطاقات التفاعلية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qaCards.map((card, index) => (
            <div
              key={index}
              className="flip-card animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-card-foreground">
                      {card.question}
                    </h3>
                    <div className="mt-4 w-12 h-1 bg-primary mx-auto rounded-full"></div>
                    <p className="mt-4 text-muted-foreground text-sm">
                      مرر للإجابة
                    </p>
                  </div>
                </div>
                
                <div className="flip-card-back">
                  <div className="text-center">
                    <p className="text-base font-medium leading-relaxed">
                      {card.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
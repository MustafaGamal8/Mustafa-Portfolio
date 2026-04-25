import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const languages = ['AR', 'EN'] as const;
type SupportedLanguage = (typeof languages)[number];

type LocalizedRecord<T extends Record<string, any>> = {
  AR: T;
  EN: T;
} & Record<string, any>;

const createLocalizedRows = <T extends Record<string, any>>(records: Array<LocalizedRecord<T>>) =>
  records.flatMap(({ AR, EN, ...shared }) =>
    languages.map((lang) => ({
      lang,
      ...(lang === 'AR' ? AR : EN),
      ...shared,
    }))
  );

const duplicateRows = <T extends Record<string, any>>(records: Array<T>) =>
  records.flatMap((record) => languages.map((lang) => ({ lang, ...record })));

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.socialLink.deleteMany();
  await prisma.contactInfo.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.project.deleteMany();
  await prisma.aboutCard.deleteMany();
  await prisma.heroContent.deleteMany();
  await prisma.personalInfo.deleteMany();
  await prisma.file.deleteMany();


  // Create Personal Info
  console.log('👤 Creating personal info...');
  const personalInfoData = createLocalizedRows([
    {
      AR: {
        firstName: "مصطفى",
        lastName: "جمال",
        title: "مهندس برمجيات ومطور Full-Stack",
        description:
          "مهندس برمجيات متخصص في تطوير تطبيقات الويب ومنصات رقمية للشركات والأعمال.",
        bio:
          "مطور Full-Stack أعمل على بناء مواقع ومنصات مختلفة تشمل أنظمة إدارة، منصات تعليم، وعقارات وحلول شركات باستخدام تقنيات حديثة.",
      },

      EN: {
        firstName: "Mostafa",
        lastName: "Gamal",
        title: "Software Engineer & Full-Stack Developer",
        description:
          "Software engineer specialized in building web applications and digital platforms for businesses.",
        bio:
          "Full-Stack developer building web platforms including management systems, educational platforms, real estate solutions, and corporate websites using modern technologies.",
      },
    },
  ]);


  await prisma.personalInfo.createMany({
    data: personalInfoData,
  });

  // Create Hero Content
  console.log('🦸 Creating hero content...');
  const heroContentData = createLocalizedRows([
    {
      AR: {
        name: 'مصطفى جمال',
        mainTitle: 'مهندس برمجيات ومبتكر حلول',
        subTitle: 'أحول الأفكار إلى واقع رقمي',
        description: 'مرحباً بك! أنا مصطفى، مهندس برمجيات شغوف بتطوير الحلول التقنية المبتكرة. أتخصص في تطوير تطبيقات الويب والموبايل، وأعمل على مشاريع الذكاء الاصطناعي والأتمتة.',
        dynamicTexts: ['مطور ويب', 'مطور Flutter', 'خبير DevOps', 'مؤسس شركة', 'مطور AI', 'مبتكر حلول'],
        ctaText: 'تواصل معي',
      },
      EN: {
        name: 'Mustafa Gamal',
        mainTitle: 'Software Engineer & Solution Innovator',
        subTitle: 'Turning ideas into digital reality',
        description: 'Welcome! I\'m Mostafa, a passionate software engineer dedicated to developing innovative technical solutions. I specialize in web and mobile app development, and work on AI and automation projects.',
        dynamicTexts: ['Web Developer', 'Flutter Expert', 'DevOps Expert', 'Company Founder', 'AI Developer', 'Solution Innovator'],
        ctaText: 'Contact Me',
      },
    },
  ]);

  await prisma.heroContent.createMany({
    data: heroContentData,
  });

  // Create About Cards
  console.log('📋 Creating about cards...');
  const aboutCardsData = createLocalizedRows([
    {
      gradient: 'from-blue-500 to-purple-600',
      order: 0,
      AR: {
        title: 'مين أنا؟',
        question: 'مين أنا؟',
        answer: 'مهندس برمجيات متخصص في تطوير الحلول التقنية المبتكرة، مؤسس شركة Webnest لحلول الويب والتطبيقات الذكية. أجمع بين الخبرة التقنية والفهم العميق لاحتياجات السوق المحلي والعالمي.',
      },
      EN: {
        title: 'Who am I?',
        question: 'Who am I?',
        answer: 'A software engineer specialized in developing innovative technical solutions, founder of Webnest company for web and smart applications solutions. I combine technical expertise with deep understanding of local and global market needs.',
      },
    },
    {
      gradient: 'from-green-500 to-teal-600',
      order: 1,
      AR: {
        title: 'بدأت منين؟',
        question: 'بدأت منين؟',
        answer: 'بدأت رحلتي في WE School for Applied Technology حيث تعلمت أساسيات هندسة البرمجيات. ثم طورت مهاراتي من خلال العمل على مشاريع حقيقية ومتنوعة في مجالات مختلفة من تطوير الويب إلى الذكاء الاصطناعي.',
      },
      EN: {
        title: 'Where did I start?',
        question: 'Where did I start?',
        answer: 'I started my journey at WE School for Applied Technology where I learned the fundamentals of software engineering. Then I developed my skills by working on real and diverse projects in different fields from web development to artificial intelligence.',
      },
    },
    {
      gradient: 'from-orange-500 to-red-600',
      order: 2,
      AR: {
        title: 'بعمل إيه دلوقتي؟',
        question: 'بعمل إيه دلوقتي؟',
        answer: 'حالياً طالب في Delta Higher Institute وأعمل كمهندس برمجيات في مشاريع متنوعة. أركز على تطوير تطبيقات الويب بـ React، تطبيقات الموبايل بـ Flutter، وأنظمة DevOps مع خبرة في الذكاء الاصطناعي وتقنيات الطائرات المسيرة.',
      },
      EN: {
        title: 'What do I do now?',
        question: 'What do I do now?',
        answer: 'Currently a student at Delta Higher Institute and working as a software engineer on various projects. I focus on developing web applications with React, mobile applications with Flutter, and DevOps systems with experience in AI and drone technologies.',
      },
    },
    {
      gradient: 'from-purple-500 to-pink-600',
      order: 3,
      AR: {
        title: 'إيه تخصصي؟',
        question: 'إيه تخصصي؟',
        answer: 'متخصص في Full Stack Development مع خبرة عميقة في React.js, Next.js, Laravel, Flutter, وأنظمة DevOps. كما أعمل مع تقنيات الذكاء الاصطناعي، معالجة الصور، وتطوير حلول مبتكرة للشركات والمؤسسات.',
      },
      EN: {
        title: "What's my specialty?",
        question: "What's my specialty?",
        answer: 'Specialized in Full Stack Development with deep experience in React.js, Next.js, Laravel, Flutter, and DevOps systems. I also work with AI technologies, image processing, and developing innovative solutions for companies and institutions.',
      },
    },
    {
      gradient: 'from-indigo-500 to-blue-600',
      order: 4,
      AR: {
        title: 'إيه هدفي؟',
        question: 'إيه هدفي؟',
        answer: 'هدفي بناء حلول تقنية مبتكرة تساعد الشركات والأفراد على تحقيق أهدافهم وتطوير أعمالهم. أسعى لتوفير تجربة مستخدم استثنائية وحلول تقنية فعالة تواكب التطور التكنولوجي السريع.',
      },
      EN: {
        title: "What's my goal?",
        question: "What's my goal?",
        answer: 'My goal is to build innovative technical solutions that help companies and individuals achieve their goals and develop their businesses. I strive to provide exceptional user experience and effective technical solutions that keep up with rapid technological development.',
      },
    },
    {
      gradient: 'from-yellow-500 to-orange-600',
      order: 5,
      AR: {
        title: 'إيه اللي يميزني؟',
        question: 'إيه اللي يميزني؟',
        answer: 'يميزني الجمع بين الخبرة التقنية العميقة والفهم الواضح لاحتياجات السوق. أركز على كتابة كود نظيف وقابل للصيانة، مع اتباع أفضل الممارسات في التطوير والتصميم لضمان تقديم منتجات عالية الجودة.',
      },
      EN: {
        title: 'What makes me unique?',
        question: 'What makes me unique?',
        answer: 'What distinguishes me is combining deep technical expertise with clear understanding of market needs. I focus on writing clean and maintainable code, following best practices in development and design to ensure delivering high-quality products.',
      },
    },
  ]);

  await prisma.aboutCard.createMany({
    data: aboutCardsData,
  });

  // Create Skill Categories
  console.log('💪 Creating skill categories...');
  const skillCategoriesData = createLocalizedRows([
    {
      gradient: 'from-blue-500 to-cyan-600',
      experience: '5+ سنوات خبرة',
      projectCount: 15,
      order: 0,
      AR: {
        title: 'تطوير الويب',
        description: 'بناء أنظمة ويب حديثة مثل SaaS Platforms ولوحات التحكم (Dashboards) باستخدام React.js وNext.js مع تركيز على الأداء وتجربة المستخدم.',
      },
      EN: {
        title: 'Web Development',
        description: 'Building modern web systems such as SaaS platforms and dashboards using React.js and Next.js with focus on performance and UX.',
      },
    },
    {
      gradient: 'from-green-500 to-emerald-600',
      experience: '5+ سنوات خبرة',
      projectCount: 10,
      order: 1,
      AR: {
        title: 'الـ Backend وواجهات البرمجة',
        description: 'تطوير APIs قوية وقابلة للتوسع باستخدام Node.js وExpress مع خبرة في Laravel، وبناء أنظمة Authentication وRBAC وSubscriptions.',
      },
      EN: {
        title: 'Backend & APIs',
        description: 'Building scalable APIs using Node.js and Express with Laravel experience, including authentication, RBAC, and subscription systems.',
      },
    },
    {
      gradient: 'from-purple-500 to-violet-600',
      experience: '4+ سنوات خبرة',
      projectCount: 12,
      order: 2,
      AR: {
        title: 'DevOps والنشر',
        description: 'إدارة ونشر التطبيقات باستخدام Vercel وDocker وVPS Linux، مع إعداد CI/CD pipelines لضمان الاستقرار وسهولة التحديث.',
      },
      EN: {
        title: 'DevOps & Deployment',
        description: 'Deploying and managing applications using Vercel, Docker, and Linux VPS with CI/CD pipelines for stability and smooth releases.',
      },
    },
    {
      gradient: 'from-indigo-500 to-blue-600',
      experience: '5+ سنوات خبرة',
      projectCount: 20,
      order: 3,
      AR: {
        title: 'قواعد البيانات',
        description: 'تصميم وإدارة قواعد بيانات PostgreSQL وMySQL وMongoDB باستخدام Prisma وRedis مع تحسين الأداء وكتابة استعلامات فعالة.',
      },
      EN: {
        title: 'Databases',
        description: 'Designing and managing PostgreSQL, MySQL, and MongoDB using Prisma and Redis with performance optimization and efficient queries.',
      },
    },
    {
      gradient: 'from-orange-500 to-red-600',
      experience: '4+ سنوات خبرة',
      projectCount: 12,
      order: 4,
      AR: {
        title: 'هندسة الأنظمة (SaaS)',
        description: 'تصميم معماريات SaaS قابلة للتوسع تشمل multi-tenancy، أنظمة الاشتراكات، RBAC، وإدارة البنية الكاملة للمنتجات الرقمية.',
      },
      EN: {
        title: 'System Architecture (SaaS)',
        description: 'Designing scalable SaaS architectures including multi-tenancy, subscription systems, RBAC, and full product infrastructure.',
      },
    },
  ]);

  const skillCategories = await Promise.all(
    skillCategoriesData.map(category =>
      prisma.skillCategory.create({
        data: category
      })
    )
  );

  // Create Skills
  console.log('🛠️ Creating skills...');
  const skillsData = createLocalizedRows([
    // Frontend
    { categoryIndex: 0, level: 'EXPERT', order: 0, AR: { name: 'React.js & Next.js' }, EN: { name: 'React.js & Next.js' } },
    { categoryIndex: 0, level: 'EXPERT', order: 1, AR: { name: 'Tailwind CSS' }, EN: { name: 'Tailwind CSS' } },
    { categoryIndex: 0, level: 'ADVANCED', order: 2, AR: { name: 'TypeScript' }, EN: { name: 'TypeScript' } },
    { categoryIndex: 0, level: 'ADVANCED', order: 3, AR: { name: 'UI Architecture & Component Design' }, EN: { name: 'UI Architecture & Component Design' } },

    // Backend
    { categoryIndex: 1, level: 'EXPERT', order: 0, AR: { name: 'Node.js & Express' }, EN: { name: 'Node.js & Express' } },
    { categoryIndex: 1, level: 'ADVANCED', order: 1, AR: { name: 'REST API Design' }, EN: { name: 'REST API Design' } },
    { categoryIndex: 1, level: 'ADVANCED', order: 2, AR: { name: 'GraphQL APIs' }, EN: { name: 'GraphQL APIs' } },
    { categoryIndex: 1, level: 'ADVANCED', order: 3, AR: { name: 'Laravel & PHP ' }, EN: { name: 'Laravel & PHP' } },

    // Databases
    { categoryIndex: 2, level: 'EXPERT', order: 0, AR: { name: 'PostgreSQL & MySQL' }, EN: { name: 'PostgreSQL & MySQL' } },
    { categoryIndex: 2, level: 'ADVANCED', order: 1, AR: { name: 'Prisma ORM' }, EN: { name: 'Prisma ORM' } },
    { categoryIndex: 2, level: 'ADVANCED', order: 2, AR: { name: 'MongoDB' }, EN: { name: 'MongoDB' } },
    { categoryIndex: 2, level: 'INTERMEDIATE', order: 3, AR: { name: 'Redis Caching' }, EN: { name: 'Redis Caching' } },
    { categoryIndex: 2, level: 'EXPERT', order: 4, AR: { name: 'Database Design & Schema Modeling' }, EN: { name: 'Database Design & Schema Modeling' } },

    // DevOps & Deployment
    { categoryIndex: 3, level: 'ADVANCED', order: 0, AR: { name: 'Vercel Deployment & Serverless' }, EN: { name: 'Vercel Deployment & Serverless' } },
    { categoryIndex: 3, level: 'INTERMEDIATE', order: 1, AR: { name: 'Docker' }, EN: { name: 'Docker' } },
    { categoryIndex: 3, level: 'ADVANCED', order: 2, AR: { name: 'Linux & VPS Administration' }, EN: { name: 'Linux & VPS Administration' } },
    { categoryIndex: 3, level: 'ADVANCED', order: 3, AR: { name: 'CI/CD Pipelines' }, EN: { name: 'CI/CD Pipelines' } },

    // System Design & Architecture
    { categoryIndex: 4, level: 'ADVANCED', order: 0, AR: { name: 'SaaS Architecture Design' }, EN: { name: 'SaaS Architecture Design' } },
    { categoryIndex: 4, level: 'ADVANCED', order: 1, AR: { name: 'Admin Dashboards & RBAC Systems' }, EN: { name: 'Admin Dashboards & RBAC Systems' } },
    { categoryIndex: 4, level: 'ADVANCED', order: 2, AR: { name: 'Subscription & Billing Systems' }, EN: { name: 'Subscription & Billing Systems' } },
    { categoryIndex: 4, level: 'ADVANCED', order: 3, AR: { name: 'System Performance & Optimization' }, EN: { name: 'System Performance & Optimization' } },
  ]);

  await Promise.all(
    skillsData.map(skill =>
      prisma.skill.create({
        data: {
          lang: skill.lang,
          name: skill.name,
          level: skill.level as any,
          order: skill.order,
          skillCategoryId: skillCategories[skill.categoryIndex].id,
        }
      })
    )
  );

  // Create Projects
  console.log('🚀 Creating projects...');
  const projectsData = createLocalizedRows([
    {
      status: "COMPLETED",
      category: "web",
      projectUrl: "https://resume4-ebon.vercel.app/",
      githubUrl: null,
      order: 7,
      isFeatured: false,
      image: "https://mustafa-gamal.vercel.app/api/files/cmfb0w0rm0000l504duwti1ud",
      AR: {
        title: "Resume4me",
        description:
          "تصميم وتطوير صفحة هبوط حديثة لموقع سيرة ذاتية مع تحسين تجربة المستخدم والشكل البصري.",
        longDescription:
          "تم تصميم وتطوير صفحة هبوط حديثة باستخدام تقنيات Front-end متقدمة، مع تحسين الألوان، إضافة شعار بسيط، تحسين الخطوط، وتعديل الأزرار والـ footer. الهدف كان واجهة نظيفة ومركزة على التحويل تعمل على جميع الأجهزة.",
        duration: "2 أيام",
        teamSize: "فردي",
        technologies: ["React.js", "Tailwind CSS", "Framer"],
        features: [
          "تصميم متجاوب لكل الأجهزة",
          "ألوان احترافية حديثة",
          "واجهة مركزة على التحويل",
          "Footer بتصميم حديث",
        ],
      },
      EN: {
        title: "Resume4me",
        description:
          "Design and development of a modern responsive landing page for a resume website with improved UX and visuals.",
        longDescription:
          "A modern landing page built using advanced frontend technologies. Improvements included color palette updates, logo design, typography enhancement, and UI refinements focused on conversion and responsiveness.",
        duration: "2 days",
        teamSize: "Individual",
        technologies: ["React.js", "Tailwind CSS", "Framer"],
        features: [
          "Responsive design for all devices",
          "Modern professional color scheme",
          "Conversion-focused UI",
          "Modern footer redesign",
        ],
      },
    },

    {
      status: "COMPLETED",
      category: "web",
      projectUrl: "https://americanhouseonline.com",
      githubUrl: null,
      order: 6,
      isFeatured: true,
      image: "https://mustafa-gamal.vercel.app/api/files/cmfazq55f0002unesrf4iewfr",
      AR: {
        title: "American House",
        description:
          "منصة تعليم إنجليزي أونلاين لحجز الدروس، عرض المدرسين، ولوحة تحكم مع شات مباشر.",
        longDescription:
          "منصة تعليم حديثة تحتوي على نظام حجز دروس، بروفايلات للمدرسين، داشبورد للطلاب والمدرسين، ودعم مباشر. خلال أسبوعين تم تسجيل أكثر من 100 حجز بنسبة رضا 95%.",
        duration: "3 شهور",
        teamSize: "مطورين 2",
        technologies: ["React", "Tailwind", "Nest.js", "Prisma"],
        features: [
          "نظام حجز الدروس",
          "بروفايلات المدرسين",
          "لوحات تحكم",
          "شات مباشر",
        ],
      },
      EN: {
        title: "American House",
        description:
          "Online English learning platform for booking lessons, teacher profiles, and interactive dashboards with live chat.",
        longDescription:
          "A modern education platform featuring lesson booking, teacher profiles, dashboards, and live chat. It achieved 100+ bookings within two weeks with 95% satisfaction.",
        duration: "3 months",
        teamSize: "2 developers",
        technologies: ["React", "Tailwind", "Nest.js", "Prisma"],
        features: [
          "Lesson booking system",
          "Teacher profiles",
          "Student dashboards",
          "Live chat support",
        ],
      },
    },

    {
      status: "COMPLETED",
      category: "web",
      projectUrl: "https://router-plus.com",
      githubUrl: null,
      order: 5,
      isFeatured: true,
      image: "https://mustafa-gamal.vercel.app/api/files/cmfb07lqt0003unesyhq8avcs",
      AR: {
        title: "Router+",
        description:
          "نظام إدارة إنترنت بالكروت (Vouchers) مع تحكم في الوقت والسرعة وإحصائيات استخدام.",
        longDescription:
          "نظام لإدارة الإنترنت عبر أكواد مخصصة مع تحكم كامل في الوقت والسرعة لكل مستخدم، وتتبع دقيق للاستخدام. النظام أثبت استقراره مع أكثر من 1000 كارت أسبوعياً بدون توقف.",
        duration: "11 شهر",
        teamSize: "مطورين 2",
        technologies: ["React", "Tailwind", "PHP", "Node.js"],
        features: [
          "إدارة كروت الإنترنت",
          "تحكم في السرعة والوقت",
          "تقارير استخدام",
          "داشبورد بسيط",
        ],
      },
      EN: {
        title: "Router+",
        description:
          "Internet voucher management system with control over time, speed, and usage analytics.",
        longDescription:
          "A smart ISP system for managing internet vouchers with speed/time control and detailed usage tracking. It handled 1000+ vouchers weekly with high stability.",
        duration: "11 months",
        teamSize: "2 developers",
        technologies: ["React", "Tailwind", "PHP", "Node.js"],
        features: [
          "Voucher management",
          "Speed/time control",
          "Usage analytics",
          "Admin dashboard",
        ],
      },
    },

    {
      status: "COMPLETED",
      category: "web",
      projectUrl: "https://we-school.vercel.app",
      githubUrl: null,
      order: 2,
      isFeatured: false,
      image: "https://mustafa-gamal.vercel.app/api/files/cmfb0q0si0003lb04vy5sfvqw",
      AR: {
        title: "We-School",
        description:
          "منصة تعليم تفاعلية باستخدام MERN مع دعم لغات ووضع داكن وتجربة مستخدم حديثة.",
        longDescription:
          "منصة تعليم حديثة مبنية بـ MERN و Tailwind تدعم تعدد اللغات والوضع الداكن والتسجيل بالبريد. تحتوي على أكثر من 500 منشور و200 مستخدم نشط.",
        duration: "شهرين",
        teamSize: "مطورين 2",
        technologies: ["React.js", "Express.js", "Tailwind CSS", "MongoDB"],
        features: [
          "دعم لغات متعددة",
          "Dark/Light mode",
          "تسجيل بالبريد",
          "نظام مستخدمين تفاعلي",
        ],
      },
      EN: {
        title: "We-School",
        description:
          "Interactive learning platform built with MERN and Tailwind with multi-language and modern UX.",
        longDescription:
          "A modern learning platform using MERN stack with multi-language support, dark mode, and email verification. It reached 200+ active users and 500+ posts.",
        duration: "2 months",
        teamSize: "2 developers",
        technologies: ["React.js", "Express.js", "Tailwind CSS", "MongoDB"],
        features: [
          "Multi-language support",
          "Dark/Light mode",
          "Email verification",
          "Interactive content system",
        ],
      },
    },
    {
      status: "COMPLETED",
      category: "web",
      projectUrl: "https://solar.guessitt.com",
      demoUrl: "https://gomaacompany.vercel.app/",
      githubUrl: null,
      order: 4,
      isFeatured: false,
      image: "https://mustafa-gamal.vercel.app/api/files/cmfb0ik940000lb04ptn9c7id",
      AR: {
        title: "Gomaa Company - حلول الطاقة المتجددة",
        description:
          "منصة رقمية لشركة متخصصة في حلول الطاقة الشمسية وطاقة الرياح والطاقة الهجينة.",
        longDescription:
          "منصة تعرض خدمات الشركة في مجال الطاقة المتجددة مثل الطاقة الشمسية وطاقة الرياح والحلول الهجينة، مع واجهة تفاعلية تساعد العملاء على اختيار الأنسب لهم، ودعم التحول للطاقة النظيفة.",
        duration: "شهر",
        teamSize: "فردي",
        technologies: ["React.js", "Tailwind CSS", "Animate CSS"],
        features: [
          "عرض أنظمة الطاقة الشمسية",
          "تصميم متجاوب",
          "تحسين تجربة المستخدم",
          "سرعة تصفح عالية",
        ],
      },
      EN: {
        title: "Gomaa Company - Renewable Energy Solutions",
        description:
          "A digital platform for a company specialized in solar, wind, and hybrid energy systems.",
        longDescription:
          "A platform showcasing renewable energy solutions including solar, wind, and hybrid systems with an interactive interface helping clients choose the best solution and promoting clean energy transition.",
        duration: "1 month",
        teamSize: "Individual",
        technologies: ["React.js", "Tailwind CSS", "Animate CSS"],
        features: [
          "Solar systems showcase",
          "Responsive design",
          "Improved UX",
          "Fast performance",
        ],
      },
    },

    {
      status: "COMPLETED",
      category: "web",
      projectUrl: "https://jawharat-alhejaz.vercel.app",
      demoUrl: null,
      githubUrl: null,
      order: 3,
      isFeatured: false,
      image: "https://mustafa-gamal.vercel.app/api/files/cmfb1gbal0000la04rl2ijzep",
      AR: {
        title: "جوهرة الحجاز - شركة تجارية",
        description:
          "موقع لشركة سعودية متخصصة في تصميم المطابخ وغرف الملابس والديكور الداخلي.",
        longDescription:
          "شركة تأسست عام 2011 تقدم حلول تصميم داخلي فاخرة للمطابخ وغرف الملابس والديكور. الموقع يعرض أكثر من 250 مشروع مع إبراز الهوية السعودية في التصميم.",
        duration: "15 يوم",
        teamSize: "فردي",
        technologies: ["React.js", "Tailwind CSS"],
        features: [
          "عرض خدمات التصميم الداخلي",
          "عرض المشاريع",
          "آراء العملاء",
          "تصميم متجاوب",
        ],
      },
      EN: {
        title: "Jawharat Al-Hejaz - Trading Company",
        description:
          "A Saudi company website specializing in kitchens, dressing rooms, and interior design solutions.",
        longDescription:
          "Founded in 2011, the company delivers luxury interior design solutions. The website showcases 250+ projects and highlights Saudi-inspired branding combining tradition and modern design.",
        duration: "15 days",
        teamSize: "Individual",
        technologies: ["React.js", "Tailwind CSS"],
        features: [
          "Interior services showcase",
          "Projects gallery",
          "Client testimonials",
          "Responsive UI",
        ],
      },
    },

    {
      status: "COMPLETED",
      category: "web",
      projectUrl: "https://max-llc.vercel.app/",
      demoUrl: null,
      githubUrl: null,
      order: 1,
      isFeatured: false,
      image: "https://mustafa-gamal.vercel.app/api/files/cmfb1igat0000la042g1hg1j5",
      AR: {
        title: "Max LLC - أنظمة كاميرات المراقبة",
        description:
          "موقع لشركة إماراتية متخصصة في تركيب أنظمة المراقبة والكاميرات الأمنية.",
        longDescription:
          "موقع تعريفي لشركة متخصصة في أنظمة الأمن والمراقبة، يعرض خدمات تركيب الكاميرات وحلول الأمان الحديثة للشركات والمنازل.",
        duration: "3 أيام",
        teamSize: "فردي",
        technologies: ["React.js", "Tailwind CSS"],
        features: [
          "عرض خدمات المراقبة",
          "تصميم سريع وبسيط",
          "متجاوب مع جميع الأجهزة",
        ],
      },
      EN: {
        title: "Max LLC - Security Camera Systems",
        description:
          "A UAE-based company website specializing in security camera installation and surveillance systems.",
        longDescription:
          "A corporate website for a security systems company showcasing camera installation services and modern surveillance solutions for homes and businesses.",
        duration: "3 days",
        teamSize: "Individual",
        technologies: ["React.js", "Tailwind CSS"],
        features: [
          "Security services showcase",
          "Simple fast UI",
          "Fully responsive design",
        ],
      },
    },

    {
      status: "COMPLETED",
      category: "web",
      projectUrl: "https://zaman-web.vercel.app",
      demoUrl: null,
      githubUrl: null,
      order: 1,
      isFeatured: false,
      image: "https://mustafa-gamal.vercel.app/api/files/cmfdwk8xb0000jj048cqk2l42",
      AR: {
        title: "Zaman - منصة عقارات",
        description:
          "منصة سعودية لبيع وشراء وتأجير العقارات مع دعم المزادات والعروض العقارية.",
        longDescription:
          "منصة عقارية سعودية مرخصة تربط بين البائعين والمشترين، وتدعم العقارات السكنية والاستثمارية والمزادات، مع تجربة استخدام سهلة وسريعة.",
        duration: "أسبوعين",
        teamSize: "مطورين 2",
        technologies: ["HTML", "CSS", "JavaScript"],
        features: [
          "مزادات عقارية",
          "بحث عن العقارات",
          "إضافة عقار للبيع أو الإيجار",
          "تواصل مباشر مع الوسطاء",
        ],
      },
      EN: {
        title: "Zaman - Real Estate Platform",
        description:
          "A Saudi real estate platform for buying, selling, and renting properties with auctions support.",
        longDescription:
          "A licensed Saudi real estate platform connecting buyers and sellers, offering listings, auctions, and property management features with a simple user experience.",
        duration: "2 weeks",
        teamSize: "2 developers",
        technologies: ["HTML", "CSS", "JavaScript"],
        features: [
          "Real estate auctions",
          "Property search",
          "Add listings for sale/rent",
          "Agent communication",
        ],
      },
    },
  ]);

  await prisma.project.createMany({
    data: projectsData as any
  });

  // Create Achievements
  console.log('🏆 Creating achievements...');
  const achievementsData = createLocalizedRows([
    {
      value: '+20',
      order: 0,
      AR: {
        title: '+20 مشروع',
        subtitle: 'مشروع مكتمل',
        description: 'مشاريع متنوعة من مواقع الويب إلى تطبيقات الموبايل',
      },
      EN: {
        title: '+20 Projects',
        subtitle: 'Completed projects',
        description: 'Diverse projects from websites to mobile applications',
      },
    },
    {
      value: '+15',
      order: 1,
      AR: {
        title: '+15 عميل سعيد',
        subtitle: 'عميل راضي',
        description: 'عملاء من مختلف القطاعات حققوا أهدافهم معنا',
      },
      EN: {
        title: '+15 Happy Clients',
        subtitle: 'Satisfied clients',
        description: 'Clients from various sectors achieved their goals with us',
      },
    },
    {
      value: '+5',
      order: 2,
      AR: {
        title: '+5 سنوات خبرة',
        subtitle: 'في المجال',
        description: 'خبرة متراكمة في تقنيات البرمجة الحديثة',
      },
      EN: {
        title: '+5 Years Experience',
        subtitle: 'In the field',
        description: 'Accumulated experience in modern programming technologies',
      },
    },
    {
      value: 'Top Rated',
      order: 3,
      AR: {
        title: 'Top Rated على Upwork',
        subtitle: 'تصنيف احترافي',
        description: 'تصنيف يعكس جودة التنفيذ، الالتزام، والتواصل الاحترافي مع العملاء.',
      },
      EN: {
        title: 'Top Rated on Upwork',
        subtitle: 'Professional badge',
        description: 'Recognition for consistent delivery quality, reliability, and professional communication.',
      },
    },
    {
      value: '98%',
      order: 4,
      AR: {
        title: '98% معدل نجاح',
        subtitle: 'في المشاريع',
        description: 'التزام بالجودة والمواعيد المحددة',
      },
      EN: {
        title: '98% Success Rate',
        subtitle: 'In projects',
        description: 'Commitment to quality and specified deadlines',
      },
    },

  ]);

  await prisma.achievement.createMany({
    data: achievementsData
  });

  // Create Contact Info
  console.log('📞 Creating contact info...');
  const contactInfoData = createLocalizedRows([
    {
      type: 'email',
      value: 'mustafa.gamal.elsayed@gmail.com',
      link: 'mailto:mustafa.gamal.elsayed@gmail.com',
      icon: 'Mail',
      order: 0,
      isPrimary: true,
      AR: { label: 'البريد الإلكتروني' },
      EN: { label: 'Email' },
    },
    {
      type: 'phone',
      value: '+201093273277',
      link: 'tel:+201093273277',
      icon: 'Phone',
      order: 1,
      isPrimary: true,
      AR: { label: 'رقم الهاتف' },
      EN: { label: 'Phone' },
    },
    {
      type: 'whatsapp',
      value: 'تواصل مباشر',
      link: 'https://wa.me/201093273277',
      icon: 'MessageCircle',
      order: 2,
      isPrimary: false,
      AR: { label: 'واتساب' },
      EN: { label: 'WhatsApp' },
    },
    {
      type: 'location',
      value: 'المنصورة، مصر',
      link: '#',
      icon: 'MapPin',
      order: 3,
      isPrimary: false,
      AR: { label: 'الموقع' },
      EN: { label: 'Location' },
    },
  ]);

  await prisma.contactInfo.createMany({
    data: contactInfoData as any
  });

  // Create Social Links
  console.log('🔗 Creating social links...');
  const socialLinksData = duplicateRows([
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mustafa-gamal-elsayed/',
      icon: 'LinkedIn',
      order: 0,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/MustafaGamal8',
      icon: 'GitHub',
      order: 1,
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61577139765079',
      icon: 'Facebook',
      order: 2,
    },

    {
      name: 'Upwork',
      url: 'https://www.upwork.com/freelancers/~01ab6d0e217ab25778',
      icon: 'Upwork',
      order: 3,
    },
  ]);

  await prisma.socialLink.createMany({
    data: socialLinksData
  });

  // Create a demo admin user
  console.log('👤 Creating demo admin user...');
  await prisma.user.upsert({
    where: { email: 'mustafa.gamal.elsayed@gmail.com' },
    update: {
      password: await bcrypt.hash('password', 12)
    },
    create: {
      email: 'mustafa.gamal.elsayed@gmail.com',
      password: await bcrypt.hash('password', 12),
    }
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('📊 Summary:');
  console.log('- Personal Info: 2 records (AR, EN)');
  console.log('- Hero Content: 2 records (AR, EN)');
  console.log('- About Cards: 12 records (6 AR, 6 EN)');
  console.log('- Skill Categories: 10 records (5 AR, 5 EN)');
  console.log('- Skills: 40+ records');
  console.log('- Projects: 8 records (4 AR, 4 EN)');
  console.log('- Achievements: 12 records (6 AR, 6 EN)');
  console.log('- Contact Info: 8 records (4 AR, 4 EN)');
  console.log('- Social Links: 8 records (4 AR, 4 EN)');
  console.log('- Files: managed separately');
  console.log('- Users: 1 admin user');
  console.log('');
  console.log('🔑 Admin credentials:');
  console.log('Email: mustafa.gamal.elsayed@gmail.com');
  console.log('Password: *****');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

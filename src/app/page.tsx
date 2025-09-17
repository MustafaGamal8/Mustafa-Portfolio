import { LanguageProvider } from '@/components/portfolio/LanguageProvider';
import LoadingScreen from '@/components/portfolio/LoadingScreen';
import Navbar from '@/components/portfolio/Navbar';
import HeroSectionV3 from '@/components/portfolio/HeroSectionV3';
import AboutSectionV2 from '@/components/portfolio/AboutSectionV2';
import SkillsSectionV2 from '@/components/portfolio/SkillsSectionV2';
import ProjectsSectionV2 from '@/components/portfolio/ProjectsSectionV2';
import AchievementsSection from '@/components/portfolio/AchievementsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import PortfolioPreview from '@/components/portfolio/PortfolioPreview';

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <LoadingScreen />
        <Navbar /> 
        
  
        <HeroSectionV3 />
        <AboutSectionV2 />
        <SkillsSectionV2 />
        <ProjectsSectionV2 />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </main>
    </LanguageProvider>

  );
}

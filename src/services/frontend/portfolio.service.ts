import { Language } from '@prisma/client';
import { BaseService } from './base.service';

export interface PortfolioSectionRequest {
  lang: Language;
  sections: string[];
}

export interface PortfolioSectionData {
  personalInfo?: any[];
  heroContent?: any[];
  aboutCards?: any[];
  skillCategories?: any[];
  skills?: any[];
  projects?: any[];
  achievements?: any[];
  contactInfo?: any[];
  socialLinks?: any[];
  services?: any[];
  quickLinks?: any[];
}

export interface PortfolioResponse {
  success: boolean;
  data: PortfolioSectionData;
  message?: string;
}

export class PortfolioService extends BaseService {
  constructor() {
    super('/api');
  }

  /**
   * Fetch multiple portfolio sections at once
   * @param request - Language and sections to fetch
   * @returns Portfolio data for requested sections
   */
  async getPortfolioSections(request: PortfolioSectionRequest): Promise<PortfolioResponse> {
    return this.post('/portfolio', request);
  }

  /**
   * Get personal info
   */
  async getPersonalInfo(lang: Language): Promise<any> {
    return this.get(`/personal-info?lang=${lang}`);
  }

  /**
   * Get hero content
   */
  async getHeroContent(lang: Language): Promise<any> {
    return this.get(`/hero-content?lang=${lang}`);
  }

  /**
   * Get about cards
   */
  async getAboutCards(lang: Language): Promise<any> {
    return this.get(`/about-cards?lang=${lang}`);
  }

  /**
   * Get skill categories with skills
   */
  async getSkillCategories(lang: Language): Promise<any> {
    return this.get(`/skill-categories?lang=${lang}`);
  }

  /**
   * Get skills by category
   */
  async getSkills(lang: Language, categoryId?: string): Promise<any> {
    const url = categoryId
      ? `/skills?lang=${lang}&categoryId=${categoryId}`
      : `/skills?lang=${lang}`;
    return this.get(url);
  }

  /**
   * Get projects
   */
  async getProjects(lang: Language): Promise<any> {
    return this.get(`/projects?lang=${lang}`);
  }

  /**
   * Get achievements
   */
  async getAchievements(lang: Language): Promise<any> {
    return this.get(`/achievements?lang=${lang}`);
  }

  /**
   * Get contact info
   */
  async getContactInfo(lang: Language): Promise<any> {
    return this.get(`/contact-info?lang=${lang}`);
  }

  /**
   * Get social links
   */
  async getSocialLinks(lang: Language): Promise<any> {
    return this.get(`/social-links?lang=${lang}`);
  }

  /**
   * Get services
   */
  async getServices(lang: Language): Promise<any> {
    return this.get(`/services?lang=${lang}`);
  }

  /**
   * Get quick links
   */
  async getQuickLinks(lang: Language): Promise<any> {
    return this.get(`/quick-links?lang=${lang}`);
  }
}

// Export singleton instance
export const portfolioService = new PortfolioService();

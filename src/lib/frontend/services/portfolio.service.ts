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
    super('/api/portfolio');
  }

  /**
   * Fetch multiple portfolio sections at once
   * @param request - Language and sections to fetch
   * @returns Portfolio data for requested sections
   */
  async getPortfolioSections(request: PortfolioSectionRequest): Promise<PortfolioResponse> {
    return this.post('', request);
  }

}


// Export singleton instance
export const portfolioService = new PortfolioService();

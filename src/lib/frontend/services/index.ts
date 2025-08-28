// Frontend Services Exports
export { authService, AuthService } from './auth.service';
export { personalInfoService, PersonalInfoService } from './personal-info.service';
export { heroContentService, HeroContentService } from './hero-content.service';
export { aboutCardService, AboutCardService } from './about-card.service';
export { achievementService, AchievementService } from './achievement.service';
export { projectService, ProjectService } from './project.service';
export { skillService, SkillService } from './skill.service';
export { skillCategoryService, SkillCategoryService } from './skill-category.service';
export { contactInfoService, ContactInfoService } from './contact-info.service';
export { socialLinkService, SocialLinkService } from './social-link.service';
export { fileService, FileService } from './file.service';

// Re-export types from schema
export type {
  PersonalInfo,
  CreatePersonalInfoDto,
  UpdatePersonalInfoDto,
  HeroContent,
  CreateHeroContentDto,
  UpdateHeroContentDto,
  AboutCard,
  CreateAboutCardDto,
  UpdateAboutCardDto,
  Achievement,
  CreateAchievementDto,
  UpdateAchievementDto,
  Project,
  CreateProjectDto,
  UpdateProjectDto,
  Skill,
  CreateSkillDto,
  UpdateSkillDto,
  SkillCategory,
  CreateSkillCategoryDto,
  UpdateSkillCategoryDto,
  ContactInfo,
  CreateContactInfoDto,
  UpdateContactInfoDto,
  SocialLink,
  CreateSocialLinkDto,
  UpdateSocialLinkDto
} from '@/lib/backend/schemas/portfolio.schema';

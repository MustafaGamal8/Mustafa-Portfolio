-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('EN', 'AR');

-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateTable
CREATE TABLE "public"."files" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "base64" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "files_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."personal_info" (
    "_id" TEXT NOT NULL,
    "lang" "public"."Language" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "imageId" TEXT,

    CONSTRAINT "personal_info_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."hero_content" (
    "_id" TEXT NOT NULL,
    "lang" "public"."Language" NOT NULL,
    "name" TEXT NOT NULL,
    "mainTitle" TEXT NOT NULL,
    "subTitle" TEXT,
    "description" TEXT NOT NULL,
    "dynamicTexts" TEXT[],
    "stats" JSONB,
    "ctaText" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "profileImageId" TEXT,
    "resumeId" TEXT,

    CONSTRAINT "hero_content_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."about_cards" (
    "_id" TEXT NOT NULL,
    "lang" "public"."Language" NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "gradient" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_cards_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."skill_categories" (
    "_id" TEXT NOT NULL,
    "lang" "public"."Language" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gradient" TEXT,
    "experience" TEXT,
    "projectCount" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skill_categories_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."skills" (
    "_id" TEXT NOT NULL,
    "lang" "public"."Language" NOT NULL,
    "name" TEXT NOT NULL,
    "level" "public"."SkillLevel" NOT NULL DEFAULT 'INTERMEDIATE',
    "description" TEXT,
    "yearsExperience" INTEGER,
    "projectCount" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "icon" TEXT,
    "skillCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."projects" (
    "_id" TEXT NOT NULL,
    "lang" "public"."Language" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "status" "public"."ProjectStatus" NOT NULL DEFAULT 'DRAFT',
    "category" TEXT NOT NULL,
    "projectUrl" TEXT,
    "githubUrl" TEXT,
    "demoUrl" TEXT,
    "duration" TEXT,
    "teamSize" TEXT,
    "technologies" TEXT[],
    "features" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageId" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."achievements" (
    "_id" TEXT NOT NULL,
    "lang" "public"."Language" NOT NULL,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "value" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fileId" TEXT,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."contact_info" (
    "_id" TEXT NOT NULL,
    "lang" "public"."Language" NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "link" TEXT,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_info_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."social_links" (
    "_id" TEXT NOT NULL,
    "lang" "public"."Language" NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."services" (
    "_id" TEXT NOT NULL,
    "lang" "public"."Language" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "price" TEXT,
    "duration" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."quick_links" (
    "_id" TEXT NOT NULL,
    "lang" "public"."Language" NOT NULL,
    "name" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quick_links_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contact_info_lang_type_key" ON "public"."contact_info"("lang", "type");

-- CreateIndex
CREATE UNIQUE INDEX "social_links_lang_name_key" ON "public"."social_links"("lang", "name");

-- AddForeignKey
ALTER TABLE "public"."personal_info" ADD CONSTRAINT "personal_info_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."files"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hero_content" ADD CONSTRAINT "hero_content_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "public"."files"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hero_content" ADD CONSTRAINT "hero_content_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "public"."files"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."skills" ADD CONSTRAINT "skills_skillCategoryId_fkey" FOREIGN KEY ("skillCategoryId") REFERENCES "public"."skill_categories"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."files"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."achievements" ADD CONSTRAINT "achievements_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "public"."files"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

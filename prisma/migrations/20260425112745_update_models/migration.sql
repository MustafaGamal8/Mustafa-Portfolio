/*
  Warnings:

  - A unique constraint covering the columns `[lang]` on the table `hero_content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lang]` on the table `personal_info` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "about_cards_lang_isActive_order_idx" ON "public"."about_cards"("lang", "isActive", "order");

-- CreateIndex
CREATE INDEX "achievements_lang_isActive_order_idx" ON "public"."achievements"("lang", "isActive", "order");

-- CreateIndex
CREATE INDEX "contact_info_lang_isActive_isPrimary_order_idx" ON "public"."contact_info"("lang", "isActive", "isPrimary", "order");

-- CreateIndex
CREATE UNIQUE INDEX "hero_content_lang_key" ON "public"."hero_content"("lang");

-- CreateIndex
CREATE UNIQUE INDEX "personal_info_lang_key" ON "public"."personal_info"("lang");

-- CreateIndex
CREATE INDEX "projects_lang_isActive_isFeatured_order_idx" ON "public"."projects"("lang", "isActive", "isFeatured", "order");

-- CreateIndex
CREATE INDEX "projects_lang_category_idx" ON "public"."projects"("lang", "category");

-- CreateIndex
CREATE INDEX "quick_links_lang_isActive_order_idx" ON "public"."quick_links"("lang", "isActive", "order");

-- CreateIndex
CREATE INDEX "services_lang_isActive_order_idx" ON "public"."services"("lang", "isActive", "order");

-- CreateIndex
CREATE INDEX "skill_categories_lang_isActive_order_idx" ON "public"."skill_categories"("lang", "isActive", "order");

-- CreateIndex
CREATE INDEX "skills_lang_isActive_skillCategoryId_order_idx" ON "public"."skills"("lang", "isActive", "skillCategoryId", "order");

-- CreateIndex
CREATE INDEX "social_links_lang_isActive_order_idx" ON "public"."social_links"("lang", "isActive", "order");

-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'MODERATOR', 'REVIEWER') NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `user_id_index`(`user_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectMetadata` (
    `project_id` VARCHAR(191) NOT NULL,
    `sdgp_year` VARCHAR(191) NOT NULL,
    `group_num` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `cover_image` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `featured_by_userId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `project_id_index`(`project_id`),
    INDEX `featured_by_index`(`featured_by_userId`),
    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectContent` (
    `content_id` VARCHAR(191) NOT NULL,
    `metadata_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProjectContent_metadata_id_key`(`metadata_id`),
    INDEX `project_content_index`(`metadata_id`),
    PRIMARY KEY (`content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectStatus` (
    `content_id` VARCHAR(191) NOT NULL,
    `status` ENUM('IDEA', 'MVP', 'DEPLOYED', 'STARTUP') NOT NULL,
    `approved_status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `rejected_reason` VARCHAR(191) NULL,
    `approved_at` DATETIME(3) NULL,
    `approved_by_userId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `approved_by_index`(`approved_by_userId`),
    PRIMARY KEY (`content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectAssociation` (
    `id` VARCHAR(191) NOT NULL,
    `content_id` VARCHAR(191) NOT NULL,
    `type` ENUM('PROJECT_TYPE', 'PROJECT_DOMAIN', 'PROJECT_SDG', 'PROJECT_TECH') NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `domain` ENUM('AI', 'ML', 'AR_VR', 'BLOCKCHAIN', 'IOT', 'HEALTHTECH', 'FINTECH', 'EDTECH', 'AGRITECH', 'ECOMMERCE', 'SOCIAL', 'GAMING', 'SECURITY', 'DATA_ANALYTICS', 'ENTERTAINMENT', 'SUSTAINABILITY') NULL,
    `projectType` ENUM('MOBILE', 'WEB', 'HARDWARE', 'DESKTOP', 'WEARABLE') NULL,
    `sdgGoal` ENUM('NO_POVERTY', 'ZERO_HUNGER', 'GOOD_HEALTH', 'QUALITY_EDUCATION', 'GENDER_EQUALITY', 'CLEAN_WATER', 'AFFORDABLE_ENERGY', 'DECENT_WORK', 'INDUSTRY_INNOVATION', 'REDUCED_INEQUALITIES', 'SUSTAINABLE_CITIES', 'RESPONSIBLE_CONSUMPTION', 'CLIMATE_ACTION', 'LIFE_BELOW_WATER', 'LIFE_ON_LAND', 'PEACE_JUSTICE', 'PARTNERSHIPS') NULL,
    `techStack` ENUM('REACT', 'ANGULAR', 'VUE', 'NODE', 'PYTHON', 'DJANGO', 'FLASK', 'JAVA', 'SPRING', 'DOTNET', 'PHP', 'LARAVEL', 'ANDROID', 'IOS', 'FLUTTER', 'REACT_NATIVE', 'FIREBASE', 'AWS', 'MONGODB', 'MYSQL', 'POSTGRESQL', 'TENSORFLOW', 'PYTORCH', 'ARDUINO', 'RASPBERRY_PI') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `project_association_index`(`content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectSlide` (
    `id` VARCHAR(191) NOT NULL,
    `content_id` VARCHAR(191) NOT NULL,
    `slides_content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `project_slide_index`(`content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectTeam` (
    `member_id` VARCHAR(191) NOT NULL,
    `content_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `linkedin_url` VARCHAR(191) NULL,
    `profile_image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `project_team_index`(`content_id`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectSocialLink` (
    `id` VARCHAR(191) NOT NULL,
    `content_id` VARCHAR(191) NOT NULL,
    `link_name` ENUM('LINKEDIN', 'TWITTER', 'INSTAGRAM', 'FACEBOOK', 'YOUTUBE', 'TIKTOK') NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `project_social_index`(`content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectDetails` (
    `id` VARCHAR(191) NOT NULL,
    `content_id` VARCHAR(191) NOT NULL,
    `problem_statement` VARCHAR(191) NOT NULL,
    `solution` VARCHAR(191) NOT NULL,
    `features` VARCHAR(191) NOT NULL,
    `team_email` VARCHAR(191) NOT NULL,
    `team_phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProjectDetails_content_id_key`(`content_id`),
    INDEX `project_details_index`(`content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectMetadata` ADD CONSTRAINT `ProjectMetadata_featured_by_userId_fkey` FOREIGN KEY (`featured_by_userId`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectContent` ADD CONSTRAINT `ProjectContent_metadata_id_fkey` FOREIGN KEY (`metadata_id`) REFERENCES `ProjectMetadata`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectStatus` ADD CONSTRAINT `ProjectStatus_approved_by_userId_fkey` FOREIGN KEY (`approved_by_userId`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectStatus` ADD CONSTRAINT `ProjectStatus_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `ProjectContent`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectAssociation` ADD CONSTRAINT `ProjectAssociation_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `ProjectContent`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectSlide` ADD CONSTRAINT `ProjectSlide_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `ProjectContent`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectTeam` ADD CONSTRAINT `ProjectTeam_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `ProjectContent`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectSocialLink` ADD CONSTRAINT `ProjectSocialLink_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `ProjectContent`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectDetails` ADD CONSTRAINT `ProjectDetails_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `ProjectContent`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Create the BlogAuthor table
CREATE TABLE `BlogAuthor` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `avatarUrl` VARCHAR(191),
  `instagram` VARCHAR(191),
  `twitter` VARCHAR(191),
  `facebook` VARCHAR(191),
  `linkedin` VARCHAR(191),
  `medium` VARCHAR(191),
  `website` VARCHAR(191),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

-- Create the BlogPost table
CREATE TABLE `BlogPost` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `title` VARCHAR(191) NOT NULL,
  `excerpt` VARCHAR(191) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `imageUrl` VARCHAR(191),
  `publishedAt` DATETIME(3) NOT NULL,
  `authorId` VARCHAR(191) NOT NULL,
  `category` ENUM(
    'AI', 'ML', 'AR_VR', 'BLOCKCHAIN', 'IOT', 'HEALTHTECH', 'FINTECH', 'EDTECH', 'AGRITECH', 'ECOMMERCE',
    'SOCIAL', 'GAMING', 'SECURITY', 'DATA_ANALYTICS', 'ENTERTAINMENT', 'SUSTAINABILITY'
  ) NOT NULL,
  `featured` BOOLEAN NOT NULL DEFAULT false,
  `approved` BOOLEAN NOT NULL DEFAULT false,
  `approvedById` VARCHAR(191),
  `rejectedById` VARCHAR(191),
  `rejectedReason` VARCHAR(191),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  INDEX `idx_authorId` (`authorId`),
  INDEX `idx_publishedAt` (`publishedAt`),
  INDEX `idx_approvedById` (`approvedById`),
  INDEX `idx_rejectedById` (`rejectedById`),
  CONSTRAINT `fk_blog_author` FOREIGN KEY (`authorId`) REFERENCES `BlogAuthor`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_blog_approved_by` FOREIGN KEY (`approvedById`) REFERENCES `User`(`user_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_blog_rejected_by` FOREIGN KEY (`rejectedById`) REFERENCES `User`(`user_id`) ON DELETE SET NULL
);

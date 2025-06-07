-- 1. Alter AssociationType enum on ProjectAssociation to add AWARD
ALTER TABLE `ProjectAssociation`
  MODIFY COLUMN `type`
    ENUM('PROJECT_TYPE','PROJECT_DOMAIN','PROJECT_SDG','PROJECT_TECH','AWARD') NOT NULL;

-- 2. Create Competition table
CREATE TABLE `Competition` (
  `id`             VARCHAR(36) NOT NULL PRIMARY KEY,
  `name`           VARCHAR(191) NOT NULL,
  `is_featured`    BOOLEAN     NOT NULL DEFAULT FALSE,
  `start_date`     DATETIME    NOT NULL,
  `end_date`       DATETIME    NOT NULL,
  `description`    LONGTEXT    NOT NULL,
  `type`           VARCHAR(191) NOT NULL,
  `logo`           VARCHAR(191),
  `cover_image`    VARCHAR(191),
  `approval_status` ENUM('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `accepted_by_id` VARCHAR(36),
  `rejected_by_id` VARCHAR(36),
  `rejected_reason` TEXT,
  `createdAt`      DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`      DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (`accepted_by_id`),
  INDEX (`rejected_by_id`),
  CONSTRAINT `Competition_accepted_by_fk`
    FOREIGN KEY (`accepted_by_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL,
  CONSTRAINT `Competition_rejected_by_fk`
    FOREIGN KEY (`rejected_by_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB;


-- 3. Create Award table
CREATE TABLE `Award` (
  `id`             VARCHAR(36) NOT NULL PRIMARY KEY,
  `name`           VARCHAR(191) NOT NULL,
  `image`          VARCHAR(191),
  `competition_id` VARCHAR(36) NOT NULL,
  `project_id`     VARCHAR(36) NOT NULL,
  `approval_status` ENUM('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `accepted_by_id` VARCHAR(36),
  `rejected_by_id` VARCHAR(36),
  `rejected_reason` TEXT,
  `createdAt`      DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`      DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (`competition_id`),
  INDEX (`project_id`),
  INDEX (`accepted_by_id`),
  INDEX (`rejected_by_id`),
  CONSTRAINT `Award_competition_fk`
    FOREIGN KEY (`competition_id`) REFERENCES `Competition`(`id`) ON DELETE CASCADE,
  CONSTRAINT `Award_project_fk`
    FOREIGN KEY (`project_id`) REFERENCES `ProjectMetadata`(`project_id`) ON DELETE CASCADE,
  CONSTRAINT `Award_accepted_by_fk`
    FOREIGN KEY (`accepted_by_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL,
  CONSTRAINT `Award_rejected_by_fk`
    FOREIGN KEY (`rejected_by_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB;


-- 4. Add award_id column, index and FK to ProjectAssociation
ALTER TABLE `ProjectAssociation`
  ADD COLUMN `award_id` VARCHAR(36) NULL AFTER `techStack`,
  ADD INDEX   `idx_project_association_award` (`award_id`),
  ADD CONSTRAINT `ProjectAssociation_award_fk`
    FOREIGN KEY (`award_id`) REFERENCES `Award`(`id`) ON DELETE SET NULL;

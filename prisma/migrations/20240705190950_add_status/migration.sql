/*
  Warnings:

  - The primary key for the `task` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `task` DROP PRIMARY KEY,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'To Do',
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

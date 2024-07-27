/*
  Warnings:

  - You are about to drop the column `referrer` on the `Purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "referrer",
ADD COLUMN     "referrerId" INTEGER;

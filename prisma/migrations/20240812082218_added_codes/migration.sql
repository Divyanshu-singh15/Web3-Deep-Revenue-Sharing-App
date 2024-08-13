/*
  Warnings:

  - You are about to drop the column `referalAmount` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "referalAmount",
ADD COLUMN     "referalPercent" INTEGER;

/*
  Warnings:

  - Added the required column `order` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "order" INTEGER NOT NULL;

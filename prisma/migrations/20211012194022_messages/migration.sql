/*
  Warnings:

  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `post` on the `Message` table. All the data in the column will be lost.
  - Added the required column `name` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "id",
DROP COLUMN "post",
ADD COLUMN     "name" VARCHAR(40) NOT NULL,
ADD COLUMN     "room_id" SERIAL NOT NULL,
ADD COLUMN     "text" VARCHAR(500) NOT NULL,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("room_id");

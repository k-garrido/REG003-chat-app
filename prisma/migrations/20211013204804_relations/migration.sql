/*
  Warnings:

  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
ADD COLUMN     "message_id" SERIAL NOT NULL,
ALTER COLUMN "room_id" DROP DEFAULT,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id");
DROP SEQUENCE "Message_room_id_seq";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

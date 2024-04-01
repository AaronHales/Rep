-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_reptileId_fkey";

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_reptileId_fkey" FOREIGN KEY ("reptileId") REFERENCES "Reptile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

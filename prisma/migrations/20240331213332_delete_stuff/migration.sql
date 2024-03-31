-- DropForeignKey
ALTER TABLE "Reptile" DROP CONSTRAINT "Reptile_userId_fkey";

-- AddForeignKey
ALTER TABLE "Reptile" ADD CONSTRAINT "Reptile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

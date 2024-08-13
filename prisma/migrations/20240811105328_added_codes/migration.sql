-- AlterTable
ALTER TABLE "SalespersonCompany" ADD COLUMN     "invitingCodeId" INTEGER;

-- AddForeignKey
ALTER TABLE "SalespersonCompany" ADD CONSTRAINT "SalespersonCompany_invitingCodeId_fkey" FOREIGN KEY ("invitingCodeId") REFERENCES "InvitingCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "SalespersonCompany" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "businessId" INTEGER NOT NULL,
    "inviterId" INTEGER,

    CONSTRAINT "SalespersonCompany_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SalespersonCompany" ADD CONSTRAINT "SalespersonCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalespersonCompany" ADD CONSTRAINT "SalespersonCompany_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

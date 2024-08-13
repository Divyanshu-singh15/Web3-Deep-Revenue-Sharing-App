-- CreateTable
CREATE TABLE "InvitingCode" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "businessId" INTEGER NOT NULL,
    "inviteCode" TEXT NOT NULL,

    CONSTRAINT "InvitingCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvitingCode_inviteCode_key" ON "InvitingCode"("inviteCode");

-- CreateIndex
CREATE INDEX "InvitingCode_userId_idx" ON "InvitingCode"("userId");

-- CreateIndex
CREATE INDEX "InvitingCode_businessId_idx" ON "InvitingCode"("businessId");

-- CreateIndex
CREATE INDEX "SalespersonCompany_userId_idx" ON "SalespersonCompany"("userId");

-- CreateIndex
CREATE INDEX "SalespersonCompany_businessId_idx" ON "SalespersonCompany"("businessId");

-- CreateIndex
CREATE INDEX "SalespersonCompany_inviterId_idx" ON "SalespersonCompany"("inviterId");

-- AddForeignKey
ALTER TABLE "InvitingCode" ADD CONSTRAINT "InvitingCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitingCode" ADD CONSTRAINT "InvitingCode_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalespersonCompany" ADD CONSTRAINT "SalespersonCompany_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

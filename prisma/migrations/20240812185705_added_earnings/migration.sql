-- CreateTable
CREATE TABLE "Earnings" (
    "id" SERIAL NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "amountEarned" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Earnings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Earnings" ADD CONSTRAINT "Earnings_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Earnings" ADD CONSTRAINT "Earnings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

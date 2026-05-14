-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(100) NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tokens_id_key" ON "tokens"("id");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

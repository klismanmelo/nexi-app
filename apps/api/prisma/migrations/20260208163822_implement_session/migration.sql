/*
  Warnings:

  - You are about to drop the column `browser` on the `link_clicks` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `link_clicks` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `link_clicks` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `link_clicks` table. All the data in the column will be lost.
  - You are about to drop the column `device` on the `link_clicks` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `link_clicks` table. All the data in the column will be lost.
  - You are about to drop the column `os` on the `link_clicks` table. All the data in the column will be lost.
  - You are about to drop the column `referrer` on the `link_clicks` table. All the data in the column will be lost.
  - You are about to drop the column `browser` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `device` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `os` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `referrer` on the `page_views` table. All the data in the column will be lost.
  - Added the required column `session_id` to the `link_clicks` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `link_clicks` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `session_id` to the `page_views` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "link_clicks_created_at_idx";

-- DropIndex
DROP INDEX "page_views_created_at_idx";

-- AlterTable
ALTER TABLE "link_clicks" DROP COLUMN "browser",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "created_at",
DROP COLUMN "device",
DROP COLUMN "ip",
DROP COLUMN "os",
DROP COLUMN "referrer",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "session_id" TEXT NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "page_views" DROP COLUMN "browser",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "created_at",
DROP COLUMN "device",
DROP COLUMN "ip",
DROP COLUMN "os",
DROP COLUMN "referrer",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "session_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "biography" DROP DEFAULT;

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ipHash" TEXT,
    "device" "DeviceType",
    "browser" TEXT,
    "os" TEXT,
    "referrer" TEXT,
    "country" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "sessions_createdAt_idx" ON "sessions"("createdAt");

-- CreateIndex
CREATE INDEX "link_clicks_session_id_idx" ON "link_clicks"("session_id");

-- CreateIndex
CREATE INDEX "link_clicks_createdAt_idx" ON "link_clicks"("createdAt");

-- CreateIndex
CREATE INDEX "page_views_session_id_idx" ON "page_views"("session_id");

-- CreateIndex
CREATE INDEX "page_views_createdAt_idx" ON "page_views"("createdAt");

-- AddForeignKey
ALTER TABLE "link_clicks" ADD CONSTRAINT "link_clicks_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_views" ADD CONSTRAINT "page_views_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "biography" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "username" DROP DEFAULT;

/*
  Warnings:

  - Made the column `img_URL` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "img_URL" SET NOT NULL,
ALTER COLUMN "img_URL" SET DEFAULT 'https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage_%E3%83%92%E3%82%9A%E3%82%AF%E3%83%88-760x460.png';

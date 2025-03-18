import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../../prisma.service';  // Убедись, что путь правильный

@Module({
  providers: [ProductService, PrismaService],  // Добавили PrismaService
  controllers: [ProductController],
  exports: [ProductService],  // Экспортируем ProductService, если нужно использовать в других модулях
})
export class ProductModule {}
{}
import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ProductModule, UsersModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

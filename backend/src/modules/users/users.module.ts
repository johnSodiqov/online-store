import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // ⬅️ Добавь этот импорт
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsersController], // ⬅️ Важно!
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}

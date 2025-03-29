import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.product.findMany();
  }

  async create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }
  async delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
  
}

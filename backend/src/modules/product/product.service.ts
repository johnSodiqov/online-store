// src/product/product.service.ts

import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Product } from '@prisma/client'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<Product[]> {
    return this.prisma.product.findMany()
  }

  create(dto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data: dto })
  }

  delete(id: string): Promise<Product> {
    return this.prisma.product.delete({ where: { id } })
  }

  update(id: string, dto: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data: dto })
  }
}

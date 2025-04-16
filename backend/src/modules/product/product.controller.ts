// src/product/product.controller.ts

import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Delete, Param, Put } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAll()
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id)
  }
}

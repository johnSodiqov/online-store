import { Test, TestingModule } from '@nestjs/testing';
import {  ProductController} from './modules/product/product.controller';
import { ProductService } from './modules/product/product.service';

describe('AppController', () => {
  let appController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    appController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.create).toBe('Hello World!');
    });
  });
});

import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0, { message: 'Цена не может быть отрицательной' })
  price: number;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsString()
  discount: string;

  @IsNumber()
  stock: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  img_URL: string;
}

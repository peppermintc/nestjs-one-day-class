import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'iPhone 11 Pro' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'so good' })
  desc: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 700000 })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'http://example' })
  productImg: string;
}

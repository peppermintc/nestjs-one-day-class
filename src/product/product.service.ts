import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // create product logic
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct: Product =
      await this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  // get all products logic
  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // get product by id logic
  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  // delete product by id logic
  async deleteProductById(id: string): Promise<boolean> {
    const result = await this.productRepository.delete({ id });
    if (!result.affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  // update product by id
  async updateProductById(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<boolean> {
    const result = await this.productRepository.update(id, updateProductDto);
    if (!result.affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}

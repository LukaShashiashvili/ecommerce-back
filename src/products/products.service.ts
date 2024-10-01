import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepository)
  {}

  async create(data: CreateProductDto) {
    return await this.productsRepo.create(data);
  }

  findAll() {
    return this.productsRepo.findAll();
  }

  findOne(id: number) {
    return this.productsRepo.findOne(id);
  }

  findOneByTitle(title: string){
    return this.productsRepo.findOneByTitle(title);
  }

  async update(id: number, data: UpdateProductDto) {
    return await this.productsRepo.update(id, data);
  }

  async remove(id: number) {
    return await this.productsRepo.remove(id);
  }
}

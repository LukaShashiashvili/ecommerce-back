import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from 'src/products/products.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Injectable()
export class SearchService {

  constructor(
      private readonly productsRepo: ProductsRepository,
      private readonly categoriesRepo: CategoriesRepository
  ){}

  async search(title: string){
    if(!title){
      throw new NotFoundException('Not Found')
    }

    const product = await this.productsRepo.findByName(title);
    const category = await this.categoriesRepo.findByName(title);

    return{
      product,
      category
    }
  }
}

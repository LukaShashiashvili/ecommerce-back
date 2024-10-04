import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository){}
  
  async create(data: CreateCategoryDto) {
    return await this.categoriesRepo.create(data);
  }

  findAll() {
    return this.categoriesRepo.findAll();
  }

  findByName(title: string){
    return this.categoriesRepo.findByName(title);
  }

  findOne(id: number) {
    return this.categoriesRepo.findOne(id);
  }

  async update(id: number, data: UpdateCategoryDto) {
    return await this.categoriesRepo.update(id, data);
  }

  async remove(id: number) {
    return await this.categoriesRepo.remove(id);
  }
}

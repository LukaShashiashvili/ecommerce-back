import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesRepository{
    constructor(@InjectRepository(CategoryEntity) private categoriesRepo: Repository<CategoryEntity>){}

    async create(data: CreateCategoryDto){

        const newCategory =  this.categoriesRepo.create(data);

        await this.categoriesRepo.save(newCategory);

        return newCategory;
    }

    findAll(){
        return this.categoriesRepo.createQueryBuilder('category')
        .getMany();
    }

    findOne(id: number){
        return this.categoriesRepo.createQueryBuilder('category')
        .where('category.id = :id', {id})
        .getMany();
    }

    findByName(title: string){
        return this.categoriesRepo.createQueryBuilder('category')
        .where('category.title Like :title', {title: `%${title}%`})
        .getMany();
    }

    async update(id: number, data: UpdateCategoryDto){
        await this.categoriesRepo.createQueryBuilder('category')
        .update()
        .set(data)
        .where('category.id = :id', {id})
        .execute();

        return this.categoriesRepo.findOneBy({id});
    }

    async remove(id: number){
        await this.categoriesRepo.softDelete(id)

        return this.categoriesRepo.createQueryBuilder('category')
        .withDeleted()
        .where('category.id = :id', {id})
        .getOne()
    }
}
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/categories/entities/category.entity";

@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepo: Repository<ProductEntity>
    ){}

    async create(data: CreateProductDto){

            const newProd = this.productsRepo.create(data)

            const arrayOfCategories = [];

            for(const categoryId of data.categoryIds){
                const category = new CategoryEntity();
                category.id = categoryId;

                arrayOfCategories.push(category)
            }

            newProd.categories = arrayOfCategories;
            
            await this.productsRepo.save(newProd);
            return newProd;
        
    }

    findAll(){
        return this.productsRepo
            .find({relations: {categories: true}})
    }

    findOne(id: number){
        return this.productsRepo
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .andWhere('product.id = :id', {id})
        .getOne()
    }

    findByName(title: string){
        return this.productsRepo
        .createQueryBuilder('product')
        .where('product.title Like :title', {title: `%${title}%`})
        .getMany()
    }

    async update(id: number, data: UpdateProductDto){
        await this.productsRepo
        .createQueryBuilder('product')
        .update()
        .set(data)
        .where('product.id = :id', {id})
        .execute()

        return this.productsRepo.findOneBy({id})
    }

    async remove(id: number){
        await this.productsRepo.softDelete(id)

        return this.productsRepo
        .createQueryBuilder('product')
        .withDeleted()
        .where('product.id = :id', {id})
        .getOne()
    }
}
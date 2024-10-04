import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepo: Repository<ProductEntity>
    ){}

    async create(data: CreateProductDto){

            const newProd = this.productsRepo.create(data)
            
            await this.productsRepo.save(newProd);
            return newProd;
        
    }

    findAll(){
        return this.productsRepo
            .createQueryBuilder('product')
            .getMany()
    }

    findOne(id: number){
        return this.productsRepo
        .createQueryBuilder('product')
        .where('product.id = :id', {id})
        .getMany()
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
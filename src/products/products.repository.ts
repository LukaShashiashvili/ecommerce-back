import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(Product)
        private readonly productsRepo: Repository<Product>
    ){}

    async create(data: CreateProductDto){
        try{
            const newProd = this.productsRepo.create(data)
            
            await this.productsRepo.save(newProd);
            return newProd;
        } catch(err){
            if(err.errno == 1062){
                return 'This product already exits'
            }
        }
        
        
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

    findOneByTitle(title: string){
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
import { CategoryEntity } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    title: string;

    @Column()
    price: number;

    @ManyToMany(() => CategoryEntity, (categories: CategoryEntity) => categories.products, {cascade: true})
    categories: CategoryEntity[];

    @Column()
    image: string;

    @Column({nullable: true})
    sale: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar'})
    firstName: string;

    @Column({type: 'varchar'})
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @Column({default: 0})
    numberOfAttempts: number;

    @Column('simple-array')
    wishlist: string[];

    @Column('simple-array')
    cart: string[];

    @Column()
    image:string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository{

    constructor(@InjectRepository(User)
                private readonly usersRepository: Repository<User>){}

    async create(createUserDto: CreateUserDto){

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        try {
            const newUser = new User();

            newUser.firstName = createUserDto.firstName;
            newUser.lastName = createUserDto.lastName;
            newUser.email = createUserDto.email;
            newUser.password = hashedPassword;

        await this.usersRepository.save(newUser)
        return newUser;
        }
        catch(err){
            if(err.errno == 1062){
                return 'This email is already used'
            }
        }
        
    }
    findAll(){
        return this.usersRepository
        .createQueryBuilder('users')
        .getMany()
    }

    findByEmail(email: string){
       return this.usersRepository.findOne({
        where: {email: email},})
    }
    findByEmailAndReturnPass(email: string){
       return this.usersRepository.findOne({where: {email: email},
                                            select: {email: true, password: true,numberOfAttempts: true},
                                            })
    }

    async incrementAttempts(user: User){
        user.numberOfAttempts++;
        await this.usersRepository.update(user.id, user);
    }

    async incrementAttemptsById(id: number){
        const user = await this.usersRepository.findOneBy({id});
        user.numberOfAttempts++;
        await this.usersRepository.update(user.id, user);
    }

    async resetAttemptsById(id: number){
        const user = await this.usersRepository.findOneBy({id});
        user.numberOfAttempts = 0;
        await this.usersRepository.update(user.id, user);
    }
    findOne(id: number){
        return this.usersRepository
        .createQueryBuilder('users')
        .where('users.id = :id', {id})
        .getMany()
    }
    async update(id: number, updateUserDto: UpdateUserDto){
        await this.usersRepository
        .createQueryBuilder('users')
        .update()
        .set(updateUserDto)
        .where('users.id = :id', {id})
        .execute()

        return this.usersRepository.findOneBy({id})
    }
    
    async remove(id: number){
        await this.usersRepository.softDelete({id})

        return this.usersRepository
        .createQueryBuilder('users')
        .withDeleted()
        .where('users.id = :id', {id})
        .getOne()
    }
}
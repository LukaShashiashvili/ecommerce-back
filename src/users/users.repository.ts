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

        const newUser = new User();

        newUser.firstName = createUserDto.firstName;
        newUser.lastName = createUserDto.lastName;
        newUser.email = createUserDto.email;
        newUser.password = hashedPassword;

        return await this.usersRepository.save(newUser)
    }
    findAll(){
        return 'All users found'
    }
    findByEmail(email: string){
        return this.usersRepository.findOne({where: {email: email}})
    }
    findByEmailAndReturnPass(email: string){
        return this.usersRepository.findOne({where: {email: email},
                                            select: {email: true, password: true, numberOfAttempts: true,},
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
        return 'User found'
    }
    update(id: number, updateUserDto: UpdateUserDto){
        return 'User updated'
    }
    remove(id: number){
        return 'User deleted'
    }
}
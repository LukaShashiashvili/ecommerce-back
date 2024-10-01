import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository){};

    async loginUser(data: LoginUserDto){
        const user = await this.usersRepository.findByEmailAndReturnPass(data.email);
        
        if(!user){
            throw new UnauthorizedException('Access denied');
        }
        
        const isPassCorrect = await bcrypt.compare(
            data.password,
            user.password
        );

        if(user.numberOfAttempts >= 3){
            throw new UnauthorizedException('Your account is blocked');
        }
        if(!isPassCorrect){
            await this.usersRepository.incrementAttemptsById(user.id)
            throw new UnauthorizedException('Access denied');
        }

        
        
        await this.usersRepository.resetAttemptsById(user.id);
        return user;
    }
}

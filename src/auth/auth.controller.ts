import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('login')
    async loginUser(@Body() data: LoginUserDto){
        return await this.authService.loginUser(data);
    }
}

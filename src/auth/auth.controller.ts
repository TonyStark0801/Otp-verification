import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUp.dto';
import { signInDto } from './dto/signin.dto';
@Controller('auth/v2')
export class AuthController {
    constructor(private readonly authservice: AuthService){};

    @HttpCode(HttpStatus.OK)
    @Post('/signUp')
    signUp(@Body() signUpDto: signUpDto):Promise<{message:string}>{
        return this.authservice.signUp(signUpDto);
    }

    // @HttpCode(HttpStatus.OK)
    // @Post('/signin')
    // signIn(@Body() signInDto: signInDto):Promise<{token:string}>{
    //     return this.authservice.signIn(signInDto);
    // }
}

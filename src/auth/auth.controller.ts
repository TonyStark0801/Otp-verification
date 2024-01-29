import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUp.dto';
import { signInDto } from './dto/signIn.dto';
import { resendDto } from './dto/resend.dto';
@Controller('auth/v2')
export class AuthController {
    constructor(private readonly authservice: AuthService){};

    @HttpCode(HttpStatus.OK)
    @Post('/signUp')
    signUp(@Body() signUpDto: signUpDto):Promise<{message:string}>{
        return this.authservice.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/signIn')
    signIn(@Body() signInDto: signInDto):any {
        return this.authservice.signIn(signInDto);
    }

    @HttpCode(201)
    @Post('/resendOtp')
    resendOtp(@Body() resendDto:resendDto):any{
        return this.authservice.resendOtp(resendDto);
    }
}

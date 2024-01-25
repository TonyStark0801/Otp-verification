import { IsEmail, IsNotEmpty } from "class-validator";

export class otpDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;
   
    @IsNotEmpty()
    otp: string;
    
    @IsNotEmpty()
    createdAt: Date;

}
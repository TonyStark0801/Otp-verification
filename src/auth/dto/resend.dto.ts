import {  IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class resendDto{
    @IsNotEmpty()
    @IsEmail({},{message:"Please enter a correct email!"})
    readonly email:string;

    @IsString()
    @IsNotEmpty()
    readonly password:string;

    @IsString()
    @IsPhoneNumber('IN')
    readonly phone: string;
    
    @IsNotEmpty()
    @IsIn(["sms","whatsapp"])
    readonly channel:string

}
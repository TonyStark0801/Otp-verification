import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MinLength, isNotEmpty } from "class-validator";

export class signUpDto{
    @IsNotEmpty()
    @IsString()
    readonly name : string;

    @IsNotEmpty()
    @IsEmail({},{message:"Please enter a correct email!"})
    readonly email:string;

    @IsNotEmpty()
    @IsNumber()
    readonly age : number;

    @IsNotEmpty()
    @MinLength(10)
    @IsPhoneNumber('IN')
    readonly phone:string;

    @IsNotEmpty()
    @IsIn(["sms","whatsapp"])
    readonly channel:string

}
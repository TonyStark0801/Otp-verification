import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, isNotEmpty } from "class-validator";

export class signInDto{
    @IsNotEmpty()
    @IsEmail({},{message:"Please enter a correct email!"})
    readonly email:string;

    @IsNotEmpty()
    @IsString()
    readonly password:string;

    @IsNumber()
    readonly otp: number;

}
import {  IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class signInDto{
    @IsNotEmpty()
    @IsEmail({},{message:"Please enter a correct email!"})
    readonly email:string;

    @IsString()
    readonly password:string;

    @IsNumber()
    @IsOptional()
    readonly otp: number | null;

}
import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpVerificationService } from './otpVerification.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { Otp } from './schemas/otp.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as otpGen from 'otp-generator';

import { signUpDto } from './dto/signUp.dto';
import { signInDto } from './dto/signin.dto';
import { channel } from 'diagnostics_channel';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel:Model<User>,
    @InjectModel(Otp.name)
    private otpModel: Model<Otp>,
    private jwtService: JwtService,
    private readonly otpService: OtpVerificationService,
  ){}


  
  async signUp(signUpDto:signUpDto):Promise<{message:string}>{
      const {name,email, age, phone, channel} = signUpDto;
      
      //Generating OTP and Password      
      const password = Math.random().toString(36).slice(-8)
      const otp = otpGen.generate(6,{upperCaseAlphabets: false, specialChars: false , lowerCaseAlphabets:false ,});
      
      //Hashing OTP and Password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)
      
      //Updating User info and OTP in DATABASE
      try {
        await this.userModel.create({ name, email, age, phone, password });
        await this.otpModel.create({ email, otp });
      } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
          throw new BadRequestException("Email already Registed")
        } else {
          console.error("Error:", error.message);
        }
      }
      return {message: "successful!"}
      // return this.otpService.sendOtp(phone,password,otp,channel);
  }

//   async signIn(singInDto: signInDto){
//     const {email, password} = singInDto;

//     const user = await this.userModel.findOne({email})
//     if(!user){
//       throw new UnauthorizedException('Invalid email or Password')
//     }
//     const isPasswordMathced = await bcrypt.compare(password, user.password)
//     if(!isPasswordMathced){
//       throw new UnauthorizedException('Invalid email or Password')
//     }
    
//     const token = this.jwtService.sign({id:user._id});
//     return {token};
//   }
}
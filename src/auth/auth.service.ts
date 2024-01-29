import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { OtpVerificationService } from './otpVerification.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { Otp } from './schemas/otp.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as otpGen from 'otp-generator';

import { signUpDto } from './dto/signUp.dto';
import { signInDto } from './dto/signIn.dto';
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
      const hashedPassword = await bcrypt.hash(password,salt);
      const hashedOtp= await bcrypt.hash(otp,10);
      
      //Updating User info and OTP in DATABASE
      try {
        await this.userModel.create({ name, email, age, phone, password:hashedPassword,isVerified:false });
        await this.otpModel.create({ email, otp:hashedOtp });
      } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
          throw new BadRequestException("Email already Registed")
        } else {
          console.error("Error:", error.message);
        }
      }
      return {message: `Email: ${email}\nPassword:${password}\nOTP: ${otp}`}
      // return this.otpService.sendOtp(phone,password,otp,channel);
  }

  async signIn(singInDto: signInDto){
    const {email, password,otp} = singInDto;

    //Finding User in database
    const user = await this.userModel.findOne({ email });
    const otpObject = await this.otpModel.findOne({email})

    // if (!user) {
    //   throw new UnauthorizedException('User not found. Please Register!');
    // }
    
    // // Checking Password
    // const isPasswordMatched = await bcrypt.compare(password, user.password);
    // if (!isPasswordMatched) {
    //   throw new UnauthorizedException('Invalid Password');
    // }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(!user ? 'User not found. Please Register!' : 'Invalid Password');
    }


    if (!user.isVerified) {
      if (!otp) {
        throw new UnauthorizedException('Your phone number is not verified! Please verify it to access your account!');
      }
      else if (!otpObject){
        throw new UnauthorizedException('OTP Expired!');
      }else{
        const isOtpMatched = await bcrypt.compare(otp.toString(),otpObject.otp);
        if(!isOtpMatched){
          throw new UnauthorizedException('INCORRECT OTP!')
        }else{
          user.isVerified = true;
        await user.save();
        }
      }
      
    }
    
    

    const token = this.jwtService.sign({ id: user._id });
    console.log(token)
    return {"name":user.name , "age":user.age,"email":user.email, "phone":user.phone, "isVerified": user.isVerified, "Jwt Token" : token  };
    // console.log(otp);

  }
}
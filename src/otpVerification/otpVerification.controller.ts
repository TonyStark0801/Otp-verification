import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { OtpVerificationService } from './otpVerification.service';

@Controller('auth/v2')
export class otpVerificationController {
  constructor(private readonly otpService: OtpVerificationService) {}
  
  @Post('/sendOtp')
  async sendOtp(
    @Body() data: { phone: string },
  ): Promise<{ verificationStatus: string , message:string}> {
    try {
      const Object = await this.otpService.sendOtp(data.phone);
      
      if(Object.verificationStatus === 'pending') {
        return {
          message: 'OTP sent successfully.',
          verificationStatus: 'pending',
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          msg: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/verifyOtp')
  async verifyOtp(
    @Body() data: { phone: string; otp: string },
  ): Promise<{ VerificationStatus: string }> {
    try {
      return await this.otpService.verifyOtp(data.phone, data.otp);
    } catch (error) {
      throw new HttpException(
        {
          msg: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

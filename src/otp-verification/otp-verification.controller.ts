import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { OtpVerificationService } from './otp-verification.service';

@Controller('auth')
export class OtpVerificationController {
  constructor(private readonly otpService: OtpVerificationService) {}

  @Post('/Send')
  async sendOtp(
    @Body() data: { phone: string },
  ): Promise<{ VerificationStatus: string }> {
    try {
      return await this.otpService.sendOtp(data.phone);
    } catch (error) {
      throw new HttpException(
        {
          msg: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );

      // if (
      //   error.message.includes(
      //     'Trial accounts cannot send messages to unverified numbers',
      //   )
      // ) {
      //   throw new HttpException(
      //     {
      //       msg: 'The number is not verified; please verify it at twilio.com/user/account/phone-numbers/verified',
      //     },
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }

      // if (error.message.includes('Invalid parameter `To`')) {
      //   throw new HttpException(
      //     { msg: 'Invalid phone number provided' },
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
      // throw error;
    }
  }

  @Post('/verify')
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

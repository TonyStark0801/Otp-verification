import { Module } from '@nestjs/common';
import { OtpVerificationService } from './otp-verification.service';
import { OtpVerificationController } from './otp-verification.controller';

@Module({
  providers: [OtpVerificationService],
  controllers: [OtpVerificationController]
})
export class OtpVerificationModule {}

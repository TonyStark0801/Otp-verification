import { Module } from '@nestjs/common';
import { OtpVerificationService } from './otpVerification.service';
import { otpVerificationController } from './otpVerification.controller';

@Module({
  providers: [OtpVerificationService],
  controllers: [otpVerificationController]
})
export class OtpVerificationModule {}

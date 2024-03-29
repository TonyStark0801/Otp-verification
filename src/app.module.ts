import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OtpVerificationModule } from './otp-verification/otp-verification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    OtpVerificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

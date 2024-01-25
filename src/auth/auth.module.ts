import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { OtpSchema } from './schemas/otp.schema';
import {PassportModule} from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import {ConfigService}  from '@nestjs/config'
import { OtpVerificationService } from './otpVerification.service';
@Module({
  imports : [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      useFactory:(config:ConfigService)=>{
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions:{
            expiresIn: config.get<string|number>('JWT_EXPIRES'),
          } 

        }
      },
      inject:[ConfigService],
    }),
    MongooseModule.forFeature([{name:'User', schema: UserSchema} , {name: 'Otp',schema:OtpSchema}]),
    
  ],
  controllers: [AuthController],
  providers: [AuthService,OtpVerificationService]
})
export class AuthModule {}

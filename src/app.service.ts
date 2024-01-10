import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class AppService {

  private twilioClient:Twilio;

  constructor(
    private readonly configService: ConfigService,
  ){
    const accountSid = configService.get('TWILIO_ACOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid,authToken);
  }
  
  getHello(): string {
    return 'Hello World!';
  }

  async sendOtp(phone:string){
    const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');

    let msg = '';
    await this.twilioClient.verify.v2
        .services(serviceSid)
        .verifications.create({to:phone, channel:'sms'})
        .then((verification)=> (msg = verification.status));
        return {msg:msg};
  }

  async verifyOtp(phone: string, code:string){
    const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID'); 
    
    let msg = '';
    await this.twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({to:phone,code:code})
      .then((verification)=> (msg=verification.status));

      return {msg:msg};
  }
}

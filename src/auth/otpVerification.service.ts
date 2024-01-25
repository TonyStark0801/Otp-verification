import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class OtpVerificationService {
  private twilioClient: Twilio;
  private readonly serviceSid: string;
  private readonly smsPhoneNumber: string;
  private readonly whatsappPhoneNumber:string;
  private readonly registeredPhoneNumber:string; //This is for development purpose

  //Setting Up Twilio Object
  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');
    this.serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');
    this.smsPhoneNumber = this.configService.get('TWILIO_SMS_PHONE_NUMBER');
    this.whatsappPhoneNumber = this.configService.get('TWILIO_WHATSAPP_PHONE_NUMBER');
    this.registeredPhoneNumber = this.configService.get('ME')
    this.twilioClient = new Twilio(accountSid, authToken);
  }
  
  //Generating and sending Password and OTP
  async sendOtp(phone: string , password:string,otp:string,channel:string) {
    if(channel=="sms"){
      await this.twilioClient.messages.create({
        body: `Your UserID is registered EMAIL ID and your password for Jio Services: ${password}. Your OTP for Phone verification is ${otp}`,
        from: this.smsPhoneNumber,
        to: this.registeredPhoneNumber
        //Due to restricted free version of twilio. All sms are sent to registered number. This can be replaced with *phone* to sms to client's number.
      });
    }
    else{
      await this.twilioClient.messages.create({
        body: `Hello I am *Shubham Mishra*. Your UserID is registered _EMAIL ID_ and your password for Jio Services: *${password}*. Your OTP for Phone verification is *${otp}*`,
        from: `whatsapp:${this.whatsappPhoneNumber}`,
        to:`whatsapp:${this.registeredPhoneNumber}`
      });
    }
    return { message: "Thank you for registering! Your Password and verification OTP has been sent to your phone number"};
  }

  // async verifyOtp(phone: string, code: string) {
  //   let phoneNumber = '+91'.concat(phone);
  //   const verification = await this.twilioClient.verify.v2
  //     .services(this.serviceSid)
  //     .verificationChecks.create({ to: phoneNumber, code: code });

  //   return { VerificationStatus: verification.status };
  // }
}

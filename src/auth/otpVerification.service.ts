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
    try {
      //Send customised message to the client based on the channel  
      const  smsBody = `
      Welcome to Jio Services! Your UserID is registered EMAIL ID\nYour password for Jio Services: ${password}.\nYour OTP for Phone verification is ${otp}`;

      const  whatsappBody = `
      Welcome to  *Jio Services*. Your UserID is registered _EMAIL ID_.\nYour password for further login: *${password}*.\nYour OTP for Phone verification: *${otp}*`;
      
      await this.twilioClient.messages.create({
        body: channel ==='sms'? smsBody:whatsappBody,
        from: channel === 'sms'?this.smsPhoneNumber: `whatsapp:${this.whatsappPhoneNumber}`,
        to: channel === 'sms'? this.registeredPhoneNumber: `whatsapp:${this.registeredPhoneNumber}`
    
      });
      return { message: "Thank you for registering! Your Password and verification OTP have been sent to your phone number" };
    
    } catch (error) {
        // Handle the error, log it, or return an error response
        console.error("Error sending message:", error);
        return { message: "An error occurred while sending the message" };
      } 
  
  }

  

  // async verifyOtp(phone: string, code: string) {
  //   let phoneNumber = '+91'.concat(phone);
  //   const verification = await this.twilioClient.verify.v2
  //     .services(this.serviceSid)
  //     .verificationChecks.create({ to: phoneNumber, code: code });

  //   return { VerificationStatus: verification.status };
  // }
}

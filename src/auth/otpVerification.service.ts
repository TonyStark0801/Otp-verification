import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class OtpVerificationService {
  private twilioClient: Twilio;
  private readonly smsPhoneNumber: string;
  private readonly whatsappPhoneNumber:string;
  private readonly registeredPhoneNumber:string; //This is for development purpose: By default all sms will go on this number

  
  //Setting Up Twilio Object
  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');
    this.smsPhoneNumber = this.configService.get('TWILIO_SMS_PHONE_NUMBER');
    this.whatsappPhoneNumber = this.configService.get('TWILIO_WHATSAPP_PHONE_NUMBER');
    this.registeredPhoneNumber = this.configService.get('ME')
    this.twilioClient = new Twilio(accountSid, authToken);
  }
  
  async sendOtp(phone: string , password:string,otp:string,channel:string) {
    try {
      const  smsBody = `Welcome to Jio Services! Your UserID is registered EMAIL ID\nYour password for Jio Services: ${password}.\nYour OTP for Phone verification is ${otp}`;
      const  whatsappBody = `Welcome to  *Jio Services*. Your UserID is registered _EMAIL ID_.\nYour password for further login: *${password}*.\nYour OTP for Phone verification: *${otp}*`;
      
      await this.twilioClient.messages.create({
        body: channel ==='sms'? smsBody:whatsappBody,
        from: channel === 'sms'?this.smsPhoneNumber: `whatsapp:${this.whatsappPhoneNumber}`,
        to: channel === 'sms'? this.registeredPhoneNumber: `whatsapp:${this.registeredPhoneNumber}`
    
      });
      return { message: "Thank you for registering! Your Password and verification OTP have been sent to your phone number" };

    } catch (error) {
        console.error("Error sending message:", error);
        return { message: "An error occurred while sending the message" };
    } 
  
  }

  async resendOtp(phone: string ,otp:string,channel:string) {
    try {
      const  smsBody = `Your OTP for Phone verification is ${otp}`;
      const  whatsappBody = `Your OTP for Phone verification: *${otp}*`;
      
      const test = await this.twilioClient.messages.create({
        body: channel ==='sms'? smsBody:whatsappBody,
        from: channel === 'sms'?this.smsPhoneNumber: `whatsapp:${this.whatsappPhoneNumber}`,
        to: channel === 'sms'? this.registeredPhoneNumber: `whatsapp:${this.registeredPhoneNumber}`
      });
      return { message: "Verification OTP have been sent to your phone number" };
    
    } catch (error) {
        console.error("Error sending message:", error);
        return { message: "An error occurred while sending the message" };
    } 
  
  }
  
}

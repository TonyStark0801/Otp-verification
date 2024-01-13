import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class OtpVerificationService {
  private twilioClient: Twilio;
  private readonly serviceSid: string;

  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');
    this.serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendOtp(phone: string) {
    let phoneNumber = '+91'.concat(phone);

    const verification = await this.twilioClient.verify.v2
      .services(this.serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
    return { VerificationStatus: verification.status };
  }

  async verifyOtp(phone: string, code: string) {
    let phoneNumber = '+91'.concat(phone);
    const verification = await this.twilioClient.verify.v2
      .services(this.serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: code });

    return { VerificationStatus: verification.status };
  }
}

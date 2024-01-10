import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/SendOtp')
  async sendOtp(@Body() data:{phone:string}) : Promise<{msg:string}> {
    let prefix ="+91";
    let phone = prefix.concat(data.phone);
    return await this.appService.sendOtp(phone);
    
  }

  @Post('/verifyOtp')
  async verifyOtp(@Body() data : {phone: string; otp:string}):Promise<{msg:string}>{
    let prefix ="+91";
    let phone = prefix.concat(data.phone);
    return await this.appService.verifyOtp(phone,data.otp);
  }

}

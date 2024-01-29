// otp.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Otp extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  otp: string;

  @Prop({
    type: Date,
    default: Date.now,
    // expires:60
     // The document will be automatically deleted after 5 minutes of its creation time
  })
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);

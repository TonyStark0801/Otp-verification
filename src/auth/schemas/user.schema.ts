import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, MaxLength } from "class-validator";

@Schema({
    timestamps:true
})

export class User{
    @Prop()
    name: string
    
    @Prop({unique:[true,"Email already registered!"]})
    email:string

    @Prop()
    phone : string

    @Prop()
    @IsNumber()
    age: Number
    
    @Prop({minlength:6})
    password:string;
   
}

export const UserSchema = SchemaFactory.createForClass(User);
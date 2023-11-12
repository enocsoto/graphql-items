import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class LoginInput {

    @Field(()=> String, {description: "Email of user"})
    @IsEmail()
    email: string;

    @Field(()=> String, {description: "Password of user"})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

}
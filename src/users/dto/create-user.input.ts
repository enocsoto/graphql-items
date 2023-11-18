import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;

  @Field(()=> String, {description: "Email of user"})
  @IsEmail()
  email: string;

  @Field(()=> String, {description: "FullName of user"})
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Field(()=> String, {description: "Password of user"})
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

}

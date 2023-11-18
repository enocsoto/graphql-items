import { IsArray, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { ValidRoles } from 'src/auth/enums/valid-roles.enums';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => [ValidRoles], {
    description: ' Role is Required',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  roles?: ValidRoles[];

  @Field(() => Boolean, { description: 'Status of the user', nullable: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { ValidRoles } from '../../../auth/enums/valid-roles.enums';

@ArgsType()
export class ValidrRolesArgs {

    @Field(() => [ValidRoles], {nullable: true})
    @IsArray()
    roles: ValidRoles[] = [];

}

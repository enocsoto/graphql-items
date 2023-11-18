import { registerEnumType } from "@nestjs/graphql";

export enum ValidRoles {
  admin = 'admin',
  user = 'user',
}

registerEnumType(ValidRoles, {name: 'ValidRoles', description: 'Roles permitted to access the application'});
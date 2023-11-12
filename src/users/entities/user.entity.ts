import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({name: 'users'})
@ObjectType()
export class User {
  
  @Field(() => ID, { description: 'Id Unique for User' })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Field(() => String, { description: 'FullName for User' })
  @Column()
  @MinLength(3)
  @IsString()
  fullName: string;

  @Field(() => String, { description: 'Email for User' })
  @IsEmail()
  @IsNotEmpty()
  @Column({unique: true})
  email: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @Field(() => [String], { description: 'Roles for User' })
  @Column({type: 'text', array: true, default: ['user']})
  roles: string[];

  @Field(() => Boolean, { description: 'isActive for User' })
  @Column({type: 'boolean', default: true})
  isActive: boolean;

  //TODO: relationship and more...
  
}

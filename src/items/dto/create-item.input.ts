import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field(() => String, { description: 'Name of Item' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @Field(() => Float, { description: 'quantity of Item' })
  @IsPositive()
  quantity: number;

  @Field(() => String, {
    nullable: true,
    description: 'Units of Quantity',
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  quantityUnits?: string;
}
